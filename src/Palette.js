import React, { Component } from 'react';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';

import Navbar from './Navbar';

import ColorBox from './ColorBox';
import './Palette.css';     


class Palette extends Component {
    constructor(props){
        super(props);
        this.state = { level: 100  };
        this.changeLevel = this.changeLevel.bind(this);
    }

    changeLevel(newLevel){
        this.setState( { level: newLevel})
    }


    render() { 
        const {colors}=this.props.palette;
        const {level}=this.state;
        
        const colorBoxes = colors[level].map( color => (
            <ColorBox background={color.hex} name={color.name} key={color.name} />
        ))
        return(
            <div className="Palette">
           
                <Navbar level={level} changeLevel={this.changeLevel}/>

                <div className="Palette-colors">
                    {colorBoxes}
                </div>             
            </div>
        )
    }
}
export default Palette ;