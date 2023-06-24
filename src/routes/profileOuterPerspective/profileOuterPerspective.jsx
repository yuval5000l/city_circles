import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../BackEnd/config/firebase";
import {getUserById} from "../../BackEnd/Classes/UserClass";
import {Box, Button, Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {TopBoxWithProfileImg} from "../../Components/Styled Components/StyledBoxWithLogo";
import {StyledLightCircleBox} from "../../Components/Styled Components/styledComponents";
import * as React from "react";
import {
    SmallPurpleBox,
    StyledLightCircleBoxForProfile,
    GoToCard
} from "../../Components/Styled Components/OuterProfileComponents";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import {ReactComponent as FootprintsIcon} from "../../Components/Styled Components/Icons/footprints-svgrepo-com.svg";
import StyledFeedItem from "../../Components/Styled Components/StyledFeedItem";

function showUserProfile(user) {
    // const userID = user.getUserId()
    // const userCircles = user.getCircles()
    // const footprints = user.get_user_footprints()
    const footprints = [{businessID: 'business 1'}, {businessID: 'business 2'}, {businessID: 'business 3'}, {businessID: 'business 4'}]
    const userCircles = ['school', 'hobby', 'neighborhood']
    return (
        <div>
            <TopBoxWithProfileImg img_url=""
                // img_url={user.get_pic()}
            />
            <Stack direction="column" spacing={4}>
                <Typography variant="h3">
                    current user name...
                    {/*{user.getUserName()}*/}
                </Typography>

                <SmallPurpleBox>
                    <Stack direction="row" spacing={2} justifyContent="center" margin="auto">
                        <SupervisedUserCircleIcon sx={{height: "2.5rem", width: "2.5rem", position: "start"}}/>
                        <Stack direction="row" spacing={2} justifyContent="center" margin="auto">
                            {userCircles.map(circle =>
                                <StyledLightCircleBox>
                                    <Typography variant="h5" color="black">
                                        {circle}
                                    </Typography>
                                </StyledLightCircleBox>
                            )}
                        </Stack>
                    </Stack>
                </SmallPurpleBox>

                <SmallPurpleBox>
                    <Stack direction="row" spacing={2} justifyContent="center" margin="auto">
                        <FootprintsIcon width="2.5rem" height="2.5rem" sx={{
                            fontSize: "3rem",
                            margin: "auto",
                            fill: "white",
                        }}/>
                        <Stack direction="row" spacing={"1rem"} justifyContent="center" margin="auto">
                            {footprints.map(footprint =>
                                <Stack direction="column" spacing={'0.5rem'}>
                                    <StyledLightCircleBoxForProfile>
                                        <Avatar sx={{width: '95%', height: '95%'}}
                                            // src={}
                                        />
                                    </StyledLightCircleBoxForProfile>
                                    <Typography variant="h5" color="black">
                                        {footprint["businessID"]}
                                    </Typography>
                                </Stack>
                            )}

                        </Stack>
                    </Stack>
                </SmallPurpleBox>
                {/*<SmallPurpleBox>*/}
                <GoToCard user={user}/>
                {/*</SmallPurpleBox>*/}
                {/*<StyledFeedItem user_name={review.user_name} profile_photo_url={review.profile_photo_url}*/}
                {/*                circles={review.circles} time={review.time}*/}
                {/*                business_name={review.business_name} business_photo_url={review.business_photo_url}*/}
                {/*                rating={review.rating} url_to_business={review.url_to_business}*/}
                {/*                review={review.review}*/}
                {/*                review_address={review.rating}/>*/}
            </Stack>
        </div>);
}

// function showProfile(user) {
//     return (<div>
//         {(user === null) ? (<div> Loading... </div>) :
//             (<div>
//                 Welcome to {user.getUserName()} profile!
//             </div>)
//         }
//     </div>)
// }

export default function OuterPerspectiveProfilePageComponent() {
    const user = auth?.currentUser

    return (
        <div>
            {showUserProfile(user)}

        </div>
    );

}
