import React, { Component } from 'react';

import logo from './logo.svg';
import ReactTable from 'react-table'

import LineChart from './LineChart'
import './App.css';

const d3 = require('d3');
//yarn dev (to start)

let getJSON = x => {

  var contentType = x.headers.get("content-type");
  if(contentType && contentType.includes("application/json")) return x.json();

  throw new TypeError("Oops, we haven't got JSON!");
}

class App extends Component {

  constructor() {
    super();



    this.data = [
            // { day: '02-11-2016', count: 180 },
            // { day: '02-12-2016', count: 250 },
            // { day: '02-13-2016', count: 150 },
            // { day: '02-14-2016', count: 496 },
            // { day: '02-15-2016', count: 140 },
            // { day: '02-16-2016', count: 380 },
            // { day: '02-17-2016', count: 100 },
            // { day: '02-18-2016', count: 150 }
    ];
    // var parseDate = d3.timeParse("%m-%d-%Y");

    // this.data.forEach(function (d) {

    //     d.date = parseDate(d.day);
    //     console.log(d.date)
    // });

  }

  state = {
    courses: [],
    elapsed: 0,
    start: Date.now()
  };

  componentDidMount() {

    // componentDidMount is called by react when the component
    // has been rendered on the page.
    this.timer = setInterval(this.tick.bind(this), 2000);

    // var request = new Request({
    //   url: '/api/candles/?currences=BTCUSDT&time=5m',
    //   method: 'GET'
    // });
    fetch('/api/candles/?currences=BTCUSDT&time=5m')
      .then(getJSON)
      .then(x => {

        this.setState({ candlesBTC: x.express });
        //console.log( x.express )
      })
      .catch(error => { console.log(error); });

    // request = new Request({
    //   url: '/api/candles/?currences=ADABTC&time=5m',
    //   method: 'GET'
    // });
    fetch('/api/candles/?currences=ADABTC&time=5m')
      .then(getJSON)
      .then(x => {

        this.setState({ candlesADA: x.express });
        //console.log( x.express )
      })
      .catch(error => { console.log(error); });


    // request = new Request({
    //   url: '/api/candles/?currences=EOSBTC&time=5m',
    //   method: 'GET'
    // });
    fetch('/api/candles/?currences=EOSBTC&time=5m')
      .then(getJSON)
      .then(x => {

        this.setState({ candlesEOS: x.express });
        //console.log( x.express )
      })
      .catch(error => { console.log(error); });

    // request = new Request({
    //   url: '/api/candles/?currences=LTCBTC&time=5m',
    //   method: 'GET'
    // });
    fetch('/api/candles/?currences=LTCBTC&time=5m')
      .then(getJSON)
      .then(x => {

        this.setState({ candlesLTC: x.express });
        console.log( x.express )
      })
      .catch(error => { console.log(error); });    

  }

  componentWillUnmount() {

    // This method is called immediately before the component is removed
    // from the page and destroyed. We can clear the interval here:

    clearInterval(this.timer);
  }

  tick() {
    console.log("tick..")
    // This function is called every 50 ms. It updates the
    // elapsed counter. Calling setState causes the component to be re-rendered


    fetch('/api/currences')
    .then( getJSON )
    .then(x => {
    
      this.setState({ courses: x.express }); 
      //console.log( x.express )
    })
    .catch(error => { console.log( error ); });



    this.setState({ elapsed: new Date() - this.state.start});// this.props.start });
  }

  render() {

    let data = this.state.courses.map ? this.state.courses : [{name:"", btc:"", usd: "", pln:"", total:""}]
    let columns = [
      { Header: 'Crypto', accessor: 'name', minWidth: 40},
      { Header: 'Price BTC', accessor: 'btc', minWidth: 40},
      { Header: 'Price USDT', accessor: 'usd', minWidth: 40},
      { Header: 'Price PLN', accessor: 'pln', minWidth: 40},
      { Header: 'Total PLN', accessor: 'total', minWidth: 40}
    ]

    let dataLine = { date: new Date(), count: data[1] ? (parseFloat(data[1].total) + parseFloat(data[2].total) + parseFloat(data[3].total) -800) *2 : 0  }
    
    if(dataLine.count > 0) this.data.push(dataLine);
    if (this.data.length > 2000) this.data.shift();
    console.log(dataLine.count)


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Current Binance prices:</h1>
        </header>
        <div> 
          <ReactTable defaultPageSize={8} data={data}  columns={columns} />
        </div>
        <div className="pad bottom-right-svg">
          <LineChart width={1600} height={400} chartId='v1_chart' data={this.data}/>
        </div>
        
      </div>
    );
  }
}
//y = { y }
export default App;
