import {Stack, Typography, Box} from "@mui/material";
import {
    StyledAvatarUserFeed,
    StyledBusinessFeed,
    StyledRating,
    StyledTypographyReview
} from "./styledComponents";
import StyledGrayButtonFullReview from "./StyledGrayButtonFullReview";
import StyledGrayButtonVisitBusiness from "./StyledGrayButtonVisitBusiness";
import {timestamp} from "../../BackEnd/config/firebase"
import StyledSmallCircleButton from "./StyledSmallCirclesButton";
import React from "react";
import {Link} from "react-router-dom";
import calculateTime from "../../BackEnd/Classes/GeneralFunctions";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";

export default function StyledFeedItem({
                                           user_id, user_name = "name", profile_photo_url = "",
                                           circles = [],
                                           time = timestamp.now(),
                                           business_name = "name", business_photo_url = "",
                                           rating = 5, review = "",
                                           }) {
    // const setValueToBusiness = () => {
    //     if (setValueFunc !== null) {
    //         setValueFunc(0);
    //     }
    // };
    // const setValueToProfile = () => {
    //     if (setValueFunc !== null) {
    //         setValueFunc(0);
    //     }
    // };
    return (
        <Box
        >
            <Stack direction="column" spacing={2} sx={{
                padding: "1rem",
                borderBottom:`0.2rem solid #E9E8E8`
            }}>
                <Box>
                    <Stack direction="row" justifyContent="space-between">
                        <Stack direction="row" spacing={1}>
                            <Link to="/ProfilePageComponent" state={{from: user_id}}>
                                {(profile_photo_url === "") ?
                                    (<StyledAvatarUserFeed/>) :
                                    (<StyledAvatarUserFeed src={profile_photo_url}/>)
                                }
                            </Link>
                            <Box>
                                <Stack direction="column" justifyContent="center" alignItems="flex-start">
                                    <Typography variant="h4"> {user_name} </Typography>
                                    <Typography variant="h5">
                                        {calculateTime(time)}
                                    </Typography>
                                </Stack>
                            </Box>
                            <Box>
                                <StyledSmallCircleButton userID={user_name} circles_={circles}/>
                            </Box>
                        </Stack>
                        <Box>
                            <RateReviewOutlinedIcon sx={{
                                fontSize: "3.5rem",
                                margin: "auto",
                                color: "#775CDF",
                                width: "3.125rem !important",
                                height: "3.125rem",
                            }}/>
                        </Box>
                    </Stack>
                </Box>
                <Box>
                    <Stack direction="column" spacing={2}>
                        <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                            <Typography variant="h3" textAlign="left">{business_name}</Typography>
                            <StyledRating value={rating}/>
                        </Stack>
                        <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                            {(business_photo_url === "") ?
                                (<StyledBusinessFeed/>) :
                                (<StyledBusinessFeed src={business_photo_url}/>)
                            }

                            <Stack direction="column" justifyContent="flex-start" spacing={1}>
                                <Box>
                                    <StyledTypographyReview>
                                        {review}
                                    </StyledTypographyReview>
                                </Box>
                                <Box>
                                    <Stack direction="row" spacing={0.5}>
                                        <StyledGrayButtonFullReview content={review} userName={user_name}/>
                                        <Link to="../BusinessPage" state={{from: business_name}} style={{textDecoration: 'none'}}>
                                            <StyledGrayButtonVisitBusiness/>
                                        </Link>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Stack>

                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}