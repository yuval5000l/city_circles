import React, { useState } from 'react';
import {Button, Menu, MenuItem, Stack} from '@mui/material';
import {StyledButtonGray, StyledCircleBox, StyledPurpleBox} from "./styledComponents";
import theme from "../../Theme/Theme";
import Box from "@mui/material/Box";

const StyledDropdownMenuFilter = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setAnchorEl(null);
    };

    return (
        <Box>
            <StyledButtonGray variant="contained" onClick={handleClick}>
                Filter:
            </StyledButtonGray>
            <Menu
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
                        option 1
                    </MenuItem>
                    <MenuItem onClick={() => handleOptionClick('Distance')}>
                        option 2
                    </MenuItem>
                </Stack>
            </Menu>
        </Box>
    );
};

export default StyledDropdownMenuFilter;
