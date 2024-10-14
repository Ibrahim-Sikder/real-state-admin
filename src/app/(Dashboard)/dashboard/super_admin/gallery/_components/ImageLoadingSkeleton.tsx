"use client";

import React from "react";
import { Box, Grid, Skeleton } from "@mui/material";

const ImageLoadingSkeleton = () => {
  return (
    <Grid container spacing={2} sx={{ mt: 5 }}>
      {Array.from(new Array(12)).map((_, index) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
          <Box>
            <Skeleton variant="rectangular" width="100%" height={120} />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="60%" />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ImageLoadingSkeleton;
