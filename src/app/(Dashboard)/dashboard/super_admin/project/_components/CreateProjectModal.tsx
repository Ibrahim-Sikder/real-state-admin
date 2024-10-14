"use client";

import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import ADEditor from "@/components/Forms/JodiEditor";
import { Box, Button, Grid, styled, Typography, Stepper, Step, StepLabel, Stack } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";
import ADTextArea from "@/components/Forms/TextArea";
import { toast } from "sonner";
import ADImageUpload from "@/components/Forms/FileUpload";
import ADAutoComplete from "@/components/Forms/AutoComplete";
import BNPRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";
import { useCreateProjectMutation } from "@/redux/api/projectApi";
import { nearby_location } from "@/constant";

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

const steps = ["Overview", "Concept ", "Floor Plan ", "Location Map ", "Virtual Tour "];

const CreateProjectModal = ({ open, setOpen }: TProps) => {
    const [createProject] = useCreateProjectMutation();
    const [thumnailImg, setThumnailImg] = useState<string>("");
    const [bangla_img, setBangla_img] = useState<string>("");
    const [eng_img, setEng_img] = useState<string>("");
    const [thumnailImgOpen, setThumnailImgOpen] = useState(false);
    const [bngImgOpen, setBngImgOpen] = useState(false);
    const [engImgOpen, setEngImgOpen] = useState(false);

    const [activeStep, setActiveStep] = useState(0);

    const handleSubmit = async (values: FieldValues) => {
        const modifiedValues = {
            ...values,
            meta_keywords: values.meta_keywords || [],
            thumnail_img: thumnailImg,
            img_bangla: bangla_img,
            img_english: eng_img,
        };

        try {
            const res = await createProject(modifiedValues).unwrap();
            toast.success(res.message);
            setOpen(false);
        } catch (err: any) {
            console.error("Error:", err);
            toast.error(err?.data?.message);
        }
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };
    const [videoUrls, setVideoUrls] = useState(['']);

    // Function to add a new video URL input field
    const handleAddVideoUrl = () => {
        setVideoUrls([...videoUrls, '']);
    };

    // Function to handle changes in video URL input fields
    const handleInputChange = (index: number, event: any) => {
        const newVideoUrls = [...videoUrls];
        newVideoUrls[index] = event.target.value;
        setVideoUrls(newVideoUrls);
    };

    // Function to remove a video URL input field
    const handleRemoveVideoUrl = () => {
        const newVideoUrls = [...videoUrls];

        // Ensure we only remove the field if there's more than one
        if (newVideoUrls.length > 1) {
            newVideoUrls.pop(); // Remove the last element
            setVideoUrls(newVideoUrls);
        }
    };


    return (
        <>
            <BNPRightSideModal sx={{ width: "900px" }} open={open} setOpen={setOpen} title="Create Projects">
                <FormContainer>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <ADForm onSubmit={handleSubmit}>
                        {activeStep === 0 && (
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
                                        <ADInput fullWidth name="Title" label="Title" />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <ADInput fullWidth name="sub_title" label="Sub Title" />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <ADInput fullWidth name="project_type" label="Project Type " />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <ADInput fullWidth name="project_address" label="Project Address" />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <ADInput fullWidth name="land_area" label="Land Area" />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <ADInput fullWidth name="storied" label="Storied" />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <ADInput fullWidth name="apartment_contains" label="Apartment Contains" />
                                    </Grid>
                                    <Grid item md={12} sm={12}>

                                        <ADAutoComplete
                                            label="Institutes & Nearby Locations"
                                            name="apartment_contains"
                                            options={nearby_location}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <ADTextArea fullWidth name="short_description" label="Short Description" />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <Typography variant="h5" fontWeight='semibold' marginBottom='10px'>Buy an Apartment on Easy Installments</Typography>
                                        <ADEditor name="description" label="" />
                                    </Grid>
                                </Grid>
                            </FormSection>
                        )}

                        {activeStep === 1 && (
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

                                        <ADAutoComplete
                                            label="Institutes & Nearby Locations"
                                            name="apartment_contains"
                                            options={nearby_location}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <Typography variant="h5" fontWeight='semibold' marginBottom='10px'>Buy an Apartment on Easy Installments</Typography>
                                        <ADEditor name="description" label="" />
                                    </Grid>
                                </Grid>
                            </FormSection>
                        )}

                        {activeStep === 2 && (
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
                                        <ADInput fullWidth name="floor_title" label="Floor Title" />
                                    </Grid>
                                    <Grid item md={12} sm={12}>

                                        <ADAutoComplete
                                            label="Institutes & Nearby Locations"
                                            name="apartment_contains"
                                            options={nearby_location}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <Typography variant="h5" fontWeight='semibold' marginBottom='10px'>Buy an Apartment on Easy Installments</Typography>
                                        <ADEditor name="description" label="" />
                                    </Grid>
                                </Grid>
                            </FormSection>
                        )}
                        {activeStep === 3 && (
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
                                        <ADInput fullWidth name="location" label="Location" />
                                    </Grid>
                                    <Grid item md={12} sm={12}>

                                        <ADAutoComplete
                                            label="Institutes & Nearby Locations"
                                            name="apartment_contains"
                                            options={nearby_location}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <Typography variant="h5" fontWeight='semibold' marginBottom='10px'>Buy an Apartment on Easy Installments</Typography>
                                        <ADEditor name="description" label="" />
                                    </Grid>
                                </Grid>
                            </FormSection>
                        )}
                        {activeStep === 4 && (
                            <FormSection>
                                <Grid container spacing={2}>
                                    <Grid item md={12} sm={12}>

                                        {videoUrls.map((url, index) => (
                                            <ADInput
                                                key={index}
                                                fullWidth
                                                name={`location-${index}`}
                                                label="Video URL"
                                                value={url}
                                                onChange={(event) => handleInputChange(index, event)}
                                            />
                                        ))}
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <Stack spacing={2} direction='row'>

                                            <Button onClick={handleAddVideoUrl}>Add</Button>
                                            <Button sx={{ background: 'red' }} onClick={handleRemoveVideoUrl}>Remove</Button>
                                        </Stack>
                                    </Grid>

                                    <Grid item md={12} sm={12}>
                                        <ADAutoComplete
                                            label="Institutes & Nearby Locations"
                                            name="apartment_contains"
                                            options={nearby_location}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <Typography variant="h5" fontWeight="semibold" marginBottom="10px">
                                            Buy an Apartment on Easy Installments
                                        </Typography>
                                        <ADEditor name="description" label="" />
                                    </Grid>
                                </Grid>
                            </FormSection>
                        )}

                        <Box display="flex" justifyContent="space-between" mt={3}>
                            <Button disabled={activeStep === 0} onClick={handleBack}>
                                Back
                            </Button>
                            {activeStep === steps.length - 1 ? (
                                <Button type="submit">Submit</Button>
                            ) : (
                                <Button onClick={handleNext}>Next</Button>
                            )}
                        </Box>
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
