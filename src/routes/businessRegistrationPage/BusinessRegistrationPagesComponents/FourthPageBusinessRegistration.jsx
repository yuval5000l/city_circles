import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Stack} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

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

export default function FourthPageBusinessRegistration({onBack, name, type, sddress, photoUrl, openHours, contacts}) {
    console.log(name, type, sddress, photoUrl, openHours, contacts)
    return(
        <div>
            <Stack direction="column" justifyContent="flex-start" spacing={2} textAlign="center" padding="1rem">
                <Typography variant="h2">
                    Before approving, please make sure that you only upload your business once.
                </Typography>
                <Stack direction="row">
                    {ControlledCheckbox()}
                    <Typography variant="h3">I approve that all the data is true and I am the business owner</Typography>
                </Stack>
            </Stack>
        </div>
    )
}

