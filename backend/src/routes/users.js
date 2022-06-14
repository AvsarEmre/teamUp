const express = require('express')

const router = express.Router()
const axios = require('axios')

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

  if (!firstName || !lastName || !email || !age) {
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

  const marsel = await User.create({
    firstName: 'marsel',
    lastName: 'kuş',
    age: 2,
    email: 'marsel@avsar.com',
  })
  await marsel.setPassword('password')
  await marsel.save()

  const emre = await User.create({
    firstName: 'emre',
    lastName: 'avsar',
    age: 17,
    email: 'emre@avsar.com',
  })
  await emre.setPassword('password')
  await emre.save()

  const steve = await User.create({
    firstName: 'steve',
    lastName: 'ingram',
    age: 21,
    email: 'steve@ingram.com',
  })
  await steve.setPassword('password')
  await steve.save()

  const realMadrid = await Team.create({
    teamName: 'Real Madrid',
    teamPlace: 'MadridCity',
  })

  const barcelona = await Team.create({
    teamName: 'Barcelona',
    teamPlace: 'BarcelonaCity',
    matches: [],
  })

  await steve.createTeam(realMadrid)
  await marsel.createTeam(barcelona)
  await emre.becomeTeamMember(realMadrid)
  await steve.becomeTeamMember(barcelona)

  console.log('hello marsel')
  const elClassico = await Match.create({
    homeTeam: barcelona,
    awayTeam: realMadrid,
    location: 'CampNou',
    date: '23.02.2022',
    time: '20:00',
  })

  await marsel.createMatch(elClassico)

  //realMadrid.matches.push(elClassico)
  //barcelona.matches.push(elClassico)
  //elClassico.homeTeam.matches.push(elClassico)
  //await realMadrid.save()
  //console.log(elClassico.homeTeam.matches)
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
