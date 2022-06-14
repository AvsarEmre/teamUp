const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },

  teamPlace: {
    type: String,
    required: true,
  },

  //captain: [
  //  {
  //    type: mongoose.Schema.Types.ObjectId,
  //    ref: 'User',
  //    autopopulate: { maxDepth: 1 },
  //  },
  //],

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { maxDepth: 1 },
    },
  ],

  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Match',
      autopopulate: { maxDepth: 1 },
    },
  ],

  // matchesAway: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Match',
  //     autopopulate: { maxDepth: 1 },
  //   },
  // ],

  // matchInvitations: [],
  // I need to decide how I manage invitations
})

class Team {}

teamSchema.loadClass(Team)
teamSchema.plugin(autopopulate)
module.exports = mongoose.model('Team', teamSchema)
