'use strict';

const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  location: String,
  hire_date: Date,
  department: String,
  position: String,
  image: String
});

mongoose.model('Employee', EmployeeSchema);
