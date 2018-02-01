import React, { Component } from 'react';
import Spinner from './Spinner';
import Chart from './Chart';

class App extends Component {
  state = {
    loading: false,
    stocks: []
  }

  componentDidMount() {
    this.loadStockNames();
  }

  setStateAsync = (state) => {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    })
  }

  loadStockNames = async () => {
    this.setState({ loading: true });
    console.log('a')
    const fetchResult = await fetch('/stocks');
    console.log(fetchResult)
    console.log('b')
    const body = await fetchResult.json();
    const stocks = await body.stockSymbols;
    await this.setStateAsync({ loading: false, stocks });
  }

  render() {
    return (
      <div>
        <Spinner loading={this.state.loading} />
        <Chart stockNames={this.state.stocks} />
      </div>
    )
  }
}

export default App
