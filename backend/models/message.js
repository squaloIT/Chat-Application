const mongoose = require('mongoose');
const moment = require('moment');

const messageSchema = mongoose.Schema({
  _uid: { type: String, required: true },
  _friendId: { type: String, required: true },
  messages: [
    {
      content: { type: String, required: true },
      sent: { type: Boolean, required: true },
      timeMessageSent: { type: Number, default: moment().valueOf() }
    }
  ]

});

messageSchema.statics.fetchAllMessagesForLoggedUserChat = function (userId, friendId) {
  return this.model('User').find({ _uid: userId, _friendId: friendId });
}

messageSchema.methods.saveMessage = function (userId, friendId) {
  // this.model('User').sa({ _id: userId });
}

module.exports = mongoose.model('Message', messageSchema);