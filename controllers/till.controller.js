import till from '../dummy/till';

const QUARTER = .25;
const DIME = .1;
const NICKEL = .05;
const PENNY = .01;



const getSum = coins => {
  let quarters = coins.quarters * .25;
  let dimes = coins.dimes * .10;
  let nickels = coins.nickels * .05;
  let pennies = coins.pennies * .01;
  return quarters + dimes + nickels + pennies;
}

exports.listTillCount = (req, res) => {
  res.json({
    status: 200,
    message: till
  });
}

exports.listTillValue = (req, res) => {
  let quarters = till.quarters * .25;
  let dimes = till.dimes * .10;
  let nickels = till.nickels * .05;
  let pennies = till.pennies * .01;
  let total = getSum(till);
  res.json({
    status: 200,
    value: total
  });
}

exports.addCoins = (req, res) => {
  const { quarters, dimes, nickels, pennies } = req.body;
  till.quarters = quarters ? till.quarters += parseInt(quarters) : till.quarters;
  till.dimes = dimes ? till.dimes += parseInt(dimes) : till.dimes;
  till.nickels = nickels ? till.nickels += parseInt(nickels) : till.nickels;
  till.pennies = pennies ? till.pennies += parseInt(pennies) : till.pennies;
  res.json({
    status: 200,
    change: till
  });
}

const getCoins = (trans, coin, coinValue) => {

  if (trans.amount > 0) {
    let numOfCoins = Math.floor(trans.amount.toFixed(2) / coinValue);
    console.log("amount", trans.amount.toFixed(2));
    console.log("get coins", coin, till[coin], numOfCoins);
    if (till[coin] >= numOfCoins) {
      till[coin] -= numOfCoins;
      trans[coin] = numOfCoins;
      console.log(coin, trans[coin]);
      trans.amount = trans.amount.toFixed(2);
      trans.amount -= (numOfCoins * coinValue);
    }
  }
}

exports.withdrawal = (req, res) => {
  let amount = parseFloat(req.body.amount);
  let transaction = { amount: amount, quarters: 0, dimes: 0, nickels: 0, pennies: 0 };
  const tillAmount = getSum(till);
  getCoins(transaction, "quarters", QUARTER);
  getCoins(transaction, "dimes", DIME);
  getCoins(transaction, "nickels", NICKEL);
  getCoins(transaction, "pennies", PENNY);

  if (transaction.account == 0) {
    res.json({
      change: transaction,
      inAccount: tillAmount
    })
  } else {
    res.json({
      message: "Cannot Make Change",
      inAccount: tillAmount
    })
  }
}

