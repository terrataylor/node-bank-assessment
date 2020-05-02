'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var studentsController = require('../controllers/students.controller');

router.get('/', studentsController.listUsers);
router.get('/:id', studentsController.singleStudent);

module.exports = router;