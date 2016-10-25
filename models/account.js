'use strict';

const mongoose = require('mongoose'),
  Promise = require('bluebird'),
  bcrypt = Promise.promisifyAll(require('bcrypt')); 

const AccountSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: {type: Boolean, default: false}
});

AccountSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    next();
  } else {
    //it is modified
    bcrypt.genSaltAsync(100)
      .then(salt => {
        bcrypt.hashAsync(this.password, salt)
          .then(hash => {
            this.password = hash;
            next();
          })
          .catch(next);
      })
      .catch(next);
  }
});

mongoose.model('Account', AccountSchema);