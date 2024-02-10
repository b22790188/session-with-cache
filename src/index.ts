import express, { Request, Response } from 'express';
import { createClient } from 'redis';
import userRouter from './routes/userRouter';

const app = express();
const port = process.env.PORT || 3000;

//todo: modify type
export let client: any;

const fakeData: { [key:string]: string} = {
  admin: 'admin',
  user: 'user',
};

(async () => {
  client = await createClient()
    .on('error', (err) => {
      console.log('Redis error' + err);
    })
    .connect();
})();

export async function checkCache(req: Request, res: Response): Promise<boolean | undefined> {
  const username = req.body.username;
  let data = await client.get(username);
  if (data) {
    return data;
  }
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/login', userRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello ts-express');
});

app.listen(port, () => {
  console.log(`App Server listening on port ${port}`);
});
