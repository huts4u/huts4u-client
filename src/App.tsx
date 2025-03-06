import { ThemeProvider } from "@mui/material";
import React, { Suspense, lazy, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Shared/Footer";
import Header from "./components/Shared/Header";
import "./styles/global.css";
import theme from "./theme";

// Lazy load pages
const HomePage = lazy(() => import("./pages/HomePage"));
const HotelDetails = lazy(() => import("./pages/HotelDetails"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const AccountPage = lazy(() => import("./pages/Account/AccountPage"));
const BookingSummary = lazy(() => import("./pages/BookingSummary"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ContactUs = lazy(() => import("./pages/ContactUs"));

// Loader Component
const Loader = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
    <h2>Loading...</h2>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <Header />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/hotel/:id" element={<HotelDetails />} />
            <Route path="/booking-summary/:phone" element={<BookingSummary />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
