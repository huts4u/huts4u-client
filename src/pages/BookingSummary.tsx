import { StarRounded } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomButton from "../components/CustomButton";
import RenderRazorpay from "../components/Payments/RanderPayments";
import color from "../components/color";
import { BoxStyle, CustomTextField } from "../components/style";
import { createOrder, getPortfolioDetails, getProfile, sendOTP, Signup, verifyOTP } from "../services/services";
import PhoneInput from "react-phone-input-2";
import { isLoggedIn } from "../services/axiosClient";
import LoginOtpModal from "./Account/LoginOtpModal";

const bookingData = {
  hotelName: "Best Western Ashoka",
  location: "Lakdi ka pool",
  rating: 4.3,
  reviews: 130,
  checkInDate: "27 Feb 25",
  checkInTime: "2:00 PM",
  checkOutDate: "27 Feb 25",
  checkOutTime: "5:00 PM",
  duration: "3 Hours",
  roomInfo: "1 Room, 2 Guests",
  roomPrice: "700.00",
  //   bookingType: "Hourly Booking of 3 Hours",
  roomName: "Superior Double Room",
  guest: {
    name: "",
    email: "",
  },
};
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").optional(),
});

const BookingSummary = () => {
  const location = useLocation();
  // const phoneNumber = location.state?.phoneNumber;

  // const [user, setUser] = useState<any>({});
  // console.log(user);

  // useEffect(() => {
  //   getPortfolioDetails(phoneNumber.slice(2))
  //     .then((res) => {
  //       setUser(res?.data?.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [phoneNumber]);
  const [orderDetails, setOrderDetails] = useState(null);
  // console.log(orderDetails)
  const handlePayment = async () => {
    try {
      const roomPrice = parseFloat(bookingData.roomPrice) || 0;
      const serviceCharges = 200;
      const totalAmount = roomPrice + serviceCharges;

      console.log("Total Amount before payment:", totalAmount);

      if (totalAmount === 0) {
        alert("Booking amount cannot be zero.");
        return;
      }

      const payLoad = {
        amount: totalAmount,
        currency: "INR",
      };

      console.log("Payload sent to createOrder:", payLoad);
      const response = await createOrder(payLoad);

      console.log("Payment Response:", response);

      if (response?.data) {
        // alert("Payment successful!");
        setOrderDetails(response.data);
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Payment failed. Please try again.");
    }
  };


  const navigate = useNavigate();
  const openModal = (phoneNumber: any, name: any, email: any, token: any) => {
    navigate(`${location.pathname}?login=true&phone=${phoneNumber}&name=${name}&email=${email}&token=${token}`, { replace: true, });
  };


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // console.log("Form submitted with values:", values);
      if (isLoggedIn()) {
        handlePayment();
      } else {
        // store the user details in db and if the user is not present in db and then verify the OTP ok dude

        // handle to send the Opt 



        const payLoad = {
          name: values.name,
          email: values.email,
          phone: values.phoneNumber.slice(2)
        }
        console.log(payLoad)
        sendOTP(payLoad).then((res) => {
          console.log(res)
          toast("Otp send Succesfully please verify the OTP");
          openModal(values.phoneNumber.slice(2), values.name, values.email, res?.data?.data);
        }).catch((err) => {
          console.log(err);
        })




      }
    },
  });
  return (
    <Box
      sx={{
        ...BoxStyle,
        background: "#f6f6f6",
        mt: 0,
        py: 4,
        px: { xs: 1, md: 3 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },

        // alignItems:'center',
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <Card
        sx={{
          p: 1,
          background: "white",
          maxWidth: "700px",
          border: "none",
          boxShadow: 0,
          borderRadius: "12px",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: color.firstColor, fontWeight: "bold" }}
          >
            Your Booking Summary
          </Typography>
          {/* <Divider sx={{ mb: 2 }} /> */}

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 0, md: 2 },
              position: "relative",
              mt: 2,
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: { xs: "100%", md: "250px" },
                borderRadius: "12px",
              }}
              image="/assets/room-image 1.jpg"
            />
            <div>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: color.firstColor,
                  mt: { xs: 1.5, md: 1 },
                  display: "-webkit-box",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {bookingData.hotelName}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "CustomFontSB",
                  fontSize: { xs: "12px", md: "14px" },
                  display: "-webkit-box",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {bookingData.location}
              </Typography>

              <Box
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 6,
                  //   display: { xs: "none", md: "flex" },
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color={color.thirdColor}
                  sx={{
                    background: color.background,
                    px: 1,
                    borderRadius: "4px",
                    fontSize: "18px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {bookingData.rating} <StarRounded></StarRounded>
                </Typography>

                <Typography
                  variant="body2"
                  fontWeight={600}
                  color={color.firstColor}
                  lineHeight={1}
                  sx={{
                    fontSize: "10px",
                    background: "white",
                    mt: 0.5,
                    p: 0.5,
                    borderRadius: "4px",
                  }}
                >
                  ({bookingData.reviews} reviews)
                </Typography>
              </Box>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <Typography sx={typoStyle}>
                  <strong>Check-In:</strong> {bookingData.checkInDate},{" "}
                  {bookingData.checkInTime}
                </Typography>
                <Typography sx={typoStyle}>
                  <strong>Check-Out:</strong> {bookingData.checkOutDate},{" "}
                  {bookingData.checkOutTime}
                </Typography>
                <Typography sx={typoStyle}>
                  <strong>Duration: </strong>
                  {bookingData.duration}
                </Typography>
                <Typography sx={typoStyle}>
                  <strong>Room Type:</strong> {bookingData.roomName}
                </Typography>
                <Typography sx={typoStyle}>
                  <strong>Room Info: </strong>
                  {bookingData.roomInfo}
                </Typography>
              </div>
            </div>
          </Box>

          {/* <Typography variant="subtitle1" sx={{ mt: 2 }}>
            {bookingData.bookingType}
          </Typography> */}
          {/* <Divider sx={{ my: 2 }} /> */}

          {/* <Typography
            variant="h6"
            mt={4}
            sx={{ color: color.firstColor, fontWeight: "bold" }}
          >
            Guest Information
          </Typography> */}
          {/* <CustomTextField
            label="Guest Name"
            value={bookingData.guest.name}
            fullWidth
            margin="normal"
          />
          <CustomTextField
            label="Email Address (Optional)"
            value={bookingData.guest.email}
            fullWidth
            margin="normal"
          /> */}
          {/* <CustomTextField
            label="Mobile Number"
            value={bookingData.guest.phone}
            fullWidth
            margin="normal"
          /> */}
          {/* <CustomButton
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Pay Now
          </CustomButton> */}
          <form onSubmit={formik.handleSubmit}>
            <Typography
              variant="h6"
              mt={4}
              sx={{ color: "#1976d2", fontWeight: "bold" }}
            >
              Guest Information
            </Typography>

            {/* Guest Name Field */}
            <CustomTextField
              label="Guest Name"
              name="name"
              fullWidth
              margin="normal"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />

            {/* Phone Number Field */}
            <Box mt={2}>
              <PhoneInput
                country={"in"}
                value={formik.values.phoneNumber}
                onChange={(value) => formik.setFieldValue("phoneNumber", value)}
                onBlur={() => formik.setFieldTouched("phoneNumber", true)}
                inputStyle={{
                  width: "100%",
                  height: "56px", // Same height as CustomTextField
                  borderRadius: "8px", // Match border-radius of MUI input
                  border: formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "1px solid red"
                    : "1px solid #ccc",
                  paddingLeft: "48px", // Adjust for country code
                  fontSize: "16px",
                  boxShadow: "none", // Remove shadow
                  backgroundColor: "#fafafa", // Background color similar to input
                  transition: "border-color 0.2s ease",
                }}
                buttonStyle={{
                  borderRadius: "8px 0 0 8px", // Match left side border-radius
                  backgroundColor: "#f5f5f5",
                  borderRight: "1px solid #ccc",
                }}
                containerStyle={{
                  width: "100%",
                }}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <Typography
                  sx={{
                    color: "red",
                    fontSize: "12px",
                    mt: 0.5,
                    ml: "14px", // Same margin as input error text
                  }}
                >
                  {formik.errors.phoneNumber}
                </Typography>
              )}
            </Box>

            {/* Email Field */}
            <CustomTextField
              label="Email Address (Optional)"
              name="email"
              fullWidth
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />

            {/* Submit Button */}
            {
              isLoggedIn() ? (<>
                <CustomButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  type="submit"
                >
                  Pay Now
                </CustomButton>
              </>) : (<>
                <CustomButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  type="submit"
                >
                  verify Phone & Pay
                </CustomButton>
              </>)
            }

            <LoginOtpModal></LoginOtpModal>

            {/* Render Razorpay */}
            {orderDetails && (
              <RenderRazorpay
                orderDetails={orderDetails}
                amount={bookingData.roomPrice}
              />
            )}
          </form>
        </CardContent>
      </Card>

      <Card
        sx={{
          p: 1,
          background: "white",
          border: "none",
          boxShadow: 0,
          borderRadius: "12px",
          height: "fit-content",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: color.firstColor, fontWeight: "bold" }}
          >
            Your Bil Summary
          </Typography>

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <Typography sx={typoStyle}>
              <strong>Room price: </strong>₹{bookingData.roomPrice}
            </Typography>
            <Typography sx={typoStyle}>
              <strong>Service Charges: </strong>₹200.00
            </Typography>

            <Divider sx={{ my: 2 }}></Divider>

            <Typography
              variant="h6"
              sx={{
                color: color.firstColor,
                fontWeight: "bold",
                lineHeight: 1,
              }}
            >
              Total price: ₹{Number(bookingData.roomPrice) + 200}.00 <br />
              <span style={{ fontSize: "12px", fontWeight: "normal" }}>
                incl. of all taxes
              </span>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BookingSummary;

const typoStyle = {
  borderRadius: "52px",
  boxShadow: "4px 4px 10px rgba(104, 39, 184, 0.17)",
  color: color.firstColor,
  background: "white",
  //   fontWeight: "bold",
  fontSize: { xs: "12px", md: "14px" },
  width: "fit-content",
  p: 1,
  px: 2,
  mb: 1,
};
