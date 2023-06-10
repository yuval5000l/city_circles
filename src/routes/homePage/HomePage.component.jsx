import {Component} from "react";
import {Typography} from "@mui/material";
import StyledHamburgerButtonWithCanvas from "../../Components/Styled Components/StyledHamburgerButtonWithCanvas";


class HomePageComponent extends Component{



    render(){
        return(
            <div>
                <Typography>
                    Home Page
                </Typography>
                <StyledHamburgerButtonWithCanvas/>
            </div>
        );
    }
}

export default HomePageComponent;
