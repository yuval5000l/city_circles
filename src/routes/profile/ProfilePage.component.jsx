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
import {SmallPurpleBox, StyledLightCircleBoxForProfile, GoToCard,
    // FeedItem
} from "../../Components/Styled Components/OuterProfileComponents";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import {ReactComponent as FootprintsIcon} from "../../Components/Styled Components/Icons/footprints-svgrepo-com.svg";
import StyledFeedItem from "../../Components/Styled Components/StyledFeedItem";
import FeedItemPage from "../../Components/Styled Components/FeedItemPage";



function FeedItem(user) {
    const reviews = user.getUserReviews()
    return (
        <Box>
        <StyledFeedItem
            user_id ={user.getUserId()}
            user_name={user.getUserName()} profile_photo_url={user.getPic()}
            circles={user.getCircles()}
            time={reviews[0]["timestamp"].toDate()}
            business_name={reviews[0]["businessID"]}
            // business_photo_url={review.business_photo_url}
            rating={reviews[0]["rating"]}
            // url_to_business={review.url_to_business}
            review={reviews[0]["content"]}
            // review_address={review.rating}
        >
        </StyledFeedItem>
    </Box>)
}

function showUserProfile(user) {
    // console.log(user.getFootprints())
    const footprints = [{businessID: 'business 1', rating: 5},{businessID: 'business 2', rating: 3}, {businessID: 'business 3', rating: 4}, {businessID: 'business 4'}]
    // const userCircles = ['school', 'hobby', 'neighborhood']
    return(

        <div>
            {(user === null) ? (<div> Loading... </div>) :
                (<div>
        <TopBoxWithProfileImg
            img_url={(user.getPic()==="") ? (""):(user.getPic())}
        />
        <Stack direction="column" spacing={4} marginTop="4rem">
            <Typography variant="h2">
                {/*current user name...*/}
                {user.getUserName()}
            </Typography>

            <SmallPurpleBox>
                <Stack direction="column" spacing="auto" justifyContent="center" margin="auto">
                    <SupervisedUserCircleIcon sx={{height: "2.5rem", width: "2.5rem", position: "start", fill: "white"}}/>
                    <Stack direction="row" spacing={2} justifyContent="center" margin="auto">
                        {user.getCircles().map(circle =>
                            <StyledLightCircleBox>
                                <Typography variant="h4" color="black">
                                    {circle}
                                </Typography>
                            </StyledLightCircleBox>
                        )}
                    </Stack>
                </Stack>
            </SmallPurpleBox>

            <SmallPurpleBox>
                <Stack direction="column" spacing="auto" justifyContent="center" margin="auto">
                    <FootprintsIcon width="2.5rem" height="2.5rem" sx={{
                        fontSize:"3rem",
                        margin:"auto",
                        fill:"white",
                    }}/>
                    {/*{(user.get_user_footprints() === []) ? (<Typography variant="h4" color="black">No Footprints</Typography>) :*/}
                    {/*    (<Stack direction="row" spacing={"1rem"} justifyContent="center" margin="auto">*/}
                    {/*        {user.get_user_footprints().map(footprint =>*/}
                    {/*            <Stack direction="column" spacing={'0.5rem'}>*/}
                    {/*                <StyledLightCircleBoxForProfile>*/}
                    {/*                    <Avatar sx={{width: '95%', height: '95%'}}*/}
                    {/*                        // src={}*/}
                    {/*                    />*/}
                    {/*                </StyledLightCircleBoxForProfile>*/}
                    {/*                <Typography variant="h5" color="black">*/}
                    {/*                    {footprint}*/}
                    {/*                </Typography>*/}
                    {/*            </Stack>*/}
                    {/*        )}*/}

                    {/*    </Stack>)}*/}
                    <Stack direction="row" spacing={"1rem"} justifyContent="center" margin="auto">
                        {footprints.map(footprint =>
                            <Stack direction="column" spacing={'0.5rem'}>
                                {/*{console.log(footprint)}*/}

                                {/*{console.log(footprint["businessID"])}*/}
                                <StyledLightCircleBoxForProfile>
                                    <Avatar sx={{width: '95%', height: '95%'}}
                                        // src={}
                                    />
                                </StyledLightCircleBoxForProfile>

                                <Typography variant="h5" color="black">
                                    {footprint['businessID']}
                                </Typography>
                            </Stack>
                        )}

                    </Stack>


                </Stack>
            </SmallPurpleBox>
            {/*<SmallPurpleBox>*/}
            <GoToCard user={user} />
            {/*</SmallPurpleBox>*/}
            {FeedItem(user)}
            {/*<FeedItem/>*/}
            {/*<FeedItemPage/>*/}
            {/*<StyledFeedItem user_name={review.user_name} profile_photo_url={review.profile_photo_url}*/}
            {/*                circles={review.circles} time={review.time}*/}
            {/*                business_name={review.business_name} business_photo_url={review.business_photo_url}*/}
            {/*                rating={review.rating} url_to_business={review.url_to_business}*/}
            {/*                review={review.review}*/}
            {/*                review_address={review.rating}/>*/}
        </Stack>
                </div>)
            }
    </div>);
}


function showMyProfile(user) {
    return (<div>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.palette.primary.main,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px',
                    borderRadius: '8px',
                }}
            >
                <Avatar
                    src={user.getPic()}
                    sx={{ width: 100, height: 100 }}
                />
                <Box sx={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <Button variant="contained" color="secondary">
                        Edit Profile
                    </Button>
                    <Button variant="contained" color="secondary">
                        Add Friends
                    </Button>
                </Box>
            </Box>
        </Box>
        Ma profile mate {user.getUserName()}
        <p>

        </p>
    </div>);
}

function showProfile(user) {
    return (<div>
        {(user === null) ? (<div> Loading... </div>) :
            (<div>
                Welcome to {user.getUserName()} profile!
            </div>)
        }
    </div>)
}

function ProfilePageComponent() {


    const location = useLocation()
    const check_null = location.state === null;
    let {from} = (check_null === true) ? null : location.state;
    let [user, setUser] = useState(null);
    useEffect(() => {
        if (check_null !== true) {
            onAuthStateChanged(auth, (user_) => {
                if (user_) {
                    getUserById(from).then((user__) => {
                        setUser(user__);
                    }).catch((error) => {
                        console.error(error);
                    });
                }
            });
        }

    }, []);
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
                                    (<div>{showUserProfile(user)}</div>)
                            }

                        </div>)
            }
        </div>
    );

}

export default ProfilePageComponent;
