import { Box } from "@mui/material";
import React, { useState, lazy, useEffect } from "react";
import BookingChart from "../components/Dashboard/BookingChart";
import Drawer from "../components/Dashboard/Drawer";
import Navbar from "../components/Dashboard/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import { useOpenDashboard } from "../stores/useOpenDashboard";

function Dashboard() {
	const setOpenDashboard = useOpenDashboard((state) => state.setOpen);

	useEffect(() => {
		setOpenDashboard(true);
	}, []);

	return (
		<Box
			className="app"
			sx={{
				display: "flex",
				height: "100vh",
			}}
		>
			<Drawer />
			<Box
				sx={{
					width: "100vw",
				}}
			>
				<Navbar />
				<Outlet />
			</Box>
		</Box>
	);
}

export default Dashboard;
