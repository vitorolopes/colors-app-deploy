import React, { Component } from 'react';
import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PalettesFooter from './PalettesFooter';
import {withStyles} from '@material-ui/styles';
import styles from './styles/PaletteStyles'

class Palette extends Component {
    constructor(props){
        super(props);
        this.state = { level: 500, format:"hex"  };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeLevel(newLevel){
        this.setState( { level: newLevel})
    }
    
    changeFormat(val){
        this.setState({ format: val})
    }

    render() { 
        const {colors, paletteName, emoji, id}=this.props.palette;

        const {classes} = this.props;

        const {level, format}=this.state;
        const colorBoxes = colors[level].map( color => (
            <ColorBox 
                background={color[format]} 
                name={color.name} 
                key={color.id}
                moreURL={`/palette/${id}/${color.id}`}
                show3DPalette={true}
            />
        ))
        return(
            <div className={classes.Palette}>          
                <Navbar level={level}
                        changeLevel={this.changeLevel}
                        handleChange={this.changeFormat}
                        showShadesSlider={true}
                />
                <div className={classes.colors}>
                    {colorBoxes}
                </div>  

                <PalettesFooter
                   paletteName={paletteName} emoji={emoji}
                />
                
            </div>
        )
    }
}
export default withStyles(styles) (Palette) ;