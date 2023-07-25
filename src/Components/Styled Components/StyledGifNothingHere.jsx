import video_nothing_here from "./Icons/video_nothing_here_2.gif";
import {Box} from "@mui/material";
export default function StyledGifNothingHere(){
    return(
        <Box marginLeft="-40px" top="0">
            <img src={video_nothing_here} alt={video_nothing_here} width="100%" height="auto" />
        </Box>
    );
}