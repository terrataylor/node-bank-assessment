'use strict';

var _students = require('../dummy/students');

var _students2 = _interopRequireDefault(_students);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.listUsers = function (req, res) {
  res.json({
    status: 200,
    message: 'List user route'
  });
};

exports.singleStudent = function (req, res) {
  var student = _students2.default.find(function (student) {
    return student.id === parseInt(req.params.id, 10);
  });
  if (student) {
    res.status(200).json({
      status: 200,
      student: student,
      message: 'Student Found'
    });
  } else {
    res.status(404).json({
      status: 404,
      message: 'Student Not Found'
    });
  }
};