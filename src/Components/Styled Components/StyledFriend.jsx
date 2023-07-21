import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import {StyledBusinessFeed} from "./styledComponents";
import theme from "../../Theme/Theme";
import {Link} from "react-router-dom";
import StyledGrayButtonVisitProfile from "./StyledGrayButtonVisitProfile";
export default function StyledFriend({ user_id, user_name = 'name', profile_photo_url = '', circles = [], setValueFunc = null }) {
    const setValueToProfile = () => {
        if ((setValueFunc !== null) && (setValueFunc!== undefined)){
            setValueFunc(4);
        }
    };
    const circlesArray = Array.isArray(circles) ? circles : [circles];
    return (
        <Box sx={{ width: '100%', padding: '0.4rem', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
            borderTop: '0.1rem solid #C3ED5B' }}>
            <Stack direction="row"  alignItems="flex-end">
                    <Stack direction="column" spacing={2} width="100%" sx={{ flex: 1 }} >
                        <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="flex-start">
                            <Typography variant="h3" textAlign="left">{user_name}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} justifyContent="flex-start" alignItems="flex-start">
                            {(profile_photo_url==="") ?
                                (<StyledBusinessFeed sx={{border: `0.1rem solid ${theme.palette.secondary.main}`}}/>) :
                                (<StyledBusinessFeed src={profile_photo_url}
                                                     sx={{border: `0.1rem solid ${theme.palette.secondary.main}`}}/>)
                            }
                            <Stack direction="column" spacing={1} >
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
                <Stack>
                <Link to="/ProfilePageComponent" state={{from: user_id} }
                      onClick={setValueToProfile}>
                    <StyledGrayButtonVisitProfile/>
                </Link>
                </Stack>
            </Stack>
        </Box>
    );
}
