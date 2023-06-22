import React, { useState } from 'react';
import {Tabs, Tab, Typography, Box, ListItem, List} from '@mui/material';
import StyledFeedItem from "../../Components/Styled Components/StyledFeedItem";
import calculateTime from "../../BackEnd/Classes/GeneralFunctions";
import StyledFootprintForUser from "../../Components/Styled Components/StyledFootprintForUser";

function TabPanel({ children, value, index }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

export default function StyledBusinessTabs({business}) {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Tabs value={value} onChange={handleChange} aria-label="tabs" variant="fullWidth">
                <Tab label="Footprints" id="tab-0" />
                <Tab label="Reviews" id="tab-1" />
            </Tabs>

            <TabPanel value={value} index={0}>
                <List>
                    {business.footprints.map((footprint) =>
                        <StyledFootprintForUser
                            businessPhoto= {business.getProfilePic()}
                            userPhoto={footprint.userPhoto}
                            timestamp={footprint.timestamp.toDate()}
                            BigName={footprint.userName}
                            key={footprint.userID}>
                        </StyledFootprintForUser>)
                    }
                </List>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <Typography variant="h6">Reviews List</Typography>
                <List spacing={8}>

                {business.reviews.map((review) =>
                        <ListItem key={review.userID}>
                            userID: {review.userID % 10}, <br></br>
                            content: {review.content}, <br></br>
                            rating: {review.rating}, <br></br>
                            time: {calculateTime(review.timestamp.toDate())}
                        </ListItem>
                    )}
                </List>
            </TabPanel>

        </div>
    );
}
