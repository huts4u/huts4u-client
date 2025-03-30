import { useState, useEffect } from "react";
import { Avatar, Box, Button, Chip, FormControl, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import color from "../../components/color";
import { editHotel, getHotel } from "../../services/services";
import { getUserId } from "../../services/axiosClient";

const BookingTable = ({ booking }: any) => {
  console.log(booking)
  const [availability, setAvailability] = useState(""); // Store "Available" or "Unavailable"
  const [hotelId, setHotelId] = useState("");

  // Fetch hotel availability on mount
  useEffect(() => {
    getHotel(getUserId()).then((res) => {
      setAvailability(res?.data?.data?.roomAvailable); // Should return "Available" or "Unavailable"
      setHotelId(res?.data?.data?.id);
    });
  }, []);

  // Toggle and update DB
  const toggleAvailability = () => {
    const newStatus = availability === "Available" ? "Unavailable" : "Available";
    setAvailability(newStatus); // Update UI immediately

    // Send updated status to backend
    editHotel(hotelId, { roomAvailable: newStatus })
      .then(() => console.log("Availability updated"))
      .catch((err) => console.error("Error updating availability:", err));
  };

  // Show loading state if data is still fetching
  if (availability === null) {
    return <p>Loading...</p>;
  }

  return (
    <Box sx={{ padding: 2, background: color.thirdColor, boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.14)", borderRadius: "12px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <div>
          <Typography variant="h6" fontWeight="bold">New booking</Typography>
          <Typography variant="body2" color="gray">Recent guest reservations list</Typography>
        </div>
        <FormControl sx={{ width: "fit-content", color: color.firstColor }}>
          <Button
            variant="contained"
            color={availability === "Available" ? "success" : "error"}
            onClick={toggleAvailability}
          >
            {availability === "Available" ? "Available" : "Unavailable"}
          </Button>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 2, boxShadow: "none" }}>
        <Table style={{ background: color.thirdColor }}>
          <TableHead>
            <TableRow>
              {["Booking ID", "Guest name", "Checked In Date", "Checked In Time", "Checked Out Date", "Checked Out Time", "Status", ""].map((header) => (
                <TableCell key={header} sx={{ fontWeight: "bold", color: "gray", fontSize: "14px", whiteSpace: "nowrap" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {booking.map((booking: any) => (
              <TableRow style={{ border: "solid 0px", boxShadow: "none" }} key={booking.id}>
                <TableCell>{booking.id}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar src={booking.avatar} alt={booking?.geustName} />
                    <Typography>{booking?.geustName}</Typography>
                  </Box>
                </TableCell>

                <TableCell>{booking.checkInDate}</TableCell>
                <TableCell>{booking.checkInTime}</TableCell>

                <TableCell>{booking.checkOutDate}</TableCell>
                <TableCell>{booking.checkOutTime}</TableCell>
                <TableCell>
                  <Chip
                    label={booking.status}
                    sx={{ backgroundColor: booking.statusColor, color: "#000", fontWeight: "bold" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BookingTable;
