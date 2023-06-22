import {useEffect, useState} from "react";
// import {StyledPurpleBox} from "../../Components/Styled Components/styledComponents";
import theme from "../../Theme/Theme";
import Box from "@mui/material/Box";
import StyledCirclesSearchItem from "../../Components/Styled Components/StyledCirclesSearchItem";
import {Stack} from "@mui/material";
import StyledDropdownMenuSortBy from "../../Components/Styled Components/StyledDropdownMenuSortBy";
import StyledDropdownMenuFilter from "../../Components/Styled Components/StyledDropdownMenuFilter";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../BackEnd/config/firebase";
import {getUserById} from "../../BackEnd/Classes/UserClass";
import {useOutletContext} from "react-router-dom";
import Business from "../../BackEnd/Classes/BusinessClass";
import StyledBusinessFeedItem from "../../Components/Styled Components/StyledBusinessFeedItem";
import StyledFootprintForUser from "../../Components/Styled Components/StyledFootprintForUser";
import StyledReviewForUser from "../../Components/Styled Components/StyledReviewForUser";



function BigFilter({lstBusiness, circles, searchRes, businessType, sortMethod})
{
    // console.log("List Business ", lstBusiness);
    // console.log("Circles ", circles);
    // console.log("search Result ",searchRes);
    // console.log("business Type ",businessType);
    // console.log("Sort Method ", sortMethod);

    function sortBy(a, b)
    {
        if (sortMethod === "Distance")
        {
            return a.getSumFootprintsAndReviews(circles) - b.getSumFootprintsAndReviews(circles);;
        }
        return a.getSumFootprintsAndReviews(circles) - b.getSumFootprintsAndReviews(circles);
    }

    function checkCircles(business)
    {
        // return business.getCirclesCount()[circles[0]] > 0;
        return (circles.length === 0) || circles.some(circle => business.getCirclesCount()[circle] > 0); // Checks if there is at least 1 circle relevant
    }

    // Check if this business has any reviews in the relevant circle(s)
    const firstLayerFilter = lstBusiness.filter(checkCircles);

    let secondLayerFilter = firstLayerFilter.filter(business =>
    {
        return (businessType === "")|| (business.getBusinessType().includes(businessType));
    });
    // console.log("second Layer Sort", secondLayerFilter);

    let thirdLayerSort = secondLayerFilter.sort(sortBy);
    // console.log("third Layer Sort", thirdLayerSort);

    let searchLayerFilter = thirdLayerSort.filter(business => (business.name.toLowerCase()).includes(searchRes.toLowerCase()));
    // console.log("search Layer Filter", searchLayerFilter);
    return (
        <>
            {(searchLayerFilter === []) ? (<></>) : (searchLayerFilter.map(filteredBusiness =>
            (
                <li key={filteredBusiness.name}>
                    <StyledBusinessFeedItem business={filteredBusiness}/>
                </li>
            )))}
        </>
    );
}

const CirclesPageComponent = () => {
    const [searchRes, setSearchRes, setButtomBarValue] = useOutletContext();

    const [user, setUser] = useState(null);

    const [lstBusiness, setLstBusiness] = useState([]);

    const [circleButtons, setCircleButtons] = useState([false, false, false]);
    const [circlesFilter, setCirclesFilter] = useState([]); // Filters by circles, first filter
    // const [labelFilter, setLabelFilter] = useState([]); // Filter by labels, second filter (empty list if null)
    const [sortMethod, setSortMethod]  = useState(""); // Sort by Footprints or Distance (empty string if null)
    const [filterTypeBusiness, setFilterTypeBusiness] = useState(""); // Filters by the type of business (empty string if null)
    // console.log(filterTypeBusiness);

    useEffect(() => {
        getUser();
        getBusinesses();
    }, []);

    const getBusinesses = ()=> {
        Business.getAllBusinesses().then((lst) => {
            setLstBusiness(lst);
            // console.log(lstBusiness);
        }).catch((error) => {
            console.error(error);
        });
    }
    const getUser = () => {
        onAuthStateChanged(auth, (usery) => {
            if (usery) {
                getUserById(auth?.currentUser?.uid).then((useryy) => {
                    setUser(useryy);
                }).catch((error) => {
                    console.error(error);
                });
            }
        });
    };

    function CircleClicked(num)
    {   function inner()
        {
            let tempList = [];
            let tempList2 = circleButtons;
            tempList2[num] = !tempList2[num];
            setCircleButtons(tempList2);
            for (let i = 0; i < 3; i++)
            {
                if (circleButtons[i]){ tempList.push(user.getCircles()[i]);}
            }
            setCirclesFilter(tempList);
        }
        return inner;
    }
    // console.log(lstBusiness[0].getReviews()[0].rating);
        // const position = [31.777587, 35.215094]; //[this.state.location.lat, this.state.location.lng];
        return (
            <>
                <Box sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderBottom: `0.5rem solid ${theme.palette.secondary.main}`,
                }}>
                    <Stack direction="column" spacing={1} alignItems="center" justifyContent="center">
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" padding="0.4rem">
                            <StyledCirclesSearchItem name={(user === null) ? ("Circle1") : (user.getCircles()[0])} checkFunction={CircleClicked(0)}/>
                            <StyledCirclesSearchItem name={(user === null) ? ("Circle2") : (user.getCircles()[1])} checkFunction={CircleClicked(1)}/>
                            <StyledCirclesSearchItem name={(user === null) ? ("Circle3") : (user.getCircles()[2])} checkFunction={CircleClicked(2)}/>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" padding="0.4rem" >
                            <StyledDropdownMenuSortBy setSortMethod={setSortMethod}/>
                            <StyledDropdownMenuFilter setFilterMethod={setFilterTypeBusiness}/>
                        </Stack>
                    </Stack>
                </Box>
                <BigFilter lstBusiness={lstBusiness} circles={circlesFilter}
                           searchRes={searchRes} businessType={filterTypeBusiness} sortMethod={sortMethod}/>
                {(lstBusiness !== undefined && lstBusiness[0] !== undefined) ? (<StyledReviewForUser BusinessName={lstBusiness[0].getReviews()[0].userName}
                                                                     review={lstBusiness[0].getReviews()[0].content}
                                                                     businessPhoto={lstBusiness[0].getProfilePic()}
                                                                     userPhoto={lstBusiness[0].getReviews()[0].userPhoto}
                                                                     rating={lstBusiness[0].getReviews()[0].rating}/>)
                :(<></>)}
                {/*<StyledFootprintForUser/>*/}

                {/*<StyledBusinessFeedItem/>*/}


            </>
        );

}

export default CirclesPageComponent;
