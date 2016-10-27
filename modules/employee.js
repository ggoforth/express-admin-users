'use strict';

const mongoose = require('mongoose'),
  Employee = mongoose.model('Employee');

/**
 * Create an Employee.
 *
 * @param data
 * @returns {Promise.<TResult>}
 */
function create(data) {
  let employee = new Employee(data);
  return employee.save()
    .then(() => employee)
    .catch(err => {
      console.log('The Error: ', err);
    });
}

/**
 * Find the employees.
 * 
 * @param query
 * @returns {*|Query|T}
 */
function read(query) {
  query = query || {};
  return Employee.find(query); 
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
