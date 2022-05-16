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

  captain: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },
  ],

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },
  ],

  matches: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'match',
      autopopulate: true,
    }
  ],
  matchInvitations: []
  // I need to decide how I manage invitations
})

teamSchema.loadClass(Team);
teamSchema.plugin(autopopulate);
module.exports = mongoose.model('Team', teamSchema);
