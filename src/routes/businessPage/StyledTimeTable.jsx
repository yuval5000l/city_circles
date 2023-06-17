import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {IconButton, Stack} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function showTime(arr_time) {
    let times = [];
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            times.push((arr_time[1][i][j] < 10) ? "0" + arr_time[1][i][j].toString() : arr_time[1][i][j].toString());
        }
    }

    // return (
    //     <li key={arr_time[0]}>
    //         <strong>{arr_time[0]}:</strong> {times[2]}: {times[3]}, {times[0]}: {times[1]}
    //     </li>
    // );
    return {day: arr_time[0], hours: times[2]+": "+times[3]+", "+times[0]+": "+times[1]};
}
const StyledTimeTable = ({business}) => {
    // console.log(business);
    // console.log(business.openingHours);
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // const openingHours = [
    //     { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
    //     { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
    //     { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
    //     { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
    //     { day: 'Friday', hours: '9:00 AM - 6:00 PM' },
    //     { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    //     { day: 'Sunday', hours: 'Closed' },
    // ];
    let openingHours = [];
    for (let i =0; i < 7; i++)
    {

        openingHours.push(showTime([daysOfWeek[i], business.openingHours[daysOfWeek[i]]]));
    }
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
