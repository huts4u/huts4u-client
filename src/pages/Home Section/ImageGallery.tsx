import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const images = [
  { src: "https://s3.ap-south-1.amazonaws.com/huts4u.shop/khandagiri_optimized.jpg", name: "khandagiri" },
  { src: "https://s3.ap-south-1.amazonaws.com/huts4u.shop/puri.jpg", name: "puri" },
  { src: "https://s3.ap-south-1.amazonaws.com/huts4u.shop/dhauli.jpg", name: "dhauli" },
  { src: "https://s3.ap-south-1.amazonaws.com/huts4u.shop/konark_hero_optimized.jpg", name: "konark" },
  { src: "https://s3.ap-south-1.amazonaws.com/huts4u.shop/chilika.jpg", name: "chilika" },
];

const ImageGallery = () => {
  const navigate = useNavigate();

  const handleClick = (name: string) => {
    navigate(`/search/${name}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: images.length > 4 ? "auto" : "hidden",
        maxWidth: "100%",
        p: 2,
        px: { xs: 2, md: 4 },
        mt: { xs: 2, md: 4 },
        gap: 2,
        whiteSpace: "nowrap",
        justifyContent: "space-around",
      }}
    >
      {images.map((image, index) => (
        <Box
          key={index}
          sx={{
            cursor: "pointer",
            minWidth: { xs: 100, md: images.length > 4 ? 200 : "25%" },
            width: "100px",
            textAlign: "center",
            height: { xs: 100, md: 200 },
            position: "relative",
            overflow: "hidden",
            borderRadius: "12px",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
            },
          }}
          onClick={() => handleClick(image.name)}
        >
          <img
            src={image.src}
            alt={image.name}
            style={{
              width: "100%",
              objectFit: "cover",
              objectPosition: "top",
              height: "100%",
            }}
          />
          <Typography
            sx={{
              position: "absolute",
              bottom: 10,
              left: 10,
              color: "white",
              fontSize: { xs: "12px", md: "18px" },
              zIndex: 2,
              fontFamily: "CustomFontB",
            }}
          >
            {image.name.charAt(0).toUpperCase() + image.name.slice(1)}
          </Typography>

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
        </Box>
      ))}
    </Box>
  );
};

export default ImageGallery;