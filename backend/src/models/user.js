const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

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
  },
  password: {
      type: String,
      required: true,
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      autopopulate: true,
    },
  ],
  teamsManaged: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      autopopulate: true,
    }
  ],
  membershipInvitations: []
  // I need to decide how I manage invitations
})

// Check methods later
// membership invitations
// match invitation

class User {

  async createTeam(team) {
    this.teams.push(team)
    this.teamsManaged.push(team)
    team.members.push(this)
    team.captain.push(this)   // there is only one captain. array with one element or another method to define captain

    await team.save()
    await this.save()
  }

  async becomeTeamMember(team) {
    this.teams.push(team)
    team.members.push(this)

    await team.save()
    await this.save()
  }

}

userSchema.loadClass(User)
userSchema.plugin(autopopulate)

module.exports = mongoose.model('User', userSchema)
