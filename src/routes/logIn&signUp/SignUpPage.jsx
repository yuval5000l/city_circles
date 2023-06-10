import {
    // StyledPurpleBox,
    StyledLightCircleBox,
    StyledDialogTextFieldReview,
    StyledAutoComplete,
    // StyledRotatePurpleBox,
    StyledButtonGray
} from "../../Components/Styled Components/styledComponents";
import {Stack, Typography} from "@mui/material";
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
import {getUserById} from "../../BackEnd/Classes/UserClass";
import {onAuthStateChanged} from "firebase/auth";


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

    const SchoolsLst = ['HUJI', 'HAC', 'Azrieli', 'Bezalel', 'Shalem', 'David Yalin'];
    const NeighborhoodLst = ['Rehavia', 'City Center', 'Nahlaot', 'Ramot', 'Talabia', 'Beit Hakerem', 'Resko', 'Katamon', 'Gilo'];
    const HobbyLst = ['Sport', 'Art', 'Cooking', 'Travel', 'Music', 'Gaming', 'Design', 'Reading'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(auth?.currentUser?.uid)
        const user = await getUserById(auth?.currentUser?.uid);
        await user.AddUserMoreInfo(name, chosenSchool, chosenNeighborhood, chosenHobby);
        // console.log("after user")
        window.location.replace('/');
    };

    return(
        <>
            <Typography variant="h1" sx={{color: 'primary.main', textAlign: "start", margin: '1rem'}}>
                Sign Up
            </Typography>
            <Typography variant="h3" sx={{color: 'primary.main', textAlign: "start", margin: '1rem'}}>
                Let’s get to know each other
            </Typography>
            <Typography variant="body1" sx={{textAlign: "start", margin: '1rem'}}>
                We are CityCircle nice to meet you! We want your relocation process to be as comfortable as it gets. So... we are going to ask some question! Feel free to answer (you can change your decisions later).
            </Typography>
            <Typography variant="body1" sx={{textAlign: "start", margin: '1rem'}}>
                We want you to chose 3 CityCircles  to be a part of, so we will understand a little more about what you like. The rest will come naturally :)
            </Typography>
            <Typography variant="h3" sx={{color: 'primary.main', textAlign: "start", margin: '1rem'}}>
                So who are you?
            </Typography>
            <Stack direction="column" alignItems="start" margin="1rem">
                <Typography variant="h4">
                    Your Name Is..
                </Typography>
                <StyledDialogTextFieldReview value={name} onChange={(event) => {setName(event.target.value)}}/>
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
            <Stack direction="column" margin="1rem" alignItems="start" >
                <Typography variant="h4" textAlign="start">You are a student in..</Typography>
                <StyledAutoComplete
                    disablePortal
                    inputValue={chosenSchool}
                    onInputChange={(event, newInputValue) => {
                        setChosenSchool(newInputValue);
                    }}
                    id="combo-box-demo"
                    options={SchoolsLst}
                    sx={{ width: 250 }}
                    renderInput={(params) => <TextField
                        {...params}
                        label="School"
                    />}
                />
            </Stack>
            <Stack direction="column" margin="1rem" alignItems="start" >
                <Typography variant="h4" textAlign="start">You live in..</Typography>
                <StyledAutoComplete
                    disablePortal
                    inputValue={chosenNeighborhood}
                    onInputChange={(event, newInputValue) => {
                        setChosenNeighborhood(newInputValue);
                    }}
                    id="combo-box-demo"
                    options={NeighborhoodLst}
                    sx={{ width: 250 }}
                    renderInput={(params) => <TextField
                        {...params}
                        label="Neighborhood"
                    />}
                />
            </Stack>

            <Stack direction="column" margin="1rem" alignItems="start" marginBottom={5}>
                <Typography variant="h4" textAlign="start">Your hobby is.. (for now, you can change it later :))</Typography>
                <StyledAutoComplete
                    disablePortal
                    inputValue={chosenHobby}
                    onInputChange={(event, newInputValue) => {
                        setChosenHobby(newInputValue);
                    }}
                    id="combo-box-demo"
                    options={HobbyLst}
                    sx={{ width: 250 }}
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

            <StyledButtonGray onClick={handleSubmit}>Finish!</StyledButtonGray>




            {/*<Box sx={{position: 'relative'}}>*/}
            {/*    <br/>*/}
            {/*    <br/>*/}
            {/*</Box>*/}

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </>
    )
}