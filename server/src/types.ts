import { Request, Response } from 'express';
import { Session } from 'express-session';
import { Redis } from "ioredis";
import { createUpvoteLoader } from './utils/createUpvoteLoader';
import { createUserLoader } from './utils/createUserLoader';

export type MyContext = {
  req: Request & { session: Session & { userId: Number } };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
  upvoteLoader: ReturnType<typeof createUpvoteLoader>;
}