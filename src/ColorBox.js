import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import chroma from 'chroma-js';

import {CopyToClipboard} from 'react-copy-to-clipboard';
import './ColorBox.css';

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
        const {background, name, moreURL, showLink} = this.props;
        const {copied} = this.state;
        // console.log(chroma(background).luminance()) --> This gives us a bunch
        // of values (one for each color being rendered). If the color is dark
        // the value is low and the opposite if the color is bright.
        const isDarkColor = chroma(background).luminance() <= 0.08;
        const isBrightColor = chroma(background).luminance() >= 0.7;


        return(
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className="ColorBox" style={{background: background}}>

                    <div className={`copy-overlay ${copied && "show"}`} style={{background: background}}> </div>
                    
                    <div className={`msg-overlay ${copied && "show"}`} >
                        <h1>Copied!</h1>
                        <p className={isBrightColor ? "dark-text" : null}>
                                {background}
                        </p>
                    </div>
                   
                    <div className="copy-container"> 
                        <div className="box-content">
                            <span className={isDarkColor ? "bright-text" : null}>{name}</span>
                        </div>
                        <button className={`copy-button ${isBrightColor && "dark-text"}`}>Copy</button>   
                    </div>

                    {showLink && 
                        <Link to={moreURL}>
                            <span className={`see-more ${isBrightColor && "dark-text"}`}>More</span>
                        </Link>
                    }
                    
                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox ;
