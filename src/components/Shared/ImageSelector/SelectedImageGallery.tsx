// components/SelectedImageGallery.tsx

import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";

interface SelectedImageGalleryProps {
  selectedImage: string | string[];
}

const SelectedImageGallery: React.FC<SelectedImageGalleryProps> = ({
  selectedImage,
}) => {
  const images = Array.isArray(selectedImage) ? selectedImage : [selectedImage];

  return (
    <Box display="flex" flexWrap="wrap" mt={2}>
      {images.filter(Boolean).map((img, index) => (
        <Box
          key={index}
          position="relative"
          width={100}
          height={100}
          sx={{ margin: 1 }}
        >
          <Image
            src={img}
            alt={`Selected ${index}`}
            layout="fill"
            objectFit="cover"
            quality={100} // Adjust quality as needed
          />
        </Box>
      ))}
    </Box>
  );
};

export default SelectedImageGallery;
