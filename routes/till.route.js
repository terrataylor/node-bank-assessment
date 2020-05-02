import express from 'express';
const router = express.Router();

const tillController = require('../controllers/till.controller');

router.get('/', tillController.listTillCount);
router.get('/value', tillController.listTillValue);
router.put('/', tillController.addCoins)
//router.get('/:id', tillController.singleStudent);
router.post('/', tillController.withdrawal);


module.exports = router;