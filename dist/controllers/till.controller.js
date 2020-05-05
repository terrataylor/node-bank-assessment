"use strict";

var _till = require("../dummy/till");

var _till2 = _interopRequireDefault(_till);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QUARTER = .25;
var DIME = .1;
var NICKEL = .05;
var PENNY = .01;

var getSum = function getSum(coins) {
  var quarters = coins.quarters * .25;
  var dimes = coins.dimes * .10;
  var nickels = coins.nickels * .05;
  var pennies = coins.pennies * .01;
  return quarters + dimes + nickels + pennies;
};

exports.listTillCount = function (req, res) {
  res.json({
    status: 200,
    message: _till2.default
  });
};

exports.listTillValue = function (req, res) {
  var quarters = _till2.default.quarters * .25;
  var dimes = _till2.default.dimes * .10;
  var nickels = _till2.default.nickels * .05;
  var pennies = _till2.default.pennies * .01;
  var total = getSum(_till2.default);
  res.json({
    status: 200,
    value: total
  });
};

exports.addCoins = function (req, res) {
  var _req$body = req.body,
      quarters = _req$body.quarters,
      dimes = _req$body.dimes,
      nickels = _req$body.nickels,
      pennies = _req$body.pennies;

  _till2.default.quarters = quarters ? _till2.default.quarters += parseInt(quarters) : _till2.default.quarters;
  _till2.default.dimes = dimes ? _till2.default.dimes += parseInt(dimes) : _till2.default.dimes;
  _till2.default.nickels = nickels ? _till2.default.nickels += parseInt(nickels) : _till2.default.nickels;
  _till2.default.pennies = pennies ? _till2.default.pennies += parseInt(pennies) : _till2.default.pennies;
  res.json({
    status: 200,
    change: _till2.default
  });
};

var getCoins = function getCoins(trans, coin, coinValue) {

  if (trans.amount > 0) {
    var numOfCoins = Math.floor(trans.amount.toFixed(2) / coinValue);
    console.log("amount", trans.amount.toFixed(2));
    console.log("get coins", coin, _till2.default[coin], numOfCoins);
    if (_till2.default[coin] >= numOfCoins) {
      _till2.default[coin] -= numOfCoins;
      trans[coin] = numOfCoins;
      console.log(coin, trans[coin]);
      trans.amount = trans.amount.toFixed(2);
      trans.amount -= numOfCoins * coinValue;
    }
  }
};

exports.withdrawal = function (req, res) {
  var amount = parseFloat(req.body.amount);
  var transaction = { amount: amount, quarters: 0, dimes: 0, nickels: 0, pennies: 0 };
  var tillAmount = getSum(_till2.default);
  getCoins(transaction, "quarters", QUARTER);
  getCoins(transaction, "dimes", DIME);
  getCoins(transaction, "nickels", NICKEL);
  getCoins(transaction, "pennies", PENNY);

  if (transaction.account == 0) {
    res.json({
      change: transaction,
      inAccount: tillAmount
    });
  } else {
    res.json({
      message: "Cannot Make Change",
      inAccount: tillAmount
    });
  }
};