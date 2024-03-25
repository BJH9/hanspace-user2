import PropTypes from 'prop-types';
// @mui
import {
  Paper,
  Stack,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormHelperText,
} from '@mui/material';
import { DatePicker, DateTimePicker, CalendarPicker } from '@mui/x-date-pickers';
// hooks
import useResponsive from '../../hooks/useResponsive';

// ----------------------------------------------------------------------

FilterDateRangePicker.propTypes = {
  open: PropTypes.bool,
  isError: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
  onChangeEndDate: PropTypes.func,
  onChangeStartDate: PropTypes.func,
  variant: 'input',
  startDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
  endDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
};

export default function FilterDateRangePicker({
  title = 'Select date range',
  variant = 'input',
  //
  startDate,
  endDate,
  //
  onChangeStartDate,
  onChangeEndDate,
  //
  open,
  onClose,
  //
  isError,
}) {
  const isDesktop = useResponsive('up', 'md');

  // const isCalendarView = variant === 'calendar';
  const isCalendarView = false;

  return (
    <Dialog
      fullWidth
      maxWidth={isCalendarView ? false : 'xs'}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          ...(isCalendarView && {
            maxWidth: 720,
          }),
        },
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      <DialogContent
        sx={{
          ...(isCalendarView &&
            isDesktop && {
              overflow: 'unset',
            }),
        }}
      >
        <Stack
          spacing={isCalendarView ? 3 : 2}
          direction={isCalendarView && isDesktop ? 'row' : 'column'}
          justifyContent="center"
          sx={{
            pt: 1,
            '& .MuiCalendarPicker-root': {
              ...(!isDesktop && {
                width: 'auto',
              }),
            },
          }}
        >
          {isCalendarView ? (
            <>
              <Paper
                variant="outlined"
                sx={{ borderRadius: 2, borderColor: 'divider', borderStyle: 'dashed' }}
              >
                <CalendarPicker date={startDate} onChange={onChangeStartDate} />
              </Paper>

              <Paper
                variant="outlined"
                sx={{ borderRadius: 2, borderColor: 'divider', borderStyle: 'dashed' }}
              >
                <CalendarPicker date={endDate} onChange={onChangeEndDate} />
              </Paper>
            </>
          ) : (
            <>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} fullWidth />}
                label="시작 DateTime"
                value={startDate}
                onChange={onChangeStartDate}
              />
              <DateTimePicker
                label="끝 date"
                value={endDate}
                onChange={onChangeEndDate}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </>
          )}
        </Stack>

        {isError && (
          <FormHelperText sx={{ color: 'error.main', px: 2 }}>
            End date must be later than start date
          </FormHelperText>
        )}
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancel
        </Button>

        <Button disabled={isError} variant="contained" onClick={onClose}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
