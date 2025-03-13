import { Edit } from "@mui/icons-material";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import color from "../../components/color";
import EditProfileForm from "./EditProfileForm";

const AccountPage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFormSubmit = (values: any) => {
    setProfile(values);
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        margin: "auto",
        minHeight: "100vh",
        p: 4,
        background: "url('/assets/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        position: "relative",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
          position: "absolute",
          zIndex: 1,
          backdropFilter: "blur(2px)",
        }}
      ></Box>

      {isEditing ? (
        <EditProfileForm
          initialValues={profile}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // gap: "20px",
            maxWidth: 600,
            margin: "auto",
            zIndex: 2,
            position: "relative",
          }}
        >
          <Box>
            <div
              style={{
                padding: "32px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                borderRadius: "12px",
                position: "relative",
                overflow: "hidden",
                backdropFilter: "blur(10px)",
                background: "#f6f6f6",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.38)",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  py: 2,
                  height: "120px",
                  zIndex: 100,
                  background: color.background,
                  color: "white",
                }}
              >
                <Avatar sx={{ height: "64px", width: "64px" }}></Avatar>
                <Typography variant="h5" fontWeight="bold" my={2}>
                  Hi, User
                </Typography>
              </Box>

              <Box
                sx={{
                  mt: "150px",
                  width: "100%",
                  borderRadius: "8px",
                  color:color.firstColor
                }}
              >
                <Typography variant="h5" fontWeight="bold" >
                  Your Basic Information
                </Typography>
                <Typography fontSize={"12px"} mt={0.5}>
                  Make sure this information matches your travel ID, like your
                  passport or licence.
                </Typography>

                <Box
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                    // justifyContent:'space-between'
                  }}
                >
                  <Typography variant="body1" sx={typoStyle}>
                    <strong>Name:</strong> {profile.name || "Not Set"}{" "}
                  </Typography>
                  <Typography variant="body1" sx={typoStyle}>
                    <strong>Bio:</strong> {profile.bio || "Not Set"}
                  </Typography>
                  <Typography variant="body1" sx={typoStyle}>
                    <strong>Date of Birth:</strong> {profile.dob || "Not Set"}
                  </Typography>
                  <Typography variant="body1" sx={typoStyle}>
                    <strong>Gender:</strong> {profile.gender || "Not Set"}
                  </Typography>
                  <Typography variant="body1" sx={typoStyle}>
                    <strong>Phone No:</strong> {profile.phone || "Not Set"}{" "}
                  </Typography>
                  <Typography variant="body1" sx={typoStyle}>
                    <strong>Email:</strong> {profile.email || "Not Set"}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  onClick={handleEditClick}
                  sx={{
                    marginTop: 4,
                    background: "transparent",
                    border: "solid 2px",
                    color: color.firstColor,
                    borderColor: color.firstColor,
                    borderRadius: "44px",
                    textTransform: "none",
                    marginLeft: "auto",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Edit sx={{ mr: 1 }}></Edit>
                  Edit profile
                </Button>
              </Box>
            </div>

            {/* <Button
              sx={{
                marginTop: 4,
                background: "transparent",
                border: "solid 2px",
                color: "red",
                borderRadius: "44px",
                textTransform: "none",
                marginLeft: "auto",
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <DeleteForever sx={{ mr: 1 }}></DeleteForever>
              Delete Account
            </Button> */}
          </Box>
        </div>
      )}
    </Box>
  );
};

export default AccountPage;

const typoStyle = {
  borderRadius: "52px",
  boxShadow: "4px 4px 10px rgba(104, 39, 184, 0.17)",
  color: color.firstColor,
  background: "white",
  p: 2,
  mb: 1,
};
