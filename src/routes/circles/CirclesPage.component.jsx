import {useEffect, useState} from "react";
// import {StyledPurpleBox} from "../../Components/Styled Components/styledComponents";
import theme from "../../Theme/Theme";
import Box from "@mui/material/Box";
import StyledCirclesSearchItem from "../../Components/Styled Components/StyledCirclesSearchItem";
import {ListItem, Stack} from "@mui/material";
import StyledDropdownMenuSortBy from "../../Components/Styled Components/StyledDropdownMenuSortBy";
import StyledDropdownMenuFilter from "../../Components/Styled Components/StyledDropdownMenuFilter";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../BackEnd/config/firebase";
import {getUserById} from "../../BackEnd/Classes/UserClass";
import {useOutletContext} from "react-router-dom";
import Business from "../../BackEnd/Classes/BusinessClass";
import StyledBusinessFeedItem from "../../Components/Styled Components/StyledBusinessFeedItem";
import StyledGifLoading from "../../Components/Styled Components/StyledGifLoading";


function BigFilter({lstBusiness, circles, searchRes, businessType, sortMethod}) {
    // console.log("List Business ", lstBusiness);
    // console.log("Circles ", circles);
    // console.log("search Result ",searchRes);
    // console.log("business Type ",businessType);
    // console.log("Sort Method ", sortMethod);

    function sortBy(a, b) {
        if (sortMethod === "Rating") {
            return b.getRatingCircles(circles) - a.getRatingCircles(circles);
        } else if (sortMethod === "Footprints") {
            // Don't count the same user twice, Count how many people rated this business

            return b.getAllUsersThatUsedService(circles) - a.getAllUsersThatUsedService(circles);
        }
        return 0;
    }

    function checkCircles(business) {

        // return business.getCirclesCount()[circles[0]] > 0;
        return (circles.length === 0) || circles.every(circle => business.getCirclesCount()[circle] > 0); // Checks if there is at least 1 circle relevant
    }

    // Check if this business has any reviews in the relevant circle(s)
    const firstLayerFilter = lstBusiness.filter(checkCircles);

    let secondLayerFilter = firstLayerFilter.filter(business => {
        return (businessType === "") || (business.getBusinessType().includes(businessType));
    });
    // console.log("second Layer Sort", secondLayerFilter);

    let thirdLayerSort = secondLayerFilter.sort(sortBy);
    // console.log("third Layer Sort", thirdLayerSort);

    let searchLayerFilter = thirdLayerSort.filter(business => (business.name.toLowerCase()).includes(searchRes.toLowerCase()));
    // console.log("search Layer Filter", searchLayerFilter);
    return (
        <>
            {(searchLayerFilter === []) ? (<></>) : (searchLayerFilter.map((filteredBusiness, index) =>
                (
                    <ListItem sx={{padding: "unset!important"}} width="100%"
                              key={filteredBusiness.name + index.toString()}>
                        <StyledBusinessFeedItem business={filteredBusiness}/>
                    </ListItem>
                )))}
        </>
    );
}

const CirclesPageComponent = () => {
    const [searchRes] = useOutletContext();

    const [user, setUser] = useState(null);

    const [lstBusiness, setLstBusiness] = useState([]);

    const [circleButtons, setCircleButtons] = useState([false, false, false]);
    const [circlesFilter, setCirclesFilter] = useState([]); // Filters by circles, first filter
    // const [labelFilter, setLabelFilter] = useState([]); // Filter by labels, second filter (empty list if null)
    const [sortMethod, setSortMethod] = useState(""); // Sort by Footprints or Rating (empty string if null)
    const [filterTypeBusiness, setFilterTypeBusiness] = useState(""); // Filters by the type of business (empty string if null)
    // console.log(filterTypeBusiness);

    useEffect(() => {
        getUser();
        getBusinesses();
    }, []);

    const getBusinesses = () => {
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

    function CircleClicked(num) {
        function inner() {
            let tempList = [];
            let tempList2 = circleButtons;
            tempList2[num] = !tempList2[num];
            setCircleButtons(tempList2);
            for (let i = 0; i < user.getCircles().length; i++) {
                if (circleButtons[i]) {
                    tempList.push(user.getCircles()[i]);
                }
            }
            setCirclesFilter(tempList);
        }

        return inner;
    }

    // console.log(lstBusiness[0].getReviews()[0].rating);
    // const position = [31.777587, 35.215094]; //[this.state.location.lat, this.state.location.lng];
    return (<>
        {(lstBusiness === [] || user === null)
            ?
            (<StyledGifLoading/>)
            :
            (<>
                    <Box sx={{
                        backgroundColor: theme.palette.primary.main,
                        borderBottom: `0.3rem solid ${theme.palette.secondary.main}`,
                        width: '100%',
                        display: 'inline-block',
                        paddingBottom: "0.4rem",
                    }}>
                        <Stack direction="column" spacing={1} alignItems="center" justifyContent="center">
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center"
                                   paddingTop="0.65rem">
                                <>
                                    {
                                        user.getCircles().map((circle, index) =>
                                            // <ListItem sx={{padding: "unset!important"}} width="100%" key={user.getCircles()[index]+index.toString()}
                                            <div key={user.getCircles()[index] + index.toString()}>
                                                <StyledCirclesSearchItem name={user.getCircles()[index]}
                                                                         checkFunction={CircleClicked(index)}/>
                                            </div>
                                        //</ListItem>
                                        )}
                                </>
                            </Stack>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center"
                                   padding="0.4rem">
                                <StyledDropdownMenuSortBy setSortMethod={setSortMethod}/>
                                <StyledDropdownMenuFilter setFilterMethod={setFilterTypeBusiness}/>
                            </Stack>
                        </Stack>
                    </Box>
                    <BigFilter lstBusiness={lstBusiness} circles={circlesFilter}
                               searchRes={searchRes} businessType={filterTypeBusiness} sortMethod={sortMethod}/>


                </>
            )
        }
    </>);

}

export default CirclesPageComponent;
