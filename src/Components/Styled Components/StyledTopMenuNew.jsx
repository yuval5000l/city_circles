import {Stack} from "@mui/material";
import {StyledAppBarTop, StyledSearchBar} from "./styledComponents";
import logoNew from "./Icons/logo-all-white.png";
import StyledHamburgerButtonWithCanvas from "./StyledHamburgerButtonWithCanvas";

function StyledTopMenuNew(){

    return(
        <StyledAppBarTop>
            <Stack direction = "row" alignItems="center" spacing={1} justifyContent="space-evenly">
                <item sx={{display:"flex"}}>
                    <StyledHamburgerButtonWithCanvas/>
                </item>
                <item sx={{display:"flex"}}>
                    <StyledSearchBar
                        // disabled
                        autoFocus={true}
                        // className="search-box search-bar-business"
                        type='search'
                        // onChangeHandler={onSearchChange}
                        placeholder='search business..'
                        // onChange={onSearchChange}
                    />
                </item>
                <item sx={{display:"flex"}}>
                    <img src={logoNew} alt={logoNew} width="72px"/>
                </item>
            </Stack>
        </StyledAppBarTop>
    );
}

export default StyledTopMenuNew;