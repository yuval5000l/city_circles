import {useEffect, useState} from "react";
import User from "../../BackEnd/Classes/UserClass";
import {auth} from "../../BackEnd/config/firebase";
import Box from "@mui/material/Box";
import StyledFeedItem from "./StyledFeedItem";
import {onAuthStateChanged} from "firebase/auth";

export default function FeedItemPage() {

    useEffect(() => {
        getFriendsReviewsHelper()
    }, [])


    const [listReviews, setListReviews] = useState([]);
    // Review:
    // user_name, profile_pic, circles, time, business_name, business_photo_url
    // rating, url_to_business, review,
    const getFriendsReviewsHelper = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                User.getFriendsReviews(auth?.currentUser?.uid).then((lst) => {
                    setListReviews(lst);
                }).catch((error) => {
                    console.error(error);
                });
            }
        });
    };

    return (<Box>
        {listReviews.map((review) =>
            <li key={review.user_name+review.business_name+review.review}>
                <StyledFeedItem user_name={review.user_name} profile_photo_url={review.profile_photo_url}
                                circles={review.circles} time={review.time}
                                business_name={review.business_name} business_photo_url={review.business_photo_url}
                                rating={review.rating} url_to_business={review.url_to_business}
                                review={review.review}
                                review_address={review.rating}></StyledFeedItem>
            </li>
        )}
    </Box>)
}