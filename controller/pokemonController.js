// require schema
const Pokemon = require('../models/Pokemon')

const index = (req, res) => {
  Pokemon.find()
  .then( allPokemon => {
    return res.json(allPokemon)
  })
  .catch( err => {
    return res.json(err)
  })
}

const show = (req, res) => {
  const { id } = req.params
  Pokemon.findOne({id: id})
  .then( poke => {
    return res.json(poke)
  })
  .catch( err => res.json(err))
}

const createPoke = (req, res) => {
  const { id, name, height, moves, image}  = req.body
  Pokemon.create({ id, name, height, moves, image})
  .then( newPoke => {
    return res.json(newPoke)
  })
  .catch( err => {
    return res.json(err)
  })
}

const updatePoke = (req, res) => {
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
}

const findAndUpdatePoke = (req, res) => {
  const { id } = req.params
  const { newName } = req.body
  Pokemon.findOneAndUpdate({id}, {name: newName})
  .then( poke => {
    return res.json(poke)
  })
  .catch( err => {
    console.log(err)
  })
}

const deletePoke = (req, res) => {
  const { id } = req.params
  Pokemon.findOneAndDelete({ id })
  .then( doc => {
    if(!doc) return res.send(`No pokemon found at id ${id}`)
      return res.send(`${doc.name} deleted from database`)
    })
  .catch( err => res.json(err))
}

module.exports = {
  index,
  show,
  createPoke,
  updatePoke,
  findAndUpdatePoke,
  deletePoke
}