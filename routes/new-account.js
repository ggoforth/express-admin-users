'use strict';

var express = require('express');
var router = express.Router();

const Account = require('../modules/account');

/* GET /new-account */
router.get('/', function(req, res, next) {
  //Show a new account form
});

/**
 * Create a new account
 */
router.post('/', (req, res, next) => {
  //creating a new account
  Account.create(req.body)
    .then(account => {
      res.json({account});
    });
});



module.exports = router;
