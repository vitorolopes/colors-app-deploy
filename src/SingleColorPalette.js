import React, { Component } from 'react';

import {Link} from 'react-router-dom';

import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
   constructor(props){
       super(props);
       this.shades = this.gatherShades(this.props.palette, this.props.colorId)
   }

   gatherShades(palette, colorToFilterBy){
       let shades=[];
       let allColors = palette.colors;
       for (let key in allColors){
            shades = shades.concat(
                    allColors[key].filter( color => color.id === colorToFilterBy) 
            )
        }     
        return shades.slice(1) 
   }

    render() {

        const {id} = this.props.palette;

        const colorBoxes = this.shades.map( color => (
            <ColorBox
                background={color.hex}
                name={color.name}
                key={color.name}     
                showLink={false}
            />
        ))

        return(
            <div className="Palette SingleColorPalette">

                <h1>Single Color Palette</h1>

                <div className="Palette-colors">
                    {colorBoxes}
                    <div className="go-back ColorBox">
                        <Link to={`/palette/${id}`} className="back-button">Go Back</Link>
                    </div>

                </div>

            </div>
           
        )
    }
}

export default SingleColorPalette ;



