import { useState, useCallback } from "react";

const useImageSelector = (initialMode = "multiple") => { // Updated to default to "multiple"
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string[]>([]); // Ensure it's an array

  const handleOpenDrawer = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return {
    isDrawerOpen,
    selectedImage,
    handleOpenDrawer,
    handleCloseDrawer,
    setSelectedImage,
    mode: initialMode,
  };
};

export default useImageSelector;
