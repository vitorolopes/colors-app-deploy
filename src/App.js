import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';
import {generate3DPalette} from './colorHelpers';
import './App.css';
import NewPaletteForm from './NewPaletteForm';


class App extends Component {

  constructor(props){
    super(props);
    this.state = { palettes: seedColors};

    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }


  findPalette(id){
    return this.state.palettes.find( (palette) => (
      palette.id === id
    ))
  }

  savePalette(newPalette){
      // console.log(newPalette)
      this.setState( { palettes: [...this.state.palettes, newPalette]})
  }

  render(){
      return (

        <Switch>

          <Route
            exact
            path="/palette/new"
            render={ (routeProps) => <NewPaletteForm 
                                        savePalette={this.savePalette}
                                        {...routeProps}    
                                     /> }
          />

          <Route 
            exact
            path="/palette/:paletteId/:colorId"
            render={ routeProps => 
              <SingleColorPalette
                palette={generate3DPalette(this.findPalette(routeProps.match.params.paletteId))} // The 3D palette.
                colorId={routeProps.match.params.colorId} // The color from that palette that the user wants to see the shades of.
              />
            }
          />

          <Route 
            exact
            path="/" 
            render={ routeProps => 
              <PaletteList palettes={this.state.palettes} {...routeProps}/>}
          />
    
          <Route 
            exact
            path="/palette/:id"
            render={ routeProps => 
               <Palette palette={generate3DPalette(this.findPalette(routeProps.match.params.id))}/>}
          />

        </Switch>
      );
  }

}

export default App;
