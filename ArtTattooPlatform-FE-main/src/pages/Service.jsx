import { Home } from "@mui/icons-material";
import { Breadcrumbs, Container, InputBase, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PaginationCard from "../components/Pagination/PaginationCard";
import axios from "axios";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "30%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "30%",
		[theme.breakpoints.up("md")]: {
			width: "16rem",
		},
	},
}));
const Service = () => {
	const [serviceList, setServiceList] = useState([]);

	useEffect(() => {
		getServiceList();
	}, []);

	const getServiceList = async () => {
		await axios
			.get(import.meta.env.VITE_REACT_APP_API_URL + "/Service/GetAll")
			.then((res) => {
				setServiceList(res.data.$values);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	//search
	const [searchQuery, setSearchQuery] = useState("");


	return (
		<Container maxWidth="lg" sx={{ paddingTop: 5, paddingBottom: 5 }}>
			<Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
			<Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: 5 }}>
				<Stack
					spacing={1}
					direction={"row"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<Home fontSize="inherit" />
					<Typography
						variant="body1"
						component={Link}
						to="/"
						sx={{
							textDecoration: "none",
							"&:hover": {
								color: "#FF7F22",
							},
						}}          >
						Home
					</Typography>
				</Stack>
				<Typography
					variant="body1"
					sx={{ textDecoration: "none" }}
				>
					Service
				</Typography>
			</Breadcrumbs>
			
			<Search
				sx={{
					display: "flex",
					alignItems: "center",
				}}

			>
				<SearchIconWrapper>
					<SearchIcon />
				</SearchIconWrapper>
				<StyledInputBase
					placeholder="search services by name"
					inputProps={{ "aria-label": "search" }}
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}

				/>
			</Search>
			</Stack>
			<PaginationCard serviceList={serviceList} searchQuery={searchQuery} />

			{/* <PaginationCard serviceList={serviceList} /> */}
		</Container>
	);
};

export default Service;
