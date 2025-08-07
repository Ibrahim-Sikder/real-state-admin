import { CloudUpload, Close, PictureAsPdf } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import uploadFile from "@/helpers/uploadFile";

type INTFileUploaderProps = {
  name: string;
  pdfUrls: string[];
  setPdfUrls: (pdfs: string[]) => void;
  label: string;
  onClick?: () => void;
};

const PdfUploader = ({ name, setPdfUrls, pdfUrls = [], label }: INTFileUploaderProps) => {
  const { control, setValue } = useFormContext();
  const [loading, setLoading] = React.useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null); 

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    const uploadedUrls: string[] = [...pdfUrls];

    try {
      for (let i = 0; i < files.length; i++) {
        const uploadPdf = await uploadFile(files[i]);
        if (uploadPdf?.secure_url) {
          uploadedUrls.push(uploadPdf.secure_url);
        }
      }
      setPdfUrls(uploadedUrls);
      setValue(name, uploadedUrls);
    } catch (error) {
      console.error("File upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  const onRemovePdf = (index: number) => {
    const updatedPdfs = [...pdfUrls];
    updatedPdfs.splice(index, 1);
    setPdfUrls(updatedPdfs);
    setValue(name, updatedPdfs);
  };
  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <Box sx={{ padding: "20px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
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
            onClick={handleBoxClick} 
          >
            <input
              type="file"
              accept=".pdf"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <CloudUpload sx={{ color: "#216740", fontSize: 60 }} />
            <Typography component="p" fontSize="11px" fontWeight="bold">
              {loading ? "Uploading..." : label}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            {pdfUrls.map((url, index) => (
              <Box key={index} sx={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <PictureAsPdf sx={{ fontSize: 60, color: "#d32f2f" }} />
                <Typography variant="body2" sx={{ wordBreak: "break-all" }}>{`PDF ${index + 1}`}</Typography>
                <IconButton
                  onClick={() => onRemovePdf(index)}
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

export default PdfUploader;
