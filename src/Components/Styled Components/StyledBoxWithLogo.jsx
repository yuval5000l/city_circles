// import {StyledLightCircleBox, StyledRotatePurpleBox, StyledSmallLogoBox} from "./styledComponents";
// import {CityCircleSmallLogoLogIn} from "./styledCityCircleLogoLogIn";
import Box from "@mui/material/Box";
import * as React from "react";
import {styled} from "@mui/material/styles";
import {AppBar} from "@mui/material";
import CityCircleLogo from "./Icons/logo-new.png";
import Avatar from "@mui/material/Avatar";
import {StyledAvatarFriendProfile} from "./styledComponents";


const RotatePurpleBox = styled(AppBar)(({ theme })=> ({
    backgroundColor:theme.palette.primary.main,
    borderTop:`0.65rem solid ${theme.palette.secondary.main}`,
    // position:"fixed",
    position: 'relative',
    [theme.breakpoints.up('xs')]: {
        height:'16rem',
    }
}));

const PurpleBox = styled(AppBar)(({ theme })=> ({
    backgroundColor:theme.palette.primary.main,
    borderBottom:`0.65rem solid ${theme.palette.secondary.main}`,
    // position:"fixed",
    position: 'relative',
    [theme.breakpoints.up('xs')]: {
        height:'16rem',
    }
}));

const SmallPurpleBox = styled(Box)(({ theme })=> ({
    backgroundColor:theme.palette.primary.main,
    borderBottom:`0.65rem solid ${theme.palette.secondary.main}`,
    boxShadow : "0px 4px 4px rgba(0, 0, 0, 0.25)",
    // position:"fixed",
    justifyContent: "center",
    position: 'relative',
    [theme.breakpoints.up('xs')]: {
        height:'4rem',
    }
}));


const SmallLogoBox = styled(Box)(({ theme })=> ({
    borderRadius:"50%",
    boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
    border:`0.5rem solid ${theme.palette.secondary.main}`,
    backgroundColor:'white',
    position: "absolute",
    top : '-3.3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center",
    [theme.breakpoints.up('xs')]:{
        width:"5.5rem",
        height:"5.5rem",
    }
}));

const SmallLogoBoxBottom = styled(Box)(({ theme })=> ({
    borderRadius:"50%",
    boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
    border:`0.5rem solid ${theme.palette.secondary.main}`,
    backgroundColor:'white',
    position: "absolute",

    // top: '50%',
    left: '50%',
    transform:' translate(-50%, -50%)',
    // marginTop: '-100px',

    bottom : '-6.5rem',
    display: 'flex',
    justifyContent: 'center',
    // margin: "auto",
    // // justifyItems: "center",
    // // justifySelf: "center",
    alignItems: 'center',
    alignSelf: "center",
    [theme.breakpoints.up('xs')]:{
        width:"5.5rem",
        height:"5.5rem",
    }
}));



export function BottomBoxWithLogo({children}) {
    return (
        <RotatePurpleBox>
            <SmallLogoBox>
                <img src={CityCircleLogo} alt="logo" width="80rem" height="80rem"/>
            </SmallLogoBox>
            <Box margin="auto">{children}</Box>
        </RotatePurpleBox>
    );
}

export function TopBoxWithLogo() {
    return (
        <PurpleBox>
            <SmallLogoBoxBottom>
                <img src={CityCircleLogo} alt="logo" width="80rem" height="80rem"/>
            </SmallLogoBoxBottom>
        </PurpleBox>
    );
}

export function TopBoxWithProfileImg({img_url}) {
    return (
        <SmallPurpleBox >
            <SmallLogoBoxBottom>

                {(img_url==="") ? (<Avatar width="6rem" height="6rem"/>) : (<StyledAvatarFriendProfile src={img_url} />)}
            </SmallLogoBoxBottom>
        </SmallPurpleBox>
    );
}