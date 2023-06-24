import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import theme from "../../Theme/Theme";
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import StyledFootprintForUser from "../../Components/Styled Components/StyledFootprintForUser";
import StyledReviewForUser from "../../Components/Styled Components/StyledReviewForUser";
import StyledDropdownCircleOptions from "../../Components/Styled Components/StyledDropdownCircleOptions";
import User from "../../BackEnd/Classes/UserClass";
import {StyledLightCircleBox} from "../../Components/Styled Components/styledComponents";


function TabPanel({ children, value, index }) {
    return (
        <Typography component="div" role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
            {value === index && (
                <Box p={0} sx={{border:"none", width: '100%',bgcolor: "white", justifyContent: "center"}}>
                    {children}
                </Box>
            )}
        </Typography>
    );
}

function sortByTime(ReviewA, ReviewB)
{
    return ReviewA.timestamp - ReviewB.timestamp;
}

export default function StyledProfileTabs({ user }) {
    const Footprints = user.getUserFootprints().sort(sortByTime);
    const Reviews = user.getUserReviews().sort(sortByTime);
    const [value, setValue] = useState(0);
    const CirclesList = [User.ListOfCirclesSchools, User.ListOfCirclesNeighborhoods, User.ListOfCirclesPersonalities];
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box sx={{ direction: "row", width: '100%', bgcolor: theme.palette.primary.main, justifyContent: "center",
            border: "none",}}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                variant="fullWidth"
            >
                <Tab label="Circles" id="tab-0" />
                <Tab label="Footprints" id="tab-1" />
                <Tab label="Reviews" id="tab-2" />
            </Tabs>

            <TabPanel value={value} index={0}>
                {/* Render content for the "Circles" tab */}
                <Stack direction="column" spacing={2} marginTop="0.5rem" display="flex">
                    {/*<StyledDropdownCircleOptions user={user} index={0} circlesList={User.ListOfCirclesSchools}/>*/}
                    {user.getCircles().map((circle, index) => (
                        <Box key={circle} sx={{justifyContent:"center", display:"flex", marginTop:"2rem"}}>
                            <StyledDropdownCircleOptions user={user} index={index} circlesList={CirclesList[index]}/>
                            {/*<StyledLightCircleBox>*/}
                            {/*    <Typography variant="h4" color="black">*/}
                            {/*        {circle} {index}*/}
                            {/*    </Typography>*/}
                            {/*</StyledLightCircleBox>*/}
                        </Box>
                    ))}
                </Stack>
            </TabPanel>

            <TabPanel value={value} index={1}>
                {/* Render content for the "Footprints" tab */}
                <Stack direction="column" spacing={2} justifyContent="center" marginTop="0.5rem" display="flex">
                <List >
                    {Footprints.map((footprint) => (
                        <ListItem key={footprint.businessID} sx={{justifyContent: "center"}}>
                            <StyledFootprintForUser
                                businessPhoto={user.getPic()}
                                userPhoto={footprint.businessPhoto}
                                timestamp={footprint.timestamp.toDate()}
                                BigName={footprint.businessName}
                            />
                        </ListItem>
                    ))}
                </List>
                </Stack>
            </TabPanel>

            <TabPanel value={value} index={2}>
                {/* Render content for the "Reviews" tab */}
                <Stack direction="column" spacing={2} justifyContent="center" marginTop="0.5rem" display="flex">
                <List>
                    {Reviews.map((review) => (
                        <ListItem key={review.businessID} sx={{justifyContent: "center"}}>
                            <StyledReviewForUser
                                BusinessName={review.businessName}
                                review={review.content}
                                businessPhoto={review.businessPhoto}
                                userPhoto={user.getPic()}
                                rating={review.rating}
                                timestamp={review.timestamp.toDate()}
                            />
                        </ListItem>
                    ))}
                </List>
                </Stack>
            </TabPanel>
        </Box>
    );
}

