import {SmallAvatar, StyledAvatarFriendProfile} from "./styledComponents";
import {Badge} from "@mui/material";

export default function StyledAvatarWithBadge({bigPhoto, smallPhoto}) {
    return (
        <Badge
            overlap="circular"
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            badgeContent={
                <SmallAvatar alt="User" src={smallPhoto} />
            }
        >
            <StyledAvatarFriendProfile sx={{width:"7rem !important", height:"7rem !important"}} alt="Business" src={bigPhoto}/>
        </Badge>
    );
}
