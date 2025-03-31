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
import { deleteHotel, deleteUser, getAllHotels, getAllUser } from "../../services/services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminHomepage: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [hotels, setHotels] = useState<any[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [deleteType, setDeleteType] = useState<"user" | "hotel" | null>(null);
    const [selectedName, setSelectedName] = useState<string>("");

    useEffect(() => {
        const payLoad = {
            data: { filter: "" },
            page: 0,
            pageSize: 50,
            order: [["createdAt", "ASC"]]
        };
        getAllUser(payLoad).then((res) => {
            setUsers(res?.data?.data?.rows);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        const payLoad = {
            data: { filter: "" },
            page: 0,
            pageSize: 50,
            order: [["createdAt", "ASC"]]
        };
        getAllHotels(payLoad).then((res) => {
            console.log(res)
            setHotels(res?.data?.data?.rows);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const navigate = useNavigate();

    const handleOpenDialog = (id: number, type: "user" | "hotel", name: string) => {
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

        if (deleteType === "user") {
            deleteUser(selectedId).then(() => {
                toast.success("User deleted successfully");
                setUsers(users.filter(user => user.id !== selectedId));
            }).catch((err) => {
                console.log(err);
                toast.error("Failed to delete user");
            });
        } else if (deleteType === "hotel") {
            deleteHotel(selectedId).then((res) => {
                setHotels(hotels.filter(hotel => hotel.id !== selectedId));
                toast.success("Hotel deleted successfully");
            }).catch((err) => {
                console.log(err);
            })

        }
        handleCloseDialog();
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 3, width: "90%", alignItems: 'center' }}>

            {/* User Table Card */}
            <Card sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h5" gutterBottom>User Table</Typography>
                    <TableContainer component={Paper} sx={{ maxHeight: "400px", overflowY: "auto" }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>User Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                    <TableCell>Role</TableCell>
                                    {/* <TableCell>Action</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.userName}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.phoneNumber}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        {/* <TableCell>
                                            <IconButton 
                                                color="error" 
                                                onClick={() => handleOpenDialog(user.id, "user", user.userName)}
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
                        {deleteType === "user"
                            ? `Are you sure you want to delete the user "${selectedName}"? This action cannot be undone.`
                            : `Are you sure you want to delete the hotel "${selectedName}"? This action cannot be undone.`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Delete {deleteType === "user" ? "User" : "Hotel"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminHomepage;