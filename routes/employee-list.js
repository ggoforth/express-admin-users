'use strict';

const express = require('express'),
  router = express.Router(),
  moment = require('moment'),
  _ = require('lodash'),
  Employee = require('../modules/employee');

router.get('/', (req, res, next) => {
  //show the employee list
  Employee.read()
    .then(employees => {
      employees = _.map(employees, employee => {
        let emp = employee.toObject(),
          hireDate = moment(employee.hire_date).format('MMM Do, YYYY');

        emp.hireDateFormat = hireDate;
        return emp;
      });

      res.render('employee-list', {employees});
    })
    .catch(next);
});

/**
 * Show the edit form for a user.
 */
router.get('/:id', (req, res, next) => {
  Employee.read({_id: req.params.id})
    .then(employees => {
      if (!employees.length) {
        next(new Error('Could not find employee')); 
      } else {
        res.render('new-employee', {err: null, employee: employees[0]});
      }
    });
});

module.exports = router;
