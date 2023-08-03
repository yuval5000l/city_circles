import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Box, Divider, Stack} from "@mui/material";
import {translateOpeningHoursToArrays} from "../../../BackEnd/Classes/BusinessClass";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs from "dayjs";
import {SingleInputTimeRangeField} from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import {uploadFile} from "../../../BackEnd/Classes/GeneralFunctionsFireBase";
import Avatar from "@mui/material/Avatar";

function getHoursAndMinutes(day) {
    return "start " + day[0].format("HH") + "," + day[0].format("MM") + " end " + day[1].format("HH") + "," + day[1].format("MM");
    // return {"Start":[day[0].format("HH"), day[0].format("MM")],
    //     "End":[day[1].format("HH"), day[1].format("MM"),]}
}

export default function ThirdPageBusinessRegistration({onNext, onBack, data}) {

    const [address, setAddress] = useState("");
    const [picturePath, setPicturePath] = useState((data !== null && data[0] !== "") ? (data[0]) : (""));
    const [file, setFile] = useState(null);

    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNum, setHouseNum] = useState('');

    function CreateAddress() {
        if (street !== '') {
            const FullAddress = street + " " + houseNum + ", " + city
            setAddress(street + " " + houseNum + ", " + city);
            return FullAddress
        } else {
            const FullAddress = city
            setAddress(city);
            return FullAddress
        }

    }

    const [openingHoursArray, setOpeningHoursArray] = useState({});

    useEffect(() => {
        async function foo() {
            if (file !== null) {
                await handleUploadPic();
            }
        }

        // noinspection JSIgnoredPromiseFromCall
        foo();
        if (data !== null) {
            console.log(data);
            let lstDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let lstSetDays = [setSunday, setMonday, setTuesday, setWednesday, setThursday, setFriday, setSaturday]
            setOpeningHoursArray(translateOpeningHoursToArrays(data[2]));
            let Opening = translateOpeningHoursToArrays(data[2]);
            for (let i = 0; i < 7; i++) {
                let temp_start = dayjs().hour(Opening[lstDays[i]][0][0]).minute(Opening[lstDays[i]][0][1]);
                let temp_end = dayjs().hour(Opening[lstDays[i]][1][0]).minute(Opening[lstDays[i]][1][1]);
                lstSetDays[i]([temp_start, temp_end]);
            }
        }
    }, [file, data]);

    const handleUploadPic = async () => {
        uploadFile(file).then((pathy) => {
            setPicturePath(pathy);
        }).catch((error) => {
            console.error(error);
        });
    }
    const [allWeek, setAllWeek] = React.useState(() => [
        dayjs(),
        dayjs(),
    ]);
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
    const changeAll =(newValue) =>{
        setSunday(newValue)
        setMonday(newValue)
        setTuesday(newValue)
        setWednesday(newValue)
        setThursday(newValue)
        setFriday(newValue)
    }
    const handleOnNext = () => {
        const finalAddress = CreateAddress();
        // console.log("address is: " + address );
        // console.log(typeof(sunday));
        onNext([finalAddress, picturePath, {
            "Sunday": getHoursAndMinutes(sunday),
            "Monday": getHoursAndMinutes(monday), "Tuesday": getHoursAndMinutes(tuesday),
            "Wednesday": getHoursAndMinutes(wednesday), "Thursday": getHoursAndMinutes(thursday),
            "Friday": getHoursAndMinutes(friday), "Saturday": getHoursAndMinutes(saturday)
        }]);
    }
    const handleOnBack = () => {

        const finalAddress = CreateAddress();
        console.log([finalAddress, picturePath, {
            "Sunday": getHoursAndMinutes(sunday),
            "Monday": getHoursAndMinutes(monday), "Tuesday": getHoursAndMinutes(tuesday),
            "Wednesday": getHoursAndMinutes(wednesday), "Thursday": getHoursAndMinutes(thursday),
            "Friday": getHoursAndMinutes(friday), "Saturday": getHoursAndMinutes(saturday)
        }]);
        onBack([finalAddress, picturePath, {
            "Sunday": getHoursAndMinutes(sunday),
            "Monday": getHoursAndMinutes(monday), "Tuesday": getHoursAndMinutes(tuesday),
            "Wednesday": getHoursAndMinutes(wednesday), "Thursday": getHoursAndMinutes(thursday),
            "Friday": getHoursAndMinutes(friday), "Saturday": getHoursAndMinutes(saturday)
        }]);
    }
    // console.log({
    //     "Sunday": getHoursAndMinutes(sunday),
    //     "Monday": getHoursAndMinutes(monday), "Tuesday": getHoursAndMinutes(tuesday),
    //     "Wednesday": getHoursAndMinutes(wednesday), "Thursday": getHoursAndMinutes(thursday),
    //     "Friday": getHoursAndMinutes(friday), "Saturday": getHoursAndMinutes(saturday)
    // });

    return (
        <div>
            <Stack direction="column" justifyContent="flex-start" spacing={2} textAlign="left" padding="1rem">
                <Typography variant="h2">Details</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                    <LocationOnIcon sx={{fontSize: 30, alignSelf: "center"}}/>
                    <Typography variant="h3">Location</Typography>
                </Stack>
                <TextField required={true} label={'City'} fieldname={'City'} onChange={(e) => setCity(e.target.value)}/>
                <TextField required={true} label={'Street or Neighborhood'} fieldname={'Street'}
                           onChange={(e) => setStreet(e.target.value)}/>
                <TextField required={true} label={'House Number'} fieldname={'House Number'}
                           onChange={(e) => setHouseNum(e.target.value)}/>

                <Stack direction="row" spacing={1} alignItems="center">
                    <AccessTimeIcon sx={{fontSize: 30, alignSelf: "center"}}/>
                    <Typography variant="h3">Open Hours</Typography>
                </Stack>
                {/*<BasicTextFields fieldName={'Sunday'}/>*/}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Typography>Set all but Saturday</Typography>

                    <SingleInputTimeRangeField
                        label="Set all week"
                        value={allWeek}
                        onChange={(newValue) => {
                            changeAll(newValue);
                        }}
                        ampm={false}/>

                    <Divider/>
                    <Typography>Set each day</Typography>
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
                    <Divider/>
                    <Typography>Saturday</Typography>
                    <SingleInputTimeRangeField
                        label="Saturday"
                        value={saturday}
                        onChange={(newValue) => setSaturday(newValue)}
                        ampm={false}
                    />
                </LocalizationProvider>
                <Typography variant="h3" textAlign="start">Picture</Typography>
                {/*<input*/}
                {/*    type="file"*/}
                {/*    onChange={(e) => setFile(e.target.files[0])}/>*/}
                <Stack direction="column" spacing={"1rem"} alignItems="flex-start">
                    <Stack direction="row" spacing={"1rem"} sx={{justifyContent: "start", alignItems: 'center'}}>
                        <Button variant={"contained"} component={"label"}>Choose File
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files[0])}/>
                        </Button>
                        {(picturePath === "") ? (<Box/>) :
                            (<Avatar src={picturePath} sx={{width: 200, height: 200}}/>)}
                    </Stack>

                </Stack>
            </Stack>


            {/*{(picturePath === "") ? (<Avatar sx={{width: 100, height: 100}}/>) :*/}
            {/*    (<Avatar src={picturePath} sx={{width: 100, height: 100}}/>)}*/}
            <Button
                color="inherit"
                onClick={handleOnBack}
                sx={{mr: 1}}
            >
                <Typography variant="h3">
                    Back
                </Typography>
            </Button>
            <Button disabled={picturePath === ""} onClick={handleOnNext}>
                <Typography variant="h3">
                    {'Next'}
                </Typography>
            </Button>

        </div>
    )
}