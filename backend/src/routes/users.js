const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Team = require('../models/team')
const Match = require('../models/match')

/* GET users listing. */
router.get('/', async (req, res) => {
  const query = {}

  if (req.query.name) {
    query.name = req.query.name
  }

  if (req.query.age) {
    query.age = req.query.age
  }

  res.send(await User.find(query))
})

/* POST create a user */
router.post('/', async (req, res) => {
  const createdUser = await User.create(req.body)
  res.send(createdUser)
})

/* DELETE users */
router.delete('/', async (req, res) => {
  await User.deleteMany({})

  res.sendStatus(200)
})

/* DELETE a user */
router.delete('/byEmail/:email', async (req, res) => {
  console.log(req.params.email)

  await User.deleteOne({ email: req.params.email })

  res.sendStatus(200)
})

router.get('/initialize', async (req, res) => {
  //temporary delete for development
  await User.deleteMany({})
  await Product.deleteMany({})
  await Look.deleteMany({})

  const mihri = await User.create({
    firstName: 'mihri',
    lastName: 'mihriLast',
    age: 35
    email: 'mihri@mihri.com',
    password: 'password',
  })

  const armagan = await User.create({
    firstName: 'armagan',
    lastName: 'armaganLast',
    age: 23
    email: 'armagan@armagan.com',
    password: 'password',
  })

  const steve = await User.create({
    firstName: 'steve',
    lastName: 'steveLast',
    age: 21
    email: 'steve@steve.com',
    password: 'password',
  })

  const realMadrid = await Team.create({
    teamName: 'Real Madrid',
    teamPlace: 'Madrid'
  })

  const barcelona = await Team.create({
    teamName: 'Barcelona',
    teamPlace: 'Barcelona'
  })

  await steve.createTeam(realMadrid)
  await steve.createTeam(barcelona)

  await armagan.becomeTeamMember(realMadrid)
  await mihri.becomeTeamMember(barcelona)

  console.log(steve)
  res.sendStatus(200)
})

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)

  if (user) res.render('user', { user })
  else res.sendStatus(404)
})

module.exports = router
