import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import {
    StyledAutoComplete,
    StyledCircleBox,
    StyledDialogInputBusiness,
    StyledDialogReviewIcon,
    StyledDialogSecondTitle, StyledDialogTextFieldReview,
    StyledDialogTitle, StyledRating
} from "./styledComponents";
import {useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import {Autocomplete, Button, DialogActions, DialogContent, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
// import {auth} from "../config/firebase";
import Box from "@mui/material/Box";
import theme from "../../Theme/Theme";
// import {getUserById} from "../Classes/UserClass";
// import Business, {getBusinessByName} from "../Classes/BusinessClass";
// import User from "../Classes";
// import getUserById from "../Classes";


export default function StyledCircleReview({closeSmallDialog = () => {}}) {
    const [open, setOpen] = useState(false);
    // const [review, setReview] = useState("");
    // const [rating, setRating] = useState(0);
    // const [chosenBusiness, setChosenBusiness] = useState("");
    //
    // useEffect(() => {
    //     getBusinesses()
    // }, [])
    //
    //
    // const [lstBusiness, setLstBusiness] = useState([]);
    // const getBusinesses = ()=> {
    //     Business.getAllBusinesses().then((lst) => {
    //         setLstBusiness(lst);
    //         // console.log(lstBusiness);
    //     }).catch((error) => {
    //         console.error(error);
    //     });
    // }
    // console.log(business_id);
    // console.log(auth?.currentUser.uid);
    const handleClickOpen = () => {
        setOpen(true);

    };
    //
    const handleClose = () => {
        closeSmallDialog();
        setOpen(false);
    };
    // const fetch = async () => {
    //     docSnap = await getDoc(docRef);
    //     setBusinessData(docSnap.data());
    // }
    // Getting the document from the database
    //
    //
    //
    // const HandleSend = async () => {
    //     if (chosenBusiness !== "")
    //     {
    //         const business = await getBusinessByName(chosenBusiness);
    //
    //         const user = await getUserById(auth?.currentUser?.uid);
    //         if (business !== null) {
    //             await user.addBusinessReview(chosenBusiness, review, rating)
    //         }
    //
    //         if (business !== null)
    //         {
    //             await business.addUserReview(auth?.currentUser?.uid, review, rating);
    //         }
    //
    //         handleClose();
    //     }
    // }

    return (
        <Box>
            <StyledCircleBox onClick={handleClickOpen}>
                <RateReviewOutlinedIcon sx={{
                    fontSize: "3.5rem",
                    margin: "auto",
                    color: "white",
                    width: "3.125rem !important",
                    height: "3.125rem",
                }}/>
            </StyledCircleBox>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent sx={{
                    backgroundColor: `${theme.palette.primary.main}`,
                    border: `0.2rem solid ${theme.palette.secondary.main}`
                }}>
                    <Stack direction="column" spacing={2}>
                        <Stack direction="row"
                               justifyContent="center"
                               alignItems="center"
                               spacing={1}>
                            <StyledDialogReviewIcon/>
                            <StyledDialogTitle>New Review</StyledDialogTitle>
                        </Stack>
                        <Stack direction="column" spacing={1}>
                            <StyledDialogSecondTitle>I went to..</StyledDialogSecondTitle>
                            {/*TODO change front*/}
                            <StyledAutoComplete
                                disablePortal
                                // inputValue={chosenBusiness}
                                // onInputChange={(event, newInputValue) => {
                                //     setChosenBusiness(newInputValue);
                                // }}
                                // id="combo-box-demo"
                                // options={lstBusiness}
                                // renderInput={(params) => <TextField
                                //     {...params}
                                //     label="Business"/>
                            />
                            {/*<StyledDialogInputBusiness placeholder={"where did you go???!"}/>*/}
                        </Stack>
                        <Stack direction="column">
                            <StyledDialogSecondTitle>It was..</StyledDialogSecondTitle>
                            <StyledRating
                                // value={rating}
                                // onChange={(event, newValue) => {
                                //     setRating(newValue);
                                // }}
                            />
                        </Stack>
                        <Stack direction="column" spacing={1}>
                            <StyledDialogSecondTitle>And I thought it was..</StyledDialogSecondTitle>
                            <StyledDialogTextFieldReview
                                multiline
                                rows={4}
                                id="name"
                                width="unset"
                                label="Your Awesome Review"
                                type="email"
                                fullWidth
                                variant="standard"
                                // value={review}
                                // onChange={e => setReview(e.target.value)}
                            />
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                            <DialogActions>
                                <Button onClick={handleClose}
                                        sx={{backgroundColor: `${theme.palette.secondary.main}`}}>Cancel</Button>
                                {/*<Button onClick={HandleSend} sx={{backgroundColor: `${theme.palette.secondary.main}`}}>Send*/}
                                {/*    Review</Button>*/}
                            </DialogActions>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
        </Box>
    );
}