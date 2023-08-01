import {
    // StyledPurpleBox,
    StyledLightCircleBox,
    StyledDialogTextFieldReview,
    StyledAutoComplete,
} from "../../Components/Styled Components/styledComponents";
import {Button, Stack, Typography} from "@mui/material";
import {auth} from "../../BackEnd/config/firebase";
import * as React from 'react';
// import dayjs from 'dayjs';
// import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
// import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
// import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
// import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";

// import {BottomBoxWithLogo} from "../../Components/Styled Components/StyledBoxWithLogo";
import User, {getUserById} from "../../BackEnd/Classes/UserClass";
// import {onAuthStateChanged} from "firebase/auth";
import {uploadFile} from "../../BackEnd/Classes/GeneralFunctionsFireBase";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import theme from "../../Theme/Theme";
import StyledLogo from "../../Components/Styled Components/StyledLogo";
import {useNavigate} from "react-router-dom";


export default function SignupPage() {

    // useEffect(() => {
    //     check_sign_in();
    // }, []);
    //
    //
    // const check_sign_in = () => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (!user) {
    //             window.location.replace("/signInPage");
    //         }
    //     });
    // };
    // const userID = auth?.currentUser?.uid;
    const [name, setName] = useState("")
    const [chosenSchool, setChosenSchool] = useState("");
    const [chosenNeighborhood, setChosenNeighborhood] = useState("");
    // const [chosenHobby, setChosenHobby] = useState("");
    const [picturePath, setPicturePath] = useState("");
    const [file, setFile] = useState(null);

    // TODO: in the future- create a data base of circles and connect it to firebase/firestore
    const SchoolsLst = User.ListOfCirclesSchools;
    const NeighborhoodLst = User.ListOfCirclesNeighborhoods;
    // const HobbyLst = User.ListOfCirclesPersonalities;
    let navigate = useNavigate();

    useEffect(() => {
        async function foo() {
            if (file !== null) {
                await handleUploadPic();
            }
        }

        // noinspection JSIgnoredPromiseFromCall
        foo();
    }, [file]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(auth?.currentUser?.uid);
        const user = await getUserById(auth?.currentUser?.uid);
        await user.AddUserMoreInfo(name, chosenSchool, chosenNeighborhood, picturePath);
        // console.log("after user")
        navigate("/", { data: true });
    };
    const handleUploadPic = async () => {
        uploadFile(file).then((pathy) => {
            setPicturePath(pathy);
        }).catch((error) => {
            console.error(error);
        });
    }
    return (
        <Box paddingTop="1rem" paddingBottom="1rem">
            <Stack direcction="column"
                   justifyContent="flex-start"
                   spacing={2}
                   padding="1rem">
                <Box sx={{
                    backgroundColor: `${theme.palette.primary.main}`,
                    color: "white",
                    padding: "0.5rem",
                    borderRadius: "50%",
                    maxWidth: "fit-content",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}>
                    <StyledLogo/>
                </Box>
                <Typography variant="h1" sx={{color: 'primary.main', textAlign: "center", margin: '1rem'}}>
                    Sign Up
                </Typography>
                <Typography variant="h2" sx={{color: 'primary.main', textAlign: "center", margin: '1rem'}}>
                    Let’s get to know each other a little bit better!
                </Typography>
                <Box sx={{
                    borderRadius: "15px",
                    backgroundColor: `${theme.palette.primary.main}`,
                    color: "white",
                    padding: "0.5rem",
                    margin: "0.5rem"
                }}>
                    <Typography variant="h4" sx={{textAlign: "start", margin: '1rem'}}>
                        We are <strong>CityCircle</strong> nice to meet you! We want your relocation process to be as
                        comfortable as it gets.
                        So... we are going to ask some question! Feel free to answer (you can change your decisions
                        later).
                    </Typography>
                    <Typography variant="h4" sx={{textAlign: "start", margin: '1rem'}}>
                        We want you to chose 3 <strong>CityCircle</strong> to be a part of, so we will understand a
                        little
                        more about what you
                        like. The rest will come naturally :)
                    </Typography>
                </Box>
                <Typography variant="h2" sx={{color: 'primary.main', textAlign: "center", margin: '1rem'}}>
                    So who are you?
                </Typography>
                <Stack direction="column" alignItems="start" spacing={1}>
                    <Typography variant="h3">
                        Your Name Is..
                    </Typography>
                    <StyledDialogTextFieldReview sx={{padding: "unset !important"}} value={name} onChange={(event) => {
                        setName(event.target.value)
                    }}/>
                </Stack>
                <Stack direction="column" alignItems="start" spacing={1}>
                    <Typography variant="h3" textAlign="start">You are a student in..</Typography>
                    <StyledAutoComplete
                        disablePortal
                        inputValue={chosenSchool}
                        onInputChange={(event, newInputValue) => {
                            setChosenSchool(newInputValue);
                        }}
                        id="combo-box-demo"
                        options={SchoolsLst}
                        sx={{width: "80%", padding: "unset"}}
                        renderInput={(params) => <TextField
                            {...params}
                            label="School"
                        />}
                    />
                </Stack>
                <Stack direction="column" margin="1rem" alignItems="start" spacing={1}>
                    <Typography variant="h3" textAlign="start">You live in..</Typography>
                    <StyledAutoComplete
                        disablePortal
                        inputValue={chosenNeighborhood}
                        onInputChange={(event, newInputValue) => {
                            setChosenNeighborhood(newInputValue);
                        }}
                        id="combo-box-demo"
                        options={NeighborhoodLst}
                        sx={{width: "80%", padding: "unset"}}
                        renderInput={(params) => <TextField
                            {...params}
                            label="Neighborhood"
                        />}
                    />
                </Stack>

                {/*<Stack direction="column" margin="1rem" alignItems="start" spacing={1}>*/}
                {/*    <Typography variant="h3" textAlign="start">Your personality type is..</Typography>*/}
                {/*    <Typography variant = "h4">A combination of:</Typography>*/}
                {/*    <List sx={{textAlign:"left"}}>*/}
                {/*        <ListItem sx={{textAlign:"left"}}>*/}
                {/*            <Typography variant = "h4"><strong>E</strong>xtrovert | <strong>I</strong>ntrovert</Typography>*/}
                {/*        </ListItem>*/}
                {/*        <ListItem sx={{textAlign:"left"}}>*/}
                {/*            <Typography variant = "h4"><strong>S</strong>ensing | I<strong>N</strong>tuition</Typography>*/}
                {/*        </ListItem>*/}
                {/*        <ListItem>*/}
                {/*            <Typography variant = "h4"><strong>T</strong>hinking | <strong>F</strong>eeling</Typography>*/}
                {/*        </ListItem>*/}
                {/*        <ListItem>*/}
                {/*            <Typography variant = "h4"><strong>J</strong>udging | <strong>P</strong>erceiving</Typography>*/}
                {/*        </ListItem>*/}
                {/*    </List>*/}
                {/*    <StyledAutoComplete*/}
                {/*        disablePortal*/}
                {/*        inputValue={chosenHobby}*/}
                {/*        onInputChange={(event, newInputValue) => {*/}
                {/*            setChosenHobby(newInputValue);*/}
                {/*        }}*/}
                {/*        id="combo-box-demo"*/}
                {/*        options={HobbyLst}*/}
                {/*        sx={{width: "80%", padding: "unset"}}*/}
                {/*        renderInput={(params) => <TextField*/}
                {/*            {...params}*/}
                {/*            label="Personality type"*/}
                {/*        />}*/}
                {/*    />*/}
                {/*</Stack>*/}
            </Stack>
            {/*<BottomBoxWithLogo>*/}
            {/*</BottomBoxWithLogo>*/}
            <Stack direction="column" spacing={2} justifyContent="flex-start"
                   alignItems="center">
                <Box sx={{
                    borderRadius: "15px",
                    backgroundColor: `${theme.palette.primary.main}`,
                    color: "white",
                    width: "100%",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                }}>
                    <Stack direction="row" spacing={1} justifyContent="center">
                        <StyledLightCircleBox>
                            <Typography variant="h5" color="black">
                                {chosenSchool === "" ? 'School' : chosenSchool}
                            </Typography>
                        </StyledLightCircleBox>
                        <StyledLightCircleBox>
                            <Typography variant="h5" color="black">
                                {chosenNeighborhood === "" ? 'Hood' : chosenNeighborhood}
                            </Typography>
                        </StyledLightCircleBox>
                        {/*<StyledLightCircleBox>*/}
                        {/*    <Typography variant="h5" color="black">*/}
                        {/*        {chosenHobby === "" ? 'Person' : chosenHobby}*/}
                        {/*    </Typography>*/}
                        {/*</StyledLightCircleBox>*/}
                    </Stack>
                </Box>
            </Stack>
            <Stack direction="column" justifyContent="flex-start"
                   alignItems="center"
                   padding="1rem"
                   spacing={1}>

                <Typography variant="h3" textlign="left ">
                    How do you look? upload profile photo!
                </Typography>
                <Stack direction="row" spacing={"1rem"} sx={{justifyContent: "start", alignItems: 'center'}}>
                    <Button variant={"contained"} component={"label"}>Choose File
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files[0])}/>
                    </Button>
                    {(picturePath === "") ? (<Box/>) :
                        (<Avatar src={picturePath} sx={{width: 100, height: 100}}/>)}
                </Stack>
            </Stack>
            <Button onClick={handleSubmit} sx={{
                borderRadius: "15px",
                backgroundColor: `${theme.palette.primary.main}`,
                color: "white",
                width: "fit-content",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
            }}>
                    < Typography variant="h3">
                        Submit Information
                    </Typography>
            </Button>
            {/*<Box sx={{position: 'relative'}}>*/}
            {/*    <br/>*/}
            {/*    <br/>*/}
            {/*</Box>*/}
        </Box>
    );
}