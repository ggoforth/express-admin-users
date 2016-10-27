'use strict';

const express = require('express'),
  router = express.Router(),
  moment = require('moment'),
  _ = require('lodash'),
  Employee = require('../modules/employee');

router.use((req, res, next) => {
  if (!req.user) {
    res.redirect('/login');
  } else {
    next();
  }
});

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

      res.render('employee-list', {employees, user: req.user});
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
        let employee = employees[0].toObject();
        employee.hire_date = moment(employee.hire_date).format('YYYY-MM-DD');
        console.log(employee.hire_date);
        res.render('new-employee', {err: null, employee: employee});
      }
    });
});

router.put('/:id', (req, res, next) => {
  console.log(req.body.hire_date);
  Employee.read({_id: req.params.id})
    .then(employees => {
      if (!employees.length) {
        next(new Error('Could not find employee'));
      } else {
        let employee = employees[0];
        _.assign(employee, req.body);
        employee.save()
          .then(() => {
            res.redirect('/employee-list');
          });
      }
    });
});

module.exports = router;
