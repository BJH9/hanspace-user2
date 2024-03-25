import { useState } from 'react';

import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Tab, Tabs, Container, Stack } from '@mui/material';
import { Masonry } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Iconify from '../../../components/iconify';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { Block } from '../../../sections/_examples/Block';

// ----------------------------------------------------------------------

const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': { mx: '8px !important' },
};

const TABS = [
    {
        value: 'one',
        icon: <Iconify icon="eva:phone-call-fill" width={24} />,
        label: 'Item One',
    },
    {
        value: 'two',
        icon: <Iconify icon="eva:heart-fill" width={24} />,
        label: 'Item Two',
    },
    {
        value: 'three',
        icon: <Iconify icon="eva:headphones-fill" width={24} />,
        label: 'Item Three',
        disabled: true,
    },
    {
        value: 'four',
        icon: <Iconify icon="eva:headphones-fill" width={24} />,
        label: 'Item Four',
    },
    {
        value: 'five',
        icon: <Iconify icon="eva:headphones-fill" width={24} />,
        label: 'Item Five',
        disabled: true,
    },
    {
        value: 'six',
        icon: <Iconify icon="eva:headphones-fill" width={24} />,
        label: 'Item Six',
    },
    {
        value: 'seven',
        icon: <Iconify icon="eva:headphones-fill" width={24} />,
        label: 'Item Seven',
    },
];

// ----------------------------------------------------------------------

export default function ReservationTab() {
    const [currentTab, setCurrentTab] = useState('one');

    const [scrollable, setScrollable] = useState('one');

    return (
        <>
            {/*<Helmet>*/}
            {/*    <title> MUI Components: Tabs | Minimal UI</title>*/}
            {/*</Helmet>*/}

            {/*<Box*/}
            {/*    sx={{*/}
            {/*        pt: 6,*/}
            {/*        pb: 1,*/}
            {/*        bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Container>*/}
            {/*        <CustomBreadcrumbs*/}
            {/*            heading="Tabs"*/}
            {/*            links={[*/}
            {/*                {*/}
            {/*                    name: 'Components',*/}
            {/*                    href: PATH_PAGE.components,*/}
            {/*                },*/}
            {/*                { name: 'Tabs' },*/}
            {/*            ]}*/}
            {/*            moreLink={['https://mui.com/components/tabs']}*/}
            {/*        />*/}
            {/*    </Container>*/}
            {/*</Box>*/}

            <Container sx={{ my: 10 }}>
                <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
                        <Stack spacing={2} sx={{ width: 1 }}>
                            <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
                                {TABS.slice(0, 3).map((tab) => (
                                    <Tab key={tab.value} value={tab.value} label={tab.label} />
                                ))}
                            </Tabs>

                            {TABS.slice(0, 3).map(
                                (tab) =>
                                    tab.value === currentTab && (
                                        <Box key={tab.value} sx={{ p: 2, borderRadius: 1, bgcolor: 'background.neutral' }}>
                                            {tab.label}
                                        </Box>
                                    )
                            )}
                        </Stack>
                </Masonry>
            </Container>
        </>
    );
}
