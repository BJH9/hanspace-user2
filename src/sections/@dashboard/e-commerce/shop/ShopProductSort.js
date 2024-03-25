import { useState } from "react";
// form
import { Controller, useFormContext } from "react-hook-form";
// @mui
import { Button, MenuItem, Box } from "@mui/material";
// components
import Iconify from "../../../../components/iconify";
import MenuPopover from "../../../../components/menu-popover";

// ----------------------------------------------------------------------

const OPTIONS = [
  { value: "latest", label: "오름차순" },
  { value: "oldest", label: "내림차순" },
];

function renderLabel(label) {
  return {
    latest: "오름차순",
    oldest: "내림차순",
  }[label];
}

// ----------------------------------------------------------------------

export default function ShopProductSort(props) {
  const { control } = useFormContext();

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <Controller
      name="sortBy"
      control={control}
      render={({ field }) => (
        <>
          <Button
            disableRipple
            color="inherit"
            onClick={handleOpenPopover}
            // endIcon={
            //   <Iconify
            //     icon={
            //       openPopover ? "eva:chevron-up-fill" : "eva:chevron-down-fill"
            //     }
            //   />
            // }
            // sx={{ fontWeight: "fontWeightMedium" }}
          >
            Sort By
            <Box component="span" sx={{ color: "text.secondary", ml: 0.5 }}>
              {renderLabel(field.value)}
            </Box>
          </Button>

          <MenuPopover open={openPopover} onClose={handleClosePopover}>
            {OPTIONS.map((option) => (
              <MenuItem
                key={option.value}
                selected={option.value === field.value}
                onClick={() => {
                  handleClosePopover();
                  field.onChange(option.value);
                  props.setSortFilter((prevState) => option.value);
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </MenuPopover>
        </>
      )}
    />
  );
}
