// import { createMuiTheme } from '@material-ui/core/styles';

import { createMuiTheme } from "@material-ui/core";

// import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    color:{
        primary:"#D32F2F",
        secondary:"#00BCD4",
        error:"#E64A19"
    },
    typography:{
        fontFamily:"Roboto"
    },
    shape:{
        borderRadius:4,
        backgroundColor:"#7B1FA2",
        textColor:"#ffffff"
    }
});
export default theme;