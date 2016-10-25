'use strict';

const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: {type: Boolean, default: false}
});

mongoose.model('Account', AccountSchema);