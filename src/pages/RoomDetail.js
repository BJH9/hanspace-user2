import { Helmet } from 'react-helmet-async';
// @mui
import { Divider } from '@mui/material';
// sections
import { AboutHero, AboutWhat, AboutTeam, AboutVision, AboutTestimonials } from '../sections/about';
import RoomDetailHeader from "../sections/about/RoomDetailHeader";
import RoomInfo from "../sections/about/RoomInfo";
import RoomAvailableTime from "../sections/about/RoomAvailableTime";

// ----------------------------------------------------------------------

export default function RoomDetail() {
    return (
        <>
            <Helmet>
                <title>상세 정보</title>
            </Helmet>

            <RoomDetailHeader />

            <RoomInfo />

            {/*<AboutVision />*/}
            <Divider orientation="vertical" sx={{ my: 10, mx: 'auto', width: 2, height: 40 }} />

            <RoomAvailableTime />

            {/*<AboutTestimonials />*/}
        </>
    );
}
