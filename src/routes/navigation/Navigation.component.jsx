import {Outlet, useLocation} from "react-router-dom";
import StyledTopMenuNew from "../../Components/Styled Components/StyledTopMenuNew";
import StyledBottomNavigationBar from "../../Components/Styled Components/StyledBottomNavigationBar";
import Box from "@mui/material/Box";
import {auth} from "../../BackEnd/config/firebase"
import {onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";
import theme from "../../Theme/Theme";
import StyledHamburgerButtonWithCanvas from "../../Components/Styled Components/StyledHamburgerButtonWithCanvas";
import {Stack} from "@mui/material";
import {StyledAppBarTop} from "../../Components/Styled Components/styledComponents";

const NavigationComponent = () => {
    const location = useLocation();
    const pageDictionary = {'/':0, '/CirclesPageComponent':1,
    '/FriendsPageComponent': 3, "/ProfilePageComponent": 4};
    const [searchRes, setSearchRes] = useState("");
    const [buttomBarValue, setButtomBarValue] = useState(0);


    useEffect(() => {
        check_sign_in();
        setButtomBarValue(pageDictionary[location.pathname]);

    }, []);
    console.log(buttomBarValue);

    const check_sign_in = () => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                window.location.replace("/signInPage");
            }
        });
    };

    return (
        <div>
            {/*todo make this a styled component */}
            {(window.location.pathname === "/ProfilePageComponent") ?
                (<StyledAppBarTop>
                    <Stack direction="row" alignItems="left" spacing={1} justifyContent="flex-start">
                        <Box sx={{display: "flex"}}>
                            <StyledHamburgerButtonWithCanvas/>
                        </Box></Stack></StyledAppBarTop>) :

                (<StyledTopMenuNew setSearch={setSearchRes} setValue={setButtomBarValue}/>)
            }
            <Box sx={{marginTop: "6.5rem", marginBottom: "4.5rem"}}>
                <Outlet context={[searchRes, setSearchRes]}/>
            </Box>
            <StyledBottomNavigationBar value1={buttomBarValue} setValue1={setButtomBarValue}/>
        </div>

    )
};
export default NavigationComponent;