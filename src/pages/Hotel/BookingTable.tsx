import {
    Avatar,
    Box,
    Chip,
    FormControl,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import React from "react";
import color from "../../components/color";

const bookings = [
  {
    id: "#1223",
    name: "Alex Trie",
    email: "Alex08@gmail.com",
    room: "S-01",
    type: "Single",
    checkIn: "Jan 21, 2025",
    checkOut: "Jan 26, 2025",
    status: "New",
    avatar: "https://i.pravatar.cc/150?img=1",
    statusColor: "#E9D5FF",
  },
  {
    id: "#1224",
    name: "Annette Black",
    email: "Ann23@gmail.com",
    room: "S-22",
    type: "Single",
    checkIn: "Jan 8, 2025",
    checkOut: "Jan 20, 2025",
    status: "Checked In",
    avatar: "https://i.pravatar.cc/150?img=2",
    statusColor: "#FFC107",
  },
  {
    id: "#1225",
    name: "Jerome Bell",
    email: "JB002@gmail.com",
    room: "D-08",
    type: "Double",
    checkIn: "Jan 13, 2025",
    checkOut: "Jan 21, 2025",
    status: "Confirmed",
    avatar: "https://i.pravatar.cc/150?img=3",
    statusColor: "#A7F3D0",
  },
  {
    id: "#1226",
    name: "Jenny Wilson",
    email: "WilSoN77@gmail.com",
    room: "D-05",
    type: "Double",
    checkIn: "Jan 27, 2025",
    checkOut: "Jan 28, 2025",
    status: "Checked Out",
    avatar: "https://i.pravatar.cc/150?img=4",
    statusColor: "#93C5FD",
  },
  {
    id: "#1227",
    name: "Kristin Watson",
    email: "Kris09@gmail.com",
    room: "De-02",
    type: "Deluxe",
    checkIn: "Jan 7, 2025",
    checkOut: "Jan 26, 2025",
    status: "Cancelled",
    avatar: "https://i.pravatar.cc/150?img=5",
    statusColor: "#FECACA",
  },
];

const BookingTable: React.FC = () => {
  return (
    <Box
      sx={{
        padding: 2,
        background: color.thirdColor,
        boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.14)",
        borderRadius: "12px",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <div>
          <Typography variant="h6" fontWeight="bold">
            New booking
          </Typography>
          <Typography variant="body2" color="gray">
            Recent guest reservations list
          </Typography>
        </div>
        <FormControl
          sx={{
            width: "fit-content",
            color: color.firstColor,
            "& .MuiOutlinedInput-root": {
              fontSize: "14px",
              borderRadius: "8px",
              padding: "0px",
              color: color.firstColor,
              border: "1px solid",
            },
          }}
        >
          <Select size="small" value="Last 6 Months">
            <MenuItem value="Last 6 Months">Last 6 Months</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ marginTop: 2, boxShadow: "none" }}
      >
        <Table style={{ background: color.thirdColor }}>
          <TableHead>
            <TableRow>
              {[
                "Booking ID",
                "Guest name",
                "Email",
                "Room type",
                "Checked In",
                "Checked Out",
                "Status",
                "",
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    fontWeight: "bold",
                    color: "gray",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow
                style={{ border: "solid 0px", boxShadow: "none" }}
                key={booking.id}
              >
                <TableCell>{booking.id}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar src={booking.avatar} alt={booking.name} />
                    <Typography>{booking.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{booking.email}</TableCell>
                <TableCell>{booking.type}</TableCell>
                <TableCell>{booking.checkIn}</TableCell>
                <TableCell>{booking.checkOut}</TableCell>
                <TableCell>
                  <Chip
                    label={booking.status}
                    sx={{
                      backgroundColor: booking.statusColor,
                      color: "#000",
                      fontWeight: "bold",
                    }}
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
