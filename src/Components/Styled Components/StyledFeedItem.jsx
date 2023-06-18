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

// function calculateTime(time)
// {
//     const now = new Date();
//     const timeDiff = now.getTime() - time.getTime();
//     const seconds = Math.floor(timeDiff / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);
//
//     return(<div>
//             {(seconds > 60) ?
//                 (<div>
//                     {(minutes > 60) ?
//                         (<div>{(hours > 23) ? (<div>{days} days</div>) :
//                             (<div>{hours} hours</div>)}</div>)
//                         :
//                         (<div>{minutes} minutes</div>)}
//                 </div>)
//                 :
//                 (<div>{seconds} seconds</div>)}
//         </div>
//     )
// }

export default function StyledFeedItem({user_id, user_name="name", profile_photo_url="",
                                       circles = [], time= new timestamp(),
                                       business_name="name", business_photo_url="none",
                                       rating=5, url_to_business="", review="",
                                       review_address=""})
{

    // const [open, setOpen] =  useState(false);
    //
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    //
    // const handleClose = () => {
    //     setOpen(false);
    // };
    return (
        <Box>
            <Stack direction="column" spacing={2} sx={{padding:"0.4rem", boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', borderBottom: '0.1rem solid #C3ED5B'}}>
                <Box>
                    <Stack direction="row" spacing={1}>
                        <Link to="/ProfilePageComponent" state ={{from: user_id}}>
                            {(profile_photo_url==="") ?
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
                            <StyledSmallCircleButton userID={user_name} circles_={circles} />
                        </Box>
                    </Stack>
                </Box>
                <Box>
                    <Stack direction = "column" spacing={2}>
                        <Stack direction = "row" spacing={1} justifyContent="flex-start" alignItems="center">
                            <Typography variant="h3" textAlign="left">{business_name}</Typography>
                            <StyledRating value={rating}/>
                        </Stack>
                        <Stack direction = "row" spacing={1} justifyContent="flex-start" alignItems="center">
                            <StyledBusinessFeed/>
                            <Stack direction = "column" justifyContent="flex-start" spacing={1}>
                                <Box>
                                    <StyledTypographyReview>
                                        {review}
                                    </StyledTypographyReview>
                                </Box>
                                <Box>
                                    <Stack direction = "row" spacing = {0.5}>
                                        <StyledGrayButtonFullReview content={review}/>
                                        <Link to="./BusinessPage" state={{ from: business_name}}><StyledGrayButtonVisitBusiness/></Link>
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