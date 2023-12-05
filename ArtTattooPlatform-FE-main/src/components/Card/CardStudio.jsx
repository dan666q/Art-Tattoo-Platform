import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const CardStudio = (props) => {
  const { studioId, studioName, logo, ratingStb } = props;
  const navigate = useNavigate();

  const onClickStudioById = (e) => {
    navigate(`/StudioDetail/${studioId}`);
  };

  return (
    <Card
      key={studioId}
      sx={{ width: "80%", backgroundColor: "#322F2F", placeSelf: "center" }}
    >
      <CardActionArea onClick={onClickStudioById}>
        <CardContent>
          <Stack
            spacing={2}
            direction={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Avatar alt={studioName} src={logo} />
            <Stack
              spacing={1}
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
            >
              <Typography sx={{ fontSize:'small'}}>{studioName}</Typography>
              <Rating size="small" value={ratingStb} readOnly />
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardStudio;
