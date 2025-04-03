import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import color from "../../components/color";
import { editHotel, getHotel } from "../../services/services";

interface Booking {
  id: string;
  avatar?: string;
  geustName?: string;
  checkInDate: string;
  checkInTime: string;
  checkOutDate: string;
  checkOutTime: string;
  status: string;
  statusColor: string;
}

const BookingTable = ({ bookings = [], hotelId }: any) => {
  const [availability, setAvailability] = useState<string | null>(null);

  // Fetch hotel availability on mount
  useEffect(() => {
    if (hotelId) {
      getHotel(hotelId).then((res) => {
        setAvailability(res?.data?.data?.roomAvailable || "Unavailable");
      }).catch(() => {
        setAvailability("Unavailable");
      });
    }
  }, [hotelId]);

  const toggleAvailability = () => {
    if (!hotelId) return;

    const newStatus = availability === "Available" ? "Unavailable" : "Available";
    setAvailability(newStatus);

    editHotel(hotelId, { roomAvailable: newStatus })
      .then(() => console.log("Availability updated"))
      .catch((err) => {
        console.error("Error updating availability:", err);
        // Revert on error
        setAvailability(availability === "Available" ? "Unavailable" : "Available");
      });
  };

  if (availability === null) {
    return <Typography p={2}>Loading availability...</Typography>;
  }

  return (
    <Box sx={{ padding: 2, background: color.thirdColor, boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.14)", borderRadius: "12px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <div>
          <Typography variant="h6" fontWeight="bold">New bookings</Typography>
          <Typography variant="body2" color="gray">
            {bookings.length > 0
              ? "Recent guest reservations list"
              : "No bookings found"}
          </Typography>
        </div>
        <FormControl sx={{ width: "fit-content", color: color.firstColor }}>
          <Button
            variant="contained"
            color={availability === "Available" ? "success" : "error"}
            onClick={toggleAvailability}
            disabled={!hotelId}
          >
            {availability}
          </Button>
        </FormControl>
      </Box>

      {bookings.length > 0 ? (
        <TableContainer component={Paper} sx={{ marginTop: 2, boxShadow: "none" }}>
          <Table style={{ background: color.thirdColor }}>
            <TableHead>
              <TableRow>
                {["Booking ID", "Guest name", "Checked In Date", "Checked In Time",
                  "Checked Out Date", "Checked Out Time", "Status", ""].map((header) => (
                    <TableCell
                      key={header}
                      sx={{ fontWeight: "bold", color: "gray", fontSize: "14px", whiteSpace: "nowrap" }}
                    >
                      {header}
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking: any) => (
                <TableRow style={{ border: "solid 0px", boxShadow: "none" }} key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar src={booking.avatar} alt={booking.geustName} />
                      <Typography>{booking.geustName}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{booking.checkInDate}</TableCell>
                  <TableCell>{booking.checkInTime}</TableCell>
                  <TableCell>{booking.checkOutDate}</TableCell>
                  <TableCell>{booking.checkOutTime}</TableCell>
                  <TableCell>
                    <Chip
                      label={booking.status}
                      sx={{
                        backgroundColor: booking.statusColor,
                        color: "#000",
                        fontWeight: "bold"
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
          sx={{ background: color.thirdColor }}
        >
          <Typography variant="body1" color="textSecondary">
            No bookings available for this hotel
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default BookingTable;