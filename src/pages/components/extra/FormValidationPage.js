import { Helmet } from 'react-helmet-async';
// @mui
import {Box, Card, Container, CardHeader, CardContent, FormControlLabel, Checkbox} from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import OurReactHookForm from "../../../sections/_examples/extra/form/OurReactHookForm";


// ----------------------------------------------------------------------


export default function FormValidationPage() {
    return (
        <>
            <Helmet>
                <title> 예약자 정보 입력 </title>
            </Helmet>

            <Container sx={{ my: 10 }}>
                <Card>
                    <CardHeader title="예약자 정보 입력" />
                    <CardContent>
                        <OurReactHookForm />
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}
