import React from 'react';

function PalettesFooter(props){
    const {paletteName, emoji} = props;

    return(
        // .Palette-footer and .emoji are classes from Palette.js
        <footer className="Palette-footer">
            {paletteName}
            <span className="emoji">{emoji}</span>
        </footer>
    )
}

export default PalettesFooter;