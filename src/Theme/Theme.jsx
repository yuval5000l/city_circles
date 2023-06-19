import {createTheme, responsiveFontSizes} from '@mui/material/styles';
import "../App.css";

let theme = createTheme({
    typography: {
        h1: {
            fontSize:"4rem",
            fontWeight: 'bold',
        },
        h2: {
            fontSize: '3rem',
            fontWeight:'medium'
        },
        h3: {
            fontSize:'2.5rem',
            fontWeight:'600'
        },
        h4:{
            fontSize:'1.5rem',
            fontWeight:'500',
        },
        h5:{
            fontSize:'1',
            fontWeight:'300',
        },
        p:{
            fontSize:'1.25rem',
            fontWeight:'400',
        },
        fontFamily:"Poppins",
        fontWeightLight: 400,
        fontWeightRegular: 600,
        fontWeightMedium: 700,
        fontWeightBold: 800,
    },
    // Customizing spacing
    // Customizing breakpoints
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    palette: {
        primary: {
            main:'#775CDF',
            light:'#F2EFFC',
            dark:'#5B45AE'
        },
        secondary: {
            main: '#C3ED5B',
        },
        info:{
            main:"#828282",
            light:"#FAFAFA",
            dark:"#000000",
        },
        // Customizing specific shades
        background: {
            default: '#FFFFFF',
        },
        // Customizing text color
        text: {
            primary: '#000000',
            secondary: '#BFBFBF',
        },
    },
    // TODO where do we use shadows and how to fix?
    shadows: Array(25).fill('none'),
    // shadows: {
    //     regular: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    //     clicked: 'inset 0px 15px 4px rgba(0, 0, 0, 0.25)',
    // },
    shape: {
        borderRadius: 10
    },
});
theme = responsiveFontSizes(theme)

export default theme
