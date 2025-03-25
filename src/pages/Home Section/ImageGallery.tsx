import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

const images = [
  { src: "/assets/khandagiri.jpg", name: "khandagiri" },
  { src: "/assets/puri.jpg", name: "puri" },
  { src: "/assets/dhauli.jpg", name: "dhauli" },
  { src: "/assets/konark.jpg", name: "konark" },
  { src: "/assets/chilika.jpg", name: "chilika" },
];

const ImageGallery = () => {

  const locationsMap: Record<string, string> = {
    khandagiri: "Khandagiri, Khordha, Odisha, 751015, India",
    puri: "Puri, Puri (M), Puri, Odisha, 752001, India",
    dhauli: "Dhauli, Uttara P.S, Khordha, Odisha, 752104, India",
    konark: "Konark, Puri, Odisha, 752111, India",
    chilika: "Chilika Bypass, Belapada, Balugaon, Khordha, Odisha, 752030, India",
  };
  
  const handleClick = (name: string) => {
    const location = locationsMap[name] || "Unknown Location";
  
    const searchData = {
      bookingType: "hourly",
      location,
      time: dayjs().format("HH:mm") ,
      checkinDate: dayjs(),
      checkOutDate: dayjs(),
      rooms: 1,
      adults: 2,
      children: 0,
    };
    const queryParams = new URLSearchParams();
  
    Object.entries(searchData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });
  
    window.location.href = `/search?${queryParams.toString()}`;
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
