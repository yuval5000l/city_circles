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
import {Link} from "react-router-dom";
import StyledAvatarWithBadge from "./StyledAvatarWithBadge";
import StyledReviewForUser from "./StyledReviewForUser";
import StyledFootprintForUser from "./StyledFootprintForUser";

export default function StyledBusinessFeedItem({business}) {
    return (
        <Box sx={{padding: "0.4rem", boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', borderBottom: '0.1rem solid #C3ED5B'}}>
            <Stack direction="column" alignItems="flex-start" spacing={1}>
                <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                    <Link to={"../BusinessPage"} state={{from: business.getName()}}>
                        <StyledAvatarBusinessFeed src={business.getProfilePic()}/>
                    </Link>
                    <Stack direction="column" spacing={0.5} justifyContent="flex-start">
                        <Typography variant="h3" textAlign="left">
                            {business.name}
                        </Typography>
                        <Stack direction="row" spacing={0.5}>
                            {business.getBusinessType().map(b_type => <StyledTypeBox> {b_type} </StyledTypeBox>)}
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Typography>{business.getRating().toFixed(2)}</Typography>
                            <StyledRating value={business.getRating()}/>
                            <Typography>({business.rating[1]})</Typography>
                            {/*<Typography>4</Typography>*/}
                            {/*<StyledRating value={4}/>*/}
                            {/*<Typography>(15)</Typography>*/}
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <StyledInfoBox>
                                #km
                            </StyledInfoBox>
                            <Link to={"../BusinessPage"} state={{from: business.getName()}}>
                                <StyledGrayButtonVisitBusiness>
                                </StyledGrayButtonVisitBusiness>
                            </Link>
                        </Stack>
                    </Stack>
                </Stack>
                <AvatarGroup max={7} spacing={0.5}>
                    {business.getReviews().map(review => <Avatar alt={review.userName} src={review.userPhoto}/>)}
                    {business.getFootprints().map(footprint => <Avatar alt={footprint.userName}
                                                                       src={footprint.userPhoto}/>)}
                </AvatarGroup>
            </Stack>
        </Box>
    )
        ;
}