import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useFormControl,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";

const FormEditAccount = (props) => {
  const { userId, password } = props.data;

  const [pass, setPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const [passError, setPassError] = useState(null);
  const [newPassError, setNewPassError] = useState(null);
  const [confirmPassError, setConfirmPassError] = useState(null);

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmNewPassword(!showConfirmNewPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const validateInputs = () => {
    // Implement your validation logic here
    // For example, you can check if the passwords match
    if (pass !== password) {
      setPassError("Incorrect password");
    } else {
      setPassError(null);
    }

    if (newPass.length < 8) {
      setNewPassError("Password must be at least 8 characters");
    } else {
      setNewPassError(null);
    }

    if (confirmPass !== newPass) {
      setConfirmPassError("Passwords do not match");
    } else {
      setConfirmPassError(null);
    }
  };

  const MyFormHelperText = ({ error }) => {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused) {
        return "This field is being focused";
      }

      return error || "Input text";
    }, [focused, error]);

    return <FormHelperText>{helperText}</FormHelperText>;
  };

  const handleSubmit = async () => {
    validateInputs();
    const token = localStorage.getItem("token");
    const ChangePasswordRequest = {
      oldPassword: pass,
      newPassword: confirmPass,
    };

    console.log(ChangePasswordRequest);
    await axios
      .put(
        `${
          import.meta.env.VITE_REACT_APP_API_URL
        }/User/UpdatePassword/${userId}`,
        ChangePasswordRequest,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => {
        toast.success("Password updated successfully!");
        window.location.reload();
      })
      .catch(() => toast.error("Couldn't update password!"));
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
        <Typography variant="h4">Account Setting</Typography>
        <Stack spacing={2}>
          <FormControl error={!!passError}>
            <OutlinedInput
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <MyFormHelperText error={passError} />
          </FormControl>
          <FormControl error={!!newPassError}>
            <OutlinedInput
              onChange={(e) => setNewPass(e.target.value)}
              placeholder="Enter new password"
              type={showNewPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle new password visibility"
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <MyFormHelperText error={newPassError} />
          </FormControl>
          <FormControl error={!!confirmPassError}>
            <OutlinedInput
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Confirm your password"
              type={showConfirmNewPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm new password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmNewPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <MyFormHelperText error={confirmPassError} />
          </FormControl>

          <Button
            type="button"
            variant="outlined"
            sx={{ width: "20%", placeSelf: "end" }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default FormEditAccount;
