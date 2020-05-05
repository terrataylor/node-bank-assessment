# node-bank-assessment
Libera-Bank is building a demonstration for a POS system.  To ensure that cashiers give customers the correct (and optimal) set of change - you will devise an algorithm to compute the change (based on US currency)


### Instructions to run this application

Please run 'npm install' to install necessary packages.
Then run 'npm run dev' to start server



### Api Information:

*To get current coins in till:*   
    method: GET      
    url: localhost:1234/till

*To add coins to till:*     
    method: PUT/PATCH   
    url: localhost:1234/till   
    payload: pass an object into your request body with the coins you would like added in this format:  
  { quarters: 0, dimes: 0, nickels:0, pennies:0 }  

*To get the value of all coins in the till:* 
    method: GET  
    url: localhost:1234/till/value

*To request change from the till:*  
    method: POST     
    url: localhost:1234/till       
    payload: pass an object to your request body with the amount you would like in change in this format:  
   { amount: 0.99 }  

*To get a log of failed transactions:*  
    method:GET  
    url: localhost:1234/till/log  


For development, API was tested using Postman

### To run tests, please run 'npm run tests'  
    6 tests will be run using mocha and chai:  
     √ should get a count of coins in the till  
     √ should get the value of coins in the till  
     √ should add coins to the till  
     √ should add coins to the till (PATCH)  
     √ should get change in coins from the till  
     √ should get log of failed transactions  

These tests check basic API functionality.  More detailed tests to check coin values and transactions should be added.