import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {arrayMove} from 'react-sortable-hoc';
import DraggableColorList from './DraggableColorList';
import NewPaletteFormNav from './NewPaletteFormNav';
import styles from './styles/NewPaletteFormStyles'

class NewPaletteForm extends Component {

  static defaultProps = {
    maxColors: 20
  }

  constructor(props){
      super(props);
      this.state = { 
          open: true,
          currentColor: "green",
          newPaletteColors: this.props.palettes[1].colors,
          newColorName: "",
      }
      this.updateCurrentColor = this.updateCurrentColor.bind(this);
      this.addNewColor = this.addNewColor.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.removeColor = this.removeColor.bind(this);
      this.clearPalette = this.clearPalette.bind(this);
      this.addRandomColor = this.addRandomColor.bind(this);
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
      const newColor = {  color: this.state.currentColor, name: this.state.newColorName }
      this.setState( {newPaletteColors: [...this.state.newPaletteColors, newColor], newColorName: "" })
  }

  handleChange(evt){
      this.setState( {[evt.target.name]: evt.target.value} )
  }

  handleSubmit(newPaletteName){
     const newPalette={
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g,"-"),
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

  clearPalette(){
    this.setState( { newPaletteColors: [] } )
  }

  addRandomColor(){
    const allColors = this.props.palettes.map( p => p.colors).flat()
    let rand;
    // let randomColor = allColors[rand];
    let randomColor;

    let isDuplicateColor = true;
    while(isDuplicateColor){
      rand =  Math.floor(Math.random() * allColors.length); 
      randomColor = allColors[rand]; 
      isDuplicateColor = this.state.newPaletteColors.some( color => color.name === randomColor.name)
    }
    this.setState( {newPaletteColors: [...this.state.newPaletteColors, randomColor]} )
  }

  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, currentColor, newPaletteColors } = this.state;

    const paletteIsFull = newPaletteColors.length >= maxColors;

    return (
      <div className={classes.root}>
        <NewPaletteFormNav open={open} classes={classes} palettes={palettes}
                           handleSubmit={this.handleSubmit}
                           handleDrawerOpen={this.handleDrawerOpen}
        />

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
                <Button variant="contained" color="secondary"
                        onClick={this.clearPalette}
                >
                  Clear Palette
                </Button>
                <Button variant="contained" color="primary"
                        onClick={this.addRandomColor}  
                        disabled={paletteIsFull}
                >
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
                        style={{backgroundColor: paletteIsFull ? "grey" : currentColor}} 
                        disabled={paletteIsFull}
                        type="submit"
                >
                    {paletteIsFull ? "Palette Full" : "Add Color"}
                </Button>
            </ValidatorForm>

        </Drawer>

        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} /> 
        
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