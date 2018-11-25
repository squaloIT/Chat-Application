const mongoose = require('mongoose');
const moment = require('moment');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, trim: true, minlength: 4 },
  email: { type: String, required: true, trim: true, unique: true,
    validate: {
      // validator: function(v) {
      //   return /\d{3}/.test(v);
      // },
      // validator: value => validator.isEmail(value),  
      validator: validator.isEmail, //Isto kao ono odozgo - kazem ovoj funkciji da resava i radi sve  
      message: '{VALUE} email nije u dobrom formatu!'
    }
  },
  password: { type: String, required: true, trim: true, minlength: 5 },
  // image: {
  //   name: String,
  //   url: String,
  // },
  registeredAt: { type: Number, default: moment().valueOf() },
  token: [{
    access: { type: String, required: true },
    token: { type: String, required: true },
  }],
  friends: [ {_id: String} ]
});

userSchema.methods.toJSON = function() {

};

userSchema.methods.generateAuthToken = function() {
  const user = this;
  const token = jwt.sign({ _id: user._id }, 'minaqua').toString();
  user.token.push({ access: 'auth', token: token});
  return user.save().then((userSaved) => {
    return { user: userSaved, token: token };
  })
};
userSchema.methods.saveUser = function() {
  const user = this;
  return user.save();
};
userSchema.statics.fetchAllUsers = function () {
  return this.model('User').find();
};
userSchema.statics.findUserWithEmail = function(email) {
  //let hashedPassword = '';

  // bcrypt.genSalt(10,(err, salt) => {
  //   bcrypt.hash(password, salt,(err, hash) => {
  //     hashedPassword = hash;
  //   });
  // });

  return this.model('User').findOne({ email: email }); //password: hashedPassword});
};
userSchema.statics.findUserWithId = function (userId) {
  return this.model('User').findOne({ _id: userId });
};

module.exports = mongoose.model('User', userSchema);
//! DOVRSITI MODELE I DOHVATANJE PODATAKA ODNOSNO UBACIVANJE PODATAKA U MONGO