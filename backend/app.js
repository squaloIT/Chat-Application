const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, DELETE');
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

app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['username', 'password', 'email']);
  let hashedPassword = '';
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(body.password, salt, (err, hash) => {
      hashedPassword = hash;
    });
  });
  const userForInsert = new User({
    username: body.username,
    email: body.email,
    password: hashedPassword,
    token: [{
      access: 'auth',
      token: ''
    }],
    friends: [{ _id: '5bf6a2314b973e651e69d33f' }]
  });
  userForInsert.save().then((user) => {
    console.log('Sve ok proslo, korsinik sacuvan');
    res.status(201).json(user);
  })
    .catch((error) => {
      res.status(400).send(error);
      console.error(error);
    });
});

app.get('/user/friends', (req, res) => {
  User.findUserWithId(req.param('uid')).then((user) => {
    if (user) {
      res.status(200).json({
        message: 'Sve proslo kako treba',
        friends: user.friends
      });
    } else {
      res.status(500).send({
        message: 'Greska prilikom dohvatanja podataka',
      });
    }
  }).catch((err) => {
    res.status(500).send({
      message: 'Greska prilikom dohvatanja podataka',
    });
    return console.error(err);
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
  }).then((userAndToken) => {
    res.status(200).header('x-auth', userAndToken.token).send({ message: 'sve proslo ok ', user: userAndToken.user.toObject() });
  }).catch((err) => {
    res.status(400).send({message: err.toString()});
  });
});

app.post('/auth/register', (req, res)=>{
  const body = _.pick(req.body, ['email','username','password'])
});
module.exports = app;
