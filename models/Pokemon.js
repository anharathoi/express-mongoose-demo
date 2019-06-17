const mongoose = require('mongoose')

const pokeSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true
    },
    name: String,
    height: Number,
    moves: Array,
    image: String
  },
  { collection: 'pokemon' }
)

module.exports = mongoose.model('pokemon', pokeSchema)