'use strict';

var express = require('express');
var router = express.Router();

const Employee = require('../modules/employee');

/* GET /new-account */
router.get('/', function(req, res, next) {
  //Show a new account form
  res.render('new-employee', {err: null, employee: null});
});

/**
 * Create a new account
 */
router.post('/', (req, res, next) => {
  //creating a new account
  Employee.create(req.body)
    .then(employee => {
      res.redirect('/employee-list');
    })
    .catch(err => {
      res.render('new-account', {err: err});
    });
});

module.exports = router;
