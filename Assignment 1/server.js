var express = require('express')
var morgan = require('morgan')

var dishRouter = require('./dishRouter')
var promoRouter = require('./promoRouter')
var leaderRouter = require('./leaderRouter')

/* Configs/Const */

var hostname = 'localhost'
var port = 3000

/* Init */

var app = express()

app.use(morgan('dev'))

app.use('/dishes', dishRouter)
app.use('/promotions', promoRouter)
app.use('/leadership', leaderRouter)

app.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`)
})
