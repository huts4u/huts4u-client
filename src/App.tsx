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

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/booking-summary" element={<BookingSummary />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;
