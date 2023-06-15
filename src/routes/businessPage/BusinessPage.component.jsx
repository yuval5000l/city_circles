import {useLocation} from 'react-router-dom';
import {useEffect, useState} from "react";
import {getBusinessByName} from "../../BackEnd/Classes/BusinessClass";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../BackEnd/config/firebase";
import theme from "../../Theme/Theme";
import {Box, Avatar, Grid} from "@mui/material";
import StyledHamburgerButtonWithCanvas from "../../Components/Styled Components/StyledHamburgerButtonWithCanvas";
import calculateTime from "../../BackEnd/Classes/GeneralFunctions";

function showTime(arr_time) {
    let times = [];
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            times.push((arr_time[1][i][j] < 10) ? "0" + arr_time[1][i][j].toString() : arr_time[1][i][j].toString());
        }
    }

    return (
        <li key={arr_time[0]}>
            <strong>{arr_time[0]}:</strong> {times[2]}: {times[3]}, {times[0]}: {times[1]}
        </li>
    );
}

export function showBusiness(business) {
    return (
        <div>
            {/*Top Rectangle*/}
            <Box sx={{
                backgroundColor: theme.palette.primary.main,
                borderBottom: `0.5rem solid ${theme.palette.secondary.main}`
            }}>

                <Grid container spacing={5}>
                    {/*Left Side*/}
                    <Grid item xs={8.5} sx={{textAlign: 'left'}}>
                        <h2>{business.name}</h2>
                        rating num: {business.getRating()} total ratings: {business.rating[1]}
                        <p></p>
                        categories: {business.type.map((category) =>
                        <li key={category}> {category} </li>)}
                        <p></p>
                        address: {business.address}
                        <p></p>
                        Opening Hours:
                        <ul>
                            {Object.entries(business.openingHours).map(([key, value]) => (
                                showTime([key, value])
                            ))}
                        </ul>

                    </Grid>
                    {/*Right Side*/}
                    <Grid item xs={3} sx={{textAlign: 'right'}}>
                        {
                            (business.profile_pic === "") ?
                                (<Avatar alt={business.name}
                                         sx={{
                                             width: 60, height: 60, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.50)',
                                             bgcolor: 'white'
                                         }}/>)
                                :
                                (<Avatar alt={business.name}
                                         src={business.profilePic}
                                    // src={require('../../databases/businessPhotos/' + business.id + '/profile.jpg')}
                                         sx={{
                                             width: 60, height: 60, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.50)',
                                             bgcolor: 'white'
                                         }}/>)
                        }
                    </Grid>
                </Grid>

            </Box>
            {/*Lower Part*/}
            <ul>
                FootPrints:
                {business.footprints.map((footprint) =>
                <li key={footprint.id}>
                    footprint id: {footprint.userID}
                    {/*footprint time: {footprint.timestamp}*/}
                    footprint time: {calculateTime(footprint.timestamp.toDate())}
                </li>
                )}
            </ul>

            <ul>
                Reviews:
                {business.reviews.map((review) =>
                    <li key={review.userID}>
                        userID: {review.userID},
                        content: {review.content},
                        rating: {review.rating},
                        footprint time: {calculateTime(review.timestamp.toDate())}
                    </li>
                )}

            </ul>
        </div>
    );
}

export default function BusinessPage() {

    const location = useLocation()
    const check_null = location.state === null;
    let {from} = (check_null === true) ? null : location.state;
    let [business, setBusiness] = useState("");
    useEffect(() => {
        if (check_null !== true) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    getBusinessByName(from).then((business_) => {
                        setBusiness(business_)
                    });
                }
            });
        }

    }, []);

    return (
        <div>
            <Box sx={{
                display: "flex",
                backgroundColor: theme.palette.primary.main,
            }}>
                <StyledHamburgerButtonWithCanvas/>
            </Box>
            {(business === "") ?
                (<div> Can't find business! </div>) :
                (<div> {showBusiness(business)} </div>)}
        </div>);
}