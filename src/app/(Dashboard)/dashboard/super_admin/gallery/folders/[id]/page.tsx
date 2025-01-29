"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  Pagination,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  IconFileTypeCsv,
  IconFileTypePdf,
  IconPhotoOff,
} from "@tabler/icons-react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useDeleteImagesMutation,
  useGetImagesByFolderQuery,
  useUploadImageMutation,
} from "@/redux/features/gallery/gallery.api";
import { toast } from "sonner";
import { TQueryParam } from "@/types/api.types";
import Image from "next/image"; // Assuming you're using Next.js
import AppSelectFile from "../../_components/AppSelectFile";
import ImageCard from "../../_components/ImageCard";
import PageContainer from "@/app/(Dashboard)/components/container/PageContainer";
import DashboardCard from "@/app/(Dashboard)/components/shared/DashboardCard";

const fileIcons: Record<string, JSX.Element> = {
  pdf: <IconFileTypePdf className="text-red-600 text-6xl" />,
  csv: <IconFileTypeCsv className="text-green-600 text-6xl" />,
};

interface FoldersImagesProps {
  params: { id: string };
}

const validationSchema = z.object({
  images: z
    .array(z.any())
    .nonempty("Please select at least one image")
    .refine(
      (files) => files.every((file: File) => file.size <= 2 * 1024 * 1024),
      "Each file must be less than 2MB"
    )
    .refine(
      (files) =>
        files.every((file: File) =>
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            file.type
          )
        ),
      "Supported formats: JPEG, JPG, PNG, WEBP"
    ),
});

const GalleryImages: React.FC<FoldersImagesProps> = ({ params }) => {
  const [queryParams, setQueryParams] = useState<TQueryParam[]>([
    { name: "folder", value: params.id },
    { name: "limit", value: 24 },
  ]);

  const {
    data: imagesData,
    isLoading,
    isFetching,
  } = useGetImagesByFolderQuery([...queryParams]) as any;

  const images = imagesData?.data?.images;
  const metaData = imagesData?.data?.meta;

  const methods = useForm({
    resolver: zodResolver(validationSchema),
  });

  const { handleSubmit, reset } = methods;

  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const [deleteImage] = useDeleteImagesMutation();
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Uploading image");
    try {
      const formData = new FormData();
      Array.from(data.images).forEach((file: unknown) => {
        formData.append("images", file as File);
      });
      formData.append("folder", params.id);

      await uploadImage(formData).unwrap();
      toast.success("Image uploaded successfully", { id: toastId });
      reset();
    } catch (error: any) {
      toast.error(
        error.data?.message || "An error occurred. Please try again.",
        {
          id: toastId,
          duration: 3000,
        }
      );
    }
  };

  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="Sample Page">
        <Box p={3}>
          <Typography variant="h4" gutterBottom>
            Manage {imagesData?.data?.folder} Images
          </Typography>
          {isLoading || isFetching ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="50vh"
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Card sx={{ width: 300, mb: 3, p: 2 }}>
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <AppSelectFile label="Upload Image" name="images" />
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      disabled={isUploading}
                      type="submit"
                      sx={{ mt: 2 }}
                    >
                      {isUploading ? "Uploading..." : "Upload"}
                    </Button>
                  </form>
                </FormProvider>
              </Card>

              <Grid container spacing={2} sx={{ mt: 3 }}>
                {images?.map((image: any) => (
                  <ImageCard
                    key={image._id}
                    image={image}
                    fileType={image.url.split(".").pop()?.toLowerCase() || ""}
                    fileIcons={fileIcons}
                
                  />
                ))}
              </Grid>

              <Box mt={5} display="flex" justifyContent="left">
                <Pagination
                  count={metaData?.totalPages || 1}
                  page={metaData?.page || 1}
                  onChange={(event, page) =>
                    setQueryParams([
                      { name: "page", value: page },
                      { name: "folder", value: params.id },
                      { name: "limit", value: 24 },
                    ])
                  }
                />
              </Box>
            </>
          )}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default GalleryImages;
