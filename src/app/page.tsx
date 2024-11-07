"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
import AuthLogin from "@/components/auth/AuthLogin";
import PageContainer from "./(Dashboard)/components/container/PageContainer";
import Head from "next/head";

const Login2 = () => {
  return (
    <PageContainer title="Login | Admin Dashboard">
      <Head>
        <title>Login | Admin Dashboard</title>
        <meta name="description" content="Login to access the admin dashboard. Secure and efficient platform for managing administrative tasks." />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="admin login, dashboard login, secure login, admin portal" />
        <meta property="og:title" content="Admin Login" />
        <meta property="og:description" content="Login to access the admin dashboard. A secure platform for managing administrative tasks." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://admin.anaadevelopersltd.com/" />
        <meta property="og:image" content="https://admin.anaadevelopersltd.com" />
      </Head>
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >

              <AuthLogin
                subtext={
                  <Typography
                    variant="h5"
                    textAlign="center"
                    fontWeight='bold'
                  >
                    Welcome to Admin
                  </Typography>
                }
                subtitle={
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    mt={3}
                  >
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="500"
                    >
                      Don’t have an account?
                    </Typography>
                    <Typography
                      component={Link}
                      href="/authentication/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: "none",
                        color: "primary.main",
                      }}
                    >
                      Contact us
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default Login2;
