import {Grid, Stack, Typography} from "@mui/material";
import {StyledTypeBox} from "./styledComponents";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StyledTimeTable from "../../routes/businessPage/StyledTimeTable";

export default function StyledSummaryBusiness(business, businessName, ownerName){
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
                {business.type.map((category) =>
                    <StyledTypeBox
                        key={category}>{category}</StyledTypeBox>)}
            </Grid>

            <Typography variant="h3">
                Adress:
            </Typography>
            <Typography variant="h4" sx={{textAlign: "left"}}>
                {business.address}
            </Typography>

            <Typography variant="h3">
                Contact:
            </Typography>
            <Typography variant="h4">
                <Grid container direction="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      spacing={3}>
                    {business.contact.map((category) =>
                        <StyledTypeBox
                            key={category}>{category}</StyledTypeBox>)}
                </Grid>
            </Typography>

            <Typography variant="h3">
                TimeTable:
            </Typography>
            <Stack direction="row" spacing={1} alignItems="flex-start">
                <AccessTimeIcon/>
                <StyledTimeTable business={business}/>
            </Stack>

        </Stack>

    );
}