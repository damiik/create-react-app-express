import React, { Component } from 'react';

import logo from './logo.svg';
import ReactTable from 'react-table'

import LineChart from './LineChart'
import WarChart from './WarChart'
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

    this.date = new Date();
    //console.log(localStorage.getItem("data0"));
    this.data0 = []; //localStorage.getItem("data0") ? JSON.parse(localStorage.getItem("data0")) : [];
    this.data1 = []; //localStorage.getItem("data1") ? JSON.parse(localStorage.getItem("data1")) : [];
    this.data2 = []; //localStorage.getItem("data2") ? JSON.parse(localStorage.getItem("data2")) : [];
    this.data3 = []; //localStorage.getItem("data3") ? JSON.parse(localStorage.getItem("data3")) : [];
    this.data4 = []; //localStorage.getItem("data3") ? JSON.parse(localStorage.getItem("data3")) : [];
    this.data5 = []; //localStorage.getItem("data3") ? JSON.parse(localStorage.getItem("data3")) : [];
    //date correction
    // this.data0 = this.data0.map ? this.data0.map((ob) => { return { date: new Date(ob.date), count: ob.count }; }) : [];
    // this.data1 = this.data1.map ? this.data1.map((ob) => { return { date: new Date(ob.date), count: ob.count }; }) : [];
    // this.data2 = this.data2.map ? this.data2.map((ob) => { return { date: new Date(ob.date), count: ob.count }; }) : [];
    // this.data3 = this.data3.map ? this.data3.map((ob) => { return { date: new Date(ob.date), count: ob.count }; }) : [];

    // var parseDate = d3.timeParse("%m-%d-%Y");

    // this.data.forEach(function (d) {

    //     d.date = parseDate(d.day);
    //     console.log(d.date)
    // });

  }

  state = {

    courses: [],
    trades: [],
    elapsed: 0,
    start: Date.now()
  };

  componentDidMount() {

    this.data0 = localStorage.getItem("data0") ? JSON.parse(localStorage.getItem("data0")) : [];
    this.data1 = localStorage.getItem("data1") ? JSON.parse(localStorage.getItem("data1")) : [];
    this.data2 = localStorage.getItem("data2") ? JSON.parse(localStorage.getItem("data2")) : [];
    this.data3 = localStorage.getItem("data3") ? JSON.parse(localStorage.getItem("data3")) : [];
    this.data4 = localStorage.getItem("data4") ? JSON.parse(localStorage.getItem("data4")) : [];
    this.data5 = localStorage.getItem("data5") ? JSON.parse(localStorage.getItem("data5")) : [];

    // this.data0 =  [];
    // this.data1 =  [];
    // this.data2 =  [];
    // this.data3 =  [];
    // this.data4 =  [];
    // this.data5 =  [];

    //date correction
    this.data0 = this.data0.map ? this.data0.map(( ob ) => { return { date: new Date( ob.date ), count: ob.count}; }) : [];
    this.data1 = this.data1.map ? this.data1.map(( ob ) => { return { date: new Date( ob.date ), count: ob.count}; }) : [];
    this.data2 = this.data2.map ? this.data2.map(( ob ) => { return { date: new Date( ob.date ), count: ob.count}; }) : [];
    this.data3 = this.data3.map ? this.data3.map(( ob ) => { return { date: new Date( ob.date ), count: ob.count}; }) : [];
    this.data4 = this.data4.map ? this.data4.map(( ob ) => { return { date: new Date( ob.date ), count: ob.count}; }) : [];
    this.data5 = this.data5.map ? this.data5.map(( ob ) => { return { date: new Date( ob.date ), count: ob.count}; }) : [];

    //data2.map(d => d.date)



    // componentDidMount is called by react when the component
    // has been rendered on the page.
    this.timer = setInterval(this.tick.bind(this), 5000); //  //"Rate limit exceeded (600r/10m) - IP banned for 10 minutes" (nie mniej niż 3000 przy 3 zapytaniach  do bitbay)


    // fetch('/api/candles/?currences=BTCUSDT&time=5m')
    //   .then(getJSON)
    //   .then(x => {

    //     this.setState({ candlesBTC: x.express });
    //     //console.log( x.express )
    //   })
    //   .catch(error => { console.log(error); });


    // fetch('/api/candles/?currences=ADABTC&time=5m')
    //   .then(getJSON)
    //   .then(x => {

    //     this.setState({ candlesADA: x.express });
    //     //console.log( x.express )
    //   })
    //   .catch(error => { console.log(error); });



    // fetch('/api/candles/?currences=EOSBTC&time=5m')
    //   .then(getJSON)
    //   .then(x => {

    //     this.setState({ candlesEOS: x.express });
    //     //console.log( x.express )
    //   })
    //   .catch(error => { console.log(error); });

    // fetch('/api/candles/?currences=LTCBTC&time=5m')
    //   .then(getJSON)
    //   .then(x => {

    //     this.setState({ candlesLTC: x.express });
    //     console.log( x.express )
    //   })
    //   .catch(error => { console.log(error); });    

  }

  componentWillUnmount() {

    // This method is called immediately before the component is removed
    // from the page and destroyed. We can clear the interval here:

    clearInterval(this.timer);

    localStorage.setItem("data0", JSON.stringify(this.data0));
    localStorage.setItem("data1", JSON.stringify(this.data1));
    localStorage.setItem("data2", JSON.stringify(this.data2));
    localStorage.setItem("data3", JSON.stringify(this.data3));
    localStorage.setItem("data4", JSON.stringify(this.data4));
    localStorage.setItem("data5", JSON.stringify(this.data5));
  }


  tick() {

    this.date = new Date();
    console.log("tick..")
    // This function is called every 50 ms. It updates the
    // elapsed counter. Calling setState causes the component to be re-rendered

    fetch('/api/currences')
    .then( getJSON )
    .then(x => {
    
      this.setState({ courses: x.express, elapsed: this.date - this.state.start }); 
      //this.setState({ elapsed: this.date - this.state.start});// this.props.start });
      localStorage.setItem("data0", JSON.stringify(this.data0));
      localStorage.setItem("data1", JSON.stringify(this.data1));
      localStorage.setItem("data2", JSON.stringify(this.data2));
      localStorage.setItem("data3", JSON.stringify(this.data3));
      localStorage.setItem("data4", JSON.stringify(this.data4));
      localStorage.setItem("data5", JSON.stringify(this.data5));      

      //console.log( x.express )
    })
    .catch(error => { console.log( error ); });


    fetch('/api/trades/LTCUSDT/10')//'/api/trades', {symbol:'LTCUSDT', limit:10})
      .then(getJSON)
      .then(x => {

        this.setState({ ...this.state, trades: x })

        //console.log( x )
      })
      .catch(error => { console.log(error); });
  }


  render() {

    let data = this.state.courses.map ? this.state.courses : [{name:"", btc:"", usd: "", pln:"", bitpln:"", total:""}];
    let columns = [

      { Header: 'Crypto', accessor: 'name', minWidth: 40},
      { Header: 'Price BTC', accessor: 'btc', minWidth: 40},
      { Header: 'Price USDT', accessor: 'usd', minWidth: 40},
      { Header: 'Price PLN', accessor: 'pln', minWidth: 40},
      { Header: 'Bit Price PLN', accessor: 'bitpln', minWidth: 40 },
      { Header: 'Total PLN', accessor: 'total', minWidth: 40},
      { Header: 'Bit Total PLN', accessor: 'bittotal', minWidth: 40 }
    ]
    let dataLine0 = { date: this.date, count: data[1] ? (parseFloat(data[1].bittotal) + parseFloat(data[2].bittotal) + parseFloat(data[3].bittotal)) : 0  }
    let dataLine1 = { date: this.date, count: data[3] ? (parseFloat(data[3].bitpln)) : 0 }
    let dataLine2 = { date: this.date, count: data[1] ? (parseFloat(data[1].bittotal)) : 0 }
    let dataLine3 = { date: this.date, count: data[2] ? (parseFloat(data[2].bittotal)) : 0 }
    let dataLine4 = { date: this.date, count: data[0] ? (parseFloat(data[0].pln)) : 0 }
    let dataLine5 = { date: this.date, count: data[4] ? (parseFloat(data[4].pln)) : 0 }

    if(dataLine0.count > 0) this.data0.push(dataLine0);
    if (this.data0.length > 4000) this.data0.shift();
    //console.log("data0:" + JSON.stringify(this.data0))

    //if (dataLine1.count > 0 && this.data1.length - 1 > -1 && this.data1[this.data1.length - 1].count !== dataLine1.count) this.data1.push(dataLine1);
    if (dataLine1.count > 0) this.data1.push(dataLine1);  //LTC
    if (this.data1.length > 4000) this.data1.shift();

    if (dataLine2.count > 0) this.data2.push(dataLine2);  //ADA
    if (this.data2.length > 4000) this.data2.shift();

    if (dataLine3.count > 0) this.data3.push(dataLine3);  //EOS
    if (this.data3.length > 4000) this.data3.shift();

    if (dataLine4.count > 0) this.data4.push(dataLine4);  //BTC
    if (this.data4.length > 4000) this.data4.shift();

    if (dataLine5.count > 0) this.data5.push(dataLine5);  //LSK
    if (this.data5.length > 4000) this.data5.shift();

    const margins = { top: 10, right: 40, bottom: 80, left: 100}, svgDimensions = { height: 500, width: 1800};

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Current altcoins prices:</h1>
        </header>
        <div> 
          <ReactTable defaultPageSize={8} data={data}  columns={columns} />
        </div>
        <div className="pad bottom-right-svg">
     
          <div className="lineChart">
            <LineChart id = "0" name = "Total PLN"    margins={margins} svgDimensions={svgDimensions} data0={this.data0} stroke="#20FF20" />
            <LineChart id = "1" name = "Litecoin LTC" margins={margins} svgDimensions={svgDimensions} data0={this.data1} stroke="#e0ff06" />
            <LineChart id = "2" name = "Cardano ADA"  margins={margins} svgDimensions={svgDimensions} data0={this.data2} stroke="#3396ff" />
            <LineChart id = "3" name = "EOS"          margins={margins} svgDimensions={svgDimensions} data0={this.data3} stroke="#A07FFF" />
            <LineChart id = "4" name = "Bitcoin BTC"  margins={margins} svgDimensions={svgDimensions} data0={this.data4} stroke="#FF3636" />
            <LineChart id = "5" name = "Lisk LSK"     margins={margins} svgDimensions={svgDimensions} data0={this.data5} stroke="#FFa816" />
            <WarChart id="5" name="LiteCoin WAR" margins={margins} svgDimensions={svgDimensions} data0={this.state.trades} stroke="#FFa816" />
          </div>
        </div>
      </div>
    );
  }
}

// <LineChart width={1600} height={400} chartId='v1_chart' data={this.data}/>
//y = { y }
export default App;
