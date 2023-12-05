import * as React from "react";

import {
  Breadcrumbs,
  Button,
  Container,
  IconButton,
  Stack,
  TableContainer,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Book, Delete, Home } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useUserInfo } from "../stores/useUserInfo";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function BookingHistory() {
  const user = useUserInfo((state) => state.user);
  // console.log(user);
  const navigate = useNavigate();
  const [bookingList, setBookingList] = useState([]);
  useEffect(() => {
    if (user.role != "MB" && user.role != "AD") navigate("/access-denied");
    getBookingList();
  }, []);
  const getBookingList = async () => {
    await axios
      .get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/Booking/GetAllByUserID/${
          user.userID
        }`
      )
      .then((res) => {
        setBookingList(res.data.$values);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBooking = async (id) => {
    console.log(id);
    const token = localStorage.getItem("token");
    if (
      window.confirm(
        `Are you sure that you want to delete a booking with ID: ${id}`
      )
    ) {
      await axios
        .delete(
          `${
            import.meta.env.VITE_REACT_APP_API_URL
          }/Booking/DeleteBooking/${id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          getBookingList();
          toast.success("Deleted booking history successfully");
        })
        .catch((err) => {
          toast.error("Deleted booking history failed");
        });
    }
  };

  const renderFormat = (date) => {
    const dated = new Date(date);
    const formatDate = dated.toLocaleString();
    return formatDate;
  };

  const renderStatusBooking = (status) => {
    switch (status) {
      case "Pending":
        return (
          <Typography variant="text" color="lightblue">
            PENDING
          </Typography>
        );
      case "Canceled":
        return (
          <Typography variant="text" color="red">
            CANCELED
          </Typography>
        );
      case "Confirmed":
        return (
          <Typography variant="text" color="lightgreen">
            CONFIRMED
          </Typography>
        );
      case "Complete":
        return (
          <Typography variant="text" color="lightgreen">
            COMPLETED
          </Typography>
        );
    }
  };

  return (
    <Container className="mt-5 mb-5" sx={{ paddingBottom: 50 }}>
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
            }}
          >
            Home
          </Typography>
        </Stack>
        <Typography variant="body1" sx={{ textDecoration: "none" }}>
          My Booking
        </Typography>
      </Breadcrumbs>
      <Typography variant="h5" className="mb-3">
        My Booking
      </Typography>
      {bookingList === undefined ? (
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Book fontSize="large" />
          <h2>You have no booking !!!</h2>
        </Stack>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Service</TableCell>
                <TableCell align="left">Studio</TableCell>
                <TableCell align="left">Address</TableCell>
                <TableCell align="left">Price ($)</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookingList.map((booking, index) => (
                <TableRow
                  key={booking.bookingId}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {booking.serviceName}
                  </TableCell>
                  <TableCell align="left">{booking.studioName}</TableCell>
                  <TableCell align="left">{booking.address}</TableCell>
                  <TableCell align="left">{booking.total}</TableCell>
                  <TableCell align="left">
                    {renderFormat(booking.bookingDate)}
                  </TableCell>
                  <TableCell align="left">
                    {renderStatusBooking(booking.status)}
                  </TableCell>
                  <TableCell align="left">
                    {booking.status === "Confirmed" ? (
                      <></>
                    ) : (
                      <IconButton
                        onClick={() => deleteBooking(booking.bookingId)}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
