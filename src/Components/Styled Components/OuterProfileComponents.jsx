import {styled} from "@mui/material/styles";
import {AppBar, Card, CardActionArea, CardContent, CardMedia, Container, Divider} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const SmallPurpleBox = styled(AppBar)(({ theme })=> ({
    backgroundColor:theme.palette.primary.main,
    // borderBottom:`0.65rem solid ${theme.palette.secondary.main}`,
    // position:"fixed",
    position: 'relative',
    borderRadius: 20,
    width: "90%",
    [theme.breakpoints.up('xs')]: {
        height:'10rem',
    }
}));

export const MediumPurpleBox = styled(AppBar)(({ theme })=> ({
    backgroundColor:theme.palette.primary.main,
    // borderBottom:`0.65rem solid ${theme.palette.secondary.main}`,
    // position:"fixed",
    position: 'relative',
    borderRadius: 20,
    width: "90%",
    [theme.breakpoints.up('xs')]: {
        height:'12rem',
    }
}));

export const StyledLightCircleBoxForProfile = styled(Box)(({theme}) => ({
    borderRadius: "50%",
    boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
    border: `0.2rem solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('xs')]: {
        width: "4.6rem",
        height: "4.6rem",
    }
}));


const StyledLightCircleBoxForGoToCard = styled(Box)(({theme}) => ({
    borderRadius: "50%",
    boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
    border: `0.2rem solid ${theme.palette.secondary.main}`,
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('xs')]: {
        width: "4.6rem",
        height: "4.6rem",
    }
}));


const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: 400,
}));

function BoxWithLock(){

    return(
        <Box sx={{position: "relative",bgcolor: "white", bottom:0, width: "100%", padding: "1.5rem", borderBottomLeftRadius:25, borderBottomRightRadius:25, justifyContent: 'center',
            alignItems: 'center',
            alignSelf: "center", marginTop: "1rem"}}>
            <LockOutlinedIcon
                sx={{
                    position: "absolute",
                    top : '-1rem',
                    // margin: "auto",
                    // display: 'block',
                    textAlign: "center",
                    justifyContent: 'center',
                    alignItems:  'center',
                    alignSelf: "center",
                    fontSize: "2rem",
                    color: "primary.main"}}/>
        </Box>
    )
}

export function GoToCard(user) {
    const Gotos = [{businessID: 'business1'}, {businessID: 'business2'}, {businessID: 'business3'}];
    return (
        <MediumPurpleBox>
            <Stack direction="row">
            <LockOutlinedIcon sx={{height: "2.5rem", width: "2.5rem", position: "start"}}/>
            <Stack direction="row" spacing={"1rem"} justifyContent="center" alignItems="center" display="flex" alignContent="center">
            {Gotos.map(goto =>
                <Box sx={{bgcolor: "info.light", paddingTop: "1rem",paddingRight:2, paddingLeft:2, borderRadius: 3, borderColor: "primary.main", border: 3}}>
                <Stack direction="column" spcing={"0.5rem"} justifyContent="center" alignItems="center">
                    <Avatar src="B"/>
                    <Typography variant="h4" sx={{color: "black"}}>
                        {goto.businessID}
                    </Typography>
                    <Typography variant="h5" sx={{color: "black"}}>
                        category
                    </Typography>
                    <Typography variant="h5" sx={{color: "black"}}>
                        address
                    </Typography>
                    {/*{BoxWithLock()}*/}
                    <Box sx={{position: "relative",bgcolor: "white", bottom:0, width: "100%", padding: "1rem", borderBottomLeftRadius:25, borderBottomRightRadius:25, justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: "center", marginTop: "1rem"}}>
                    <LockOutlinedIcon
                    sx={{
                        // position
                        position: "absolute",
                        top : '-1rem',
                        margin: "auto",
                        display: 'flex',
                        textAlign: "center",
                        // textJustify: "center",
                        // justifyContent: 'center',
                        alignItems:  'center',
                        alignSelf: "center",
                        width: "2.5rem",
                        height: "2.5rem",
                    // fontSize: "1rem",
                    color: "primary.main"}}/>
                    </Box>
                </Stack>
                </Box>
            )}
            </Stack>
            </Stack>
        </MediumPurpleBox>
        // <Container sx={{flexWrap: "wrap", display: "flex", m: 1, justifyContent: "center", alignItems: "center"}}>
        //     {Gotos.map(goto =>
        //         // <Link to={'../BusinessPageComponent'} state={{ from: businesses.id}}
        //             // className="link-container"
        //         // >
        //
        //             <Card sx={{ maxWidth: 345, m: 2, width: 300 }}>
        //                 <CardActionArea>
        //                     <CardMedia
        //                         component="img"
        //                         height="140"
        //                         src={'B'}
        //                         // src={`https://robohash.org/${businesses.id}?set=set2&size=180x180`}
        //                         // alt={businesses.name}
        //                     />
        //                     <CardContent>
        //                         <Typography gutterBottom variant="h5" component="div">
        //                             {goto.businessID}
        //                         </Typography>
        //                         <Typography variant="body2" color="text.secondary">
        //                             {/*{businesses.title}*/}
        //                         </Typography>
        //                     </CardContent>
        //                 </CardActionArea>
        //             </Card>
        //         // </Link>
        //     )}
        //
        // </Container>
        //
        //
        // //
        // // <Box sx={{flexGrow: 1, overflow: 'hidden', px: 3}}>
        // //     {Gotos.map(goto =>
        // //         // <Link to={'/BusinessPage'} state={{from: businesses.id}} className="link-container">
        // //             <Item
        // //                 sx={{
        // //                     my: 1,
        // //                     mx: 'auto',
        // //                     p: 2,
        // //                 }}>
        // //                 <Stack spacing={2} direction="row" alignItems="center">
        // //                     <Avatar />
        // //                     {/*<BusinessAvatar business={{*/}
        // //                     {/*    "name": businesses.name,*/}
        // //                     {/*    "id": businesses.id,*/}
        // //                     {/*    "profile_img": businesses.profile_img,*/}
        // //                     {/*    "size": true*/}
        // //                     {/*}}/>*/}
        // //
        // //                     <Stack spacing={2} direction="column" alignItems="start">
        // //                         <Typography variant="h5" display="flex" flexWrap="wrap"
        // //                                     textAlign="left">{goto.businessID}</Typography>
        // //                         {/*<Typography variant="h6" noWrap>{businesses.title}</Typography>*/}
        // //                         {/*<Typography variant="h7" noWrap>{businesses.address} meters from your location</Typography>*/}
        // //
        // //                     </Stack>
        // //
        // //                 </Stack>
        // //             </Item>
        // //         // </Link>
        // //     )};
        // //
        // // </Box>
    );
}
