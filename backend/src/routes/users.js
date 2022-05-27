const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Team = require('../models/team')
const Match = require('../models/match')

/* GET users listing. */
router.get('/', async (req, res) => {
  const query = {}

  if (req.query.firstName) {
    query.firstName = req.query.firstName
  }

  if (req.query.lastName) {
    query.lastName = req.query.lastName
  }

  if (req.query.age) {
    query.age = req.query.age
  }

  if (req.query.email) {
    query.email = req.query.email
  }

  res.send(await User.find(query))
})

/* POST create a user */
//router.post('/', async (req, res) => {
//  const createdUser = await User.create(req.body)
//  res.send(createdUser)
//})

router.post('/', async function (req, res) {
  const { firstName, lastName, email, age } = req.body

  if (!email || !firstName || !lastName || !age) {
    res
      .send({
        message: 'Missing fields.',
      })
      .status(400)
    return
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    age,
  })

  res.send(user)
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
  // temporary delete for development
  await User.deleteMany({})
  await Team.deleteMany({})
  await Match.deleteMany({})

  const mihri = await User.create({
    firstName: 'mihri',
    lastName: 'mihriLast',
    age: 35,
    email: 'mihri@mihri.com',
  })
  await mihri.setPassword('test')
  await mihri.save()

  const armagan = await User.create({
    firstName: 'armagan',
    lastName: 'armaganLast',
    age: 23,
    email: 'armagan@armagan.com',
  })
  await armagan.setPassword('test')
  await armagan.save()

  const steve = await User.create({
    firstName: 'steve',
    lastName: 'steveLast',
    age: 21,
    email: 'steve@steve.com',
  })
  await steve.setPassword('test')
  await steve.save()

  const realMadrid = await Team.create({
    teamName: 'Real Madrid',
    teamPlace: 'Madrid',
  })

  const barcelona = await Team.create({
    teamName: 'Barcelona',
    teamPlace: 'Barcelona',
  })

  const elClassico = await Match.create({
    homeTeam: [barcelona],
    awayTeam: [realMadrid],
    location: 'Barcelona',
    date: '23.02.2022',
    time: '20:00',
  })
  await elClassico.save()

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

router.get('/:userId/json', async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.send(user)
})

module.exports = router
