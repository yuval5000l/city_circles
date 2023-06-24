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
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LanguageIcon from '@mui/icons-material/Language';
import Button from "@mui/material/Button";

export default function SecondPageBusinessRegistration({onNext}) {

    const [insta, setInsta] = useState("");
    const [face, setFace] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [whatsAppLink, setWhatsAppLink] = useState("")
    const [web, setWeb] = useState("");
    const [socialEmpty, setSocialEmpty] = useState(true)

    function IsSocialEmpty(){
        if(insta !== "" || face !== "" || phoneNum !== "" || web !== "") {
            setSocialEmpty(false)
        } else {
            setSocialEmpty(true)
        }
    }

    const crateWhatsappLink = () => {
        // TODO: decide which link format is better
        // creating link to web:
        setWhatsAppLink("https://web.whatsapp.com/send?phone="+phoneNum)
    //     creting link to mobile:
    //     setWhatsAppLink("https://https://wa.me/"+phoneNum)
    }

    const handleOnNext = () => {

        onNext({Facebook: face, Instagram: insta, Phone: phoneNum, Website: web, Whatsapp: whatsAppLink});
    }
    return(
        <div>
            <Typography variant="h4">Socials (if exists..)</Typography>
            <Stack direction="row">
                <InstagramIcon sx={{fontSize: 56, alignSelf: "center"}}/>
                <TextField label={'@example'} fieldname={'@example'}
                           onChange={(e) => {
                               setInsta(e.target.value)
                               IsSocialEmpty()
                           }
                }/>
            </Stack>
            <Stack direction="row">
                <FacebookIcon sx={{fontSize: 56, alignSelf: "center"}}/>
                <TextField label={'facebook page'} fieldname={'facebook page'}
                           onChange={(e) => {
                               setFace(e.target.value)
                               IsSocialEmpty()
                           }
                }/>
            </Stack>
            <Stack direction="row">
                <WhatsAppIcon sx={{fontSize: 56, alignSelf: "center"}}/>
                <TextField label={'phone num (WhatsApp link)'} fieldname={'phone number to create WhatsApp link'}
                           onChange={(e) => {
                               setPhoneNum(e.target.value)
                               crateWhatsappLink()
                               IsSocialEmpty()
                               console.log(whatsAppLink)
                           }
                }/>
            </Stack>
            <Stack direction="row">
                <LanguageIcon sx={{fontSize: 56, alignSelf: "center"}}/>
                <TextField label={'website URL'} fieldname={'website URL'}
                           onChange={(e) => {
                               setWeb(e.target.value)
                               IsSocialEmpty()
                           }
                }/>
            </Stack>
            <Button disabled={socialEmpty} onClick={handleOnNext}>
                {'Next'}
            </Button>
        </div>
    )
}