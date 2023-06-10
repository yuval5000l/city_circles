import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import {
    StyledCircleBox,
    StyledDialogInputBusiness,
    StyledDialogReviewIcon, StyledDialogFootprintIcon,
    StyledDialogSecondTitle, StyledDialogTextFieldReview,
    StyledDialogTitle, StyledRating, StyledAutoComplete
} from "./styledComponents";
import {ReactComponent as FootprintsIcon} from "./Icons/footprints-svgrepo-com.svg";
import Box from "@mui/material/Box";
import {Autocomplete, Button, DialogActions, DialogContent, Stack} from "@mui/material";
import theme from "../../Theme/Theme";
import Dialog from "@mui/material/Dialog";
import {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
// import {auth, db} from "../config/firebase";
// import {getUserById} from "../Classes/UserClass";
// import Business, {getBusinessByName} from "../Classes/BusinessClass";
import TextField from "@mui/material/TextField";

export default function StyledCircleFootprint({closeSmallDialog= ()=>{}}){

    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [chosenBusiness, setChosenBusiness] = useState("");

    useEffect(() => {
        getBusinesses()
    }, [])

    const [lstBusiness, setLstBusiness] = useState([]);

    const getBusinesses = ()=> {
        Business.getAllBusinesses().then((lst) => {
            setLstBusiness(lst);
            // console.log(lstBusiness);
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        closeSmallDialog();
    };

    const HandleSend = async () => {
        if (chosenBusiness !== "")
        {
            const business = await getBusinessByName(chosenBusiness);

            const user = await getUserById(auth?.currentUser?.uid);
            if (business !== null) {
                await user.addBusinessFootprint(chosenBusiness, rating)
            }

            if (business !== null)
            {
                await business.addUserFootprint(auth?.currentUser?.uid, rating);
            }
            handleClose();
        }
    }

    return(
        <Box>
            <StyledCircleBox onClick={handleClickOpen}>
                <FootprintsIcon width="3.5rem" height="3.5rem" sx={{
                    fontSize:"3rem",
                    margin:"auto",
                    fill:"white",
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
                            <StyledDialogFootprintIcon/>
                            <StyledDialogTitle>New Footprint</StyledDialogTitle>
                        </Stack>
                        <Stack direction="column" spacing={1}>
                            <StyledDialogSecondTitle>I went to..</StyledDialogSecondTitle>
                            {/*<StyledDialogInputBusiness placeholder={"Business Name"}/>*/}
                            {/*TODO change front*/}
                            <StyledAutoComplete
                                disablePortal
                                inputValue={chosenBusiness}
                                onInputChange={(event, newInputValue) => {
                                    setChosenBusiness(newInputValue);
                                }}
                                id="combo-box-demo"
                                options={lstBusiness}
                                // sx={{ width: 300 }}
                                renderInput={(params) => <TextField
                                    {...params}
                                    label="Business"
                                />}
                            />
                        </Stack>
                        <Stack direction="column">
                        </Stack>
                        {/*<Stack direction="column">*/}
                        {/*    <StyledDialogSecondTitle>And I thought it was..</StyledDialogSecondTitle>*/}
                        {/*    <StyledDialogTextFieldReview*/}
                        {/*        multiline*/}
                        {/*        rows={4}*/}
                        {/*        id="name"*/}
                        {/*        label="Your Awesome Review"*/}
                        {/*        type="email"*/}
                        {/*        fullWidth*/}
                        {/*        variant="standard"*/}
                        {/*        value={review}*/}
                        {/*        onChange={e => setReview(e.target.value)}*/}
                        {/*    />*/}
                        {/*</Stack>*/}
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                            <DialogActions>
                                <Button onClick={handleClose}
                                        sx={{backgroundColor: `${theme.palette.secondary.main}`}}>Cancel</Button>
                                <Button onClick={HandleSend} sx={{backgroundColor: `${theme.palette.secondary.main}`}}>Send
                                    Footprint</Button>
                            </DialogActions>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>

        </Box>
    );
}