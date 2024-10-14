"use client";

import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import ADEditor from "@/components/Forms/JodiEditor";
import BNPModal from "@/components/Shared/Modal/BNPModal";
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
import { useCreateProjectMutation } from "@/redux/api/projectApi";
import { tags } from "@/constant";

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


const CreateProjectModal = ({ open, setOpen }: TProps) => {
    const [createProject] = useCreateProjectMutation()
    const [thumnailImg, setThumnailImg] = useState<string>("")
    const [bangla_img, setBangla_img] = useState<string>('')
    const [eng_img, setEng_img] = useState<string>('')
    const [thumnailImgOpen, setThumnailImgOpen] = useState(false)
    const [bngImgOpen, setBngImgOpen] = useState(false)
    const [engImgOpen, setEngImgOpen] = useState(false)




    const handleSubmit = async (values: FieldValues) => {
        const modifiedValues = {
            ...values,
            meta_keywords: values.meta_keywords || [],
            thumnail_img: thumnailImg,
            img_bangla: bangla_img,
            img_english: eng_img
        };

        try {
            const res = await createProject(modifiedValues).unwrap();

            toast.success(res.message);
            setOpen(false);
        } catch (err: any) {
            console.error('Error:', err);
            toast.error(err?.data?.message);
        }
    };




    return (
        <>
            <BNPRightSideModal sx={{ width: '900px' }} open={open} setOpen={setOpen} title="Create Projects ">
                <FormContainer>
                    <ADForm onSubmit={handleSubmit}>
                        <FormSection>
                            <Grid container spacing={2}>
                               

                                <Grid item md={12} sm={12}>
                                    <Box display="flex" alignItems="center" justifyContent="center" margin="0 auto" width="500px">
                                        <ADImageUpload
                                            name="img_bangla"
                                            setImageUrl={setBangla_img}
                                            imageUrl={bangla_img}
                                            label="Select Image"
                                            onClick={() => setBngImgOpen(true)}
                                        />
                                        <ADImageUpload
                                            name="img_english"
                                            setImageUrl={setEng_img}
                                            imageUrl={eng_img}
                                            label="Select Image"
                                            onClick={() => setEngImgOpen(true)}
                                        />
                                        <ADImageUpload
                                            onClick={() => setThumnailImgOpen(true)}
                                            name="thumnail_img"
                                            setImageUrl={setThumnailImg}
                                            imageUrl={thumnailImg}
                                            label="Select Image"
                                        />
                                    </Box>
                                </Grid>



                                <Grid item md={12} sm={12}>

                                    <ADInput
                                        fullWidth
                                        name="Title"
                                        label="Title"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <ADInput
                                        fullWidth
                                        name="sub_title"
                                        label="Sub Title"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <ADInput
                                        fullWidth
                                        name="project_type"
                                        label="Project Type "
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <ADInput
                                        fullWidth
                                        name="project_address"
                                        label="Project Address"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <ADInput
                                        fullWidth
                                        name="land_area"
                                        label="Land Area"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <ADInput
                                        fullWidth
                                        name="storied"
                                        label="Storied"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <ADInput
                                        fullWidth
                                        name="apartment_contains"
                                        label="Apartment Contains"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <ADInput
                                        fullWidth
                                        name="apartment_contains"
                                        label="Special Amenities"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <ADInput
                                        fullWidth
                                        name="common_features"
                                        label="Common Features"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <ADInput
                                        fullWidth
                                        name="home_loan_partner"
                                        label="Home Loan Partner"
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <ADInput
                                        fullWidth
                                        name="nearby_location"
                                        label="Institutes & Nearby Locations"
                                    />
                                </Grid>





                                <Grid item md={12} sm={12}>
                                    <ADTextArea
                                        fullWidth
                                        name="short_description"
                                        label="Short Description"
                                    />
                                </Grid>


                                <Grid item md={12} sm={12}>
                                    <ADEditor name="description" label=" Description" />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <ADEditor name="description" label=" Description" />
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
                            <Box display='flex' justifyContent='center' marginTop='20px' >   <Button type="submit">Add Project </Button></Box>
                        </FormSection>
                    </ADForm>
                </FormContainer>

            </BNPRightSideModal>
            <GlobalImageSelector
                open={thumnailImgOpen}
                onClose={() => setThumnailImgOpen(false)}
                setSelectedImage={setThumnailImg}
                mode="single"
                selectedImage={thumnailImg}
            />
            <GlobalImageSelector
                open={bngImgOpen}
                onClose={() => setBngImgOpen(false)}
                setSelectedImage={setBangla_img}
                mode="single"
                selectedImage={bangla_img}
            />
            <GlobalImageSelector
                open={engImgOpen}
                onClose={() => setEngImgOpen(false)}
                setSelectedImage={setEng_img}
                mode="single"
                selectedImage={eng_img}
            />
        </>
    );
};

export default CreateProjectModal;
