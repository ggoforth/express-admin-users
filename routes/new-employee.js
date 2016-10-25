'use strict';

var express = require('express');
var router = express.Router();

const Employee = require('../modules/employee');

/* GET /new-account */
router.get('/', function(req, res, next) {
  //Show a new account form
  res.render('new-employee', {err: null});
});

/**
 * Create a new account
 */
router.post('/', (req, res, next) => {
  //creating a new account
  Employee.create(req.body)
    .then(employee => {
      //TODO: redirect somewhere
      res.json({employee});
    })
    .catch(err => {
      res.render('new-account', {err: err});
    });
});

module.exports = router;
