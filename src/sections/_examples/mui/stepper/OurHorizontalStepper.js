import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import {
    Box,
    Step,
    Paper,
    Button,
    Stepper,
    StepLabel,
    Typography,
    StepContent,
} from '@mui/material';

// ----------------------------------------------------------------------

const steps = [
    {
        no: 1,
        label: 'Select campaign settings',
        description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
    },
    {
        no:2,
        label: 'Create an ad group',
        description: 'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        no:3,
        label: 'Create an ad',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
];

export default function OurHorizontalStepper() {
    const [activeStep, setActiveStep] = useState(1);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    const move = (index) => {
        setActiveStep(index);
    }

    return (
        <>

            <Stepper activeStep={activeStep} alternativeLabel >
                {steps.map((step, index) => (
                    <Step key={step.label} >
                        <StepLabel
                            // optional={index === 2 ? <Typography variant="caption">Last step</Typography> : null}
                            onClick={()=>{move(index)}}
                            StepIconProps={{
                                style: { fontSize: "2rem" } // adjust the font size as needed
                            }}
                        >

                        </StepLabel>
                    </Step>
                ))}
            </Stepper>

        </>
    );
}
