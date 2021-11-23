import React, { Component } from "react";
import {Link} from 'react-router-dom';
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import NewPaletteMetaForm from './NewPaletteMetaForm';

import { withStyles } from "@material-ui/core/styles";
import styles from './styles/NewPaletteFormNavStyles';

class NewPaletteFormNav extends Component {
    constructor(props){
      super(props);
       this.state = {
        newPaletteName: ""
       }
       this.handleChange = this.handleChange.bind(this);
    } 

    // componentDidMount(){
    //     ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
    //         this.props.palettes.every(
    //         ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
    //         )
    //     );
    // }

    handleChange(evt){
        this.setState( {[evt.target.name]: evt.target.value} )
    }

    render() {
        const {classes, open, palettes, handleSubmit} = this.props;
        const {newPaletteName} = this.state;
        return(
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position='fixed'
                    color="default"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: open
                    })}
                >
                    <Toolbar disableGutters={!open} >
                      
                            <IconButton
                                color='inherit'
                                aria-label='Open drawer'
                                onClick={this.props.handleDrawerOpen}
                                className={classNames(classes.menuButton, open && classes.hide)}
                                >
                                    <MenuIcon />
                            </IconButton>

                                <Typography variant='h6' color='inherit' noWrap>
                                        Create Palette
                                </Typography>                      

                    </Toolbar>

                    <div className={classes.navBtns}>

                        <NewPaletteMetaForm palettes={palettes} handleSubmit={handleSubmit}/>

                        <Link to="/">
                                <Button variant="contained" color="secondary">
                                    Go Back
                                </Button>
                        </Link>  

                    </div>

                </AppBar>

            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true }) (NewPaletteFormNav);