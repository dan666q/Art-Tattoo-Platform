import { Box } from "@mui/material";
import React, { useState } from "react";
import Slider from "react-slick";
import "../../styles/SliderPicture.css";

const SliderPicture = ({ image }) => {
  const [Nav1, setNav1] = useState(null);
  const [Nav2, setNav2] = useState(null);

  const settings = {
    className: "center",
    dots: false,
    infinite: true,
    centerMode: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    maxWidth: '100%',
    maxHeight: '100%',
    width: 'auto',
    height: 'auto'

  };
  return (
    <Box style={{ width: '500px', height: '300px' }}>
      <img className="box-slider" src={image} />
    </Box>
  );
};

export default SliderPicture;
