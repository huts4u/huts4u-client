import {
  AccountCircle,
  ChevronRightRounded,
  ContactMail,
  CorporateFare,
  Home,
  Hotel,
  Info,
  Logout,
  Menu,
  PersonOutline,
} from "@mui/icons-material";
import {
  AppBar,
  Button,
  CardMedia,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import {
  getUserName,
  getUserRole,
  isLoggedIn,
  logout,
} from "../../services/axiosClient";
import color from "../color";
import CustomButton from "../CustomButton";

const Header: React.FC = () => {
  // useEffect(() => {
  //   if (isLoggedIn()) {
  //     getProfile().then((res) => {
  //       console.log(res);
  //     })
  //   }
  // }, [])

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const userRoll = getUserRole();
  // const navLinks = [
  //   { label: "Home", icon: <Home />, path: "/" },
  //   { label: "Hotels", icon: <Hotel />, path: "/search" },
  //   { label: "Contact", icon: <ContactMail />, path: "/contact-us" },
  //   // { label: "Help", icon: <Help />, path: "/help" },
  //   { label: "About", icon: <Info />, path: "/about-us" },
  //   { label: "Hotelier", icon: <Info />, path: "/dashboard" },
  // ];

  const navLinks =
    userRoll === "Hotel"
      ? [
          { label: "Home", icon: <CorporateFare />, path: "/my-hotels" },
          // { label: "My Bookings", icon: <Hotel />, path: "/my-bookings" },
          { label: "Manage Rooms", icon: <Hotel />, path: "/manage-rooms" },
          { label: "Reviews", icon: <ContactMail />, path: "/reviews" },
        ]
      : userRoll === "Admin"
      ? [
          {
            label: "Admin Dashboard",
            icon: <PersonOutline />,
            path: "/admin-dashboard",
          },
          {
            label: "Manage Users",
            icon: <AccountCircle />,
            path: "/manage-users",
          },
          { label: "Manage Hotels", icon: <Hotel />, path: "/manage-hotels" },
          { label: "Reports", icon: <Info />, path: "/reports" },
        ]
      : [
          { label: "Home", icon: <Home />, path: "/" },
          { label: "Hotels", icon: <Hotel />, path: "/search" },
          { label: "Contact", icon: <ContactMail />, path: "/contact-us" },
          { label: "About", icon: <Info />, path: "/about-us" },
          { label: "Join As a Hotel", icon: <Info />, path: "/dashboard" },
        ];

  const location = useLocation();

  const isHotelDetailPage = matchPath("/hotel/:id", location.pathname);

  return (
    <AppBar
      sx={{
        background: color.background,
        p: 0,
        zIndex: 100,
        position: isHotelDetailPage ? "relative" : "sticky",
        boxShadow: "none",
        top: 0,
      }}
    >
      <Toolbar
        style={{
          padding: 0,
          display: "flex",
          justifyContent: "space-between",
          color: color.thirdColor,
        }}
      >
        <div style={{ width: "fit-content", display: "flex" }}>
          <CardMedia
            component="img"
            sx={{
              height: "64px",
              width: "120px",
            }}
            image="/assets/logo bg.png"
          />
          <CardMedia
            onClick={() => {
              navigate("/");
            }}
            component="img"
            sx={{
              height: "70px",
              width: "100px",
              objectFit: "contain",
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
            }}
            image="/assets/logo.png"
          />

          {!isMobile &&
            navLinks.map((link) => (
              <Button
                id="button"
                key={link.label}
                color="inherit"
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </Button>
            ))}
        </div>

        <div style={{ marginRight: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {isLoggedIn() && getUserRole() === "Hotel" ? (
              <>
                {" "}
                {!isMobile && (
                  <CustomButton
                    onClick={() => {
                      navigate("/property-registration");
                    }}
                    variant="contained"
                    customStyles={{
                      fontSize: "12px",
                      marginRight: "20px",
                    }}
                  >
                    {" "}
                    Join as hotelier
                  </CustomButton>
                )}
              </>
            ) : (
              <></>
            )}
            {isLoggedIn() ? (
              <>
                {" "}
                <IconButton
                  style={{
                    background: color.thirdColor,
                    color: color.firstColor,
                  }}
                  color="inherit"
                  onClick={handleClick}
                >
                  <PersonOutline />
                </IconButton>
              </>
            ) : (
              <>
                {" "}
                <CustomButton
                  onClick={() => {
                    navigate("/login");
                  }}
                  variant="contained"
                  customStyles={{
                    fontSize: "12px",
                    marginRight: "20px",
                  }}
                >
                  {" "}
                  Join As a Hotel
                </CustomButton>
              </>
            )}
            {isMobile && (
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <Menu />
              </IconButton>
            )}
          </div>

          {/* Drawer for mobile navigation */}
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <List
              sx={{ width: 250, background: color.thirdColor, height: "100%" }}
            >
              <CardMedia
                onClick={() => {
                  navigate("/");
                }}
                component="img"
                sx={{
                  height: "70px",
                  width: "100px",
                  objectFit: "contain",
                  mb: 1,
                }}
                image="/assets/logo.png"
              />
              {navLinks.map((link) => (
                <ListItem key={link.label} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(link.path);
                      setDrawerOpen(false);
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        mr: 1,
                        p: 0.5,
                        background: color.background,
                        borderRadius: "50%",
                        color: "white",
                        width: "24px",
                        height: "24px",
                        minWidth: "0px",
                      }}
                    >
                      {link.icon}
                    </ListItemIcon>
                    <ListItemText primary={link.label} />

                    <ChevronRightRounded />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            style={{ marginTop: "12px", borderRadius: "12px" }}
          >
            <MenuList
              style={{
                borderRadius: "12px",
                padding: "10px",
                fontSize: "14px",
                background: color.thirdColor,
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.11)",
              }}
            >
              <MenuItem
                sx={{
                  fontSize: "18px",
                  fontWeight: "600",
                  borderBottom: "solid 1px rgba(0, 0, 0, 0.22)",
                  mb: 1,
                  pb: 1,
                }}
              >
                Hi, {getUserName()}
              </MenuItem>
              <MenuItem
                style={{ fontSize: "inherit", borderRadius: "52px" }}
                onClick={() => {
                  navigate("/account");
                  handleClose();
                }}
              >
                {" "}
                <AccountCircle
                  sx={{
                    mr: 1,
                    p: 0.5,
                    background: color.background,
                    borderRadius: "50%",
                    color: "white",
                  }}
                />{" "}
                Your Profile
              </MenuItem>
              <MenuItem
                style={{ fontSize: "inherit", borderRadius: "52px" }}
                onClick={() => {
                  navigate("/my-bookings");
                  handleClose();
                }}
              >
                {" "}
                <CorporateFare
                  sx={{
                    mr: 1,
                    background: color.background,

                    borderRadius: "50%",
                    color: "white",
                    p: 0.5,
                  }}
                />{" "}
                My Bookings
              </MenuItem>
              <MenuItem
                style={{ fontSize: "inherit", borderRadius: "52px" }}
                onClick={() => logout()}
              >
                {" "}
                <Logout
                  sx={{
                    mr: 1,
                    background: color.background,
                    borderRadius: "50%",
                    color: "white",
                    p: 0.5,
                  }}
                ></Logout>{" "}
                Logout
              </MenuItem>
            </MenuList>
          </Popover>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
