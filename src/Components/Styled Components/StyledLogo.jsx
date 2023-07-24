import logoNew from "./Icons/logo-all-white.png";
import {Box} from "@mui/material";
export default function StyledLogo(){
    const goHome = () =>{
        window.location.href = "/";
    }
    return(
        <Box padding="0.5rem">
            <img src={logoNew} alt={logoNew} width="52px" height="52px" onClick={goHome}/>
        </Box>
    );
}