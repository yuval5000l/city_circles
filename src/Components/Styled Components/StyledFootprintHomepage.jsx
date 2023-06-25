import {Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import StyledAvatarWithBadge from "./StyledAvatarWithBadge";
import calculateTime from "../../BackEnd/Classes/GeneralFunctions";
import React from "react";
import {ReactComponent as FootprintsIcon} from "./Icons/footprints-svgrepo-com.svg";


export default function StyledFootprintHomepage({
                                                    businessPhoto,
                                                    userPhoto,
                                                    timestamp = "time",
                                                    BusinessName = "business name",
                                                    UserName = "user name"
                                                }) {
    return (
        <Box width="100%" maxWidth="-webkit-fill-available">
            <Stack width="100%" maxWidth="-webkit-fill-available" direction="row" justifyContent="flex-start"
                   spacing={2} padding="0.5rem" sx={{
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
                borderBottom: '0.3rem solid #C3ED5B'
            }}>
                <Box>
                    <StyledAvatarWithBadge bigPhoto={businessPhoto} smallPhoto={userPhoto}/>
                </Box>
                <Stack direction="column" justifyContent="flex-start" width="70%" alignItems="flex-start">
                    <Typography variant="h3" textAlign="left">
                        {UserName} went to {BusinessName}
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
    );
}
