import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('welcome to the subscription tracker api!')
})
// we need to make out sever to listen for requests trying to access specific routes
app.listen(port, () => {
    console.log(`subscription tracker api listening at http://localhost:${port}`)
})
