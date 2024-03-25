import PropTypes from "prop-types";
// form
import { useFormContext, Controller, useForm } from "react-hook-form";
// @mui
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------

RHFTextField.propTypes = {
  name: PropTypes.string,
};
let test;
export default function RHFTextField({ name, ph, readOnly, ...other }) {
  const { control, setValue, trigger } = useFormContext();

  useEffect(() => {
    if (ph == "") {
      setValue(name, ph);
    } else {
      setValue(name, ph);
      trigger(name);
    }
  }, [ph, name, setValue, trigger]);

  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={ph}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            fullWidth
            value={
              typeof field.value === "number" && field.value === 0
                ? ""
                : field.value
            }
            onChange={field.onChange}
            error={!!error}
            helperText={error?.message}
            {...other}
            inputProps={{ readOnly }} // 추가: readOnly 속성을 적용
          />
        )}
      />
    </>
  );
}
