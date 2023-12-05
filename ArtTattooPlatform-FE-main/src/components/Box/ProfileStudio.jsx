import { Avatar, Box, Stack } from "@mui/material";
import React from "react";

const ProfileStudio = ({ studioData }) => {
  const { studioName, address, description, logo, studioEmail, studioPhone } =
    studioData;
  return (
    <Box sx={{ border: "1px solid", borderRadius: 3 }}>
      <Stack direction="column" spacing={2}>
        <Avatar />
      </Stack>
    </Box>
  );
};

export default ProfileStudio;
