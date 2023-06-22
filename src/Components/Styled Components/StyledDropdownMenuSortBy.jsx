import React, { useState } from 'react';
import {MenuItem, Stack} from '@mui/material';
import {StyledButtonGray, StyledMenu} from "./styledComponents";
import theme from "../../Theme/Theme";
import Box from "@mui/material/Box";
import StyledCirclesSearchItem from "./StyledSortByButton";

const StyledDropdownMenuSortBy = ({setSortMethod}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [buttonText, setButtonText] = useState('Sort By..');

    const buttonStyles = {
        color: isClicked ? "white" : 'black',
        backgroundColor: isClicked ? theme.palette.info.main : theme.palette.info.light,
        boxShadow: isClicked ? "inset 0px 15px 4px rgba(0, 0, 0, 0.25)" : "0px 4px 4px rgba(0, 0, 0, 0.25)",
    };
    const clearFilter =() =>{
        setIsClicked((false));
        setButtonText("Sort By..")
        setAnchorEl(null)
        setSortMethod("");
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setIsClicked((prevClicked) => !prevClicked);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setIsClicked((prevClicked) => !prevClicked);
    };

    const handleOptionClick = (option) => {
        setButtonText(option)
        setIsClicked((true));
        setSelectedOption(option);
        setAnchorEl(null);
        setSortMethod(option);
    };

    return (
        <Box>
            <StyledButtonGray variant="contained" onClick={handleClick} style={buttonStyles} sx={{width:"10rem"}}>
                {buttonText}
            </StyledButtonGray>
            <StyledMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        background: theme.palette.primary.main,
                        border:`0.5rem solid ${theme.palette.secondary.main}`
                    },
                }}
            >
                <Stack direction="row">
                    <MenuItem onClick={() => handleOptionClick('Footprints')}>
                        <StyledCirclesSearchItem name="Footprints" oonClick={() => handleOptionClick('Footprints')}/>
                    </MenuItem>
                    <MenuItem onClick={() => handleOptionClick('Distance')}>
                        <StyledCirclesSearchItem name="Distance" onClick={() => handleOptionClick('Distance')}/>
                    </MenuItem>
                </Stack>
                <StyledButtonGray onClick ={clearFilter}>Clear Sort</StyledButtonGray>
            </StyledMenu>
        </Box>
    );
};

export default StyledDropdownMenuSortBy;
