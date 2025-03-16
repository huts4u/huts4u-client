import { Cancel, CheckCircle } from "@mui/icons-material";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import { useState } from "react";
import color from "../../components/color";
import CustomButton from "../../components/CustomButton";
import { CustomTextField } from "../../components/style";

const dummyData = {
  propertyName: "Sunrise Hotel",
  propertyType: "Hotel",
  propertyDescription: "A luxurious hotel with modern amenities.",
  ownerMobile: "9876543210",
  ownerEmail: "owner@example.com",
  receptionMobile: "8765432109",
  receptionEmail: "reception@example.com",
  address: "123, Main Street, Cityville",
  city: "Cityville",
  state: "Stateburg",
  pincode: "123456",
  landmark: "Near Central Park",
  googleBusinessPage: "https://business.google.com/sunrise-hotel",
  gstNo: "22ABCDE1234F1Z5",
  panNo: "ABCDE1234F",
  gstCertificate: "https://i.pravatar.cc/150?img=2",
  panCard: "https://i.pravatar.cc/150?img=2",
  propertyPolicies: "No smoking inside rooms. Pets are not allowed.",
  propertyImages: [
    "https://i.pravatar.cc/150?img=2",
    "https://i.pravatar.cc/150?img=2",
    "https://i.pravatar.cc/150?img=2",
    "https://i.pravatar.cc/150?img=2",
  ],
  stayType: "overnight",
  rooms: [
    {
      roomCategory: "Deluxe Room",
      roomSize: "300 sq.ft",
      rateFor1Night: 5000,
      additionalGuestRate: 800,
      additionalChildRate: 500,
      standardRoomOccupancy: 2,
      maxRoomOccupancy: 4,
      numberOfFreeChildren: 1,
      numberOfRoomsAvailable: 5,
      amenities: ["WiFi", "Air Conditioner", "TV"],
      roomImage: "https://i.pravatar.cc/150?img=2",
    },
  ],
};

const commonStyles = {
  label: { fontWeight: "bold", color: "#333" },
  value: { color: "#555" },
};

const ApplicationPreview = () => {
  const [remark, setRemark] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );

  const handleSubmit = () => {
    console.log("Submitting application with remark:", remark);
    // Handle form submission logic here
  };

  const handleActionClick = (type: "approve" | "reject") => {
    if (type === "reject" && !remark.trim()) {
      alert("Remark is required for rejection.");
      return;
    }
    setActionType(type);
    setOpenDialog(true);
  };

  const handleConfirmAction = () => {
    console.log(
      actionType === "approve" ? "Application Approved" : "Application Rejected"
    );
    setOpenDialog(false);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        m: 3,
        borderRadius: "12px",
        backgroundColor: color.thirdColor,
        boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.14)",
      }}
    >
      <Typography variant="h5" gutterBottom fontWeight={"bold"}>
        Property Application Preview
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={2}>
        {Object.entries(dummyData).map(
          ([key, value]) =>
            key !== "rooms" && (
              <Grid
                item
                xs={12}
                md={
                  key === "propertyImages"
                    ? 12
                    : key === "gstCertificate" || key === "panCard"
                    ? 4
                    : 4
                }
                key={key}
              >
                <Typography sx={commonStyles.label}>
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                    .replace(/^./, (str) => str.toUpperCase())}
                  :
                </Typography>

                {Array.isArray(value) ? (
                  key === "propertyImages" ? (
                    <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                      {value.map((img, index) =>
                        typeof img === "string" ? (
                          <img
                            key={index}
                            src={img}
                            alt={key}
                            width={100}
                            height={100}
                            style={{ borderRadius: 8 }}
                          />
                        ) : null
                      )}
                    </Box>
                  ) : (
                    <Typography sx={commonStyles.value}>
                      {value.join(", ")}
                    </Typography>
                  )
                ) : key === "gstCertificate" || key === "panCard" ? (
                  <Box mt={1}>
                    <img
                      src={value}
                      alt={key}
                      width={150}
                      height={120}
                      style={{ borderRadius: 8 }}
                    />
                  </Box>
                ) : (
                  <Typography sx={commonStyles.value}>{value}</Typography>
                )}
              </Grid>
            )
        )}

        <Grid item xs={12}>
          <Typography sx={commonStyles.label}>Rooms:</Typography>
        </Grid>

        {dummyData.rooms.map((room, idx) => (
          <Grid item xs={12} md={6} key={idx}>
            <Paper
              sx={{
                p: 2,
                my: 1,
                backgroundColor: color.thirdColor,
                boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.14)",
                borderRadius: "12px",
              }}
            >
              {room.roomImage && (
                <Box mt={1}>
                  <img
                    src={room.roomImage}
                    alt="Room"
                    width={200}
                    height={150}
                    style={{ borderRadius: 8 }}
                  />
                </Box>
              )}
              {Object.entries(room).map(([roomKey, roomValue]) => (
                <Box key={roomKey} mb={1}>
                  <Typography sx={commonStyles.value}>
                    <strong>
                      {roomKey.replace(/([A-Z])/g, " $1").trim()}:
                    </strong>{" "}
                    {Array.isArray(roomValue)
                      ? roomValue.length > 0
                        ? roomValue.join(", ")
                        : "N/A"
                      : roomValue || "N/A"}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography mt={1} sx={commonStyles.label}>
        Remark:
      </Typography>

      <CustomTextField
        sx={{
          "& .MuiInputBase-input": { resize: "vertical" },
          "& textarea": { resize: "vertical" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
              borderRadius: "12px",
            },
          },
          mt: 2,
        }}
        fullWidth
        label="Application Remark"
        multiline
        rows={4}
        onChange={(e) => setRemark(e.target.value)}
      />

      <Box mt={2} display="flex" justifyContent="flex-end">
        <CustomButton
          variant="contained"
          customStyles={{ fontSize: "14px" }}
          onClick={handleSubmit}
        >
          Submit
        </CustomButton>
      </Box>

      <Box sx={{ width: "100%", display: "flex", gap: 1 }} mt={4}>
        <CustomButton
          customStyles={{ fontSize: "14px", background: "red", width: "100%" }}
          variant="contained"
          onClick={() => handleActionClick("reject")}
        >
          Reject <Cancel sx={{ ml: 1, fontSize: "18px" }} />
        </CustomButton>
        <CustomButton
          customStyles={{
            fontSize: "14px",
            background: "green",
            width: "100%",
          }}
          variant="contained"
          onClick={() => handleActionClick("approve")}
        >
          Approve <CheckCircle sx={{ ml: 1, fontSize: "18px" }} />
        </CustomButton>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        sx={{ textAlign: "center" }}
      >
        {actionType === "approve" ? (
          <CheckCircle
            sx={{ margin: "auto", fontSize: "84px", color: "green", mt: 2 }}
          />
        ) : (
          <Cancel
            sx={{ margin: "auto", fontSize: "84px", color: "red", mt: 2 }}
          />
        )}

        <DialogTitle sx={{ fontSize: "20px", m: 0, pb: 1 }}>
          {actionType === "approve"
            ? "Confirm Approval?"
            : "Confirm Rejection?"}
        </DialogTitle>
        <DialogContent sx={{ fontSize: "14px" }}>
          Are you sure you want to {actionType} this application?
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Button
            sx={{ textTransform: "none", background: "grey" }}
            variant="contained"
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </Button>
          <Button
            sx={{
              textTransform: "none",
              background: actionType === "approve" ? "green" : "red",
            }}
            variant="contained"
            onClick={handleConfirmAction}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ApplicationPreview;
