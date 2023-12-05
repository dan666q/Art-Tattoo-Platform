import { Box, Divider, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CardStudio from "../Card/CardStudio";

const TopRateStudio = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getStudio();
  }, []);

  const getStudio = async () => {
    await axios
      .get(import.meta.env.VITE_REACT_APP_API_URL + "/Studio/GetAll")
      .then((res) => {
        // console.log(res.data.$values);
        setData(res.data.$values);
      })
      .catch((err) => setData(err));
  };

  data.sort((studioA, studioB) => {
    return studioB.ratingStb - studioA.ratingStb;
  });

  return (
    <Box
      sx={{
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: "center",
        borderRadius: 1,
        border: "2px solid #322F2F",
      }}
      className="mb-5"
    >
      <Stack
        spacing={2}
        divider={
          <Divider
            orientation="horizontal"
            flexItem
            sx={{
              width: "80%",
              placeSelf: "center",
            }}
          />
        }
      >
        <Typography variant="h5">Top Rate Studio</Typography>
        {data.map((studio, index) => {
          return (
            <CardStudio
              key={index}
              studioId={studio.studioId}
              studioName={studio.studioName}
              logo={studio.logo}
              ratingStb={studio.ratingStb}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default TopRateStudio;
