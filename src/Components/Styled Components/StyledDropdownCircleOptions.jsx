import React, {useState} from 'react';
import {Grid, MenuItem} from '@mui/material';
import {StyledButtonGreen, StyledMenu} from "./styledComponents";
import Box from "@mui/material/Box";
import {StyledLightCircleBox} from "./styledComponents";
import Typography from "@mui/material/Typography";
const StyledDropdownCircleOptions = ({user, index, circlesList}) => {
        const [curCircle, setCurCircle] = useState(user.getCircles()[index]);
        const [anchorEl, setAnchorEl] = useState(null);
        const [buttonText, setButtonText] = useState(curCircle);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const handleOptionClick = async (option) => {
            setButtonText(option);
            setCurCircle(option);
            setAnchorEl(null);
            await user.changeCircle(index, option);

        };

        return (
            <Box >
                <StyledLightCircleBox onClick={handleClick}>
                    <Typography variant="h4" color="black">
                        {buttonText}
                    </Typography>
                </StyledLightCircleBox>
                <StyledMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    sx={{
                        position: 'fixed',
                        top: '-60px',
                        right: '10px'
                    }}
                >
                    <Grid container alignItems="center" justifyContent="center" width="100%" >
                        {circlesList.map((circle) => <MenuItem key={circle} onClick={() => handleOptionClick(circle)}>
                            <StyledButtonGreen>
                                {circle}
                            </StyledButtonGreen>
                        </MenuItem>)}
                    </Grid>
                </StyledMenu>
            </Box>
        )
            ;
    }
;

export default StyledDropdownCircleOptions;
