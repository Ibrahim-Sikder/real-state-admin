"use client";

import ADForm from "@/components/Forms/Form";
import ADInput from "@/components/Forms/Input";
import BNPModal from "@/components/Shared/Modal/BNPModal";
import {
  Box,
  Button,
  Grid,
  styled,
} from "@mui/material";
import { FieldValues } from "react-hook-form";
import ADAutoComplete from "@/components/Forms/AutoComplete";
import { status, userRole } from "@/constant/role";
import ADSelect from "@/components/Forms/Select";
import { useCreateUserMutation } from "@/redux/api/userApi";
import { toast } from "sonner";
import BNPRightSideModal from "@/components/Shared/Modal/RightSideOpenModal";

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

const AddUserModal = ({ open, setOpen, initialValues }: TProps) => {
  const [createUser] = useCreateUserMutation()
  const handleSubmit = async (data: FieldValues) => {
    const modifiedValues = {
      ...data,
      role: data.role || [],
    };

    try {
      const res = await createUser(modifiedValues).unwrap();
      toast.success(res?.message);
      setOpen(false);
    } catch (err: any) {
      console.error('Error:', err);
      toast.error(err?.message || 'User create failed!');
    }

  };



  return (
    <BNPRightSideModal width='600px' open={open} setOpen={setOpen} title="Create User">
      <FormContainer>
        <ADForm onSubmit={handleSubmit} defaultValues={initialValues}>
          <FormSection>
            {/* Name and Email */}
            <Grid container spacing={2}>
              <Grid item md={12} sm={12}>
                <ADInput
                  fullWidth
                  name="name"
                  label="Name"
                  placeholder="Enter User Name"
                />
              </Grid>
              <Grid item md={12} sm={12}>
                <ADInput
                  fullWidth
                  name="email"
                  label="Email"
                  placeholder="Enter User Email"
                />
              </Grid>
              <Grid item md={12} sm={12}>
                <ADInput
                  fullWidth
                  name="password"
                  label="Password"
                  placeholder="Enter User Password"
                />
              </Grid>
              <Grid item md={12} sm={12}>
                <ADSelect size="medium" label="Role" name="role" items={userRole} />
              </Grid>
              <Grid item md={12} sm={12}>
                <ADSelect size="medium" label="Status" name="status" items={status} />
              </Grid>
              <Grid item md={12} sm={12}>
                <Button sx={{ width: '100%', }} variant="contained" color="primary" type="submit">
                  Create A User
                </Button>
              </Grid>
            </Grid>
          </FormSection>

        </ADForm>
      </FormContainer>
    </BNPRightSideModal>
  );
};

export default AddUserModal;
