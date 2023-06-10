import {StyledBottomNavigationAction} from "./styledComponents";
import AddIcon from "@mui/icons-material/Add";
import {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {Button, DialogActions, DialogContent, DialogContentText, Stack} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import StyledCircleReview from "./StyledCircleReview";
import StyledCircleFootprint from "./StyledCircleFootprints";
import theme from "../../Theme/Theme";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
export default function StyledBottomNavigationPlus() {
    const [openDialog, setOpenDialog] = useState(false);

    const handleClick = () => {
        setOpenDialog(true);
    };

    const handleCloseSmallDialog = () => {
        setOpenDialog(false);
    };
    return (
        <>

            <AddCircleOutlineRoundedIcon label = "add"
                sx={{
                    color:theme.palette.secondary.main,
                    // border:`0.3rem solid ${theme.palette.secondary.main}`,
                    borderRadius:"50%",
                    fontSize: {
                        xs: "3rem",
                        sm: "5rem"
                    }
                }}
                onClick={handleClick}
            />
            <Dialog open={openDialog} onClose={handleCloseSmallDialog}>
                <DialogContent sx={{
                    backgroundColor: `${theme.palette.primary.main}`,
                    border: `0.2rem solid ${theme.palette.secondary.main}`
                }}>

                <Stack direction = "row" spacing={2}>
                    <StyledCircleReview closeSmallDialog={handleCloseSmallDialog}/>
                    <StyledCircleFootprint closeSmallDialog={handleCloseSmallDialog}/>
                </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
}
