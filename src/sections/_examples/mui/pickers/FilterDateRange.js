// @mui
import { Box, Button, Stack, Link, TextField } from '@mui/material';
import { useState } from 'react';
import FilterDateRangePicker, {
  useDateRangePicker,
  useFilterDateRangePicker,
} from '../../../../components/date-range-picker';
// utils
import { fDateTime } from '../../../../utils/formatTime';
//
import { Block } from '../../Block';

// ----------------------------------------------------------------------

export default function FilterDateRange({ pickerInput, people, setPeople }) {
  const [dateview, setDateView] = useState(false);
  // const pickerInput = useFilterDateRangePicker(new Date(), new Date());

  // const pickerCalendar = useDateRangePicker(null, null);
  function setonopen() {
    pickerInput.onOpen();
  }
  return (
    <>
      {/* <Stack sx={{ typography: 'body2', mb: 3, color: 'text.secondary' }}>
        <div>This is the custom component from minimal.</div>
        <div>You can use more advanced components by MUI.</div>

        <Link href="https://mui.com/x/react-date-pickers/date-range-picker/">
          https://mui.com/x/react-date-pickers/date-range-picker/{' '}
        </Link>
      </Stack> */}

      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        <Block title="예약시간">
          <Stack sx={{ typography: 'body2', mt: 1, alignItems: 'center' }}>
            {dateview ? (
              <>
                <div>
                  <strong>Start:</strong> {fDateTime(pickerInput.startDate)}
                </div>
                <div>
                  <strong>End:</strong> {fDateTime(pickerInput.endDate)}
                </div>
              </>
            ) : (
              <></>
            )}
            {/* <div>
              <strong>Start:</strong> {fDateTime(pickerInput.startDate)}
            </div>
            <div>
              <strong>End:</strong> {fDateTime(pickerInput.endDate)}
            </div> */}
            <Button
              variant="contained"
              sx={{ mt: 1, width: '50%' }}
              onClick={() => {
                setonopen();
                setDateView(true);
              }}
            >
              시간선택
            </Button>
          </Stack>

          <FilterDateRangePicker
            open={pickerInput.open}
            startDate={pickerInput.startDate}
            endDate={pickerInput.endDate}
            onChangeStartDate={pickerInput.onChangeStartDate}
            onChangeEndDate={pickerInput.onChangeEndDate}
            onClose={pickerInput.onClose}
            isError={pickerInput.isError}
          />
        </Block>
        <Block title="예약인원">
          {/* <TextField label="인원" /> */}
          <TextField
            label="인원"
            value={people}
            onChange={(event) => setPeople(event.target.value)}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
        </Block>

        {/* <Block title="Calendar">
          <Button variant="contained" onClick={pickerCalendar.onOpen}>
            Click me!
          </Button>

          <Stack sx={{ typography: 'body2', mt: 3 }}>
            <div>
              <strong>Start:</strong> {fDate(pickerCalendar.startDate)}
            </div>
            <div>
              <strong>End:</strong> {fDate(pickerCalendar.endDate)}
            </div>
          </Stack>

          <DateRangePicker
            variant="calendar"
            open={pickerCalendar.open}
            startDate={pickerCalendar.startDate}
            endDate={pickerCalendar.endDate}
            onChangeStartDate={pickerCalendar.onChangeStartDate}
            onChangeEndDate={pickerCalendar.onChangeEndDate}
            onClose={pickerCalendar.onClose}
            isError={pickerCalendar.isError}
          />
        </Block> */}
      </Box>
    </>
  );
}
