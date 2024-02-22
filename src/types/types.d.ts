import * as expressSession from 'express-session';

declare module 'express-session' {
  interface SessionData {
    login: boolean;
    user: string;
  }
}
