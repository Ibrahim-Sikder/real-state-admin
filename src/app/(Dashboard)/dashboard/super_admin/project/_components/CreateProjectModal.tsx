"use client";

import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import ADEditor from "@/components/Forms/JodiEditor";
import { Box, Button, Grid, styled, Typography, Stepper, Step, StepLabel, Stack } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { FieldValues } from "react-hook-form";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";
import ADTextArea from "@/components/Forms/TextArea";
import { toast } from "sonner";
import ADImageUpload from "@/components/Forms/FileUpload";
import ADAutoComplete from "@/components/Forms/AutoComplete";
import BNPRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";
import { useCreateProjectMutation } from "@/redux/api/projectApi";
import { additionalFeatures, amenities, apertmentContains, category, loan_partner, lookingFor, nearby_location, projectCategoryType, projectOffer, tags } from "@/constant";
import ADCheckbox from "@/components/Forms/checkbox";
import ADSelect from "@/components/Forms/Select";
import DateTimepicker from "@/components/Forms/DateTimepicker";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PdfUploader from "@/components/Forms/PdfUpload";



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

const steps = ["Overview", "Concept ", "Floor Plan ", "Location Map ", "Virtual Tour", "Download BroChure"];

const CreateProjectModal = ({ open, setOpen }: TProps) => {
    const [createProject] = useCreateProjectMutation();
    const [overviewImages, setOverviewImages] = useState<string[]>([]);
    const [conceptImages, setConceptImages] = useState<string[]>([]);
    const [floorImages, setFloorImages] = useState<string[]>([]);
    const [locationImages, setLocationImages] = useState<string[]>([]);
    const [overviewImgOpen, setOverviewImgOpen] = useState(false);
    const [conceptImgOpen, setConceptImgOpen] = useState(false);
    const [floorImgOpen, setFloorImgOpen] = useState(false);
    const [locationImgOpen, setLocationImgOpen] = useState(false);
    const [pdfUrls, setPdfUrls] = useState<string[]>([]);

    const [activeStep, setActiveStep] = useState(0);
    const isLastStep = activeStep === steps.length - 1;

    const handleStepClick = (step: number) => {
        setActiveStep(step);
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };
    const [videoUrls, setVideoUrls] = useState<string[]>(['']);
    const [otherState, setOtherState] = useState<string>('');

    const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const newVideoUrls = [...videoUrls];
        newVideoUrls[index] = event.target.value;
        setVideoUrls(newVideoUrls);
    };

    const handleAddVideoUrl = () => {
        setVideoUrls([...videoUrls, '']);
    };

    const handleRemoveVideoUrl = () => {
        if (videoUrls.length > 1) {
            setVideoUrls(videoUrls.slice(0, -1));
        }
    };




    const handleSubmit = async (values: FieldValues) => {

        const modifiedValues = {
            ...values,
            meta_keywords: values.meta_keywords || [],
            apartment_contains: values.apartment_contains || [],
            special_amenities: values.special_amenities || [],
            common_features: values.common_features || [],
            home_loan_partner: values.home_loan_partner || [],
            overview_Location: values.overview_Location || [],
            concept_Location: values.concept_Location || [],
            floor_Location: values.floor_Location || [],
            map_Location: values.map_Location || [],
            overviewImages: overviewImages || [],
            conceptImages: conceptImages || [],
            floorImages: floorImages || [],
            locationImgs: locationImages || [],
            videoUrls: videoUrls.filter(url => url !== ''),
             floorPdf: pdfUrls[0] || "",

        };


        try {
            const res = await createProject(modifiedValues).unwrap();
            console.log(res)
            toast.success(res.message || 'Project create successfull!');
            setOpen(false);
        } catch (err: any) {
            toast.error(err?.values?.message || 'Something went to wrong!');
        }

    };




    return (
        <>
            <BNPRightSideModal sx={{ width: "900px" }} open={open} setOpen={setOpen} title="Create Projects">
                <FormContainer>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => (
                            <Step key={label} onClick={() => handleStepClick(index)} style={{ cursor: 'pointer' }}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <ADForm
                        onSubmit={async (values) => {
                            if (isLastStep) {
                                await handleSubmit(values);
                            } else {
                                handleNext();
                            }
                        }}>
                        {activeStep === 0 && (
                            <FormSection>
                                <Grid container spacing={2}>

                                    <Grid item md={12} sm={12}>
                                        <Box display="flex" alignItems="center" justifyContent="center" margin="0 auto" width="500px">
                                            <ADImageUpload
                                                name="overviewImages"
                                                setImageUrls={setOverviewImages}
                                                imageUrls={overviewImages}
                                                label="Overview Images"
                                                onClick={() => setOverviewImgOpen(true)}
                                            />


                                        </Box>
                                    </Grid>

                                    <Grid item md={12} sm={12}>
                                        <ADInput fullWidth name="title" label="Title" />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <ADInput fullWidth name="sub_title" label="Sub Title" />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <ADSelect
                                            label="Project Category Type "
                                            name="projectCategoryType"
                                            items={projectCategoryType}
                                            size="medium"
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <ADSelect
                                            label="Looing For"
                                            name="looking_for"
                                            items={lookingFor}
                                            size="medium"
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <ADSelect
                                            label="Category"
                                            name="category"
                                            items={category}
                                            size="medium"
                                        />
                                    </Grid>

                                    <Grid item md={12} sm={12}>
                                        <ADSelect
                                            label="Project Offer"
                                            name="project_offer"
                                            items={projectOffer}
                                            size="medium"
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <DateTimepicker fullWidth name="project_date" label="Project Date " />
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

                                        <ADAutoComplete
                                            label="Institutes & Nearby Locations"
                                            name="overview_Location"
                                            options={nearby_location}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <ADAutoComplete
                                            label="Apartment Contains"
                                            name="apartment_contains"
                                            options={apertmentContains}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <ADAutoComplete
                                            label="Special Amenities"
                                            name="special_amenities"
                                            options={amenities}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <ADAutoComplete
                                            label="Common Features"
                                            name="Common Features"
                                            options={additionalFeatures}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <ADAutoComplete
                                            label="Home Loan Partner"
                                            name="home_loan_partner"
                                            options={loan_partner}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <ADTextArea fullWidth name="short_description" label="Short Description" />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <ADTextArea fullWidth name="sub_short_description" label="Short Description 2 " />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <Typography variant="h5" fontWeight='semibold' marginBottom='10px'>Buy an Apartment on Easy Installments</Typography>
                                        <ADEditor name="overview_description" label="" />
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
                                                name="conceptImages"
                                                setImageUrls={setConceptImages}
                                                imageUrls={conceptImages}
                                                label="Concept Images"
                                                onClick={() => setConceptImgOpen(true)}
                                            />

                                        </Box>
                                    </Grid>
                                    <Grid item md={12} sm={12}>

                                        <ADAutoComplete
                                            label="Institutes & Nearby Locations"
                                            name="concept_Location"
                                            options={nearby_location}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <Typography variant="h5" fontWeight='semibold' marginBottom='10px'>Buy an Apartment on Easy Installments</Typography>
                                        <ADEditor name="concept_description" label="" />
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
                                                name="floorImages"
                                                setImageUrls={setFloorImages}
                                                imageUrls={floorImages}
                                                label="Floor Images"
                                                onClick={() => setFloorImgOpen(true)}
                                            />
                                            <PdfUploader
                                                name="floorPdf"
                                                setPdfUrls={setPdfUrls}
                                                pdfUrls={pdfUrls}
                                                label="Upload Pdf"
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <ADInput fullWidth name="floorGoogleDriveLink" label="Google Drive Link" />
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
                                                name="locationImages"
                                                setImageUrls={setLocationImages}
                                                imageUrls={locationImages}
                                                label="Location Images"
                                                onClick={() => setLocationImgOpen(true)}
                                            />

                                        </Box>
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <ADInput fullWidth name="projectLocation" label="Project location map link" />
                                    </Grid>

                                    <Grid item md={12} sm={12}>

                                        <ADAutoComplete
                                            label="Institutes & Nearby Locations"
                                            name="map_Location"
                                            options={nearby_location}
                                        />
                                    </Grid>
                                    <Grid item md={12} sm={12}>
                                        <Typography variant="h5" fontWeight='semibold' marginBottom='10px'>Buy an Apartment on Easy Installments</Typography>
                                        <ADEditor name="map_description" label="" />
                                    </Grid>
                                </Grid>
                            </FormSection>
                        )}
                        {activeStep === 4 && (
                            <FormSection>
                                <Grid container spacing={2}>
                                    <Grid item md={12} sm={12}>

                                        <ADCheckbox name="feature" label="Feature Image" />
                                    </Grid>
                                    <Grid item md={12} sm={12}>

                                        {videoUrls.map((url, index) => (
                                            <ADInput
                                                key={index}
                                                name={`videoUrls.${index}`}
                                                label="Video URL"
                                                value={url}
                                                onChange={(event) => handleInputChange(index, event)}
                                                fullWidth
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
                                            name="virtual_Location"
                                            options={nearby_location}
                                        />
                                    </Grid>


                                    <Grid item md={12} sm={12}>
                                        <Typography variant="h5" fontWeight="semibold" marginBottom="10px">
                                            Buy an Apartment on Easy Installments
                                        </Typography>
                                        <ADEditor name="virtual_description" label="" />
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

                                        <ADEditor name="meta_description" label="Meta Description" />
                                    </Grid>
                                </Grid>
                            </FormSection>
                        )}
                        {activeStep === 5 && (
                            <FormSection>
                                <Grid container spacing={2}>
                                    <Grid item md={12} sm={12}>
                                        <ADInput fullWidth name="brochure_link" label="Brochure pdf Link" />
                                    </Grid>
                                </Grid>

                            </FormSection>
                        )}

                        <Box display="flex" justifyContent="space-between" mt={3}>
                            <Button disabled={activeStep === 0} onClick={handleBack}>
                                Back
                            </Button>

                            <Button type="submit">
                                {isLastStep ? "Submit" : "Next"}
                            </Button>
                        </Box>
                    </ADForm>
                </FormContainer>
            </BNPRightSideModal>


            <GlobalImageSelector
                open={overviewImgOpen}
                onClose={() => setOverviewImgOpen(false)}
                selectedImage={overviewImages}
                setSelectedImage={setOverviewImages}
                mode="multiple"
            />

            <GlobalImageSelector
                open={conceptImgOpen}
                onClose={() => setConceptImgOpen(false)}
                setSelectedImage={setConceptImages}
                mode="multiple"
                selectedImage={conceptImages}
            />
            <GlobalImageSelector
                open={floorImgOpen}
                onClose={() => setFloorImgOpen(false)}
                setSelectedImage={setFloorImages}
                mode="multiple"
                selectedImage={floorImages}
            />
            <GlobalImageSelector
                open={locationImgOpen}
                onClose={() => setLocationImgOpen(false)}
                setSelectedImage={setLocationImages}
                mode="multiple"
                selectedImage={locationImages}
            />
        </>
    );
};

export default CreateProjectModal;
