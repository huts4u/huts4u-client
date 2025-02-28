import { Avatar, Box, Rating, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import color from "../../components/color";

const testimonials = [
  {
    id: 1,
    name: "Miley Cyrus",
    location: "Bhubaneswar",
    rating: 4.47,
    review:
      "Duis rhoncus orci utedn metus rhoncus, non is dictum purus bibendum. Suspendisse id orci it amet justo interdum hendrerit sagittis.",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Miley Cyrus",
    location: "Bhubaneswar",
    rating: 4.47,
    review:
      "Duis rhoncus orci utedn metus rhoncus, non is dictum purus bibendum. Suspendisse id orci it amet justo interdum hendrerit sagittis.",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Miley Cyrus",
    location: "Bhubaneswar",
    rating: 4.47,
    review:
      "Duis rhoncus orci utedn metus rhoncus, non is dictum purus bibendum. Suspendisse id orci it amet justo interdum hendrerit sagittis.",
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "Miley Cyrus",
    location: "Bhubaneswar",
    rating: 4.47,
    review:
      "Duis rhoncus orci utedn metus rhoncus, non is dictum purus bibendum. Suspendisse id orci it amet justo interdum hendrerit sagittis.",
    avatar: "https://via.placeholder.com/50",
  },
];

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const TestimonialCard: React.FC<{ testimonial: any }> = ({ testimonial }) => {
  return (
    <Box
      sx={{
        backgroundColor: color.thirdColor,
        padding: "20px",
        borderRadius: "10px",
        textAlign: "left",
        position: "relative",
        maxWidth: "300px",
        margin: "auto",
        borderTop: "solid 4px",
        borderColor: color.secondColor,
        mb: 5,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -7,
          left: -7,
          right: -7,
          height: "10px",
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "14px",
            height: "14px",
            backgroundColor: color.secondColor,
            borderRadius: "50%",
          }}
        />
        <Box
          sx={{
            width: "14px",
            height: "14px",
            backgroundColor: color.secondColor,
            borderRadius: "50%",
          }}
        />
      </Box>

      {/* Rating */}
      <Box display="flex" alignItems="center" mb={3} mt={1}>
        <Rating value={testimonial.rating} precision={0.1} readOnly />
        <Typography
          sx={{
            fontSize: "16px",
            fontFamily: "CustomFontSB",
            color: color.secondColor,
            ml: 1,
          }}
        >
          {testimonial.rating}
        </Typography>
      </Box>

      {/* Review */}
      <Typography
        sx={{
          fontSize: "16px",
          fontFamily: "CustomFontSB",
          color: color.secondColor,
        }}
      >
        {testimonial.review}
      </Typography>

      {/* Profile */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          margin: "auto",
          backgroundColor: color.secondColor,
          padding: "10px 16px",
          pr: 3,
          borderRadius: "30px",
          color: color.thirdColor,
          fontSize: "14px",
          fontWeight: 600,
          position: "relative",
          mt: 4,
          mb: -4,
          width: "fit-content",
        }}
      >
        <Avatar
          src={testimonial.avatar}
          sx={{
            width: 60,
            height: 60,
            margin: "-20px",
            border: "solid 2px",
            borderColor: color.thirdColor,
          }}
        />
        <Box sx={{ ml: 4 }}>
          <Typography sx={{ fontSize: "12px", fontWeight: 600 }}>
            {testimonial.name}
          </Typography>
          <Typography sx={{ fontSize: "10px", opacity: 0.8 }}>
            {testimonial.location}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const TestimonialsCarousel = () => {
  return (
    <Slider {...settings}>
      {testimonials.map((testimonial) => (
        <Box key={testimonial.id} sx={{ py: 2 }}>
          <TestimonialCard testimonial={testimonial} />
        </Box>
      ))}
    </Slider>
  );
};

export default TestimonialsCarousel;
