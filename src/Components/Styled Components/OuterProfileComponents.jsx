import {styled} from "@mui/material/styles";
import {AppBar} from "@mui/material";


export const SmallPurpleBox = styled(AppBar)(({ theme })=> ({
    backgroundColor:theme.palette.primary.main,
    // borderBottom:`0.65rem solid ${theme.palette.secondary.main}`,
    // position:"fixed",
    position: 'relative',
    borderRadius: 20,
    width: "90%",
    [theme.breakpoints.up('xs')]: {
        height:'10rem',
    }
}));



