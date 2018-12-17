const express = require('express');
// const bodyParser = require('body-parser');
//const binance = require('node-binance-api');
//var request = require("request"); // for usd curse
const co = require('co'); // for promises generator function
const apis = require('./apis');

const app = express();
const port = process.env.PORT || 5000;

// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/api/trades/:symbol/:limit', (req, res) => {
  //console.log("get>>>>>>>>>>>>>>>>" + req.params.symbol)
  apis.binanceAPI.getAggregateTrades({

    symbol: req.params.symbol,   //'ADABTC',
    limit: req.params.limit      //Default: 500; max 500
  }).then(( result ) => {

   // console.log("success>>>>>>>>>>>>>>>>" + req.params.symbol)
    //console.log( result.data );
    res.send( result.data );
  })
  .catch(( err ) => {

    console.log("fail>>>>>>>>>>>>>>>>" + req.params.symbol)
    console.error(err.stack);
  });
});


app.get('/api/currences', (req, res) => {

  co( apis.exchangesRates ).then(( result ) => {

    let nbpUSDPLN = result.nbpUSDPLN.body.rates ? (result.nbpUSDPLN.body.rates[0] ? result.nbpUSDPLN.body.rates[0].bid : 0.0) : 0.0;
    let bitBTCPLN = result.bitBTCPLN.body.last;
    let bitLTCPLN = result.bitLTCPLN.body.last;
    let bitLSKPLN = result.bitLSKPLN.body.last;
    let binADABTC = result.binADABTC.data[0] ? result.binADABTC.data[0].p : 0.0;
    let binEOSBTC = result.binEOSBTC.data[0] ? result.binEOSBTC.data[0].p : 0.0;
    let binLTCBTC = result.binLTCBTC.data[0] ? result.binLTCBTC.data[0].p : 0.0;
    let binLSKBTC = result.binLSKBTC.data[0] ? result.binLSKBTC.data[0].p : 0.0;
    let binBTCUSDT = result.binBTCUSDT.data[0] ? result.binBTCUSDT.data[0].p : 0.0;

    // console.log("nbpUSDPLN:" + JSON.stringify(result.nbpUSDPLN.body));
    // console.log("bitBTCPLN:" + JSON.stringify(result.bitBTCPLN.body));
    // console.log("bitLTCPLN:" + JSON.stringify(result.bitLTCPLN.body));
    // console.log("bitLSKPLN:" + JSON.stringify(result.bitLSKPLN.body));
    // console.log("binADABTC:" + JSON.stringify(result.binADABTC.data[0]));
    // console.log("binEOSBTC:" + JSON.stringify(result.binEOSBTC.data[0]));

    console.log("nbpUSDPLN:" + nbpUSDPLN);
    console.log("bitBTCPLN:" + bitBTCPLN);
    console.log("bitLTCPLN:" + bitLTCPLN);
    console.log("bitLSKPLN:" + bitLSKPLN);
    console.log("binADABTC:" + binADABTC);
    console.log("binEOSBTC:" + binEOSBTC);

    res.send({ express: [

        { name: "BTC", btc: '1.0', usd: (1.0 * binBTCUSDT).toFixed(2), pln: (binBTCUSDT * nbpUSDPLN).toFixed(2), bitpln: (bitBTCPLN).toFixed(2), bittotal: '0.0', total: '0.0'},
        { name: "ADA", btc: binADABTC, usd: (binADABTC * binBTCUSDT).toFixed(2), pln: (binADABTC * binBTCUSDT * nbpUSDPLN).toFixed(2), bitpln: (binADABTC * bitBTCPLN).toFixed(2), bittotal: (binADABTC * bitBTCPLN * 602.264).toFixed(2), total: (binADABTC * binBTCUSDT * nbpUSDPLN * 602.264).toFixed(2)},
      { name: "EOS", btc: binEOSBTC, usd: (binEOSBTC * binBTCUSDT).toFixed(2), pln: (binEOSBTC * binBTCUSDT * nbpUSDPLN).toFixed(2), bitpln: (binEOSBTC * bitBTCPLN).toFixed(2), bittotal: (binEOSBTC * bitBTCPLN * 30.17919).toFixed(2), total: (binEOSBTC * binBTCUSDT * nbpUSDPLN * 30.17919).toFixed(2)},
        { name: "LTC", btc: binLTCBTC, usd: (binLTCBTC * binBTCUSDT).toFixed(2), pln: (binLTCBTC * binBTCUSDT * nbpUSDPLN).toFixed(2), bitpln: (bitLTCPLN).toFixed(2), bittotal: (bitLTCPLN * 0.0).toFixed(2), total: (binLTCBTC * binBTCUSDT * nbpUSDPLN * 0.0).toFixed(2)},
        { name: "LSK", btc: binLSKBTC, usd: (binLSKBTC * binBTCUSDT).toFixed(2), pln: (binLSKBTC * binBTCUSDT * nbpUSDPLN).toFixed(2), bitpln: (bitLSKPLN).toFixed(2), bittotal: (bitLTCPLN * 0.0).toFixed(2), total: '0.0' }
      ]
    });
  })
  .catch(( err ) => {

      console.error(err.stack);
  });

});



app.listen(port, () => console.log(`Listening on port.. ${port}`));



















/*
binance.options({

  APIKEY: 'vRxtFMqMvoJVaV9psSGv3DNxv8YtcVzuLREy2Mmzaz0TnAwO2tvCvUkzUk1bM0pY',
  APISECRET: '4hkTl7fuN5FMlHCal1k2Vbhpbkq3y2TxVWjhWOieyevrO2mwzEGtog1Og9AVEjsT',
  useServerTime: true, // If you get timestamp errors, synchronize to server time at startup
  test: true // If you want to use sandbox mode where orders are simulated
});
*/

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
/*
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
*/

/*
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
*/


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
