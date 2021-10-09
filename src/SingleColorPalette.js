import React, { Component } from 'react';

import ColorBox from './ColorBox';

class SingleColorPalette extends Component {
   constructor(props){
       super(props);
       this.shades = this.gatherShades(this.props.palette, this.props.colorId)
   }

   gatherShades(palette, colorToFilterBy){
       let shades=[];
       let allColors = palette.colors;

// A palette is an object like this:
//   {
//       100 : [{hex:”#AA”, id:”turquoise, …}, {hex:”#BB”, id:”emerald”, …}, …]
//       200 : [{hex:”#CC”, id:”turquoise, …}, {hex:”#DD”, id:”emerald”, …}, …]
//   }
// where we have the 100(shade) colors, the 200(shade) colors, …
// So we want to loop over this object.
// And for each key in it, we want to find the correct color.
// Let's say we're looking for emerald.
// We want to find the emerald color from one hundred, the emerald from 200, …

       for (let key in allColors){
            shades = shades.concat(
                    allColors[key].filter( color => color.id === colorToFilterBy) 
            )
        }     
// returns all shades of a given color
        return shades.slice(1) // We have in shades array the 50: [] key/value pair 
                        //that we don't want, so we are getting rid of it with slice
   }

    render() {
        const colorBoxes = this.shades.map( color => (
            <ColorBox
                background={color.hex}
                name={color.name}
                key={color.idd}     
                //! HHHHHHHHEEEEEEEEEEEERRRRRRRRRRRRRREEEEEEEEEEEEEEEEEE
                // showLink={false}
            />
        ))

        return(
            // This classes come from Palette.js
            <div className="Palette">
                <h1>Single Color Palette</h1>
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
            </div>
           
        )
    }
}

export default SingleColorPalette ;



