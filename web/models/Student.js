var
  mongoose = require('mongoose'),
  Schema = require('../schemas/Student');

module.exports = mongoose.model('Student', Schema);