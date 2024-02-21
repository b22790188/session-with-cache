import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import { REDIS_URL } from '../config/config';

const redisClient = createClient({
  url: REDIS_URL,
});

(async () => {
  await redisClient
    .on('err', (err) => {
      console.log('Redis error' + err);
    })
    .connect();

  console.log('connect redis success');
})();

const redisStore = new RedisStore({
  client: redisClient,
});

export default redisStore;
export { redisClient };
