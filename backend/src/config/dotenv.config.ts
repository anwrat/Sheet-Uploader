import dotenv from 'dotenv';
dotenv.config()

interface Config{
    port: number;
    postgres_user: string;
    postgres_pass: string;
    redis_host: string;
    redis_port: number;
}

const config: Config = {
    port: Number(process.env.PORT),
    postgres_user: String(process.env.POSTGRES_USER),
    postgres_pass: String(process.env.POSTGRES_PASS),
    redis_host: String(process.env.REDIS_HOST),
    redis_port: Number(process.env.REDIS_PORT),
}

export default config;