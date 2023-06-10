import {
    StyledCircleBox,
    StyledDialogFootprintIcon,
    StyledDialogSecondTitle,
    StyledDialogTitle, StyledAutoComplete
} from "./styledComponents";
import {ReactComponent as FootprintsIcon} from "./Icons/footprints-svgrepo-com.svg";
import Box from "@mui/material/Box";
import {Button, DialogActions, DialogContent, Stack} from "@mui/material";
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
            if (auth?.currentUser?.uid !== undefined)
            {
                const business = await getBusinessByName(chosenBusiness);

                const user = await getUserById(auth?.currentUser?.uid);
                if (business !== null) {
                    await user.addBusinessFootprint(chosenBusiness)
                }

                if (business !== null)
                {
                    await business.addUserFootprint(auth?.currentUser?.uid);
                }
            }
            else
            {
                console.error("No one is signed in!");
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
                            <StyledAutoComplete
                                disablePortal
                                inputValue={chosenBusiness}
                                onInputChange={(event, newInputValue) => {
                                    setChosenBusiness(newInputValue);
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