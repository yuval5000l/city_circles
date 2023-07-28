import {SignIn} from "../../BackEnd/Classes/UserClass";
import {StyledButtonGray} from "../../Components/Styled Components/styledComponents";
import React, {useState} from "react";
import {Stack, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import Box from "@mui/material/Box";
import {TopBoxWithLogo} from "../../Components/Styled Components/StyledBoxWithLogo";

export default function CreateUser() {
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
    }
    return (
        <>
            <TopBoxWithLogo/>
            <Box sx={{justifySelf: "center"}} marginTop="5rem">
                <Typography variant="h1" marginTop={4}>
                    Sign Up
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
                <StyledButtonGray onClick={handleSignUp}>
                    Register
                </StyledButtonGray>
                {errorMessage && <div className="error">{errorMessage}</div>}
            </Box>
        </>);
}