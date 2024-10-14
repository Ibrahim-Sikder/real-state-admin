"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Drawer,
  Grid,
  Select,
  MenuItem,
  Stack,
  Pagination,
  Typography,
  IconButton,
} from "@mui/material";
import { Refresh, Delete, FolderDelete } from "@mui/icons-material";
import {
  IconFileTypeCsv,
  IconFileTypePdf,
  IconPhotoOff,
} from "@tabler/icons-react";
import {
  useDeleteImageMutation,
  useGetAllImagesQuery,
  useGetFoldersQuery,
} from "@/redux/features/gallery/gallery.api";

import { TQueryParam } from "@/types/api.types";
import Image from "next/image";
import UploadImageDialog from "@/app/(Dashboard)/dashboard/super_admin/gallery/_components/UploadImageDialog";
import CreateFolder from "@/app/(Dashboard)/dashboard/super_admin/gallery/_components/CreateFolder";
import ImageLoadingSkeleton from "@/app/(Dashboard)/dashboard/super_admin/gallery/_components/ImageLoadingSkeleton";

interface Props {
  open: boolean;
  onClose: () => void;
  setSelectedImage: any;
  mode: string;
  selectedImage: string | string[];
}

const GlobalImageSelector = ({
  open,
  onClose,
  selectedImage,
  setSelectedImage,
  mode,
}: Props) => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  useEffect(() => {
    if (mode === "single" && typeof selectedImage === "string") {
      setSelectedImages([selectedImage]);
    } else if (mode === "multiple" && Array.isArray(selectedImage)) {
      setSelectedImages(selectedImage);
    }
  }, [selectedImage, mode]);

  const {
    data: imagesData,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllImagesQuery([...params]) as any;

  const [deleteImage] = useDeleteImageMutation();
  const {
    data: foldersData,
    isLoading: foldersIsLoading,
    isFetching: foldersIsFetching,
  } = useGetFoldersQuery(undefined) as any;

  const metaData = imagesData?.meta;
  const images = imagesData?.data;

  const handleFolderChange = (event: any) => {
    setParams([{ name: "folder", value: event.target.value }]);
  };

  const handleSelectImage = (imageUrl: string) => {
    if (mode === "single") {
      setSelectedImages([imageUrl]);
    } else {
      setSelectedImages((prevSelected) =>
        prevSelected.includes(imageUrl)
          ? prevSelected.filter((img) => img !== imageUrl)
          : [...prevSelected, imageUrl]
      );
    }
  };

  const handleOk = () => {
    setSelectedImage(mode === "single" ? selectedImages[0] : selectedImages);
    onClose();
  };

  // Define file icons for non-image files
  const fileIcons: Record<string, JSX.Element> = useMemo(
    () => ({
      pdf: <IconFileTypePdf className="text-red-600 text-6xl" />,
      csv: <IconFileTypeCsv className="text-green-600 text-6xl" />,
    }),
    []
  );

  if (foldersIsLoading) {
    return <p>Loading........</p>;
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "80%",
          display: "flex",
          flexDirection: "column",

        },
      }}
      style={{ zIndex: "1300" }}

    >
      <Box p={3} sx={{ flex: 1, overflow: "auto" }}>
        <Typography variant="h6" mb={2}>
          Select Image from Gallery
        </Typography>
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap" mb={3}>
          {foldersIsLoading ? (
            <p>Loading folders...</p>
          ) : (
            <Select
              value={
                params.find((param) => param.name === "folder")?.value || ""
              }
              onChange={handleFolderChange}
              displayEmpty
              fullWidth
              variant="outlined"
              size="small"
              sx={{ minWidth: 200, maxWidth: 300, zIndex: '999999' }}
            >
              <MenuItem value="" disabled>
                Select a folder
              </MenuItem>
              {foldersData?.data?.map((folder: any) => (
                <MenuItem key={folder._id} value={folder._id}>
                  {folder.name}
                </MenuItem>
              ))}
            </Select>
          )}

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => refetch()}
              startIcon={<Refresh />}
            >
              Refresh
            </Button>
            <UploadImageDialog folders={foldersData?.data} />

            <CreateFolder />
          </Stack>
        </Box>

        {isLoading || isFetching ? (
          <ImageLoadingSkeleton />
        ) : images?.length > 0 ? (
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: 5,
            }}
          >
            {images?.map((image: any) => {
              const fileType = image.url.split(".").pop()?.toLowerCase() || "";
              return (
                <Grid item xs={6} sm={4} md={2} key={image._id}>
                  <Box
                    position="relative"
                    borderRadius={2}
                    overflow="hidden"
                    border={
                      selectedImages.includes(image.url)
                        ? "2px solid blue"
                        : "none"
                    }
                    onClick={() => handleSelectImage(image.url)}
                    sx={{ cursor: "pointer", p: 1 }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: 150,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "grey.100",
                        borderRadius: 2,
                      }}
                    >
                      {fileType === "jpg" ||
                        fileType === "jpeg" ||
                        fileType === "png" ? (
                        <Image
                          src={image.url}
                          alt={image.url}
                          layout="fill"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        fileIcons[fileType] || <IconPhotoOff fontSize="large" />
                      )}
                    </Box>
                    {/* <IconButton
                      color="error"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteImage({ id: image._id });
                      }}
                      sx={{ position: "absolute", top: 8, right: 8 }}
                    >
                      <Delete />
                    </IconButton> */}
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
            }}
          >
            <IconPhotoOff style={{ fontSize: 64, color: "gray" }} />
            <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
              No images found
            </Typography>
          </Box>
        )}
      </Box>

      {/* Footer with Pagination and Buttons */}
      <Box sx={{ p: 3, borderTop: "1px solid #ddd" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Pagination
            count={metaData?.totalPages || 1}
            page={metaData?.page || 1}
            onChange={(event, page) =>
              setParams([{ name: "page", value: page }])
            }
          />
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOk}
              disabled={selectedImages.length === 0}
            >
              Pick Selected
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default GlobalImageSelector;
