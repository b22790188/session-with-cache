import express from 'express';
import { Request, Response } from 'express';
import getUserData from '../model/getUserData';

const router = express.Router();

//todo: move function to service folder
async function checkCache(req: Request): Promise<boolean | undefined> {   
  try{
    let login = req.session.login;
    return login
  }
  catch(err){
    console.log(err);
  }

}

router.post('/', async function (req: Request, res: Response, next: any) {
  const { username, password } = req.body;
  let dataCached = await checkCache(req);
  if (dataCached) {
    res.json({
      data: req.session.user,
      info: 'data from cache',
    });

    return;
  }

  try{
    let data = await getUserData(username, password);
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
