
import React, { useState } from "react";
import {
  Box,
  Card,
  Grid,
  IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import Image from "next/image";
import { IconFileTypeCsv } from "@tabler/icons-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useDeleteImagesMutation } from "@/redux/features/gallery/gallery.api";

interface ImageCardProps {
  image: any;
  fileType: string;
  fileIcons: Record<string, JSX.Element>;
}


const ImageCard = ({
  image,
  fileType,
  fileIcons,

}: ImageCardProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter()
  const isImageFile = ["jpg", "jpeg", "png",].includes(fileType);
  const [deleteImage] = useDeleteImagesMutation();



  const handleDelete = async (id: string, public_id: string) => {
    const toastId = toast.loading("Deleting image...");
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await deleteImage({ id, public_id }).unwrap();
        toast.success("Image deleted successfully!", {
          id: toastId,
          duration: 3000,
        });

        Swal.fire("Deleted!", "Your image has been deleted.", "success");
      }
    } catch (err: any) {
      console.error("Error deleting Image:", err);


      const errorMessage =
        err?.data?.message || "Failed to delete Image.";
      toast.error(errorMessage, {
        id: toastId,
        duration: 3000,
      });
    }
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
            onClick={() => handleDelete(image._id, image.public_id)}
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


    </>
  );
};

export default ImageCard;
