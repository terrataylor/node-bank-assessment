import till from '../data/till';

const QUARTER = .25;
const DIME = .1;
const NICKEL = .05;
const PENNY = .01;
let transLog = [];
const CURRENCY = [{ name: "quarters", value: .25 }, { name: "dimes", value: .1 }, { name: "nickels", value: .05 }, { name: "pennies", value: .01 }];

//Function to add value of all coins
const getSum = coins => {
  let quarters = coins.quarters * .25;
  let dimes = coins.dimes * .10;
  let nickels = coins.nickels * .05;
  let pennies = coins.pennies * .01;
  let sum = quarters + dimes + nickels + pennies;
  return sum.toFixed(2);
}

//Function to return the count of each coin in the till
exports.listTillCount = (req, res) => {
  res.json({
    status: 200,
    tillValue: till
  });
}


//Function to get total value of all coins currently in till: return the value of all coins in the till
exports.listTillValue = (req, res) => {
  let total = getSum(till);
  res.json({
    status: 200,
    tillValue: total
  });
}

//Function to add coins to till:  stock the till with coins (PUT & PATCH), either by replacing the till or just adding coins
exports.addCoins = (req, res) => {
  //destructure coin values from request body
  const { quarters, dimes, nickels, pennies } = req.body;
  //if each coin type has a value, convert it to an integer and add it to the till
  till.quarters = quarters ? till.quarters += parseInt(quarters) : till.quarters;
  till.dimes = dimes ? till.dimes += parseInt(dimes) : till.dimes;
  till.nickels = nickels ? till.nickels += parseInt(nickels) : till.nickels;
  till.pennies = pennies ? till.pennies += parseInt(pennies) : till.pennies;
  res.json({
    status: 200,
    message: "Coins added"
  });
}

//Calculate how many coins will be given as changed and removed from the till
const getCoins = (trans, coin, coinValue) => {
  if (trans.amount > 0) {
    let numOfCoins = Math.floor(trans.amount.toFixed(2) / coinValue);
    if (till[coin] >= numOfCoins) {
      //removing coins from till
      till[coin] -= numOfCoins;
      //setting the number of coins to be returned
      trans[coin] = numOfCoins;
      trans.amount = trans.amount.toFixed(2);
      //removing total coin value of transaction from the amount value
      trans.amount -= (numOfCoins * coinValue);
    }
  }
}

//calculate coins that would be needed to give change
const getCoinsNeeded = (trans, coin, coinValue) => {
  if (trans.amount > 0) {
    //Make sure amount is rounded to 2 decimal places
    trans.amount = trans.amount.toFixed(2);
    let numOfCoins = Math.floor(trans.amount / coinValue);
    //setting the number of coins to be returned
    trans[coin] = numOfCoins;
    //removing total coin value of transaction from the amount value
    trans.amount -= (numOfCoins * coinValue);
  }
}


//Function to produce change from withdrawal: given a change amount ( < $1) - compute the optimal 
//(smallest number of coins) needed to fufill the request (given the current coins in the till); if you can't make change note that
exports.withdrawal = (req, res) => {
  let amount = parseFloat(req.body.amount);
  //object to keep track of amount requested in transaction and the coins that will make up that amount
  let transaction = { amount: amount, quarters: 0, dimes: 0, nickels: 0, pennies: 0 };
  //get current value of till
  const tillAmount = getSum(till);

  //retrieve coins for change starting with quarters to return the least amount of coins from till
  for (let i = 0; i < CURRENCY.length; i++) {
    getCoins(transaction, CURRENCY[i].name, CURRENCY[i].value);
  }

  //if all change was able to be returned, return a json with the change values and how much total money is remaining in the till
  if (transaction.amount == 0) {
    transaction.amount = amount;
    res.json({
      status: 200,
      change: transaction,
      tillValue: tillAmount
    })
  } else {
    transaction.amount = amount;
    //Get coins that would be needed in till produce change
    for (let i = 0; i < CURRENCY.length; i++) {
      getCoinsNeeded(transaction, CURRENCY[i].name, CURRENCY[i].value);
    }

    let coinsNeeded = {
      quarters: transaction.quarters, dimes: transaction.dimes, nickels: transaction.nickels, pennies: transaction.pennies
    };
    transLog.push({ amount: amount, tillAmountNeeded: coinsNeeded })
    //Else inform the user that change can not be made with how much is currently in the till
    res.json({
      error: "Cannot Make Change, not enough in till",
      tillValue: tillAmount
    })
  }
}


//Bonus: return the values (< $1) for which you can't make change for 
//(as an array) as well as the minimal set of coins you need to continue to make change
exports.getTransactionLog = (req, res) => {
  res.json({
    status: 200,
    log: transLog
  })
}