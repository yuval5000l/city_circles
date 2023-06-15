import React, {useEffect, useRef, useState} from 'react';
import {Grid, Menu, MenuItem, Stack} from '@mui/material';
import {StyledButtonGray, StyledMenu} from "./styledComponents";
import theme from "../../Theme/Theme";
import Box from "@mui/material/Box";

const StyledDropdownMenuFilter = () => {
        const [anchorEl, setAnchorEl] = useState(null);
        const [selectedOption, setSelectedOption] = useState('');
        const [isClicked, setIsClicked] = useState(false);
        const [buttonText, setButtonText] = useState('Sort By..');
        const buttonStyles = {
            color: isClicked ? "white" : 'black',
            backgroundColor: isClicked ? theme.palette.info.main : theme.palette.info.light,
            boxShadow: isClicked ? "inset 0px 15px 4px rgba(0, 0, 0, 0.25)" : "0px 4px 4px rgba(0, 0, 0, 0.25)",
        };

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
            setIsClicked((prevClicked) => !prevClicked);
        };

        const clearFilter =() =>{
            setIsClicked((false));
            setButtonText("Sort By..")
            setAnchorEl(null)
        }
        const handleClose = () => {
            setAnchorEl(null);
            if (buttonText === "Sort By.."){
                setIsClicked((false));
            }
        };

        const handleOptionClick = (option) => {
            setButtonText(option)
            setSelectedOption(option);
            setAnchorEl(null);
            setIsClicked((true));

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
                    <Grid container spacing={1} alignItems="center" justifyContent="center">
                        <MenuItem onClick={() => handleOptionClick('Footprints')}>
                            option 19
                        </MenuItem>
                        <MenuItem onClick={() => handleOptionClick('2')}>
                            option 2
                        </MenuItem>
                        <MenuItem onClick={() => handleOptionClick('3')}>
                            option 3
                        </MenuItem>
                        <MenuItem onClick={() => handleOptionClick('4')}>
                            option 4
                        </MenuItem>
                        <MenuItem onClick={() => handleOptionClick('5')}>
                            option 5
                        </MenuItem>
                        <MenuItem onClick={() => handleOptionClick('Distance')}>
                            option 2
                        </MenuItem>
                        <MenuItem onClick={() => handleOptionClick('Distance')}>
                            option 2
                        </MenuItem>
                        <MenuItem onClick={() => handleOptionClick('Distance')}>
                            option 2
                        </MenuItem>
                        <MenuItem onClick={() => handleOptionClick('Distance')}>
                            option 2
                        </MenuItem>
                    </Grid>
                    <StyledButtonGray onClick ={clearFilter}>Clear Filter</StyledButtonGray>
                </StyledMenu>
            </Box>
        )
            ;
    }
;

export default StyledDropdownMenuFilter;
