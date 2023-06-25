import {Stack, Typography} from "@mui/material";
import {timestamp} from "../../BackEnd/config/firebase";
import Box from "@mui/material/Box";
import StyledAvatarWithBadge from "./StyledAvatarWithBadge";
import calculateTime from "../../BackEnd/Classes/GeneralFunctions";
import React from "react";
import {ReactComponent as FootprintsIcon} from "./Icons/footprints-svgrepo-com.svg";
import theme from "../../Theme/Theme";

export default function StyledFootprintHomepage({
                                                    businessPhoto,
                                                    userPhoto,
                                                    timestamp = timestamp.now(),
                                                    BusinessName = "business name",
                                                    UserName = "user name"
                                                }) {
    return (
        <Box width="100%" maxWidth="-webkit-fill-available" >
            <Stack width="100%" maxWidth="-webkit-fill-available" direction="row" justifyContent="space-between"
                   spacing={2} padding="0.5rem" sx={{
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
                borderTop: '0.1rem solid #C3ED5B',
                flexWrap:"wrap",
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center',justifyContent:"space-between"}}>
                <Box sx={{marginRight: '1rem'}}>
                    <StyledAvatarWithBadge bigPhoto={businessPhoto} smallPhoto={userPhoto}/>
                </Box>
                <Stack direction="column" justifyContent="flex-start"
                       alignItems="flex-start" minWidth='fit-content'
                >
                    <Typography variant="h3" textAlign="left">
                        {UserName}
                    </Typography>
                    <Typography variant="h4" textAlign="left">
                        went to
                    </Typography>
                    <Typography variant="h3" textAlign="left">
                        {BusinessName}
                    </Typography>
                    <Typography variant="h4" textAlign="left">
                        {calculateTime(timestamp)}
                    </Typography>
                </Stack>
                </Box>
                <Box sx={{
                    backgroundColor: `${theme.palette.primary.main}`,
                    padding: "0.3rem",
                    borderRadius: "50%",
                    maxWidth: "fit-content",
                    height:"fit-content",
                }}>
                    <FootprintsIcon width="2.5rem" height="2rem" float="right" right="0px !important" sx={{color:"black"}}/>
                </Box>
            </Stack>

        </Box>
    );
}
