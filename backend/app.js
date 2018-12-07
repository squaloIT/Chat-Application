const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ChatApp_Angular-NodeJS').then(() => {
  console.log("Connected to db!");
}).catch((err) => {
  console.err(err);
});

const User = require('./models/user');

app.use(bodyParser.json());

app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length');
  res.header('Access-Control-Expose-Headers', 'Content-Type, Authorization, tokenkey');
  next();
});

app.get('/users', (req, res) => {
  User.fetchAllUsers().then((documents) => {
    console.log(documents);
    res.status(200).json({
      message: 'Sve proslo kako treba',
      users: documents
    });
  }).catch((err) => {
    res.status(500).send({
      message: 'Greska prilikom dohvatanja podataka',
      // users
    });
    return console.error(err);
  });
});

app.get('/user/id', (req, res) => {
  const token = req.header('authorization');

  if (!token) {
    res.send(402).send('Unathorazed access');
    return;
  }

  const userIDAndTimeWhenTokenIsMade = jwt.verify(token, 'minaqua');
  res.status(200).json({ idAndTimestamp: userIDAndTimeWhenTokenIsMade });
});

app.get('/user/friends', (req, res) => {
  const token = req.header('authorization').split(' ')[1];
  const bearer = jwt.verify(token, 'minaqua');
  console.log('bearer FROM /USER/FRIENDS');
  console.log(bearer);

  User.findUserWithId(bearer.userID).then((user) => {
    if (!user) {
      throw new Error('Greska prilikom dohvatanja podataka za prijatelja');
    }
    console.log('user.friends');
    console.log(user.friends.toObject());
    res.status(200).json({
      message: 'Sve proslo kako treba',
      friends: user.friends
    });
  }).catch((err) => {
    res.status(500).send({
      message: 'Greska prilikom dohvatanja podataka',
    });
    return console.error(err);
  });
});

app.delete('/users/token', (req, res) => {
  const auth_token = req.header('authorization').split(' ')[1];
  console.log('auth token');
  console.log(auth_token);

  User.deleteUsersToken(auth_token)
    .then((userWithDeletedToken) => {

      if (!userWithDeletedToken) {
        console.log('TOken nije obrisan');
        res.status(500).send();
        return;
      }
      console.log('TOken obrisan');
      res.status(204).send();
    })
    .catch((err) => {
      console.error("Error iz catch!");
      console.error(err);
      res.status(500).send();
    });
});

app.post('/auth/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findUserWithEmail(body.email).then((user) => {
    if (!user) {
      throw new Error('Could not find user with defined email.');
    }
    let resultBcryptCompare = bcrypt.compareSync(body.password, user.password);
    if (!resultBcryptCompare) {
      throw new Error('No user with specified email and password - password problem');
    }
    return user.generateAuthToken();
  })
    .then((userAndToken) => {
      res.header(
        'Authorization', userAndToken.token
      )
        .status(200)
        .json({ message: 'sve proslo ok ', user: userAndToken.user.toObject() });
      console.log(res.getHeader('authorization'));
    })
    .catch((err) => {
      console.log('CATCH POZVAN');
      console.log(err);
      res.status(400).send({ message: err.toString() });
    });
});

app.post('/auth/register', (req, res) => {
  const body = _.pick(req.body, ['email', 'username', 'password']);
  User.findUserWithEmail(body.email).then((data) => {
    if (data) {
      throw new Error('Username with specified email already exists');
    }
    Promise.resolve();

  }).then(() => {
    let hashedPassword;
    try {
      const salt = bcrypt.genSaltSync(10);
      hashedPassword = bcrypt.hashSync(body.password, salt);
    } catch (e) {
      throw new Error(e);
    }
    const user = new User({
      username: body.username,
      email: body.email,
      password: hashedPassword,
      registeredAt: moment().valueOf(),
      token: [{ access: 'auth', token: '123' }],
      friends: [{ _id: '5bf6a2174b973e651e69d331' }]
    });
    return user.save();

  }).then((savedUser) => {
    if (!savedUser) {
      throw new Error("Korisnik nije uspesno upisan u mongo");
    }
    res.status(200).json({
      message: 'Sve ok korisnik sacuvan',
      user: savedUser.toObject()
    });
  })
    .catch((err) => {
      console.log(err);
      console.log("Usao u catch");
      res.status(400).json({
        message: err.toString(),
        user: {}
      });
    });

});
module.exports = app;
