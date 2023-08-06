import {Stack} from "@mui/material";
import {StyledAppBarTop, StyledSearchBar} from "./styledComponents";
import StyledHamburgerButtonWithCanvas from "./StyledHamburgerButtonWithCanvas";
import Box from "@mui/material/Box";
import StyledLogo from "./StyledLogo";
import {useNavigate} from "react-router-dom";


function StyledTopMenuNew({setSearch, setValue, user}) {
    let navigate = useNavigate();
    const SendToSearch = () => {
        let currentURL = window.location.href.substring(window.location.origin.length);
        if (currentURL !== "/") {
            // window.location.replace("/");
            navigate("/", { state: {from:true} });
            setValue(1);

        }

    }
    // const goHome = () =>{
    //     window.location.href = "/";
    // }
    // console.log(user);
    return (
        <StyledAppBarTop>
            <Stack direction="row" alignItems="center" spacing={1} justifyContent="space-evenly">
                <Box sx={{display: "flex"}}>
                    <StyledHamburgerButtonWithCanvas user={user}/>
                </Box>
                <Box sx={{display: "flex"}}>
                    <StyledSearchBar
                        // disabled
                        id={"search-bar-main"}
                        autoFocus={false}
                        type='search'
                        placeholder='search business..'
                        onClick={SendToSearch}
                        onChange={(e) => {
                            setSearch(e.target.value)
                        }}
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