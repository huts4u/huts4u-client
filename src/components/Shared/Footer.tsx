import {
  Email,
  Facebook,
  Instagram,
  LocationOn,
  Phone,
  Send,
  Twitter,
} from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import color from "../color";
import CustomButton from "../CustomButton";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const renderColor = () => {
    switch (location.pathname) {
      case "/search":
        return color.thirdColor;
      default:
        return "white";
    }
  };

  return (
    <Box
      sx={{
        background: renderColor,
        pt: {xs:20, md:30},
      }}
    >
      <Box
        sx={{
          backgroundColor: color.firstColor,
          color: "white",
          position: "relative",
          pt: 6,
        }}
      >
        <Box
          justifyContent="center"
          sx={{
            position: "absolute",
            top:  {xs:-130, md:-180},
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            height: {xs:"150px", md:"200px"},
            width: {xs:"80%", md:'60%'},
          }}
        >
          <Box
            sx={{
              background: "url('/assets/bg.jpg')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              width: "50%",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                backgroundColor: color.thirdColor,
                opacity: 0.1,
              }}
            ></Box>

            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "25%",
                transform: "translate(-50%,-50%)",
                height: {xs:"80px", md:'100px'},
                width:{xs:"80px", md:'100px'},
                borderRadius: "50%",
                backgroundColor: color.thirdColor,
                color: color.firstColor,
                boxShadow: "0px 0px 50px rgba(92, 92, 92, 0.21)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "CustomFontB",
                  fontSize: {xs:'18px', md:"24px"},

                }}
              >
                50%
              </Typography>
              <Typography
                sx={{
                  fontFamily: "CustomFontB",
                  fontSize: {xs:'14px', md:"16px"},
                  mt: -1,
                }}
              >
                Off
              </Typography>
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "25%",
                transform: "translate(-50%,-50%)",
                height: {xs:"100px", md:'120px'},
                width: {xs:"100px", md:'120px'},
                borderRadius: "50%",
                border: "solid 2px",
                borderColor: color.thirdColor,
              }}
            ></Box>
          </Box>

          <Box
            sx={{
              backgroundColor: color.thirdColor,
              width: "50%",
              fontFamily: "CustomFontB",
              fontSize: {xs:'16px', md:"24px"},
              color: color.firstColor,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            Check our <br /> Exclusive Deals
            <CustomButton
              customStyles={{ marginTop: "16px", fontSize: "12px" }}
              // onClick={handleSearch}
              variant="contained"
            >
              Book Now
            </CustomButton>
          </Box>
        </Box>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          px={2}
          sx={{ fontFamily: "CustomFontM",
            background: "url('/assets/footer.webp')",
            backgroundSize: {xs:'70%', md:"30%"},
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom left",
           }}
        >
          {/* About Section */}
          <Grid
            item
            xs={12}
            sm={4.5}
            sx={{
              borderRight: "solid 1px",
              px: 4,
              py: 4,
              pb:{xs:3,md:4},
              borderColor: {xs:'transparent', md:color.thirdColor},
              pt: {xs:'30px !important', md:"50px !important"},

            }}
          >
            <Typography mb={2} variant="h6" fontWeight="bold">
              About
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Cras
              Consequat Orci Sit Amet Ultricies Euismod. Sed Non Aliquam Quam.
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Email Address"
              fullWidth
              size="small"
              sx={{ mt: 2, backgroundColor: "#ddd", borderRadius: 1 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton sx={{ color: "#5c3b78" }}>
                      <Send />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
              <IconButton
                sx={{
                  color: "white",
                  backgroundColor: "#5c3b78",
                  "&:hover": { backgroundColor: "#4a2f63" },
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                sx={{
                  color: "white",
                  backgroundColor: "#5c3b78",
                  "&:hover": { backgroundColor: "#4a2f63" },
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                sx={{
                  color: "white",
                  backgroundColor: "#5c3b78",
                  "&:hover": { backgroundColor: "#4a2f63" },
                }}
              >
                <Instagram />
              </IconButton>
            </Box>
          </Grid>

          {/* Links Section */}
          <Grid
        sx={{
          pt: {xs:'0px !important', md:"50px !important"},
          borderRight: "solid 1px",
          borderColor: {xs:'transparent', md:color.thirdColor},
          px: 2,
        }}
            item
            xs={12}
            sm={3}
          >
            <Typography mb={2} variant="h6" fontWeight="bold">
              Links
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", mt: 1, gap: 2 }}
            >
              <Link href="#" underline="hover" color="inherit">
                Hotels
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Privacy Policy
              </Link>
              <Link href="#" underline="hover" color="inherit">
                About Us
              </Link>
              <Link href="#" underline="hover" color="inherit">
                Contact Us
              </Link>
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid
            item
            xs={12}
            sm={4.5}
            sx={{
              pt: {xs:'30px !important', md:"50px !important"},
              mb:{xs:4,md:0}
            }}
          >
            <Typography gutterBottom variant="h6" fontWeight="bold">
              Contact
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <LocationOn sx={{ mr: 1 }} />
                <Typography variant="body2">
                  28 Street, New York City, USA
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Phone sx={{ mr: 1 }} />
                <Typography
                  variant="body2"
                  component={Link}
                  href="tel:(303) 555-0105"
                  underline="hover"
                  color="inherit"
                >
                  (303) 555-0105
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Email sx={{ mr: 1 }} />
                <Typography
                  variant="body2"
                  component={Link}
                  href="mailto:MichaelL.Mitc@example.com"
                  underline="hover"
                  color="inherit"
                >
                  MichaelL.Mitc@example.com
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <p
          style={{
            width: "100%",
            background: color.thirdColor,
            textAlign: "center",
            color: color.firstColor,
            margin: 0,
            fontFamily: "CustomFontB",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          &copy; 2025 HUTS4U. All Rights Reserved.
        </p>
      </Box>
    </Box>
  );
};

export default Footer;
