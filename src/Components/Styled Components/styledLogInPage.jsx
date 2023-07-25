import {StyledLogoLogIn} from "./styledCityCircleLogoLogIn";
import {StyledButtonGray} from "./styledComponents";
import {StyledPurpleBox} from "./styledComponents";
import {Stack, Typography} from "@mui/material";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import React, {useState} from "react";
import User from "../Classes/UserClass";
import {signOut} from "firebase/auth";
import {auth} from "../config/firebase";
import {LogIn} from "../Components/Auth/auth";


export default function UserRegistrationForm () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault();
        const user = new User("", email, password);
        // noinspection JSIgnoredPromiseFromCall
        user.signIn();
        window.location.replace('/SignupPage');
    };
    // const logout = async() =>{
    //     try
    //     {
    //         await signOut(auth);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    return(
        <>
            <StyledPurpleBox sx={{alignItems: "center", position: 'relative'}}>
                <StyledLogoLogIn sx={{alignSelf: "center"}}/>
            </StyledPurpleBox>
            <Typography variant="h2" marginTop={4   }>
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
            <Stack direction="row" justifyContent="center" spacing={3} marginTop={5 }>
                <StyledButtonGray onClick={handleSignUp}>
                        Register
                </StyledButtonGray>
                <StyledButtonGray onClick={LogIn(email, password)}>Log In</StyledButtonGray>
            </Stack>

        </>
    )

}