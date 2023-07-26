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
    const [isVirtualKeyboardOpen, setVirtualKeyboardOpen] = useState(false);
    // const [mobileOS, setMobileOS] = useState("");
    // function getMobileOperatingSystem() {
    //     var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    //
    //     // Windows Phone must come first because its UA also contains "Android"
    //     if (/windows phone/i.test(userAgent)) {
    //         setMobileOS("winphone");
    //         return "winphone";
    //     }
    //
    //     if (/android/i.test(userAgent)) {
    //         setMobileOS("android");
    //         return "android";
    //     }
    //
    //     // iOS detection from: http://stackoverflow.com/a/9039885/177710
    //     if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    //         setMobileOS("ios");
    //         return "ios";
    //     }
    //     setMobileOS("");
    //     return "";
    // }



    useEffect(() => {
        const handleFocus = () => setVirtualKeyboardOpen(true);
        const handleBlur = () => setVirtualKeyboardOpen(false);

        const inputElement = document.getElementById('search-bar-main'); // Replace with the ID of your input element
        // console.log(inputElement);
        if (inputElement) {
            inputElement.addEventListener('focus', handleFocus);
            inputElement.addEventListener('blur', handleBlur);
        }

        return () => {
            if (inputElement) {
                inputElement.removeEventListener('focus', handleFocus);
                inputElement.removeEventListener('blur', handleBlur);
            }
        };
    }, []);

    useEffect(() => {
        check_sign_in();
        setButtomBarValue(pageDictionary[location.pathname]);
        // getMobileOperatingSystem();

    }, [pageDictionary, location.pathname]);
    // console.log(buttomBarValue);

    const check_sign_in = () => {
        onAuthStateChanged(auth, (user) => {
            if (!user || window.location.pathname === "/SignUpPage") {
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
                    <Box sx={{width: "100%", marginTop: "4.6rem", marginBottom: "4.5rem"}}>
                        <Outlet context={[searchRes, setSearchRes, setButtomBarValue]}/>
                    </Box>
                </>
            ) : (
                <>
                    <StyledTopMenuNew setSearch={setSearchRes} setValue={setButtomBarValue}/>
                    <Box sx={{width: "100%", marginTop: "4.6rem", marginBottom: "4.5rem"}}>
                        <Outlet context={[searchRes, setSearchRes, setButtomBarValue]}/>
                    </Box>
                </>
            )}
            {(isVirtualKeyboardOpen) ? (<></>) : (<StyledBottomNavigationBar value1={buttomBarValue} setValue1={setButtomBarValue}/>)}
        </>
    )
};

export default NavigationComponent;