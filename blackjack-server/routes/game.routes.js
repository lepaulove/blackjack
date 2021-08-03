var express = require('express')
var router = express.Router()
const {resetGame, getGame, test, newGame, dealCard, hit, stay, setBet} = require('../controllers/game.controllers')

router.get('/test', test)
router.get('/newGame', newGame)
router.get('/:id', getGame)
router.get('/:id/hit', hit)
router.get('/:id/stay', stay)
router.get('/:id/reset', resetGame)
router.get('/:id/:bet/setBet', setBet)



module.exports = router