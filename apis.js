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



binanceAPI = Object.create(binance);
binanceAPI.init({

    apiKey: 'vRxtFMqMvoJVaV9psSGv3DNxv8YtcVzuLREy2Mmzaz0TnAwO2tvCvUkzUk1bM0pY',
    secretKey: '4hkTl7fuN5FMlHCal1k2Vbhpbkq3y2TxVWjhWOieyevrO2mwzEGtog1Og9AVEjsT'
});



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

