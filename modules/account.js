'use strict';

const mongoose = require('mongoose'),
  Account = mongoose.model('Account');

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
  del
};