import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import SnackBar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';



import './Navbar.css';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = { format: "hex", isSnackbarOpen: false};
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    handleFormatChange(e){
        this.setState( { format: e.target.value, isSnackbarOpen: true});
        this.props.handleChange(e.target.value)
    }

    closeSnackbar(){
        this.setState( {isSnackbarOpen: false} )
    }
 
    render() {
        const {level, changeLevel} = this.props;
        const {isSnackbarOpen} = this.state;
        return(    

            <header className="Navbar">

                <div className="logo">
                    <Link to="/">React Color Picker</Link>
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

                <SnackBar
                    open={isSnackbarOpen}
                    anchorOrigin={{ vertical: "bottom", horizontal:"left"}}
                    message={<span>Format Changed!</span>}
                    autoHideDuration={3000}
                    onClose={this.closeSnackbar} // With this prop wherever we click the snacbar goes away
                    action={[
                        <IconButton onClick={this.closeSnackbar}>
                            <CloseIcon/>
                        </IconButton>
                    ]}
                />

            </header>
        )
    }
}

export default Navbar;