import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button";
import {Box, Grid, Stack, Typography} from "@mui/material";
import {StyledTypeBox} from "../../../Components/Styled Components/styledComponents";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import StyledTimeTable from "../../businessPage/StyledTimeTable";
import Link from "@mui/material/Link";
import theme from "../../../Theme/Theme";

function ControlledCheckbox() {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    );
}



export default function FourthPageBusinessRegistration({onBack, data}) {
    const data1 = data[0];
    const data2 = data[1];
    const data3 = data[2];

    const businessName = data1[0];
    const businessTypes = data1[1];
    // const ownerFacebook = data1[2];
    const ownerName = data1[3];

    // const contacts = []

    const address = data3[0];
    const imgUrl = data3[1];
    // const openHours = data3[2];

    function StyledSummaryBusiness(){
        return (
            <Stack direction="column" spacing={2} alignItems="flex-start" justifyContent="space-between">
                <Typography variant="h2">
                    SUMMARY
                </Typography>

                <Typography variant="h3">
                    Business Name:
                </Typography>
                <Typography variant="h4">
                    {businessName}
                </Typography>

                <Typography variant="h3">
                    Owner Name:
                </Typography>
                <Typography variant="h4">
                    {ownerName}
                </Typography>

                <Typography variant="h3">
                    Business Types:
                </Typography>

                <Grid container direction="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      spacing={3}>
                    {businessTypes.map((category) =>
                        <StyledTypeBox
                            key={category}>{category}</StyledTypeBox>)}
                </Grid>

                <Typography variant="h3">
                    Address:
                </Typography>
                <Typography variant="h4" sx={{textAlign: "left"}}>
                    {address}
                </Typography>

                <Typography variant="h3">
                    Contact:
                </Typography>
                <Typography variant="h4">
                    <Grid container direction="column"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                          spacing={3}>
                         {
                        Object.entries(data2).filter(contact => contact[1] !== "").map((filteredContact) =>
                            <Box key={filteredContact[1] + "S"}>
                                <Link sx={{color:`${theme.palette.secondary.dark}`, backgroundColor:`${theme.palette.primary.light}`,borderRadius:"15px", paddingLeft:"0.2rem",paddingRight:"0.2rem",border:"0.1rem solid black" }} href={`http://${filteredContact[1]}`} target={"_blank"} rel="noopener">
                                    {filteredContact[0]}
                                </Link>
                            </Box>
                        )}
                        {/*{contacts.map(([index, category]) =>*/}
                        {/*    <StyledTypeBox*/}
                        {/*        key={index}>{category}</StyledTypeBox>)}*/}
                    </Grid>
                </Typography>

                <Typography variant="h3">
                    TimeTable:
                </Typography>
                <Stack direction="row" spacing={1} alignItems="flex-start">
                    <AccessTimeIcon/>
                    {/*<StyledTimeTable business={business}/>*/}
                </Stack>

            </Stack>

        );
    }

    const handleOnBack = () => {
        onBack([]);
    }
    console.log(data);
    // console.log(name, type, sddress, photoUrl, openHours, contacts);
    return(
        <div>
            <Stack direction="column" justifyContent="flex-start" spacing={2} textAlign="center" padding="1rem">
                <Typography variant="h3">Preview of your business page:</Typography>
                {/*<StyledSummaryBusiness/>*/}
                {StyledSummaryBusiness()}
                <Typography variant="h3">
                    Before approving, please make sure that you only upload your business once.
                </Typography>
                <Stack direction="row">
                    {ControlledCheckbox()}
                    <Typography variant="h4">I approve that all the data is true and I am the business owner</Typography>
                </Stack>
            </Stack>
            <Button
                color="inherit"
                onClick={handleOnBack}
                sx={{mr: 1}}
            >
                <Typography variant="h3">
                    Back
                </Typography>
            </Button>
        </div>
    )
}

