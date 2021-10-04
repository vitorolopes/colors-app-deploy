import React, { Component } from 'react';
import ColorBox from './ColorBox';
import './Palette.css';        

class Palette extends Component {
    render() {   
        const colorBoxes = this.props.palette.colors[800].map( color => (
            <ColorBox background={color.hex} name={color.name} key={color.name} />
        ))
        return(
            <div className="Palette">
                <div className="Palette-colors">
                    {colorBoxes}
                </div>             
            </div>
        )
    }
}
export default Palette ;