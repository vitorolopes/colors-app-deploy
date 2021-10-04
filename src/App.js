import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import {generate3DPalette} from './colorHelpers';
import './App.css';

class App extends Component {
  render(){
      console.log(generate3DPalette(seedColors[0]))
      return (
        <div className="App">
          <Palette palette={generate3DPalette(seedColors[1])}/>     
        </div>
      );
  }

}

export default App;
