import React, {useState} from 'react';
import {Tabs, Tab, Box, ListItem, List, Stack} from '@mui/material';
// import calculateTime from "../../BackEnd/Classes/GeneralFunctions";
import StyledFootprintForUser from "../../Components/Styled Components/StyledFootprintForUser";
import StyledReviewForUser from "../../Components/Styled Components/StyledReviewForUser";
import StyledGif from "../../Components/Styled Components/StyledGif";
import Typography from "@mui/material/Typography";

function TabPanel({children, value, index}) {
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
                <Tab sx={{fontSize:"20px"}} label="Footprints" id="tab-0"/>
                <Tab sx={{fontSize:"20px"}} label="Reviews" id="tab-1"/>
            </Tabs>

            <TabPanel value={value} index={0} >
                <List sx={{paddingTop:"unset", paddingBottom:"unset"}}>
                    {(business.footprints.length !== 0) ?
                        (business.footprints.map((footprint) =>
                        <ListItem sx={{padding:"unset !important"}} key={footprint.userID}>
                            <StyledFootprintForUser
                                businessPhoto={business.getProfilePic()}
                                userPhoto={footprint.userPhoto}
                                timestamp={footprint.timestamp.toDate()}
                                BigName={footprint.userName}>
                            </StyledFootprintForUser>
                        </ListItem>))
                        :
                        (<Stack direction="column">
                            <Typography variant="h3">There are no footprints yet</Typography>
                                <StyledGif/>
                        </Stack>)
                    }
                </List>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <List sx={{paddingTop:"unset !important", paddingBottom:"unset"}}>
                    {(business.reviews.length !== 0) ?
                        (business.reviews.map((review) =>
                        <ListItem sx={{padding:"unset !important"}} key={review.userID}>
                            <StyledReviewForUser BusinessName={review.userName} reviewContent={review.content}
                                                 businessPhoto={review.userPhoto} userPhoto={business.getProfilePic()}
                                                 rating={review.rating} timestamp={review.timestamp.toDate()} />
                            {/*userID: {review.userID % 10}, <br></br>*/}
                            {/*content: {review.content}, <br></br>*/}
                            {/*rating: {review.rating}, <br></br>*/}
                            {/*time: {calculateTime(review.timestamp.toDate())}*/}
                        </ListItem>
                    ))
                        :
                        (<Stack direction="column">
                            <Typography variant="h3">There are no reviews yet</Typography>
                            <StyledGif/>
                        </Stack>)
                    }
                </List>
            </TabPanel>

        </div>
    );
}
