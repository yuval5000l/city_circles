import {useLocation} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {getBusinessByName} from "../../BackEnd/Classes/BusinessClass";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../BackEnd/config/firebase";
import theme from "../../Theme/Theme";
import {Box, Avatar, Grid, Stack, Typography} from "@mui/material";
import StyledHamburgerButtonWithCanvas from "../../Components/Styled Components/StyledHamburgerButtonWithCanvas";
import calculateTime from "../../BackEnd/Classes/GeneralFunctions";
import logoNew from "../../Components/Styled Components/Icons/logo-all-white.png";
import StyledLogo from "../../Components/Styled Components/StyledLogo";
import {StyledRating, StyledTypeBox} from "../../Components/Styled Components/styledComponents";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StyledTimeTable from "./StyledTimeTable";
import StyledSocialIcons from "./StyledSocialIcons";
import StyledBusinessTabs from "./StyledBusinessTabs";

function showTime(arr_time) {
    let times = [];
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            times.push((arr_time[1][i][j] < 10) ? "0" + arr_time[1][i][j].toString() : arr_time[1][i][j].toString());
        }
    }

    return (
        <li key={arr_time[0]}>
            <strong>{arr_time[0]}:</strong> {times[2]}: {times[3]}, {times[0]}: {times[1]}
        </li>
    );
}

export function showBusiness(business) {
    console.log(business);
    return (
        <Box>
            {/*Top Rectangle*/}
            <Box sx={{
                backgroundColor: theme.palette.primary.dark,
                borderBottom: `0.5rem solid ${theme.palette.secondary.main}`,
                display: 'flex',
            }}>
                <Stack direction="column" sx={{marginTop: "5.5rem"}} width="100%" padding="1.5rem" color="white"
                       spacing={2}>
                    <Stack direction="row" spacing={2} justifyContent="space-between">
                        <Stack direction="column" color="white" spacing={2} alignItems="flex-start">
                            <Typography variant="h2">
                                {business.name}
                            </Typography>
                            <Stack direction="row" spacing={1}>
                                {business.type.map((category) => <StyledTypeBox
                                    key={category}>{category}</StyledTypeBox>)}
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography>{business.getRating()}</Typography>
                                <StyledRating value={business.getRating()}/>
                                <Typography>({business.rating[1]})</Typography>
                            </Stack>
                        </Stack>
                        <Box>
                            {
                                (business.profile_pic === "") ?
                                    (<Avatar sx = {{width: "6.25rem", height:"auto"}} alt={business.name}/>)
                                    :
                                    (<Avatar sx = {{width: "6.25rem", height:"auto"}} alt={business.name}
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
                    <Stack direction="row" spacing={1} alignItems="flex-start" >
                        <AccessTimeIcon />
                        <StyledTimeTable business={business}/>
                    </Stack>
                    <Stack direction="row">
                        <Typography variant = "h4">
                            Contact: {
                            business.contact.filter(contact => contact !== "").map((filteredContact) =>
                            <StyledTypeBox key={filteredContact + "S"}>{filteredContact}</StyledTypeBox>
                        )}
                        </Typography>
                        <StyledSocialIcons/>
                    </Stack>
                </Stack>
            </Box>
            {/*Lower Part*/}
            <StyledBusinessTabs business ={business}/>
            {/*<ul>*/}
            {/*    FootPrints:*/}
            {/*    {business.footprints.map((footprint) =>*/}
            {/*        <li key={footprint.id + 1}>*/}
            {/*            footprint id: {footprint.userID}*/}
            {/*            /!*footprint time: {footprint.timestamp}*!/*/}
            {/*            footprint time: {calculateTime(footprint.timestamp.toDate())}*/}
            {/*        </li>*/}
            {/*    )}*/}
            {/*</ul>*/}

            {/*<ul>*/}
            {/*    Reviews:*/}
            {/*    {business.reviews.map((review) =>*/}
            {/*        <li key={review.userID}>*/}
            {/*            userID: {review.userID},*/}
            {/*            content: {review.content},*/}
            {/*            rating: {review.rating},*/}
            {/*            footprint time: {calculateTime(review.timestamp.toDate())}*/}
            {/*        </li>*/}
            {/*    )}*/}

            {/*</ul>*/}
        </Box>
    );
}

export default function BusinessPage() {

    const location = useLocation()
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

    }, []);

    return (
        <div>
            <Box
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    position: "fixed",
                    width: "100%",
                    height: "5.5rem",
                    zIndex:"999",
                }}>
                <Stack direction="row" justifyContent="space-between" spacing={2} alignItems="center"
                       width="100%">
                    <StyledHamburgerButtonWithCanvas/>
                    <StyledLogo/>
                </Stack>
            </Box>
            {(business === "") ?
                (<div> Can't find business! </div>) :
                (<div> {showBusiness(business)} </div>)}
        </div>);
}