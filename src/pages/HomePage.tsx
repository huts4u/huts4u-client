import { Box, Container, CircularProgress } from "@mui/material";
import { Suspense, lazy } from "react";
import HeroSection from "./Home Section/HeroSection";

// Lazy load components
const SectionHeader = lazy(() => import("../components/SectionHeader"));
const FAQSection = lazy(() => import("./Home Section/FAQSection"));
const ImageGridLayout = lazy(() => import("./Home Section/FeaturesGridLayout"));
const HotelCardCarousel = lazy(() => import("./Home Section/HotelCardCarousel"));
const ImageGallery = lazy(() => import("./Home Section/ImageGallery"));
const TestimonialsCarousel = lazy(() => import("./Home Section/TestimonialsCarousel"));

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
        <Suspense fallback={<CircularProgress sx={{ display: "block", margin: "auto" }} />}>
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
        </Suspense>
      </Container>
    </Box>
  );
};

export default HomePage;
