import React, { lazy, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Box,
  ButtonGroup,
  Container,
  Grid,
  Stack,
} from "@mui/material";
import Button from "@mui/material/Button";

import axios from "axios";
import { Email, Person, Phone } from "@mui/icons-material";
import FormEditAccount from "../components/FormEdit/FormEditAccount";
import { useUserInfo } from "../stores/useUserInfo";

const FormEditProfile = lazy(() =>
  import(`../components/FormEdit/FormEditProfile`)
);

export default function ProfilePage() {
  const user = useUserInfo((state) => state.user);
  console.log(user);
  const [data, setData] = useState([]);
  // console.log(data);
  const [formType, setFormType] = useState(null);

  const handleClickOpenProfile = () => {
    setFormType("profile");
  };

  const handleClickOpenAccount = () => {
    setFormType("account");
  };

  // api call
  // const [profile, setProfile] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const token = localStorage.getItem("token");
    await axios
      .get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/User/GetUserInfoByUserID/${
          user.userID
        }`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )

      .then(function (response) {
        setData(response.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const renderUserProfile = () => {
    switch (user.role) {
      case "MB":
        return (
          <Typography variant="subtitle2" color="gray">
            Member
          </Typography>
        );
      case "AT":
        return (
          <Typography variant="subtitle2" color="gray">
            Artist
          </Typography>
        );
      case "MN":
        return (
          <Typography variant="subtitle2" color="gray">
            Manager
          </Typography>
        );
      case "AD":
        return (
          <Typography variant="subtitle2" color="gray">
            Admin
          </Typography>
        );
      default:
        return (
          <Typography variant="subtitle2" color="gray">
            Unknown
          </Typography>
        );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 5, paddingBottom: 5 }}>
      {formType === null ? (
        <Container maxWidth="xs">
          <Box border="2px solid #322F2F" borderRadius={5} paddingBottom={5}>
            <Stack
              direction="column"
              justifyContent={"center"}
              alignItems={"center"}
              spacing={4}
            >
              <Avatar
                sx={{ width: 100, height: 100 }}
                className="mt-5 mb-4"
                src={data && data.image}
                alt={data && data.userName}
              />
              <Stack textAlign="center">
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ textAlign: "center" }}
                >
                  {data && data.userName}
                </Typography>

                {renderUserProfile()}
              </Stack>

              <Container>
                <Grid container spacing={3}>
                  <Grid item xs="3" textAlign="left">
                    <Stack direction="row" spacing={1}>
                      <Email fontSize="small" />
                      <Typography>Email:</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs="9" textAlign="right">
                    {data && data.email}
                  </Grid>
                  <Grid item xs="3" textAlign="left">
                    <Stack direction="row" spacing={1}>
                      <Phone fontSize="small" />
                      <Typography>Phone:</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs="9" textAlign="right">
                    {data && data.phoneNumber}
                  </Grid>
                  <Grid item xs="3" textAlign="left">
                    <Stack direction="row" spacing={1}>
                      <Person fontSize="small" />
                      <Typography>FullName:</Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs="9" textAlign="right">
                    {data && data.fullName}
                  </Grid>
                </Grid>
              </Container>
            </Stack>
          </Box>

          <ButtonGroup
            sx={{
              paddingTop: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
            }}
          >
            {data && data.password === null ? (
              <Button
                onClick={handleClickOpenProfile}
                variant="outlined"
                sx={{
                  backgroundColor: "#1E1E1E",
                  color: "white",
                  border: "none",
                  width: "200px",
                }}
              >
                Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleClickOpenProfile}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#1E1E1E",
                    color: "white",
                    border: "none",
                    width: "200px",
                  }}
                >
                  Edit Profile
                </Button>
                <Button
                  onClick={handleClickOpenAccount}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#1E1E1E",
                    color: "white",
                    border: "none",
                    width: "200px",
                  }}
                >
                  Account Setting
                </Button>
              </>
            )}
          </ButtonGroup>
        </Container>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={4.5}>
            <Box border="2px solid #322F2F" borderRadius={5} paddingBottom={5}>
              <Stack
                direction="column"
                justifyContent={"center"}
                alignItems={"center"}
                spacing={4}
              >
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  className="mt-5 mb-4"
                  src={data && data.image}
                  alt={data && data.userName}
                />
                <Stack textAlign="center">
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ textAlign: "center" }}
                  >
                    {data && data.userName}
                  </Typography>

                  {renderUserProfile()}
                </Stack>

                <Container>
                  <Grid container spacing={3}>
                    <Grid item xs="3" textAlign="left">
                      <Stack direction="row" spacing={1}>
                        <Email fontSize="small" />
                        <Typography>Email:</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs="9" textAlign="right">
                      {data && data.email}
                    </Grid>
                    <Grid item xs="3" textAlign="left">
                      <Stack direction="row" spacing={1}>
                        <Phone fontSize="small" />
                        <Typography>Phone:</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs="9" textAlign="right">
                      {data && data.phoneNumber}
                    </Grid>
                    <Grid item xs="3" textAlign="left">
                      <Stack direction="row" spacing={1}>
                        <Person fontSize="small" />
                        <Typography>FullName:</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs="9" textAlign="right">
                      {data && data.fullName}
                    </Grid>
                  </Grid>
                </Container>
              </Stack>
            </Box>

            <ButtonGroup
              sx={{
                paddingTop: 5,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 3,
              }}
            >
              {data && data.password === null ? (
                <Button
                  onClick={handleClickOpenProfile}
                  variant="outlined"
                  sx={{
                    backgroundColor: "#1E1E1E",
                    color: "white",
                    border: "none",
                    width: "200px",
                  }}
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleClickOpenProfile}
                    variant="outlined"
                    sx={{
                      backgroundColor: "#1E1E1E",
                      color: "white",
                      border: "none",
                      width: "200px",
                    }}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    onClick={handleClickOpenAccount}
                    variant="outlined"
                    sx={{
                      backgroundColor: "#1E1E1E",
                      color: "white",
                      border: "none",
                      width: "200px",
                    }}
                  >
                    Account Setting
                  </Button>
                </>
              )}
            </ButtonGroup>
          </Grid>
          <Grid
            item
            xs={7.5}
            display={"flex"}
            justifyContent="center"
            alignItems="flex-start"
            // sx={{ backgroundColor: "blue" }}
          >
            {formType === "profile" && <FormEditProfile data={data} />}
            {formType === "account" && <FormEditAccount data={data} />}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
