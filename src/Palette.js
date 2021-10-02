import React, { Component } from 'react';
import ColorBox from './ColorBox';

class Palette extends Component {
    
    render() {
        
        const colorBoxes = this.props.colors.map( color => (
            <ColorBox background={color.color} name={color.name} />
        ))

        return(
            <div> 
                {colorBoxes}
            </div>
        )
    }
}

export default Palette ;