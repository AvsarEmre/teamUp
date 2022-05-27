const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const matchSchema = new mongoose.Schema({
  homeTeam: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      autopopulate: { maxDepth: 1 },
      required: true,
    },
  ],
  awayTeam: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      autopopulate: { maxDepth: 1 },
      required: true,
    },
  ],
  location: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
})

class Match {}

matchSchema.loadClass(Match)
matchSchema.plugin(autopopulate)
module.exports = mongoose.model('Match', matchSchema)
