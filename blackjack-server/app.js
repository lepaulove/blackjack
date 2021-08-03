const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

const app = express()
const routes = require('./routes/game.routes')
app.use(localHostHandler)
app.use('/api/game', routes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

function localHostHandler(request, response, next){
    response.header('Access-Control-Allow-Origin', '*')
    next()
}

app.listen(port)
console.log(`Server is running on port ${port}...`)