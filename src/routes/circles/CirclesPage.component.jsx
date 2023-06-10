import {Component} from "react";
import {StyledPurpleBox} from "../../Components/Styled Components/styledComponents";
import theme from "../../Theme/Theme";
import Box from "@mui/material/Box";
import StyledCirclesSearchItem from "../../Components/Styled Components/StyledCirclesSearchItem";
import {Stack, Typography} from "@mui/material";
import StyledDropdownMenuSortBy from "../../Components/Styled Components/StyledDropdownMenuSortBy";
import StyledDropdownMenuFilter from "../../Components/Styled Components/StyledDropdownMenuFilter";

class CirclesPageComponent extends Component {
    render() {
        // const position = [31.777587, 35.215094]; //[this.state.location.lat, this.state.location.lng];
        return (
            <>
                <Box sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderBottom: `0.5rem solid ${theme.palette.secondary.main}`
                }}>
                    <Stack direction="column" spacing={2} alignItems="center" justifyContent="center">
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" padding="0.4rem" >
                            <StyledCirclesSearchItem name={"Circle1"}/>
                            <StyledCirclesSearchItem name={"Circle2"}/>
                            <StyledCirclesSearchItem name={"Circle3"}/>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" padding="0.4rem" >
                            <StyledDropdownMenuSortBy/>
                            <StyledDropdownMenuFilter/>

                        </Stack>
                    </Stack>

                </Box>
            </>

        );
    }
}

export default CirclesPageComponent;
