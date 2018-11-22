const mongoose = require('mongoose');
const moment = require('moment');

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  image: {
    name: String,
    url: String,
  },
  registeredAt: { type: Number, default: moment().valueOf() },
  friends: [ {_id: String} ]
});

userSchema.statics.fetchAllUsers = function () {
  return this.model('User').find();
}

userSchema.statics.findUserWithId = function (userId) {
  return this.model('User').findOne({ _id: userId });
}

module.exports = mongoose.model('User', userSchema);
//! DOVRSITI MODELE I DOHVATANJE PODATAKA ODNOSNO UBACIVANJE PODATAKA U MONGO