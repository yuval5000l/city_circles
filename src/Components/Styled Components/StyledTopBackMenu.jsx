import StyledHamburgerButtonWithCanvas from "./StyledHamburgerButtonWithCanvas";
import Box from "@mui/material/Box";
import * as React from "react";
import StyledLogo from "./StyledLogo";
import {AppBar, Input, Stack} from "@mui/material";
import {styled} from "@mui/material/styles";

const StyledProfileBarTop = styled(AppBar)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    // borderBottom:"0.1rem solid #C3ED5B",
    // position: "fixed",
    display: "flex",
    maxWidth: "100%",
    // [theme.breakpoints.up('xs')]: {
    //     height: '4rem',
    // },
//     [theme.breakpoints.up('md')]: {
//     height: '6.5rem',
// }
}));

const StyledFakeSearchBar = styled(Input)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    // color: theme.palette.info.dark,
    marginLeft: "auto",
    marginRight: "auto",
    // borderRadius: "10px",
    padding: "0.3rem",
    [theme.breakpoints.up('xs')]: {
        height: '2rem',
    }
}));

function StyledTopBackMenu() {
    // const goHome = () =>{
    //     window.location.href = "/";
    // }

    return (

        <StyledProfileBarTop>
            <Stack direction="row" alignItems="center" spacing={1} justifyContent="space-evenly" >
                <Box sx={{display: "flex"}}>
                    <StyledHamburgerButtonWithCanvas/>
                </Box>
                <Box
                    // sx={{display: "flex", width: "100%", marginX: "auto"}}
                >
                    <StyledFakeSearchBar aria-hidden={true} disabled={true} disableUnderline={true}
                    />
                </Box>
                <Box>
                    <StyledLogo/>
                </Box>
            </Stack>
        </StyledProfileBarTop>

        // <Stack direction="row" alignItems="center" spacing={1} justifyContent="space-between"
        // sx={{display: "flex", backgroundColor: theme.palette.primary.main}}>
        //
        // {/*// <Box*/}
        // {/*//     sx={{*/}
        // {/*//         display: 'flex',*/}
        // {/*//         flexDirection: 'row',*/}
        // {/*//         justifyContent: 'space-between',*/}
        // {/*//         alignItems: 'center',*/}
        // {/*//         backgroundColor: theme.palette.primary.main,*/}
        // {/*//     }}*/}
        // {/*// >*/}
        //     {/*<Box sx={{display: 'inline-block', marginLeft: '6px',marginTop:'5px'}}>*/}
        //     {/*    <GoBackButton/>*/}
        //     {/*</Box>*/}
        //     <Box sx={{display: "flex", padding:"0.2rem"}}>
        //         <StyledHamburgerButtonWithCanvas/>
        //     </Box>
        //     <Box>
        //         <StyledLogo/>
        //     </Box>
        // </Stack>

        // </Box>

        // <Box
        //     sx={{
        //         display: 'flex',
        //         flexDirection: 'row',
        //         justifycontent: 'space-between',
        //         alignItems: 'flex-start',
        //         backgroundColor: theme.palette.primary.main,
        //     }}
        // >
        //     {/*<Box sx={{display: 'inline-block', marginLeft: '6px',marginTop:'5px'}}>*/}
        //     {/*    <GoBackButton/>*/}
        //     {/*</Box>*/}
        //     <Box sx={{display: "flex", padding:"0.5rem"}}>
        //         <StyledHamburgerButtonWithCanvas/>
        //     </Box>
        // </Box>
    );
}

export default StyledTopBackMenu;