import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import CardService from "../Card/CardService";

const PaginationCard = ({ serviceList, searchQuery  }) => {
  const itemsPerPage = 9;
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedServices = searchQuery
    ? serviceList
        .filter(service =>
          service && service.serviceName &&
          typeof service.serviceName === "string" &&
          service.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(startIndex, endIndex)
    : serviceList.slice(startIndex, endIndex);

  return (
    <Stack
      spacing={4}
      justifyContent={"center"}
      alignItems={"center"}
      borderRadius={5}
      paddingTop={2}
      paddingBottom={2}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {displayedServices.length > 0 ? (
          displayedServices.map((service, index) => (
            <Grid item xs={4} sm={4} md={4} key={index}>
              <CardService
                serviceId={service.serviceId}
                serviceName={service.serviceName}
                studioId={service.studioId}
                rate={service.rating}
                description={service.description}
                imageService={service.imageService}
                price={service.price}
              />
            </Grid>
          ))
        ) : (
          <Box className="mt-5 mb-5">
            <Typography variant="h5">
            No services found
            </Typography>
            </Box>
        )}
      </Grid>
      <Pagination
        count={Math.ceil(serviceList.length / itemsPerPage)}
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
};

export default PaginationCard;