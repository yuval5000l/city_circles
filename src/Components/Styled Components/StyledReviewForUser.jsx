import {Stack, Typography} from "@mui/material";
import StyledAvatarWithBadge from "./StyledAvatarWithBadge";
import {StyledInfoBox, StyledRating} from "./styledComponents";
import React from "react";
import StyledGrayButtonFullReview from "./StyledGrayButtonFullReview";
import calculateTime from "../../BackEnd/Classes/GeneralFunctions";

export default function StyledReviewForUser() {
    const review = "erspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor"
    const cutText = review.slice(0, 30) + (review.length > 30 ? "..." : "");
    return (
        <box sx={{padding:"0.4rem", boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', borderBottom: '0.1rem solid #C3ED5B'}}>
                <Stack direction="row" justifyContent="flex-start" spacing={2} padding="0.5rem">
                    <box>
                        <StyledAvatarWithBadge/>
                    </box>
                    <Stack direction="column" spacing={1} justifyContent="flex-start">
                        <Typography variant="h3" textAlign="left !important">
                            Business Name
                        </Typography>
                        <cite variant="p" textAlign="left !important">
                            "{cutText}"
                        </cite>
                        <Typography variant="h5" textAlign="left">
                            22h
                        </Typography>
                        <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                            {/*<Typography>{business.getRating()}</Typography>*/}
                            {/*<StyledRating value={business.getRating()} />*/}
                            {/*<Typography>({business.rating[1]})</Typography>*/}
                            <Typography>4</Typography>
                            <StyledRating value={4}/>
                            <Typography>(15)</Typography>
                            <StyledGrayButtonFullReview/>
                        </Stack>
                    </Stack>
                </Stack>
        </box>
    )
        ;
}