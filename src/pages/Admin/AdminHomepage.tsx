import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    IconButton,
    Box,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteHotel, getAllBookingsofMyHotel, getAllHotels } from "../../services/services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminHomepage: React.FC = () => {
    const [bookings, setBookings] = useState<any[]>([]);
    const [hotels, setHotels] = useState<any[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [deleteType, setDeleteType] = useState<"booking" | "hotel" | null>(null);
    const [selectedName, setSelectedName] = useState<string>("");

    useEffect(() => {
        // Fetch bookings


        // Fetch hotels
        const payLoad = {
            data: { filter: "" },
            page: 0,
            pageSize: 50,
            order: [["createdAt", "ASC"]]
        };
        getAllBookingsofMyHotel(payLoad).then((res) => {
            const sortedBookings = (res?.data?.data?.rows || [])
                .filter((booking: any) => booking.checkInDate) // Ensure checkinDate exists
                .sort((a: any, b: any) =>
                    new Date(b.checkInDate).getTime() - new Date(a.checkInDate).getTime()
                );

            setBookings(sortedBookings);
        }).catch((err) => {
            console.log(err);
        })
        getAllHotels(payLoad).then((res) => {
            setHotels(res?.data?.data?.rows || []);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    const formattedAmount = (amount: any) => {
        const strAmount = amount.toString();
        return strAmount.slice(0, -2) + "." + strAmount.slice(-2);
    };

    const navigate = useNavigate();

    const handleOpenDialog = (id: number, type: "booking" | "hotel", name: string) => {
        setSelectedId(id);
        setDeleteType(type);
        setSelectedName(name);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedId(null);
        setDeleteType(null);
        setSelectedName("");
    };

    const handleConfirmDelete = () => {
        if (!selectedId || !deleteType) return;

        if (deleteType === "hotel") {
            deleteHotel(selectedId).then((res) => {
                setHotels(hotels.filter(hotel => hotel.id !== selectedId));
                toast.success("Hotel deleted successfully");
            }).catch((err) => {
                console.log(err);
                toast.error("Failed to delete hotel");
            });
        }
        // Add booking deletion logic here if needed
        handleCloseDialog();
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 3, width: "90%", alignItems: 'center' }}>

            {/* Booking Table Card */}
            <Card sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h5" gutterBottom>Booking Table</Typography>
                    <TableContainer component={Paper} sx={{ maxHeight: "400px", overflowY: "auto" }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Booking ID</TableCell>
                                    <TableCell>Hotel Name</TableCell>
                                    <TableCell>Guest Name</TableCell>
                                    <TableCell>Check-In</TableCell>
                                    <TableCell>Check-Out</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Amount</TableCell>
                                    {/* <TableCell>Actions</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bookings.map((booking) => (
                                    <TableRow key={booking.id}>
                                        <TableCell>{booking.id}</TableCell>
                                        <TableCell>{booking?.hotelName || 'N/A'}</TableCell>
                                        <TableCell>{booking?.geustName || 'N/A'}</TableCell>
                                        <TableCell>{booking.checkInDate || 'N/A'}</TableCell>
                                        <TableCell>{booking.checkOutDate || 'N/A'}</TableCell>
                                        <TableCell>{booking.status || 'N/A'}</TableCell>
                                        <TableCell>₹{formattedAmount(booking.amountPaid) || '0'}</TableCell>
                                        {/* <TableCell>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleOpenDialog(booking.id, "booking", `Booking #${booking.id}`)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell> */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Hotel Table Card */}
            <Card sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h5" gutterBottom>Hotel Table</Typography>
                    <TableContainer component={Paper} sx={{ maxHeight: "400px", overflowY: "auto" }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Hotel Name</TableCell>
                                    <TableCell>Location</TableCell>
                                    <TableCell>Contact</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {hotels.map((hotel) => (
                                    <TableRow key={hotel.id}>
                                        <TableCell>{hotel.id}</TableCell>
                                        <TableCell>{hotel.propertyName}</TableCell>
                                        <TableCell>{hotel.city}</TableCell>
                                        <TableCell>{hotel.ownerMobile}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="primary"
                                                onClick={() => navigate('/property-registration', { state: hotel.id })}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleOpenDialog(hotel.id, "hotel", hotel.propertyName)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {deleteType === "hotel"
                            ? `Are you sure you want to delete the hotel "${selectedName}"? This action cannot be undone.`
                            : `Are you sure you want to delete the booking "${selectedName}"? This action cannot be undone.`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Delete {deleteType === "hotel" ? "Hotel" : "Booking"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminHomepage;