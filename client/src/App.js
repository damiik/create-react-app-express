import PropTypes from 'prop-types';
import React, { Component } from 'react';

import logo from './logo.svg';
import ReactTable from 'react-table'
//import d3 from 'd3'
import Chart from 'react-d3-core'
import LineChart from 'react-d3-basic'

//import generalChartData from './data'

import './App.css';
//yarn dev (to start)
const d3 = require('d3');

let generalChartData =
  [
    {
      "name": "Darron Weissnat IV",
      "BMI": 20.72,
      "age": 39,
      "birthday": "2005-01-03T00:00:00.000Z",
      "city": "East Russel",
      "married": false,
      "index": 0
    },
    {
      "name": "Pablo Ondricka",
      "BMI": 19.32,
      "age": 38,
      "birthday": "1974-05-13T00:00:00.000Z",
      "city": "Lake Edytheville",
      "married": false,
      "index": 1
    },
    {
      "name": "Mr. Stella Kiehn Jr.",
      "BMI": 16.8,
      "age": 34,
      "birthday": "2003-07-25T00:00:00.000Z",
      "city": "Lake Veronicaburgh",
      "married": false,
      "index": 2
    },
    {
      "name": "Lavon Hilll I",
      "BMI": 20.57,
      "age": 12,
      "birthday": "1994-10-26T00:00:00.000Z",
      "city": "Annatown",
      "married": true,
      "index": 3
    },
    {
      "name": "Clovis Pagac",
      "BMI": 24.28,
      "age": 26,
      "birthday": "1995-11-10T00:00:00.000Z",
      "city": "South Eldredtown",
      "married": false,
      "index": 4
    },
    {
      "name": "Gaylord Paucek",
      "BMI": 24.41,
      "age": 30,
      "birthday": "1975-06-12T00:00:00.000Z",
      "city": "Koeppchester",
      "married": true,
      "index": 5
    },
    {
      "name": "Ashlynn Kuhn MD",
      "BMI": 23.77,
      "age": 32,
      "birthday": "1985-08-09T00:00:00.000Z",
      "city": "West Josiemouth",
      "married": false,
      "index": 6
    },
    {
      "name": "Fern Schmeler IV",
      "BMI": 27.33,
      "age": 26,
      "birthday": "2005-02-10T00:00:00.000Z",
      "city": "West Abigaleside",
      "married": true,
      "index": 7
    },
    {
      "name": "Enid Weber",
      "BMI": 18.72,
      "age": 17,
      "birthday": "1998-11-30T00:00:00.000Z",
      "city": "Zackton",
      "married": true,
      "index": 8
    },
    {
      "name": "Leatha O'Hara",
      "BMI": 17.68,
      "age": 42,
      "birthday": "2010-10-17T00:00:00.000Z",
      "city": "Lake Matilda",
      "married": false,
      "index": 9
    },
    {
      "name": "Korbin Steuber",
      "BMI": 16.35,
      "age": 39,
      "birthday": "1975-06-30T00:00:00.000Z",
      "city": "East Armandofort",
      "married": true,
      "index": 10
    },
    {
      "name": "Brennon Torphy",
      "BMI": 27.37,
      "age": 24,
      "birthday": "2003-10-21T00:00:00.000Z",
      "city": "Croninfort",
      "married": true,
      "index": 11
    },
    {
      "name": "Ms. Genoveva Bradtke",
      "BMI": 28.63,
      "age": 19,
      "birthday": "1983-01-10T00:00:00.000Z",
      "city": "Port Emanuel",
      "married": true,
      "index": 12
    },
    {
      "name": "Gregg Halvorson",
      "BMI": 15.45,
      "age": 15,
      "birthday": "2004-06-15T00:00:00.000Z",
      "city": "Lake Angelinastad",
      "married": false,
      "index": 13
    },
    {
      "name": "Mr. Sabina Schroeder III",
      "BMI": 24.27,
      "age": 26,
      "birthday": "1980-11-22T00:00:00.000Z",
      "city": "Toyview",
      "married": true,
      "index": 14
    },
    {
      "name": "Alanna Mitchell",
      "BMI": 29.25,
      "age": 37,
      "birthday": "1971-08-04T00:00:00.000Z",
      "city": "Lake Monserratmouth",
      "married": false,
      "index": 15
    },
    {
      "name": "Ronny Sanford",
      "BMI": 29.16,
      "age": 24,
      "birthday": "1994-11-24T00:00:00.000Z",
      "city": "New Claudhaven",
      "married": false,
      "index": 16
    },
    {
      "name": "Emmitt Pouros",
      "BMI": 27.95,
      "age": 14,
      "birthday": "1989-04-04T00:00:00.000Z",
      "city": "Moorefurt",
      "married": true,
      "index": 17
    },
    {
      "name": "Earl Purdy",
      "BMI": 18.34,
      "age": 38,
      "birthday": "2013-04-03T00:00:00.000Z",
      "city": "Lake Rowanberg",
      "married": true,
      "index": 18
    },
    {
      "name": "Cordelia Klocko",
      "BMI": 25.85,
      "age": 36,
      "birthday": "2011-01-17T00:00:00.000Z",
      "city": "Lakinchester",
      "married": true,
      "index": 19
    },
    {
      "name": "Guido Conroy",
      "BMI": 25.17,
      "age": 39,
      "birthday": "1977-04-20T00:00:00.000Z",
      "city": "Scarlettland",
      "married": true,
      "index": 20
    },
    {
      "name": "Miss Demond Weissnat V",
      "BMI": 21.44,
      "age": 19,
      "birthday": "2007-06-09T00:00:00.000Z",
      "city": "Savionberg",
      "married": false,
      "index": 21
    },
    {
      "name": "Easton Mante",
      "BMI": 20.61,
      "age": 43,
      "birthday": "2007-01-29T00:00:00.000Z",
      "city": "Kutchberg",
      "married": false,
      "index": 22
    },
    {
      "name": "Dayton Ebert",
      "BMI": 29.88,
      "age": 20,
      "birthday": "1978-04-27T00:00:00.000Z",
      "city": "West Wiley",
      "married": true,
      "index": 23
    }
  ]



var chartSeries = [
  {
    field: 'age',
    name: 'Age',
    color: '#ff7f0e'
  }
],
  x = function (d) {
    return d.index;
  },
  xDomain = d3.extent(generalChartData, x),
  xLabel = "Index",
  y = function (d) {
    return d;
  },
  yDomain = d3.extent(generalChartData, function (d) { return d.age; }),
  yLabel = "Age",
  yLabelPosition = 'right'


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

          {/* <Chart>
            <LineChart
              data={generalChartData}
              chartSeries={chartSeries}
              x={x}
              xDomain={xDomain}
              xLabel={xLabel}
              y={y}
              yDomain={yDomain}
              yLabel={yLabel}
              yLabelPosition={yLabelPosition}
            />
          </Chart> */}

        </div>
        
      </div>
    );
  }
}
//y = { y }
export default App;
