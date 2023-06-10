import {StyledLogoBox, StyledSmallLogoBox} from "./styledComponents";
import CityCircleLogo from "./Icons/logo-new.png";


export function StyledLogoLogIn () {

    return(
        <StyledLogoBox>
            <img src={CityCircleLogo} alt="logo" width="130rem" height="130rem" />
        </StyledLogoBox>
    )

}

export function CityCircleSmallLogoLogIn () {

    return(
        <StyledSmallLogoBox>
            <img src={CityCircleLogo} alt="logo" width="80rem" height="80rem" />
        </StyledSmallLogoBox>
    )

}