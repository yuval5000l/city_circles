import {Stack} from "@mui/material";
import {StyledAppBarTop, StyledSearchBar} from "./styledComponents";
import StyledHamburgerButtonWithCanvas from "./StyledHamburgerButtonWithCanvas";
import Box from "@mui/material/Box";
import StyledLogo from "./StyledLogo";


function StyledTopMenuNew({setSearch, setValue}) {

    const SendToSearch = () => {
        let currentURL = window.location.href;
        if (currentURL !== "http://localhost:3000/") {
            window.location.href = "http://localhost:3000/";
            setValue(1);

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
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
                        // onChange={onSearchChange}
                        // href={"/CirclesPageComponent"}
                    />
                </Box>
                <Box>
                    <StyledLogo/>
                </Box>
            </Stack>
        </StyledAppBarTop>
    );
}

export default StyledTopMenuNew;