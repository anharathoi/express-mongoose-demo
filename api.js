const express = require('express')
const app = express()
const mongoose = require('mongoose')

const PORT = 3000
const pokemon = require('./routes/pokemon')
// require dotenv
require('dotenv').config()

// const mongoURI = 'mongodb://localhost/pokedex'
const mongoPROD_URI = process.env.MONGO_PROD_URI


// middleware
app.use(express.json())

app.use('/', pokemon)

mongoose.connect(mongoPROD_URI, { useNewUrlParser: true }, (err) => {
  if(err) return console.log(`${err}`)
  console.log("connected to mongodb")
})

app.get('/', (req, res) => {
  return res.send("Welcome to the api")
})

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
})