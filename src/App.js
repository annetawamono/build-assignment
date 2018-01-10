import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Block(props) {
  return (
    <button className="Block">{props.value}</button>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        // to store the state of each block
        blocks: Array(5).fill(null),
      }],
    };
    setInterval(function(){
      // alert("Check");
      this.requestCall("http://httpstat.us/418", 0);
    }.bind(this), 300000);
  }

// Helper function for rendering blocks
  renderBlock(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    return <Block value={current.blocks[i]} />
  }

// Helper function for requests
  requestCall(url, i) {
    const request = require('request');
    const history = this.state.history;
    const current = history[history.length - 1];
    const blocks = current.blocks.slice();

    request({
      uri: url,
      method: 'GET'
    }, function(error, response, body) {
      if(error) {
        blocks[i] = "OTHER";
      } else if (response.statusCode == 200) {
        blocks[i] = "UP";
      } else {
        blocks[i] = "DOWN";
      }
      this.setState({
        history: history.concat([{
          blocks: blocks,
        }]),
      });
    }.bind(this));
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="Block-container">
          {this.renderBlock(0)}
        </div>
      </div>
    );
  }
}

export default App;
