import express, { Request, Response } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import userRouter from './routes/userRouter';

//todo: understand why
declare module 'express-session' {
  export interface SessionData {
    login: boolean;
    user: string;
  }
}

const app = express();
const port = process.env.PORT || 3000;

//todo: modify type
export let redisClient = createClient();

(async () => {
  await redisClient
    .on('error', (err) => {
      console.log('Redis error' + err);
    })
    .connect();
  console.log('connect redis success');
})();

const redisStore = new RedisStore({
  client: redisClient,
});

app.use(
  session({
    store: redisStore,
    secret: 'secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 30,
    },
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/login', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello ts-express');
});

app.listen(port, () => {
  console.log(`App Server listening on port ${port}`);
});
