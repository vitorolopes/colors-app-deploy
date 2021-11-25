/* eslint-disable import/no-anonymous-default-export */
export default{

            root: {
                backgroundColor: "white",
                border: "1px black solid",
                borderRadius: "5px",
                padding: "0.5rem",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                "&:hover svg":{
                    opacity: "1"
                }
            },
            title:{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin:"0",
                color:"black",
                paddingTop: "0.5rem",
                fontSize:"1rem",
                position: "relative"
            },
            emoji:{
                marginLeft: "0.5rem",
                fontSize: "1.5rem"
            },
            colors:{
                backgroundColor: "white",
                height: "150px",
                width: "100%",
                borderRadius:"5px",
                overflow: "hidden"
            },
            miniColor:{
                height: "25%",
                width: "20%",
                display:"inline-block",
                margin:"0 auto",
                position: "relative",
                marginBottom:"-3.5px"
            },
            deleteIcon: {
                color: "white",
                backgroundColor: "#eb3d30",
                width: "20px",
                height: "20px",
                position: "absolute",
                right: "0px",
                top: "0px",
                padding: "10px",
                zIndex: "10",
                opacity: "0"
            }
        
}