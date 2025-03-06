import {
  AccountCircle,
  ChevronRightRounded,
  ContactMail,
  CorporateFare,
  Help,
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
import { useNavigate } from "react-router-dom";
import color from "../color";
import { isLoggedIn, logout } from "../../services/axiosClient";

const Header: React.FC = () => {
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

  const navLinks = [
    { label: "Home", icon: <Home />, path: "/" },
    { label: "Hotels", icon: <Hotel />, path: "/search" },
    { label: "Contact", icon: <ContactMail />, path: "/contact-us" },
    // { label: "Help", icon: <Help />, path: "/help" },
    { label: "About", icon: <Info />, path: "/about-us" },
  ];
  return (
    <AppBar
      position="static"
      sx={{
        background: color.background,
        p: 0,
        zIndex: 100,
        position: "relative",
        boxShadow: "none",
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
            image="/assets/huts4ulogo.png"
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
            {isLoggedIn() ? (<>  <IconButton
              style={{ background: color.thirdColor, color: color.firstColor }}
              color="inherit"
              onClick={handleClick}
            >
              <PersonOutline />
            </IconButton></>) : (<></>)}
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
                  mb: 1
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
                        width: '24px',
                        height: '24px',
                        minWidth: '0px'
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
                Hi, User
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
                onClick={handleClose}
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
                Your Bookings
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
