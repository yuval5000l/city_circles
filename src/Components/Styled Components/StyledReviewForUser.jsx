import {Stack, Typography,Box} from "@mui/material";
import StyledAvatarWithBadge from "./StyledAvatarWithBadge";
import {StyledRating} from "./styledComponents";
import React from "react";
import StyledGrayButtonFullReview from "./StyledGrayButtonFullReview";
import calculateTime from "../../BackEnd/Classes/GeneralFunctions";

export default function StyledReviewForUser({BusinessName, reviewContent, businessPhoto, userPhoto, rating, timestamp}) {
    // const review = "erspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor"
    const cutText = (reviewContent ?? "").slice(0, 30) + (reviewContent?.length > 30 ? "..." : "");
    return (
        <Box>
                <Stack direction="row" justifyContent="flex-start" spacing={2} padding="0.5rem" sx={{padding:"0.4rem", boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', borderBottom: '0.1rem solid #C3ED5B'}}>
                    <Box>
                        <StyledAvatarWithBadge bigPhoto={businessPhoto} smallPhoto={userPhoto}/>
                    </Box>
                    <Stack direction="column" spacing={1} justifyContent="flex-start">
                        <Typography variant="h3" textAlign="left !important">
                            {BusinessName}
                        </Typography>
                        <cite >
                            "{cutText}"
                        </cite>
                        <Typography variant="h5" textAlign="left">
                            {calculateTime(timestamp)}
                        </Typography>
                        <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="center">
                            <Typography>{rating[0]}</Typography>
                            <StyledRating value={rating[0]} readOnly/>
                            <Typography>{rating[1]}</Typography>
                            <StyledGrayButtonFullReview content={reviewContent}/>
                        </Stack>
                    </Stack>
                </Stack>
        </Box>
    )
        ;
}