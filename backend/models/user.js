const mongoose = require('mongoose');
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
  registeredAt: { type: Number, required: true },
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
  const token = jwt.sign({ userID: user._id }, 'minaqua', {expiresIn: '2h'}).toString();
  user.token = user.token.concat([{ access: 'auth', token: token}]);
  return user.save().then((userSaved) => {
    return { user: userSaved, token: token };
  })
};

userSchema.statics.fetchAllUsers = function () {
  return this.model('User').find();
};
userSchema.statics.findUserWithEmail = function(email) {
  return this.model('User').findOne({ email: email }).exec(); // Samo findOne ne daju 'fully fleged' promise, .exec() na to daje
};
userSchema.statics.findUserWithId = function (userId) {
  return this.model('User').findOne({ _id: userId }).exec();
};
userSchema.statics.deleteUsersToken = function(token) {
  // return this.model('User').deleteOne({ 'token.token': token });
  let jwtToken = jwt.verify(token, 'minaqua');
  console.log(jwtToken);

  return this.model('User').findOne({ _id: jwtToken.userID }).exec()
  .then((userFound) => {
    return Promise.resolve(userFound);
  })
  .then((user) => {
    console.log('User found after findOne');
    console.log(user);

    const filteredArrayOfTokens = user.token.filter((tokenObj) => tokenObj.token != token);
    user.token = filteredArrayOfTokens; //user.token.concat([{ access: 'auth', token: token}]);
    
    console.log('User tokens after filtering tokens');
    console.log(user.token);

    return user.save().then((userSaved) => {
      return { user: userSaved };
    });
  })
  .catch((err) => {
    console.error("Error iz catch!");
    console.error(err);
  }); // Mongoose ce konvertovati id u ObjectID ja ne razmisljam o tome.
}
module.exports = mongoose.model('User', userSchema);
//! DOVRSITI MODELE I DOHVATANJE PODATAKA ODNOSNO UBACIVANJE PODATAKA U MONGO