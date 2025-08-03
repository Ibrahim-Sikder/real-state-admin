"use client";

import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import { Box, Button, Grid, styled, } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import BNPRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";
import { useGetSingleVideoQuery, useUpdateVideoMutation } from "@/redux/api/videoApi";
// import { useGetSingleImgGalleryQuery, useUpdateImgGalleryMutation } from "@/redux/api/imageGalleryApi";

const FormContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(3),
}));
const FormSection = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
}));


type TProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    initialValues?: FieldValues;
    id: string | null,
};


const UpdateVideoModal = ({ open, setOpen, id }: TProps) => {
    const [videos, setVideos] = useState<string[]>([]);
    const [imageOpen, setImageOpen] = useState(false);


    const [updateVideo] = useUpdateVideoMutation()
    const { data, isLoading } = useGetSingleVideoQuery(id)

    const handleSubmit = async (data: FieldValues) => {
        data.image = videos;


        try {
            const res = await updateVideo({ ...data, id }).unwrap();

            toast.success(res?.message);

            setOpen(false);
        } catch (err: any) {

            toast.error(err?.message);
        }
    };

    const singleData = data?.data;

    useEffect(() => {
        if (singleData) {
            setVideos(singleData?.images || "");
        }
    }, [singleData]);
    if (isLoading) {
        return <p>Loading............</p>
    }

    const defaultValues = {
        title: singleData?.title,
        url: singleData?.url || "",
        // createdAt: singleData?.createdAt,

    };

    return (
        <>
            {
                isLoading ? (
                    <p>Loading........</p>
                ) : (
                    <BNPRightSideModal open={open} setOpen={setOpen} title="Update Photo Gallery">
                        <FormContainer>
                            <ADForm onSubmit={handleSubmit} defaultValues={defaultValues}>
                                <FormSection>
                                    <Grid container spacing={2}>
                                        {/* <Grid item md={12} sm={12}>
                                            <Box display="flex" alignItems="center" justifyContent="center" margin="0 auto" width="500px">
                                                <ADImageUpload
                                                    name="images"
                                                    setImageUrls={setImages}
                                                    imageUrls={images}
                                                    label="Select Images"
                                                    onClick={() => setImageOpen(true)}
                                                />

                                            </Box>
                                        </Grid> */}
                                        <Grid item md={12} sm={12}>
                                            <ADInput
                                                fullWidth
                                                name="title"
                                                label="Title"
                                                placeholder="Title"

                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <ADInput
                                                fullWidth
                                                name="url"
                                                label="URL"
                                                placeholder="Video URL"

                                            />
                                        </Grid>

                                        {/* <Grid item md={12} sm={12}>
                                            <ADDatePicker
                                                fullWidth
                                                name="createdAt"
                                                label="Date"
                                            />
                                        </Grid> */}

                                    </Grid>

                                    <Box display='flex' justifyContent='center' marginTop='20px' >
                                        <Button type="submit">Update Video </Button>
                                    </Box>
                                </FormSection>
                            </ADForm>
                        </FormContainer>
                        {/* <GlobalImageSelector
                            open={imageOpen}
                            onClose={() => setImageOpen(false)}
                            setSelectedImage={setImages}
                            mode="multiple"
                            selectedImage={images}
                        /> */}


                    </BNPRightSideModal>
                )
            }

        </>
    );
};

export default UpdateVideoModal;
