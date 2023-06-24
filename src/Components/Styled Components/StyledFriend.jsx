import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import {StyledCirclesIcon} from "./styledComponents";
import {StyledBusinessFeed} from "./styledComponents";
import theme from "../../Theme/Theme";
export default function StyledFriend({ user_id, user_name = 'name', profile_photo_url = '', circles = [] }) {
    const circlesArray = Array.isArray(circles) ? circles : [circles];

    return (
        <Box sx={{ width: '100%', padding: '0.4rem', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)', borderBottom: '0.1rem solid #C3ED5B' }}>
            <Stack direction="row" spacing={1}>
                    <Stack direction="column" spacing={2} width="100%">
                        <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="flex-start">
                            <Typography variant="h3" textAlign="left">{user_name}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="flex-start">
                            <StyledBusinessFeed /> {/* Add the StyledBusinessFeed component here */}
                            <Stack direction="column" spacing={1}>
                                {circlesArray.map((circle, index) => (
                                    <Typography variant="h4" key={index}>
                                        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                                            <SupervisedUserCircleIcon sx={{ marginRight: '0.5rem',color: theme.palette.primary.main }} />
                                            {circle}
                                        </Box>
                                    </Typography>
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>
            </Stack>
        </Box>
    );
}
