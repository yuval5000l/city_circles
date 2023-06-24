import React from "react";
import {Box} from "@mui/material";
export default function calculateTime(time)
{
    // console.log(time);
    // console.log(typeof (time));
    const now = new Date();
    const timeDiff = now.getTime() - time.getTime();
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds <= 60)
    {
        return seconds.toString() + " seconds";
    }

    if (minutes <= 60)
    {
        return minutes.toString() + " minutes";
    }
    if (hours <= 23)
    {
        return hours.toString() + " hours";
    }
    return days.toString() + " days";

}

