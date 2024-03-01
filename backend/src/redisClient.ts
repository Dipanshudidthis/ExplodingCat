import { Client, Repository } from 'redis-om';
import { config } from 'dotenv';
config()


const redisClient = new Client();


(async () => {
    await redisClient.open(process.env.DATABASE)
})();



export { redisClient }
