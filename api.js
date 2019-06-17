const express = require('express')
const app = express()
const mongoose = require('mongoose')

const PORT = 3000

const mongoURI = 'mongodb://localhost/pokedex'


// middleware
app.use(express.json())

// require schema
const Pokemon = require('./models/Pokemon')

mongoose.connect(mongoURI, { useNewUrlParser: true }, (err) => {
  if(err) return console.log(`${err}`)
  console.log("connected to mongodb")
})

app.get('/', (req, res) => {
  return res.send("Welcome to the api")
})

// getting all pokemon
app.get('/pokemon', (req, res) => {
  Pokemon.find()
  .then( allPokemon => {
    return res.json(allPokemon)
  })
  .catch( err => {
    return res.json(err)
  })
})

// get one pokemon
app.get('/pokemon/:id', (req, res) => {
  const { id } = req.params
  Pokemon.findOne({id: id})
  .then( poke => {
    return res.json(poke)
  })
  .catch( err => res.json(err))
})

// post
app.post('/pokemon', (req, res) => {
  const { id, name, height, moves, image, test}  = req.body
  // console.log(id, name, height, moves, image)
  Pokemon.create({
    id: id,
    name: name,
    height: height,
    moves: moves,
    image: image
  })
  .then( newPoke => {
    return res.json(newPoke)
  })
  .catch( err => {
    return res.json(err)
  })
})

app.put('/pokemon/:id', (req, res) => {
  const { id } = req.params
  const { newName } = req.body
  Pokemon.findOne({id})
  .then( poke => {
    console.log(poke)
    poke.name = newName
    poke.save()
    .then( doc => res.send(`${doc.name} has been updated`))
    .catch( error => console.log(error) )
  })
  .catch( err => res.json(err))
})

// delete
app.delete('/pokemon/:id', (req, res) => {
  const { id } = req.params
  Pokemon.findOneAndDelete({ id })
  .then( doc => {
    if(!doc) return res.send(`No pokemon found at id ${id}`)
      return res.send(`${doc.name} deleted from database`)
    })
  .catch( err => res.json(err))
})

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
})