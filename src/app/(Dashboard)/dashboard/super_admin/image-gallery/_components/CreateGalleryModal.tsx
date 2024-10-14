"use client";

import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import BNPModal from "@/components/Shared/Modal/BNPModal";
import { Box, Button, Grid, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";

import { toast } from "sonner";
import GalleryUploader from "@/components/Forms/GalleryUploader";
import { useCreateImgGalleryMutation } from "@/redux/api/imageGalleryApi";

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


const CreateGalleryModal = ({ open, setOpen }: TProps) => {
    const [createImgGallery] = useCreateImgGalleryMutation()
    const [thumnailImg, setThumnailImg] = useState<string>("");
    const [thumnailImgOpen, setThumnailImgOpen] = useState(false);


    const handleSubmit = async (values: FieldValues) => {
        const modifiedValues = {
            ...values,
            category: values.category || [],
            meta_keywords: values.meta_keywords || [],
            thumnail_img: thumnailImg,

        };
        try {
            const res = await createImgGallery(modifiedValues).unwrap();
    
            toast.success(res.message);
            setOpen(false);
        } catch (err: any) {
            console.error("Error:", err);
            toast.error(err?.data?.message);
        }
    };

    return (
        <>
            <BNPModal sx={{ width: '700px', margin: '0 auto' }} open={open} setOpen={setOpen} title="Add Photo Gallery ">
                <FormContainer>
                    <ADForm onSubmit={handleSubmit}>
                        <FormSection>
                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12}>
                                    <ADInput
                                        fullWidth
                                        name="name"
                                        label="Name"
                                        placeholder="Name"

                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <ADInput
                                        fullWidth
                                        name="slug"
                                        label="Slug"
                                        placeholder="Name"

                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <Typography marginBottom='5px' fontWeight='bold'>Media </Typography>
                                    <GalleryUploader
                                        onClick={() => setThumnailImgOpen(true)}
                                        name="thumnail_img"
                                        setImageUrl={setThumnailImg}
                                        imageUrl={thumnailImg}
                                        label="Thumnail Image"
                                    />


                                </Grid>


                            </Grid>
                            <Box display='flex' justifyContent='center' marginTop='20px' >   <Button type="submit">Add Gallery  </Button></Box>
                        </FormSection>
                    </ADForm>
                </FormContainer>

            </BNPModal>
            <GlobalImageSelector
                open={thumnailImgOpen}
                onClose={() => setThumnailImgOpen(false)}
                setSelectedImage={setThumnailImg}
                mode="single"
                selectedImage={thumnailImg}
            />
        </>
    );
};

export default CreateGalleryModal;
