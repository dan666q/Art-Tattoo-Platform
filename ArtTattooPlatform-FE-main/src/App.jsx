import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./lib/Theme";
import Footer from "./components/Footer/Footer";
import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useGoogleOneTapLogin } from "@react-oauth/google";
// import HomePage from "./pages/Home";
// import Service from "./pages/Service";
// import StudioPage from "./pages/StudioPage";
import StudioDetail from "./pages/StudioDetail";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./pages/ProfilePage";
import jwtDecode from "jwt-decode";
import StudioPage from "./pages/StudioPage";
import NotAccess from "./pages/NotAccess";
import NotFound from "./pages/NotFound";
import { useUserInfo } from "./stores/useUserInfo";
import HomePage from "./pages/Home";
import Service from "./pages/Service";
import { useOpenDashboard } from "./stores/useOpenDashboard";

function App() {
  const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
  const Navbar = lazy(() => import("./components/Navbar/Navbar"));
  const BookingHistory = lazy(() => import("./pages/BookingHistory"));
  const ArtistSchedule = lazy(() => import("./pages/ArtistSchedule"));
  const StudioManagement = lazy(() => import("./pages/StudioManagement"));
  const Dashboard = lazy(() => import("./pages/Dashboard"));
  const BookingManagement = lazy(() => import("./pages/BookingManagement"));
  const ServiceManagement = lazy(() => import("./pages/ServiceManagement"));
  const setUserZustand = useUserInfo((state) => state.setUser);

  useEffect(() => {
    decodeToken();
  }, []);

  const decodeToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (token != null) {
        const user = jwtDecode(token);
        setUserZustand({
          userID: user.UserID,
          email: user.Email,
          role: user.role,
          userName: user.UserName,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log();
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log("Login failed!");
    },
  });

  const isOpenDashboard = useOpenDashboard((state) => state.isOpen);

  return (
    <BrowserRouter basename="/">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <p>Loading...</p>
            </Box>
          }
        >
          <Navbar />
          <Routes>
            <Route path="*" exact={true} element={<NotFound />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<Service />} />
            <Route path="/services/:serviceId" element={<ServiceDetail />} />
            <Route path="/StudioPage" element={<StudioPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/MyBooking" element={<BookingHistory />} />
            <Route path="/ArtistSchedule" element={<ArtistSchedule />} />

            <Route
              path="/StudioDetail/:studioId"
              element={<StudioDetail />}
            ></Route>
            <Route path="/access-denied" element={<NotAccess />} />
            <Route
              path="/StudioManagement"
              element={<StudioManagement />}
            ></Route>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<BookingManagement />} />
              <Route
                path="/dashboard/ServiceManagement"
                element={<ServiceManagement />}
              />
              <Route path="/dashboard/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
          <Footer />
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
