import {useEffect, useState} from "react";
import User, {CompareUserTimeStamp} from "../../BackEnd/Classes/UserClass";
import {auth} from "../../BackEnd/config/firebase";
import Box from "@mui/material/Box";
import StyledFeedItem from "./StyledFeedItem";
import {onAuthStateChanged} from "firebase/auth";
import StyledFootprintHomepage from "./StyledFootprintHomepage";
import StyledGifLoading from "./StyledGifLoading";
import Business from "../../BackEnd/Classes/BusinessClass";


export default function FeedItemPage({lstBusiness, lstUsers, user}) {

    useEffect(() => {
        getFriendsReviewsHelper()
    }, [])


    const [listReviews, setListReviews] = useState([]);

    const createBusinessDict = (lstBusiness) =>{
        let dictionary = {};
        for (const business of lstBusiness)
        {
            dictionary[business.getName()] = business;
        }
        return dictionary;
    }
    const getFriendsReviewsHelper = () => {
        if (user)
        {
            let filteredListUsers = lstUsers.filter(user => {
                return user.getCircles().filter(circle => user.getCircles().includes(circle)).length !== 0;
            })
            let dicBusiness = createBusinessDict(lstBusiness);
            let listOfReviewsAndFootprints = [];
            for (const user of filteredListUsers)
            {
                for (const review of user.getUserReviews())
                {
                    const business = dicBusiness[review.businessID];
                    listOfReviewsAndFootprints.push(User.feedItemConverter(user, review, business));
                }
                for (const review of user.getUserFootprints())
                {
                    const business = dicBusiness[review.businessID];
                    listOfReviewsAndFootprints.push(User.feedItemFootprintConverter(user, review, business));
                }
            }

            setListReviews(listOfReviewsAndFootprints);
        }
        // onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         User.getAllUsersReviewsFootprintsIncludeCurrentUser().then((lst) => {
        //             setListReviews(lst.sort(CompareUserTimeStamp));
        //         }).catch((error) => {
        //             console.error(error);
        //         });
        //     }
        // });
    };
    return (<Box>
        {(listReviews.length === 0) ?
            (<StyledGifLoading/>) :
            (<>
                {listReviews.map((review) =>
                    <Box key={review.user_name + review.business_name + review.review}>
                        {(review.typeOfItem === "review") ?
                            (<StyledFeedItem user_id={review.user_id}
                                             user_name={review.user_name} profile_photo_url={review.profile_photo_url}
                                             circles={review.circles} time={review.time}
                                             business_name={review.business_name}
                                             business_photo_url={review.business_photo_url}
                                             rating={review.rating}
                                             review={review.review}/>)
                            :
                            (<StyledFootprintHomepage businessPhoto={review.business_photo_url}
                                                      userPhoto={review.profile_photo_url}
                                                      circles={review.circles}
                                                      timestamp={review.time}
                                                      BusinessName={review.business_name}
                                                      UserName={review.user_name}/>)}
                    </Box>
                )}</>)}
    </Box>)
}