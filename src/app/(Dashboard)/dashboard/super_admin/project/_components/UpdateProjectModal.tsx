"use client";

import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import ADEditor from "@/components/Forms/JodiEditor";
import BNPModal from "@/components/Shared/Modal/BNPModal";
import { Box, Button, Grid, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";
import ADTextArea from "@/components/Forms/TextArea";
import { toast } from "sonner";
import ADDatePicker from "@/components/Forms/DatePicker";
import ADAutoComplete from "@/components/Forms/AutoComplete";
import { useGetSingleProjectQuery, useUpdateProjectMutation } from "@/redux/api/projectApi";
import BNPRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";
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
    id: string | null,
};


const UpdateProjectModal = ({ open, setOpen, id }: TProps) => {
    const [thumnailImg, setThumnailImg] = useState<string>("")
    const [bangla_img, setBangla_img] = useState<string>('')
    const [eng_img, setEng_img] = useState<string>('')
    const [thumnailImgOpen, setThumnailImgOpen] = useState(false)
    const [bngImgOpen, setBngImgOpen] = useState(false)
    const [engImgOpen, setEngImgOpen] = useState(false)
    const [updateProject] = useUpdateProjectMutation()
    const { data, isLoading } = useGetSingleProjectQuery(id)

    const handleSubmit = async (data: FieldValues) => {

        data.img_bangla = bangla_img;
        data.img_english = eng_img;
        data.thumnail_img = thumnailImg;
        if (Array.isArray(data.meta_keywords)) {
            data.meta_keywords = data.meta_keywords.filter(key => key != null).map(
                (key: any) => (typeof key === 'object' ? key.meta_keywords : key)
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
            setBangla_img(singleData?.img_bangla || "");
            setEng_img(singleData?.img_english || "");
            setThumnailImg(singleData?.thumnail_img || "");
        }
    }, [singleData]);
    if (isLoading) {
        return <p>Loading............</p>
    }

    const defaultValues = {
        bangla_title: singleData?.bangla_title || "",
        english_title: singleData?.english_title || "",
        category: singleData?.category || [],
        bangla_description: singleData?.bangla_description || "",
        english_description: singleData?.english_description || "",
        bangla_short_description: singleData?.bangla_short_description || "",
        english_short_description: singleData?.english_short_description || "",
        img_tagline_bangla: singleData?.img_tagline_bangla || "",
        img_tagline_english: singleData?.img_tagline_english || "",
        admin_name: singleData?.admin_name || "",
        date: singleData?.date || "",
        createdAt: singleData?.createdAt || "",
        post_by: singleData?.post_by || "",
        meta_description: singleData?.meta_description || "",
        meta_keywords: singleData.meta_keywords || [],
        meta_title: singleData?.meta_title || "",
        // thumnail_img: singleData?.thumnail_img || '',
        // img_english: singleData?.img_english || '',
        // img_bangla: singleData?.img_bangla || '',
    };

    return (
        <>
            {
                isLoading ? (
                    <p>Loading........</p>
                ) : (
                    <BNPRightSideModal open={open} setOpen={setOpen} title="Update Project">
                        <FormContainer>
                            <ADForm onSubmit={handleSubmit} defaultValues={defaultValues}>
                                <FormSection>
                                    <Grid container spacing={2}>
                                        <Grid item md={12} sm={12}>
                                            {/* <Box display="flex" alignItems="center" justifyContent="center" margin="0 auto" width="500px">
                                                <BNPImageUpload
                                                    name="img_bangla"
                                                    setImageUrl={setBangla_img}
                                                    imageUrl={bangla_img}
                                                    label="Image in Bangla"
                                                    onClick={() => setBngImgOpen(true)}
                                                />
                                                <BNPImageUpload
                                                    name="img_english"
                                                    setImageUrl={setEng_img}
                                                    imageUrl={eng_img}
                                                    label="Image in English"
                                                    onClick={() => setEngImgOpen(true)}
                                                />
                                                <BNPImageUpload
                                                    onClick={() => setThumnailImgOpen(true)}
                                                    name="thumnail_img"
                                                    setImageUrl={setThumnailImg}
                                                    imageUrl={thumnailImg}
                                                    label="Thumnail Image"
                                                />
                                            </Box> */}
                                        </Grid>


                                        <Grid item md={12} sm={12}>
                                            <ADInput
                                                fullWidth
                                                name="img_tagline_bangla"
                                                label="Image Tageline Bangla"
                                                autoFocus={true}
                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <ADInput
                                                fullWidth
                                                name="img_tagline_english"
                                                label="Image Tageline English"
                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <ADInput
                                                fullWidth
                                                name="admin_name"
                                                label="Admin Name"
                                                autoFocus
                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <ADDatePicker
                                                fullWidth
                                                name="date"
                                                label="Post Date"

                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <ADInput
                                                fullWidth
                                                name="bangla_title"
                                                label="Title Bangla"
                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <ADInput
                                                fullWidth
                                                name="english_title"
                                                label="Title English"
                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <ADTextArea
                                                fullWidth
                                                name="bangla_short_description"
                                                label="Short Description Banlga"
                                                maxRows={8}
                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <ADTextArea
                                                fullWidth
                                                name="english_short_description"
                                                label="Short Description English"
                                            />
                                        </Grid>


                                        <Grid item md={12} sm={12}>
                                            <ADEditor name="bangla_description" label="Banlga Description" />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <ADEditor name="english_description" label="English Description" />
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
                                    <Box display='flex' justifyContent='center' marginTop='20px' >
                                        <Button type="submit">Update Project </Button></Box>
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
                    </BNPRightSideModal>
                )
            }

        </>
    );
};

export default UpdateProjectModal;
