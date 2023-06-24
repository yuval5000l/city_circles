import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../BackEnd/config/firebase";
import {getUserById} from "../../BackEnd/Classes/UserClass";
import {Box, Button, Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import theme from "../../Theme/Theme";
import {TopBoxWithProfileImg} from "../../Components/Styled Components/StyledBoxWithLogo";
import {
    StyledAvatarFriendProfile,
    StyledButtonGreen,
    StyledLightCircleBox
} from "../../Components/Styled Components/styledComponents";
import * as React from "react";
import {
    SmallPurpleBox, StyledLightCircleBoxForProfile,
    // FeedItem
} from "../../Components/Styled Components/OuterProfileComponents";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import {ReactComponent as FootprintsIcon} from "../../Components/Styled Components/Icons/footprints-svgrepo-com.svg";
import {StyledFeedItemProfile} from "../../Components/Styled Components/OuterProfileComponents";
import StyledProfileTabs from "./StyledProfileTabs";

function FeedItem(user, lstOfReviews) {
    if (lstOfReviews === []) {
        return (<></>);
    }
    return (
        <Box>
            {lstOfReviews.map(review =>
                <Box key={review.business_name}>
                    <StyledFeedItemProfile user_id={review.user_id}
                                           user_name={review.user_name} profile_photo_url={review.profile_photo_url}
                                           circles={review.circles}
                                           time={review.time}
                                           business_name={review.business_name}
                                           business_photo_url={review.business_photo_url}
                                           rating={review.rating}
                                           url_to_business={review.url_to_business}
                                           review={review.review}
                                           review_address={review.rating}></StyledFeedItemProfile>
                </Box>
            )}
        </Box>)
}

function showUserProfile(user, lstOfReviews) {
    const footprints2 = (user !== null) ? (user.getFootprints()) : ([]); // [{businessID: "", businessName: "", businessPhoto: "", timestamp: timestamp},..]
    return (
        <div >
            {(user === null) ? (<div> Loading... </div>) :
                (<div >
                    <TopBoxWithProfileImg
                        img_url={(user.getPic() === "") ? ("") : (user.getPic())}
                    />
                    <Typography variant="h2" marginTop="4rem">
                        {/*current user name...*/}
                        {user.getUserName()}
                    </Typography>
                    <Stack direction="column" spacing={1.5} marginTop="1rem">
                        <SmallPurpleBox>
                            <Stack direction="column" spacing="auto" justifyContent="center" margin="auto">
                                <SupervisedUserCircleIcon
                                    sx={{height: "2.5rem", width: "2.5rem", position: "start", fill: "white"}}/>
                                <Stack direction="row" spacing={"1rem"} justifyContent="center" margin="auto">
                                    {user.getCircles().map(circle =>
                                        <Box key={circle}>
                                            <StyledLightCircleBox>
                                                <Typography variant="h4" color="black">
                                                    {circle}
                                                </Typography>
                                            </StyledLightCircleBox>
                                        </Box>
                                    )}
                                </Stack>
                            </Stack>
                        </SmallPurpleBox>

                        <SmallPurpleBox>
                            <Stack direction="column" spacing="auto" justifyContent="center" margin="auto">
                                <FootprintsIcon width="2.5rem" height="2.5rem" sx={{
                                    fontSize: "3rem",
                                    margin: "auto",
                                    fill: "white",
                                }}/>
                                <div style={{ overflowX: 'auto' }}>
                                <Stack direction="row" spacing={"1rem"} justifyContent="center" margin="auto" >
                                    {footprints2.map(footprint =>
                                        <Stack direction="column" spacing={'0.5rem'} key={footprint.businessID} >
                                            {/*{console.log(footprint)}*/}

                                            {/*{console.log(footprint["businessID"])}*/}
                                            <StyledLightCircleBoxForProfile>
                                                <Avatar sx={{width: '95%', height: '95%'}}
                                                    // src={}
                                                />
                                            </StyledLightCircleBoxForProfile>

                                            <Typography variant="h5" color="black">
                                                {footprint['businessName']}
                                            </Typography>
                                        </Stack>
                                    )}

                                </Stack>
                                </div>

                            </Stack>
                        </SmallPurpleBox>
                        {FeedItem(user, lstOfReviews)}
                    </Stack>
                </div>)
            }
        </div>);
}


function showMyProfile(user) {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: theme.palette.primary.main,
                }}
            >

                    <Stack direction="column" spacing={1} justifyContent="flex-start"
                           alignItems="center" sx={{marginBottom: "0.1rem"}} >
                        <Typography variant="h2" color="white">
                            {/*current user name...*/}
                            {user.getUserName()}
                        </Typography>
                        {(user.getPic()==="") ? (<Avatar width="6rem" height="6rem"/>)
                            : (<StyledAvatarFriendProfile src={user.getPic()} />)}
                    </Stack>

            </Box>
            <StyledProfileTabs user={user}/>
        </>
    )
        ;
}


function ProfilePageComponent() {


    const location = useLocation()
    const check_null = location.state === null;
    let {from} = (check_null === true) ? null : location.state;
    let [user, setUser] = useState(null);
    const [lstOfReviews, setLstOfReviews] = useState([]);
    useEffect(() => {
        if (check_null !== true) {
            onAuthStateChanged(auth, (user_) => {
                if (user_) {
                    if (user === null) {
                        getUserById(from).then((user__) => {
                            setUser(user__);

                        }).catch((error) => {
                            console.error(error);
                        });
                    } else if (user.getUserId() !== auth?.currentUser?.uid) {
                        getUserById(from).then((user__) => {
                            setUser(user__);
                        }).catch((error) => {
                            console.error(error);
                        });
                    } else {
                        if (user) {
                            user.getMyReviews().then((reviews) => {
                                setLstOfReviews(reviews);
                            }).catch((error) => {
                                console.error(error);
                            });
                        }
                    }
                }
            });
        }

    }, [check_null, from, user]);

    return (
        <div>
            {
                (check_null === true) ?
                    (<div>Profile!</div>)
                    :
                    (
                        <div>
                            {
                                (user && (user?.getUserId() === auth?.currentUser?.uid)) ?
                                    (<div>{showMyProfile(user)}</div>) :
                                    (<div>{showUserProfile(user, lstOfReviews)}</div>)
                            }
                        </div>)
            }
        </div>
    );

}

export default ProfilePageComponent;
