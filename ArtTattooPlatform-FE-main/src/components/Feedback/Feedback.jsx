import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { StarList } from "./StarList";
import CommentList from "./CommentList";
import FeedbackForm from "./FeedbackForm";
import axios from "axios";

const Feedback = ({ serviceId }) => {
  const ratings = [
    { rate: 5, count: 100 },
    { rate: 4, count: 50 },
    { rate: 3, count: 20 },
    { rate: 2, count: 10 },
    { rate: 1, count: 5 },
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h5">Feedback from customers</Typography>
      {/* give reviews and write review content */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columnSpacing={{ xs: 4, md: 8, lg: 12 }}
        paddingTop={3}
      >
        <Grid item xs={6}>
          <Stack spacing={4}>
            <StarList ratings={ratings} />
            <FeedbackForm serviceId={serviceId} />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <CommentList serviceId={serviceId} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Feedback;
