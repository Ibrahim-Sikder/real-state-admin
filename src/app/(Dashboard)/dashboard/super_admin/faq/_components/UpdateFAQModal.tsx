"use client";

import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import { Box, Button, Grid, styled, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import ADDatePicker from "@/components/Forms/DatePicker";
import BNPRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";
import { useGetSingleFaqQuery, useUpdateFaqMutation } from "@/redux/api/faqApi";

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


const UpdateFAQModal = ({ open, setOpen, id }: TProps) => {


    const [updateFAQ] = useUpdateFaqMutation()
    const { data, isLoading } = useGetSingleFaqQuery(id)


    const handleSubmit = async (data: FieldValues) => {


        try {
            const res = await updateFAQ({ ...data, id }).unwrap();

            toast.success(res?.message);

            setOpen(false);
        } catch (err: any) {

            toast.error(err?.message);
        }
    };

    const singleData = data?.data;

    if (isLoading) {
        return <p>Loading............</p>
    }

    const defaultValues = {
        question: singleData?.question || "",
        answer: singleData?.answer || "",
        date: singleData?.date || "",

    };

    return (
        <>
            {
                isLoading ? (
                    <p>Loading........</p>
                ) : (
                    <BNPRightSideModal open={open} setOpen={setOpen} title="Update FAQ">
                        <FormContainer>
                            <ADForm onSubmit={handleSubmit} defaultValues={defaultValues}>
                                <FormSection>
                                    <Grid container spacing={2}>
                                        <Grid item md={12} sm={12}>
                                            <ADInput
                                                fullWidth
                                                name="question"
                                                label="Question"
                                            />
                                        </Grid>
                                        <Grid item md={12} sm={12}>
                                            <ADInput
                                                fullWidth
                                                name="answer"
                                                label="Answer"
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

                                    <Box display='flex' justifyContent='center' marginTop='20px' >   <Button type="submit">Update FAQ </Button></Box>
                                </FormSection>
                            </ADForm>
                        </FormContainer>


                    </BNPRightSideModal>
                )
            }

        </>
    );
};

export default UpdateFAQModal;
