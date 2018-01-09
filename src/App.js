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
    return <Block value={i} />
  }

// Helper function for requests
  requestCall() {

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
