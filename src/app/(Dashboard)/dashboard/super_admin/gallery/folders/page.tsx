"use client";

import { useState } from "react";
import {
  Grid,
  Typography,
  Box,
  CircularProgress,
  TextField,
  Pagination,
  Autocomplete,
} from "@mui/material";
import { useGetFoldersQuery } from "@/redux/features/gallery/gallery.api";
import PageContainer from "@/app/(Dashboard)/components/container/PageContainer";
import DashboardCard from "@/app/(Dashboard)/components/shared/DashboardCard";
import GalleryFolder from "../_components/GalleryFolder";
import FolderLoadingSkeleton from "../_components/FolderLoadingSkeleton";
import CreateFolder from "../_components/CreateFolder";
import { TQueryParam } from "@/types/api.types";

const FoldersPage = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const {
    data: foldersData,
    isLoading,
    isFetching,
  } = useGetFoldersQuery([...params]) as any;

  const metaData = foldersData?.meta;
  const folders = foldersData?.data;

  const handleSearch = (value: string) => {
    setParams([{ name: "searchTerm", value: value }]);
  };

  return (
    <PageContainer
      title="Manage Gallery"
      description="Manage your gallery folders here"
    >
      <DashboardCard title="Gallery Folders">
        {isLoading ? (
          <FolderLoadingSkeleton />
        ) : (
          <>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <CreateFolder />
              <Autocomplete
                freeSolo
                id="folder-search"
                size="medium"
                disableClearable
                options={(folders as any[])?.map((folder) => folder.name) || []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search folders"
                    variant="outlined"
                    onChange={(e) => handleSearch(e.target.value)}
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
                sx={{ width: 300 }}
              />
            </Box>
            {folders?.length === 0 ? (
              <Typography variant="h6" color="textSecondary" align="center">
                No folders found
              </Typography>
            ) : (
              <Grid
                container
                spacing={3}
                sx={{
                  marginTop: 5,
                }}
              >
                {folders?.map((folder: any) => (
                  <Grid item xs={12} sm={6} md={4} lg={2} key={folder._id}>
                    <GalleryFolder folder={folder} />
                  </Grid>
                ))}
              </Grid>
            )}
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                count={metaData?.totalPages || 1}
                page={metaData?.page || 1}
                onChange={(event, page) =>
                  setParams([{ name: "page", value: page.toString() }])
                }
                color="primary"
              />
            </Box>
          </>
        )}
      </DashboardCard>
    </PageContainer>
  );
};

export default FoldersPage;
