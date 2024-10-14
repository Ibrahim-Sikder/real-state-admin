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
  const [uploadImage, { data, isLoading: isUploading }] = useUploadImageMutation();



  const methods = useForm({
    resolver: zodResolver(validationSchema),
  });

  const { handleSubmit } = methods;

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Uploading image");
    const formData = new FormData();
  
    try {
      if (Array.isArray(data.images) && data.images.length > 0) {
        data.images.forEach((file: File) => {
          formData.append("images", file); // Append each file to the formData
        });
      } else {
        throw new Error("No images selected or images are invalid.");
      }
  
      if (data.folder) {
        formData.append("folder", data.folder); // Append the folder name
      }
  
      const res = await uploadImage(formData).unwrap(); // Send FormData
     if(res.success){
      toast.success(res?.message || "Image uploaded successfully!", { id: toastId });
     }
      handleClose();
    } catch (error: any) {
    
      toast.error(
        error.data?.message || error?.message || "An error occurred. Please try again.",
        { id: toastId, duration: 3000 }
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
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        onClick={(e) => e.stopPropagation()}


      >
        <DialogTitle>Upload Image</DialogTitle>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <Stack direction="column" spacing={5}>
                <AppSelect
                  name="folder"
                  label="Folder"
                  options={
                    folders?.map((folder: any) => ({
                      value: folder._id,
                      label: folder.name,
                    })) || []
                  }
                  placeholder="Select a folder"
                  required
                />





                <Box>
                  <AppSelectFile name="images" label="Upload Images" />
                  <Typography variant="caption" color="textSecondary">
                    Supported formats: JPEG, PNG, GIF. Max size: 2MB.
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
