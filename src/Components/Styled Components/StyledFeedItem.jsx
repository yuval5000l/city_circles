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
import Theme from "../../Theme/Theme";

export default function StyledFeedItem({
                                           user_id, user_name = "name", profile_photo_url = "",
                                           circles = [],
                                           time = timestamp.now(),
                                           business_name = "name", business_photo_url = "",
                                           rating = 5, url_to_business = "", review = "",
                                           review_address = "", setValueFunc = null
                                       }) {
    const setValueToBusiness = () => {
        if (setValueFunc !== null) {
            setValueFunc(1);
        }
    };
    const setValueToProfile = () => {
        if (setValueFunc !== null) {
            setValueFunc(4);
        }
    };
    return (
        <Box
        >
            <Stack direction="column" spacing={2} sx={{
                padding: "0.4rem",
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
                borderTop: '0.1rem solid #C3ED5B',
            }}>
                <Box>
                    <Stack direction="row" justifyContent="space-between">
                        <Stack direction="row" spacing={1}>
                            <Link to="/ProfilePageComponent" state={{from: user_id}} onClick={setValueToProfile}>
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
                                        <StyledGrayButtonFullReview content={review}/>
                                        <Link to="./BusinessPage" state={{from: business_name}}
                                              onClick={setValueToBusiness}><StyledGrayButtonVisitBusiness/></Link>
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