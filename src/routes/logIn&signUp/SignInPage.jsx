// import {StyledLogoLogIn} from "../../Components/Styled Components/styledCityCircleLogoLogIn";
import {StyledButtonGray} from "../../Components/Styled Components/styledComponents";
import Box from "@mui/material/Box";
// import {StyledPurpleBox, StyledDialogTextFieldReview} from "../../Components/Styled Components/styledComponents";
import {Stack, Typography} from "@mui/material";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import React, {useState} from "react";
import {SignIn} from "../../BackEnd/Classes/UserClass";
import {signOut} from "firebase/auth";
import {auth} from "../../BackEnd/config/firebase";
// import {LogIn} from "../../BackEnd/Classes/UserClass";
import {TopBoxWithLogo} from "../../Components/Styled Components/StyledBoxWithLogo";
// import SignupPage from "../../routes/SignUpPage";


export default function UserRegistrationForm () {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();

        let check_sign_up = await SignIn({email}, {password});

        if (check_sign_up)
        {
            await window.location.replace('/SignUpPage');
        }
        else
        {
            console.log("ERROR");
        }
    };
    const logout = async() =>{
        try
        {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <>
            <TopBoxWithLogo/>
            {/*<StyledPurpleBox sx={{alignItems: "center", position: 'relative'}}>*/}
            {/*    <StyledLogoLogIn sx={{alignSelf: "center"}}/>*/}
            {/*</StyledPurpleBox>*/}
            <Box sx={{justifySelf: "center"}}>
                <Typography variant="h2" marginTop={4}>
                    Sign-Up
                </Typography>
                <Stack direction="column" spacing={5} marginBottom={4} marginTop={4}>
                    <Stack direction="column" spacing={1}>
                        <Typography variant="h4">
                            Email
                        </Typography>
                        <TextField
                            type={"email"}
                            sx={{width:' 50%', alignSelf: "center"}}
                            id="input-with-icon-textfield"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            // label="TextField"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonRoundedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                        />
                    </Stack>
                    <Stack direction="column" spacing={1}>
                        <Typography variant="h4">
                            Password
                        </Typography>
                        <TextField
                            type={"password"}
                            sx={{width:' 50%', alignSelf: "center"}}
                            id="input-with-icon-textfield"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            // label="TextField"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HttpsOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                        />
                    </Stack>
                </Stack>
                <Stack direction="row" justifyContent="center" spacing={3} marginTop={5}>
                    <StyledButtonGray onClick={handleSignUp}>
                        Register
                    </StyledButtonGray>
                    {/*<StyledButtonGray onClick={LogIn(email, password)}>Log In</StyledButtonGray>*/}
                </Stack>
            </Box>
        </>
    )

}