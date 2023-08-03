import * as React from 'react';
import Typography from '@mui/material/Typography';
import {MenuItem, Select, Stack} from "@mui/material";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LanguageIcon from '@mui/icons-material/Language';
import Button from "@mui/material/Button";
// import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'


export default function SecondPageBusinessRegistration({onNext, onBack, data}) {

    const [insta, setInsta] = useState((data===null)? ("") : (data["Instagram"]));
    const [face, setFace] = useState((data===null)? ("") : (data["Facebook"]));
    const [phoneNum, setPhoneNum] = useState((data===null)? ("") : (data["Phone"]));
    const [whatsAppLink, setWhatsAppLink] = useState((data===null)? ("") : (data["Whatsapp"]));
    const [web, setWeb] = useState((data===null)? ("") : (data["Website"]));
    const [socialEmpty, setSocialEmpty] = useState(true);
    const [contryCode, setContryCode] = useState(null);
    const [companyCode, setCompanyCode] = useState(null);
    // const [value, setValue] = useState();
    // const [openAlert, setOpenAlert] = useState(false)
    // console.log(data);
    function IsSocialEmpty() {
        if (insta !== "" || face !== "" || phoneNum !== "" || web !== "") {
            setSocialEmpty(false)
        } else {
            setSocialEmpty(true)
        }
    }

    const crateWhatsappLink = (num) => {
        // if (country === null || )
        // TODO: decide which link format is better
        // creating link to web:
        setWhatsAppLink("https://web.whatsapp.com/send?phone=" + num)
        //     creating link to mobile:
        //     setWhatsAppLink("https://wa.me/"+phoneNum)
    }

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setOpenAlert(false);
    // }

    const handleOnNext = () => {

        onNext({Facebook: face, Instagram: insta, Phone: phoneNum, Website: web, Whatsapp: whatsAppLink});
    }
    const handleOnBack = () => {
        onBack({Facebook: face, Instagram: insta, Phone: phoneNum, Website: web, Whatsapp: whatsAppLink});
    }
    return (
        <div>
            <Stack direction="column" justifyContent="flex-start" spacing={2} textAlign="left" padding="1rem">
                <Typography variant="h2">Socials (if exists..)</Typography>
                <Stack direction="row">
                    <InstagramIcon sx={{fontSize: 56, alignSelf: "center"}}/>
                    <TextField label={'@example'} fieldname={'@example'} value={insta}
                               onChange={(e) => {
                                   setInsta(e.target.value)
                                   IsSocialEmpty()
                               }
                               }/>
                </Stack>
                <Stack direction="row">
                    <FacebookIcon sx={{fontSize: 56, alignSelf: "center"}}/>
                    <TextField label={'facebook page'} fieldname={'facebook page'} value={face}
                               onChange={(e) => {
                                   setFace(e.target.value)
                                   IsSocialEmpty()
                               }
                               }/>
                </Stack>
                <Stack direction="row">
                    <WhatsAppIcon sx={{fontSize: 56, alignSelf: "center"}}/>
                    <Stack direction="row">
                        {/*<PhoneInput*/}
                        {/*    placeholder="Enter phone number"*/}
                        {/*    value={value}*/}
                        {/*    onChange={setValue}/>*/}
                        <Select

                            value={contryCode}
                            onChange={(e) => {
                                setContryCode(e.target.value)
                                // console.log(e.target.value)
                            }}
                            autoWidth
                            label="contry code"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'+972'}>IL (+972)</MenuItem>
                            <MenuItem value={'+1'}>US (+1)</MenuItem>
                        </Select>
                        <Select
                            value={companyCode}
                            onChange={(e) => {
                                setCompanyCode(e.target.value)
                                // console.log(e.target.value)
                            }}
                            autoWidth
                            label="Company Code"
                        >

                            <MenuItem value={'50'}>050</MenuItem>
                            <MenuItem value={'51'}>051</MenuItem>
                            <MenuItem value={'52'}>052</MenuItem>
                            <MenuItem value={'53'}>053</MenuItem>
                            <MenuItem value={'54'}>054</MenuItem>
                            <MenuItem value={'55'}>055</MenuItem>
                            <MenuItem value={'56'}>056</MenuItem>
                            <MenuItem value={'58'}>058</MenuItem>
                            <MenuItem value={'59'}>059</MenuItem>
                        </Select>
                        <TextField type={"number"} label={'phone num (WhatsApp link)'}
                                   fieldname={'phone number to create WhatsApp link'}
                                   onChange={(e) => {
                                       setPhoneNum(contryCode + companyCode + e.target.value)
                                       if (contryCode !== null && companyCode !== null) {
                                           crateWhatsappLink(contryCode + companyCode + e.target.value)
                                           IsSocialEmpty()
                                       }

                                       // console.log(contryCode + companyCode + e.target.value)
                                       // console.log(whatsAppLink)
                                   }
                                   }/>
                    </Stack>

                </Stack>
                <Stack direction="row">
                    <LanguageIcon sx={{fontSize: 56, alignSelf: "center"}}/>
                    <TextField label={'website URL'} fieldname={'website URL'} value={web}
                               onChange={(e) => {
                                   setWeb(e.target.value)
                                   IsSocialEmpty()
                               }
                               }/>
                </Stack>
            </Stack>
            <Button
                color="inherit"
                onClick={handleOnBack}
                sx={{mr: 1}}
            >
                <Typography variant="h3">
                    Back
                </Typography>

            </Button>
            <Button disabled={socialEmpty} onClick={handleOnNext}>
                <Typography variant="h3">
                    {'Next'}
                </Typography>
            </Button>

        </div>
    )
}