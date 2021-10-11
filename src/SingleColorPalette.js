import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PalettesFooter from './PalettesFooter';

class SingleColorPalette extends Component {
   constructor(props){
       super(props);
       this.state={ format: "hex"};
       this.shades = this.gatherShades(this.props.palette, this.props.colorId);
       this.changeFormat = this.changeFormat.bind(this);
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

   changeFormat(val){
       this.setState( {format: val} )
   }

    render() {
        const {format} = this.state;
        const {paletteName, emoji} = this.props.palette;

        const {id} = this.props.palette;
        const colorBoxes = this.shades.map( color => (
            <ColorBox
                background={color[format]}
                name={color.name}
                key={color.name}     
                show3DPalette={false}
            />
        ))

        return(
            <div className="Palette SingleColorPalette">

                <Navbar handleChange={this.changeFormat} showShadesSlider={false}/>

                <div className="Palette-colors">
                    {colorBoxes}

                    <div className="go-back ColorBox">
                        <Link to={`/palette/${id}`} className="back-button">Go Back</Link>
                    </div>

                    <PalettesFooter paletteName={paletteName} emoji={emoji}/>

                </div>

            </div>
           
        )
    }
}

export default SingleColorPalette ;



