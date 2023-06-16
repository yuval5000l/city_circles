import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../BackEnd/config/firebase";
import {getUserById} from "../../BackEnd/Classes/UserClass";
import {Box, Button, Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import theme from "../../Theme/Theme";
import {TopBoxWithProfileImg} from "../../Components/Styled Components/StyledBoxWithLogo";
import {StyledLightCircleBox} from "../../Components/Styled Components/styledComponents";
import * as React from "react";
import {getUserCircles} from "../../BackEnd/Classes/UserClass";
import {SmallPurpleBox} from "../../Components/Styled Components/OuterProfileComponents";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";


function showUserProfile(user) {
    // const userID = user.getUserId()
    // const userCircles = getUserCircles(userID)
    const userCircles = ['school', 'hobby', 'neighborhood']
    return (<div>
        <TopBoxWithProfileImg img_url=""
        // img_url={user.get_pic()}
        />
        <Stack direction="column" spacing={4}>
            <Typography variant="h3">
                current user name...
                {/*{user.getUserName()}*/}
            </Typography>

            {/*<Box margin="1rem">*/}
                {/*<Stack direction="row" spacing={2} justifyContent="center">*/}
                    <SmallPurpleBox>
                        <Stack direction="row" spacing={2} justifyContent="center" margin="auto">
                        <SupervisedUserCircleIcon sx={{height: "2.5rem", width: "2.5rem", position: "start"}}/>
                        <Stack direction="row" spacing={2} justifyContent="center" margin="auto">
                        <StyledLightCircleBox>
                            <Typography variant="h5" color="black">
                                {userCircles[0]}
                            </Typography>
                        </StyledLightCircleBox>
                        <StyledLightCircleBox>
                            <Typography variant="h5" color="black">
                                {userCircles[1]}
                            </Typography>
                        </StyledLightCircleBox>
                        <StyledLightCircleBox>
                            <Typography variant="h5" color="black">
                                {userCircles[2]}
                            </Typography>
                        </StyledLightCircleBox>
                        </Stack>
                        </Stack>
                    </SmallPurpleBox>
                {/*</Stack>*/}
            {/*</Box>*/}
            <SmallPurpleBox>
                <Stack direction="row" spacing={2} justifyContent="center" margin="auto">
                    <SupervisedUserCircleIcon sx={{height: "2.5rem", width: "2.5rem", position: "start"}}/>
                    <Stack direction="row" spacing={2} justifyContent="center" margin="auto">
                        <StyledLightCircleBox>
                            <Typography variant="h5" color="black">
                                {userCircles[0]}
                            </Typography>
                        </StyledLightCircleBox>
                        <StyledLightCircleBox>
                            <Typography variant="h5" color="black">
                                {userCircles[1]}
                            </Typography>
                        </StyledLightCircleBox>
                        <StyledLightCircleBox>
                            <Typography variant="h5" color="black">
                                {userCircles[2]}
                            </Typography>
                        </StyledLightCircleBox>
                    </Stack>
                </Stack>
            </SmallPurpleBox>

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
