const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const matchSchema = new mongoose.Schema({

 /*

 filename: String,

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
*/

})



matchSchema.plugin(autopopulate)
module.exports = mongoose.model('Match', matchSchema)