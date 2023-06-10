// import {Outlet, Link, useLocation} from "react-router-dom";
// import {Fragment, useState} from "react";
// import './Navigation.styles.css';
// import {
//     AppBar,
//     BottomNavigation,
//     BottomNavigationAction, Grid, Input, Toolbar
// } from "@mui/material";
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
// import ResponsiveDrawer from "../../Components/Responsive Drawer/ResponsiveDrawer.component";
// import logoNew from "../../Icons/logo-all-white.png";
// import HomeIcon from '@mui/icons-material/Home';
// import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import {auth} from "../../config/firebase";

import {Outlet} from "react-router-dom";

const NavigationComponent = () => {
    // const [value, setValue] = useState(0);
    // const location = useLocation();
    //
    //
    // const isActivePage = (path) => {
    //     return location.pathname === path;
    // }
    //
    // function sendToSearch() {
    //     window.location.replace('/searchPageComponent');
    // }

    return (
        <div>
            <Outlet/>
            Nav Stuff
        </div>
        // <Fragment>
        //     {
        //         (isActivePage("/ProfilePageComponent") === true)
        //             ?
        //             (<div></div>)
        //             :
        //             (<div className="top-nav">
        //                 <AppBar style={{
        //                     top: "0",
        //                     position: "fixed",
        //                 }}>
        //                     <Toolbar>
        //                         <div className="top-menu-container">
        //                             <Grid container spacing={1}>
        //                                 <Grid item xs={2}>
        //                                     <ResponsiveDrawer/>
        //                                 </Grid>
        //                                 <Grid item xs={8}>
        //                                     <Input disabled variant="text" className="search-bar-business" sx={{
        //                                         color: 'white',
        //                                         height: {
        //                                             xs: '4rem',
        //                                             sm: '5rem',
        //                                             md: '6rem',
        //                                             lg: '7rem'
        //                                         },
        //                                         fontSize: {
        //                                             xs: '1.7rem',
        //                                             sm: '2rem',
        //                                             md: '4rem',
        //                                             lg: '5rem'
        //                                         },
        //                                     }}
        //                                            href='/SearchPageComponent' onClick={sendToSearch}
        //                                            placeholder="Search Businesses">
        //                                         Text</Input>
        //                                 </Grid>
        //                                 <Grid item xs={2}>
        //                                     <img src={logoNew} alt={logoNew} className="logo-icon"/>
        //                                 </Grid>
        //                             </Grid>
        //                         </div>
        //                     </Toolbar>
        //                 </AppBar>
        //             </div>)
        //
        //     }
        //
        //     <Outlet/>
        //     <div className="bottom-nav">
        //         <BottomNavigation
        //             showLabels
        //             value={value}
        //             onChange={(event, newValue) => {
        //                 setValue(newValue);
        //             }}
        //             sx={{
        //                 height: {
        //                     xs: "5rem",
        //                     sm: "7rem"
        //                 }
        //             }}
        //         >
        //             <BottomNavigationAction
        //                 component={Link} to="/" label="Home" icon={<HomeIcon
        //                 sx={{
        //                     fontSize: {
        //                         xs: "3rem",
        //                         sm: "5rem"
        //                     }
        //                 }}
        //             />
        //             }/>
        //             <BottomNavigationAction component={Link} to="/CommunityComponent" label="Circle"
        //                                     icon={<SupervisedUserCircleIcon sx={{
        //                                         fontSize: {
        //                                             xs: "3rem",
        //                                             sm: "5rem"
        //                                         }
        //                                     }}/>}/>
        //             <BottomNavigationAction component={Link} to="/AroundMeComponent" label="Around Me"
        //                                     icon={<LocationOnIcon sx={{
        //                                         fontSize: {
        //                                             xs: "3rem",
        //                                             sm: "5rem"
        //                                         }
        //                                     }}/>}/>
        //             <BottomNavigationAction component={Link} to="/NotificationsComponent" label="Notifications"
        //                                     icon={<NotificationsIcon sx={{
        //                                         fontSize: {
        //                                             xs: "3rem",
        //                                             sm: "5rem"
        //                                         }
        //                                     }}/>}/>
        //             <BottomNavigationAction component={Link} to="/ProfilePageComponent"
        //                                     state={{from: auth?.currentUser?.uid}} label="Profile"
        //                                     icon={<PersonRoundedIcon sx={{
        //                                         fontSize: {
        //                                             xs: "3rem",
        //                                             sm: "5rem"
        //                                         }
        //                                     }}/>}/>
        //         </BottomNavigation>
        //     </div>
        // </Fragment>
    )
};
export default NavigationComponent;