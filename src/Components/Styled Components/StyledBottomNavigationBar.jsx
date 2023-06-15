import {StyledBottomNavigation, StyledBottomNavigationAction} from "./styledComponents";
import {Link} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import StyledBottomNavigationPlus from "./StyledBottomNavigationPlus";
import {useState} from "react";



export default function StyledBottomNavigationBar() {
    const [value, setValue] = useState(0);
    return (
        <StyledBottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <StyledBottomNavigationAction component={Link} to="/" label="Home" icon={<HomeIcon
                sx={{
                    fontSize: {
                        xs: "3rem",
                        sm: "5rem"
                    }
                }}
            />}
            />
            <StyledBottomNavigationAction component={Link} to="/CirclesPageComponent" label="circles" icon={<SupervisedUserCircleIcon
                sx={{
                    fontSize: {
                        xs: "3rem",
                        sm: "5rem"
                    }
                }}
            />}
            />
            <StyledBottomNavigationPlus/>
            <StyledBottomNavigationAction component={Link} to="/FriendsPageComponent" label="friends" icon={<GroupIcon
                sx={{
                    fontSize: {
                        xs: "3rem",
                        sm: "5rem"
                    }
                }}
            />}
            />
            <StyledBottomNavigationAction component={Link} to="/ProfilePageComponent" label="profile" icon={<PersonIcon
                sx={{
                    fontSize: {
                        xs: "3rem",
                        sm: "5rem"
                    }
                }}
            />}
            />
        </StyledBottomNavigation>
    );
}