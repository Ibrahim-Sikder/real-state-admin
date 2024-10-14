import React, { useState } from "react";
import {
  Box,
  Card,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import Image from "next/image";
import { IconFileTypeCsv } from "@tabler/icons-react";

interface ImageCardProps {
  image: any;
  fileType: string;
  fileIcons: Record<string, JSX.Element>;
  deleteImage: ({ public_id, id }: { public_id: string; id: string }) => void;
}

const ImageCard = ({
  image,
  fileType,
  fileIcons,
  deleteImage,
}: ImageCardProps) => {
  const [open, setOpen] = useState(false);

  const isImageFile = ["jpg", "jpeg", "png", "gif", "webp"].includes(fileType);

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteImage({ public_id: image.public_id, id: image._id });
    setOpen(false);
  };

  return (
    <>
      <Grid item xs={6} sm={4} md={3} lg={2}>
        <Card sx={{ p: 2, position: "relative", backgroundColor: "#F2F4F8" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 120,
              mb: 2,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {isImageFile ? (
              <Image
                src={image.url}
                alt={image.name}
                layout="fill"
                objectFit="contain"
                priority
              />
            ) : (
              <a href={image.url} target="_blank" rel="noopener noreferrer">
                {fileIcons[fileType] || (
                  <IconFileTypeCsv className="text-gray-600 text-6xl" />
                )}
              </a>
            )}
          </Box>
          <IconButton
            onClick={handleDeleteClick}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "red",
            }}
          >
            <Delete />
          </IconButton>
        </Card>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-confirmation-dialog"
      >
        <DialogTitle id="delete-confirmation-dialog">Delete Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this image? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ImageCard;
