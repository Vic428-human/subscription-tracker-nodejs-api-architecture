// https://github.com/motdotla/dotenv/issues/89
import dotenv from 'dotenv'; 
import process from 'node:process';

// console.log('process.env.NODE_ENV', process.env.NODE_ENV);

//  "start:dev": "cross-env NODE_ENV=development nodemon app.js",
//  "start:prod": "cross-env NODE_ENV=production nodemon app.js"
//  這樣就可以根據 dev 或是 prod 環境切換，切換後根據 NODE_ENV 的配置，
//  去抓取 .env.development.local 或是 .env.production.local 裡的配置
dotenv.config({
    path: `.env.${process.env.NODE_ENV || 'development'}.local`
});


export const { PORT, NODE_ENV } = process.env;

// 暫時不用下面這個做法
// 這做法是直接使用 package.json 裡的配置 例如：
// "dev": "NODE_ENV=development nodemon app.js",
// "prod": "NODE_ENV=production nodemon app.js"

// const envFile = `.env.${process.env.NODE_ENV}`;
// dotenv.config({ path: path.resolve(process.cwd(), envFile) });