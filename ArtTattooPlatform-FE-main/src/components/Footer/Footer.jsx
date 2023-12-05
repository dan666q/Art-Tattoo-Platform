import { Facebook, Pinterest, Twitter, Instagram } from "@mui/icons-material";
import {
	AppBar,
	Avatar,
	Container,
	Divider,
	Grid,
	Stack,
	Toolbar,
	Typography,
} from "@mui/material";
import React from "react";
import LOGO from "../../assets/images/Logo.png";
import { useOpenDashboard } from "../../stores/useOpenDashboard";
const IconList = [
	{ icon: <Facebook /> },
	{ icon: <Pinterest /> },
	{ icon: <Twitter /> },
	{ icon: <Instagram /> },
];

const Footer = () => {
	const isOpenDashboard = useOpenDashboard((state) => state.isOpen);
	return (
		<AppBar
			position="static"
			sx={{
				bottom: 0,
				display: isOpenDashboard ? "none" : "flex",
			}}
		>
			<Toolbar>
				<Container
					maxWidth="md"
					sx={{ flexGrow: 1, paddingTop: 10, paddingBottom: 10 }}
				>
					<Grid
						container
						spacing={{ xs: 2, md: 3, lg: 5 }}
						columns={{ xs: 4, sm: 8, md: 12 }}
					>
						<Grid item xs={6}>
							<Stack>
								<Typography variant="h5" color="white">
									Contact us
								</Typography>
								<Typography width="auto" variant="subtitle1">
									vnink@gmail.com
									<Divider width="40%" color="#FF7F22" />
								</Typography>
							</Stack>
						</Grid>
						<Grid item xs={6}>
							<Stack spacing={2}>
								<Stack direction="row" spacing={0}>
									<Avatar
										sx={{
											display: { xs: "none", md: "flex" },
											mr: 1,
										}}
										src={LOGO}
										alt="Logo"
									/>
									<Typography variant="h4" color="white">
										VNINK
									</Typography>
								</Stack>
								<Typography
									variant="subtitle1"
									maxWidth="50%"
									color="#858484"
								>
									Platform to connect with users and studios
								</Typography>
								<Stack direction={"row"} spacing={1}>
									{IconList.map((item, index) => {
										return (
											<Avatar key={index}>
												{item.icon}
											</Avatar>
										);
									})}
								</Stack>
							</Stack>
						</Grid>
					</Grid>
				</Container>
			</Toolbar>
		</AppBar>
	);
};

export default Footer;
