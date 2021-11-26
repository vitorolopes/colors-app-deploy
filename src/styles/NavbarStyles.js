/* eslint-disable import/no-anonymous-default-export */

import sizes from './sizes';

export default{
    Navbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "6vh"
    },
    logo: {
        marginRight: "15px",
        padding: "0 13px",
        fontSize: "22px",
        backgroundColor: "#eceff1",
        fontFamily: "Roboto",
        height: "100%",
        display: "flex",
        alignItems: "center",
        "& a": {
            textDecoration: "none",
            color: "black"
        },

        [sizes.down("xs")]:{
            display:"none"
        }

    },
    slider: {
        width: "400px",
        marginLeft: "20px",
        display: "inline-block",
        "& .rc-slider-track": {
            backgroundColor: "green"
        },
        "& .rc-slider-rail": {
            height: "5px"
        },
        "& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus,.rc-slider-handle:hover": {
            backgroundColor: "black",
            outline: "none",
            border: "2px solid black",
            boxShadow: "none",
            width: "13px",
            height: "13px",
            marginLeft: "-7px",
            marginTop: "-4px"
        },

        [sizes.down("md")]:{
            width:"150px"
        }

    },
    selectContainer: {
        marginLeft: "auto",
        marginRight: "1rem"
    }
}