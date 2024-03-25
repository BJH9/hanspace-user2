import PropTypes from "prop-types";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import {
  Radio,
  RadioGroup,
  FormHelperText,
  FormControlLabel,
} from "@mui/material";

// ----------------------------------------------------------------------

RHFRadioGroup2.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
};

export default function RHFRadioGroup2(props, { name, options, ...other }) {
  const { control } = useFormContext();

  const onChange = (e) => {
    props.setWaitingFilter((prev) => e.target.value);
    console.log("waiting: ", e.target.value);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <RadioGroup onChange={onChange} {...field} row {...other}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>

          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
