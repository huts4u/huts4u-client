import { Box, Container } from "@mui/material";
import HeroSection from "./Home Section/HeroSection";
import SectionHeader from "../components/SectionHeader";
import FAQSection from "./Home Section/FAQSection";
import ImageGridLayout from "./Home Section/FeaturesGridLayout";
import HotelCardCarousel from "./Home Section/HotelCardCarousel";
import ImageGallery from "./Home Section/ImageGallery";
import TestimonialsCarousel from "./Home Section/TestimonialsCarousel";

const HomePage = () => {
  const hotelData = [
    {
      id: 1,
      image: "https://s3.ap-south-1.amazonaws.com/huts4u.shop/room-image+1.jpg",
      title: "Deluxe Room",
      price: "₹3500.00 / night",
      rating: 4.5,
    },
    {
      id: 2,
      image: "https://s3.ap-south-1.amazonaws.com/huts4u.shop/room-image+2.jpg",
      title: "Luxury Suite",
      price: "₹5000.00 / night",
      rating: 4.8,
    },
    {
      id: 3,
      image: "https://s3.ap-south-1.amazonaws.com/huts4u.shop/room-image+3.jpg",
      title: "Standard Room",
      price: "₹2200.00 / night",
      rating: 4.2,
    },
  ];

  return (
    <Box>
      {/* Hero Section - Not Lazy Loaded for Faster Initial Render */}
      <HeroSection />

      <Container sx={{ maxWidth: "1500px !important", overflow: "hidden" }}>
        <ImageGallery />

        <SectionHeader
          primaryText={"Discover Top Rooms"}
          subText={"Raising Comfort To The Highest Level"}
        />
        <HotelCardCarousel hotels={hotelData} />

        <ImageGridLayout />

        <SectionHeader
          primaryText={"What They Are Saying"}
          subText={"Our Genuine Customer Reviews"}
        />
        <TestimonialsCarousel />

        <SectionHeader
          primaryText={"Frequently Asked Questions"}
          subText={"Answers to Your Most Common Questions"}
        />
        <FAQSection />
      </Container>
    </Box>
  );
};

export default HomePage;
