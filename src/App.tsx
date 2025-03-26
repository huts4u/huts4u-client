import { ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Shared/Footer";
import Header from "./components/Shared/Header";
import HomePage from "./pages/HomePage";
import HotelDetails from "./pages/HotelDetails";
import SearchResults from "./pages/SearchResults";
import "./styles/global.css";
import theme from "./theme";
import AccountPage from "./pages/Account/AccountPage";
import BookingSummary from "./pages/BookingSummary";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./pages/ContactUs";
import PropertyForm from "./pages/Hotel/PropertyForm";
import Login from "./pages/Account/Login";
import Signup from "./pages/Account/Signup";
import HotelLayout from "./components/Shared/HotelLayout";
import Dashboard from "./pages/Hotel/Dashboard";
import MyHotels from "./pages/Hotel/MyHotels";
import MyHotelDetails from "./pages/Hotel/MyHotelDetails";
import ApplicationPreview from "./pages/Hotel/ApplicationPreview";
import PrivateRoute from "./components/PrivateRoute";
import MyBookings from "./pages/MyBookings";
import AdminHomepage from "./pages/Admin/AdminHomepage";

const App: React.FC = () => {

    const ScrollToTop = () => {
      const { pathname } = useLocation();
    
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [pathname]);
    
      return null;
    };

  return (
    <ThemeProvider theme={theme}>
      <Router>
      <ScrollToTop/>

        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/booking-summary/:id" element={<BookingSummary />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/property-registration" element={<PropertyForm />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/admin-homepage" element={<PrivateRoute component={AdminHomepage} allowedRoles={["Admin"]} />} />

          <Route element={<HotelLayout />}>
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} allowedRoles={["Hotel"]} />} />
            <Route path="/my-hotels" element={<PrivateRoute component={MyHotels} allowedRoles={["Hotel"]} />} />
            <Route path="/hotel-details/:id" element={<PrivateRoute component={MyHotelDetails} allowedRoles={["Hotel"]} />} />
            <Route path="/hotel-applications" element={<PrivateRoute component={MyHotels} allowedRoles={["Hotel"]} />} />
            <Route path="/hotel-application/:id" element={<PrivateRoute component={ApplicationPreview} allowedRoles={["Hotel"]} />} />




          </Route>
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
