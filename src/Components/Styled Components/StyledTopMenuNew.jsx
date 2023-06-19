import {Stack} from "@mui/material";
import {StyledAppBarTop, StyledSearchBar} from "./styledComponents";
import logoNew from "./Icons/logo-all-white.png";
import StyledHamburgerButtonWithCanvas from "./StyledHamburgerButtonWithCanvas";
import Box from "@mui/material/Box";
import StyledLogo from "./StyledLogo";
import {useState} from "react";

function StyledTopMenuNew({setSearch}) {
    const currentURL = window.location.href;

    const SendToSearch = () => {
        if (currentURL !== "http://localhost:3000/CirclesPageComponent") {
            window.location.href = "http://localhost:3000/CirclesPageComponent";
        }

    }
    const goHome = () =>{
        window.location.href = "/";
    }

    return (
        <StyledAppBarTop>
            <Stack direction="row" alignItems="center" spacing={1} justifyContent="space-evenly">
                <Box sx={{display: "flex"}}>
                    <StyledHamburgerButtonWithCanvas/>
                </Box>
                <Box sx={{display: "flex"}}>

                    <StyledSearchBar
                        // disabled
                        autoFocus={true}
                        // className="search-box search-bar-business"
                        type='search'
                        // onChangeHandler={onSearchChange}
                        // value={searchContent}
                        placeholder='search business..'
                        onClick={SendToSearch}
                        onChange={e => setSearch(e.target.value)}
                        // onChange={onSearchChange}
                        href={"/CirclesPageComponent"}
                    />
                </Box>
                <StyledLogo/>
            </Stack>
        </StyledAppBarTop>
    );
}

export default StyledTopMenuNew;