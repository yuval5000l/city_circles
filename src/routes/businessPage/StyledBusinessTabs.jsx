import React, { useState } from 'react';
import {Tabs, Tab, Typography, Box, ListItem, List} from '@mui/material';
import StyledFeedItem from "../../Components/Styled Components/StyledFeedItem";
import calculateTime from "../../BackEnd/Classes/GeneralFunctions";

function TabPanel({ children, value, index }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && <Box p={3}>{children}</Box>}
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
                <Typography variant="h6">Footprints List</Typography>
                <List spacing={8}>
                    {business.footprints.map((footprint) =>
                        <ListItem>
                            id: {footprint.userID % 10}  time: {calculateTime(footprint.timestamp.toDate())}
                        </ListItem>)
                    }

                    {/*<ListItem>1</ListItem>*/}
                    {/*<ListItem>2</ListItem>*/}
                    {/*<ListItem>3</ListItem>*/}
                    {/*<ListItem>4</ListItem>*/}
                    {/*<ListItem>5</ListItem>*/}
                    {/*<ListItem>6</ListItem>*/}
                    {/*<ListItem>7</ListItem>*/}
                    {/*<ListItem>8</ListItem>*/}
                    {/*<ListItem>8</ListItem>*/}
                    {/*<ListItem>8</ListItem>*/}
                    {/*<ListItem>8</ListItem>*/}
                    {/*<ListItem>8</ListItem>*/}
                </List>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <Typography variant="h6">Reviews List</Typography>
                <List spacing={8}>

                {business.reviews.map((review) =>
                        <ListItem>
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
