import { Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SliderCard from "../components/Slider/SliderCard";
import axios from "axios";
import PaginationCard from "../components/Pagination/PaginationCard";
import TopRateStudio from "../components/TopRate/TopRateStudio";
import { useUserInfo } from "../stores/useUserInfo";
import { useNavigate } from "react-router-dom";
import { useOpenDashboard } from "../stores/useOpenDashboard";

const Home = () => {
	const [serviceList, setServiceList] = useState([]);
	const userInfo = useUserInfo((state) => state.user);
	const navigate = useNavigate();
	const setOpenDashboard = useOpenDashboard((state) => state.setOpen);

	useEffect(() => {
		getServiceList();
		const token = localStorage.getItem("token");
		if (token != null) {
			if (userInfo.role === "MN" || userInfo.role === "AD") {
				setOpenDashboard(true);
				navigate("dashboard");
			}
		}
	}, []);

	const getServiceList = async () => {
		await axios
			.get(import.meta.env.VITE_REACT_APP_API_URL + "/Service/GetAll")
			.then((res) => {
				// console.log(res.data.$values);
				setServiceList(res.data.$values);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Container>
			<Stack
				spacing={3}
				direction={"column"}
				paddingTop={5}
				paddingBottom={5}
			>
				<Typography variant="h5">TOP RATE SERVICE</Typography>
				<SliderCard serviceList={serviceList} />
				<Typography variant="h5">NEW SERVICE</Typography>
			</Stack>
			<Grid container spacing={6} columns={{ xs: 4, sm: 8, md: 12 }}>
				<Grid item xs={9}>
					<PaginationCard serviceList={serviceList} />
				</Grid>
				<Grid item xs={3}>
					<TopRateStudio />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;
