import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Stack} from "@mui/material";
import {useState} from "react";
import Business from "../../../BackEnd/Classes/BusinessClass";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import theme from "../../../Theme/Theme";


// function CustomizedSnackbars() {
//     const [open, setOpen] = React.useState(false);
//
//     const handleClick = () => {
//         setOpen(true);
//     };
//
//     const handleClose = (event, reason) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//
//         setOpen(false);
//     };
//
//     return (
//         <Stack spacing={2} sx={{width: '100%'}}>
//             <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
//                 <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
//                     You can not add business that is already exist
//                 </Alert>
//             </Snackbar>
//
//         </Stack>
//     );
// }

// const businessTypes = ['cosmetics', 'nails', 'barber', 'hair', 'sport', 'art', 'lifestyle', 'music']
export default function FirstPageBusinessRegistration({onNext, data}) {
    // console.log(data);
    const [newBusinessName, setNewBusinessName] = useState((data === null) ? ("") : (data[0]));
    const [businessTypes, setBusinessTypes] = useState(() => (data === null) ? ([]) : (data[1]));

    const [newPreviewUrl, setNewPreviewUrl] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [isBusinessAddedBefore, setIsBusinessAddedBefore] = useState(null)
    const [openAlert, setOpenAlert] = useState(false)
    // const {enqueueSnackbar} = useSnackbar();

    // Update Business Name State
    // const [businessName, setBusinessName] = useState(""); // TODO: in the future- need to make edit component


    // List of all Users
    // const [businessList, setBusinessList] = useState([]);
    // const businessesCollectionRef = collection(db, "Business");

    // const getBusinessesList = async () => {
    //     // READ THE DATA
    //     // SET THE MOVIE LIST
    //     try
    //     {
    //         const data = await getDocs(businessesCollectionRef);
    //         const filteredData = data.docs.map((doc) =>
    //             ({...doc.data(), id: doc.id,})
    //         );
    //         setBusinessList(filteredData);
    //         // console.log(filteredData[0]["Name"]);
    //         // console.log(filteredData);
    //     } catch (err){
    //         console.error(err);
    //     }
    // }
    //
    // useEffect(()=>{
    //
    //     getBusinessesList();
    // }, []);

    // function RowRadioButtonsGroup() {
    //
    //         const handleChange = (event) => {
    //             setIsBusinessAddedBefore(event.target.value);
    //             setOpenAlert(event.target.value === "true");
    //             };
    //
    //         return (
    //             <FormControl>
    //                 {/*<FormLabel id="demo-row-radio-buttons-group-label">Select:</FormLabel>*/}
    //                 <RadioGroup
    //                     row
    //                     aria-labelledby="demo-row-radio-buttons-group-label"
    //                     name="row-radio-buttons-group"
    //                     value={isBusinessAddedBefore}
    //                     onChange={handleChange}
    //                 >
    //                     <FormControlLabel value={true} control={<Radio/>} label="Yes"/>
    //                     <FormControlLabel value={false} control={<Radio/>} label="No"/>
    //
    //                 </RadioGroup>
    //             </FormControl>
    //         );
    //     }


    function BusinessTypesSelection(businesses_types) {
        const handleTypes = (event, newFormats) => {
            if (newFormats.length <= 3){
                setBusinessTypes(newFormats);
            }
            // console.log(businessTypes);
        };

        return (
            <Box sx={{}}>
                <ToggleButtonGroup
                    value={businessTypes}
                    onChange={handleTypes}
                    aria-label="business types"
                    style={{display: "flex", flexWrap: "wrap", margin: "1rem", justifyContent: "center"}}
                >
                    {businesses_types.map(btype =>
                        <ToggleButton value={btype} aria-label={btype} style={{
                            ...theme.typography.p,
                            margin: "1rem",
                            borderRadius: "15px",
                            boxShadow: "1px 2px 4px #000000"
                        }} key={btype}>
                            {btype}
                        </ToggleButton>
                    )}
                </ToggleButtonGroup>
            </Box>
        );
    }

        const handleOnNext = () => {
            onNext([newBusinessName, businessTypes, newPreviewUrl, ownerName]);
        }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    }

    return (
        <div>

            <Stack direction="column" justifyContent="flex-start" spacing={2} textAlign="left" padding="1rem">
                <Box>
                    <Typography variant="h2" textAlign="start">Category</Typography>
                    <Typography variant="h5" textAlign="start">Choose your business type (max of 3 types)</Typography>
                    {BusinessTypesSelection(Business.ListOfTypes)}
                </Box>
                <Typography variant="h2">Business Name</Typography>
                <TextField id="outlined-basic" label="Business Name" variant="outlined" value={newBusinessName}
                           onChange={(e) => setNewBusinessName(e.target.value)}/>

                <Typography variant="h2">Owner Name</Typography>
                <TextField label="Oner Name" variant="outlined" onChange={(e) => setOwnerName(e.target.value)}/>

                <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose} sx={{position: "relative"}}>
                    <Alert onClose={handleClose} severity="warning"
                           action={
                               <IconButton
                                   aria-label="close"
                                   color="inherit"
                                   size="small"
                                   onClick={() => {
                                       setOpenAlert(false);
                                   }}
                               >
                                   <CloseIcon fontSize="inherit"/>
                               </IconButton>
                           }
                           sx={{mb: 2}}
                    >
                        You can not add business that is already exist
                    </Alert>
                </Snackbar>
                <Typography variant="h2">Business owner facebook profile link:</Typography>
                <TextField placeholder="www.facebook.com/#addname" onChange={(e) => setNewPreviewUrl(e.target.value)}/>
            </Stack>
            {/*<Button onClick={onSubmitBusiness}> Sign In!</Button>*/}
            <Button onClick={handleOnNext}>
                <Typography variant="h3">
                    {'Next'}
                </Typography>
            </Button>
        </div>
    )
}
