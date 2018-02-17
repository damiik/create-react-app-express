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

// binance.trades("ADABTC", (error, trades, symbol) => {
//   console.log(symbol + " trade history", trades);
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
      {name: "LSK", btc: ticker.LSKBTC, usd:(ticker.LSKBTC * ticker.BTCUSDT).toFixed(2), pln: (ticker.LSKBTC * ticker.BTCUSDT * dolarCoursePLN).toFixed(2), total: '0.0' }
    ];
    //console.log(response);
    res.send({express: response });
  });
});


/*
[ 1518526200000,
[0]     '0.00004043',
[0]     '0.00004052',
[0]     '0.00004041',
[0]     '0.00004047',
[0]     '420414.00000000',
[0]     1518526499999,
[0]     '17.00206547',
[0]     208,
[0]     '366182.00000000',
[0]     '14.80920658',
[0]     '0' ]
*/
app.get('/api/candles', (req, res) => {

  // Periods: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
  binance.candlesticks(req.query.currences, req.query.time, function (error, ticks) {
    
    //console.log("candlesticks()", ticks);
    let last_tick = ticks[ticks.length - 1];
    let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
    console.log(req.query.currences + ":" + close);

    //console.log(response);
    res.send({ express: ticks });
  });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
