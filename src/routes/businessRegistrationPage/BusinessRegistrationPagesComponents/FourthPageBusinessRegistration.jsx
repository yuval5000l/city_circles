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

export default function FourthPageBusinessRegistration({onBack, data}) {

    return(
        <div>
            <Typography variant="h4">
                Before approving, please make sure
                that you only upload your business
                once.
            </Typography>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Stack direction="row">
                {ControlledCheckbox()}
                <Typography variant="body1">I approve that all the data is true and I am the business owner</Typography>
            </Stack>

        </div>
    )
}

