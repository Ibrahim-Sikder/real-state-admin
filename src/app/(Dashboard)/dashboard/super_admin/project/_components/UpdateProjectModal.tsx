"use client";

import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import ADEditor from "@/components/Forms/JodiEditor";
import { Box, Button, Grid, styled, Typography, Stepper, Step, StepLabel, Stack } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";
import ADTextArea from "@/components/Forms/TextArea";
import { toast } from "sonner";
import ADAutoComplete from "@/components/Forms/AutoComplete";
import { useGetSingleProjectQuery, useUpdateProjectMutation } from "@/redux/api/projectApi";
import BNPRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";

import ADImageUpload from "@/components/Forms/FileUpload";
import { useCreateProjectMutation } from "@/redux/api/projectApi";
import { additionalFeatures, amenities, apertmentContains, loan_partner, nearby_location, tags } from "@/constant";

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

const steps = ["Overview", "Concept ", "Floor Plan ", "Location Map ", "Virtual Tour"];

const UpdateProjectModal = ({ open, setOpen, id }: TProps) => {
    const { data, isLoading } = useGetSingleProjectQuery(id);
    console.log(data)
    const [updateProject] = useUpdateProjectMutation();
    const [overviewImages, setOverviewImages] = useState<string[]>([]);
    const [conceptImages, setConceptImages] = useState<string[]>([]);
    const [floorImages, setFloorImages] = useState<string[]>([]);
    const [locationImages, setLocationImages] = useState<string[]>([]);
    const [overviewImgOpen, setOverviewImgOpen] = useState(false);
    const [conceptImgOpen, setConceptImgOpen] = useState(false);
    const [floorImgOpen, setFloorImgOpen] = useState(false);
    const [locationImgOpen, setLocationImgOpen] = useState(false);

    const [activeStep, setActiveStep] = useState(0);
    const isLastStep = activeStep === steps.length - 1;


    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };
    const [videoUrls, setVideoUrls] = useState<string[]>(['']);



    const handleAddVideoUrl = () => {
        setVideoUrls([...videoUrls, '']);
    };


    const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const newVideoUrls = [...videoUrls];
        newVideoUrls[index] = event.target.value || '';
        setVideoUrls(newVideoUrls);
    };



    const handleRemoveVideoUrl = () => {
        const newVideoUrls = [...videoUrls];


        if (newVideoUrls.length > 1) {
            newVideoUrls.pop();
            setVideoUrls(newVideoUrls);
            setVideoUrls(videoUrls);
        }
    };

    const handleSubmit = async (data: FieldValues) => {

        data.floorImages = floorImages;
        data.conceptImages = conceptImages;
        data.overviewImages = overviewImages;

        if (Array.isArray(data.category)) {
            data.category = data.category.filter(key => key != null).map(
                (key: any) => (typeof key === 'object' ? key.category : key)
            );
        }
        if (Array.isArray(data.meta_keywords)) {
            data.meta_keywords = data.meta_keywords.filter(key => key != null).map(
                (key: any) => (typeof key === 'object' ? key.meta_keywords : key)
            );
        }
        if (Array.isArray(data.videoUrls)) {
            data.videoUrls = data.videoUrls.filter(key => key != null).map(
                (key: any) => (typeof key === 'object' ? key.videoUrls : key)
            );
        }
        if (Array.isArray(data.map_Location)) {
            data.map_Location = data.map_Location.filter(key => key != null).map(
                (key: any) => (typeof key === 'object' ? key.map_Location : key)
            );
        }
        if (Array.isArray(data.floor_Location)) {
            data.floor_Location = data.floor_Location.filter(key => key != null).map(
                (key: any) => (typeof key === 'object' ? key.floor_Location : key)
            );
        }
        if (Array.isArray(data.concept_Location)) {
            data.concept_Location = data.concept_Location.filter(key => key != null).map(
                (key: any) => (typeof key === 'object' ? key.concept_Location : key)
            );
        }
        if (Array.isArray(data.overview_Location)) {
            data.overview_Location = data.overview_Location.filter(key => key != null).map(
                (key: any) => (typeof key === 'object' ? key.overview_Location : key)
            );
        }


        if (Array.isArray(data.special_amenities)) {
            data.special_amenities = data.special_amenities.filter(key => key != null).map(
                (key: any) => (typeof key === 'object' ? key.special_amenities : key)
            );
        }
        if (Array.isArray(data.common_features)) {
            data.common_features = data.common_features.filter(key => key != null).map(
                (key: any) => (typeof key === 'object' ? key.common_features : key)
            );
        }
        if (Array.isArray(data.home_loan_partner)) {
            data.home_loan_partner = data.home_loan_partner.filter(key => key != null).map(
                (key: any) => (typeof key === 'object' ? key.home_loan_partner : key)
            );
        }


        try {
            const res = await updateProject({ ...data, id }).unwrap();

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
            setOverviewImages(singleData?.overviewImages ? Array.isArray(singleData.overviewImages) ? singleData.overviewImages : [singleData.overviewImages] : []);
            setConceptImages(singleData?.conceptImages ? Array.isArray(singleData.conceptImages) ? singleData.conceptImages : [singleData.setConceptImages] : []);
            setFloorImages(singleData?.floorImages ? Array.isArray(singleData.floorImages) ? singleData.floorImages : [singleData.floorImages] : []);
            setLocationImages(singleData?.locationImgs ? Array.isArray(singleData.locationImgs) ? singleData.locationImgs : [singleData.locationImgs] : []);
        }
    }, [singleData]);
    if (isLoading) {
        return <p>Loading............</p>
    }



    const defaultValues = {
        title: singleData?.title || '',
        sub_title: singleData?.sub_title || '',
        project_type: singleData?.project_type || '',
        project_address: singleData?.project_address || '',
        land_area: singleData?.land_area || '',
        storied: singleData?.storied || '',
        overview_Location: singleData?.overview_Location || '',
        short_description: singleData?.short_description || '',
        overview_description: singleData?.overview_description || '',
        concept_description: singleData?.concept_description || '',
        floor_description: singleData?.floor_description || '',
        virtual_description: singleData?.virtual_description || '',
        floor_title: singleData?.floor_title || '',
        concept_Location: singleData?.concept_Location || '',
        floor_Location: singleData?.floor_Location || '',
        virtual_Location: singleData?.virtual_Location || '',
        map_Location: singleData?.map_Location || '',
        location: singleData?.location || '',
        map_description: singleData?.map_description || '',
        floorImages: singleData?.floorImages || [],
        conceptImages: singleData?.conceptImages || [],
        overviewImages: singleData?.overviewImages || [],
        locationImgs: singleData?.locationImgs || [],
        videoUrls: singleData?.videoUrls || '',
        meta_title: singleData?.meta_title || "",
        meta_description: singleData?.meta_description || "",
        meta_keywords: singleData?.meta_keywords || "",
        high_budget: singleData?.hight_budget || "",
        low_budget: singleData?.low_budget || "",
        category: singleData?.category || "",
        apartment_contains: singleData?.apartment_contains || [],
        special_amenities: singleData?.special_amenities || [],
        common_features: singleData?.common_features || [],
        home_loan_partner: singleData?.home_loan_partner || [],





    };

    return (
        <>
            {
                isLoading ? (
                    <p>Loading........</p>
                ) : (
                    <BNPRightSideModal open={open} setOpen={setOpen} title="Update Project">
                        <FormContainer>
                            <Stepper activeStep={activeStep} alternativeLabel>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>

                            <ADForm defaultValues={defaultValues} onSubmit={async (values) => {

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

                                                <ADAutoComplete
                                                    label="Institutes & Nearby Locations"
                                                    name="overview_Location"
                                                    options={nearby_location}
                                                />
                                            </Grid>
                                            <Grid item md={12} sm={12}>
                                                <ADTextArea fullWidth name="short_description" label="Short Description" />
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

                                                </Box>
                                            </Grid>
                                            <Grid item md={12} sm={12}>
                                                <ADInput fullWidth name="floor_title" label="Floor Title" />
                                            </Grid>
                                            <Grid item md={12} sm={12}>

                                                <ADAutoComplete
                                                    label="Institutes & Nearby Locations"
                                                    name="floor_Location"
                                                    options={nearby_location}
                                                />
                                            </Grid>
                                            <Grid item md={12} sm={12}>
                                                <Typography variant="h5" fontWeight='semibold' marginBottom='10px'>Buy an Apartment on Easy Installments</Typography>
                                                <ADEditor name="floor_description" label="" />
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
                                                <ADInput fullWidth name="location" label="Location" />
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

                                                {singleData?.videoUrls?.map((url: any, index: number) => (
                                                    <ADInput
                                                        key={index}
                                                        name={`videoUrls.${index}`}
                                                        label="Video URL"
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
                                                <ADAutoComplete
                                                    label="Category"
                                                    name="category"
                                                    options={tags}
                                                />

                                            </Grid>
                                            <Grid item md={12} sm={12}>
                                                <ADInput fullWidth name="hight_budget" label="High Budget" />
                                            </Grid>
                                            <Grid item md={12} sm={12}>
                                                <ADInput fullWidth name="low_budget" label="Low Budget" />
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
                                                <ADTextArea
                                                    name="meta_description"
                                                    label="Meta Description"
                                                    placeholder="Enter Meta Description"
                                                />
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
                    </BNPRightSideModal>
                )
            }

        </>
    );
};

export default UpdateProjectModal;
