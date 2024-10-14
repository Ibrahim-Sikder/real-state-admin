import uploadFile from "@/helpers/uploadFile";
import { CloudUpload, PermMedia } from "@mui/icons-material";
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

const ADImageUpload = ({ name, setImageUrl, imageUrl, label, onClick }: INTFileUploaderProps) => {
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
            width: "150px",
            height: '150px',
            borderRadius: "100%",
            textAlign: "center",
            margin: '0 auto',
          }}
        >
          <Box
            sx={{

              textAlign: "center",
              background: "#fff",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
              width: "130px",
              height: '130px',
              borderRadius: "100%",
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

              cursor: 'pointer',
              flexDirection: 'column'
            }}
            onClick={onClick}
          >
            {!imageUrl ? (
              <>
                <CloudUpload
                  sx={{

                    color: "#216740",
                    fontSize: 60,


                    borderRadius: "100%",


                  }}
                />
                <Typography component="p" fontSize="11px" fontWeight='bold'>
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

export default ADImageUpload;
