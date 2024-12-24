"use client";

import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import { Box, Button, Grid, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import BNPRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";
import { tags } from "@/constant";
import { useCreateServoceMutation } from "@/redux/api/serviceApi";

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


const CreateCategoryModal = ({ open, setOpen }: TProps) => {
    const [createService] = useCreateServoceMutation()

    const handleSubmit = async (values: FieldValues) => {
        const modifiedValues = {
            ...values
        };


        try {
            const res = await createService(modifiedValues).unwrap();

            toast.success(res.message);
            setOpen(false);
        } catch (err: any) {
            console.error('Error:', err);
            toast.error(err?.data?.message);
        }
    };


    return (
        <>
            <BNPRightSideModal sx={{ width: '900px' }} open={open} setOpen={setOpen} title="Create Service ">
                <FormContainer>
                    <ADForm onSubmit={handleSubmit}>
                        <FormSection>
                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12}>
                                    <ADInput
                                        fullWidth
                                        name="category"
                                        label="Category Name"
                                        autoFocus={true}
                                    />
                                </Grid>
                            </Grid>
                           
                           
                            <Box display='flex' justifyContent='center' marginTop='20px' >   <Button type="submit">Create Category </Button></Box>
                        </FormSection>
                    </ADForm>
                </FormContainer>

            </BNPRightSideModal>
           


        </>
    );
};

export default CreateCategoryModal;
