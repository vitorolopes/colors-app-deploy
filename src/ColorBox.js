import React, { Component } from 'react';

class ColorBox extends Component {
 
   

    render() {
        const {background, name} = this.props;

        return(
            <div style={{background: background}}>
               <span>{name}</span>
            </div>
        )
    }
}

export default ColorBox ;
