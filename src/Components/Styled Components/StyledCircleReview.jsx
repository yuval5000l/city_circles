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
import {Button, DialogActions, DialogContent, Stack, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import theme from "../../Theme/Theme";
import Business, {getBusinessByName} from "../../BackEnd/Classes/BusinessClass"
import {auth} from "../../BackEnd/config/firebase"
import {getUserById} from "../../BackEnd/Classes/UserClass"
import {useLocation} from "react-router-dom";


export default function StyledCircleReview({closeSmallDialog = () => {}, dictBusiness, setDictBusiness, user}) {

    const [open, setOpen] = useState(false);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [chosenBusiness, setChosenBusiness] = useState(" Idit Benyamin Acupuncture");
    const [isDisabled, setIsDisabled] = useState(true);
    const [openSecond, setOpenSecond] = useState(false);

    // const [clickty, setClickty] = useState("Business");
    // const location = useLocation();
    // let from = location.state.from;
    const [filteredBusiness, setFilteredBusiness] = useState([]);
    useEffect(() => {
        // getBusinesses()
        let lst = [];

        for (const [key, business] of Object.entries(dictBusiness))
        {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            let flag = true;
            for (const review of business.getReviews())
            {
                if (review.userID === auth.currentUser.uid)
                {
                    flag = false;
                    break;
                }
            }
            if (flag)
            {
                lst.push({label: business.getName()});
            }
        }
        setFilteredBusiness(lst);


    }, [dictBusiness]);
    // console.log(window.location.pathname);
    // useEffect(() => {
    //     if (window.location.pathname === '/BusinessPage' && from !== null)
    //     {
    //         setChosenBusiness(from);
    //         setClickty("Businesses");
    //     }
    // },[from]);


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
        handleOpenSecond()
        {
            if (auth?.currentUser?.uid !== undefined)
            {
                let business = dictBusiness[chosenBusiness];
                // const business = await getBusinessByName(chosenBusiness);
                // const user = await getUserById(auth?.currentUser?.uid);
                if (business !== null)
                {
                    await user.addBusinessReview(chosenBusiness, chosenBusiness, business.getProfilePic(), review, rating)
                }
                if (business !== null)
                {
                    await business.addUserReview(auth?.currentUser?.uid, user.getUserName(), user.getPic(), review, rating, user.getCircles());
                }

                dictBusiness[chosenBusiness] = business;
                setDictBusiness(dictBusiness);
            }
            else
            {
                console.error("No one is signed in! so no review sent");
            }

            handleClose();
        }
    }
    const handleOpenSecond = () => {
        setOpenSecond(true);
        const timeout = setTimeout(() => {
            handleCloseSecond();
        }, 2500);

        return () => {
            clearTimeout(timeout);
        };
    };

    const handleCloseSecond = () => {
        setOpenSecond(false);
    };
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
                                options={filteredBusiness}
                                renderInput={(params) => <TextField
                                    {...params}
                                    // inputValue={chosenBusiness}

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
                                {openSecond && (
                                    <Dialog open={openSecond} onClose={handleCloseSecond}>
                                        <DialogContent sx={{
                                            backgroundColor: `${theme.palette.primary.main}`,
                                            border: `0.2rem solid ${theme.palette.secondary.main}`
                                        }}>
                                            <StyledDialogTitle>Your <strong>review</strong> was accepted</StyledDialogTitle>
                                            <Typography variant="h4" color="white">
                                                You care!
                                            </Typography>
                                            {/* Add additional components for the second dialog */}
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </DialogActions>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>

        </Box>
    );
}

