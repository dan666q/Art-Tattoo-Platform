import React, { Component } from "react";
import CardService from "../Card/CardService";
import Slider from "react-slick";
import { Box, Skeleton } from "@mui/material";
import { Container } from "@mui/system";

const SliderCard = ({ serviceList }) => {
  const settings = {
    // className: "center",
    dots: false,
    infinite: true,
    centerPadding: "50px",
    speed: 500,
    slidesToShow: 5,
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

  return (
    <Box
      sx={{
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
      }}
    >
      <Slider {...settings}>
        {serviceList.map((data, index) => {
          return data.rating === 5 ? (
            <CardService
              key={index}
              serviceId={data.serviceId}
              serviceName={data.serviceName}
              studioId={data.studioId}
              description={data.description}
              rate={data.rating}
              imageService={data.imageService}
              price={data.price}
            />
          ) : null;
        })}
      </Slider>
    </Box>
  );
};

export default SliderCard;
