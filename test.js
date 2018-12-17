const request = require('request-promise'); // request library with promises
const co = require('co'); // generator function for collecting more promises
const binance = require('binance-node-api');

//https://medium.com/adobe-io/how-to-combine-rest-api-calls-with-javascript-promises-in-node-js-or-openwhisk-d96cbc10f299
//https://gist.github.com/learncodeacademy/bf04432597334190bef4
//https://www.npmjs.com/package/binance-node-api
//https://npm.runkit.com/binance-node-api

binanceAPI = Object.create( binance );
binanceAPI.init({

    apiKey: 'vRxtFMqMvoJVaV9psSGv3DNxv8YtcVzuLREy2Mmzaz0TnAwO2tvCvUkzUk1bM0pY',
    secretKey: '4hkTl7fuN5FMlHCal1k2Vbhpbkq3y2TxVWjhWOieyevrO2mwzEGtog1Og9AVEjsT'
});


co(function* () {

    let allJsons = yield { 
        
        nbpUSDPLN: request({

            "method": "GET",
            "uri": 'http://api.nbp.pl/api/exchangerates/rates/C/USD?format=json',
            "json": true,
            "resolveWithFullResponse": true
        }),
        bitBTCPLN: request({

            "method": "GET",
            "uri": 'https://bitbay.net/API/Public/' + 'BTCPLN' + '/ticker.json',
            "json": true,
            "resolveWithFullResponse": true
        }),
        bitLTCPLN: request({

            "method": "GET",
            "uri": 'https://bitbay.net/API/Public/' + 'LTCPLN' + '/ticker.json',
            "json": true,
            "resolveWithFullResponse": true
        }),
        bitLSKPLN: request({

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
        }) //{"a":6133060,"p":"0.00065134","q":"3.00000000","f":6706317,"l":6706317,"T":1521064208612,"m":false,"M":true}
    }
    return allJsons;

})
.then(( result ) => {

    let nbpUSDPLN = result.nbpUSDPLN.body.rates[0].bid;
    let bitBTCPLN = result.bitBTCPLN.body.last;
    let bitLTCPLN = result.bitLTCPLN.body.last;
    let bitLSKPLN = result.bitLSKPLN.body.last;
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
.catch(( err ) => {

    console.error(err.stack);
});


/*
request({
    "method": "GET",
    "uri": uri,
    "json": true,
    "resolveWithFullResponse": true,
    "headers": {

        "Authorization": "Bearer " + github.token,
        "User-Agent": "My little demo app"
    }
})
*/

/*
request({
    url: nbpUsdUrl,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        dolarCoursePLN = body.rates && body.rates[0] ? body.rates[0].ask : 0.0;
        console.log(body) // Print the json response
    }
})


request({
    url: tickerUrl,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        dolarCoursePLN = body.rates && body.rates[0] ? body.rates[0].ask : 0.0;
        console.log(body.average) // Print the json response
    }
})
*/

/*
const co = require('co');
const marked = require('marked');
const fs = require('fs-promise');
const handlebars = require('handlebars');

co(function *() {
  let md = yield fs.readFile('README.md');
  let html = marked(md.toString());
  let template = yield fs.readFile('layout.hbs');
  let output = handlebars.compile(template.toString())({
    title: 'README',
    contents: html
  });
  yield fs.writeFile('index.html', output);
}).catch(function(err) {
  console.error(err.stack);
});
*/