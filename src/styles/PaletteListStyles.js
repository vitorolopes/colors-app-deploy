/* eslint-disable import/no-anonymous-default-export */
export default{
    root:{
        backgroundColor: "blue",
        height: "100vh",
        display: "flex",
        justifyContent:"center",
    },
    container:{
        width: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        flexWrap: "wrap",
    },
    nav:{
        display: "flex",
        width: "100%",
        justifyContent:"space-between",
        color: "white",
        alignItems: "center",
        "& a":{
            color: "white",
            textDecoration: "none"
        }
    },
    palettes:{
        width:"100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap:"5%"
    }
}