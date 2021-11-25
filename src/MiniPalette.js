import React, {Component} from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/MiniPaletteStyles';

class MiniPalette extends Component{
    constructor(props){
        super(props)
        this.callDeletePalette_b = this.callDeletePalette_b.bind(this);
    }

    callDeletePalette_b(e){
        e.stopPropagation();
        this.props.callDeletePalette_a(this.props.id)
    }

    render(){
      const {classes, paletteName, emoji, colors, handleClick} = this.props;
      const miniColorBoxes = colors.map( color => (
        <div
            className={classes.miniColor}
            style={{background: color.color}}
            key={color.name}
        ></div>
      ))

    return (
        <div className={classes.root} onClick={handleClick}>
         
            <div>
                <DeleteIcon
                  className={classes.deleteIcon}
                  style={{transition: "all 0.75s ease-in-out"}}

                  onClick={this.callDeletePalette_b}

                />
            </div>

            <div className={classes.colors}>
                    {miniColorBoxes}
            </div>
                  
            <h5 className={classes.title}>
                {paletteName}
                <span className={classes.emoji}>
                    {emoji}
                </span>
            </h5>

        </div>
    )
    }
}
export default withStyles(styles) (MiniPalette);