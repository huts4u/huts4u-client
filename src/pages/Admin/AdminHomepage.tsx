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
import { deleteUser, getAllHotels, getAllUser } from "../../services/services";
import { toast } from "react-toastify";



const AdminHomepage: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [hotels, setHotels] = useState<any[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [deleteType, setDeleteType] = useState<"user" | "hotel" | null>(null);

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


    const handleOpenDialog = (id: number, type: "user" | "hotel") => {
        setSelectedId(id);
        setDeleteType(type);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedId(null);
        setDeleteType(null);
    };

    const handleConfirmDelete = () => {
        if (deleteType === "user") {
            deleteUser(selectedId).then(() => {
                toast("User Deleted Successfully")
                setUsers(users.filter(user => user.id !== selectedId));
            }).catch((err) => {
                console.log(err)
            })

        } else if (deleteType === "hotel") {
            setHotels(hotels.filter(hotel => hotel.id !== selectedId));
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
                                            <IconButton color="error" onClick={() => handleOpenDialog(user.id, "user")}>
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
                                            <IconButton color="primary" onClick={() => console.log(`Edit Hotel ID: ${hotel.id}`)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleOpenDialog(hotel.id, "hotel")}>
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
                        Are you sure you want to delete this {deleteType === "user" ? "user" : "hotel"}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminHomepage;
