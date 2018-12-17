const request = require('request-promise'); // request library with promises
const binance = require('binance-node-api');

//https://medium.com/adobe-io/how-to-combine-rest-api-calls-with-javascript-promises-in-node-js-or-openwhisk-d96cbc10f299
//https://gist.github.com/learncodeacademy/bf04432597334190bef4
//https://www.npmjs.com/package/binance-node-api
//https://npm.runkit.com/binance-node-api

/*
usage:

let apis = require("./apis")

co(apis.apiGenerator).then((result) => {

    let nbpUSDPLN = result.nbpUSDPLN.body.rates[0].bid;
    let bitBTCPLN = result.bitBTCPLN.body.bid;
    let bitLTCPLN = result.bitLTCPLN.body.bid;
    let bitLSKPLN = result.bitLSKPLN.body.bid;
    let binADABTC = result.binADABTC.data[0].p;
    let binEOSBTC = result.binEOSBTC.data[0].p;

    console.log("nbpUSDPLN:" + JSON.stringify(result.nbpUSDPLN.body));
    console.log("bitBTCPLN:" + JSON.stringify(result.bitBTCPLN.body));
    console.log("bitLTCPLN:" + JSON.stringify(result.bitLTCPLN.body));
    console.log("bitLSKPLN:" + JSON.stringify(result.bitLSKPLN.body));
    console.log("binADABTC:" + JSON.stringify(result.binADABTC.data[0]));
    console.log("binEOSBTC:" + JSON.stringify(result.binEOSBTC.data[0]));

    console.log("nbpUSDPLN:" + nbpUSDPLN);
    console.log("bitBTCPLN:" + bitBTCPLN);
    console.log("bitLTCPLN:" + bitLTCPLN);
    console.log("bitLSKPLN:" + bitLSKPLN);
    console.log("binADABTC:" + binADABTC);
    console.log("binEOSBTC:" + binEOSBTC);
})
    .catch((err) => {

        console.error(err.stack);
});
*/



binanceAPI = Object.create( binance );
binanceAPI.init({

    apiKey: 'vRxtFMqMvoJVaV9psSGv3DNxv8YtcVzuLREy2Mmzaz0TnAwO2tvCvUkzUk1bM0pY',
    secretKey: '4hkTl7fuN5FMlHCal1k2Vbhpbkq3y2TxVWjhWOieyevrO2mwzEGtog1Og9AVEjsT'
});

//
/* ostatnia transakcja bitbay: https://bitbay.net/API/Public/LSKPLN/market.json
transactions[0] = {

    date: 1519251915
    price: 70.97
    type: "buy"
    amount: 2.0305763
    tid: "1506771" 
}

// po odczytaniu id ostatniej transakcji (tid) można wyciągnąć odpowiednią ilość trades:
var url2 = 'https://bitbay.net/API/Public/LSKPLN/trades.json?since=' + queryCounter

date 1467112853       (konwersja na datę: new Date(transaction.date * 1e3).toISOString().slice(0, -5) )
price 3.8
type "buy"
amount 5.22548008
tid "5"
6
date 1467113254
price 3.5
type "sell"
amount 15.22200012
tid "6"


* lepszą opcją jest posiadanie bazy transakcji i dogrywanie danych, wtedy po restarcie wystarczy pobrać dane od ostatniej transakcji w bazie

*/

exports.binanceAPI = binanceAPI;

exports.exchangesRates = function* () { // generator function to accumulate promises - for co.js library

    let allJsons = yield { 
        
        nbpUSDPLN: request({

            "method": "GET",
            "uri": 'http://api.nbp.pl/api/exchangerates/rates/C/USD?format=json',
            "json": true,
            "resolveWithFullResponse": true
        }),
        bitBTCPLN: request({ //"Rate limit exceeded (600r/10m) - IP banned for 10 minutes"

            "method": "GET",
            "uri": 'https://bitbay.net/API/Public/' + 'BTCPLN' + '/ticker.json',
            "json": true,
            "resolveWithFullResponse": true
        }),
        bitLTCPLN: request({ //"Rate limit exceeded (600r/10m) - IP banned for 10 minutes"

            "method": "GET",
            "uri": 'https://bitbay.net/API/Public/' + 'LTCPLN' + '/ticker.json',
            "json": true,
            "resolveWithFullResponse": true
        }),
        bitLSKPLN: request({ //"Rate limit exceeded (600r/10m) - IP banned for 10 minutes"

            "method": "GET",
            "uri": 'https://bitbay.net/API/Public/' + 'LSKPLN' + '/ticker.json',
            "json": true,
            "resolveWithFullResponse": true
        }),
        binADABTC: binanceAPI.getAggregateTrades({

            symbol: 'ADABTC',
            limit: 1      //Default: 500; max 500
        }),
        binEOSBTC: binanceAPI.getAggregateTrades({

            symbol: 'EOSBTC',
            limit: 1      //Default: 500; max 500
        }),
        binLTCBTC: binanceAPI.getAggregateTrades({

            symbol: 'LTCBTC',
            limit: 1      //Default: 500; max 500
        }),
        binLSKBTC: binanceAPI.getAggregateTrades({

            symbol: 'LSKBTC',
            limit: 1      //Default: 500; max 500
        }),
        binBTCUSDT: binanceAPI.getAggregateTrades({

            symbol: 'BTCUSDT',
            limit: 1      //Default: 500; max 500
        })
    }

    return allJsons;
}


/*
api.getAggregateTrades(options)

options = {
  symbol: 'string',   MANDATORY
  fromId: integer,
  startTime: integer, UNIX dateTime
  endTime: integer,   UNIX dateTime
  limit: integer      Default: 500; max 500
}

api.getCandles(options)

options = {
  symbol: 'string',   MANDATORY
  interval: ENUM,     MANDATORY
  limit: integer,     Default: 500; max 500
  startTime: integer, UNIX dateTime
  endTime: integer    UNIX dateTime
}
*/


// symbol umieszczony w kontekscie ma znaczenie - staje się infomacją (rzeczywistością - lub elementem rzeczywistosci (częścią))