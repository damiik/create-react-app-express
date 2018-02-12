const express = require('express');
const binance = require('node-binance-api');
var request = require("request"); // for usd curse

const app = express();
const port = process.env.PORT || 5000;

binance.options({

  APIKEY: 'vRxtFMqMvoJVaV9psSGv3DNxv8YtcVzuLREy2Mmzaz0TnAwO2tvCvUkzUk1bM0pY',
  APISECRET: '4hkTl7fuN5FMlHCal1k2Vbhpbkq3y2TxVWjhWOieyevrO2mwzEGtog1Og9AVEjsT',
  useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
  test: true // If you want to use sandbox mode where orders are simulated
});

let dolarCoursePLN = 0.0;

request({
  url: 'http://api.nbp.pl/api/exchangerates/rates/C/USD?format=json',
  json: true
}, function (error, response, body) {

  if (!error && response.statusCode === 200) {
    dolarCoursePLN = body.rates && body.rates[0] ? body.rates[0].ask : 0.0;
    //console.log(body) // Print the json response
  }
})



// binance.balance((error, balances) => {
//   console.log("balances()", balances);
//   console.log("ETH balance: ", balances.ETH.available);
// });
// binance.bookTickers((error, ticker) => {
//   //console.log("bookTickers", ticker);
//   console.log("Price of EOS: ", ticker.EOSBTC);
// });

// binance.bookTickers((error, ticker) => {
//   //console.log("bookTickers", ticker);
//   console.log("Price of ADA: ", ticker.ADABTC);
// });


/*
var quantity = 1, price = 0.069;
binance.buy("ETHBTC", quantity, price);
binance.sell("ETHBTC", quantity, price);


var quantity = 1;
binance.marketBuy("BNBBTC", quantity, (error, response) => {// These orders will be executed at current market price.
  console.log("Market Buy response", response);
  console.log("order id: " + response.orderId);
  // Now you can limit sell with a stop loss, etc.
});


// When the stop is reached, a stop order becomes a market order
// Note: You must also pass one of these type parameters:
// STOP_LOSS, STOP_LOSS_LIMIT, TAKE_PROFIT, TAKE_PROFIT_LIMIT
let type = "STOP_LOSS";
let quantity = 1;
let price = 0.069;
let stopPrice = 0.068;
binance.sell("ETHBTC", quantity, price, {stopPrice: stopPrice, type: type});

*/


app.get('/api/currences', (req, res) => {

  let response = binance.prices( (error, ticker) => { // latest pirces

    let response = [

      {name: "BTC", btc: '1.0', usd:ticker.BTCUSDT, pln: (ticker.BTCUSDT * dolarCoursePLN).toFixed(2), total: '0.0'},
      {name: "ADA", btc: ticker.ADABTC, usd:(ticker.ADABTC * ticker.BTCUSDT).toFixed(2), pln: (ticker.ADABTC * ticker.BTCUSDT * dolarCoursePLN).toFixed(2), total: (ticker.ADABTC * ticker.BTCUSDT * dolarCoursePLN * 312.5).toFixed(2)},
      {name: "EOS", btc: ticker.EOSBTC, usd:(ticker.EOSBTC * ticker.BTCUSDT).toFixed(2), pln: (ticker.EOSBTC * ticker.BTCUSDT * dolarCoursePLN).toFixed(2), total: (ticker.EOSBTC * ticker.BTCUSDT * dolarCoursePLN * 5.999).toFixed(2)},
      {name: "LTC", btc: ticker.LTCBTC, usd:(ticker.LTCBTC * ticker.BTCUSDT).toFixed(2), pln: (ticker.LTCBTC * ticker.BTCUSDT * dolarCoursePLN).toFixed(2), total: (ticker.LTCBTC * ticker.BTCUSDT * dolarCoursePLN * 0.52223809).toFixed(2)},
      {name: "LSK", btc: ticker.LSKBTC, usd: (ticker.LSKBTC * ticker.BTCUSDT).toFixed(2), pln: (ticker.LSKBTC * ticker.BTCUSDT * dolarCoursePLN).toFixed(2), total: '0.0' }
    ];
    console.log(response);
    res.send({ express: response });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
