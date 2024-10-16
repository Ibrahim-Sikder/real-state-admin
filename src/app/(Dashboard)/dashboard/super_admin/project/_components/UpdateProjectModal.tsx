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
import { nearby_location, tags } from "@/constant";

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
    const [updateProject] = useUpdateProjectMutation();
    const [overviewImage, setOverviewImage] = useState<string>("");
    const [conceptImage, setConceptImage] = useState<string>("");
    const [floorImage, setFloorImage] = useState<string>("");
    const [locationImg, setLocationImg] = useState<string>("");
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


    // Function to add a new video URL input field
    const handleAddVideoUrl = () => {
        setVideoUrls([...videoUrls, '']);
    };

    // Function to handle changes in video URL input fields
    const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const newVideoUrls = [...videoUrls];
        newVideoUrls[index] = event.target.value || '';  // Default to empty string if input is empty
        setVideoUrls(newVideoUrls);  // Update the videoUrls state
    };


    // Function to remove a video URL input field
    const handleRemoveVideoUrl = () => {
        const newVideoUrls = [...videoUrls];

        // Ensure we only remove the field if there's more than one
        if (newVideoUrls.length > 1) {
            newVideoUrls.pop(); // Remove the last element
            setVideoUrls(newVideoUrls);
            setVideoUrls(videoUrls);
        }
    };

    const handleSubmit = async (data: FieldValues) => {

        data.floorImage = floorImage;
        data.conceptImage = conceptImage;
        data.overviewImage = overviewImage;

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
            setOverviewImage(singleData?.overviewImage || "");
            setConceptImage(singleData?.conceptImage || "");
            setFloorImage(singleData?.floorImage || "");
            setLocationImg(singleData?.locationImg || "");
        }
    }, [singleData]);
    if (isLoading) {
        return <p>Loading............</p>
    }

    console.log(singleData)

    const defaultValues = {
        title: singleData?.title || '',
        sub_title: singleData?.sub_title || '',
        project_type: singleData?.project_type || '',
        project_address: singleData?.project_address || '',
        land_area: singleData?.land_area || '',
        storied: singleData?.storied || '',
        apartment_contains: singleData?.apartment_contains || '',
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
        floorImage: singleData?.floorImage || '',
        conceptImage: singleData?.conceptImage || '',
        overviewImage: singleData?.overviewImage || '',
        locationImg: singleData?.locationImg || '',
        videoUrls: singleData?.videoUrls || '',
        meta_title: singleData?.meta_title || "",
        meta_description: singleData?.meta_description || "",
        meta_keywords: singleData?.meta_keywords || "",
        min_price: singleData?.min_price || "",
        max_price: singleData?.max_price || "",
        category: singleData?.category || "",
   

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
                                // Submit form only when on the last step
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
                                                        name="overviewImage"
                                                        setImageUrl={setOverviewImage}
                                                        imageUrl={overviewImage}
                                                        label="Overview Image"
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
                                                <ADInput fullWidth name="apartment_contains" label="Apartment Contains" />
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
                                                        name="conceptImage"
                                                        setImageUrl={setConceptImage}
                                                        imageUrl={conceptImage}
                                                        label="Select Image"
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
                                                        name="floorImage"
                                                        setImageUrl={setFloorImage}
                                                        imageUrl={floorImage}
                                                        label="Select Image"
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
                                                        name="locationImg"
                                                        setImageUrl={setLocationImg}
                                                        imageUrl={locationImg}
                                                        label="Select Image"
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
                                                <ADInput fullWidth name="max_price" label="Max Price" />
                                            </Grid>
                                            <Grid item md={12} sm={12}>
                                                <ADInput fullWidth name="min_price" label="Min Price" />
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
                            setSelectedImage={setOverviewImage}
                            mode="single"
                            selectedImage={overviewImage}
                        />
                        <GlobalImageSelector
                            open={conceptImgOpen}
                            onClose={() => setConceptImgOpen(false)}
                            setSelectedImage={setConceptImage}
                            mode="single"
                            selectedImage={conceptImage}
                        />
                        <GlobalImageSelector
                            open={floorImgOpen}
                            onClose={() => setFloorImgOpen(false)}
                            setSelectedImage={setFloorImage}
                            mode="single"
                            selectedImage={floorImage}
                        />
                        <GlobalImageSelector
                            open={locationImgOpen}
                            onClose={() => setLocationImgOpen(false)}
                            setSelectedImage={setLocationImg}
                            mode="single"
                            selectedImage={locationImg}
                        />
                    </BNPRightSideModal>
                )
            }

        </>
    );
};

export default UpdateProjectModal;
