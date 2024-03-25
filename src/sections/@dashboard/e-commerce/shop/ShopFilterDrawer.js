import PropTypes from "prop-types";
// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Radio,
  Stack,
  Input,
  Badge,
  Button,
  Drawer,
  Rating,
  Fab,
  Divider,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
// config
import { NAV } from "../../../../config";
// components
import Iconify from "../../../../components/iconify";
import Scrollbar from "../../../../components/scrollbar";
import { ColorMultiPicker } from "../../../../components/color-utils";
import {
  RHFMultiCheckbox,
  RHFRadioGroup,
  RHFRadioGroup2,
  // TimeCheckbox,
  RHFSlider,
} from "../../../../components/hook-form";

import TimeCheckbox from "./TimeCheckbox";
import WaitingCheckbox from "./WaitingCheckbox";

// ----------------------------------------------------------------------

export const FILTER_TIME_OPTIONS = [
  { label: "3개월", value: "3month" },
  { label: "1개월", value: "1month" },
  { label: "1주일", value: "1week" },
];

export const FILTER_WAIT_OPTIONS = [
  { label: "전체 보기", value: "all" },
  { label: "승인완료", value: "completed" },
  { label: "대기중", value: "waiting" },
  { label: "거절", value: "rejected" },
];

export const FILTER_RATING_OPTIONS = [
  "up4Star",
  "up3Star",
  "up2Star",
  "up1Star",
];

export const FILTER_COLOR_OPTIONS = [
  "#00AB55",
  "#000000",
  "#FFFFFF",
  "#FFC0CB",
  "#FF4842",
  "#1890FF",
  "#94D82D",
  "#FFC107",
];

// ----------------------------------------------------------------------

const onSelected = (selected, item) =>
  selected.includes(item)
    ? selected.filter((value) => value !== item)
    : [...selected, item];

ShopFilterDrawer.propTypes = {
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  isDefault: PropTypes.bool,
  onResetFilter: PropTypes.func,
};

export default function ShopFilterDrawer({
  open,
  onOpen,
  onClose,
  isDefault,
  onResetFilter,
  setTimingFilter,
  setWaitingFilter,
  timingFilter,
  waitingFilter,
}) {
  const { control } = useFormContext();

  const marksLabel = [...Array(21)].map((_, index) => {
    const value = index * 10;

    const firstValue = index === 0 ? `$${value}` : `${value}`;

    return {
      value,
      label: index % 4 ? "" : firstValue,
    };
  });

  return (
    <>
      {/* <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpen}
      >
        Filters
      </Button> */}

      {/* <Fab onClick={onOpen}>필터</Fab> */}
      <div onClick={onOpen}>필터</div>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        BackdropProps={{
          invisible: true,
        }}
        PaperProps={{
          sx: { width: NAV.W_BASE },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 2, pr: 1, py: 2 }}
        >
          <Typography variant="subtitle1">Filters</Typography>

          <IconButton onClick={onClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 2.5 }}>
            <Stack spacing={1}>
              <TimeCheckbox
                setTimingFilter={setTimingFilter}
                timingFilter={timingFilter}
              />
            </Stack>

            <Stack spacing={1}>
              <WaitingCheckbox
                setWaitingFilter={setWaitingFilter}
                waitingFilter={waitingFilter}
              />
            </Stack>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <Badge
            color="error"
            variant="dot"
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            invisible={isDefault}
            sx={{ width: 1 }}
          >
            <Button
              fullWidth
              size="large"
              type="submit"
              color="inherit"
              variant="outlined"
              onClick={onResetFilter}
              startIcon={<Iconify icon="eva:trash-2-outline" />}
            >
              Clear
            </Button>
          </Badge>
        </Box>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

InputRange.propTypes = {
  type: PropTypes.oneOf(["min", "max"]),
};

function InputRange({ type }) {
  const { control, setValue } = useFormContext();

  const handleBlurInputRange = (value) => {
    const min = value[0];

    const max = value[1];

    if (min < 0) {
      setValue("priceRange", [0, max]);
    }
    if (min > 200) {
      setValue("priceRange", [200, max]);
    }
    if (max < 0) {
      setValue("priceRange", [min, 0]);
    }
    if (max > 200) {
      setValue("priceRange", [min, 200]);
    }
  };

  return (
    <Controller
      name="priceRange"
      control={control}
      render={({ field }) => {
        const isMin = type === "min";

        const min = field.value[0];

        const max = field.value[1];

        return (
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            sx={{ width: 1 }}
          >
            <Typography
              variant="caption"
              sx={{
                flexShrink: 0,
                color: "text.disabled",
                textTransform: "capitalize",
                fontWeight: "fontWeightBold",
              }}
            >
              {`${type} ($)`}
            </Typography>

            <Input
              disableUnderline
              fullWidth
              size="small"
              value={isMin ? min : max}
              onChange={(event) =>
                isMin
                  ? field.onChange([Number(event.target.value), max])
                  : field.onChange([min, Number(event.target.value)])
              }
              onBlur={() => handleBlurInputRange(field.value)}
              inputProps={{
                step: 10,
                min: 0,
                max: 200,
                type: "number",
                "aria-labelledby": "input-slider",
              }}
              sx={{
                pr: 1,
                py: 0.5,
                borderRadius: 0.75,
                typography: "body2",
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                "& .MuiInput-input": { p: 0, textAlign: "right" },
              }}
            />
          </Stack>
        );
      }}
    />
  );
}
