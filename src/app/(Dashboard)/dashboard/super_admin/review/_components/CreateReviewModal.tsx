"use client";

import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import { Box, Button, Grid, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";
import ADTextArea from "@/components/Forms/TextArea";
import { toast } from "sonner";
import ADDatePicker from "@/components/Forms/DatePicker";
import ADImageUpload from "@/components/Forms/FileUpload";
import BNPRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";
import { useCreatereviewMutation } from "@/redux/api/reviewApi";

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


const CreateReviewModal = ({ open, setOpen }: TProps) => {
    const [createReview] = useCreatereviewMutation()
    const [images, setImages] = useState<string[]>([]);
    const [imageOpen, setImageOpen] = useState(false);



    const handleSubmit = async (values: FieldValues) => {
        const modifiedValues = {
            ...values,
            images

        };

        try {
            const res = await createReview(modifiedValues).unwrap();

            toast.success(res.message);
            setOpen(false);
        } catch (err: any) {

            toast.error(err?.data?.message);
        }
    };




    return (
        <>
            <BNPRightSideModal sx={{ width: '500px' }} open={open} setOpen={setOpen} title="Create Review ">
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
                                        name="name"
                                        label="Name"
                                        autoFocus={true}
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <ADInput
                                        fullWidth
                                        name="designation"
                                        label="Designation"
                                        autoFocus={true}
                                    />
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
                                    <ADDatePicker
                                        fullWidth
                                        name="createdAt"
                                        label="Post Date"

                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <Typography variant="h5" fontWeight='semibold'>Description</Typography>
                                    <ADTextArea sx={{ border: '1px solid black', borderRadius: '3px' }} name="description" minRows={5} />
                                </Grid>
                            </Grid>

                            <Box display='flex' justifyContent='center' marginTop='20px' >   <Button type="submit">Add Review </Button></Box>
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

export default CreateReviewModal;
