
import {Outlet} from "react-router-dom";
import StyledTopMenuNew from "../../Components/Styled Components/StyledTopMenuNew";
import StyledBottomNavigationBar from "../../Components/Styled Components/StyledBottomNavigationBar";
import Box from "@mui/material/Box";
import {auth} from "../../BackEnd/config/firebase"
import {onAuthStateChanged} from  "firebase/auth";
import {useEffect} from "react";
const NavigationComponent = () => {



    useEffect(() => {
        check_sign_in();
    }, []);

    const check_sign_in = () => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                window.location.replace("/signInPage");
            }
        });
    };

    return (
        <div>
            <StyledTopMenuNew/>
            <Box sx={{marginTop:"6.5rem", marginBottom:"4.5rem"}}>
                <Outlet/>
            </Box>
            <StyledBottomNavigationBar/>
        </div>

    )
};
export default NavigationComponent;