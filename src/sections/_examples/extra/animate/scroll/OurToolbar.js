import PropTypes from 'prop-types';
// @mui
import { Paper, IconButton } from '@mui/material';
// components
import Iconify from '../../../../../components/iconify';

// ----------------------------------------------------------------------

OurToolbar.propTypes = {
    onRefresh: PropTypes.func,
};

export default function OurToolbar({ onRefresh, ...other }) {
    return (
        <Paper
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
            }}
            {...other}
        >
            <IconButton onClick={onRefresh}>
                <Iconify icon="eva:refresh-fill" />
            </IconButton>
        </Paper>
    );
}
