import Avatar from "@mui/material/Avatar";
import {SmallAvatar, StyledAvatarUserFeed, StyledBadge} from "./styledComponents";
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
            <StyledAvatarUserFeed sx={{width:"4rem !important", height:"4rem !important"}} alt="Business" src={bigPhoto}/>
        </Badge>
    );
}
