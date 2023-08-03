import { StyledAvatarUserFeed} from "./styledComponents";
import {Badge} from "@mui/material";

export default function StyledProfileAvatarWithBadge({bigPhoto, smallPhoto}) {
    return (
        <Badge
            overlap="circular"
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            badgeContent={smallPhoto
                // <SmallAvatar alt="User">

                // </SmallAvatar>
            }
        >
            <StyledAvatarUserFeed sx={{width:"7rem !important", height:"7rem !important", border: `0.3rem solid #C3ED5B !important`}} alt="user" src={bigPhoto}/>
        </Badge>
    );
}