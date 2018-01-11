import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Block(props) {
  return (
    <div className="Block">
      <h3>Server: {props.name}</h3>
      <button
        onClick={() => props.onClick()}
        className={props.value === "UP"
            ? "up"
            : (props.value === "DOWN"
              ? "down"
              : "other")}
      >{props.value === null ? "Checking" : props.value}</button>
      {props.previous === null ? (
          <p>No previous response</p>
        ) : (
          <p>Last response was {props.previous}</p>
        )}
    </div>
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
      prev: Array(5).fill(null),
      urls: [
        "https://test.cognition-app.com/api/status",
        "https://ord.dev.stackworx.io/health",
        "https://api.durf.dev.stackworx.io/health",
        "https://prima.run/health",
        "https://stackworx.io/"
      ],
    };
  }

  init(urls) {
    this.requestCall(urls[0], 0);
    this.requestCall(urls[1], 1);
    this.requestCall(urls[2], 2);
    this.requestCall(urls[3], 3);
    this.requestCall(urls[4], 4);

    this.pushHistory();

    setTimeout(function(){
      this.init(urls);
    }.bind(this), 300000);
  }

  componentDidMount() {
        // setInterval(function(){
    //   const urls = this.state.urls;
    //   this.requestCall(urls[0], 0);
      // this.requestCall(urls[1], 1);
      // this.requestCall(urls[2], 2);
      // this.requestCall(urls[3], 3);
      // this.requestCall(urls[4], 4);
      // this.init(urls);
    // }.bind(this), 30000/*0*/);
    this.init(this.state.urls);
  }

// Helper function for rendering blocks
  renderBlock(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const prev = this.state.prev;
    const urls = this.state.urls;

    return <Block value={current.blocks[i]} previous={prev[i]} name={urls[i]} onClick={() => this.handleClick()} />
  }

  handleClick() {
    const history = this.state.history;
    if(history.length < 2) {
      return;
    }
    const prev = history[history.length - 2].blocks.slice();
    this.setState({
      prev: prev,
    });
  }

// Helper function to add a new history object when all requests have been called
  pushHistory() {
    const history = this.state.history.slice();
    this.setState({
      history: history.concat({
        blocks: Array(5).fill(null),
      })
    });
  }

// Helper function for requests
  requestCall(url, i) {
    const request = require('request');

    request({
      uri: url,
      method: 'GET',
    }, function(error, response, body) {
      let result = null;

      if(error) {
        result = "OTHER";
      } else if (response.statusCode === 200) {
        result = "UP";
      } else {
        // alert("DOWN");
        result = "DOWN";
      }

      this.setState((prevState) => {
        const newHistory = prevState.history.slice();
        const current = newHistory[newHistory.length - 1];

        newHistory[newHistory.length - 1].blocks = current.blocks.slice();
        newHistory[newHistory.length - 1].blocks[i] = result;

        return { 'history': newHistory };
      });

      // setTimeout(function(){
      //   this.requestCall(url, i);
      // }.bind(this), 300000);
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
          {this.renderBlock(1)}
          {this.renderBlock(2)}
          {this.renderBlock(3)}
          {this.renderBlock(4)}
        </div>
      </div>
    );
  }
}

export default App;
