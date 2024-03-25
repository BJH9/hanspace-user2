import { useState } from 'react';
// @mui
import {Box, Card, Grid, Paper, Typography} from '@mui/material';
import Toolbar from "../_examples/extra/animate/scroll/Toolbar";
import ContainerView from "../_examples/extra/animate/scroll/ContainerView";
import ControlPanel from "../_examples/extra/animate/ControlPanel";
import OurToolbar from "../_examples/extra/animate/scroll/OurToolbar";
import OurContainerView from "../_examples/extra/animate/scroll/OurContainerView";
import {m} from "framer-motion";
import {MotionViewport, varContainer} from "../../components/animate";
import Scrollbar from "../../components/scrollbar/Scrollbar";
import getVariant from "../_examples/extra/animate/getVariant";
import RoomAvailableTime from "./RoomAvailableTime";
import OneReactHookForm from "../_examples/extra/form/OneReactHookForm";
import {LoadingButton} from "@mui/lab";
//


;

// ----------------------------------------------------------------------

export default function OurScrollView() {
    const [count, setCount] = useState(0);
    const [selectVariant, setSelectVariant] = useState('slideInUp');

    const handleChangeVariant = (event) => {
        setCount(count + 1);
        // setSelectVariant(event.target.value);
    };

    return (

        <>
                    <Box id={1}
                        // key={index}
                        // component={MotionViewport}
                        // variants={"zoomInUp"}
                        // viewport={{ root: scrollRef, once: true, amount: 0.1 }}
                        sx={{
                            padding: 5,
                            my: 2,
                            mx: 'auto',
                            height: 'auto',
                            // maxWidth: 480,
                            width: "80%",
                            display: 'flex',
                            borderRadius: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'background.paper',
                            boxShadow: (theme) => theme.customShadows.z8,
                        }}
                    >
                        <RoomAvailableTime></RoomAvailableTime>
                        <Box sx={{display:"flex"}}>

                        <LoadingButton sx={{width:"50%", margin:"4px"}} color="info" size="large" type="submit" variant="contained" onClick={handleChangeVariant}>
                            다음
                        </LoadingButton>
                        </Box>
                    </Box>

    <Box id={2}
        // key={index}
        // component={MotionViewport}
        // variants={"zoomInUp"}
        // viewport={{ root: scrollRef, once: true, amount: 0.1 }}
        sx={{
            padding: 5,
            my: 2,
            mx: 'auto',
            height: 'auto',
            // maxWidth: 480,
            width: "80%",
            display: 'flex',
            borderRadius: 1,
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.customShadows.z8,
        }}
    >
    <OneReactHookForm></OneReactHookForm>
    </Box>
</>

            // <Grid container spacing={3}>
            //     <Grid item xs={12}>
            //         <OurContainerView key={count} selectVariant="zoomInUp" />
            //     </Grid>
            //
            // </Grid>

    );
}

