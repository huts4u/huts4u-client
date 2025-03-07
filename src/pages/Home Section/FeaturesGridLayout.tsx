import { Box, Grid, styled, Typography } from "@mui/material";
import color from "../../components/color";

const ImageGridLayout = () => {
  return (
    <Box sx={{ height: "600px", mt: 4 }}>
      <Grid container sx={{ width: "100%", height: "100%" }}>
        <Grid item xs={12} md={8}>
          <Grid container sx={{ width: "100%", height: "100%" }}>
            <Grid item xs={6}>
              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                  background: "url('https://s3.ap-south-1.amazonaws.com/huts4u.shop/feature+1.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Box
                  sx={{
                    zindex: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(to top,rgba(0, 0, 0, 0.47), rgba(0, 0, 0, 0))",
                  }}
                ></Box>

                <StyledTypography>
                  <span>Personalized</span>
                  <br /> Experience
                </StyledTypography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                  background: "url('https://s3.ap-south-1.amazonaws.com/huts4u.shop/feature+2.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Box
                  sx={{
                    zindex: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(to top,rgba(0, 0, 0, 0.47), rgba(0, 0, 0, 0))",
                  }}
                ></Box>

                <StyledTypography>
                  <span>Couples</span>
                  <br /> Friendly
                </StyledTypography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  position: "relative",
                  height: "100%",
                  background: "url('https://s3.ap-south-1.amazonaws.com/huts4u.shop/feature+3.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                }}
              >
                <Box
                  sx={{
                    zindex: 1,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(to top,rgba(0, 0, 0, 0.47), rgba(0, 0, 0, 0))",
                  }}
                ></Box>

                <StyledTypography>
                  <span>Budget, premium and luxury</span>
                  <br /> Properties
                </StyledTypography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              position: "relative",
              height: "100%",
              background: "url('https://s3.ap-south-1.amazonaws.com/huts4u.shop/feature+4.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",

            }}
          >
            <StyledTypography style={{ top: 26 }}>
              <span>Fast & Secure Booking</span>
              <br /> Guarantee
            </StyledTypography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageGridLayout;

const StyledTypography = styled(Typography)(({ theme }) => ({
  width: '100%',
  position: "absolute",
  bottom: 26,
  left: "50%",
  transform: "translateX(-50%)",
  color: color.thirdColor,
  textAlign: "center",
  lineHeight: 1.2,

  "& span": {
    fontWeight: 600,
    fontSize: { xs: '20px', md: "22px" },
  },
}));
