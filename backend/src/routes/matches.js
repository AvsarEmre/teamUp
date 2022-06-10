const express = require('express')

const router = express.Router()
const Match = require('../models/match')

/* GET products listing. */
router.get('/', async (req, res) => {
  const query = {}

  if (req.query.name) {
    query.name = req.query.name
  }

  res.send(await Match.find(query))
})

/* POST create a match */
router.post('/', async (req, res) => {
  const createdMatch = await Match.create(req.body)
  res.send(createdMatch)
})

/* DELETE matches */
//router.delete('/', async (req, res) => {
//  await Match.deleteMany({})
//
//  res.sendStatus(200)
//})
//
/* DELETE a match */
//router.delete('/byName/:name', async (req, res) => {
//  console.log(req.params.teamName)
//
//  await Team.deleteOne({ name: req.params.teamName })
//
//  res.sendStatus(200)
//})

module.exports = router
