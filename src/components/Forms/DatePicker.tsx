import { SxProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller, useFormContext } from "react-hook-form";
import dayjs, { Dayjs } from 'dayjs';

interface IDatePicker {
  name: string;
  size?: "small" | "medium";
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  margin?: "none" | "normal" | "dense";
  disablePast?: boolean;
}

const ADDatePicker = ({
  name,
  size = "medium",
  label,
  required,
  fullWidth = true,
  margin = "normal",
  disablePast = true,
  sx,
}: IDatePicker) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        // Ensure value is a dayjs object or null
        const dateValue = value ? dayjs(value) : null;

        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={label}
              disablePast={disablePast}
              {...field}
              onChange={(date) => onChange(date ? date.toISOString() : null)} // Ensure value is in ISO string format
              value={dateValue}
              slotProps={{
                textField: {
                  required: required,
                  size: size,
                  sx: {
                    ...sx,
                  },
                  variant: "outlined",
                  fullWidth: fullWidth,
                  margin: margin,
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
};

export default ADDatePicker;
