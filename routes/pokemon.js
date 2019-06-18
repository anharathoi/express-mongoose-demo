const express =  require('express')
const router = express.Router()


const { index, show, createPoke, updatePoke, findAndUpdatePoke, deletePoke } = require('../controller/pokemonController')

// getting all pokemon
router.get('/pokemon', index)

// get one pokemon
router.get('/pokemon/:id', show)

// post
router.post('/pokemon', createPoke)

// update
router.put('/pokemon/:id', updatePoke)

// update using findOneAndUpdate
// router.put('/pokemon/:id', findAndUpdatePoke)

// delete
router.delete('/pokemon/:id', deletePoke)

module.exports = router