import {
    // StyledPurpleBox,
    StyledLightCircleBox,
    StyledDialogTextFieldReview,
    StyledAutoComplete,
    // StyledRotatePurpleBox,
    StyledButtonGray, StyledCircleBox, StyledPurpleBox
} from "../../Components/Styled Components/styledComponents";
import {Button, Stack, Typography} from "@mui/material";
import {auth} from "../../BackEnd/config/firebase";
import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";

import {BottomBoxWithLogo} from "../../Components/Styled Components/StyledBoxWithLogo";
import User, {getUserById} from "../../BackEnd/Classes/UserClass";
import {onAuthStateChanged} from "firebase/auth";
import {uploadFile} from "../../BackEnd/Classes/GeneralFunctionsFireBase";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import theme from "../../Theme/Theme";
import StyledLogo from "../../Components/Styled Components/StyledLogo";


export default function SignupPage() {

    useEffect(() => {
        check_sign_in();
    }, []);


    const check_sign_in = () => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                window.location.replace("/signInPage");
            }
        });
    };
    // const userID = auth?.currentUser?.uid;
    const [name, setName] = useState("")
    const [value, setValue] = React.useState(dayjs('2022-04-17'));
    const [chosenSchool, setChosenSchool] = useState("");
    const [chosenNeighborhood, setChosenNeighborhood] = useState("");
    const [chosenHobby, setChosenHobby] = useState("");
    const [picturePath, setPicturePath] = useState("");
    const [file, setFile] = useState(null);

    // TODO: in the future- create a data base of circles and connect it to firebase/firestore
    const SchoolsLst = User.ListOfCirclesSchools;
    const NeighborhoodLst = User.ListOfCirclesNeighborhoods;
    const HobbyLst = User.ListOfCirclesPersonalities;

    useEffect(() =>
    {
        async function foo()
        {
            if (file !== null)
            {
                await handleUploadPic();
            }
        }
        foo();
    }, [file]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(auth?.currentUser?.uid);
        const user = await getUserById(auth?.currentUser?.uid);
        await user.AddUserMoreInfo(name, chosenSchool, chosenNeighborhood, chosenHobby, picturePath);
        // console.log("after user")
        window.location.replace('/');
    };
    const handleUploadPic = async () =>
    {
        uploadFile(file).then((pathy) => {
            setPicturePath(pathy);
        }).catch((error) => {
            console.error(error);
        });
    }
    return (
        <Stack direcction="column">
            <Box>
                <StyledLogo/>
            </Box>
            <Typography variant="h1" sx={{color: 'primary.main', textAlign: "start", margin: '1rem'}}>
                Sign Up
            </Typography>
            <Typography variant="h3" sx={{color: 'primary.main', textAlign: "start", margin: '1rem'}}>
                Let’s get to know each other a little bit
            </Typography>
            <Box sx={{borderRadius:"15px",backgroundColor:`${theme.palette.primary.main}`, color:"white", padding:"0.5rem", margin:"0.5rem"}}>
                <Typography variant="h4" sx={{textAlign: "start", margin: '1rem'}}>
                    We are <strong>CityCircle</strong> nice to meet you! We want your relocation process to be as comfortable as it gets.
                    So... we are going to ask some question! Feel free to answer (you can change your decisions later).
                </Typography>
                <Typography variant="h4" sx={{textAlign: "start", margin: '1rem'}}>
                    We want you to chose 3 CityCircles to be a part of, so we will understand a little more about what you
                    like. The rest will come naturally :)
                </Typography>
            </Box>
            <Typography variant="h3" sx={{color: 'primary.main', textAlign: "start", margin: '1rem'}}>
                So who are you?
            </Typography>
            <Stack direction="column" alignItems="start" margin="1rem">
                <Typography variant="h4">
                    Your Name Is..
                </Typography>
                <StyledDialogTextFieldReview value={name} onChange={(event) => {
                    setName(event.target.value)
                }}/>
            </Stack>
            <Stack direction="column" alignItems="start" margin="1rem">
                <Typography variant="h4">
                    Your Birthday is on..
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker
                            label="birthday day"
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>

            </Stack>
            <Stack direction="column" margin="1rem" alignItems="start">
                <Typography variant="h4" textAlign="start">You are a student in..</Typography>
                <StyledAutoComplete
                    disablePortal
                    inputValue={chosenSchool}
                    onInputChange={(event, newInputValue) => {
                        setChosenSchool(newInputValue);
                    }}
                    id="combo-box-demo"
                    options={SchoolsLst}
                    sx={{width: 250}}
                    renderInput={(params) => <TextField
                        {...params}
                        label="School"
                    />}
                />
            </Stack>
            <Stack direction="column" margin="1rem" alignItems="start">
                <Typography variant="h4" textAlign="start">You live in..</Typography>
                <StyledAutoComplete
                    disablePortal
                    inputValue={chosenNeighborhood}
                    onInputChange={(event, newInputValue) => {
                        setChosenNeighborhood(newInputValue);
                    }}
                    id="combo-box-demo"
                    options={NeighborhoodLst}
                    sx={{width: 250}}
                    renderInput={(params) => <TextField
                        {...params}
                        label="Neighborhood"
                    />}
                />
            </Stack>

            <Stack direction="column" margin="1rem" alignItems="start" marginBottom={5}>
                <Typography variant="h4" textAlign="start">Your hobby is.. (for now, you can change it later
                    :))</Typography>
                <StyledAutoComplete
                    disablePortal
                    inputValue={chosenHobby}
                    onInputChange={(event, newInputValue) => {
                        setChosenHobby(newInputValue);
                    }}
                    id="combo-box-demo"
                    options={HobbyLst}
                    sx={{width: 250}}
                    renderInput={(params) => <TextField
                        {...params}
                        label="Hobby"
                    />}
                />
            </Stack>
            <BottomBoxWithLogo>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <StyledLightCircleBox>
                        <Typography variant="h5" color="black">
                            {chosenSchool === "" ? 'School' : chosenSchool}
                        </Typography>
                    </StyledLightCircleBox>
                    <StyledLightCircleBox>
                        <Typography variant="h5" color="black">
                            {chosenNeighborhood === "" ? 'Neighborhood' : chosenNeighborhood}
                        </Typography>
                    </StyledLightCircleBox>
                    <StyledLightCircleBox>
                        <Typography variant="h5" color="black">
                            {chosenHobby === "" ? 'Hobby' : chosenHobby}
                        </Typography>
                    </StyledLightCircleBox>
                </Stack>
            </BottomBoxWithLogo>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}/>
            <button onClick={handleUploadPic}> Upload File</button>
            {(picturePath === "") ? (<Avatar sx={{width: 100, height: 100}}/>) :
                (<Avatar src={picturePath} sx={{width: 100, height: 100}}/>)}

            <StyledButtonGray onClick={handleSubmit}>Finish!</StyledButtonGray>
            {/*<Box sx={{position: 'relative'}}>*/}
            {/*    <br/>*/}
            {/*    <br/>*/}
            {/*</Box>*/}
        </Stack>
    );
}