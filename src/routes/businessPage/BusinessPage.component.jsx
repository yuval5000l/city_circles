import {useLocation} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {getBusinessByName} from "../../BackEnd/Classes/BusinessClass";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../BackEnd/config/firebase";
import theme from "../../Theme/Theme";
import {Box, Avatar, Stack, Typography} from "@mui/material";
import {StyledRating, StyledTypeBox} from "../../Components/Styled Components/styledComponents";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StyledTimeTable from "./StyledTimeTable";
import StyledBusinessTabs from "./StyledBusinessTabs";
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LanguageIcon from '@mui/icons-material/Language';
import {isMobile} from 'react-device-detect';

import StyledGif from "../../Components/Styled Components/StyledGif";

export function showBusiness(business) {
    let Contacts = {};
    const Icons =
        {
            "Whatsapp": <WhatsAppIcon sx={{fontSize: "2rem"}}/>,
            "Facebook": <FacebookIcon sx={{fontSize: "2rem"}}/>,
            "Website": <LanguageIcon sx={{fontSize: "2rem"}}/>,
            "Instagram": <InstagramIcon sx={{fontSize: "2rem"}}/>
        };
    for (const [key, value] of Object.entries(business.getContacts())) {
        if (value !== "" && key !== "Whatsapp") {
            if (key === "Phone") {
                if(isMobile) {
                    Contacts['Whatsapp'] = "https://https://wa.me/" + value;
                }
                Contacts['Whatsapp'] = "https://web.whatsapp.com/send?phone=" + value;
            }
            if (value !== "" && key !== "Phone"){
                Contacts[key] = value;
            }
        }
    }

    return (
        <Box>
            {/*Top Rectangle*/}
            <Box sx={{
                backgroundColor: theme.palette.primary.dark,
                borderBottom: `0.5rem solid ${theme.palette.secondary.main}`,
                display: 'flex',
                padding: "1rem",
            }}>
                <Stack direction="column"
                    // sx={{marginTop: "5.5rem"}}
                       width="100%" color="white"
                       spacing={2}>
                    <Stack direction="row" spacing={1} justifyContent="space-between">
                        <Stack direction="column" color="white" spacing={2} alignItems="flex-start" maxWidth="15rem">
                            <Typography variant="h2" textAlign="left">
                                {business.name}
                            </Typography>
                            <Stack direction="row" sx={{display: "flex", flexWrap: "wrap", margin: "auto", justifyContent: "space-between"}}
                                  // justifyContent="flex-start"
                                  // alignItems="flex-start"

                                 >
                                {business.type.map((category) =>
                                    <StyledTypeBox
                                        marginTop="0.5rem"
                                                   key={category}>{category}</StyledTypeBox>)}
                            </Stack>
                            {/*<Container container direction="column"*/}
                            {/*           justifyContent="flex-start"*/}
                            {/*           alignItems="flex-start"*/}
                            {/*           display={"flex"}*/}
                            {/*           flexWrap={"wrap"}*/}
                            {/*           spacing={3}>*/}
                            {/*    {business.type.map((category) =>*/}
                            {/*        <StyledTypeBox marginTop="1rem"*/}
                            {/*                       key={category}>{category}</StyledTypeBox>)}*/}
                            {/*</Container>*/}
                            <Stack direction="row" spacing={1}>
                                <Typography>
                                    {(business.getRating() !== 0) ?
                                    (business.getRating().toFixed(2)) : (business.getRating())}
                                </Typography>
                                <StyledRating value={business.getRating()}/>
                                <Typography>({business.rating[1]})</Typography>
                            </Stack>
                        </Stack>
                        <Box>
                            {
                                (business.profile_pic === "") ?
                                    (<Avatar sx={{width: "6.25rem", height: "6.25rem"}} alt={business.name}/>)
                                    :
                                    (<Avatar variant={"circular"} sx={{width: "6.25rem", height: "6.25rem", margin: "auto" }} alt={business.name}
                                             src={business.profilePic}/>)
                            }
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="flex-start">
                        <FmdGoodIcon/>
                        <Typography variant="h4" sx={{textAlign: "left"}}>
                            {business.address}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <AccessTimeIcon/>
                        <StyledTimeTable business={business}/>
                    </Stack>
                    <Stack direction="row">

                        <Stack direction="row" justifyContent="center" spacing={1} alignItems="center">
                            <Typography variant="h4">
                                Contact:
                            </Typography>
                            {
                                Object.entries(Contacts).map((filteredContact) =>
                                    <Box width="fit-content" key={filteredContact[0] + "S"}>
                                        <Link sx={{
                                            color: "white",

                                            // color: `${theme.palette.primary.main}`,
                                            // backgroundColor: `${theme.palette.primary.light}`,
                                            borderRadius: "50%",

                                            // border: "0.1rem solid black",
                                            // border: "0.2rem solid white",
                                            display: "inline-flex",
                                            margin: "auto",
                                            padding: "0.4rem",
                                            width: "fit-content",
                                            // boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                                        }} href={`${filteredContact[1]}`} target={"_blank"} rel="noopener">
                                            {Icons[filteredContact[0]]}
                                        </Link>
                                    </Box>
                                )}
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
            {/*Lower Part*/}
            <StyledBusinessTabs business={business}/>
        </Box>
    );
}

export default function BusinessPage() {

    const location = useLocation();
    const check_null = location.state === null;
    let {from} = (check_null === true) ? null : location.state;
    let [business, setBusiness] = useState("");
    useEffect(() => {
        if (check_null !== true) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    getBusinessByName(from).then((business_) => {
                        setBusiness(business_)
                    }).catch((error) => {
                        console.error(error);
                    });
                }
            });
        }

    }, [check_null, from]);

    return (
        <>
            {(business === "") ?
                (<StyledGif></StyledGif>) :
                (<> {showBusiness(business)} </>)}
        </>);
}