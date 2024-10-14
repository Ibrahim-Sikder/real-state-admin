import React from "react";
import { Controller } from "react-hook-form";
import {
  Autocomplete,
  TextField,
  FormControl,
  FormHelperText,
  CircularProgress,
} from "@mui/material";

type TSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  loading?: boolean;
  placeholder?: string;
  labelIcon?: boolean;
  required?: boolean;
};

const AppSelect = ({
  label,
  name,
  options,
  disabled,
  mode,
  loading,
  placeholder,
  labelIcon,
  required,
}: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <Autocomplete
            // sx={{ zIndex: "9999999999" }}
            multiple={mode === "multiple"}
            options={options || []}
            disableCloseOnSelect={mode === "multiple"}
            disabled={disabled}
            loading={loading}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            renderInput={(params) => (
              <TextField
                // sx={{ zIndex: "9999999999" }}
                {...params}
                label={label}
                placeholder={placeholder}
                variant="outlined"
                required={required}
                error={!!error}
                helperText={error?.message}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            value={
              mode === "multiple"
                ? options?.filter((option) =>
                    field.value.includes(option.value)
                  ) || []
                : options?.find((option) => option.value === field.value) ||
                  null
            }
            onChange={(event, newValue) =>
              mode === "multiple"
                ? field.onChange(
                    Array.isArray(newValue)
                      ? newValue.map((item: any) => item.value)
                      : []
                  )
                : field.onChange(
                    (!Array.isArray(newValue) && newValue?.value) || ""
                  )
            }
            renderOption={(props, option) => (
              <li
                {...props}
                key={option.value}
                // className="z-[9999999999999] !important"
              >
                {labelIcon ? (
                  <>
                    <div className="">{option.label}</div>
                  </>
                ) : (
                  option.label
                )}
              </li>
            )}
          />
          {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};

export default AppSelect;
