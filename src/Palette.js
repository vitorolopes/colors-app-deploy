import React, { Component } from 'react';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import ColorBox from './ColorBox';
import './Palette.css';     


class Palette extends Component {
    constructor(props){
        super(props);
        this.state = { level: 100  };
        this.changeLevel = this.changeLevel.bind(this);
    }

    changeLevel(newLevel){
        // console.log("level changed")
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
                <div className="slider">
                    <Slider
                        min={100}
                        max={900}
                        step={100}
                        defaultValue={level}
                        onAfterChange={this.changeLevel}
                    />
                </div>

                <div className="Palette-colors">
                    {colorBoxes}
                </div>             
            </div>
        )
    }
}
export default Palette ;