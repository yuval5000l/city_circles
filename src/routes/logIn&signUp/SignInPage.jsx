import {StyledButtonGray} from "../../Components/Styled Components/styledComponents";
import Box from "@mui/material/Box";
import {Stack, Typography} from "@mui/material";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import React, {useState} from "react";
import {SignIn} from "../../BackEnd/Classes/UserClass";
import {LogIn} from "../../BackEnd/Classes/UserClass";
import {TopBoxWithLogo} from "../../Components/Styled Components/StyledBoxWithLogo";


export default function UserRegistrationForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        SignIn({email}, {password})
            .then(() => window.location.replace('/SignUpPage'))
            .catch((e) => {
                    // console.log(e);
                    switch (e) {
                        case 'auth/email-already-in-use':
                            setErrorMessage('This email is already in use by another account.');
                            break;
                        case 'auth/invalid-email':
                            setErrorMessage('The email address is not valid.');
                            break;
                        case 'auth/weak-password':
                            setErrorMessage('The password is too weak.');
                            break;
                        case 'auth/missing-password':
                            setErrorMessage('Please enter a password');
                            break;
                        default:
                            setErrorMessage('An error occurred while creating the user.');
                    }
                }
            );


        // if (check_sign_up)
        // {
        //     await window.location.replace('/SignUpPage');
        // }
        // else
        // {
        //     console.log("ERROR");
        // }
    };

    const handleLogIn = async (e) => {
        e.preventDefault();

        LogIn({email}, {password})
            .then(() => window.location.replace('/'))
            .catch((e) => {
                    // console.log(e);
                    switch (e) {
                        case 'auth/invalid-email':
                            setErrorMessage('The email address is not valid.');
                            break;
                        case 'auth/user-disabled':
                            setErrorMessage('The user account has been disabled.');
                            break;
                        case 'auth/user-not-found':
                            setErrorMessage('There is no user corresponding to the given email.');
                            break;
                        case 'auth/wrong-password':
                            setErrorMessage('The password is incorrect.');
                            break;
                        case 'auth/missing-password':
                            setErrorMessage('Please enter a password');
                            break;
                        default:
                            setErrorMessage('An error occurred while signing in.');
                    }
                }
            );

        // if (check_log_in) {
        //     await window.location.replace('/');
        // } else {
        //     console.log("ERROR");
        // }

    }
    // const logout = async() =>{
    //     try
    //     {
    //         await signOut(auth);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    return (
        <>
            <TopBoxWithLogo/>
            {/*<StyledPurpleBox sx={{alignItems: "center", position: 'relative'}}>*/}
            {/*    <StyledLogoLogIn sx={{alignSelf: "center"}}/>*/}
            {/*</StyledPurpleBox>*/}
            <Box sx={{justifySelf: "center"}} marginTop="5rem">
                <Typography variant="h1" marginTop={4}>
                    Sign In
                </Typography>
                <Stack direction="column" spacing={5} marginBottom={4} marginTop={4}>
                    <Stack direction="column" spacing={1}>
                        <Typography variant="h3">
                            Email
                        </Typography>
                        <TextField
                            type={"email"}
                            sx={{width: ' 50%', alignSelf: "center"}}
                            id="input-with-icon-textfield-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment fontSize="3rem !important" position="start">
                                        <PersonRoundedIcon fontSize="large"/>
                                    </InputAdornment>
                                ),
                            }}
                            variant="standard"
                        />
                    </Stack>
                    <Stack direction="column" spacing={1}>
                        <Typography variant="h3">
                            Password
                        </Typography>
                        <TextField
                            key={"PassWord1"}
                            type={"password"}
                            sx={{width: ' 50%', alignSelf: "center"}}
                            id="input-with-icon-textfield-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <HttpsOutlinedIcon fontSize="large"/>
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
                    <StyledButtonGray onClick={handleLogIn}>Log In</StyledButtonGray>
                </Stack>
            </Box>
            {errorMessage && <div className="error">{errorMessage}</div>}
        </>
    )

}