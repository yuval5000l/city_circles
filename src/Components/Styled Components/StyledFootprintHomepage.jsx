import {Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import StyledAvatarWithBadge from "./StyledAvatarWithBadge";
import calculateTime from "../../BackEnd/Classes/GeneralFunctions";
import React from "react";
import {ReactComponent as FootprintsIcon} from "./Icons/footprints-svgrepo-com.svg";
import theme from "../../Theme/Theme";
import StyledSmallCircleButton from "./StyledSmallCirclesButton";

export default function StyledFootprintHomepage({
                                                    businessPhoto,
                                                    userPhoto,
                                                    circles,
                                                    timestamp = null,
                                                    BusinessName = "business name",
                                                    UserName = "user name"
                                                })
{
    console.log(circles);
    return (
        <Box width="100%" maxWidth="-webkit-fill-available" backgroundColor="#775CDF">
            <Stack dirction="column">
                <Stack width="100%" maxWidth="-webkit-fill-available" direction="row" justifyContent="space-between"
                       spacing={2} padding="0.5rem" sx={{
                    flexWrap: "wrap",
                    borderBottom:"0.5rem solid white"
                }}>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: "space-between"}}>
                        <Box sx={{marginRight: '1rem'}}>
                            <StyledAvatarWithBadge bigPhoto={businessPhoto} smallPhoto={userPhoto}/>
                        </Box>
                        <Stack direction="column" justifyContent="center" alignItems="flex-start" color="white">
                            <Stack direction="row" spacing={1}   alignItems="center">
                                <Typography variant="h3"> {UserName} </Typography>
                                <Box backgroundColor="white" borderRadius="50%" height="1.25rem">
                                    <StyledSmallCircleButton userID={UserName} circles_={circles}/>
                                </Box>
                            </Stack>
                        <Stack direction="column" justifyContent="flex-start"
                               alignItems="flex-start" minWidth='fit-content'
                        >
                            <Typography variant="h5" textAlign="left" color="white">
                                visited
                            </Typography>
                            <Typography variant="h3" textAlign="left" color="white">
                                {BusinessName}
                            </Typography>
                            <Typography variant="h6" textAlign="left" color="white">
                                {calculateTime(timestamp)} ago
                            </Typography>
                        </Stack>
                        </Stack>
                    </Box>
                    <Box sx={{
                        backgroundColor: `${theme.palette.primary.main}`,
                        padding: "0.3rem",
                        borderRadius: "50%",
                        maxWidth: "fit-content",
                        height: "fit-content",
                    }}>
                        <FootprintsIcon width="2.5rem" height="2rem" float="right" right="0px !important"
                                        sx={{color: "black"}}/>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
}
