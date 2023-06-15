import * as React from 'react';
// import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// import BusinessTypesSelection from "../BusinessTypeSelect/BusinessTypeSelect.components";
// import BasicTextFields from "./TextField.components";
// import RowRadioButtonsGroup from "./RadioButton.component";
import {Stack} from "@mui/material";
import {useState} from "react";
// import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from "firebase/firestore";
// import {auth, db, storage} from "../../BackEnd/config/firebase";
// import {ref, uploadBytes} from "firebase/storage";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import ToggleButton from "@mui/material/ToggleButton";
import TextField from "@mui/material/TextField";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
import Button from "@mui/material/Button";

export default function SecondPageBusinessRegistration({onNext}) {

    const [insta, setInsta] = useState("");
    const [face, setFace] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [web, setWeb] = useState("");
    const handleOnNext = () => {
        onNext([insta, face, linkedin, web]);
    }
    return(
        <div>
            <Typography variant="h4">Socials (if exists..)</Typography>
            <Stack direction="row">
                <InstagramIcon sx={{fontSize: 56, alignSelf: "center"}}/>
                <TextField fieldname={'@example'} onChange={(e) => setInsta(e.target.value)}/>
            </Stack>
            <Stack direction="row">
                <FacebookIcon sx={{fontSize: 56, alignSelf: "center"}}/>
                <TextField fieldname={'facebook page'} onChange={(e) => setFace(e.target.value)}/>
            </Stack>
            <Stack direction="row">
                <LinkedInIcon sx={{fontSize: 56, alignSelf: "center"}}/>
                <TextField fieldname={'linkedin page'} onChange={(e) => setLinkedin(e.target.value)}/>
            </Stack>
            <Stack direction="row">
                <LanguageIcon sx={{fontSize: 56, alignSelf: "center"}}/>
                <TextField fieldname={'website URL'} onChange={(e) => setWeb(e.target.value)}/>
            </Stack>
            <Button onClick={handleOnNext}>
                {'Next'}
            </Button>
        </div>
    )
}