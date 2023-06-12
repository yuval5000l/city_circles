import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup() {
    return (
        <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">Select:</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
                {/*<FormControlLabel value="other" control={<Radio />} label="Other" />*/}
                {/*<FormControlLabel*/}
                {/*    value="disabled"*/}
                {/*    disabled*/}
                {/*    control={<Radio />}*/}
                {/*    label="other"*/}
                {/*/>*/}
            </RadioGroup>
        </FormControl>
    );
}