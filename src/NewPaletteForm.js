import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import DraggableColorBox from './DraggableColorBox';

import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


import styles from './styles/NewPaletteFormStyles'

class NewPaletteForm extends Component {
  constructor(props){
      super(props);
      this.state = { 
          open: true,
          currentColor: "green",
        //   newPaletteColors: ["yellow", "orange"],
          newPaletteColors: [],
          newName: ""    
      }
      this.updateCurrentColor = this.updateCurrentColor.bind(this);
      this.addNewColor = this.addNewColor.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }  

  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      this.state.newPaletteColors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", value =>
      this.state.newPaletteColors.every(({ color }) => color !== this.state.currentColor)
    );
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updateCurrentColor(newColor){
      this.setState( {currentColor: newColor.hex} )
  }

  addNewColor(){
    //   this.setState( {newPaletteColors: [...this.state.newPaletteColors, this.state.currentColor] })
      const newColor = {  color: this.state.currentColor, name: this.state.newName }
      this.setState( {newPaletteColors: [...this.state.newPaletteColors, newColor], newName: "" })
  }

  handleChange(evt){
      this.setState( {newName: evt.target.value} )
  }

  render() {
    const { classes } = this.props;
    const { open, currentColor, newPaletteColors } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              Persistent drawer
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />

          <Typography variant="h4" >Design Your Palette</Typography>

          <div>
              <Button variant="contained" color="secondary">
                Clear Palette
              </Button>
              <Button variant="contained" color="primary">
                Random Color
              </Button>
          </div>
          
          <ChromePicker
            color={currentColor}
            onChangeComplete = { this.updateCurrentColor}
          />

               {/* <Button variant="contained" color="primary"
                       style={{backgroundColor: currentColor}} 
                       onClick={this.addNewColor}
               >
                  Add Color
               </Button> */}

               <ValidatorForm onSubmit={this.addNewColor}>
                    <TextValidator value={this.state.newName}
                                   onChange={this.handleChange}
                                   validators={["required", "isColorNameUnique", "isColorUnique"]}
                                   errorMessages={["This field is required", "Color name must be unique", "Color already used"]}
                    />
                        
                    <Button variant="contained"
                            color="primary"
                            style={{backgroundColor: currentColor}} 
                            type="submit"
                    >
                        Add Color
                    </Button>

               </ValidatorForm>

        </Drawer>

        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
         
              {newPaletteColors.map( color => (
                  <DraggableColorBox color= {color.color} name={color.name} />
              ))}

        </main>

      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);