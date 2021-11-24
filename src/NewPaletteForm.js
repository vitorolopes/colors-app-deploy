import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from '@material-ui/core/Button';
import {arrayMove} from 'react-sortable-hoc';
import DraggableColorList from './DraggableColorList';
import NewPaletteFormNav from './NewPaletteFormNav';
import NewPaletteFormCPicker from './NewPaletteFormCPicker';
import styles from './styles/NewPaletteFormStyles'

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }

  constructor(props){
      super(props);
      this.state = { 
          open: true,
          newPaletteColors: this.props.palettes[1].colors,
      }
      this.addNewColor = this.addNewColor.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.removeColor = this.removeColor.bind(this);
      this.clearPalette = this.clearPalette.bind(this);
      this.addRandomColor = this.addRandomColor.bind(this);
  }  

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };


  addNewColor(newColor){
      this.setState( {newPaletteColors: [...this.state.newPaletteColors, newColor], newColorName: "" })
  }

  handleChange(evt){
      this.setState( {[evt.target.name]: evt.target.value} )
  }

  // handleSubmit(newPaletteName){
  //    const newPalette={
  //     paletteName: newPaletteName,
  //     id: newPaletteName.toLowerCase().replace(/ /g,"-"),
  //     colors: this.state.newPaletteColors
  //   };
  //   this.props.savePalette(newPalette);
  //   this.props.history.push("/");
  // }
  handleSubmit(newPalette){
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g,"-")
    newPalette.colors = this.state.newPaletteColors
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
        <NewPaletteFormNav open={open} 
                          //  classes={classes} 
                           palettes={palettes}
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

            <div className={classes.container}>

              <Typography variant="h4" gutterBottom >Design Your Palette</Typography>

              <div className={classes.buttons}>
                  <Button variant="contained" color="secondary"
                          onClick={this.clearPalette}
                          className={classes.button}
                  >
                    Clear Palette
                  </Button>
                  <Button variant="contained" color="primary"
                          onClick={this.addRandomColor}  
                          disabled={paletteIsFull}
                          className={classes.button}
                  >
                    Random Color
                  </Button>
              </div>
              
              <NewPaletteFormCPicker 
                  paletteIsFull={paletteIsFull}
                  addNewColor={this.addNewColor}
                  newPaletteColors={newPaletteColors}
              />   

            </div> 

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