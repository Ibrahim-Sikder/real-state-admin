import {
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useDeleteFolderMutation } from "@/redux/features/gallery/gallery.api";
import { DeleteForever, FolderZip } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import FolderIcon from "./FolderIcon";

interface GalleryFolderProps {
  folder: {
    _id: string;
    name: string;
    totalImages: number;
  };
}

const GalleryFolder = ({ folder }: GalleryFolderProps) => {
  const navigate = useRouter();
  const [deleteFolder, { isLoading }] = useDeleteFolderMutation();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    navigate.push(`/dashboard/gallery/folders/${folder._id}`);
  };

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting folder...");
    try {
      await deleteFolder(folder._id).unwrap();
      toast.success("Folder deleted successfully", { id: toastId });
    } catch (error: any) {
      toast.error(
        error.data?.message || "An error occurred. Please try again.",
        { id: toastId }
      );
    }
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        onClick={handleClick}
        sx={{
          position: "relative",
          p: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
          backgroundColor: "#f2f4f86e",
        }}
      >
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleConfirmDelete();
          }}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            opacity: 0,
            transition: "opacity 0.3s",
            "&:hover": {
              opacity: 1,
            },
          }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : <DeleteForever />}
        </IconButton>
        <FolderIcon />
        <Typography
          variant="h6"
          component="span"
          sx={{ textTransform: "capitalize", color: "black" }}
        >
          {folder.name}
        </Typography>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-folder-dialog-title"
        aria-describedby="delete-folder-dialog-description"
      >
        <DialogTitle id="delete-folder-dialog-title">Delete Folder</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-folder-dialog-description">
            Are you sure you want to delete the folder {folder.name}? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GalleryFolder;
