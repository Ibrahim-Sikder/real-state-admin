"use client";

import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import BNPModal from "@/components/Shared/Modal/BNPModal";
import { Box, Button, Grid, styled } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";
import { toast } from "sonner";
import ADImageUpload from "@/components/Forms/FileUpload";
import { useCreatlBannerMutation } from "@/redux/api/bannerApi";
import ADTextArea from "@/components/Forms/TextArea";
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
};




const CreateBannerModal = ({ open, setOpen }: TProps) => {
    const [createBanner] = useCreatlBannerMutation()
    const [image, setImage] = useState<string>('')
    const [profileOpen, setProfileOpen] = useState(false)
    const handleSubmit = async (values: FieldValues) => {

        const modifiedValues = {
            ...values,
            profile: image

        };

        try {
            const res = await createBanner(modifiedValues).unwrap();
            toast.success(res.message);
            setOpen(false);
        } catch (err: any) {
            toast.error(err?.data?.message);
        }
    };


    return (
        <>
            <BNPRightSideModal width='600px' open={open} setOpen={setOpen} title="Create Banner ">
                <FormContainer>
                    <ADForm onSubmit={handleSubmit}>
                        <FormSection>
                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12}>
                                    <Box display="flex" alignItems="center" justifyContent="center" margin="0 auto" width="500px">
                                        <ADImageUpload
                                            name="image"
                                            setImageUrl={setImage}
                                            imageUrl={image}
                                            label="Image"
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

export default CreateBannerModal;
