import React, {useState} from 'react';
import {StyledButtonGray} from "./styledComponents";
import theme from "../../Theme/Theme";
import {DialogContent, Typography} from "@mui/material";
import Dialog from "@mui/material/Dialog";

const StyledGrayButtonFullReview = ({content,userName}) => {
    const [clicked, setClicked] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleClick = () => {
        setClicked(true);
        setOpenDialog(true);
    };
    const handleClose = () => {
        setOpenDialog(false);
        setClicked(false);

    };
    return (
        <>
            <StyledButtonGray
                // variant="contained"
                color={clicked ? 'primary' : 'primary'}
                onClick={handleClick}
                style={{
                    boxShadow: clicked ? 'inset 0 0 10px rgba(0, 0, 0, 0.5)' : '0 2px 5px rgba(0, 0, 0, 0.3)',
                }}
            >
                full review
            </StyledButtonGray>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogContent sx={{
                    backgroundColor: `${theme.palette.primary.main}`,
                    border: `0.2rem solid ${theme.palette.secondary.main}`,
                    color:'white',
                }}>
                    <Typography variant="h3" marginBottom="1rem" sx={{textAlign:"left"}}>
                        {userName}:
                    </Typography>
                    <cite sx={{fontSize:"1.25rem", textAlign:"left"}}>{content}
                    </cite>
                </DialogContent>
            </Dialog>
        </>


    )
        ;
};

export default StyledGrayButtonFullReview;
