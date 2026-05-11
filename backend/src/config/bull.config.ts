import {Redis} from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

//Using Memurai for Window port of Redis
export const connection = new Redis({
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT!),
    maxRetriesPerRequest: null,
});