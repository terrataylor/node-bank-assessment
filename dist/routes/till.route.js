'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var tillController = require('../controllers/till.controller');

router.get('/', tillController.listTillCount);
router.get('/value', tillController.listTillValue);
router.put('/', tillController.addCoins);
//router.get('/:id', tillController.singleStudent);
router.post('/', tillController.withdrawal);

module.exports = router;