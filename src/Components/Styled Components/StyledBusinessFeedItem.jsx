import {Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {StyledAvatarBusinessFeed, StyledRating, StyledTypeBox} from "./styledComponents";
import React from "react";

export default function StyledBusinessFeedItem(business){
    return(
        <Box padding="0.5rem">
            <Stack direction="row" spacing={1}>
                <StyledAvatarBusinessFeed/>
                <Stack direction ="column" spacing={0.5}>
                    <Typography variant="h3">
                        business name
                    </Typography>
                    <Stack direction="row" spacing={0.5}>
                        <StyledTypeBox>
                            type
                        </StyledTypeBox>
                        <StyledTypeBox>
                            type
                        </StyledTypeBox>
                        <StyledTypeBox>
                            type
                        </StyledTypeBox>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        {/*<Typography>{business.getRating()}</Typography>*/}
                        {/*<StyledRating value={business.getRating()} />*/}
                        {/*<Typography>({business.rating[1]})</Typography>*/}
                        <Typography>4</Typography>
                        <StyledRating value={4} />
                        <Typography>(15)</Typography>
                    </Stack>



                </Stack>
            </Stack>
        </Box>
    );
}