// env.js 里会从 process.env 读取变量，但此时 dotenv.config() 还没有执行，所以 process.env.NODE_ENV 还是 undefined
import {PORT, NODE_ENV} from './config/env.js'
import express from 'express'
const app = express()


app.get('/', (req, res) => {
    res.send('welcome to the subscription tracker api!')
})
// we need to make out sever to listen for requests trying to access specific routes
app.listen(PORT, () => {
    console.log(`subscription tracker api listening at http://localhost:${PORT} 在環境 ${NODE_ENV}`)
})
