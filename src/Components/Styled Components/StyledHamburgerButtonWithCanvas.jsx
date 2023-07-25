import {useEffect, useState} from "react";
import {
    Box,
    Divider, Drawer, IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Stack,
    Toolbar, Typography
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import {Link} from "react-router-dom";
import {
    StyledAvatarUserCanvas,
    StyledHamburgerButton
} from "./styledComponents";
import theme from "../../Theme/Theme";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "../../BackEnd/config/firebase";
import {getUserById} from "../../BackEnd/Classes/UserClass";
import PersonIcon from "@mui/icons-material/Person";
// import BusinessRegistration1 from "../../routes/business_registratin_pages/BusinessRegistrationPage1";


const drawerWidth = '60%';

function ResponsiveDrawer(props) {
    let [name, setName] = useState("static name");
    let [userPic, setUserPic] = useState("")

    useEffect(() => {
        getName()
    }, []);

    useEffect(() => {
        getPic()
    }, []);

    const getPic = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserById(auth?.currentUser?.uid).then((user) => {
                    if (user !== null) {
                        setUserPic(user.getPic());
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }
        });
    }
    const getName = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserById(auth?.currentUser?.uid).then((user) => {
                    if (user !== null) {
                        setName(user.getUserName());
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }
        });

    }

    const {window} = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }

    // TODO maybe get this function back?
    // function sendToCreateBusiness() {
    //     window.location.replace('/BusinessRegistrationPage1');
    // }

    const drawer_content = [
        {
            text: 'Add a new business',
            path: "/BusinessRegistrationStepperComponent",
            icon: <AddBoxOutlinedIcon sx={{fontSize:"2.5rem"}}/>
        },
        // {text: 'My Profile', path: "/ProfilePageComponent", icon: <PersonIcon/>, state="from: auth?.currentUser?.uid" }
        // {text: 'Import Contacts', path: "/", icon: <GroupIcon/>},
        // {text: 'History', path: "/", icon: <HistoryIcon/>},
        // {text: 'All Businesses', path: "/", icon: <WorkIcon/>},
        // {text: 'Settings', path: "/", icon: <SettingsIcon/>}

    ];

    const drawer = (
        <Box sx={{
            backgroundColor: theme.palette.primary.light,
            color: "black",
            borderRight: `0.3rem solid ${theme.palette.secondary.main}`,
            height: "100%"
        }}>
            <Toolbar sx={{backgroundColor: theme.palette.primary.main, color: "white"}}>
                <Stack
                    sx={{marginLeft: "auto", marginRight: "auto", padding: "1rem"}}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >
                    <StyledAvatarUserCanvas sx={{marginLeft: "auto", marginRight: "auto"}} src={userPic}/>
                    <Typography variant="h3">{name}</Typography>
                </Stack>
            </Toolbar>
            <Divider/>
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/ProfilePageComponent" state={{from: auth?.currentUser?.uid}}
                                    onClick={handleDrawerToggle}>
                        <ListItemIcon>
                            <PersonIcon sx={{fontSize:"2.5rem"}}/>
                        </ListItemIcon>
                        <ListItemText primary="My Profile"/>
                    </ListItemButton>
                </ListItem>
                {drawer_content.map((key, index) => (
                    <ListItem key={key.text} disablePadding>
                        <ListItemButton component={Link} to={key.path} state={key.state} onClick={handleDrawerToggle}>
                            <ListItemIcon >
                                {key.icon}
                            </ListItemIcon>
                            <ListItemText primary={key.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}

                <ListItem disablePadding>
                    <ListItemButton onClick={logout}>
                        <ListItemIcon>
                            <LogoutIcon sx={{fontSize:"2.5rem"}}/>
                        </ListItemIcon>
                        <ListItemText primary='Log-Out'/>
                    </ListItemButton>
                </ListItem>

            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <Box sx={{display: 'flex'}}>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
            >
                <StyledHamburgerButton/>
            </IconButton>
            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: false, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{

                        display:
                            {
                                xs: 'none',
                                sm: 'block',
                            },
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth, display: "none"},
                    }}

                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}


export default ResponsiveDrawer;