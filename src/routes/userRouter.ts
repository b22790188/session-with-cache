import express from 'express';
import { Request, Response } from 'express';
import { redisClient } from '..';
const router = express.Router();

const fakeData: { [key: string]: string } = {
  admin: 'admin',
  user: 'user',
};

//todo: move function to service folder
async function checkCache(
  req: Request
): Promise<string | undefined> {
  const username = req.body.username;
  let data = await redisClient.get(username);
  if (data) {
    return data;
  }
}


router.post('/', async function (req: Request, res: Response, next: any) {
  const { username, password } = req.body;
  // console.log(req.session);
  let dataCached = await checkCache(req);
  if (dataCached) {
    res.json({
      data: dataCached,
      info: 'data from cache',
    });

    return;
  }

  if (username in fakeData && fakeData[username] === password) {
    req.session.user = username;
    await redisClient.set(username, password);
    res.send('Login success');
  } else {
    res.send('Login failed');
  }
});

export default router;
