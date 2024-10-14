import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { Accept, useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  Paper,
  IconButton,
} from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";

type TSelectProps = {
  name: string;
  label: string;
  disabled?: boolean;
  defaultValue?: {
    url: string;
    public_id: string;
  } | null;
  accept?: Accept;
  maxFiles?: number;
};

const AppSelectFile = ({
  name,
  label,
  disabled = false,
  defaultValue,
  accept,
  maxFiles = 3,
}: TSelectProps) => {
  const { control } = useFormContext();
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: defaultValue ? [defaultValue] : [],
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
      "image/webp": [],
    },
    disabled,
    multiple: true,
    maxFiles,
    onDrop: (acceptedFiles) => {
      onChange([
        ...(value || []),
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });

  const handleRemoveFile = (file: File) => {
    onChange(value.filter((f: File) => f !== file));
  };

  return (
    <FormControl error={!!error} fullWidth>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed grey",
          padding: 2,
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: "rgba(0, 0, 0, 0.02)",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <input {...getInputProps()} />
        <CloudUpload sx={{ fontSize: 48 }} />
        <Typography>Click or drag file to this area to upload</Typography>
      </Box>
      {value && value.length > 0 && (
        <Box mt={2}>
          {value.map((file: File, index: number) => (
            <Paper
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 1,
                mb: 1,
              }}
            >
              <Typography variant="body2">
                {file.name || "Uploaded file"}
              </Typography>
              <IconButton
                onClick={() => handleRemoveFile(file)}
                size="small"
                color="error"
              >
                <Delete />
              </IconButton>
            </Paper>
          ))}
        </Box>
      )}
      {error && (
        <FormHelperText
          sx={{
            ".MuiFormHelperText-root": {
              marginLeft: "2px",
            },
          }}
        >
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default AppSelectFile;
