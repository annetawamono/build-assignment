import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Block(props) {
  return (
    <div className="Block">{props.value}</div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // to store the state of each block
      blocks: [],
    };
  }

// Helper function for rendering blocks
  renderBlock(i) {
    return <Block value={this.state.blocks[i]} />
  }

// Helper function for requests
  requestCall(url) {
    const request = require('request');
    request({
      uri: url,
      method: 'GET'
    }, function(error, response, body){
      if(error) {
        this.state.blocks.push("OTHER");
      } else if (response.statusCode == 200) {
        this.state.blocks.push("UP");
      }
    });
  }

  render() {
    requestCall("httpstat.us/200");

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
          for (let i=0; i<this.state.blocks.length; i++) {
            {this.renderBlock(i)}
          }
        </div>
      </div>
    );
  }
}

export default App;
