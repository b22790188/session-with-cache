import express from 'express';
import { Request, Response } from 'express';
import { client, checkCache } from '..';
const router = express.Router();

const fakeData: { [key: string]: string } = {
  admin: 'admin',
  user: 'user',
  
};

router.post('/', async function (req: Request, res: Response, next: any) {
  const { username, password } = req.body;
  let dataCached = await checkCache(req, res);
  if (dataCached) {
    res.json({
      data: dataCached,
      info: 'data from cache',
    });
    
    return;
  }

  if (username in fakeData && fakeData[username] === password) {
    await client.set(username, password);
    res.send('Login success');
  } else {
    res.send('Login failed');
  }
});

export default router;
