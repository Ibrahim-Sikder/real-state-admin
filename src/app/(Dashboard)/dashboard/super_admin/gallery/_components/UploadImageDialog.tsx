"use client";

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadImageMutation } from "@/redux/features/gallery/gallery.api";
import { toast } from "sonner";
import { CloudUpload } from "@mui/icons-material";
import AppSelect from "./AppSelect";
import AppSelectFile from "./AppSelectFile";
import axios from 'axios'
interface Props {
  folders: { _id: string; name: string }[];
}

const validationSchema = z.object({
  folder: z.string().nonempty("Please select a folder"),
  images: z
    .array(z.any())
    .nonempty("Please select at least one image")
    .refine(
      (files) => files.every((file: File) => file.size <= 2 * 1024 * 1024),
      "Each file must be less than 2MB"
    )
    .refine(
      (files) =>
        files.every((file: File) =>
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            file.type
          )
        ),
      "Supported formats: JPEG, JPG, PNG, WEBP"
    ),
});

const UploadImageDialog = ({ folders }: Props) => {
  const [open, setOpen] = useState(false);
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const methods = useForm({
    resolver: zodResolver(validationSchema),
  });

  const { handleSubmit, reset } = methods;

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset(); // Reset the form after close
  };

  // Function to handle form submission
  const onSubmit = async (data: any) => {
    const toastId = toast.loading('Uploading images...');
    const formData = new FormData();

    // Append images to FormData
    if (Array.isArray(data.images) && data.images.length > 0) {
      data.images.forEach((file: File) => {
        formData.append('images', file);
      });
    } else {
      toast.error('Please select at least one image');
      return;
    }

    // Append folder ID to FormData
    formData.append('folder', data.folder);

    try {
      // Make the API request to upload images
      const res = await axios.post('http://localhost:5000/api/v1/gallery/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res)
      toast.success(res.data.message || 'Images uploaded successfully!', {
        id: toastId,
      });
      handleClose(); // Close the dialog after successful upload
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || error.message || 'An error occurred',
        { id: toastId },
      );
    }
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="small"
        startIcon={<CloudUpload />}
        onClick={handleClickOpen}
      >
        New Upload
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Upload Image</DialogTitle>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <Stack direction="column" spacing={5}>
                <AppSelect
                  name="folder"
                  label="Folder"
                  options={folders?.map((folder) => ({
                    value: folder._id,
                    label: folder.name,
                  })) || []}
                  placeholder="Select a folder"
                  required
                />
                <Box>
                  <AppSelectFile name="images" label="Upload Images" />
                  <Typography variant="caption" color="textSecondary">
                    Supported formats: JPEG, PNG, WEBP. Max size: 2MB.
                  </Typography>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                disabled={isUploading}
                startIcon={
                  isUploading ? <CircularProgress size="1rem" /> : null
                }
              >
                Upload
              </Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default UploadImageDialog;
