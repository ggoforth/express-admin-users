'use strict';

var express = require('express');
var router = express.Router();

const Account = require('../modules/account');

/* GET /new-account */
router.get('/', function(req, res, next) {
  //Show a new account form
  res.render('new-account', {err: null});
});

/**
 * Create a new account
 */
router.post('/', (req, res, next) => {
  //creating a new account
  Account.passwordsMatch(req.body)
    .then(Account.create)
    .then(account => {
      res.json({account}); 
    })
    .catch(err => {
      res.render('new-account', {err: err});
    });
});



module.exports = router;
