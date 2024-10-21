"use client";

import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import { Box, Button, Grid, styled } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector";
import { toast } from "sonner";
import ADDatePicker from "@/components/Forms/DatePicker";
import BNPRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";
import { useCreateFaqMutation } from "@/redux/api/faqApi";

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


const CreateFAQModal = ({ open, setOpen }: TProps) => {
    const [createFAQ] = useCreateFaqMutation()
    const [image, setImage] = useState<string>("")
    const [imageOpen, setImageOpen] = useState(false)



    const handleSubmit = async (values: FieldValues) => {
        const modifiedValues = {
            ...values,
            image

        };

        try {
            const res = await createFAQ(modifiedValues).unwrap();

            toast.success(res.message);
            setOpen(false);
        } catch (err: any) {

            toast.error(err?.data?.message);
        }
    };




    return (
        <>
            <BNPRightSideModal sx={{ width: '500px' }} open={open} setOpen={setOpen} title="Create FAQ ">
                <FormContainer>
                    <ADForm onSubmit={handleSubmit}>
                        <FormSection>
                            <Grid container spacing={2}>



                                <Grid item md={12} sm={12}>
                                    <ADInput
                                        fullWidth
                                        name="question"
                                        label="Question"
                                        autoFocus={true}
                                    />
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <ADInput
                                        fullWidth
                                        name="answer"
                                        label="Answer"
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

                            <Box display='flex' justifyContent='center' marginTop='20px' >   <Button type="submit">Add FAQ </Button></Box>
                        </FormSection>
                    </ADForm>
                </FormContainer>

            </BNPRightSideModal>
           

        </>
    );
};

export default CreateFAQModal;
