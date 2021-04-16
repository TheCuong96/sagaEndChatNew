const styles = theme => ({
    taskbboard:{
        display:"flex",
        alignItems:"center"
    },
    shape:{
        backgroundColor:"red",
        color:"white",
        boderColor:"#cccccc",
        padding:20,
        margin:10,
        borderRadius:4,
        backgroundColor:theme.color.primary,
        color:theme.shape.textColor
    }
    
})

export default styles