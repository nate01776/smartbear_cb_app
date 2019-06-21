import React, { Component } from 'react';
import Header from './components/Header';
import './App.css';
import _ from 'lodash';
import { Line, Chart } from 'react-chartjs-2';
import moment from 'moment';
// import currencies from './supported-currencies.json';
import BPIList from './components/BPIList';


class App extends Component {
  constructor (props) {
    super(props)

    // chart.js defaults
    Chart.defaults.global.defaultFontColor = '#000';
    Chart.defaults.global.defaultFontSize = 16;

    this.state = {
      historicalData: null, 
      currencyList: [
        {
          "currency": "CAD",
          "country": "Canadian Dollar"
        },
        {
          "currency": "GBP",
          "country": "British Pound Sterling"
        },
        {
          "currency": "USD",
          "country": "United States Dollar"
        }
      ],
      currency: "USD"
    }
    this.onCurrencySelect = this.onCurrencySelect.bind(this)
  }

  componentDidMount() {
    this.getCurrencyList()
    this.getBitcoinData()
  }

  getBitcoinData () {
    this.getCurrencyList()

    fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?currency=${this.state.currency}`)
      .then(response => response.json())
      .then(historicalData => this.setState({historicalData}))
      .catch(e => e)
  }

  formatChartData () {
    const {bpi} = this.state.historicalData

    return {
      labels: _.map(_.keys(bpi), date => moment(date).format("ll")),
      datasets: [
        {
          label: "Bitcoin",
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(255,23,105,0.4)',
          borderColor: 'rgba(255,23,105,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(255,23,105,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(255,23,105,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: _.values(bpi)
        }
      ]
    }
  }

  getCurrencyList() {
    fetch(`https://5xvi737uh6.execute-api.us-west-2.amazonaws.com/RUN/v2/countryCode`, {mode: 'no-cors'})
      .then(response => response.json())
      .then(currencyList => this.setState({currencyList}))
      .catch(e => e)
  }

  setCurrency (currency) {
    this.setState({currency}, this.getBitcoinData)
  }

  onCurrencySelect (e) {
    this.setCurrency(e.target.value)
  }

  render() {
    if (this.state.historicalData) {
      return (
        <div className="app">
          <Header title="GLOBAL BITCOIN PRICE INDEX" />

          <div className="select-container">
            <select value={this.state.currency} onChange={this.onCurrencySelect}>
              {this.state.currencyList.map((obj, index) =>
                <option key={`${index}-${obj.country}`} value={obj.currency}> {obj.currency} </option>
              )}
            </select>
            <span style={{fontSize: 18, fontFamily: 'Archivo Black'}}>  Select your currency</span>
            {
              this.state.currency !== 'USD' && (<div>
                <p className="link" onClick={() => this.setCurrency('USD')} style={{color: "black", fontSize: 16, fontFamily: 'Archivo Black'}}> [CLICK HERE TO RESET] </p>
              </div>)
            }
            
          </div>
            <div className="body-container">
              <div style={{marginTop: 10}}>
                <Line data={this.formatChartData()} height={200} />
              </div>
              <div>
                <h2>Dates</h2>
                <BPIList data={this.state.historicalData} currency={this.state.currency}/>
              </div>
            </div>
          

          <div className="subheader-body">
            <span className="subheader"> Powered by <a className="link" target="_blank" rel="noopener noreferrer" href="https://www.coindesk.com/price/">CoinDesk</a>. </span>
          </div>
        </div>
      )
    }

    return null
  }
}

export default App;
