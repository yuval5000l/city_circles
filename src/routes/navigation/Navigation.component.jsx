
import {Outlet} from "react-router-dom";
import StyledTopMenuNew from "../../Components/Styled Components/StyledTopMenuNew";
import StyledBottomNavigationBar from "../../Components/Styled Components/StyledBottomNavigationBar";
import Box from "@mui/material/Box";

const NavigationComponent = () => {

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