import {Stack} from "@mui/material";
import {StyledAppBarTop, StyledSearchBar} from "./styledComponents";
import logoNew from "./Icons/logo-all-white.png";
import StyledHamburgerButtonWithCanvas from "./StyledHamburgerButtonWithCanvas";
import Box from "@mui/material/Box";

function StyledTopMenuNew() {
    const currentURL = window.location.href;

    const SendToSearch = () => {
        if (currentURL !== "http://localhost:3000/CirclesPageComponent") {
            window.location.href = "http://localhost:3000/CirclesPageComponent";
        }

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
                        placeholder='search business..'
                        onClick={SendToSearch}
                        // onChange={onSearchChange}
                    />
                </Box>
                <Box sx={{display: "flex"}}>
                    <img src={logoNew} alt={logoNew} width="72px"/>
                </Box>
            </Stack>
        </StyledAppBarTop>
    );
}

export default StyledTopMenuNew;