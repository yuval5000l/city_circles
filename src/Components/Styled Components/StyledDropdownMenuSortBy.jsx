import React, { useState } from 'react';
import {Menu, MenuItem, Stack} from '@mui/material';
import {StyledButtonGray, StyledCircleBox} from "./styledComponents";
import theme from "../../Theme/Theme";
import Box from "@mui/material/Box";

const StyledDropdownMenuSortBy = () => {
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
                Sort By:
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
                        <StyledCircleBox>
                            Footprints
                        </StyledCircleBox>
                    </MenuItem>
                    <MenuItem onClick={() => handleOptionClick('Distance')}>
                        <StyledCircleBox>
                            Distance
                        </StyledCircleBox>
                    </MenuItem>
                </Stack>
            </Menu>
        </Box>
    );
};

export default StyledDropdownMenuSortBy;
