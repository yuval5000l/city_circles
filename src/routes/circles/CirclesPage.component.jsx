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
import {useLocation, useNavigate, useOutletContext} from "react-router-dom";
import Business from "../../BackEnd/Classes/BusinessClass";
import StyledBusinessFeedItem from "../../Components/Styled Components/StyledBusinessFeedItem";
import StyledGifLoading from "../../Components/Styled Components/StyledGifLoading";
import Joyride, {STATUS} from 'react-joyride';
import StyledGifNothingHere from "../../Components/Styled Components/StyledGifNothingHere";

function Tutorial2() {
    const [steps, setSteps] = useState([
        {
            target: '.step-1',
            content: 'This is where you search for businesses & services, filter the results and sort them',
        },
        {
            target: '.step-2',
            content: 'Here you can filter by your circles!',

        },
        {
            target: '.step-3',
            content: 'you can sort them by PEOPLE or Rating',
            placement: 'top',

        },
        {
            target: '.step-4',
            content: 'you can also filter them by business TYPE',
            placement: 'top',

        },
        {
            target: '.step-5',
            content: 'Add reviews or footprints',
            placement: 'bottom',

        },
    ]);
    let navigate = useNavigate();

    const [runTutorial, setRunTutorial] = useState(false);

    const handleJoyrideCallback = (data) => {
        const {status} = data;
        if (status === STATUS.FINISHED) {
            setRunTutorial(false);
            navigate("/", {data: false});

        }
    };
    useEffect(() => {
        setRunTutorial(true);
    }, []);
    return (<>
        <Joyride
            steps={steps}
            run={runTutorial}
            continuous={true}
            callback={handleJoyrideCallback}
            showProgress
            showButton
            // scrollToFirstStep={false}   // Automatically scroll to the first step when the tutorial starts
            // scrollToSteps={false}       // Automatically scroll to the target element of each step
            locale={{
                back: 'Back',
                next: 'Next',
                last: 'Finish',
            }}
            showSkipButton
            styles={{
                options: {
                    arrowColor: '#fff',
                    primaryColor: '#775CDF',
                    textColor: '#333',
                    overlayColor: 'rgba(0, 0, 0, 0.5)',
                    spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
                    fontSize: "20px",
                }, tooltipContainer: {
                    padding: '1px', // Customize the padding inside the messages (steps)
                },

            }}
        />
    </>);
}


function BigFilter({dictBusiness, circles, searchRes, businessType, sortMethod}){
    let [lstBusiness, setLstBusiness] = useState(Object.values(dictBusiness));
    useEffect(() => {
        setLstBusiness(Object.values(dictBusiness));
    }, [dictBusiness])
    function sortBy(a, b) {
        if (sortMethod.toLowerCase() === "rating") {
            return b.getRatingCircles(circles) - a.getRatingCircles(circles);
        } else if (sortMethod.toLowerCase() === "people") {
            // Don't count the same user twice, Count how many people rated this business

            return b.getAllUsersThatUsedService(circles) - a.getAllUsersThatUsedService(circles);
        }
        return 0;
    }

    function checkCircles(business) {

        return (circles.length === 0) || circles.every(circle => business.getCirclesCount()[circle] > 0); // Checks if there is at least 1 circle relevant
    }
    // Check if this business has any reviews in the relevant circle(s)
    let firstLayerFilter = lstBusiness.filter(checkCircles);

    let secondLayerFilter = firstLayerFilter.filter( (business) => {
        return (businessType === "") || (business.getBusinessType().includes(businessType));
    });

    let thirdLayerSort = secondLayerFilter.sort(sortBy);

    let searchLayerFilter = thirdLayerSort.filter((business) => (business.getName().toLowerCase()).includes(searchRes.toLowerCase()));
    return (
        <>
            {(searchLayerFilter.length === 0) ? (
                <StyledGifNothingHere/>) : (searchLayerFilter.map((filteredBusiness, index) =>
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
    const [searchRes, setSearchRes, setButtomBarValue, dictBusiness, lstUsers, user] = useOutletContext();

    const [circleButtons, setCircleButtons] = useState([false, false, false]);
    const [circlesFilter, setCirclesFilter] = useState([]); // Filters by circles, first filter
    const [sortMethod, setSortMethod] = useState(""); // Sort by People or Rating (empty string if null)
    const [filterTypeBusiness, setFilterTypeBusiness] = useState(""); // Filters by the type of business (empty string if null)
    const location = useLocation();
    let check_state = location.state;


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

    return (<>
        {check_state && <Tutorial2/>}
        {(Object.keys(dictBusiness).length === 0 || user === null)
            ?
            (<StyledGifLoading/>)
            :
            (<>
                    <Box className="step-1" sx={{
                        backgroundColor: theme.palette.primary.main,
                        borderBottom: `0.3rem solid ${theme.palette.secondary.main}`,
                        width: '100%',
                        display: 'inline-block',
                        paddingBottom: "0.4rem",
                    }}>

                        <Stack direction="column" spacing={1} alignItems="center" justifyContent="center">
                            <Stack className="step-2" direction="row" spacing={2} alignItems="center"
                                   justifyContent="center"
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
                                <div className="step-3"><StyledDropdownMenuSortBy className="step-3"
                                                                                  setSortMethod={setSortMethod}/></div>
                                <div className="step-4"><StyledDropdownMenuFilter className="step-4"
                                                                                  setFilterMethod={setFilterTypeBusiness}/>
                                </div>
                            </Stack>
                        </Stack>
                    </Box>
                    <BigFilter dictBusiness={dictBusiness} circles={circlesFilter}
                               searchRes={searchRes} businessType={filterTypeBusiness} sortMethod={sortMethod}/>
                </>
            )
        }
    </>);

}

export default CirclesPageComponent;
