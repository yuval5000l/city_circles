import {Component, useEffect, useState} from "react";
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




const CirclesPageComponent = () => {
    const [searchRes, setSearchRes] = useOutletContext();

    const [user, setUser] = useState(null);

    const [lstBusiness, setLstBusiness] = useState([]);

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
    // console.log(lstBusiness);
        // const position = [31.777587, 35.215094]; //[this.state.location.lat, this.state.location.lng];
        return (
            <>
                <Box sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderBottom: `0.5rem solid ${theme.palette.secondary.main}`,
                }}>
                    <Stack direction="column" spacing={1} alignItems="center" justifyContent="center">
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" padding="0.4rem">
                            <StyledCirclesSearchItem name={(user === null) ? ("Circle1") : (user.getCircles()[0])}/>
                            <StyledCirclesSearchItem name={(user === null) ? ("Circle2") : (user.getCircles()[1])}/>
                            <StyledCirclesSearchItem name={(user === null) ? ("Circle3") : (user.getCircles()[2])}/>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" padding="0.4rem" >
                            <StyledDropdownMenuSortBy/>
                            <StyledDropdownMenuFilter/>
                        </Stack>

                    </Stack>
                </Box>
                <StyledBusinessFeedItem/>
                {(lstBusiness === []) ? (<></>) : (lstBusiness.filter(business => (business.name.toLowerCase()).
                includes(searchRes.toLowerCase())).
                map(filteredBusiness =>
                    (
                        <li key={filteredBusiness.name}>
                            {filteredBusiness.name}
                        </li>
                    )))}
            </>
        );

}

export default CirclesPageComponent;
