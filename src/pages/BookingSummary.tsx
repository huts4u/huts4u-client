import { StarRounded } from "@mui/icons-material";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Typography,
} from "@mui/material";
import CustomButton from "../components/CustomButton";
import color from "../components/color";
import { BoxStyle, CustomTextField } from "../components/style";

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
    phone: "",
  },
};

const BookingSummary = () => {
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

          <Typography
            variant="h6"
            mt={4}
            sx={{ color: color.firstColor, fontWeight: "bold" }}
          >
            Guest Information
          </Typography>
          <CustomTextField
            label="Guest Name"
            value={bookingData.guest.name}
            fullWidth
            margin="normal"
          />
          <CustomTextField
            label="Email Address"
            value={bookingData.guest.email}
            fullWidth
            margin="normal"
          />
          <CustomTextField
            label="Mobile Number"
            value={bookingData.guest.phone}
            fullWidth
            margin="normal"
          />
          <CustomButton
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Pay Now
          </CustomButton>
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
