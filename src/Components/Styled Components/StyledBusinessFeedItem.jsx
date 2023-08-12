import {AvatarGroup, Stack, Typography} from "@mui/material";
import {
    StyledAvatarBusinessFeed,
    StyledRating,
} from "./styledComponents";
import React from "react";
import StyledGrayButtonVisitBusiness from "./StyledGrayButtonVisitBusiness";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";


function getUnion(array1, array2) {
    const difference = array1.filter(
        review => {
            let check = true;
            array2.forEach(footprint => {
                if (footprint.userName === review.userName)

                    check = false;
            });
            return check;

        }
    );

    return [...difference, ...array2];
}

export default function StyledBusinessFeedItem({business}) {
    const allUsers = getUnion(business.getReviews(), business.getFootprints());
    // console.log(business.getName());
    return (
        <Box sx={{
            padding: "1rem",
            borderTop: "0.2rem solid #E9E8E8",
            width: "100%",

        }}>
            <Stack direction="column" alignItems="flex-start" spacing={1}>
                <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                    <Link to={"../BusinessPage"} state={{from: business.getName()}} style={{textDecoration: 'none'}}>
                    {/*<Link to={"../BusinessPage"} state={business_data_members} style={{textDecoration: 'none'}}>*/}

                        <StyledAvatarBusinessFeed src={business.getProfilePic()}/>
                    </Link>
                    <Stack direction="column" spacing={0.5} justifyContent="flex-start">
                        <Stack direction="row">
                            <Typography variant="h4" textAlign="left" fontWeight="500">
                                {business.name}
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={0.3} justifyContent="flex-start" alignItems="center">
                            {/*<Typography variant="h5"*/}
                            {/*            fontWeight="700">{"0" | business.getRating().toFixed(2)}</Typography>*/}
                            <StyledRating value={business.getRating()}/>
                            {/*<Typography variant="h6">({business.rating[1]})</Typography>*/}
                        </Stack>
                        <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                            {/*<StyledInfoBox>*/}
                            {/*    #km*/}
                            {/*</StyledInfoBox>*/}
                            <Link to={"../BusinessPage"} state={{from: business.getName()}} style={{textDecoration: 'none'}}>
                                <StyledGrayButtonVisitBusiness/>
                            </Link>
                        </Stack>
                    </Stack>
                </Stack>
                <AvatarGroup max={4} spacing={0.5}>

                    {allUsers.map(review =>
                        <Box key={review.userPhoto}>
                            <Avatar border="0.2rem solid gray" alt={review.userName}
                                    src={review.userPhoto} sx={{
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                width: "2rem",
                                height: "2rem"
                            }}/> </Box>)}

                </AvatarGroup>
            </Stack>
        </Box>
    )
        ;
}