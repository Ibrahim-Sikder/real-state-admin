"use client";

import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import ADEditor from "@/components/Forms/JodiEditor";
import ANDModal from "@/components/Shared/Modal/ANAModal";
import { Box, Button, Grid, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";
import ADTextArea from "@/components/Forms/TextArea";
import { toast } from "sonner";
import ADDatePicker from "@/components/Forms/DatePicker";
import ADImageUpload from "@/components/Forms/FileUpload";
import ADAutoComplete from "@/components/Forms/AutoComplete";
import BNPRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";
import { tags } from "@/constant";
import { useCreateServoceMutation } from "@/redux/api/serviceApi";

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
};


const CreateServiceModal = ({ open, setOpen }: TProps) => {
    const [createService] = useCreateServoceMutation()

    const [images, setImages] = useState<string[]>([]);
    const [imageOpen, setImageOpen] = useState(false);


    const handleSubmit = async (values: FieldValues) => {
        const modifiedValues = {
            ...values,
            meta_keywords: values.meta_keywords || [],
            images,

        };


        try {
            const res = await createService(modifiedValues).unwrap();

            toast.success(res.message);
            setOpen(false);
        } catch (err: any) {
            console.error('Error:', err);
            toast.error(err?.data?.message);
        }
    };


    return (
        <>
            <BNPRightSideModal sx={{ width: '900px' }} open={open} setOpen={setOpen} title="Create Service ">
                <FormContainer>
                    <ADForm onSubmit={handleSubmit}>
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
                            <Box display='flex' justifyContent='center' marginTop='20px' >   <Button type="submit">Add Service </Button></Box>
                        </FormSection>
                    </ADForm>
                </FormContainer>

            </BNPRightSideModal>
            <GlobalImageSelector
                open={imageOpen}
                onClose={() => setImageOpen(false)}
                setSelectedImage={setImages}
                mode="multiple"
                selectedImage={images}
            />



        </>
    );
};

export default CreateServiceModal;
