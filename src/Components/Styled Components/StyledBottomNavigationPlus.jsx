import {useState} from "react";
import Dialog from "@mui/material/Dialog";
import {DialogContent, Stack, Typography} from "@mui/material";
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
            <Stack  direction="column"
                    justifyContent="center"
                    alignItems="center">
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
                <Typography fontSize="1rem" sx={{color:`${theme.palette.secondary.main}`}}> add review</Typography>
            </Stack>
            <Dialog open={openDialog} onClose={handleCloseSmallDialog}>
                <DialogContent sx={{
                    backgroundColor: `${theme.palette.primary.main}`,
                    border: `0.2rem solid ${theme.palette.secondary.main}`
                }}>

                <Stack direction = "row" spacing={2} justifyContent="center" alignItems={"center"}>
                    <StyledCircleReview closeSmallDialog={handleCloseSmallDialog}/>
                    <StyledCircleFootprint closeSmallDialog={handleCloseSmallDialog}/>
                </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
}
