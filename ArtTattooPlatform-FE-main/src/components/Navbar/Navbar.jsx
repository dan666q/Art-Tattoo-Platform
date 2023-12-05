import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Backdrop,
  Button,
  Fade,
  Modal,
  Slide,
  Tab,
  Tabs,
} from "@mui/material";
import Logo from "../../assets/images/Logo.png";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import Register from "../Modal/Register";
import Login from "../Modal/Login";
import { useUserInfo } from "../../stores/useUserInfo";
import { ShoppingCart } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useOpenDashboard } from "../../stores/useOpenDashboard";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
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
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20rem",
    },
  },
}));

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
      color: "#fff",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

export default function Navbar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorNavEl, setAnchorNavEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [showSearchBar, setShowSearchBar] = React.useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [open, setOpen] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(true);
  const [data, setData] = useState({});
  const user = useUserInfo((state) => state.user);
  const role = user.role;
  const isOpenDashboard = useOpenDashboard((state) => state.isOpen);

  const [isMenuOpen, setIsMenuOpen] = useState(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNavMenuOpen = Boolean(anchorNavEl);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      sm: 530,
      xs: 350,
    },
    bgcolor: "background.paper",
    boxShadow: 24,
    paddingTop: 6,
    paddingLeft: {
      sm: 10,
      xs: 4,
    },
    paddingRight: {
      sm: 10,
      xs: 4,
    },
    paddingBottom: 6,
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
    setIsMenuOpen(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleNavMenuOpen = (event) => {
    setAnchorNavEl(event.currentTarget);
  };

  const handleNavMenuClose = (event) => {
    setAnchorNavEl(null);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    googleLogout();
    navigate("/");
    handleMenuClose();
  };

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const token = localStorage.getItem("token");
    await axios
      .get(
        `${import.meta.env.VITE_REACT_APP_API_URL}/User/GetUserInfoByUserID/${
          user.userID
        }`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )

      .then(function (response) {
        setData(response.data);
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const menuId = "primary-search-account-menu";
  const navMenus = [
    { name: "Home", path: "/" },
    { name: "Service", path: "/services" },
    { name: "Studio", path: "/StudioPage" },
  ];
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/profile");
        }}
      >
        Profile
      </MenuItem>
      {role == "MN" || role == "AD" ? (
        <div>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/BookingManagement");
            }}
          >
            Booking Management
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/ServiceManagement");
            }}
          >
            Service Management
          </MenuItem>
        </div>
      ) : null}
      {role == "AT" || role == "AD" ? (
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate("/ArtistSchedule");
          }}
        >
          Artist Schedule
        </MenuItem>
      ) : null}
      {role == "MB" || role == "AD" ? (
        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate("/MyBooking");
          }}
        >
          My Booking
        </MenuItem>
      ) : null}
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleLogout();
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  const renderNavMenu = (
    <Menu
      anchorEl={anchorNavEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isNavMenuOpen}
      onClose={handleNavMenuClose}
    >
      {navMenus.map((navMenu, index) => {
        return (
          <MenuItem
            key={index}
            onClick={() => {
              navigate(navMenu.path);
              handleNavMenuClose();
            }}
          >
            {navMenu.name}
          </MenuItem>
        );
      })}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton
          size="large"
          aria-label="show new notifications"
          color="inherit"
        >
          <Badge badgeContent={1} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Typography>Notifications</Typography>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Typography>Profile</Typography>
      </MenuItem>
    </Menu>
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: isOpenDashboard ? "none" : "flex",
      }}
    >
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#000",
          paddingLeft: {
            xs: 2,
            md: 5,
          },
          paddingRight: {
            xs: 0,
            md: 5,
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: {
              md: token ? "space-between" : "",
            },
            alignItems: "center",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            sx={{
              mr: 2,
              display: {
                xs: showSearchBar ? "none" : "flex",
                sm: "flex",
                md: "none",
              },
            }}
            onClick={handleNavMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: {
                xs: showSearchBar ? "none" : "flex",
                md: "flex",
              },
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <Avatar src={Logo} />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { sm: "block" } }}
            >
              VNINK
            </Typography>
          </Box>
          <Box
            sx={{
              position: "absolute",
              left: {
                sm: token ? "48%" : "23%",
                xs: "43%",
              },
              transform: "translateX(-50%)",
              width: {
                md: "25rem",
                xs: "17rem",
                sm: "25rem",
              },
              display: "flex",
            }}
          >
            <Slide
              in={showSearchBar}
              direction="down"
              mountOnEnter
              unmountOnExit
            >
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
                  placeholder="Anime design tattoo..."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Slide>
            <IconButton
              size="medium"
              sx={{
                display: showSearchBar ? "flex" : "none",
              }}
              onClick={() => {
                setShowSearchBar(false);
              }}
            >
              <Close />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: {
                xs: "none",
                md: showSearchBar ? "none" : "flex",
                borderBottom: 1,
                borderColor: "divider",
                marginLeft: "5rem",
              },
            }}
          >
            <Tabs value={value} onChange={handleChange}>
              <StyledTab
                label="Home"
                onClick={() => {
                  navigate("/");
                }}
              />
              <StyledTab
                label="Service"
                onClick={() => {
                  navigate("/services");
                }}
              />
              <StyledTab
                label="Studio"
                onClick={() => {
                  navigate("/StudioPage");
                }}
              />
            </Tabs>
          </Box>
          <Box
            sx={{
              flexGrow: {
                xs: 1,
              },
              display: {
                md: token && "none",
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* <IconButton
							size="large"
							color="inherit"
							onClick={() => {
								setShowSearchBar(!showSearchBar);
							}}
							sx={{
								display: {
									xs: showSearchBar ? "none" : "flex",
									md: "flex",
								},
							}}
						>
							<SearchIcon />
						</IconButton> */}

            {token ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  display: {
                    xs: "none",
                    sm: "flex",
                  },
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    marginLeft: 1.5,
                    cursor: "pointer",
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                  onClick={() => navigate("/profile")}
                >
                  Hi, {data && data.userName}
                </Typography>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    src={data && data.image}
                    alt={data && data.userName}
                  />
                  {/* <AccountCircle /> */}
                </IconButton>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    ":hover": {
                      textDecoration: "underline",
                    },
                    cursor: "pointer",
                    paddingLeft: 2,
                    paddingRight: 4,
                    paddingTop: 1,
                    paddingBottom: 1,
                    display: {
                      sm: "flex",
                      xs: "none",
                    },
                  }}
                  onClick={() => {
                    setIsLogin(true);
                    handleOpen();
                  }}
                >
                  Login
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setIsLogin(false);
                    handleOpen();
                  }}
                  sx={{
                    display: {
                      xs: showSearchBar ? "none" : "flex",
                      sm: "flex",
                    },
                  }}
                >
                  Signup
                </Button>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: {
                xs: token ? "flex" : "none",
                sm: "none",
              },
            }}
          >
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNavMenu}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {isLogin ? (
              <Login setIsLogin={setIsLogin} />
            ) : (
              <Register setIsLogin={setIsLogin} />
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
