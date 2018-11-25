const bcrypt = require('bcryptjs');

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash('jack987', salt, (err, hash) => {
    console.log(hash);
  });
});

