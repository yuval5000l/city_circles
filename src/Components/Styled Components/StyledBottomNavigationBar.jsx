import {StyledBottomNavigation, StyledBottomNavigationAction} from "./styledComponents";
import {Link, useLocation} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import StyledBottomNavigationPlus from "./StyledBottomNavigationPlus";
import {useState} from "react";
import {auth} from "../../BackEnd/config/firebase";

export default function StyledBottomNavigationBar({value1, setValue1}) {
    const location = useLocation();
    // console.log(value1);
    // console.log(setValue1);
    // console.log(location.pathname);
    // console.log(location.pathname === '/CirclesPageComponent');
    const [value, setValue] = useState(0);
    return (
        <StyledBottomNavigation
            showLabels
            value={value1}
            onChange={(event, newValue) => {
                setValue1(newValue);
            }}
        >
            <StyledBottomNavigationAction component={Link} to="/" label="circles"
                                          icon={<SupervisedUserCircleIcon
                                              sx={{
                                                  fontSize: {
                                                      xs: "3rem",
                                                      sm: "5rem"
                                                  }
                                              }}
                                          />}
                                          selected={location.pathname === '/'}

            />
            <StyledBottomNavigationPlus />
            <StyledBottomNavigationAction component={Link} to="/FeedPageComponent" label="feed" icon={<DynamicFeedIcon
                sx={{
                    fontSize: {
                        xs: "3rem",
                        sm: "5rem"
                    }
                }}
                selected={location.pathname === '/FeedPageComponent'}
            />}
            />


            {/*<StyledBottomNavigationAction component={Link} to="/FriendsPageComponent" label="friends" icon={<GroupIcon*/}
            {/*    sx={{*/}
            {/*        fontSize: {*/}
            {/*            xs: "3rem",*/}
            {/*            sm: "5rem"*/}
            {/*        }*/}
            {/*    }}*/}
            {/*    selected={location.pathname === '/FriendsPageComponent'}*/}
            {/*/>}*/}
            {/*/>*/}

        </StyledBottomNavigation>
    );
}