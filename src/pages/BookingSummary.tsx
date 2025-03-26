import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomButton from "../components/CustomButton";
import RenderRazorpay from "../components/Payments/RanderPayments";
import color from "../components/color";
import { BoxStyle, CustomTextField } from "../components/style";
import { isLoggedIn } from "../services/axiosClient";
import { createOrder, sendOTP } from "../services/services";
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
  const hotel = location.state?.hotelData;
  const room = location.state?.selectedRoom;
  const selectedSlot = location.state?.selectedSlot;
  const queryParams = new URLSearchParams(location.search);

  const bookingType = queryParams.get("bookingType");
  // const bookingHours = queryParams.get("bookingHours");
  const checkinTime = queryParams.get("time");
  const checkinDate = queryParams.get("checkinDate");
  const checkOutDate = queryParams.get("checkOutDate");
  const rooms = queryParams.get("rooms");
  const adults = queryParams.get("adults");
  const children = queryParams.get("children");

  const value = selectedSlot.slot;
  const number = value.match(/\d+/)?.[0];
  const extractedNumber = number ? parseInt(number, 10) : null;

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

  const totalAmount =
    Number(room[selectedSlot.slot]) +
    Number(room?.tax) +
    Number(room?.extraFees);
  const handlePayment = async () => {
    try {
      // console.log("Total Amount before payment:", totalAmount);

      if (totalAmount === 0) {
        alert("Booking amount cannot be zero.");
        return;
      }

      const payLoad = {
        amount: totalAmount,
        currency: "INR",
      };

      // console.log("Payload sent to createOrder:", payLoad);
      const response = await createOrder(payLoad);

      // console.log("Payment Response:", response);

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
    navigate(
      `${location.pathname}?login=true&phone=${phoneNumber}&name=${name}&email=${email}&token=${token}`,
      { replace: true }
    );
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
        const payLoad = {
          name: values.name,
          email: values.email,
          phone: values.phoneNumber.slice(2),
        };
        // console.log(payLoad);
        sendOTP(payLoad)
          .then((res) => {
            console.log(res);
            toast("Otp send Succesfully please verify the OTP");
            openModal(
              values.phoneNumber.slice(2),
              values.name,
              values.email,
              res?.data?.data
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });

  const textContainerRef = useRef<HTMLDivElement>(null);
  const [imageHeight, setImageHeight] = useState("auto");

  useEffect(() => {
    if (textContainerRef.current) {
      setImageHeight(`${textContainerRef.current.clientHeight}px`);
    }
  }, [hotel]);
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
              height: "fit-content",
              alignItems: "stretch",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: { xs: "100%", md: "250px" },
                borderRadius: "12px",
                objectFit: "cover",
                height: imageHeight,
                transition: "height 0.3s ease",
              }}
              image={hotel.propertyImages[0]}
            />
            <div style={{ height: "fit-content" }} ref={textContainerRef}>
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
                {hotel.propertyName}
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
                {hotel.address}
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
                {bookingType === "hourly" ? (
                  <>
                    <Typography sx={typoStyle}>
                      <strong>Check-In:</strong>{" "}
                      {dayjs(checkinDate).format("DD MMM YYYY")},{" "}
                      {checkinTime
                        ? dayjs(checkinTime, "HH:mm").format("hh:mm A")
                        : ""}
                    </Typography>
                    {/* <Typography sx={typoStyle}>
                      <strong>Check-Out:</strong>{" "}
                      {checkinTime
                        ? dayjs(checkinTime, "HH:mm")
                            .add(Number(bookingHours), "hour")
                            .format("hh:mm A")
                        : ""}
                    </Typography> */}
                    <Typography sx={typoStyle}>
                      <strong>Duration: </strong>
                      {extractedNumber} hrs
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography sx={typoStyle}>
                      <strong>Check-In:</strong>{" "}
                      {dayjs(checkinDate).format("DD MMM YYYY")}
                    </Typography>
                    <Typography sx={typoStyle}>
                      <strong>Check-Out:</strong>{" "}
                      {dayjs(checkOutDate).format("DD MMM YYYY")}
                    </Typography>
                  </>
                )}

                <Typography sx={typoStyle}>
                  <strong>Room Type:</strong> {room.roomCategory}
                </Typography>
                <Typography sx={typoStyle}>
                  <strong>Room Info: </strong>
                  {rooms} Room, {adults} Adults, {children} Children
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
              sx={{ color: color.firstColor, fontWeight: "bold" }}
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

            <Box mt={1}>
              <PhoneInput
                country={"in"}
                value={formik.values.phoneNumber}
                onChange={(value) => formik.setFieldValue("phoneNumber", value)}
                onBlur={() => formik.setFieldTouched("phoneNumber", true)}
                inputStyle={{
                  width: "100%",
                  height: "56px", // Same height as CustomTextField
                  borderRadius: "52px",
                  border: "none",
                  boxShadow: "4px 4px 10px rgba(104, 39, 184, 0.17)",
                  color: color.firstColor,
                  paddingLeft: "58px", // Adjust for country code
                  fontSize: "16px",
                  backgroundColor: "white",
                  transition: "border-color 0.2s ease",
                }}
                buttonStyle={{
                  borderRadius: "52px 0 0 52px",
                  margin: "5px", // Match left side border-radius
                  backgroundColor: "white",
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
                    ml: "14px",
                  }}
                >
                  {formik.errors.phoneNumber}
                </Typography>
              )}
            </Box>

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

            {isLoggedIn() ? (
              <>
                <CustomButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  type="submit"
                >
                  Pay Now
                </CustomButton>
              </>
            ) : (
              <>
                <CustomButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  type="submit"
                >
                  verify Phone & Pay
                </CustomButton>
              </>
            )}

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
              <strong>Room price: </strong>₹{room[selectedSlot.slot]}
            </Typography>
            <Typography sx={typoStyle}>
              <strong>Tax: </strong>₹{room?.tax}
            </Typography>
            <Typography sx={typoStyle}>
              <strong>Extra fees: </strong>₹{room?.extraFees}
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
              Total price: ₹{totalAmount}.00 <br />
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
