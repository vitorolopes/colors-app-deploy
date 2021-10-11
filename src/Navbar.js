import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SnackBar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {withStyles} from '@material-ui/styles';

// import './Navbar.css';

 const styles = {
      Navbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "6vh"
      },
      logo: {
        marginRight: "15px",
        padding: "0 13px",
        fontSize: "22px",
        backgroundColor: "#eceff1",
        fontFamily: "Roboto",
        height: "100%",
        display: "flex",
        alignItems: "center",
        "& a": {
          textDecoration: "none",
          color: "black"
        }
      },
      slider: {
        width: "400px",
        marginLeft: "20px",
        display: "inline-block",
        "& .rc-slider-track": {
          backgroundColor: "green"
        },
        "& .rc-slider-rail": {
          height: "5px"
        },
        "& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus,.rc-slider-handle:hover": {
          backgroundColor: "black",
          outline: "none",
          border: "2px solid black",
          boxShadow: "none",
          width: "13px",
          height: "13px",
          marginLeft: "-7px",
          marginTop: "-4px"
        }
      },
      selectContainer: {
        marginLeft: "auto",
        marginRight: "1rem"
      }
     }
    

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
        const {level, changeLevel, showShadesSlider, classes} = this.props;
        const {isSnackbarOpen} = this.state;
        return(    

            <header className={classes.Navbar}>

                <div className={classes.logo}>



                    <Link to="/" className={classes.logoLink}>React Color Picker</Link>



                    
                </div>

                {showShadesSlider &&
                   ( <div>
                        <span>Level:{level} </span>
                        <div className={classes.slider}>
                            <Slider
                                min={100}
                                max={900}
                                step={100}
                                defaultValue={level}
                                onAfterChange={changeLevel}
                            />   
                        </div>
                    </div>
                    )
                }

                <div className={classes.selectContainer}>
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

export default withStyles(styles) (Navbar);