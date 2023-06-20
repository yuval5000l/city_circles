import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import {
    StyledAutoComplete,
    StyledCircleBox,
    StyledDialogReviewIcon,
    StyledDialogSecondTitle, StyledDialogTextFieldReview,
    StyledDialogTitle, StyledRating
} from "./styledComponents";
import {useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import {Button, DialogActions, DialogContent, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import theme from "../../Theme/Theme";
import Business, {getBusinessByName} from "../../BackEnd/Classes/BusinessClass"
import {auth} from "../../BackEnd/config/firebase"
import {getUserById} from "../../BackEnd/Classes/UserClass"


export default function StyledCircleReview({closeSmallDialog = () => {}}) {
    const [open, setOpen] = useState(false);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [chosenBusiness, setChosenBusiness] = useState("");
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        getBusinesses()
    }, [])


    const [lstBusiness, setLstBusiness] = useState([]);
    const getBusinesses = ()=> {
        Business.getAllBusinessesNamesLabels().then((lst) => {
            setLstBusiness(lst);
            // console.log(lstBusiness);
        }).catch((error) => {
            console.error(error);
        });
    }
    // console.log(auth?.currentUser?.uid);
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
    const HandleSend = async () => {
        if (chosenBusiness !== "")
        {
            if (auth?.currentUser?.uid !== undefined)
            {
                const business = await getBusinessByName(chosenBusiness);

                const user = await getUserById(auth?.currentUser?.uid);
                if (business !== null) {
                    await user.addBusinessReview(chosenBusiness, chosenBusiness, business.getProfilePic(), review, rating)
                }
                if (business !== null) {
                    await business.addUserReview(auth?.currentUser?.uid, user.getUserName(), user.getPic(), review, rating);
                }
            }
            else
            {
                console.error("No one is signed in! so no review sent");
            }

            handleClose();
        }
    }

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
                            <StyledAutoComplete
                                disablePortal
                                inputValue={chosenBusiness}
                                onInputChange={(event, newInputValue) => {
                                    setChosenBusiness(newInputValue);
                                    if (newInputValue !== "" && review !== "" && rating !== 0) {
                                        setIsDisabled(false);
                                    }
                                    if(newInputValue === "" || review === "" || rating === 0) {
                                        setIsDisabled(true);
                                    }
                                }}
                                id="combo-box-demo"
                                options={lstBusiness}
                                renderInput={(params) => <TextField
                                    {...params}
                                    label="Business"/>}

                            />
                        </Stack>
                        <Stack direction="column">
                            <StyledDialogSecondTitle>It was..</StyledDialogSecondTitle>
                            <StyledRating
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                    if (chosenBusiness !== "" && review !== "" && newValue !== null) {
                                        setIsDisabled(false);
                                    }
                                    if(chosenBusiness === "" || review === "" || newValue === null) {
                                        setIsDisabled(true);
                                    }
                                }}
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
                                value={review}
                                onChange={e =>
                                {
                                    setReview(e.target.value);
                                    if (chosenBusiness !== "" && e.target.value !== "" && rating !== 0) {
                                        setIsDisabled(false);
                                    }
                                    if(chosenBusiness === "" || e.target.value === "" || rating === 0) {
                                        setIsDisabled(true);
                                    }
                                }}

                            />
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                            <DialogActions>
                                <Button onClick={handleClose}
                                        sx={{backgroundColor: `${theme.palette.secondary.main}`}}>Cancel</Button>
                                <Button disabled={isDisabled} onClick={HandleSend} sx={{backgroundColor: `${theme.palette.secondary.main}`}}>Send
                                    Review</Button>
                            </DialogActions>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
        </Box>
    );
}