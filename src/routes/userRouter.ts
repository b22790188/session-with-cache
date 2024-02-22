import express from 'express';
import { Request, Response } from 'express';
import getUserData from '../model/getUserData';

const router = express.Router();

router.post('/', async function (req: Request, res: Response) {
  const { username, password } = req.body;
  const logined = req.session.login;

  if (logined) {
    res.json({
      data: req.session.user,
      info: 'data from cache',
    });

    return;
  }

  try{
    await getUserData(username, password);
    req.session.login = true;
    req.session.user = username;
    res.send('login success');
  }
  catch(err){
    console.log(err);
    res.send('login failed');
  }
});

export default router;
