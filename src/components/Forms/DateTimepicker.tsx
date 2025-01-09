import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Controller, useFormContext } from 'react-hook-form';

type DateTimePickerProps = {
  name: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  value?: string;
};

const DateTimepicker = ({ name,value, label, required = false, fullWidth = false }: DateTimePickerProps) => {
  const { control } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `${label || name} is required` : false }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DateTimePicker
            label={label}
            value={value || null}
            onChange={(newValue) => onChange(newValue)}
            slotProps={{
              textField: {
                fullWidth, 
                error: !!error,
                helperText: error?.message,
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateTimepicker;
