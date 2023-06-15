import React, {useState} from 'react';
import {Grid, Menu, MenuItem, Stack} from '@mui/material';
import {StyledButtonGray, StyledMenu} from "./styledComponents";
import theme from "../../Theme/Theme";
import Box from "@mui/material/Box";

const StyledDropdownMenuFilter = () => {
        const [anchorEl, setAnchorEl] = useState(null);
        const [selectedOption, setSelectedOption] = useState('');
        const [backgroundcolor, setBGColor] = useState(theme.palette.primary.light);
        const [boxShadow, setBoxShadow] = useState('rgba(0, 0, 0, 0.35) 0px 5px 15px');
        const [color, setColor] = useState("black");
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
            setBGColor("white");
            setBoxShadow("rgba(117, 91, 222, 0.7) 0px 30px 60px -12px inset,rgba(117, 91, 222, 0.7) 0px 18px 36px -18px inset");
            setColor("white");
        };

        const handleClose = () => {
            setAnchorEl(null);
            setBGColor("white");
            setBoxShadow("rgba(117, 91, 222, 0.7) 0px 30px 60px -12px inset,rgba(117, 91, 222, 0.7) 0px 18px 36px -18px inset");
            setColor("white");
        };

        const handleOptionClick = (option) => {
            setSelectedOption(option);
            setAnchorEl(null);
        };

        return (
            <Box>
                <StyledButtonGray variant="contained" onClick={handleClick} style={{boxShadow: boxShadow, backgroundColor:backgroundcolor,color:color}}>
                    Filter:
                </StyledButtonGray>
                <StyledMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}>
                    <Grid container spacing={1} alignItems="center" justifyContent="center">
                        <MenuItem onClick={() => handleOptionClick('Footprints')}>
                            option 19
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
                </StyledMenu>
            </Box>
        )
            ;
    }
;

export default StyledDropdownMenuFilter;
