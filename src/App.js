import React, { Component } from 'react';
import './App.css';
import SnakeApp from './components/container/SnakeApp';

class App extends Component {
  
  constructor(){
    super();
    this.state = {
      snakeDots: [
        [0,0],
        [2,0],
        [4,0]
      ],
      foodPosition: [20,20]
    };
  }

  render(){
    return (
      <div className="App">
        <SnakeApp></SnakeApp>
      </div>
    );
  }
}

export default App;
