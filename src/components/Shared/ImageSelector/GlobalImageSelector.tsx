"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
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
  CircularProgress,
} from "@mui/material"
import { Refresh } from "@mui/icons-material"
import { IconFileTypeCsv, IconFileTypePdf, IconPhotoOff } from "@tabler/icons-react"
import { useDeleteImagesMutation, useGetAllImagesQuery, useGetFoldersQuery } from "@/redux/features/gallery/gallery.api"

import type { TQueryParam } from "@/types/api.types"
import Image from "next/image"
import UploadImageDialog from "@/app/(Dashboard)/dashboard/super_admin/gallery/_components/UploadImageDialog"
import CreateFolder from "@/app/(Dashboard)/dashboard/super_admin/gallery/_components/CreateFolder"
import ImageLoadingSkeleton from "@/app/(Dashboard)/dashboard/super_admin/gallery/_components/ImageLoadingSkeleton"

interface Props {
  open: boolean
  onClose: () => void
  setSelectedImage: any
  mode: string
  selectedImage: string | string[]
}

const GlobalImageSelector = ({ open, onClose, selectedImage, setSelectedImage, mode }: Props) => {
  const [params, setParams] = useState<TQueryParam[]>([
    { name: "page", value: 1 },
    { name: "limit", value: 12 },
  ])
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (mode === "single" && typeof selectedImage === "string") {
      setSelectedImages([selectedImage])
    } else if (mode === "multiple" && Array.isArray(selectedImage)) {
      setSelectedImages(selectedImage)
    }
  }, [selectedImage, mode])

  const { data: imagesData, isLoading, isFetching, refetch } = useGetAllImagesQuery([...params]) as any

  const [deleteImage] = useDeleteImagesMutation()
  const {
    data: foldersData,
    isLoading: foldersIsLoading,
    isFetching: foldersIsFetching,
  } = useGetFoldersQuery(undefined) as any

  const metaData = imagesData?.meta
  const images = imagesData?.data

  const handleFolderChange = (event: any) => {
    const folderId = event.target.value
    setCurrentPage(1)

    setParams([
      { name: "folder", value: folderId },
      { name: "page", value: 1 },
      { name: "limit", value: 20 },
    ])
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)

    // Update only the page parameter while keeping other params
    const updatedParams = params.map((param) => (param.name === "page" ? { ...param, value: page } : param))

    // If page param doesn't exist, add it
    if (!updatedParams.some((param) => param.name === "page")) {
      updatedParams.push({ name: "page", value: page })
    }

    setParams(updatedParams)
  }

  const handleSelectImage = (imageUrl: string) => {
    if (mode === "single") {
      setSelectedImages([imageUrl])
    } else {
      setSelectedImages((prevSelected) =>
        prevSelected.includes(imageUrl) ? prevSelected.filter((img) => img !== imageUrl) : [...prevSelected, imageUrl],
      )
    }
  }

  const handleOk = () => {
    setSelectedImage(mode === "single" ? selectedImages[0] : selectedImages)
    onClose()
  }

  // Define file icons for non-image files
  const fileIcons: Record<string, JSX.Element> = useMemo(
    () => ({
      pdf: <IconFileTypePdf className="text-red-600 text-6xl" />,
      csv: <IconFileTypeCsv className="text-green-600 text-6xl" />,
    }),
    [],
  )

  // Calculate total pages based on meta data
  const totalPages = metaData?.totalPage || 1

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
            <CircularProgress size={24} />
          ) : (
            <Select
              value={params.find((param) => param.name === "folder")?.value || ""}
              onChange={handleFolderChange}
              displayEmpty
              fullWidth
              variant="outlined"
              size="small"
              sx={{ minWidth: 200, maxWidth: 300, zIndex: "999999" }}
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
              disabled={isLoading || isFetching}
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
              const fileType = image.url.split(".").pop()?.toLowerCase() || ""
              return (
                <Grid item xs={6} sm={4} md={2} key={image._id}>
                  <Box
                    position="relative"
                    borderRadius={2}
                    overflow="hidden"
                    border={selectedImages.includes(image.url) ? "2px solid blue" : "none"}
                    onClick={() => handleSelectImage(image.url)}
                    sx={{
                      cursor: "pointer",
                      p: 1,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      },
                    }}
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
                        position: "relative",
                      }}
                    >
                      {fileType === "jpg" || fileType === "jpeg" || fileType === "png" ? (
                        <Image
                          src={image.url || "/placeholder.svg"}
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
                  </Box>
                </Grid>
              )
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
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body2" color="text.secondary" mb={1}>
              {images?.length ? `Showing ${images.length} of ${metaData?.total || 0} images` : "No images"}
            </Typography>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              disabled={isLoading || isFetching}
              showFirstButton
              showLastButton
            />
          </Box>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleOk} disabled={selectedImages.length === 0}>
              Pick Selected {selectedImages.length > 0 && `(${selectedImages.length})`}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  )
}

export default GlobalImageSelector

