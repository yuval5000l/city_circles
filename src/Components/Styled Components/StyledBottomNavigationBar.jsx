import {StyledBottomNavigation, StyledBottomNavigationAction} from "./styledComponents";
import {Link} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import StyledBottomNavigationPlus from "./StyledBottomNavigationPlus";



export default function StyledBottomNavigationBar() {
    return (
        <StyledBottomNavigation
            showLabels
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
            <StyledBottomNavigationAction component={Link} to="/" label="circles" icon={<SupervisedUserCircleIcon
                sx={{
                    fontSize: {
                        xs: "3rem",
                        sm: "5rem"
                    }
                }}
            />}
            />
            <StyledBottomNavigationPlus/>
            <StyledBottomNavigationAction component={Link} to="/" label="friends" icon={<GroupIcon
                sx={{
                    fontSize: {
                        xs: "3rem",
                        sm: "5rem"
                    }
                }}
            />}
            />
            <StyledBottomNavigationAction component={Link} to="/" label="profile" icon={<PersonIcon
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