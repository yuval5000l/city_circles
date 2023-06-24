import {styled} from "@mui/material/styles";
import {
    alpha,
    AppBar,
    Autocomplete, Badge,
    BottomNavigation, BottomNavigationAction,
    Button,
    DialogContentText,
    Input, ListItem, Menu,
    Rating,
    Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import Avatar from "@mui/material/Avatar";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import DialogTitle from "@mui/material/DialogTitle";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import {ReactComponent as FootprintsIcon} from "./Icons/footprints-svgrepo-com.svg";
import TextField from "@mui/material/TextField";

export const StyledButtonGray = styled(Button)(({theme}) => ({
    backgroundColor: theme.palette.info.light,
    color: "black",
    maxWidth:"fit-content",
    padding: '0.3rem',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '15px',
    [theme.breakpoints.up('xs')]: {
        fontSize: '0.8rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '2.5rem',
    }
}));

export const StyledButtonGreen = styled(Button)(({theme}) => ({
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.primary.dark,
    padding: '0.5rem',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '15px',
    [theme.breakpoints.up('xs')]: {
        fontSize: '0.8rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '2.5rem',
    }
}));


export const StyledAppBarTop = styled(AppBar)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    position: "fixed",
    maxWidth:"100%",
    [theme.breakpoints.up('xs')]: {
        height: '6.5rem',
    }
}));

export const StyledPurpleBox = styled(AppBar)(({ theme })=> ({
    backgroundColor:theme.palette.primary.main,
    borderBottom:`0.65rem solid ${theme.palette.secondary.main}`,
    // position:"fixed",
    [theme.breakpoints.up('xs')]: {
        height:'16rem',
    }
}));

export const StyledRotatePurpleBox = styled(AppBar)(({ theme })=> ({
    backgroundColor:theme.palette.primary.main,
    borderTop:`0.65rem solid ${theme.palette.secondary.main}`,
    // position:"fixed",
    [theme.breakpoints.up('xs')]: {
        height:'16rem',
    }
}));

export const StyledSearchBar = styled(Input)(({theme}) => ({
    backgroundColor: "white",
    color: theme.palette.info.dark,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "10px",
    padding:"0.3rem",
    [theme.breakpoints.up('xs')]: {
        height: '3rem',
    }
}));

export const StyledHamburgerButton = styled(MenuIcon)(({theme}) => ({
    color: theme.palette.secondary.main,
    [theme.breakpoints.up('xs')]: {
        fontSize: "4.5rem"
    }
}));

export const StyledBackButton = styled(ArrowBackIosOutlinedIcon)(({theme}) => ({
    color: theme.palette.secondary.main,
    [theme.breakpoints.up('xs')]: {
        fontSize: "3.8rem"
    }
}));

export const StyledCircleBox = styled(Box)(({theme}) => ({
    borderRadius: "50%",
    boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
    border: `0.65rem solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('xs')]: {
        width: "5.5rem",
        height: "5.5rem",
    }
}));

export const StyledLightCircleBox = styled(Box)(({theme}) => ({
    borderRadius: "50%",
    boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
    border: `0.65rem solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('xs')]: {
        width: "6rem",
        height: "6rem",
    }
}));

export const StyledLogoBox = styled(Box)(({ theme })=> ({
    borderRadius:"50%",
    boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
    border:`0.65rem solid ${theme.palette.secondary.main}`,
    backgroundColor:'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('xs')]:{
        width:"9.5rem",
        height:"9.5rem",
    }
}));

export const StyledSmallLogoBox = styled(Box)(({ theme })=> ({
    borderRadius:"50%",
    boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
    border:`0.65rem solid ${theme.palette.secondary.main}`,
    backgroundColor:'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('xs')]:{
        width:"5.5rem",
        height:"5.5rem",
    }
}));

export const StyledAvatarUserFeed = styled(Avatar)(({ theme })=> ({
    boxShadow : "0px 4px 4px rgba(0, 0, 0, 0.25)",
    [theme.breakpoints.up('xs')]:{
        width:"3.5rem",
        height:"3.5rem"
// export const StyledAvatarUserFeed = styled(Avatar)(({theme}) => ({
//     boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
//     [theme.breakpoints.up('xs')]: {
//         width: "2.5rem",
//         height: "2.5rem"
//     }
}}));

export const StyledAvatarBusinessFeed = styled(Avatar)(({ theme })=> ({
    boxShadow : "0px 4px 4px rgba(0, 0, 0, 0.25)",
    [theme.breakpoints.up('xs')]:{
        width:"7rem",
        height:"7rem"
    }}));
export const StyledAvatarFriendProfile = styled(Avatar)(({ theme })=> ({
    boxShadow : "0px 4px 4px rgba(0, 0, 0, 0.25)",
    border: `9px solid ${theme.palette.secondary.main}`,
    [theme.breakpoints.up('xs')]:{
        width:"7rem",
        height:"7rem"
    }}));

