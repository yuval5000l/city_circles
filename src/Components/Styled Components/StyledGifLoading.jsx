import video_loading_gif from "./Icons/video_loading.gif";
import {Box} from "@mui/material";
export default function StyledGifLoading(){
    return(
        <Box sx={{height:"100vh", marginTop:"4.6rem", marginBottom:"4.5rem"}} alignItems="center" justifyContent="center"       >
            <img src={video_loading_gif} alt={video_loading_gif} width="100%" height="auto"/>
        </Box>
    );
}