import React, { Component } from 'react';

import {Link} from 'react-router-dom';

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
        const {background, name, moreURL} = this.props;
        const {copied} = this.state;

        return(
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className="ColorBox" style={{background: background}}>

                    <div className={`copy-overlay ${copied && "show"}`} style={{background: background}}> </div>
                    <div className={`msg-overlay ${copied && "show"}`} >
                        <h1>Copied!</h1>
                        <p>{background}</p>
                    </div>
                   
                    <div className="copy-container"> 
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                        <button className="copy-button">Copy</button>   
                    </div>

                    <Link to={moreURL}>
                        <span className="see-more">More</span>
                    </Link>
                        
                    
                </div>
            </CopyToClipboard>
        )
    }
}

export default ColorBox ;
