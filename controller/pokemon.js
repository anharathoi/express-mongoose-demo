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

module.exports = {
  index,
  show
}