'use strict';

const mongoose = require('mongoose'),
  Account = mongoose.model('Account'),
  Promise = require('bluebird');

/**
 * Do the passwords match.
 * 
 * @param data
 */
function passwordsMatch(data) {
  return new Promise((resolve, reject) => {
    if (data.password !== data.passwordConfirm) {
      reject(new Error('Sorry, but the passwords did not match'));
    } else {
      resolve(data);
    }
  });  
}

/**
 * Create an Account.
 * 
 * @param data
 * @returns {Promise.<TResult>}
 */
function create(data) {
  let account = new Account(data);
  return account.save()
    .then(() => account)
    .catch(err => {
      console.log('The Error: ', err);
    });
}

function read() {

}

function update() {
  
}

function del() {
  
}

module.exports = {
  create,
  read,
  update,
  del,
  passwordsMatch
};