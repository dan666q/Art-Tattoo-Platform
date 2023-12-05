import {
	Backdrop,
	Box,
	Button,
	Fade,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	Modal,
	OutlinedInput,
	TextField,
	Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { useShowAuthModal } from "../../stores/useShowAuthModal";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import axios from "axios";

function Login(props) {
	const { setIsLogin } = props;
	const [showPassword, setShowPassword] = React.useState(false);
	const navigate = useNavigate();
	const emailRef = useRef();
	const passwordRef = useRef();
	const [errorElement, setErrorElement] = React.useState("");

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.presentDefault();
	};

	const handleLoginGoogle = useGoogleLogin({
		onSuccess: async (credentialResponse) => {
			localStorage.setItem("token", credentialResponse.access_token);
			await axios
				.get("https://www.googleapis.com/oauth2/v3/userinfo", {
					headers: {
						Authorization: `Bearer ${credentialResponse.access_token}`,
					},
				})
				.then(async (response) => {
					const userInfo = response.data;
					const googleRequest = {
						Email: userInfo.email,
						Name: userInfo.name,
						Image: userInfo.picture,
					};
					await axios
						.post(
							`${
								import.meta.env.VITE_REACT_APP_API_URL
							}/LoginGoogle`,
							googleRequest
						)
						.then((res) => {
							localStorage.setItem("token", res.data);
							navigate(0);
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((error) => {
					console.error(
						"Lỗi khi đổi mã thông báo (token exchange):",
						error
					);
				});
			// window.location.reload();
		},
		onError: () => {
			console.log("Login failed!");
		},
	});

	async function handleLogin(event) {
		event.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const loginRequest = {
			email: email,
			password: password,
		};
		await axios
			.post(
				`${import.meta.env.VITE_REACT_APP_API_URL}/login`,
				loginRequest
			)
			.then((res) => {
				localStorage.setItem("token", res.data);
				navigate(0);
			})
			.catch((err) => {
				console.log(err);
				if (err.response.data === "auth/incorrect-email") {
					setErrorElement("email");
				}
				if (err.response.data === "auth/incorrect-password") {
					setErrorElement("password");
				}
			});
	}

	return (
		<>
			<Typography variant="h4" textAlign="center">
				Welcome back!
			</Typography>
			<form
				style={{
					marginTop: "2.5rem",
				}}
				onSubmit={handleLogin}
			>
				<TextField
					id="outlined-email"
					label="Email"
					fullWidth
					required
					inputRef={emailRef}
					type="email"
					error={errorElement === "email"}
					helperText={errorElement === "email" && "Email not found!"}
				/>
				<FormControl
					sx={{
						marginTop: 2,
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
									{showPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						}
						label="Password"
						inputRef={passwordRef}
						error={errorElement === "password"}
					/>
					{errorElement === "password" && (
						<FormHelperText error id="password-error">
							Incorrect password!
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
					Login
				</Button>
			</form>
			<div
				style={{
					backgroundColor: "gray",
					width: "100%",
					height: 0.5,
					marginTop: "1.5rem",
					marginBottom: "1.5rem",
				}}
			></div>
			<Button
				variant="outlined"
				fullWidth
				sx={{
					paddingTop: 1.2,
					paddingBottom: 1.2,
				}}
				onClick={handleLoginGoogle}
			>
				<GoogleIcon sx={{ marginRight: 1 }} />
				Continue with Google
			</Button>
			<Box
				sx={{
					textAlign: "center",
					marginTop: 1.5,
					userSelect: "none",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Typography variant="subtitle2">
					Don't have an account?
				</Typography>
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
						setIsLogin(false);
					}}
				>
					Sign up
				</Typography>
			</Box>
		</>
	);
}

export default Login;
