import {Stack, Typography} from "@mui/material";
import StyledAvatarWithBadge from "./StyledAvatarWithBadge";
import React from "react";
import calculateTime from "../../BackEnd/Classes/GeneralFunctions";
import {ReactComponent as FootprintsIcon} from "./Icons/footprints-svgrepo-com.svg";
import theme from "../../Theme/Theme";
import Box from "@mui/material/Box";

export default function StyledFootprintForUser({businessPhoto, userPhoto, timestamp = "time", BigName = "name"}) {
    return (
        <Box width="100%" maxWidth="-webkit-fill-available">
            <Stack width="100%" maxWidth="-webkit-fill-available" direction="row" justifyContent="flex-start"
                   spacing={2} padding="1rem" sx={{
                backgroundColor: `${theme.palette.primary.main}`,
                borderTop: "0.2rem solid #E9E8E8",
            }}>
                <Box>
                    <StyledAvatarWithBadge bigPhoto={userPhoto} smallPhoto={businessPhoto}/>
                </Box>
                <Stack color="white" direction="column" justifyContent="flex-start" width="70%" alignItems="flex-start">
                    <Typography variant="h3" textAlign="left" width="fit-content">
                        {BigName}
                    </Typography>
                    <Typography variant="h4" textAlign="left">
                        {calculateTime(timestamp)}
                    </Typography>
                </Stack>
                <Box width="100%" textAlign="right">
                    <FootprintsIcon width="3.5rem" height="3.5rem" float="right" right="0px !important"/>
                </Box>
            </Stack>
        </Box>
    )
        ;
}