import {Component} from "react";
import {Typography} from "@mui/material";
import StyledHamburgerButtonWithCanvas from "../../Components/Styled Components/StyledHamburgerButtonWithCanvas";


class HomePageComponent extends Component{



    render(){
        // const position = [31.777587, 35.215094]; //[this.state.location.lat, this.state.location.lng];
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
