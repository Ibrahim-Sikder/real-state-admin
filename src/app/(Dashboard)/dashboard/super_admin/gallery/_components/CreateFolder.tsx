"use client";

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { FolderOpenTwoTone } from "@mui/icons-material";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateFolderMutation } from "@/redux/features/gallery/gallery.api";
import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";

const validationSchema = z.object({
  name: z
    .string({
      required_error: "Please enter a valid folder name",
      invalid_type_error: "Please enter a valid folder name",
    })
    .nonempty({ message: "Folder name cannot be empty" }),
});

const CreateFolder = () => {
  const [open, setOpen] = useState(false);
  const [createFolder, { isLoading }] = useCreateFolderMutation();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (values: FieldValues) => {
    const toastId = toast.loading("Creating folder...");
    try {
      await createFolder(values).unwrap();
      toast.success("Folder created successfully", {
        id: toastId,
        duration: 3000,
      });
      handleClose();
    } catch (error: any) {
      toast.error(
        error.data?.message || "An error occurred. Please try again.",
        {
          id: toastId,
          duration: 3000,
        }
      );
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        startIcon={<FolderOpenTwoTone />}
        onClick={handleClickOpen}
      >
        New folder
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs" sx={{zIndex:'999999'}}>
        <ADForm onSubmit={onSubmit} resolver={zodResolver(validationSchema)}>
          <DialogTitle>Create a new folder</DialogTitle>
          <DialogContent>
            <ADInput name="name" type="text" placeholder="Enter folder name" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size="1rem" /> : null}
            >
              Create folder
            </Button>
          </DialogActions>
        </ADForm>
      </Dialog>
    </>
  );
};

export default CreateFolder;
