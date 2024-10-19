import uploadFile from "@/helpers/uploadFile";
import { CloudUpload, PermMedia } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type INTFileUploaderProps = {
  name: string;
  imageUrls: string[]; // make sure this is always an array of strings
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

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <Box sx={{ padding: "20px", textAlign: "center", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box
            sx={{
              textAlign: "center",
              background: "#fff",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
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
              multiple // Enable multiple file selection
              style={{ display: "none" }}
              onChange={handleFileChange} // Handle file change
            />
            <CloudUpload sx={{ color: "#216740", fontSize: 60, borderRadius: "100%" }} />
            <Typography component="p" fontSize="11px" fontWeight="bold">
              {loading ? "Uploading..." : label}
            </Typography>
          </Box>

          {/* Display uploaded images */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {Array.isArray(imageUrls) && imageUrls.length > 0 && // Ensure imageUrls is an array before mapping
              imageUrls.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  alt={`Uploaded Image ${index + 1}`}
                  width={110}
                  height={110}
                  style={{ borderRadius: "100%", objectFit: "cover" }}
                />
              ))}
          </Box>
        </Box>
      )}
    />
  );
};

export default ADImageUpload;
