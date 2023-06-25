import {Stack} from "@mui/material";
import StyledHamburgerButtonWithCanvas from "./StyledHamburgerButtonWithCanvas";
import Box from "@mui/material/Box";
import theme from "../../Theme/Theme";
import GoBackButton from "./StyledGoBackButton";
import * as React from "react";


function StyledTopBackMenu({setSearch, setValue}) {
    const goHome = () =>{
        window.location.href = "/";
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
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