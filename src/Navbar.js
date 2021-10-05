import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './Navbar.css';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = { format: "hex"};
        this.handleFormatChange = this.handleFormatChange.bind(this);
    }

    handleFormatChange(e){
        this.setState( { format: e.target.value});
        this.props.handleChange(e.target.value)
    }
 
    render() {
        const {level, changeLevel} = this.props;
        return(    

            <header className="Navbar">

                <div className="logo">
                    <a href="#">React Color Picker</a>
                </div>

                <div className="slider-container">
                    <span>Level:{level} </span>
                    <div className="slider">
                        <Slider
                            min={100}
                            max={900}
                            step={100}
                            defaultValue={level}
                            onAfterChange={changeLevel}
                        />   
                    </div>
                </div>

                <div className="select-container">
                    <Select value={this.state.format} onChange={this.handleFormatChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(0,0,0)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(0,0,0,1)</MenuItem>
                    </Select>
                </div>

            </header>
        )
    }
}

export default Navbar;