import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

class NewPaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // open: true,
      stage: "form",

      newPaletteName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.showEmojiPicker = this.showEmojiPicker.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  showEmojiPicker(){
    this.setState( { stage: "emoji"})
  }

  savePalette(emoji){
    // console.log(emoji)
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native
    }
    this.props.handleSubmit(newPalette)

    this.setState({stage: ""})
    
  }

  render() {
    const { newPaletteName } = this.state;
    const { hideForm} = this.props;

    return (

      <div>

        <Dialog open={this.state.stage === "emoji"} onClose={hideForm}>
                 <Picker title="Pick an emoji" onSelect={this.savePalette}/>
        </Dialog>

        <Dialog
          // open={this.state.open}
          open={this.state.stage === "form"}
          onClose={hideForm}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Choose a Palette Name</DialogTitle>
          
          <ValidatorForm
            // onSubmit={() => handleSubmit(newPaletteName)}
            onSubmit={this.showEmojiPicker}
          >
            <DialogContent>
              <DialogContentText>
                Please enter a name for your beautiful palette. Make sure its unique.
              </DialogContentText>
                        
              <TextValidator
                  label='Palette Name'
                  value={newPaletteName}
                  name='newPaletteName'
                  onChange={this.handleChange}
                  fullWidth
                  margin="normal"
                  validators={["required", "isPaletteNameUnique"]}
                  errorMessages={["Enter Palette Name", "Name already used"]}
              />
              <Button variant='contained' color='primary' type='submit'>
                Save Palette
              </Button>
            </DialogContent>

            <DialogActions>
              <Button onClick={hideForm} color='primary'>
                Cancel
              </Button>
          
            </DialogActions>

          </ValidatorForm>
        </Dialog>

      </div>
    );
  }
}
export default NewPaletteMetaForm;


