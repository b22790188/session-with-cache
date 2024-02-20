import RedisStore from 'connect-redis';
import { createClient } from 'redis';

//todo: define type
const redisClient = createClient();

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
export { redisClient }