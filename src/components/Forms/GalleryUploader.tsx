import uploadFile from "@/helpers/uploadFile";
import { PermMedia } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type INTFileUploaderProps = {
  name: string;
  imageUrl: string;
  setImageUrl: (image: string) => void;
  label: string;
  onClick?: () => void;
};

const GalleryUploader = ({ name, setImageUrl, imageUrl, label, onClick }: INTFileUploaderProps) => {
  const { control, setValue, watch } = useFormContext();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (!file) return;

    setLoading(true);

    try {
      const uploadPhoto = await uploadFile(file);
      if (uploadPhoto?.secure_url) {
        setImageUrl(uploadPhoto.secure_url);
        setValue(name, uploadPhoto.secure_url);
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Box
          sx={{
            padding: "20px",
            width: "100%",
            height: '250px',
            borderRadius: "10px",
            textAlign: "center",
            margin: '0 auto',
            border: '2px dashed #ddd'
          }}
        >
          <Box
            sx={{
              // padding: "20px",
              textAlign: "center",
              background: "#F9FAFB",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
              width: "250px",
              height: '150px',
              borderRadius: "15px",
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              // margin: '0 auto',
              cursor: 'pointer',
              flexDirection: 'column',
              margin: '15px auto'
            }}
            onClick={onClick}
          >
            {!imageUrl ? (
              <>
                <PermMedia
                  sx={{

                    color: "#111",
                    fontSize: 70,
                    background: "#E8EDFF",
                    borderRadius: "100%",


                  }}
                />
                <Typography component="p" fontSize="11px">
                  {loading ? "Loading..." : label}
                </Typography>
              </>
            ) : (
              <Image
                src={imageUrl}
                alt="Uploaded Image"
                width={110}
                height={110}
                style={{ borderRadius: "100%", objectFit: "cover" }}
              />
            )}
          </Box>
        </Box>
      )}
    />
  );
};

export default GalleryUploader;
