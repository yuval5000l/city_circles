import {StyledCircleBox} from "./styledComponents";
import {Typography} from "@mui/material";
import theme from "../../Theme/Theme";
import {useState} from "react";

export default function StyledCirclesSearchItem({name}){
    const [isClicked, setIsClicked] = useState(false);
    const [backgroundcolor, setBGColor] = useState(theme.palette.secondary.main);
    const [boxShadow, setBoxShadow] = useState('0px 4px 4px rgba(0, 0, 0, 0.25)');
    const [color, setColor] = useState(theme.palette.primary.main);
    const[border, setBorder] = useState(`0.4rem solid ${theme.palette.primary.main}`)
    const handleClick = () => {
        setIsClicked((prevClicked) => {
            if (prevClicked) {
                setBGColor(theme.palette.secondary.main)
                setBoxShadow('0px 4px 4px rgba(0, 0, 0, 0.25)')
                setColor(theme.palette.primary.main)
                setBorder(`0.4rem solid ${theme.palette.primary.main}`)
            }
            else {
                setBGColor(theme.palette.primary.main);
                setBoxShadow("inset 0px 15px 4px rgba(0, 0, 0, 0.25)");
                setColor(theme.palette.secondary.main);
                setBorder(`0.4rem solid ${theme.palette.secondary.main}`)
            }
            return !prevClicked;
        });
    };
    // const handleClose=()=>{
    //
    // }
    return(
        <StyledCircleBox onClick = {handleClick} style={{boxShadow: boxShadow, backgroundColor:backgroundcolor,color:color,border:border,padding:"0.3rem"}} >
            <Typography variant="h5" fontWeight="700">
                {name}
            </Typography>
        </StyledCircleBox>
    );
}