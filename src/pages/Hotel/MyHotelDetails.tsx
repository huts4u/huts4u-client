/* eslint-disable jsx-a11y/img-redundant-alt */
import {
  AddCircleOutline,
  CheckCircle,
  Edit,
  Star
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Grid,
  List,
  styled,
  Tab,
  Tabs,
  ToggleButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import color from "../../components/color";
import CustomButton from "../../components/CustomButton";
import { amenityIcons } from "../../components/data";
import { BoxStyle, ImageGrid, RoomAmenities } from "../../components/style";
import theme from "../../theme";
import { getMyAllHotelswithBelongsTo } from "../../services/services";

const hotelData = {
  propertyName: "Hotel Metropol by Maier Private hotels",
  address: "Plot no 10, 11, Mancheswar, Bhubaneswar, Odisha 751001, India",
  description:
    "A good description should be a narrative. It should tell the story of your property. It should focus on the emotions that the property and its amenities evoke. This is where you can describe the style of the property, the history of those who have operated there, and the importance of its place in the neighborhood.",
  rating: 4.7,
  reviews: 134,
  amenities: [
    "Gym",
    "Swimming Pool",
    "Free WiFi",
    "Private Beach",
    "Breakfast",
  ],
  propertyImages: [
    "/assets/hotel 1.jpg",
    "/assets/hotel 2.jpg",
    "/assets/room-image 1.jpg",
    "/assets/room-image 2.jpg",
    "/assets/room-image 3.jpg",
    "/assets/room-image 3.jpg",
    "/assets/room-image 3.jpg",
    "/assets/room-image 3.jpg",
  ],
  rooms: [
    {
      id: 1,
      propertyName: "Deluxe Double Room",
      size: "225 sqft (21 sq.m) | Double Bed",
      price: {
        "3 hrs": 1543,
        "6 hrs": 1943,
        "12 hrs": 2743,
      },
      amenities: [
        "Iron/Ironing Board",
        "Bathroom ",
        "24-hour Housekeeping",
        "24-hour In-room Dining",
        "Laundry Service",
        "Air Conditioning",
        "Air Conditioning",
        "Air Conditioning",
        "Air Conditioning",
        "Air Conditioning",
        "Air Conditioning",
        "Air Conditioning",
        "Air Conditioning",
        "Air Conditioning",
        "Air Conditioning",
        "Air Conditioning",
        "Air Conditioning",
        "Air Conditioning",
      ],
      image: "/assets/room-image 1.jpg",
    },
    {
      id: 2,
      propertyName: "Superior Double Room",
      size: "250 sqft (23 sq.m) | Queen Bed",
      price: {
        "3 hrs": 1743,
        "6 hrs": 2143,
        "12 hrs": 2943,
      },
      amenities: [
        "Iron/Ironing Board",
        "Bathroom",
        "24-hour Housekeeping",
        "Laundry Service",
        "Air Conditioning",
      ],
      image: "/assets/room-image 1.jpg",
    },
    {
      id: 3,
      propertyName: "Superior Double Room",
      size: "250 sqft (23 sq.m) | Queen Bed",
      price: {
        "3 hrs": 1743,
        "6 hrs": 2143,
        "12 hrs": 2943,
      },
      amenities: [
        "Iron/Ironing Board",
        "Bathroom",
        "24-hour Housekeeping",
        "Laundry Service",
        "Air Conditioning",
      ],
      image: "/assets/room-image 1.jpg",
    },
  ],
};

const MyHotelDetails = () => {
  const [selectedRoom, setSelectedRoom] = useState(hotelData.rooms[0]);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { id } = useParams();

  const [expanded, setExpanded] = useState(false);
  const maxLength = isMobile ? 100 : 350;

  const [value, setValue] = useState(0);

  const navigate = useNavigate();
  const [hotelData1, setHotelData1] = useState<any>([]);

  const [roomData, setRoomData] = useState<any>([]);
  console.log(id);

  useEffect(() => {
    getMyAllHotelswithBelongsTo({
      id: id,
      secondTable: 'Room'
    }).then((res) => {
      setHotelData1(res?.data?.data[0]);
      setRoomData(res?.data?.data[0]?.rooms[0]);
      const rooms = res?.data?.data[0]?.rooms;
      if (rooms.length > 0) {
        setSelectedRoom(rooms[0]);
      }
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  console.log(selectedRoom)


  return (
    <Box
      sx={{
        background: color.thirdColor,
        px: 2,
        position: "relative",
      }}
    >
      <Box
        sx={{
          px: { xs: 0, md: 2 },
        }}
      >
        <Box
          sx={{
            ...BoxStyle,
            px: { xs: 2, md: 3 },
            py: 3,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 24,
              right: 24,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <CustomButton
              customStyles={{
                fontSize: "14px",
              }}
              variant="contained"
              startIcon={<Edit />}
              onClick={() => {
                navigate("/property-registration");
              }}
            >
              Edit Hotel
            </CustomButton>
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "18px", md: "24px" },
              fontWeight: 600,
              color: color.firstColor,
            }}
          >
            {hotelData1?.propertyName}
          </Typography>
          <Typography
            color="textSecondary"
            sx={{
              fontFamily: "CustomFontSB",
              fontSize: { xs: "10px", md: "14px" },
              color: color.paperColor,
              mt: { xs: 1, md: 0 },
            }}
          >
            {hotelData1?.address}
          </Typography>

          <Box py={2} sx={{ pr: { xs: 0, md: 2 }, mx: -1 }}>
            <ImageGrid propertyImages={hotelData1.propertyImages || []}></ImageGrid>
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "flex" },
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
                fontSize: "14px",
                mb: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Star></Star>
              {/* {hotelData1.rating} ({hotelData.reviews} reviews) */}
            </Typography>
          </Box>

          <Box sx={{ maxWidth: "100%" }}>
            <Typography
              color="textSecondary"
              sx={{
                fontFamily: "CustomFontB",
                fontSize: "16px",
                color: color.paperColor,
              }}
            >
              Property Description
            </Typography>
            <Typography
              color="textSecondary"
              sx={{
                fontSize: "14px",
                mt: 1,
              }}
            >
              {expanded || hotelData1?.propertyDesc?.length <= maxLength
                ? hotelData1?.propertyDesc
                : `${hotelData1?.propertyDesc?.substring(0, maxLength)}...`}
              {hotelData1?.propertyDesc?.length > maxLength && (
                <Button
                  sx={{
                    textTransform: "none",
                    fontSize: "14px",
                    p: 0,
                    ml: 1,
                    minWidth: 0,
                  }}
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "Show less" : "More"}
                </Button>
              )}
            </Typography>

            <Typography
              sx={{
                fontFamily: "CustomFontB",
                fontSize: "16px",
                color: color.paperColor,
                mt: 2,
              }}
            >
              Highlights
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: { xs: 2, md: 6 },
                flexWrap: "wrap",
                mt: 3,
                p: 2,
                px: 4,
                pt: 3,
                backgroundColor: "rgba(93, 93, 93, 0.14)",
                justifyContent: "space-around",
                borderRadius: "12px",
                width: "fit-content",
              }}
            >
              {roomData?.amenities?.slice(0, 5).map((amenity: any, index: any) => (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Chip
                    key={index}
                    icon={
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        {React.cloneElement(
                          amenityIcons[amenity] || <AddCircleOutline />,
                          {
                            sx: {
                              fontSize: { xs: 26, md: 34 },
                              color: color.paperColor,
                            },
                          }
                        )}
                      </Box>
                    }
                    size="small"
                    sx={{ bgcolor: "transparent" }}
                  />

                  <Typography
                    sx={{ fontSize: { xs: "10px", md: "14px" } }}
                    mt={1.5}
                  >
                    {amenity}
                  </Typography>
                </div>
              ))}
            </Box>
          </Box>
        </Box>

        <Box sx={{ ...BoxStyle, px: { xs: 1, md: 4 } }}>
          <Tabs
            variant="scrollable"
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                color: color.forthColor,
                fontSize: "1rem",
                p: 0,
                minWidth: "10px",
                mx: 1,
                px: 0.5,
              },
              "& .Mui-selected": {
                color: "#000 !important",
                fontWeight: "bold",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#000",
                height: 3,
                borderRadius: "4px",
              },
            }}
          >
            <Tab label="Rooms" />
            <Tab label="Service & Amenities" />
            {/* <Tab label="Reviews" /> */}
            <Tab label="Policies" />
          </Tabs>

          <TabPanel value={value} index={0}>
            <Grid container spacing={2}>
              {Array.isArray(roomData) && roomData.map((room: any) => (
                <Grid item xs={12} md={6} key={room.id}>
                  <Card
                    onClick={() => setSelectedRoom(room)}
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: { xs: "column", md: "column" },
                      alignItems: "flex-start",
                      background: color.thirdColor,
                      borderRadius: "12px",
                      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.18)",
                      border: "solid 2px",
                      borderColor:
                        selectedRoom.id === room.id
                          ? color.firstColor
                          : "transparent",
                      position: "relative",
                      overflow: "visible",
                    }}
                  >
                    {selectedRoom.id === room.id && (
                      <CheckCircle
                        sx={{
                          position: "absolute",
                          top: -10,
                          right: -10,
                          color: color.firstColor,
                          background: color.thirdColor,
                          borderRadius: "50%",
                        }}
                      ></CheckCircle>
                    )}

                    <Box sx={{ width: { xs: "100%", md: "100%" } }}>
                      <CardMedia
                        component="img"
                        height="160"
                        sx={{
                          borderRadius: "12px",
                          width: { xs: "100%", md: "100%" },
                        }}
                        image={room?.image}
                        alt={room?.roomCategory}
                      />

                      <Typography
                        variant="h6"
                        mt={1.5}
                        fontWeight={"bold"}
                        sx={{
                          background:
                            selectedRoom.id === room.id
                              ? color.firstColor
                              : "transparent",
                          ml: -2,
                          pl: 2,
                          borderRadius: "0px 4px 4px 0px",
                          color:
                            selectedRoom.id === room.id
                              ? color.thirdColor
                              : color.firstColor,
                          mb: selectedRoom.id === room.id ? 1 : 0,
                          width: { xs: "fit-content", md: "fit-content" },
                          pr: { xs: 2, md: 2 },
                          mt: { xs: 2, md: 2 },
                          transition: "all 0.3s",
                        }}
                      >
                        {room.propertyName}
                      </Typography>
                      <Typography variant="body2">{room.size}</Typography>
                    </Box>

                    <List
                      sx={{
                        py: 0,
                        mt: 1,
                        width: "100%",
                        pb: { xs: 0, md: "0px" },
                      }}
                    >
                      <RoomAmenities key={room.id} room={room} />
                    </List>

                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-around",
                        gap: "20px",
                        position: { xs: "unset", md: "unset" },
                        bottom: 16,
                        right: 16,
                        // width:'100%',
                        margin: "auto",
                        marginTop: "20px",
                      }}
                    >
                      {Object.keys(room.price).map((slot) => (
                        <StyledToggleButton
                          key={slot}
                          value={slot}
                          style={{ borderColor: color.forthColor }}
                        >
                          <Typography
                            px={1}
                            py={0.5}
                            sx={{
                              fontSize: { xs: "8px", md: "8px" },
                              lineHeight: 1.4,
                            }}
                          >
                            <span style={{ fontSize: "18px", fontWeight: 600 }}>
                              {slot}
                            </span>
                            <br />₹{" "}
                            {room.price[slot as keyof typeof room.price]}
                            <br />
                            Incl. Taxes
                          </Typography>
                        </StyledToggleButton>
                      ))}
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography>Services and amenities provided.</Typography>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Typography>Customer reviews and ratings.</Typography>
          </TabPanel>
          {/* <TabPanel value={value} index={3}>
          <Typography>Hotel policies and guidelines.</Typography>
        </TabPanel> */}
        </Box>
      </Box>
    </Box>
  );
};

export default MyHotelDetails;

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: "4px",
  textTransform: "none",
  fontSize: "12px",
  padding: "0px 10px",
  fontWeight: 600,
  border: "1px solid rgba(61, 61, 61, 0.4)",
  "&.Mui-selected": {
    background: color.background,
    color: "white",
  },
}));

const TabPanel = ({
  children,
  value,
  index,
}: {
  children: React.ReactNode;
  value: number;
  index: number;
}) => {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box p={1} mt={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};
