import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {IconButton, Stack} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const StyledTimeTable = (business) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const openingHours = [
        { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
        { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
        { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
        { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
        { day: 'Friday', hours: '9:00 AM - 6:00 PM' },
        { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
        { day: 'Sunday', hours: 'Closed' },
    ];

    return (
        <Box>
            <Box display="flex" alignItems="center">
                <Typography variant="h4">Opening Hours</Typography>
                <IconButton onClick={handleToggle} color="white">
                    <ExpandMoreIcon  style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </IconButton>
            </Box>
            {isOpen && (
                <Stack direction="column">
                    {openingHours.map((openingHour) => (
                        <Stack direction="row" spacing={1} key={openingHour.day}  justifyContent="space-between">
                            <Typography>{openingHour.day}</Typography>
                            <Typography>{openingHour.hours}</Typography>
                        </Stack>
                    ))}
                </Stack>
            )}
        </Box>
    );
};

export default StyledTimeTable;
