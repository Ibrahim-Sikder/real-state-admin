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
import BNPRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";
import ADImageUpload from "@/components/Forms/FileUpload";
import { useGetSingleTeamQuery, useUpdateTeamMutation } from "@/redux/api/teamApi";

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


const UpdateTeamModal = ({ open, setOpen, id }: TProps) => {
    const [image, setImage] = useState<string>("")
    const [imageOpen, setImageOpen] = useState(false)


    const [updateTeam] = useUpdateTeamMutation()
    const { data, isLoading } = useGetSingleTeamQuery(id)

    const handleSubmit = async (data: FieldValues) => {
        data.img_bangla = image;


        try {
            const res = await updateTeam({ ...data, id }).unwrap();

            toast.success(res?.message);

            setOpen(false);
        } catch (err: any) {
           
            toast.error(err?.message);
        }
    };

    const singleData = data?.data;

    useEffect(() => {
        if (singleData) {
            setImage(singleData?.image || "");
        }
    }, [singleData]);
    if (isLoading) {
        return <p>Loading............</p>
    }

    const defaultValues = {
        name: singleData?.name || "",
        image: singleData?.image || "",
        designation: singleData?.designation || "",
        date: singleData?.date || "",
        social_link: singleData?.social_link

    };

    return (
        <>
            {
                isLoading ? (
                    <p>Loading........</p>
                ) : (
                    <BNPRightSideModal open={open} setOpen={setOpen} title="Update Team">
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
                                                    label="Select Image"
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
                                                name="social_link"
                                                label="Social Link"
                                                autoFocus={true}
                                            />
                                        </Grid>

                                        <Grid item md={12} sm={12}>
                                            <ADDatePicker
                                                fullWidth
                                                name="date"
                                                label="Post Date"

                                            />
                                        </Grid>
                                    </Grid>

                                    <Box display='flex' justifyContent='center' marginTop='20px' >   <Button type="submit">Update Team </Button></Box>
                                </FormSection>
                            </ADForm>
                        </FormContainer>
                        <GlobalImageSelector
                            open={imageOpen}
                            onClose={() => setImageOpen(false)}
                            setSelectedImage={setImage}
                            mode="single"
                            selectedImage={image}
                        />

                    </BNPRightSideModal>
                )
            }

        </>
    );
};

export default UpdateTeamModal;
