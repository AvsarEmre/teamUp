const express = require('express')

const router = express.Router()

const Team = require('../models/team')

/* GET products listing. */
router.get('/', async (req, res) => {
  const query = {}

  if (req.query.name) {
    query.name = req.query.name
  }

  res.send(await Product.find(query))
})

/* POST create a team */
router.post('/', async (req, res) => {
  const createdTeam = await Team.create(req.body)
  res.send(createdTeam)
})

/* DELETE team */
router.delete('/', async (req, res) => {
  await Team.deleteMany({})

  res.sendStatus(200)
})

/* DELETE a team */
router.delete('/byName/:name', async (req, res) => {
  console.log(req.params.teamName)

  await Team.deleteOne({ name: req.params.teamName })

  res.sendStatus(200)
})

module.exports = router