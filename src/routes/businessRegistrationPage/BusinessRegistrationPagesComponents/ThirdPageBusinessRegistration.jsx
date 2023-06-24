import * as React from 'react';
import Typography from '@mui/material/Typography';
// import BasicTextFields from "./TextField.components";
import {Box, Stack} from "@mui/material";
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
import Avatar from "@mui/material/Avatar";

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

    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNum, setHouseNum] = useState('');

    function CreateAddress(){
        const FullAddress = street + " " + houseNum + ", " + city
        setAddress(street + " " + houseNum + ", " + city);
        return FullAddress
    }


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
        const finalAddress = CreateAddress();
        console.log("address is: " + address );
        console.log(typeof(sunday));
        onNext([finalAddress, picturePath, {"Sunday": getHoursAndMinutes(sunday),
            "Monday": getHoursAndMinutes(monday), "Tuesday": getHoursAndMinutes(tuesday),
            "Wednesday": getHoursAndMinutes(wednesday), "Thursday": getHoursAndMinutes(thursday),
            "Friday": getHoursAndMinutes(friday),"Saturday": getHoursAndMinutes(saturday)}]);
    }



    return(
        <div>
            <Typography variant="h3">Details</Typography>
            <Stack direction="row">
                <LocationOnIcon sx={{fontSize: 30, alignSelf: "center"}}/>
                <Typography variant="h4">Location</Typography>
            </Stack>
            <TextField required={true} label={'City'} fieldname={'City'} onChange={(e)=> setCity(e.target.value)}/>
            <TextField required={true} label={'Street'} fieldname={'Street'} onChange={(e)=> setStreet(e.target.value)}/>
            <TextField required={true} label={'House Number'} fieldname={'House Number'} onChange={(e)=> setHouseNum(e.target.value)}/>

            <Stack direction="row">
                <AccessTimeIcon sx={{fontSize: 30, alignSelf: "center"}}/>
                <Typography variant="h4">Open Hours</Typography>
            </Stack>
            {/*<BasicTextFields fieldName={'Sunday'}/>*/}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/*<MobileTimePicker>*/}
                {/*    <MultiInputTimeRangeField*/}
                {/*        slotProps={{*/}
                {/*            textField: ({ position }) => ({*/}
                {/*                label: position === 'start' ? 'From' : 'To',*/}
                {/*            }),*/}
                {/*        }}*/}
                {/*    />*/}
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
            <Typography variant="h4" textAlign="start">Picture</Typography>
            {/*<input*/}
            {/*    type="file"*/}
            {/*    onChange={(e) => setFile(e.target.files[0])}/>*/}
            <Stack direction="column" spacing={"1rem"} alignItems="flex-start">
                <Stack direction="row" spacing={"1rem"} sx={{justifyContent: "start", alignItems: 'center'}}>
                    <Button variant={"contained"} component={"label"} >Choose File
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => setFile(e.target.files[0])}/>
                    </Button>
                    {(picturePath === "") ? (<Box/>) :
                        (<Avatar src={picturePath} sx={{width: 100, height: 100}}/>)}
                </Stack>

            </Stack>


            {/*{(picturePath === "") ? (<Avatar sx={{width: 100, height: 100}}/>) :*/}
            {/*    (<Avatar src={picturePath} sx={{width: 100, height: 100}}/>)}*/}
            <Button disabled={picturePath===""} onClick={handleOnNext}>
                {'Next'}
            </Button>
        </div>
    )
}