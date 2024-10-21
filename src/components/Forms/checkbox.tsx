import { Checkbox, FormControlLabel, FormGroup, SxProps } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type TCheckboxProps = {
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  sx?: SxProps;
};

const ADCheckbox = ({
  name,
  label = "",
  required = false,
  disabled = false,
  sx,
}: TCheckboxProps) => {
  const { control } = useFormContext();

  return (
    <FormGroup>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <FormControlLabel
            control={
              <Checkbox
                onChange={onChange}
                checked={!!value}
                disabled={disabled}
                sx={{ ...sx }}
              />
            }
            label={label}
            required={required}
            sx={{ color: error ? "error.main" : "inherit" }} 
          />
        )}
      />
    </FormGroup>
  );
};

export default ADCheckbox;
