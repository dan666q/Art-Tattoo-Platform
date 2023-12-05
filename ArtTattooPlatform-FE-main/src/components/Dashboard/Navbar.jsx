import {
	AppBar,
	Avatar,
	Box,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOpenDashboard } from "../../stores/useOpenDashboard";
import { useUserInfo } from "../../stores/useUserInfo";
import { useState } from "react";
import axios from "axios";

function Navbar(props) {
	const { title } = props;
	const user = useUserInfo((state) => state.user);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const [data, setData] = useState(null);
	const navigate = useNavigate();
	const setOpenDashboard = useOpenDashboard((state) => state.setOpen);

	useEffect(() => {
		getUserAccount();
	}, [user.userID]);

	const getUserAccount = async () => {
		const token = localStorage.getItem("token");
		await axios
			.get(
				`${
					import.meta.env.VITE_REACT_APP_API_URL
				}/User/GetUserInfoByUserID/${user.userID}`,
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			)

			.then(function (response) {
				setData(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	console.log(data);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const handleLogout = () => {
		localStorage.removeItem("token");
		handleCloseUserMenu();
		setOpenDashboard(false);
		navigate("/");
	};

	return (
		<AppBar
			position="static"
			sx={{
				backgroundColor: "transparent",
			}}
		>
			<Container maxWidth>
				<Toolbar disableGutters>
					<Box sx={{ flexGrow: 1 }}></Box>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open menu">
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}
							>
								<Avatar src={data && data.image} />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem
								onClick={() => {
									handleLogout();
								}}
							>
								<Typography>Sign out</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default Navbar;
