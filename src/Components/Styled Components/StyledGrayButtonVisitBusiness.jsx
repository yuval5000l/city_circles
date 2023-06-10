import React, {useState} from 'react';
import {StyledButtonGray} from "./styledComponents";

const StyledGrayButtonVisitBusiness = () => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
    };

    return (
        <StyledButtonGray
            // variant="contained"
            color={clicked ? 'primary' : 'primary'}
            onClick={handleClick}
            style={{
                boxShadow: clicked ? 'inset 0 0 10px rgba(0, 0, 0, 0.5)' : '0 2px 5px rgba(0, 0, 0, 0.3)',
            }}
        >
            visit business
        </StyledButtonGray>
    );
};

export default StyledGrayButtonVisitBusiness;
