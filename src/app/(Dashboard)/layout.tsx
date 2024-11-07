"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Header from "./layout/header/Header";
import Sidebar from "./layout/sidebar/Sidebar";
import { theme } from "@/lib/Theme/Theme";
import Head from "next/head";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: theme.palette.background.default,
}));

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <MainWrapper className="mainwrapper">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Your app description here" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <title>Anaa Developers Ltd </title>
      </Head>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper className="page-wrapper">
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "100%",
              xl: "calc(100% - 150px)",
            },
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
        </Container>
        ;
      </PageWrapper>
    </MainWrapper>
  );
}
