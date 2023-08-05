import {StyledButtonGray} from "../../Components/Styled Components/styledComponents";
import Box from "@mui/material/Box";
import {Stack, Typography} from "@mui/material";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import React, {useState} from "react";
import {LogIn} from "../../BackEnd/Classes/UserClass";
import {TopBoxWithLogo} from "../../Components/Styled Components/StyledBoxWithLogo";
import {Link} from "react-router-dom";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import {auth, db, googleProvider} from "../../BackEnd/config/firebase";
import {signInWithPopup} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";

export default function UserRegistrationForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false)

    const handleGoogleSignUp = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // Handle successful sign-up here if needed
                // Adds a user with the same uid
                const data = {
                    name: "",
                    email: result.user.email,
                    password: "",
                    userID: result.user.uid,
                    reviews: [],
                    footprints: [],
                    circles: [],
                    // birthday: null
                    profile_pic: "",
                    friends: [],
                }
                console.log(data);
                setDoc(doc(db, "Users", result.user.uid), data).then(() => window.location.replace('/SignUpPage'));

            })
            .catch((error) => {
                // Handle errors here if needed
                console.error(error);
            });
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
                            setOpenAlert(true);
                            break;
                        case 'auth/user-disabled':
                            setErrorMessage('The user account has been disabled.');
                            setOpenAlert(true);
                            break;
                        case 'auth/user-not-found':
                            setErrorMessage('There is no user corresponding to the given email.');
                            setOpenAlert(true);
                            break;
                        case 'auth/wrong-password':
                            setErrorMessage('The password is incorrect.');
                            setOpenAlert(true);
                            break;
                        case 'auth/missing-password':
                            setErrorMessage('Please enter a password');
                            setOpenAlert(true);
                            break;
                        default:
                            setErrorMessage('An error occurred while signing in.');
                            setOpenAlert(true);
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

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    }


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
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} marginY={5}>
                    {errorMessage &&
                        // <div className="error">{errorMessage}</div>
                        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}
                                  sx={{position: "relative", display: "flex", width: '95%', justifyContent: "center"}}>
                            <Alert onClose={handleCloseAlert} severity="warning"
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
                                   sx={{mb: 1}}
                            >
                                {errorMessage}
                            </Alert>
                        </Snackbar>
                    }
                    <StyledButtonGray onClick={handleLogIn} sx={{width: "60%"}}>Log In</StyledButtonGray>
                    <Typography variant="h5">
                        Not Registered? you can register here
                    </Typography>
                    <Link to={"../SignUpPageHelper"} style={{textDecoration: "none"}}>
                        <StyledButtonGray>
                            Register now >>
                        </StyledButtonGray>
                    </Link>
                    {/*<StyledButtonGray onClick={handleSignUp} >*/}
                    {/*    Register*/}
                    {/*</StyledButtonGray>*/}
                    <StyledButtonGray onClick={handleGoogleSignUp}>Sign Up with Google</StyledButtonGray>
                </Stack>
            </Box>

        </>
    )

}