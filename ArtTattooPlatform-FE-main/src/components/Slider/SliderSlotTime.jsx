import React, { useRef } from "react";
import { useState } from "react";
import { Button, Stack, Grid, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import Times from "../../datas/Times";
import axios from "axios";

const SliderSlotTime = ({ timeRef, studioId }) => {
  const [times, setTimes] = useState(Times);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    getStartTimeAndEndTime();
  }, []);

  const getStartTimeAndEndTime = async () => {
    await axios
      .get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/Studio/GetStudioByID/${studioId}`
      )
      .then((response) => {
        setStartTime(response.data.openTime);
        setEndTime(response.data.endTime);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = (event) => {
    // Get the time of the button that was clicked
    const time = event.target.textContent;
    timeRef.current.value = time;

    // If the user has previously selected a button, reset it to its original state
    if (selectedTime) {
      selectedTime.style.backgroundColor = "#4B4949";
    }

    // Change the color of the button
    event.target.style.backgroundColor = "#FF7F22";

    // Update the selected button state
    setSelectedTime(event.target);
  };

  const renderTime = (time, index) => {
    if (time.time >= startTime && time.time <= endTime) {
      time.status = "active";
    }

    const style = {
      color: time.status === "active" ? "black" : "gray",
      backgroundColor: time.status === "active" ? "#4B4949" : "#1D1C1C",
    };

    return (
      <Grid item xs={2} key={index}>
        <Button
          variant="contained"
          onClick={handleClick}
          style={style}
          disabled={time.status === "inactive" ? "disable" : ""}
          data-time={time.time}
          ref={timeRef}
        >
          {time.time}
        </Button>
      </Grid>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={1}>
        <Stack spacing={3} direction={"row"} justifyContent={"flex-start"}>
          <Typography color="#FF7F22">Studio Working:</Typography>
          <Typography>
            {startTime} - {endTime}
          </Typography>
        </Stack>
        <Typography variant="body2" textAlign="left" sx={{ color: "gray" }}>
          Note: Please make an appointment 1 day before the current time
        </Typography>
      </Stack>
      <Grid
        marginTop={2}
        container
        direction={"column"}
        spacing={2}
        sx={{ height: 250, overflowY: "hidden" }}
      >
        {times.map(renderTime)}
      </Grid>
    </Box>
  );
};

export default SliderSlotTime;
