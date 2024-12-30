"use client";

import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import ADEditor from "@/components/Forms/JodiEditor";
import { Box, Button, Grid, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";
import ADTextArea from "@/components/Forms/TextArea";
import { toast } from "sonner";
import ADDatePicker from "@/components/Forms/DatePicker";
import ADAutoComplete from "@/components/Forms/AutoComplete";
import BNPRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";
import ADImageUpload from "@/components/Forms/FileUpload";
import { tags } from "@/constant";
import { useGetSingleServoceQuery, useUpdateServoceMutation } from "@/redux/api/serviceApi";

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


const UpdateServiceModal = ({ open, setOpen, id }: TProps) => {
    const [images, setImages] = useState<string[]>([]);
    const [imageOpen, setImageOpen] = useState(false);

    const [updateService] = useUpdateServoceMutation()
    const { data, isLoading } = useGetSingleServoceQuery(id)

    const handleSubmit = async (data: FieldValues) => {
        data.images = images;
        if (Array.isArray(data.meta_keywords)) {
            data.meta_keywords = data.meta_keywords.filter(key => key != null).map(
                (key: any) => (typeof key === 'object' ? key.meta_keywords : key)
            );
        }


        try {
            const res = await updateService({ ...data, id }).unwrap();

            toast.success(res.message);

            setOpen(false);
        } catch (err: any) {
            console.error('Error:', err);
            toast.error(err.message);
        }
    };

    const singleData = data?.data;

    useEffect(() => {
        if (singleData) {
            setImages(singleData?.images || "");
        }
    }, [singleData]);
    if (isLoading) {
        return <p>Loading............</p>
    }

    const defaultValues = {
        title: singleData?.title || "",
        description: singleData?.description || "",
        slug: singleData?.slug || "",
        meta_title: singleData?.meta_title || "",
        meta_description: singleData?.meta_description || "",
        meta_keywords: singleData?.meta_keywords || "",
        date: singleData?.date || "",

    };

    return (
        <>
            {
                isLoading ? (
                    <p>Loading........</p>
                ) : (
                    <BNPRightSideModal open={open} setOpen={setOpen} title="Update Services">
                        <FormContainer>
                            <ADForm onSubmit={handleSubmit} defaultValues={defaultValues}>
                                <FormSection>
                                    <Grid container spacing={2}>
                                        <Grid item md={12} sm={12}>
                                            <Box display="flex" alignItems="center" justifyContent="center" margin="0 auto" width="500px">
                                                <ADImageUpload
                                                    name="images"
                                                    setImageUrls={setImages}
                                                    imageUrls={images}
                                                    label="Select Images"
                                                    onClick={() => setImageOpen(true)}
                                                />

                                            </Box>
                                        </Grid>


                                        <Grid item md={12} sm={12}>
                                            <ADInput
                                                fullWidth
                                                name="title"
                                                label="Title"
                                                autoFocus={true}
                                            />
                                        </Grid>




                                        <Grid item md={12} sm={12}>
                                            <ADInput
                                                fullWidth
                                                name="slug"
                                                label="Slug"
                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <ADDatePicker
                                                fullWidth
                                                name="date"
                                                label="Post Date"

                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <ADEditor name="description" label="Description" />
                                        </Grid>



                                    </Grid>
                                    <Typography variant="h5" fontWeight='bold' >SEO Section </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item md={12} sm={12}>
                                            <ADInput
                                                fullWidth
                                                name="meta_title"
                                                label="Meta Title"
                                                placeholder="Enter Meta Title"
                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <ADAutoComplete
                                                label="Meta Keywords"
                                                name="meta_keywords"
                                                options={tags}
                                            />

                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <ADTextArea
                                                name="meta_description"
                                                label="Meta Description"
                                                placeholder="Enter Meta Description"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Box display='flex' justifyContent='center' marginTop='20px' >   <Button type="submit">Update Service </Button></Box>
                                </FormSection>
                            </ADForm>
                        </FormContainer>
                        <GlobalImageSelector
                            open={imageOpen}
                            onClose={() => setImageOpen(false)}
                            setSelectedImage={setImages}
                            mode="multiple"
                            selectedImage={images}
                        />


                    </BNPRightSideModal>
                )
            }

        </>
    );
};

export default UpdateServiceModal;
