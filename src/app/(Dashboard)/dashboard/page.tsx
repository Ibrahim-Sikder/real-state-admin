"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/(Dashboard)/components/container/PageContainer";

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box >
        <h1 className="flex items-center justify-center h-screen "> Welcome to Anaa Developer Ltd  </h1>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
