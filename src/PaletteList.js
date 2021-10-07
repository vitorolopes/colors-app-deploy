import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PaletteList extends Component {
   
    render() {

        const {palettes} = this.props;
        
        return(
            palettes.map( palette => (
                <p>
                    <Link to={`/palette/${palette.id}`}> {palette.paletteName} </Link>
                </p>
            ))

            
        )
    }
}

export default PaletteList ;