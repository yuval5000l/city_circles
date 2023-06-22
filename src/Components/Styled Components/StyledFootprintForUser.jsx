import {Stack, Typography} from "@mui/material";
import StyledAvatarWithBadge from "./StyledAvatarWithBadge";
import {StyledInfoBox, StyledRating} from "./styledComponents";
import React from "react";
import StyledGrayButtonFullReview from "./StyledGrayButtonFullReview";
import calculateTime from "../../BackEnd/Classes/GeneralFunctions";

export default function StyledFootprintForUser({businessPhoto, userPhoto,timestamp="time", BigName="name", key=""}) {
    console.log(businessPhoto);
    return (
        <box width="100%">
            <Stack direction="row" justifyContent="flex-start" spacing={2} padding="0.5rem" sx={{padding:"0.4rem", boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', borderBottom: '0.1rem solid #C3ED5B'}}>
                <box>
                    <StyledAvatarWithBadge bigPhoto={userPhoto} smallPhoto={businessPhoto}/>
                </box>
                <Stack direction="column" justifyContent="flex-start">
                    <Typography variant="h3">
                        {BigName}
                    </Typography>
                    <Typography variant="h5" textAlign="left">
                        {calculateTime(timestamp)}
                    </Typography>
                </Stack>

            </Stack>
        </box>
    )
        ;
}