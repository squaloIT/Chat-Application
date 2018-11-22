const express = require('express');
const bodyParser = require('body-parser');
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

app.get('/user/friends', (req, res) => {
  User.findUserWithId(req.param('uid')).then((user) => {
    console.log(user);
    res.status(200).json({
      message: 'Sve proslo kako treba',
      friends: user.friends 
    });
  }).catch((err) => {
    res.status(500).send({
      message: 'Greska prilikom dohvatanja podataka',
      // users
    });
    return console.error(err);
  });
});
module.exports = app;
