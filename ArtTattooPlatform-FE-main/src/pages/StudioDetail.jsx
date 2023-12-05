import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  Breadcrumbs,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Modal,
  Stack,
} from "@mui/material";
import { Avatar, Card, Rating, Typography } from "@mui/material";
import Booking from "../components/Modal/Booking";
import CardService from "../components/Card/CardService";
import Slider from "react-slick";
import { Home } from "@mui/icons-material";
import { StarList } from "../components/Feedback/StarList";
import FeedbackForm from "../components/Feedback/FeedbackForm";
import CommentList from "../components/Feedback/CommentList";
import ProfileStudio from "../components/Box/ProfileStudio";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import Map from "../components/Map/Map";

export default function StudioDetail() {
  const { studioId } = useParams();
  const [coords, setCoords] = useState(null);
  const [places, setPlaces] = useState("");
  const [studioData, setStudioData] = useState(null);
  const [serviceData, setServiceData] = useState(null);

  useEffect(() => {
    getStudioID();
    getServiceByStudioId();
  }, [studioId]);

  useEffect(() => {
    const getCoords = async () => {
      const addressArr = studioData?.address?.split(",");

      const results = await geocodeByAddress(studioData?.address);
      const latLng = await getLatLng(results[0]);
      setCoords(latLng);
    };
    studioData && getCoords();
  }, [studioData]);

  const getStudioID = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/Studio/GetStudioByID/${studioId}`
      );
      // console.log(response.data);
      setStudioData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getServiceByStudioId = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/Service/GetServiceByStudio/${studioId}`
      );
      setServiceData(response.data.$values);
    } catch (error) {
      console.log(error);
    }
  };

  const settings = {
    // className: "center",
    dots: false,
    infinite: true,
    centerPadding: "50px",
    speed: 500,
    slidesToShow: 3,
    swipeToSlide: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 1,
  };

  const ratings = [
    { rate: 5, count: 100 },
    { rate: 4, count: 50 },
    { rate: 3, count: 20 },
    { rate: 2, count: 10 },
    { rate: 1, count: 5 },
  ];

  return (
    <Container className="mt-5 mb-5">
      <Breadcrumbs aria-label="breadcrumb">
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
        <Typography
          variant="body1"
          component={Link}
          to="/StudioPage"
          sx={{
            textDecoration: "none",
            "&:hover": {
              color: "#FF7F22",
            },
          }}
        >
          Studio
        </Typography>
        <Typography variant="body1" sx={{ textDecoration: "none" }}>
          {studioData && studioData.studioName}
        </Typography>
      </Breadcrumbs>
      <Grid container spacing={2} paddingTop={10}>
        <Grid item xs={4}>
          {/* <ProfileStudio studioData={studioData} /> */}
          <Card
            sx={{
              border: "2px solid #322F2F",
              borderRadius: 1,
              marginBottom: 5,
            }}
          >
            <Stack
              spacing={2}
              direction="column"
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Avatar
                sx={{ width: 100, height: 100, borderColor: "white" }}
                className="mt-5 mb-4"
                src={studioData && studioData.logo}
              />
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ textAlign: "center" }}
                className="mb-1"
              >
                {studioData && studioData.studioName}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                sx={{ textAlign: "center" }}
                className="mb-1"
              >
                {studioData && studioData.description}
              </Typography>
              <Rating
                name="size-small"
                value={studioData && studioData.ratingStb}
                size="small"
                readOnly
              />
              <Typography
                gutterBottom
                variant="h7"
                component="div"
                sx={{ textAlign: "center" }}
                className="mb-1"
              >
                {studioData && studioData.studioEmail}
              </Typography>
              <Typography
                gutterBottom
                variant="h7"
                component="div"
                sx={{ textAlign: "center" }}
                className="mb-1"
              >
                {studioData && studioData.studioPhone}
              </Typography>
              <Typography
                gutterBottom
                variant="h7"
                component="div"
                sx={{ textAlign: "center" }}
                className="mb-5"
              >
                {studioData && studioData.address}
              </Typography>
            </Stack>
          </Card>
          {/* Google Map React */}
          {studioData && <Map address={studioData.address} coords={coords} />}

          <Typography variant="h5" className="mt-5">
            Our ratings
          </Typography>
          {/* give reviews and write review content */}
          <StarList ratings={ratings} />
        </Grid>
        <Grid item xs={8}>
          <Container>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ textAlign: "center" }}
              className="mb-4"
            >
              OUR SERVICE
            </Typography>
            <Slider {...settings} className="ps-4">
              {serviceData &&
                serviceData.map((dataService, index) => {
                  return (
                    <CardService
                      key={index}
                      serviceId={dataService.serviceId}
                      serviceName={dataService.serviceName}
                      studioId={dataService.studioId}
                      rate={dataService.rating}
                      description={dataService.description}
                      imageService={dataService.imageService}
                      price={dataService.price}
                    />
                  );
                })}
            </Slider>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
}
