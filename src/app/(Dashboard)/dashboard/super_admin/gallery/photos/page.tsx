"use client";

import { useState, useMemo } from "react";
import {
  Box,
  Button,
  Grid,
  Pagination,
  Select,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";
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
import PageContainer from "@/app/(Dashboard)/components/container/PageContainer";
import DashboardCard from "@/app/(Dashboard)/components/shared/DashboardCard";
import UploadImageDialog from "../_components/UploadImageDialog";
import ImageLoadingSkeleton from "../_components/ImageLoadingSkeleton";
import ImageCard from "../_components/ImageCard";
import CreateFolder from "../_components/CreateFolder";
import { TQueryParam } from "@/types/api.types";
const PhotosPage = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);

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

  const folders = foldersData;
  const metaData = imagesData?.meta;
  const images = imagesData?.data;
 

  const handleFolderChange = (event: any) => {
    setParams([{ name: "folder", value: event.target.value }]);
  };

  // Define file icons for non-image files
  const fileIcons: Record<string, JSX.Element> = useMemo(
    () => ({
      pdf: <IconFileTypePdf className="text-red-600 text-6xl" />,
      csv: <IconFileTypeCsv className="text-green-600 text-6xl" />,
    }),
    []
  );

  return (
    <PageContainer
      title="Manage your images here"
      description="Manage your images here"
    >
      {/* Rest of the PhotosPage code */}
      <DashboardCard title="Select a folder to view images">
        {/* Folder select and buttons */}
        <Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            flexWrap="wrap"
          >
            <Select
              value={
                params.find((param) => param.name === "folder")?.value || ""
              }
              onChange={handleFolderChange}
              displayEmpty
              fullWidth
              variant="outlined"
              size="small"
              sx={{ minWidth: 200, maxWidth: 300 }}
            >
              <MenuItem value="" disabled>
                Select a folder
              </MenuItem>
              {folders?.data?.map((folder: any) => (
                <MenuItem key={folder._id} value={folder._id}>
                  {folder.name}
                </MenuItem>
              ))}
            </Select>

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
            <>
              <Grid container spacing={2} sx={{ mt: 10 }}>
                {images?.map((image: any) => (
                  <ImageCard
                    key={image._id}
                    image={image}
                    fileType={image.url.split(".").pop()?.toLowerCase() || ""}
                    fileIcons={fileIcons}
                    deleteImage={deleteImage}
                  />
                ))}
              </Grid>


              <Pagination
                count={metaData?.totalPages || 1}
                page={metaData?.page || 1}
                onChange={(event, page) =>
                  setParams([{ name: "page", value: page }])
                }
                sx={{ mt: 3 }}
              />
            </>
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
      </DashboardCard>
    </PageContainer>
  );
};

export default PhotosPage;
