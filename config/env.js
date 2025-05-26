// https://github.com/motdotla/dotenv/issues/89
import dotenv from 'dotenv'; 
import process from 'node:process';


dotenv.config({
    path: `.env.${process.env.NODE_ENV || 'development'}.local`
});

// process.env 抓取的就是 .env 或是 .env.development.local 這類的環境變數
export const { PORT, NODE_ENV, DB_URL, JWRT_SECRET, JWT_EXPIRES_IN } = process.env;