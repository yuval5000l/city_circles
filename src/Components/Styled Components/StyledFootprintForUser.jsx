import {Stack, Typography} from "@mui/material";
import StyledAvatarWithBadge from "./StyledAvatarWithBadge";
import {StyledInfoBox, StyledRating} from "./styledComponents";
import React from "react";
import StyledGrayButtonFullReview from "./StyledGrayButtonFullReview";
import calculateTime from "../../BackEnd/Classes/GeneralFunctions";

export default function StyledFootprintForUser() {
    return (
        <box >
            <Stack direction="row" justifyContent="flex-start" spacing={2} padding="0.5rem" sx={{padding:"0.4rem", boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', borderBottom: '0.1rem solid #C3ED5B'}}>
                <box>
                    <StyledAvatarWithBadge/>
                </box>
                <Stack direction="column" justifyContent="flex-start">
                    <Typography variant="h3">
                        Business name
                    </Typography>
                    <Typography variant="h5" textAlign="left">
                        22h
                    </Typography>
                </Stack>

            </Stack>
        </box>
    )
        ;
}