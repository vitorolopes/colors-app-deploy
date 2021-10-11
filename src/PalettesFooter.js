import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/PalettesFooterStyles';

function PalettesFooter(props){
    const {paletteName, emoji, classes} = props;

    return(
        // .Palette-footer and .emoji are classes from Palette.js
        <footer className={classes.PaletteFooter}>
            {paletteName}
            <span className={classes.emoji}>{emoji}</span>
        </footer>
    )
}

export default withStyles(styles) (PalettesFooter);