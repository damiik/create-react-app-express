import React, { Component } from 'react';

import logo from './logo.svg';
import ReactTable from 'react-table'

import LineChart from './LineChart'


import './App.css';
//yarn dev (to start)

let getJSON = x => { 
  
  var contentType = x.headers.get("content-type"); 
  if(contentType && contentType.includes("application/json")) return x.json();

  throw new TypeError("Oops, we haven't got JSON!");
}

class App extends Component {

  constructor() {
    super();
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

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Current Binance prices:</h1>
        </header>
        <div> 
          <ReactTable defaultPageSize={8} data={data}  columns={columns} />
        </div>
        <div>
          <LineChart width={600} height={300} chartId='v1_chart'/>
        </div>
        
      </div>
    );
  }
}
//y = { y }
export default App;
