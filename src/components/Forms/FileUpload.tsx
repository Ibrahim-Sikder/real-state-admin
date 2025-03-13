import { CloudUpload, Close } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import uploadFile from "@/helpers/uploadFile";

type INTFileUploaderProps = {
  name: string;
  imageUrls: string[];
  setImageUrls: (images: string[]) => void;
  label: string;
  onClick?: () => void;
};

const ADImageUpload = ({ name, setImageUrls, imageUrls = [], label, onClick }: INTFileUploaderProps) => {
  const { control, setValue } = useFormContext();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    const uploadedUrls: string[] = [...imageUrls];

    try {
      for (let i = 0; i < files.length; i++) {
        const uploadPhoto = await uploadFile(files[i]);
        if (uploadPhoto?.secure_url) {
          uploadedUrls.push(uploadPhoto.secure_url);
        }
      }
      setImageUrls(uploadedUrls);
      setValue(name, uploadedUrls);
    } catch (error) {
      console.error("File upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  const onRemoveImage = (index: number) => {
    const updatedImages = [...imageUrls];
    updatedImages.splice(index, 1);
    setImageUrls(updatedImages);
    setValue(name, updatedImages);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <Box sx={{ padding: "20px", textAlign: "center", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Hide the upload box if images exist */}
          <Box
              sx={{
                textAlign: "center",
                background: "#fff",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                width: "130px",
                height: "130px",
                borderRadius: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                flexDirection: "column",
                marginBottom: "20px",
              }}
              onClick={onClick}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <CloudUpload sx={{ color: "#216740", fontSize: 60, borderRadius: "100%" }} />
              <Typography component="p" fontSize="11px" fontWeight="bold">
                {loading ? "Uploading..." : label}
              </Typography>
            </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {Array.isArray(imageUrls) && imageUrls.length > 0 &&
              imageUrls.map((url, index) => (
                <Box key={index} sx={{ position: "relative", display: "inline-block" }}>
                  <Image
                    src={url}
                    alt={`Uploaded Image ${index + 1}`}
                    width={110}
                    height={110}
                    style={{ borderRadius: "100%", objectFit: "cover" }}
                  />
                  <IconButton
                    onClick={() => onRemoveImage(index)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      '&:hover': { backgroundColor: "rgba(255, 255, 255, 1)" },
                    }}
                  >
                    <Close sx={{ color: "#ff0000" }} />
                  </IconButton>
                </Box>
              ))}
          </Box>
        </Box>
      )}
    />
  );
};

export default ADImageUpload;
