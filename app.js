// app.js is the center of the application
import {PORT, NODE_ENV } from './config/env.js'; 
import express from 'express'

import userRouter  from './routes/user.routes.js'
import subscriptionRouter  from './routes/subscription.routes.js'
import authRouter  from './routes/auth.routes.js'
import connectTODataBase from './database/mongodb.js'


const app = express()

// when you want to use middleware 
app.use(express.json())
// or which routes you want to use

// ex: /api/v1/users/
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRouter)
// ex: /api/v1/auth/sign-up
app.use('/api/v1/auth', authRouter)


app.get('/', (req, res) => {
    res.send('welcome to the subscription tracker api!')
})
// we need to make out sever to listen for requests trying to access specific routes
app.listen(PORT, async () => {
    console.log(`subscription tracker api listening at http://localhost:${PORT} 在環境 ${NODE_ENV}`)

    await connectTODataBase()   
})

export default app