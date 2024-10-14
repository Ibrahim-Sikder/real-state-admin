"use client";

import React from "react";
import { Box, Typography, Stack, Alert } from "@mui/material";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ADForm from "../Forms/Form";
import ADInput from "../Forms/Input";
import { LoadingButton } from "@mui/lab";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { setCookie } from "@/axios/Cookies";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/actions/auth.services";
import { CheckBox } from "@mui/icons-material";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Please enter your email address",
      invalid_type_error: "Please enter a valid email address",
    })
    .email("Please enter a valid email address"),
  password: z
    .string({
      required_error: "Please enter your password",
      invalid_type_error: "Please enter a valid password",
    })
    .min(6, "Password must be at least 6 characters long"),
});
interface LoginResponse {
  data: {
    accessToken: string;
  };
  message: string;
}

const defualtValues = {
  email: '',
  password: '',
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const [login, { error, isLoading, isSuccess }] = useLoginMutation() as any;
  const router = useRouter()
  const handleSubmit = async (data: FieldValues) => {
    try {
      const res = await login(data).unwrap() as LoginResponse;

      storeUserInfo({ accessToken: res?.data?.accessToken });
      setCookie('token', res?.data?.accessToken, { expires: 7 });

      toast.success(res.message || 'Login Successful!');
      router.push('/dashboard');

    } catch (err: any) {
      toast.error(err?.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <>
      
      {subtext}
      <ADForm onSubmit={handleSubmit} resolver={zodResolver(loginSchema)}>
        <Stack spacing={2}>
          
          <Box>
            <ADInput
              type="email"
              name="email"
              placeholder="Enter your email address"
              label="Email Address"
              fullWidth
            />
          </Box>

          <Box mt="16px">
            <ADInput
              type="password"
              name="password"
              placeholder="Enter your password"
              label="Password"
              fullWidth

            />
          </Box>

          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            mb={5}
          >
            
           
          </Stack>
        </Stack>

        <Box>
          <LoadingButton
            loadingPosition="start"
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            loading={isLoading}
            sx={{
              marginTop: "16px",
            }}
          >
            Login
          </LoadingButton>
        </Box>
      </ADForm>
    </>
  );
};

export default AuthLogin;