export const StyledSmallCirclesButton = styled(SupervisedUserCircleIcon)(({theme}) => ({
    color: theme.palette.primary.main,
    [theme.breakpoints.up('xs')]: {
        width: "1.25rem",
        height: "1.25rem"
    }
}));

export const StyledCirclesIcon = styled(SupervisedUserCircleIcon)(({theme}) => ({
    color: theme.palette.primary.main,
    [theme.breakpoints.up('xs')]: {
        width: "3rem",
        height: "3rem"
    }
}));

export const StyledBusinessFeed = styled(Avatar)(({theme}) => ({
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    [theme.breakpoints.up('xs')]: {
        width: "4.5rem",
        height: "4.5rem"
    }
}));

export const StyledRating = styled(Rating)(({theme}) => ({
    color: theme.palette.secondary.main,
    "&:hover": {
        color: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('xs')]: {}
}));

export const StyledTypographyReview = styled(Typography)(({theme}) => ({
    maxWidth: "100%",
    textAlign: "left",
    maxHeight: "3.2rem",
    textOverflow: "ellipsis",
    overflow: "hidden",
    overflowWrap: "break-word",
    variant: "p",
    "&:after": {
        content: "'...'",
        // position: 'absolute',
        // right: 0,
        // bottom: 0,
        // padding: '0 0.5em',
        // background: 'white',
    },
    [theme.breakpoints.up('xs')]: {}
}));

/*Dialog Components*/
export const StyledDialogTitle = styled(DialogTitle)(({theme}) => ({
    ...theme.typography.h1,
    color: "white",
    padding: "1rem 0.5rem",
    marginLeft: "unset !important",
    [theme.breakpoints.up('xs')]: {}
}));

export const StyledDialogReviewIcon = styled(RateReviewOutlinedIcon)(({theme}) => ({
    color: "white",
    [theme.breakpoints.up('xs')]: {
        width: "3rem",
        height: "3rem",
    }
}));

export const StyledDialogFootprintIcon = styled(FootprintsIcon)(({theme}) => ({
    color: "white",
    [theme.breakpoints.up('xs')]: {
        width: "4rem",
        height: "4rem",
    }
}));

export const StyledDialogSecondTitle = styled(DialogContentText)(({theme}) => ({
    ...theme.typography.h2,
    color: "white",
    textAlign: "left",
    [theme.breakpoints.up('xs')]: {}
}));

export const StyledDialogInputBusiness = styled(Input)(({theme}) => ({
    backgroundColor: 'white',
    ...theme.typography.p,
    color: 'gray',
    padding: '0.1rem',
    borderRadius: '15px',
    [theme.breakpoints.up('xs')]: {}
}));

export const StyledDialogTextFieldReview = styled(TextField)(({theme}) => ({
    backgroundColor: 'white',
    ...theme.typography.p,
    color: 'gray',
    padding: '0.5rem',
    width: "unset !important",
    borderRadius: '15px',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    [theme.breakpoints.up('xs')]: {}
}));

export const StyledAutoComplete = styled(Autocomplete)(({theme}) => ({
    backgroundColor: 'white',
    ...theme.typography.p,
    color: 'gray',
    padding: '0.5rem',
    borderRadius: '15px',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    [theme.breakpoints.up('xs')]: {}
}));

export const StyledBottomNavigationAction = styled(BottomNavigationAction)(({theme}) => ({

    [theme.breakpoints.up('xs')]: {
        fontSize: "3rem"
    },
    [theme.breakpoints.up('md')]: {
        fontSize: "4rem"
    }
}));

export const StyledBottomNavigation = styled(BottomNavigation)(({theme}) => ({
    position:"fixed",
    bottom:"0",
    width:"100%",
    zIndex:"2000",
    [theme.breakpoints.up('xs')]: {
        height: "4.5rem"
    },
    [theme.breakpoints.up('md')]: {
        fontSize: "5rem"
    }
}));

export const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        backgroundColor: theme.palette.primary.main,
        color:"white",
        border:`0.4rem solid ${theme.palette.secondary.main}`,
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
    },
}));

export const StyledTypeBox = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.secondary.main,
    border: `0.1rem solid ${theme.palette.info.main}`,
    width:"contain",
    color:"white",
    maxWidth:"fit-content",
    ...theme.typography.h6,
    borderRadius:"15px",
    padding:"3px",
    [theme.breakpoints.up('xs')]: {
    }
}));

export const StyledInfoBox = styled(Box)(({theme}) => ({
    backgroundColor: "white",
    border:`0.2rem solid ${theme.palette.secondary.main}`,
    width:"contain",
    color:"black",
    maxWidth:"fit-content",
    ...theme.typography.p,
    borderRadius:"15px",
    padding:"3px",
    [theme.breakpoints.up('xs')]: {
    }
}));

export const StyledGreenBorderBox = styled(Box)(({theme}) => ({
    border:`0.2rem solid ${theme.palette.secondary.main}`,
    [theme.breakpoints.up('xs')]: {
    }
}));

export const StyledBadge = styled(Badge)(({theme}) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

export const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid black`,
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid black`,
}));