import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {withStyles} from '@material-ui/styles';
import styles from './styles/ColorBoxStyles';

class ColorBox extends Component {

    constructor(props){
        super(props)
        this.state = { copied: false };
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState(){
        this.setState ( {copied: true}, () => {
            setTimeout ( () => {
                this.setState( { copied: false } )
            }, 1500 )
        })
    }
 
    render() {
        const {background, name, moreURL, showing3DPalette, classes} = this.props;
        const {copied} = this.state;

        return(
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className={classes.ColorBox} style={{background: background}}> 
                    
                    <div className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} style={{background: background}}> </div>
                    
                    <div className={`${classes.copyMessage} ${copied && classes.showMessage}`} >
                        <h1>Copied!</h1>
                        <p className={classes.copyText}>
                                {background}
                        </p>
                    </div>
                   
                        <div className={classes.boxContent}>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>   

                    {showing3DPalette && 
                        <Link to={moreURL}>
                            <span className={classes.seeMore}>More</span>
                        </Link>
                    }
                    
                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles) (ColorBox) ;
