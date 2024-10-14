import React from "react";
import { Grid, Box, Skeleton } from "@mui/material";

const FolderLoadingSkeleton = () => {
  return (
    <Grid container spacing={3}>
      {Array.from(new Array(8)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 150,
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Skeleton variant="rectangular" width={80} height={80} />
            <Skeleton variant="text" width="60%" height={30} sx={{ mt: 2 }} />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default FolderLoadingSkeleton;
