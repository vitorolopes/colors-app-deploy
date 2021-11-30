import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import { withStyles } from "@material-ui/core/styles";
import styles from './styles/NewPaletteFormCPickerStyles';
import { mergeClasses } from "@material-ui/styles";
import { CallMissedSharp } from "@material-ui/icons";

class NewPaletteFormCPicker extends Component {
    constructor(props){
      super(props);
       this.state = {
        currentColor: "blue",
        newColorName: ""
       }
       this.updateCurrentColor = this.updateCurrentColor.bind(this);
       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
    } 

    componentDidMount() {
        ValidatorForm.addValidationRule("isColorNameUnique", value =>
          this.props.newPaletteColors.every(
            ({ name }) => name.toLowerCase() !== value.toLowerCase()
          )
        );
        ValidatorForm.addValidationRule("isColorUnique", value =>
          this.props.newPaletteColors.every(({ color }) => color !== this.state.currentColor)
        );
      }

    updateCurrentColor(newColor){
        this.setState( {currentColor: newColor.hex} )
    }

    handleChange(evt){
        this.setState( {[evt.target.name]: evt.target.value} )
    }

    handleSubmit(){
      const newColor = {  color: this.state.currentColor, name: this.state.newColorName };
      this.props.addNewColor(newColor);
      this.setState( {newColorName: ""} )
    }

    render() {
        const {paletteIsFull, classes} = this.props;
        const {currentColor, newColorName} = this.state;
        return(
            <div className={classes.root}> 
                <ChromePicker
                color={currentColor}
                onChangeComplete = { this.updateCurrentColor}
                className={classes.picker}
                />

                <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
                    <TextValidator value={newColorName}
                                name="newColorName"
                                onChange={this.handleChange}
                                validators={["required", "isColorNameUnique", "isColorUnique"]}
                                errorMessages={["This field is required", "Color name must be unique", "Color already used"]}
                                className={classes.colorNameInput}
                                variant="filled"
                                margin="normal"
                                placeholder="Color Name"
                    />
                        
                    <Button variant="contained"
                            color="primary"                      
                            style={{backgroundColor: paletteIsFull ? "grey" : currentColor}} 
                            disabled={paletteIsFull}
                            type="submit"
                            className={classes.addColor}
                    >
                        {paletteIsFull ? "Palette Full" : "Add Color"}
                    </Button>
                </ValidatorForm>    
            </div>
        )
    }
}

// export default NewPaletteFormCPicker ;
export default withStyles(styles, { withTheme: true }) (NewPaletteFormCPicker);
