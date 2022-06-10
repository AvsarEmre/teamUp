const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')
const team = require('./team')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  // password: {
  //  type: String,
  //  required: true,
  //  trim: true,
  //},
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      autopopulate: true,
    },
  ],
  // teamsManaged: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Team',
  //     autopopulate: { maxDepth: 1 },
  //   },
  // ],
  // membershipInvitations: [],
  // I need to decide how I manage invitations
})

// Check methods later
// membership invitations
// match invitation

class User {
  async createTeam(team) {
    this.teams.push(team)
    // this.teamsManaged.push(team)
    team.members.push(this)
    // team.captain.push(this) // there is only one captain. array with one element or another method to define captain

    await team.save()
    await this.save()
  }

  async becomeTeamMember(team) {
    this.teams.push(team)
    team.members.push(this)

    await team.save()
    await this.save()
  }

  async createMatch(match) {
    console.log('createMatch method')
    console.log({ match })
    const homeTeam = match.homeTeam
    const awayTeam = match.awayTeam
    console.log({ homeTeam })
    console.log({ awayTeam })
    //match.homeTeam.push(team)
    //match.awayTeam.push(team)
    //homeTeam.matches.push(match)
    //awayTeam.matches.push(match)

    //await team.save()
    //await match.save()
  }
}

userSchema.loadClass(User)
userSchema.plugin(autopopulate)
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
})

module.exports = mongoose.model('User', userSchema)
