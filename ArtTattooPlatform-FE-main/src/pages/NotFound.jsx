import { Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function NotFound() {
	const navigate = useNavigate();
	useEffect(() => {
		document.title = "Page not found";
	}, []);

	return (
		<Container
			sx={{
				height: "70vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<Typography variant="h2">404</Typography>
			<Typography variant="h1">Page not found</Typography>
			<Button
				variant="outlined"
				sx={{
					marginTop: 7,
					paddingTop: 1.5,
					paddingBottom: 1.5,
					paddingLeft: 3,
					paddingRight: 3,
				}}
				onClick={() => navigate("/")}
			>
				Go to homepage
			</Button>
		</Container>
	);
}

export default NotFound;
