import {Outlet, useLocation} from "react-router-dom";
import StyledTopMenuNew from "../../Components/Styled Components/StyledTopMenuNew";
import StyledBottomNavigationBar from "../../Components/Styled Components/StyledBottomNavigationBar";
import Box from "@mui/material/Box";
import {auth} from "../../BackEnd/config/firebase"
import {onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";
import StyledTopBackMenu from "../../Components/Styled Components/StyledTopBackMenu";

const NavigationComponent = () => {
    const location = useLocation();
    let pageDictionary;
    pageDictionary = {
        '/': 0, '/CirclesPageComponent': 1,
        '/FeedPageComponent': 2
    };
    const [searchRes, setSearchRes] = useState("");
    const [buttomBarValue, setButtomBarValue] = useState(0); // For BottomBarChosenThingy


    useEffect(() => {
        check_sign_in();
        setButtomBarValue(pageDictionary[location.pathname]);

    },[pageDictionary, location.pathname]);
    // console.log(buttomBarValue);

    const check_sign_in = () => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                window.location.replace("/signInPage");
            }
        });
    };

    return (
        <>
            {/* todo: make this a styled component */}
            {window.location.pathname === "/ProfilePageComponent" ? (
                <>
                    <StyledTopBackMenu/>
                    <Outlet context={[searchRes, setSearchRes, setButtomBarValue]}/>
                </>
            ) : (
                <>
                    <StyledTopMenuNew setSearch={setSearchRes} setValue={setButtomBarValue}/>
                    <Box sx={{width:"100%", marginTop: "4.6rem", marginBottom: "4.5rem"}}>
                        <Outlet context={[searchRes, setSearchRes, setButtomBarValue]}/>
                    </Box>
                </>
            )}
            <StyledBottomNavigationBar value1={buttomBarValue} setValue1={setButtomBarValue}/>
        </>
    )
};

    export default NavigationComponent;