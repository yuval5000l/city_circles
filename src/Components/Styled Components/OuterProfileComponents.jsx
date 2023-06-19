import {styled} from "@mui/material/styles";
import {AppBar, Card, CardActionArea, CardContent, CardMedia, Container, Divider} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useEffect, useState} from "react";
import User from "../../BackEnd/Classes/UserClass";
import {auth} from "../../BackEnd/config/firebase";
import StyledFeedItem from "./StyledFeedItem";
import {onAuthStateChanged} from "firebase/auth";

export const SmallPurpleBox = styled(Box)(({ theme })=> ({
    backgroundColor:theme.palette.primary.main,
    // borderBottom:`0.65rem solid ${theme.palette.secondary.main}`,
    // position:"fixed",
    position: 'relative',
    borderRadius: 20,
    width: "100%",
    [theme.breakpoints.up('xs')]: {
        height:'12rem',
    }
}));

export const MediumPurpleBox = styled(Box)(({ theme })=> ({
    backgroundColor:theme.palette.primary.main,
    // borderBottom:`0.65rem solid ${theme.palette.secondary.main}`,
    // position:"fixed",
    position: 'relative',
    borderRadius: 20,
    width: "100%",
    [theme.breakpoints.up('xs')]: {
        height:'18rem',
    }
}));

export const StyledLightCircleBoxForProfile = styled(Box)(({theme}) => ({
    borderRadius: "50%",
    boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
    border: `0.2rem solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('xs')]: {
        width: "4.6rem",
        height: "4.6rem",
    }
}));


const StyledLightCircleBoxForGoToCard = styled(Box)(({theme}) => ({
    borderRadius: "50%",
    boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
    border: `0.2rem solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('xs')]: {
        width: "4.6rem",
        height: "4.6rem",
    }
}));


const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 400,
}));

function BoxWithLock(){

    return(
        <Box sx={{position: "relative",bgcolor: "white", bottom:0, width: "100%", padding: "1.5rem", borderBottomLeftRadius:25, borderBottomRightRadius:25, justifyContent: 'center',
            alignItems: 'center',
            alignSelf: "center", marginTop: "1rem"}}>
            <LockOutlinedIcon
                sx={{
                    position: "absolute",
                    top : '-1rem',
                    // margin: "auto",
                    // display: 'block',
                    textAlign: "center",
                    justifyContent: 'center',
                    alignItems:  'center',
                    alignSelf: "center",
                    fontSize: "2rem",
                    color: "primary.main"}}/>
        </Box>
    )
}

export function GoToCard(Gotoss) {
    const Gotos = [{businessID: 'business1'}, {businessID: 'business2'}, {businessID: 'business3'}];
    return (
        <MediumPurpleBox>
            <Stack direction="column" justifyContent="center" margin="auto" marginBottom={0}>
            <LockOutlinedIcon sx={{height: "2.5rem", width: "2.5rem", position: "start", fill: "white"}}/>
            <Stack direction="row" spacing="2rem" justifyContent="flex-start" alignItems="center" display="flex" alignContent="center" margin="1rem" overflow={"scroll"} >
            {Gotos.map(goto =>
                <Box height="100%" sx={{bgcolor: "info.light", paddingTop: "1rem",paddingRight:2, paddingLeft:2, borderRadius: 3, borderColor: "primary.main", border: 3}}>
                <Stack direction="column" spcing="auto" justifyContent="center" alignItems="center">
                    <Avatar src="B"/>
                    <Typography variant="h4" sx={{color: "black"}}>
                        {goto.businessID}
                    </Typography>
                    <Typography variant="h5" sx={{color: "black"}}>
                        category
                    </Typography>
                    <Typography variant="h5" sx={{color: "black"}}>
                        address
                    </Typography>
                    {/*{BoxWithLock()}*/}
                    <Box sx={{position: "relative",bgcolor: "white", bottom:0, width: "100%", padding: "1rem", borderBottomLeftRadius:25, borderBottomRightRadius:25, justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: "center", marginTop: "1rem"}}>
                    <LockOutlinedIcon fill="white"
                    sx={{
                        // position
                        position: "absolute",
                        top : '-1rem',
                        margin: "auto",
                        display: 'flex',
                        textAlign: "center",
                        // textJustify: "center",
                        // justifyContent: 'center',
                        alignItems:  'center',
                        alignSelf: "center",
                        width: "2.5rem",
                        height: "2.5rem",
                    // fontSize: "1rem",
                    color: "primary.main"}}/>
                    </Box>
                </Stack>
                </Box>
            )}
            </Stack>
            </Stack>
        </MediumPurpleBox>

    );
}



// export function FeedItem(user) {
//
//     // useEffect(() => {
//     //     getFriendsReviewsHelper()
//     // }, [])
//     //
//     //
//     // const [listReviews, setListReviews] = useState([]);
//     // Review:
//     // user_name, profile_pic, circles, time, business_name, business_photo_url
//     // rating, url_to_business, review,
//     // const getFriendsReviewsHelper = () => {
//     //     onAuthStateChanged(auth, (user) => {
//     //         if (user) {
//     //             User.getFriendsReviews(auth?.currentUser?.uid).then((lst) => {
//     //                 setListReviews(lst);
//     //             }).catch((error) => {
//     //                 console.error(error);
//     //             });
//     //         }
//     //     });
//     // };
//
//     const reviews = user.getUserReviews()
//
//     return (<Box>
//         {/*{listReviews.map((review) =>*/}
//         {/*    <Box*/}
//         {/*        // key={review.user_name+review.business_name+review.review}*/}
//         {/*    >*/}
//                 <StyledFeedItem
//                     user_id ={user.getId()}
//                     user_name={user.getUserName()} profile_photo_url={user.getPic()}
//                     circles={user.getCircles()}
//                     time={reviews[0]["timestamp"]}
//                     business_name={reviews[0]["businessID"]}
//                     // business_photo_url={review.business_photo_url}
//                     rating={reviews[0]["rating"]}
//                     // url_to_business={review.url_to_business}
//                     review={reviews[0]["content"]}
//                     // review_address={review.rating}
//                 ></StyledFeedItem>
//             {/*</Box>*/}
//         {/*)}*/}
//     </Box>)
// }