// app.js is the center of the application
// env.js 里会从 process.env 读取变量，但此时 dotenv.config() 还没有执行，所以 process.env.NODE_ENV 还是 undefined
import {PORT, NODE_ENV} from './config/env.js'
import express from 'express'

import userRouter  from './routes/user.routes.js'
import subscriptionRouter  from './routes/subscription.routes.js'
import authRouter  from './routes/auth.routes.js'


const app = express()

// when you want to use middleware 
app.use(express.json())
// or which routes you want to use

// ex: /api/v1/users/
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)
// ex: /api/v1/auth/sign-up
app.use('/api/v1/auth', authRouter)

// you can make a requests using the browser, because when searching for a website a browser automativally make a get request and ouput

app.get('/', (req, res) => {
    res.send('welcome to the subscription tracker api!')
})
// we need to make out sever to listen for requests trying to access specific routes
app.listen(PORT, () => {
    console.log(`subscription tracker api listening at http://localhost:${PORT} 在環境 ${NODE_ENV}`)
})
