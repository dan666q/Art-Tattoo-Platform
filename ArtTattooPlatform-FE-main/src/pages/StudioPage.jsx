import React, { useEffect, useState } from "react";
import {
  Avatar,
  Breadcrumbs,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "../index.css";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Home } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function StudioPage() {
  //api
  const [studio, setStudio] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getStudio();
  }, []);

  const getStudio = async () => {
    await axios
      .get(import.meta.env.VITE_REACT_APP_API_URL + "/Studio/GetAll")
      .then((res) => {
        setStudio(res.data.$values);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(studio);
  };
  //sort
  const [sortType, setSortType] = useState(null);

  const handleSortClick = (type) => {
    setSortType(type);
  };

  const sortStudios = (a, b) => {
    if (sortType === "name") {
      return a.studioName.localeCompare(b.studioName);
    } else if (sortType === "rating") {
      return b.ratingStb - a.ratingStb; // Compare ratings in descending order
    }
    return 0;
  };

  const sortedStudios = [...studio].sort(sortStudios);
  return (
    <Container className="mt-5 mb-5">
      <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 5 }}>
        <Stack
          spacing={1}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Home fontSize="inherit" />
          <Typography
            variant="body1"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              "&:hover": {
                color: "#FF7F22",
              },
            }}
          >
            Home
          </Typography>
        </Stack>
        <Typography variant="body1" sx={{ textDecoration: "none" }}>
          Studio
        </Typography>
      </Breadcrumbs>
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ width: "200px" }} variant="standard">
          <InputLabel>Sort By</InputLabel>
          <Select>
            <MenuItem value="name" onClick={() => handleSortClick("name")}>
              Name
            </MenuItem>
            <MenuItem value="rating" onClick={() => handleSortClick("rating")}>
              Rating
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div className="row">
        {sortedStudios.map((studio, index) => (
          <div key={index} className="col-md-4 mt-5">
            <Card sx={{ Width: 345 }}>
              <CardActionArea
                onClick={() => navigate(`/StudioDetail/${studio.studioId}`)}
              >
                <Box className="row">
                  <Box className="ps-4 col-md-4">
                    <Avatar
                      alt="Remy Sharp"
                      src={studio.logo}
                      sx={{ width: 100, height: "100px" }}
                      className="mt-3 mb-3"
                    />
                  </Box>
                  <CardContent className="col-md-8 ps-4 pe-4">
                    <Typography component="div" variant="h5">
                      {studio.studioName}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                      className="ellipsis"
                    >
                      {studio.description}
                    </Typography>
                    <Rating size="small" value={studio.ratingStb} readOnly />
                  </CardContent>
                </Box>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
}
