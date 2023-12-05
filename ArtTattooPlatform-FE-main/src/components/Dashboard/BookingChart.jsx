import React, { useState } from "react";
import { Refresh } from "@mui/icons-material";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Container,
	SvgIcon,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import Chart from "react-apexcharts";
import { toast } from "react-toastify";

function BookingChart() {
	const theme = useTheme();
	const [state, setState] = useState({
		options: {
			chart: {
				id: "basic-bar",
				background: "transparent",
				stacked: false,
				toolbar: {
					show: false,
				},
			},
			colors: [
				theme.palette.primary.main,
				alpha(theme.palette.primary.main, 0.25),
			],
			dataLabels: {
				enabled: false,
			},
			fill: {
				opacity: 1,
				type: "solid",
			},
			grid: {
				borderColor: theme.palette.divider,
				strokeDashArray: 2,
				xaxis: {
					lines: {
						show: false,
					},
				},
				yaxis: {
					lines: {
						show: true,
					},
				},
			},
			legend: {
				show: false,
			},
			plotOptions: {
				bar: {
					columnWidth: "40px",
				},
			},
			theme: {
				mode: theme.palette.mode,
			},
			xaxis: {
				axisBorder: {
					color: theme.palette.divider,
					show: true,
				},
				axisTicks: {
					color: theme.palette.divider,
					show: true,
				},
				categories: [
					"13/11",
					"14/11",
					"15/11",
					"16/11",
					"17/11",
					"18/11",
					"19/11",
				],
				labels: {
					offsetY: 5,
					style: {
						colors: theme.palette.text.secondary,
					},
				},
			},
		},
		series: [
			{
				name: "bookingTotal",
				data: [30, 40, 45, 50, 49, 60, 70],
			},
			{
				name: "bookingCompleted",
				data: [10, 20, 25, 20, 29, 40, 30],
			},
		],
	});
	return (
		<Card
			sx={{
				height: "33rem",
				width: "43rem",
			}}
		>
			<CardHeader
				action={
					<Button
						color="inherit"
						size="small"
						startIcon={
							<SvgIcon fontSize="small">
								<Refresh />
							</SvgIcon>
						}
						onClick={() => {
							toast.success("Sync successfully!");
						}}
					>
						Sync
					</Button>
				}
				title="Bookings"
			/>
			<CardContent>
				<Chart
					options={state.options}
					series={state.series}
					type="bar"
					width={650}
				/>
			</CardContent>
		</Card>
	);
}

export default BookingChart;
