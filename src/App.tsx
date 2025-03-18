import { ThemeProvider } from "@mui/material";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/booking-summary/:phone" element={<BookingSummary />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/property-registration" element={<PropertyForm />} />


          <Route element={<HotelLayout />}>
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
            <Route path="/my-hotels" element={<PrivateRoute component={MyHotels} />} />
            <Route path="/hotel-details/:id" element={<PrivateRoute component={MyHotelDetails} />} />
            <Route path="/hotel-applications" element={<PrivateRoute component={MyHotels} />} />
            <Route path="/hotel-application/:id" element={<PrivateRoute component={ApplicationPreview} />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
