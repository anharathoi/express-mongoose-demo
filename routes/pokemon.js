const express =  require('express')
const router = express.Router()

// require schema
const Pokemon = require('../models/Pokemon')
const { index, show } = require('../controller/pokemon')
// getting all pokemon
router.get('/pokemon', index)

// get one pokemon
router.get('/pokemon/:id', show)

// post
router.post('/pokemon', (req, res) => {
  const { id, name, height, moves, image}  = req.body
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

// update
router.put('/pokemon/:id', (req, res) => {
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

// // update using findOneAndUpdate
// router.put('/pokemon/:id', (req, res) => {
//   const { id } = req.params
//   const { newName } = req.body
//   Pokemon.findOneAndUpdate({id}, {name: newName})
//   .then( poke => {
//     return res.json(poke)
//   })
//   .catch( err => {
//     console.log(err)
//   })
// })

// delete
router.delete('/pokemon/:id', (req, res) => {
  const { id } = req.params
  Pokemon.findOneAndDelete({ id })
  .then( doc => {
    if(!doc) return res.send(`No pokemon found at id ${id}`)
      return res.send(`${doc.name} deleted from database`)
    })
  .catch( err => res.json(err))
})

module.exports = router