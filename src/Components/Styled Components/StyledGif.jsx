import video_gif from "./Icons/video_1.gif";
import {Box} from "@mui/material";
export default function StyledGif(){
    return(
        <Box>
            <img src={video_gif} alt={video_gif} width="90%" height="auto"/>
        </Box>
    );
}