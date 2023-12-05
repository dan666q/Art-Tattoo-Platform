import {
  Box,
  Button,
  FormControl,
  IconButton,
  OutlinedInput,
  TextField,
  Typography,
  InputLabel,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import React, { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Register(props) {
  const { setIsLogin } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const [errorElement, setErrorElement] = React.useState("");
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.presentDefault();
  };

  const handleClickShowConfirm = () => setShowConfirm((show) => !show);

  const handleMouseDownConfirm = (event) => {
    event.presentDefault();
  };

  async function handleRegister(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confirm = confirmRef.current.value;
    if (!passwordRegex.test(password)) {
      setErrorElement("password");
      return;
    }
    if (password == confirm) {
      const registerRequest = {
        email: email,
        password: password,
        username: username,
      };
      await axios
        .post(
          `${import.meta.env.VITE_REACT_APP_API_URL}/register`,
          registerRequest
        )
        .then((res) => {
          console.log(res);
          toast.success("Register successfully! Please login to continue");
          setIsLogin(true);
        })
        .catch((err) => {
          if (err.response.data === "auth/existed-email") {
            setErrorElement("email");
          }
          if (err.response.data === "auth/existed-username") {
            setErrorElement("username");
          }
        });
    } else {
      setErrorElement("confirm");
    }
  }

  return (
    <>
      <Typography variant="h4" textAlign="center">
        Register
      </Typography>
      <form
        style={{
          marginTop: "2.5rem",
        }}
        onSubmit={handleRegister}
      >
        <TextField
          id="outlined-email"
          label="Email"
          fullWidth
          required
          inputRef={emailRef}
          onFocus={() => setErrorElement("")}
          error={errorElement === "email"}
          helperText={errorElement === "email" && "Existed email!"}
        />
        <TextField
          id="outlined-username"
          label="Username"
          fullWidth
          required
          sx={{
            marginTop: 3,
          }}
          inputRef={usernameRef}
          error={errorElement === "username"}
          helperText={errorElement === "username" && "Existed username!"}
        />
        <FormControl
          sx={{
            marginTop: 3,
          }}
          fullWidth
          variant="outlined"
          required
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
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
            label="Password"
            inputRef={passwordRef}
            onFocus={() => setErrorElement("")}
            error={errorElement === "password"}
          />
          <FormHelperText
            error={errorElement === "password"}
            id="password-helper"
          >
            {errorElement === "password"
              ? "Invalid password!"
              : "Password must contains 8 characters, lowercases, numbers"}
          </FormHelperText>
        </FormControl>
        <FormControl
          sx={{
            marginTop: 3,
          }}
          fullWidth
          variant="outlined"
          required
        >
          <InputLabel htmlFor="outlined-adornment-confirm">
            Confirm password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirm"
            type={showConfirm ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirm}
                  onMouseDown={handleMouseDownConfirm}
                  edge="end"
                >
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm password"
            inputRef={confirmRef}
            error={errorElement === "confirm"}
            onFocus={() => setErrorElement("")}
          />
          {errorElement === "confirm" && (
            <FormHelperText error id="confirm-error">
              Password does not match!
            </FormHelperText>
          )}
        </FormControl>
        <Button
          fullWidth
          variant="contained"
          sx={{
            marginTop: 2.5,
            paddingTop: 1.5,
            paddingBottom: 1.5,
          }}
          type="submit"
        >
          Register
        </Button>
      </form>
      <Box
        sx={{
          textAlign: "center",
          marginTop: 1.5,
          userSelect: "none",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="subtitle2">Already have an account?</Typography>
        <Typography
          variant="subtitle2"
          sx={{
            cursor: "pointer",
            ":hover": {
              textDecoration: "underline",
            },
            marginLeft: 1,
          }}
          onClick={() => {
            setIsLogin(true);
          }}
        >
          Log in
        </Typography>
      </Box>
    </>
  );
}

export default Register;
