import { ThemeProvider } from "@mui/material";
import React, { Suspense, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Shared/Footer";
import Header from "./components/Shared/Header";
import "./styles/global.css";
import theme from "./theme";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from 'react-toastify';
import { Box, CircularProgress } from "@mui/material";
import color from "./components/color";

// Lazy load all pages
const HomePage = React.lazy(() => import("./pages/HomePage"));
const HotelDetails = React.lazy(() => import("./pages/HotelDetails"));
const SearchResults = React.lazy(() => import("./pages/SearchResults"));
const AccountPage = React.lazy(() => import("./pages/Account/AccountPage"));
const BookingSummary = React.lazy(() => import("./pages/BookingSummary"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const PropertyForm = React.lazy(() => import("./pages/Hotel/PropertyForm"));
const Login = React.lazy(() => import("./pages/Account/Login"));
const Signup = React.lazy(() => import("./pages/Account/Signup"));
const HotelLayout = React.lazy(() => import("./components/Shared/HotelLayout"));
const Dashboard = React.lazy(() => import("./pages/Hotel/Dashboard"));
const MyHotels = React.lazy(() => import("./pages/Hotel/MyHotels"));
const MyHotelDetails = React.lazy(() => import("./pages/Hotel/MyHotelDetails"));
const ApplicationPreview = React.lazy(() => import("./pages/Hotel/ApplicationPreview"));
const MyBookings = React.lazy(() => import("./pages/MyBookings"));
const AdminHomepage = React.lazy(() => import("./pages/Admin/AdminHomepage"));
const AdminDashboard = React.lazy(() => import("./pages/Admin/AdminDashboard"));
const Messages = React.lazy(() => import("./pages/Admin/Messages"));

// Custom loader component with your logo
const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: 2
      }}
    >
      <img
        src="https://s3.ap-south-1.amazonaws.com/huts4u.shop/huts4ufinallogo-removebg-preview.png"
        alt="Huts4U Logo"
        style={{ width: '150px', height: 'auto' }}
      />
      {/* <CircularProgress sx={{ color: color.firstColor }} /> */}
    </Box>
  );
};

const App: React.FC = () => {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ScrollToTop />
        <Header />
        <Suspense fallback={<Loader />}>
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
            <Route path="/admin-dashboard" element={<PrivateRoute component={AdminDashboard} allowedRoles={["Admin"]} />} />
            <Route path="/messages" element={<PrivateRoute component={Messages} allowedRoles={["Admin"]} />} />

            <Route element={<HotelLayout />}>
              <Route path="/dashboard" element={<PrivateRoute component={Dashboard} allowedRoles={["Hotel"]} />} />
              <Route path="/my-hotels" element={<PrivateRoute component={MyHotels} allowedRoles={["Hotel", "Admin"]} />} />
              <Route path="/hotel-details/:id" element={<PrivateRoute component={MyHotelDetails} allowedRoles={["Hotel", "Admin"]} />} />
              <Route path="/hotel-applications" element={<PrivateRoute component={MyHotels} allowedRoles={["Hotel", "Admin"]} />} />
              <Route path="/hotel-application/:id" element={<PrivateRoute component={ApplicationPreview} allowedRoles={["Hotel", "Admin"]} />} />
            </Route>
          </Routes>
        </Suspense>
        <Footer />
      </Router>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default App;