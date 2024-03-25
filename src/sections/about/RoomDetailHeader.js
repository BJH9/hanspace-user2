import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import {Stack, Container, Typography, Fab} from '@mui/material';
// components
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';
import Iconify from "../../components/iconify";

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // backgroundImage: 'url(/assets/background/overlay_1.svg), url(/assets/images/about/hero.jpg)',
    backgroundImage: 'url(/assets/images/rooms/뉴턴220호.jpg)',
    padding: theme.spacing(10, 0),
    [theme.breakpoints.up('md')]: {
        height: 560,
        padding: 0,
    },
}));

const StyledContent = styled('div')(({ theme }) => ({
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
        bottom: 80,
        textAlign: 'left',
        position: 'absolute',
    },
}));

// ----------------------------------------------------------------------
const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': { m: '8px !important' },
};
const COLORS = ['default', 'inherit', 'primary', 'secondary', 'info', 'success', 'warning', 'error'];
export default function RoomDetailHeader() {
    return (
        <StyledRoot>
            <Container component={MotionContainer}>
                <StyledContent>
                    <TextAnimate
                        text="뉴턴 220호"
                        sx={{
                            color: 'white',
                        }}
                        variants={varFade().inRight}
                    />

                    <br />

                    <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white'}}>
                        <TextAnimate text="이용시간: 07:00 ~ 21:00" />

                        {/*<TextAnimate text="뉴턴홀" />*/}
                    </Stack>

                    <m.div variants={varFade().inRight}>
                        {/*<Typography*/}
                        {/*    variant="h4"*/}
                        {/*    sx={{*/}
                        {/*        mt: 5,*/}
                        {/*        color: 'common.white',*/}
                        {/*        fontWeight: 'fontWeightMedium',*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    Let's work together and*/}
                        {/*    <br /> make awesome site easily*/}
                        {/*</Typography>*/}
                        {COLORS.map((color) => (
                            <Fab key={color} color={"secondary"} variant="extended" sx={{margin:"2px"}}>
                                {/*<Iconify icon="ic:round-access-alarm" width={24} />*/}
                                #모임용
                            </Fab>
                        ))}
                    </m.div>
                </StyledContent>
            </Container>
        </StyledRoot>
    );
}
