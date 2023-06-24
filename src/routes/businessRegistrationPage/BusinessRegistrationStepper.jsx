import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FirstPageBusinessRegistration from './BusinessRegistrationPagesComponents/FirstPageBusinessRegistration';
import SecondPageBusinessRegistration from './BusinessRegistrationPagesComponents/SecondPageBusinessRegistration';
import ThirdPageBusinessRegistration from './BusinessRegistrationPagesComponents/ThirdPageBusinessRegistration';
import FourthPageBusinessRegistration from './BusinessRegistrationPagesComponents/FourthPageBusinessRegistration';
import Business from '../../BackEnd/Classes/BusinessClass';


export default function BusinessStepper() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [firstPageData, setFirstPageData] = React.useState(null);
    const [secondPageData, setSecondPageData] = React.useState(null);
    const [thirdPageData, setThirdPageData] = React.useState(null);
    // const [fourthPageData, setFourthPageData] =  React.useState(null);


    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = (data) => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        console.log(data);

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        switch (activeStep) {
            case 0:
                setFirstPageData(data);
                // console.log(data);
                break;
            case 1:
                setSecondPageData(data);
                // console.log(data);
                break;
            case 2:
                setThirdPageData(data);
                // console.log(data);
                break;

            default:
                break;
        }
    };

    const handleBack = (data) => {
        // console.log(activeStep);
        switch (activeStep) {
            case 0:
                setFirstPageData(data);
                // console.log(data);
                break;
            case 1:
                setSecondPageData(data);
                // console.log(data);
                break;
            case 2:
                setThirdPageData(data);
                // console.log(data);
                break;

            default:
                break;
        }
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

    };


    const handleReset = () => {
        setActiveStep(0);
    };

    const handleMakeBusiness = async () => {
        await Business.makeBusiness(
            firstPageData[0], // Name
            firstPageData[1], // Type
            thirdPageData[0], // address
            thirdPageData[1], // photoUrl
            thirdPageData.slice(2), // openingHours
            secondPageData,
        );
        // TODO verifying submit

        window.location.replace("/");

    }


    const steps = [
        {
            label: 'Basic Details',
            content: <FirstPageBusinessRegistration onNext={handleNext} data={firstPageData}/>,
        },
        {
            label: 'Socials',
            content: <SecondPageBusinessRegistration onNext={handleNext} onBack={handleBack} data={secondPageData}/>,
        },
        {
            label: 'More Details',
            content: <ThirdPageBusinessRegistration onNext={handleNext} onBack={handleBack} data={thirdPageData}/>,
        },
        {
            label: 'Approving',
            content: <FourthPageBusinessRegistration onBack={handleBack}/>, // data={[...firstPageData, ...secondPageData, ...thirdPageData]}/>,
        },
    ];


    return (
        <Box sx={{width: '100%'}}>
            <Stepper activeStep={activeStep} sx={{padding:"1rem"}}>
                {steps.map((step, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step
                            key={step.label}
                            {...stepProps}>
                            <StepLabel {...labelProps}>
                                {/*{step.label}*/}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{mt: 2, mb: 1}}>
                        All steps completed!
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        <Box sx={{flex: '1 1 auto'}}/>
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {/*<Typography sx={{mt: 2, mb: 1}}>Step {activeStep + 1}</Typography>*/}
                    {steps[activeStep].content}
                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                        {/*<Button*/}
                        {/*    color="inherit"*/}
                        {/*    disabled={activeStep === 0}*/}
                        {/*    onClick={handleBack}*/}
                        {/*    sx={{mr: 1}}*/}
                        {/*>*/}
                        {/*    Back*/}
                        {/*</Button>*/}
                        <Box sx={{flex: '1 1 auto'}}/>


                        {activeStep === steps.length - 1 ?
                            (<Button onClick={handleMakeBusiness}>
                                Finish
                            </Button>) : (<div></div>)}
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}

////////////////////////////