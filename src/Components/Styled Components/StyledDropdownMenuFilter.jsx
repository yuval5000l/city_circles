import React, {useState} from 'react';
import {Grid, MenuItem} from '@mui/material';
import {StyledButtonGray, StyledButtonGreen, StyledMenu} from "./styledComponents";
import theme from "../../Theme/Theme";
import Box from "@mui/material/Box";

const StyledDropdownMenuFilter = ({setFilterMethod}) => {
        const [anchorEl, setAnchorEl] = useState(null);
        const [isClicked, setIsClicked] = useState(false);
        const [buttonText, setButtonText] = useState('Filter By..');
        const buttonStyles = {
            color: isClicked ? "white" : 'black',
            backgroundColor: isClicked ? theme.palette.info.main : theme.palette.info.light,
            boxShadow: isClicked ? "inset 0px 15px 4px rgba(0, 0, 0, 0.25)" : "0px 4px 4px rgba(0, 0, 0, 0.25)",
        };

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
            setIsClicked((prevClicked) => !prevClicked);
        };

        const clearFilter = () => {
            setIsClicked(false);
            setButtonText("Filter By..")
            setAnchorEl(null)
            setFilterMethod("");
        }
        const handleClose = () => {
            setAnchorEl(null);
            if (buttonText === "Filter By..") {
                setIsClicked(false);
            }
        };

        const handleOptionClick = (option) => {
            setButtonText(option)
            setAnchorEl(null);
            setIsClicked(true);
            setFilterMethod(option);

        };

        return (
            <Box>
                <StyledButtonGray variant="contained" onClick={handleClick}
                                  style={buttonStyles}
                                  sx={{width: "10rem"}}>
                    {buttonText}
                </StyledButtonGray>
                <StyledMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    <Grid container alignItems="center" justifyContent="center" width="100%">
                        <MenuItem onClick={() => handleOptionClick('Consulting')}>
                            <StyledButtonGreen>
                                Consulting
                            </StyledButtonGreen>
                        </MenuItem>
                        <MenuItem onClick={() => handleOptionClick('Health & Wellness')}>
                            <StyledButtonGreen>
                                Health & Wellness
                            </StyledButtonGreen>
                        </MenuItem>
                        <MenuItem onClick={() => handleOptionClick('Lifestyle & Home')}>
                            <StyledButtonGreen>
                                Lifestyle & Home
                            </StyledButtonGreen>
                        </MenuItem>
                        <MenuItem onClick={() => handleOptionClick('Outdoors')}>
                            <StyledButtonGreen>
                                Outdoors
                            </StyledButtonGreen>
                        </MenuItem>
                        <MenuItem onClick={() => handleOptionClick('Music')}>
                            <StyledButtonGreen>
                                Music
                            </StyledButtonGreen>
                        </MenuItem>
                        <MenuItem onClick={() => handleOptionClick('Handmade Crafts')}>
                            <StyledButtonGreen>
                                Handmade Crafts
                            </StyledButtonGreen>
                        </MenuItem>
                        <MenuItem onClick={() => handleOptionClick('Food & Drinks')}>
                            <StyledButtonGreen>
                                Food & Drinks
                            </StyledButtonGreen>
                        </MenuItem>
                        <MenuItem onClick={() => handleOptionClick('Creative Services')}>
                            <StyledButtonGreen>
                                Creative Services
                            </StyledButtonGreen>
                        </MenuItem>

                        <MenuItem onClick={() => handleOptionClick('Technology Solutions')}>
                            <StyledButtonGreen>
                                Technology Solutions
                            </StyledButtonGreen>
                        </MenuItem>
                    </Grid>
                    <StyledButtonGray onClick={clearFilter}>Clear Filter</StyledButtonGray>
                </StyledMenu>
            </Box>
        )
            ;
    }
;

export default StyledDropdownMenuFilter;
