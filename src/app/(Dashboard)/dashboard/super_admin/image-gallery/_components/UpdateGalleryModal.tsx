"use client";

import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import BNPModal from "@/components/Shared/Modal/BNPModal";
import { Box, Button, Grid, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";
import { toast } from "sonner";
import GalleryUploader from "@/components/Forms/GalleryUploader";
import { useGetSingleImgGalleryQuery, useUpdateImgGalleryMutation } from "@/redux/api/imageGalleryApi";

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




const UpdateDisappearancesModal = ({ open, setOpen, id }: TProps) => {
    const [updateImgGallery] = useUpdateImgGalleryMutation()
    const { data, isLoading } = useGetSingleImgGalleryQuery(id)
    const [thumnailImg, setThumnailImg] = useState<string>("")
    const [thumnailImgOpen, setThumnailImgOpen] = useState(false)

    const handleSubmit = async (data: FieldValues) => {
        data.thumnail_img = thumnailImg;
        try {
            const res = await updateImgGallery({ ...data, id }).unwrap();
          
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
            setThumnailImg(singleData?.thumnail_img || "");
        }
    }, [singleData]);
    if (isLoading) {
        return <p>Loading............</p>
    }

    const defaultValues = {
        thumnail_img: singleData?.thumnail_img || '',
        name: singleData?.name || '',
        slug: singleData?.slug || ''
    };


    return (
        <>
            {
                isLoading ? (
                    <p>Loading........</p>
                ) : (
                    <BNPModal open={open} setOpen={setOpen} title="Update Programm & Notice ">
                        <FormContainer>
                            <ADForm onSubmit={handleSubmit} defaultValues={defaultValues}>
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
                        <GlobalImageSelector
                            open={thumnailImgOpen}
                            onClose={() => setThumnailImgOpen(false)}
                            setSelectedImage={setThumnailImg}
                            mode="single"
                            selectedImage={thumnailImg}
                        />
                    </BNPModal>
                )
            }

        </>
    );
};

export default UpdateDisappearancesModal;
