import React from "react";
import GoogleMapReact from "google-map-react";
import { LocationOn } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

const Position = ({ text, icon }) => (
  <Tooltip placement="top" title={text}>
    {icon}
  </Tooltip>
);

const Map = ({ coords, address }) => {
  return (
    <div style={{ height: 300, width: "100%", marginTop: 10 }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: import.meta.env.VITE_REACT_APP_REACT_MAP,
        }}
        defaultCenter={coords}
        defaultZoom={18}
        center={coords}
      >
        <Position
          lat={coords?.lat}
          lng={coords?.lng}
          icon={<LocationOn sx={{ color: "red", fontSize: 30 }} />}
          text={address}
        />
      </GoogleMapReact>
    </div>
  );
};

export default Map;
