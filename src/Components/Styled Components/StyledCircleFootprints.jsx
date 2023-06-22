import {
    StyledCircleBox,
    StyledDialogFootprintIcon,
    StyledDialogSecondTitle,
    StyledDialogTitle, StyledAutoComplete
} from "./styledComponents";
import {ReactComponent as FootprintsIcon} from "./Icons/footprints-svgrepo-com.svg";
import Box from "@mui/material/Box";
import {Button, DialogActions, DialogContent, Stack, Typography} from "@mui/material";
import theme from "../../Theme/Theme";
import Dialog from "@mui/material/Dialog";
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Business, {getBusinessByName} from "../../BackEnd/Classes/BusinessClass"
import {auth} from "../../BackEnd/config/firebase"
import {getUserById} from "../../BackEnd/Classes/UserClass"

export default function StyledCircleFootprint({closeSmallDialog= ()=>{}}){

    const [open, setOpen] = useState(false);
    const [chosenBusiness, setChosenBusiness] = useState("");
    const [isDisabled, setIsDisabled] = useState(true);
    const [openSecond, setOpenSecond] = useState(false);


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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        closeSmallDialog();
    };

    const IsBusinessSet = () => {
        if (chosenBusiness !== "") {
            setIsDisabled(false);
            return false
        }
        if(chosenBusiness==="") {
            setIsDisabled(true);
            return true
        }
    }

    // useEffect(() => {
    //     IsBusinessSet();
    // }, []);

    const HandleSend = async () => {
        if (chosenBusiness !== "")
        {
            handleOpenSecond()
            if (auth?.currentUser?.uid !== undefined)
            {
                const business = await getBusinessByName(chosenBusiness);

                const user = await getUserById(auth?.currentUser?.uid);
                if (business !== null) {
                    await user.addBusinessFootprint(chosenBusiness, chosenBusiness, business.getProfilePic())
                }

                if (business !== null)
                {
                    await business.addUserFootprint(auth?.currentUser?.uid, user.getUserName(), user.getPic());
                }
            }
            else
            {
                console.error("No one is signed in!");
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
                            <StyledAutoComplete
                                disablePortal
                                rows={1}
                                inputValue={chosenBusiness}
                                onInputChange={(event, newInputValue) => {
                                    setChosenBusiness(newInputValue);
                                    if (newInputValue !== "") {
                                        setIsDisabled(false);
                                    }
                                    if(newInputValue==="") {
                                        setIsDisabled(true);
                                    }
                                }}
                                id="combo-box-demo"
                                options={lstBusiness}
                                renderInput={(params) => <TextField
                                    {...params}
                                    label="Business"
                                />}
                            />
                        </Stack>
                        <Stack direction="column">
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                            <DialogActions>
                                <Button onClick={handleClose}
                                        sx={{backgroundColor: `${theme.palette.secondary.main}`}}>Cancel</Button>
                                <Button disabled={isDisabled} onClick={HandleSend} sx={{backgroundColor: `${theme.palette.secondary.main}`}}>Send
                                    Footprint</Button>
                                {openSecond && (
                                    <Dialog open={openSecond} onClose={handleCloseSecond}>
                                        <DialogContent sx={{
                                            backgroundColor: `${theme.palette.primary.main}`,
                                            border: `0.2rem solid ${theme.palette.secondary.main}`
                                        }}>
                                            <StyledDialogTitle>Your review was accepted</StyledDialogTitle>
                                            <Typography variant="h4">
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