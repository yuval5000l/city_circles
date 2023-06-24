import {useLocation} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {getBusinessByName} from "../../BackEnd/Classes/BusinessClass";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../BackEnd/config/firebase";
import theme from "../../Theme/Theme";
import {Box, Avatar, Grid, Stack, Typography} from "@mui/material";
import {StyledRating, StyledTypeBox} from "../../Components/Styled Components/styledComponents";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StyledTimeTable from "./StyledTimeTable";
import StyledBusinessTabs from "./StyledBusinessTabs";
import Link from '@mui/material/Link';


export function showBusiness(business) {
    return (
        <Box>
            {/*Top Rectangle*/}
            <Box sx={{
                backgroundColor: theme.palette.primary.dark,
                borderBottom: `0.5rem solid ${theme.palette.secondary.main}`,
                display: 'flex',
            }}>
                <Stack direction="column"
                    // sx={{marginTop: "5.5rem"}}
                       width="100%" padding="1.5rem" color="white"
                       spacing={2}>
                    <Stack direction="row" spacing={1} justifyContent="space-between">
                        <Stack direction="column" color="white" spacing={2} alignItems="flex-start" maxWidth="15rem">
                            <Typography variant="h2">
                                {business.name}
                            </Typography>
                            <Grid container direction="column"
                                  justifyContent="flex-start"
                                  alignItems="flex-start"
                                  spacing={3}>
                                {business.type.map((category) =>
                                    <StyledTypeBox marginTop="1rem"
                                                   key={category}>{category}</StyledTypeBox>)}
                            </Grid>
                            <Stack direction="row" spacing={1}>
                                <Typography>{business.getRating().toFixed(2)}</Typography>
                                <StyledRating value={business.getRating()}/>
                                <Typography>({business.rating[1]})</Typography>
                            </Stack>
                        </Stack>
                        <Box>
                            {
                                (business.profile_pic === "") ?
                                    (<Avatar sx={{width: "6.25rem", height: "6.25rem"}} alt={business.name}/>)
                                    :
                                    (<Avatar sx={{width: "6.25rem", height: "6.25rem"}} alt={business.name}
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
                    <Stack direction="row" spacing={1} alignItems="flex-start">
                        <AccessTimeIcon/>
                        <StyledTimeTable business={business}/>
                    </Stack>
                    <Stack direction="row">
                        <Typography variant="h4">
                            Contact: {
                            Object.entries(business.getContacts()).filter(contact => contact[1] !== "").map((filteredContact) =>
                                <Box key={filteredContact[1] + "S"}>
                                    <Link sx={{color:`${theme.palette.secondary.dark}`, backgroundColor:`${theme.palette.primary.light}`,borderRadius:"15px", paddingLeft:"0.2rem",paddingRight:"0.2rem",border:"0.1rem solid black" }} href={`http://${filteredContact[1]}`} target={"_blank"} rel="noopener">
                                        {filteredContact[0]}
                                    </Link>
                                </Box>
                            )}
                        </Typography>
                        {/*<StyledSocialIcon/>*/}
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
        <div>
            {(business === "") ?
                (<div> Can't find business! </div>) :
                (<div> {showBusiness(business)} </div>)}
        </div>);
}