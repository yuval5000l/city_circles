import StyledHamburgerButtonWithCanvas from "./StyledHamburgerButtonWithCanvas";
import Box from "@mui/material/Box";
import theme from "../../Theme/Theme";
import * as React from "react";


function StyledTopBackMenu() {
    // const goHome = () =>{
    //     window.location.href = "/";
    // }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifycontent: 'space-between',
                alignItems: 'flex-start',
                backgroundColor: theme.palette.primary.main,
            }}
        >
            {/*<Box sx={{display: 'inline-block', marginLeft: '6px',marginTop:'5px'}}>*/}
            {/*    <GoBackButton/>*/}
            {/*</Box>*/}
            <Box sx={{display: "flex", padding:"0.5rem"}}>
                <StyledHamburgerButtonWithCanvas/>
            </Box>
        </Box>
    );
}

export default StyledTopBackMenu;