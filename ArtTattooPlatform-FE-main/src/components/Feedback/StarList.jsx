import {
  Box,
  Divider,
  LinearProgress,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

export const StarList = ({ ratings }) => {
  const [totalRatings, setTotalRatings] = useState(0);

  useEffect(() => {
    setTotalRatings(ratings.reduce((acc, rating) => acc + rating.count, 0));
  }, [ratings]);

  return (
    <Box sx={{ mt: 2 }}>
      {ratings.map((rating, index) => (
        <Stack
          divider={<Divider orientation="vertical" flexItem />}
          direction={"row"}
          spacing={1}
          justifyContent={"flex-start"}
          alignContent={"center"}
          key={index}
        >
          <Rating
            value={rating.rate}
            size="small"
            readOnly
            color={rating.rate === 5 ? "green" : "red"}
          />
          <LinearProgress
            value={(rating.count / totalRatings) * 100}
            sx={{ width: "100px", height: 18 }}
            variant="determinate"
          />
          <Typography variant="body2">({rating.count})</Typography>
        </Stack>
      ))}
    </Box>
  );
};
