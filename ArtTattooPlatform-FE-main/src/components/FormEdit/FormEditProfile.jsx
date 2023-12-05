import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const phoneRegExpVN = /^(?:\+84|0)(\d{9,10})$/;
const nameRegExp = /^[a-zA-Z]+$/;

const FormEditProfile = (props) => {
  const { userId } = props.data;
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    userName: props.data.userName,
    fullName: props.data.fullName,
    email: props.data.email,
    phoneNumber: props.data.phoneNumber,
    image: props.data.image,
  });

  const memoizedData = useMemo(() => data, [data]);

  useEffect(() => {
    if (memoizedData !== data) {
      handleSubmit();
    }
  }, [data]);

  const validateForm = () => {
    const errors = {};

    if (!phoneRegExpVN.test(data.phoneNumber)) {
      errors.phoneNumber = "Invalid Vietnamese phone number";
    }

    if (!nameRegExp.test(data.fullName)) {
      errors.fullName = "Invalid full name";
    }

    setValidationErrors(errors);
  };

  const handleSubmit = async () => {
    setLoading(true);

    validateForm();

    // Check for validation errors
    if (Object.keys(validationErrors).length > 0) {
      setLoading(false);
      return;
    }
    const token = localStorage.getItem("token");

    await axios
      .put(
        import.meta.env.VITE_REACT_APP_API_URL +
          `/User/UpdateProfileUser/${userId}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        toast.success("Updated profile successfully, please refresh page");
        setData({
          userName: res.data.userName,
          fullName: res.data.fullName,
          email: res.data.email,
          phoneNumber: res.data.phoneNumber,
          image: res.data.image,
        });
        setValidationErrors({});
        window.location.reload();
      })
      .catch((err) => toast.error(`Update Failed: ${err.message}`));
    setLoading(false);
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        border: "2px solid #322F2F",
        borderRadius: 5,
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5,
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h4">Edit Profile</Typography>
        <Container>
          <Stack spacing={2}>
            {Object.keys(data).map((key) => (
              <Stack
                key={key}
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>
                  {key.charAt(0).toUpperCase() + key.substring(1)}
                </Typography>
                <TextField
                  sx={{ width: "70%" }}
                  type="text"
                  name={key}
                  value={data[key]}
                  error={validationErrors[key] !== undefined}
                  helperText={validationErrors[key]}
                  onChange={(e) => setData({ ...data, [key]: e.target.value })}
                />
              </Stack>
            ))}
          </Stack>
        </Container>
        <Button
          type="submit"
          variant="outlined"
          onClick={handleSubmit}
          sx={{ width: "20%", placeSelf: "end" }}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Stack>
    </Container>
  );
};

export default FormEditProfile;
