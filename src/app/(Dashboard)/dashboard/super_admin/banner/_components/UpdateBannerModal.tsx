"use client";

import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import BNPModal from "@/components/Shared/Modal/BNPModal";
import { Box, Button, Grid, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";
import { toast } from "sonner";
import ADImageUpload from "@/components/Forms/FileUpload";
import ADTextArea from "@/components/Forms/TextArea";
import { useGetSingleBannerQuery, useUpdateBannerMutation } from "@/redux/api/bannerApi";
import BNPRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";

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
    id: string | null
};




const UpdateBannerModal = ({ open, setOpen, id }: TProps) => {

    const [image, setImage] = useState<string>('')
    const [updateBanner] = useUpdateBannerMutation()
    const { data, isLoading } = useGetSingleBannerQuery(id)

    const [profileOpen, setProfileOpen] = useState(false)




    const handleSubmit = async (data: FieldValues) => {
        data.profile = image;

        try {
            const res = await updateBanner({ ...data, id }).unwrap();
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
            setImage(singleData?.profile || "");
        }
    }, [singleData]);
    if (isLoading) {
        return <p>Loading............</p>
    }

    const defaultValues = {
        name: singleData?.name || '',
        designation: singleData?.designation || '',
        profile: singleData?.profile || '',
        description: singleData?.description || ''


    };


    return (
        <>
            <BNPRightSideModal width='600px' open={open} setOpen={setOpen} title="Update Banner ">
                <FormContainer>
                    <ADForm onSubmit={handleSubmit} defaultValues={defaultValues}>
                        <FormSection>
                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12}>
                                    <Box display="flex" alignItems="center" justifyContent="center" margin="0 auto" width="500px">
                                        <ADImageUpload
                                            name="image"
                                            setImageUrl={setImage}
                                            imageUrl={image}
                                            label="Profile Image"
                                            onClick={() => setProfileOpen(true)}
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
                                        name="title"
                                        label="Title"
                                        autoFocus={true}
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <ADTextArea
                                        fullWidth
                                        name="description"
                                        label="Description"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <Button fullWidth type="submit">Add Banner </Button>
                                </Grid>
                            </Grid>



                        </FormSection>
                    </ADForm>
                </FormContainer>

            </BNPRightSideModal>
            <GlobalImageSelector
                open={profileOpen}
                onClose={() => setProfileOpen(false)}
                setSelectedImage={setImage}
                mode="single"
                selectedImage={image}
            />

        </>
    );
};

export default UpdateBannerModal;
