import { useState } from 'react';
// @mui
import { TextField, Stack } from '@mui/material';
import { DateTimePicker, MobileDateTimePicker, DesktopDateTimePicker } from '@mui/x-date-pickers';
//
import { Block } from '../../Block';

// ----------------------------------------------------------------------

export default function FilterDateTime() {
  const [value, setValue] = useState(new Date());

  const [valueResponsive, setValueResponsive] = useState(new Date('2018-01-01T00:00:00.000Z'));

  return (
    <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
      <Block title="Basic">
        <DateTimePicker
          renderInput={(props) => <TextField {...props} fullWidth />}
          label="DateTimePicker"
          value={value}
          onChange={setValue}
        />
      </Block>

      <Block title="Responsiveness">
        <MobileDateTimePicker
          value={valueResponsive}
          onChange={(newValue) => {
            setValueResponsive(newValue);
          }}
          renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
        />

        <DesktopDateTimePicker
          value={valueResponsive}
          onChange={(newValue) => {
            setValueResponsive(newValue);
          }}
          renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
        />

        <DateTimePicker
          value={valueResponsive}
          onChange={(newValue) => {
            setValueResponsive(newValue);
          }}
          renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
        />
      </Block>
    </Stack>
  );
}
