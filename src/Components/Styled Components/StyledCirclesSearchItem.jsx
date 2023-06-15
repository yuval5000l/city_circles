import {StyledCircleBox} from "./styledComponents";
import {Typography} from "@mui/material";
import theme from "../../Theme/Theme";
import {useState} from "react";

export default function StyledCirclesSearchItem({name}){
    const [backgroundcolor, setBGColor] = useState(theme.palette.primary.light);
    const [boxShadow, setBoxShadow] = useState('rgba(0, 0, 0, 0.35) 0px 5px 15px');
    const [color, setColor] = useState("black");
    const handleClick = () => {
        setBGColor(theme.palette.primary.dark);
        setBoxShadow("rgba(117, 91, 222, 0.7) 0px 30px 60px -12px inset,rgba(117, 91, 222, 0.7) 0px 18px 36px -18px inset");
        setColor("white");
    }

    return(
        <StyledCircleBox onClick = {handleClick} style={{boxShadow: boxShadow, backgroundColor:backgroundcolor,color:color}}>
            <Typography variant="h4">
                {name}
            </Typography>
        </StyledCircleBox>
    );
}