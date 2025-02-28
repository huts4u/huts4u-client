import { Box, Typography } from "@mui/material";
import React from "react";
import color from "../../components/color";
import SearchSection from "./SearchSection";

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        maxHeight: { xs: "100vh", md: "700px" },
        background: "url('/assets/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          background: color.thirdColor,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          opacity: {xs:0,md:0.84},
        }}
      ></Box>

      <div
        style={{
          flex: 1,
          minWidth: "50vw",
          color: color.firstColor,
          zIndex: 2,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: {xs:'10%', md:"14%"},
            left: "10%",
          }}
        >
          <Typography
            sx={{
              background: color.firstColor,
              color: color.thirdColor,
              p: 1,
              py: 0.5,
              width: "fit-content",
              mb: 2,
              fontSize: { xs: "16px", md: "24px" },
              borderRadius: "4px",
            }}
          >
            The proud of Odisha
          </Typography>
          <Typography
            sx={{
              lineHeight: 1.2,
              fontSize: { xs: "32px", md: "48px" },
              fontFamily: "CustomFontB",
            }}
          >
            Your Perfect Stay <br /> Awaits!
          </Typography>
        </Box>
      </div>

      <Box
        sx={{
          display: { xs: "none", md: "block" },
          flex: 1,
          height: "100%",
          background: "url('/assets/konark hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 2,
          position: "relative",
          backgroundRepeat: "no-repeat",
        }}
      ></Box>

      <Box
        sx={{
          width: {xs:'90%', md:"80%"},
          position: "absolute",
          bottom: "12%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
        }}
      >
        <SearchSection></SearchSection>
      </Box>
    </Box>
  );
};

export default HeroSection;
