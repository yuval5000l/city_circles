import {AvatarGroup, Stack, Typography} from "@mui/material";
import {
    StyledAvatarBusinessFeed,
    StyledGreenBorderBox,
    StyledInfoBox,
    StyledRating,
    StyledTypeBox
} from "./styledComponents";
import React from "react";
import StyledGrayButtonVisitBusiness from "./StyledGrayButtonVisitBusiness";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import StyledAvatarWithBadge from "./StyledAvatarWithBadge";
import StyledReviewForUser from "./StyledReviewForUser";
import StyledFootprintForUser from "./StyledFootprintForUser";

export default function StyledBusinessFeedItem(business) {
    return (
        <Box sx={{padding:"0.4rem", boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', borderBottom: '0.1rem solid #C3ED5B'}}>
            <Stack direction="column" alignItems="flex-start" spacing={1}>
                <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                    <StyledAvatarBusinessFeed/>
                    <Stack direction="column" spacing={0.5} justifyContent="flex-start">
                        <Typography variant="h3" textAlign="left">
                            business name
                        </Typography>
                        <Stack direction="row" spacing={0.5}>
                            <StyledTypeBox>
                                type
                            </StyledTypeBox>
                            <StyledTypeBox>
                                type
                            </StyledTypeBox>
                            <StyledTypeBox>
                                type
                            </StyledTypeBox>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            {/*<Typography>{business.getRating()}</Typography>*/}
                            {/*<StyledRating value={business.getRating()} />*/}
                            {/*<Typography>({business.rating[1]})</Typography>*/}
                            <Typography>4</Typography>
                            <StyledRating value={4}/>
                            <Typography>(15)</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <StyledInfoBox>
                                #km
                            </StyledInfoBox>
                            <StyledGrayButtonVisitBusiness>
                            </StyledGrayButtonVisitBusiness>
                        </Stack>
                    </Stack>
                </Stack>
                <AvatarGroup max={8}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"/>
                    <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"/>
                    <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg"/>
                    <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg"/>
                    <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg"/>
                </AvatarGroup>
            </Stack>
            <StyledReviewForUser/>
            <StyledFootprintForUser/>
        </Box>
    );
}