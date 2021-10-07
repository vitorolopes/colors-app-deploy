import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';

import PaletteList from './PaletteList';

import seedColors from './seedColors';
import {generate3DPalette} from './colorHelpers';
import './App.css';

class App extends Component {
  findPalette(id){
    return seedColors.find( (palette) => (
      palette.id === id
    ))
  }

  render(){
      return (
        // <div className="App">
        //   <Palette 
        //      palette={generate3DPalette(seedColors[1])}
        //   />     
        // </div>

        <Switch>
          <Route exact path="/" render={ () => <PaletteList palettes={seedColors}/>}/>
    
          <Route exact path="/palette/:id" render={ (routeProps) => 
                                         <Palette palette={generate3DPalette(this.findPalette(routeProps.match.params.id))}/>}/>

        </Switch>
      );
  }

}

export default App;
