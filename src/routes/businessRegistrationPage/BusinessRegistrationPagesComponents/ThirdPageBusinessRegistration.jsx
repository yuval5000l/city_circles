import * as React from 'react';
import Typography from '@mui/material/Typography';
// import BasicTextFields from "./TextField.components";
import {Stack} from "@mui/material";
// import Box from '@mui/material/Box';
// import RowRadioButtonsGroup from "./FirstPageOfBusinessRegistration/RadioButton.component";
// import BusinessTypesSelection from "../BusinessTypeSelect/BusinessTypeSelect.components";
//
// import {useEffect, useState} from "react";
// import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from "firebase/firestore";
// import {auth, db, storage} from "../../config/firebase";
// import {ref, uploadBytes} from "firebase/storage";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import ToggleButton from "@mui/material/ToggleButton";
// import TextField from "@mui/material/TextField";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs from "dayjs";
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import {MobileTimePicker, TimePicker} from "@mui/x-date-pickers";
import {MultiInputTimeRangeField} from "@mui/x-date-pickers-pro";
import {uploadFile} from "../../../BackEnd/Classes/GeneralFunctionsFireBase";

function getHoursAndMinutes(day)
{
    return "start "+day[0].format("HH")+","+day[0].format("MM")+ " end " + day[1].format("HH")+","+day[1].format("MM");
    // return {"Start":[day[0].format("HH"), day[0].format("MM")],
    //     "End":[day[1].format("HH"), day[1].format("MM"),]}
}

export default function ThirdPageBusinessRegistration({onNext}) {
    const [address, setAddress] = useState("");
    const [picturePath, setPicturePath] = useState("");
    const [file, setFile] = useState(null);




    useEffect(() =>
    {
        async function foo()
        {
            if (file !== null)
            {
                await handleUploadPic();
            }
        }
        foo();
    }, [file]);

    const handleUploadPic = async () =>
    {
        uploadFile(file).then((pathy) => {
            setPicturePath(pathy);
        }).catch((error) => {
            console.error(error);
        });
    }

    const [sunday, setSunday] = React.useState(() => [
        dayjs(),
        dayjs(),
    ]);
    const [monday, setMonday] = React.useState(() => [
        dayjs(),
        dayjs(),
    ]);
    const [tuesday, setTuesday] = React.useState(() => [
        dayjs(),
        dayjs(),
    ]);
    const [wednesday, setWednesday] = React.useState(() => [
        dayjs(),
        dayjs(),
    ]);
    const [thursday, setThursday] = React.useState(() => [
        dayjs(),
        dayjs(),
    ]);
    const [friday, setFriday] = React.useState(() => [
        dayjs(),
        dayjs(),
    ]);
    const [saturday, setSaturday] = React.useState(() => [
        dayjs(),
        dayjs(),
    ]);
    const handleOnNext = () => {
        console.log(typeof(sunday));
        onNext([address, picturePath, {"Sunday": getHoursAndMinutes(sunday),
            "Monday": getHoursAndMinutes(monday), "Tuesday": getHoursAndMinutes(tuesday),
            "Wednesday": getHoursAndMinutes(wednesday), "Thursday": getHoursAndMinutes(thursday),
            "Friday": getHoursAndMinutes(friday),"Saturday": getHoursAndMinutes(saturday)}]);
    }



    return(
        <div>
            <Typography variant="h4">Details</Typography>
            <Stack direction="row">
                <LocationOnIcon sx={{fontSize: 30, alignSelf: "center"}}/>
                <Typography variant="h5">Location</Typography>
            </Stack>
            <TextField fieldname={'business location'} onChange={(e)=> setAddress(e.target.value)}/>

            <Stack direction="row">
                <AccessTimeIcon sx={{fontSize: 30, alignSelf: "center"}}/>
                <Typography variant="h5">Open Hours</Typography>
            </Stack>
            {/*<BasicTextFields fieldName={'Sunday'}/>*/}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/*<MobileTimePicker>*/}
                    <MultiInputTimeRangeField
                        slotProps={{
                            textField: ({ position }) => ({
                                label: position === 'start' ? 'From' : 'To',
                            }),
                        }}
                    />
                {/*</MobileTimePicker>*/}
                <SingleInputTimeRangeField
                    label="Sunday"
                    value={sunday}
                    onChange={(newValue) => setSunday(newValue)}
                    ampm={false}/>
                <SingleInputTimeRangeField
                    label="Monday"
                    value={monday}
                    onChange={(newValue) => setMonday(newValue)}
                    ampm={false}
                />
                <SingleInputTimeRangeField
                    label="Tuesday"
                    value={tuesday}
                    onChange={(newValue) => setTuesday(newValue)}
                    ampm={false}
                />
                <SingleInputTimeRangeField
                    label="Wednesday"
                    value={wednesday}
                    onChange={(newValue) => setWednesday(newValue)}
                    ampm={false}
                />
                <SingleInputTimeRangeField
                    label="Thursday"
                    value={thursday}
                    onChange={(newValue) => setThursday(newValue)}
                    ampm={false}
                />
                <SingleInputTimeRangeField
                    label="Friday"
                    value={friday}
                    onChange={(newValue) => setFriday(newValue)}
                    ampm={false}
                />
                <SingleInputTimeRangeField
                    label="Saturday"
                    value={saturday}
                    onChange={(newValue) => setSaturday(newValue)}
                    ampm={false}
                />
            </LocalizationProvider>
            <Typography variant="h5" textAlign="start">Picture</Typography>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}/>
            <Button onClick={handleOnNext}>
                {'Next'}
            </Button>
        </div>
    )
}