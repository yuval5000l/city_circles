import React, {useState} from 'react';
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
import StyledGifNothingHere from "../../Components/Styled Components/StyledGifNothingHere";


function TabPanel({children, value, index}) {
    return (
        <Typography component="div" role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
            {value === index && (
                <Box p={0} sx={{border: "none", width: '100%', bgcolor: "white", justifyContent: "center"}}>
                    {children}
                </Box>
            )}
        </Typography>
    );
}

function sortByTime(ReviewA, ReviewB) {
    return ReviewA.timestamp - ReviewB.timestamp;
}

export default function StyledProfileTabs({user}) {
    const Footprints = user.getUserFootprints().sort(sortByTime);
    const Reviews = user.getUserReviews().sort(sortByTime);
    const [value, setValue] = useState(0);
    const CirclesList = [User.ListOfCirclesSchools, User.ListOfCirclesNeighborhoods, User.ListOfCirclesPersonalities];
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Stack sx={{
            direction: "row", width: '100%', bgcolor: theme.palette.primary.main, justifyContent: "center"
        }}>
            <Box sx={{direction: "row", width: '100%', bgcolor: theme.palette.primary.main, justifyContent: "center",}}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                    variant="fullWidth"
                    TabIndicatorProps={{
                        style: {
                            height: 4, // Adjust the height of the indicator
                        },
                    }}
                >
                    <Tab label="Circles" id="tab-0" sx={{
                        fontSize: '1.2rem', // Adjust the font size
                        fontWeight: 'bold', // Adjust the font weight
                    }}/>
                    <Tab label="Footprints" id="tab-1" sx={{
                        fontSize: '1.2rem', // Adjust the font size
                        fontWeight: 'bold', // Adjust the font weight
                    }}/>
                    <Tab label="Reviews" id="tab-2" sx={{
                        fontSize: '1.2rem', // Adjust the font size
                        fontWeight: 'bold', // Adjust the font weight
                    }}/>
                </Tabs>
            </Box>
            <Box sx={{
                direction: "row", width: '100%', bgcolor: "white", justifyContent: "center",
            }}>
                <TabPanel value={value} index={0}>
                    {/* Render content for the "Circles" tab */}
                    <List sx={{marginTop: "0.5rem"}}>
                        {user.getCircles().map((circle, index) => (
                            <ListItem key={circle}
                                      sx={{justifyContent: "center", display: "flex", marginTop: "0.1rem",}}>
                                <StyledDropdownCircleOptions user={user} index={index}
                                                             circlesList={CirclesList[index]}/>
                            </ListItem>
                        ))}
                    </List>
                </TabPanel>

            <TabPanel value={value} index={1}>
                {/* Render content for the "Footprints" tab */}
                <Stack direction="column" spacing={2} justifyContent="center" display="flex">
                <List sx={{paddingTop:"unset !important", paddingBottom:"unset"}}>
                    {(Footprints.length !== 0) ?
                        (Footprints.map((footprint) => (
                        <ListItem key={footprint.businessID} sx={{justifyContent: "center", padding:"0.3rem"}}>
                            <StyledFootprintForUser
                                businessPhoto={user.getPic()}
                                userPhoto={footprint.businessPhoto}
                                timestamp={footprint.timestamp.toDate()}
                                BigName={footprint.businessName}
                            />
                        </ListItem>
                    )))
                        :
                        (<Stack direction="column">
                            <StyledGifNothingHere/>
                        </Stack>)
                    }
                </List>
                </Stack>
            </TabPanel>

            <TabPanel value={value} index={2}>
                {/* Render content for the "Reviews" tab */}
                <Stack direction="column" spacing={2} justifyContent="center" display="flex">
                <List sx={{paddingTop:"unset !important", paddingBottom:"unset"}}>
                    {(Reviews.length !== 0) ?
                        (Reviews.map((review) => (
                        <ListItem key={review.businessID} sx={{justifyContent: "center",padding:"unset"}}>
                            <StyledReviewForUser
                                userName={user.getUserName()}
                                BusinessName={review.businessName}
                                review={review.content}
                                businessPhoto={review.businessPhoto}
                                userPhoto={user.getPic()}
                                rating={review.rating}
                                timestamp={review.timestamp.toDate()}
                            />
                        </ListItem>
                    )))
                        :
                        (<Stack direction="column">
                            <Typography variant="h3">There are no reviews yet</Typography>
                            <StyledGifNothingHere/>
                        </Stack>)
                    }
                </List>
                </Stack>
            </TabPanel>
            </Box>
        </Stack>

    );
}

