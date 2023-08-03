// noinspection JSIgnoredPromiseFromCall

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
import {uploadFile} from "../../BackEnd/Classes/GeneralFunctionsFireBase";
import StyledGifLoading from "../../Components/Styled Components/StyledGifLoading";
import FileReaderComponent from "../../BackEnd/utils/FileReaderComponent";
import DeleteAllButton from "../../BackEnd/utils/DeleteAllButtom";

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
        <div>
            {(user === null) ? (<StyledGifLoading/>) :
                (<div>
                    <TopBoxWithProfileImg
                        img_url={(user.getPic() === "") ? ("") : (user.getPic())}
                    />
                    <Typography variant="h2" marginTop="4rem">
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
                                <div style={{overflowX: 'auto'}}>
                                    <Stack direction="row" spacing={"1rem"} justifyContent="center" margin="auto">
                                        {(footprints2.length > 0) ? (footprints2.map(footprint =>
                                                <Stack direction="column" spacing={'0.5rem'} key={footprint.businessID}>
                                                    <StyledLightCircleBoxForProfile>
                                                        <Avatar sx={{width: '95%', height: '95%'}}
                                                            src={footprint.businessPhoto}
                                                        />
                                                    </StyledLightCircleBoxForProfile>

                                                    <Typography variant="h5" color="black">
                                                        {footprint['businessName']}
                                                    </Typography>
                                                </Stack>)) : (<Typography variant="h3" color="white">No footprints yet..</Typography>)}
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


function ShowMyProfile(user, file, setFile, upload) {
    return (
        <>
            {(upload === false) ? (<><Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: theme.palette.primary.main,
                    }}
                >

                    <Stack direction="column" spacing={1} justifyContent="flex-start"
                           alignItems="center" >
                        <Typography variant="h2" color="white">
                            {user.getUserName()}
                        </Typography>
                        {(user.getPic() === "") ? (<Avatar width="6rem" height="6rem"/>)
                            : (<Button variant={"contained"} component={"label"} >
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => setFile(e.target.files[0])}/>
                                <StyledAvatarFriendProfile src={user.getPic()}>
                                </StyledAvatarFriendProfile>
                            </Button>)}
                    </Stack>

                </Box>
                <StyledProfileTabs user={user}/></>) : (<>No!</>)}

        </>
    )
        ;
}


function ProfilePageComponent() {

    const [picturePath, setPicturePath] = useState("");
    const [file, setFile] = useState(null);
    const location = useLocation()
    const check_null = location.state === null;
    let {from} = (check_null === true) ? null : location.state;
    let [user, setUser] = useState(null);
    const [lstOfReviews, setLstOfReviews] = useState([]);
    const [upload, setUpload] = useState(false);
    const handleUploadPic = async () => {
        uploadFile(file).then((pathy) => {
            setPicturePath(pathy);
            user.setPic(pathy);
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => {
        async function foo() {
            if (file !== null && upload === false) {
                setUpload(true);
                await handleUploadPic();
                await user.saveToFirebase(setUpload); //.then(setUpload(false));
                // await user.saveToFirebase(setUpload);
            }
        }
        // noinspection JSIgnoredPromiseFromCall
        foo();
    }, [file]);


    useEffect(() => {
        if (check_null !== true) {
            onAuthStateChanged(auth, (user_) => {
                if (user_) {
                    if (user === null) {
                        getUserById(from).then((user__) => {
                            setUser(user__);
                            user__.getMyReviews()?.then((reviews) => {
                                setLstOfReviews(reviews);
                            setPicturePath(user__.getPic());
                            }).catch((error) => {
                                console.error(error);
                            });
                        }).catch((error) => {
                            console.error(error);
                        });
                    } else if (user.getUserId() !== auth?.currentUser?.uid) {
                        getUserById(from).then((user__) => {
                            setUser(user__);
                            user__.getMyReviews().then((reviews) => {
                            setLstOfReviews(reviews);
                        }).catch((error) => {
                            console.error(error);
                        });
                        }).catch((error) => {
                            console.error(error);
                        });
                    }
                }
            });
        }

    }, [check_null, from, user]);

    return (
        <Box marginBottom="4.5rem">
            {
                (check_null === true) ?
                    (<div>Profile!</div>)
                    :
                    (
                        <div>
                            {
                                (user && (user?.getUserId() === auth?.currentUser?.uid)) ?
                                    (<div>{ShowMyProfile(user, file, setFile, upload)}</div>) :
                                    (<div>{showUserProfile(user, lstOfReviews)}</div>)
                            }
                        </div>)
            }
            {/*yo*/}
            {/*<FileReaderComponent></FileReaderComponent>*/}
            {/*<DeleteAllButton name={"Test"}></DeleteAllButton>*/}
        </Box>
    );

}

export default ProfilePageComponent;
