import { useHistory } from 'react-router-dom';
import {StyledBackButton, StyledHamburgerButton} from "./styledComponents";

import React from 'react';
import {IconButton} from "@mui/material";

const GoBackButton = () => {
    const handleGoBack = () => {
        window.history.back();
    };

    return (
            <IconButton
                color="inherit"
                edge="start"
                onClick={handleGoBack}
            >
                <StyledBackButton/>
            </IconButton>
    );
};


export default GoBackButton;
