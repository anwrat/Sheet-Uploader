import {Redis} from 'ioredis';
import config from '../config/dotenv.config.js';

//Using Memurai for Window port of Redis
export const connection = new Redis({
    host: config.redis_host,
    port: config.redis_port,
    maxRetriesPerRequest: null,
});