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
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import {arrayMove} from 'react-sortable-hoc';
// import DraggableColorBox from './DraggableColorBox';
import DraggableColorList from './DraggableColorList';

import styles from './styles/NewPaletteFormStyles'

class NewPaletteForm extends Component {
  constructor(props){
      super(props);
      this.state = { 
          open: true,
          currentColor: "green",
          newPaletteColors: [],
          newColorName: "",
          newPaletteName: ""    
      }
      this.updateCurrentColor = this.updateCurrentColor.bind(this);
      this.addNewColor = this.addNewColor.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.removeColor= this.removeColor.bind(this);
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
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(
       ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
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
      const newColor = {  color: this.state.currentColor, name: this.state.newColorName }
      this.setState( {newPaletteColors: [...this.state.newPaletteColors, newColor], newColorName: "" })
  }

  handleChange(evt){
      this.setState( {[evt.target.name]: evt.target.value} )
  }

  handleSubmit(){
    let newName = this.state.newPaletteName;
    const newPalette={
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g,"-"),
      colors: this.state.newPaletteColors
    };
      this.props.savePalette(newPalette);
      this.props.history.push("/");
  }

  removeColor(colorName){
    this.setState({
      newPaletteColors: this.state.newPaletteColors.filter( color => color.name !== colorName)
    })
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ newPaletteColors }) => ({
      newPaletteColors: arrayMove(newPaletteColors, oldIndex, newIndex)
    }));
  };

  render() {
    const { classes } = this.props;
    const { open, currentColor, newPaletteColors } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          color="default"
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

            <ValidatorForm onSubmit={this.handleSubmit}>
              <TextValidator
                label="Palette Name"
                value={this.state.newPaletteName}
                name="newPaletteName"
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={["Enter Palette Name", "Name already used"]}

              />
                <Button variant="contained" color="primary" type="submit">
                  Save Palette
                </Button>
            </ValidatorForm>

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

            <ValidatorForm onSubmit={this.addNewColor}>
                <TextValidator value={this.state.newColorName}
                               name="newColorName"
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
         
              {/* {newPaletteColors.map( color => (
                  <DraggableColorBox color= {color.color} name={color.name}
                    handleClick={ () => this.removeColor(color.name)}
                    key={color.name}
                  />
              ))} */}

              <DraggableColorList
                newPaletteColors={newPaletteColors}
                removeColor={this.removeColor}
                axis="xy"
                onSortEnd={this.onSortEnd}
              />

        </main>

      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(NewPaletteForm);