/* eslint-disable jsx-a11y/img-redundant-alt */
import {
  AddCircleOutline,
  CheckCircle,
  Close,
  ExpandLess,
  ExpandMore,
  FiberManualRecord,
  Star,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  Divider,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  RadioGroup,
  styled,
  Tab,
  Tabs,
  ToggleButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import color from "../components/color";
import CustomButton from "../components/CustomButton";
import { amenityIcons } from "../components/data";
import { BoxStyle, CustomRadio, StyledLabel } from "../components/style";
import LoginOtpModal from "./Account/LoginOtpModal";
import SearchSection from "./Home Section/SearchSection";

const hotelData = {
  name: "Hotel Metropol by Maier Private hotels",
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
  images: [
    "https://s3.ap-south-1.amazonaws.com/huts4u.shop/hotel+1.jpg",
    "https://s3.ap-south-1.amazonaws.com/huts4u.shop/hotel+2.jpg",
    "https://s3.ap-south-1.amazonaws.com/huts4u.shop/room-image+1.jpg",
    "https://s3.ap-south-1.amazonaws.com/huts4u.shop/room-image+2.jpg",
    "https://s3.ap-south-1.amazonaws.com/huts4u.shop/room-image+3.jpg",
    "https://s3.ap-south-1.amazonaws.com/huts4u.shop/room-image+3.jpg",
    "https://s3.ap-south-1.amazonaws.com/huts4u.shop/room-image+3.jpg",
    "https://s3.ap-south-1.amazonaws.com/huts4u.shop/room-image+3.jpg",
  ],
  rooms: [
    {
      id: 1,
      name: "Deluxe Double Room",
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
      ],
      image: "https://s3.ap-south-1.amazonaws.com/huts4u.shop/room-image+1.jpg",
    },
    {
      id: 2,
      name: "Superior Double Room",
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
      image: "https://s3.ap-south-1.amazonaws.com/huts4u.shop/room-image+1.jpg",
    },
    {
      id: 3,
      name: "Superior Double Room",
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
      image: "https://s3.ap-south-1.amazonaws.com/huts4u.shop/room-image+1.jpg",
    },
  ],
};

const HotelDetails = () => {
  const [selectedRoom, setSelectedRoom] = useState(hotelData.rooms[0]); // Store the full room object
  const [selectedSlot, setSelectedSlot] = useState<{
    roomId: number | null;
    slot: string | null;
  }>({
    roomId: null,
    slot: null,
  });
  const handleSlotSelection = (roomId: number, slot: string) => {
    setSelectedSlot({ roomId, slot }); // Ensure only one slot is selected at a time
  };

  const [expanded, setExpanded] = useState(false);
  const maxLength = 150;

  const [isSticky, setIsSticky] = useState(false);
  const [stopPosition, setStopPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const boxA = document.getElementById("boxA");
      const boxB = document.getElementById("boxB");
      const boxC = document.getElementById("boxC");

      if (!boxA || !boxB || !boxC) return;

      const boxBRect = boxB.getBoundingClientRect();
      const boxARect = boxA.getBoundingClientRect();

      if (boxBRect.bottom <= window.innerHeight - 400) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      setStopPosition(boxARect.bottom + window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [position, setPosition] = useState<"relative" | "unset">("relative");
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPosition(entry.isIntersecting ? "relative" : "unset");
      },
      { threshold: 0.1 }
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(boxRef.current);
      }
    };
  }, []);

  const [value, setValue] = useState(0);

  const [showDetails, setShowDetails] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");

  const navigate = useNavigate();
  const location = useLocation();

  const openModal = () => {
    navigate(`${location.pathname}?login=true`, { replace: true });
  };
  return (
    <Box
      id="boxA"
      sx={{
        background: color.thirdColor,
        p: { xs: 2, md: 4 },
        position: "relative",
        // minHeight: "2000px",
      }}
    >
      <SearchSection></SearchSection>
      <Box
        sx={{
          px: { xs: 0, md: 2 },
        }}
      >
        <Box
          ref={boxRef}
          id="boxB"
          sx={{
            ...BoxStyle,
            px: { xs: 2, md: 3 },
            py: 3,
            position,
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
            <Typography
              variant="body2"
              fontWeight={600}
              color={color.firstColor}
              lineHeight={1}
            >
              Excellent <br />{" "}
              <span style={{ fontSize: "10px" }}>
                ({hotelData.reviews} reviews)
              </span>
            </Typography>

            <Typography
              variant="body2"
              fontWeight={600}
              color={color.thirdColor}
              sx={{
                background: color.background,
                px: 1,
                borderRadius: "4px",
                fontSize: "18px",
              }}
            >
              {hotelData.rating}
            </Typography>
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "18px", md: "24px" },
              fontWeight: 600,
              color: color.firstColor,
            }}
          >
            {hotelData.name}
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
            {hotelData.address}
          </Typography>

          <Box py={2} sx={{ pr: { xs: 0, md: 2 }, mx: -1 }}>
            <ImageGrid images={hotelData.images}></ImageGrid>
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
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
              <Star></Star> {hotelData.rating} ({hotelData.reviews} reviews)
            </Typography>
          </Box>

          <Box sx={{ maxWidth: { xs: "100%", md: "calc(100% - 450px)" } }}>
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
                // textAlign:'justify'
              }}
            >
              {expanded || hotelData.description.length <= maxLength
                ? hotelData.description
                : `${hotelData.description.substring(0, maxLength)}...`}
              {hotelData.description.length > maxLength && (
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
              {hotelData.amenities.slice(0, 5).map((amenity, index) => (
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

          <Box
            id="boxC"
            sx={{
              ...BoxStyle,
              minWidth: "350px",
              maxWidth: "350px",
              maxHeight: "600px",
              pb: 3,
              position: isSticky ? "fixed" : "absolute",
              bottom: isSticky ? "10px" : "-380px",
              right: isSticky ? "72px" : "24px",
              zIndex: 100,
              m: 0,
              background: color.thirdColor,
              transition: "bottom 0.3s ease",
              overflow: "hidden",
              overflowY: "auto",

              ...(isSticky &&
                window.scrollY >= stopPosition && {
                position: "absolute",
                bottom: "85px",
              }),

              // Stick to the bottom for screen sizes below 900px
              "@media (max-width: 900px)": {
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                minWidth: "unset",
                maxWidth: "100%",
                borderRadius: "10px 10px 0 0",
                p: 2,
              },
            }}
          >
            {isMobile && (
              <Box
                onClick={() => setShowDetails(!showDetails)}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  // width: "100vw",
                  p: 1,
                  // mt: -2,
                  m: -2,
                  mb: showDetails ? -4 : 0,
                  background: color.background,
                  color: color.thirdColor,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "18px",
                  }}
                >
                  {showDetails ? "Hide Details" : "Show Details"}
                </Typography>
                {!showDetails ? <ExpandLess /> : <ExpandMore />}
              </Box>
            )}

            {(showDetails || !isMobile) && (
              <>
                {!isMobile && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "50px",
                      background: color.background,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Typography
                      fontWeight={600}
                      color={color.thirdColor}
                      fontSize={"20px"}
                    >
                      Get Up to 20% Off{" "}
                    </Typography>

                    <Button
                      sx={{
                        textTransform: "none",
                        background: color.background,
                        color: color.thirdColor,
                        border: "solid 1px",
                        p: 0,
                        px: 1,
                      }}
                    >
                      Apply Coupon
                    </Button>
                  </Box>
                )}

                <Typography
                  sx={{
                    fontFamily: "CustomFontB",
                    fontSize: "16px",
                    color: color.paperColor,
                    mt: "50px",
                  }}
                >
                  Your Booking Summary
                </Typography>

                <Box
                  sx={{
                    mt: 2,
                    border: "solid 1px",
                    borderColor: color.forthColor,
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    boxShadow: "0px -10px 20px rgba(0, 0, 0, 0.12) inset",
                  }}
                >
                  <Box
                    p={2}
                    sx={{
                      width: "50%",
                    }}
                  >
                    <Typography fontSize={"14px"} color={color.forthColor}>
                      Check In Date
                    </Typography>

                    <Typography fontWeight={600}>28 Feb 2025</Typography>
                  </Box>
                  <Divider
                    sx={{
                      opacity: 1,
                      borderWidth: "1.5px",
                      borderColor: color.forthColor,
                    }}
                    orientation="vertical"
                    flexItem
                  />
                  <Box
                    p={2}
                    sx={{
                      width: "50%",
                    }}
                  >
                    <Typography fontSize={"14px"} color={color.forthColor}>
                      Check In Time
                    </Typography>

                    <Typography fontWeight={600}>05:00 PM</Typography>
                  </Box>
                </Box>

                <Box
                  mt={2}
                  p={2}
                  sx={{
                    border: "solid 1px",
                    borderColor: color.forthColor,
                    borderRadius: "12px",
                    px: 4,
                    textAlign: "left",
                    boxShadow: "0px -10px 20px rgba(0, 0, 0, 0.12) inset",
                  }}
                >
                  <Typography fontSize={"14px"} color={color.forthColor}>
                    Rooms & Guest Details
                  </Typography>

                  <Typography fontWeight={600}>1 Room, 2 Guests</Typography>
                </Box>

                <Box
                  mt={2}
                  p={2}
                  sx={{
                    border: "solid 1px",
                    borderColor: color.forthColor,
                    borderRadius: "12px",
                    px: 4,
                    textAlign: "left",
                    boxShadow: "0px -10px 20px rgba(0, 0, 0, 0.12) inset",
                    pb: 3,
                    fontFamily: "CustomFontB",
                  }}
                >
                  <Typography fontSize={"14px"} color={color.forthColor} mb={1}>
                    Selected Room Type
                  </Typography>
                  <FormControl component="fieldset">
                    <RadioGroup
                      value={selectedRoom.id}
                      onChange={(e) => {
                        const room = hotelData.rooms.find(
                          (r) => r.id === Number(e.target.value)
                        );
                        if (room) setSelectedRoom(room);
                      }}
                    >
                      {selectedRoom && (
                        <StyledLabel
                          key={selectedRoom.id}
                          value={selectedRoom.id}
                          checked
                          control={<CustomRadio />}
                          label={
                            <Typography sx={{ fontWeight: "bold" }}>
                              {selectedRoom.name}
                            </Typography>
                          }
                        />
                      )}
                    </RadioGroup>
                  </FormControl>
                </Box>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "space-around",
                    gap: "6px",
                    marginTop: "20px",
                  }}
                >
                  {Object.keys(selectedRoom.price).map((slot) => (
                    <StyledToggleButton
                      key={slot}
                      value={slot}
                      selected={
                        selectedSlot.roomId === selectedRoom.id &&
                        selectedSlot.slot === slot
                      }
                      onClick={() => handleSlotSelection(selectedRoom.id, slot)}
                      style={{ borderColor: color.forthColor }}
                    >
                      <Typography
                        px={1}
                        py={0.5}
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                          lineHeight: 1,
                        }}
                      >
                        ₹
                        {
                          selectedRoom.price[
                          slot as keyof typeof selectedRoom.price
                          ]
                        }
                        <br />
                        <span style={{ fontSize: "10px" }}>{slot}</span>
                      </Typography>
                    </StyledToggleButton>
                  ))}
                </div>
                <Divider
                  sx={{ mt: 3, mb: 1, borderColor: color.forthColor }}
                ></Divider>
              </>
            )}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "6px",
                mt: 0,
                px: { xs: 1, md: 3 },
              }}
            >
              <div>
                <Typography fontSize={"14px"} color={color.forthColor} mt={1}>
                  Total Price:
                </Typography>
                <Typography
                  fontSize={"24px"}
                  color={color.firstColor}
                  fontWeight={"bold"}
                >
                  ₹
                  {selectedSlot.roomId && selectedSlot.slot
                    ? hotelData.rooms.find(
                      (room) => room.id === selectedSlot.roomId
                    )?.price[
                    selectedSlot.slot as keyof typeof selectedRoom.price
                    ]
                    : 0}
                  .00
                </Typography>
                <Typography fontSize={"14px"} color={color.forthColor}>
                  + ₹ 827 taxes & fees
                </Typography>
              </div>

              <CustomButton
                customStyles={{
                  height: "fit-content",
                  fontSize: "14px",
                  marginTop: "4px",
                }}
                // onClick={handleSearch}
                onClick={openModal}
                variant="contained"
              >
                Book Now
              </CustomButton>

              <LoginOtpModal></LoginOtpModal>
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
              {hotelData.rooms.map((room) => (
                <Grid item xs={12} md={7} key={room.id}>
                  <Card
                    onClick={() => setSelectedRoom(room)}
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
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

                    <Box sx={{ width: { xs: "100%", md: "fit-content" } }}>
                      <CardMedia
                        component="img"
                        height="160"
                        sx={{
                          borderRadius: "12px",
                          width: { xs: "100%", md: "250px" },
                        }}
                        image={room.image}
                        alt={room.name}
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
                          width: { xs: "fit-content", md: "100%" },
                          pr: { xs: 2, md: 0 },
                          mt: { xs: 2, md: 1 },
                          transition: "all 0.3s",
                        }}
                      >
                        {room.name}
                      </Typography>
                      <Typography variant="body2">{room.size}</Typography>
                    </Box>

                    <List
                      sx={{
                        py: 0,
                        mt: 1,
                        width: "100%",
                        pb: { xs: 0, md: "80px" },
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
                        gap: "6px",
                        position: { xs: "unset", md: "absolute" },
                        bottom: 16,
                        right: 16,
                        // width:'100%'
                        margin: "auto",
                        marginTop: "20px",
                      }}
                    >
                      {Object.keys(room.price).map((slot) => (
                        <StyledToggleButton
                          key={slot}
                          value={slot}
                          selected={
                            selectedSlot.roomId === room.id &&
                            selectedSlot.slot === slot
                          } // Ensures only one selection globally
                          onClick={() => handleSlotSelection(room.id, slot)}
                          style={{ borderColor: color.forthColor }}
                        >
                          <Typography
                            px={1}
                            py={0.5}
                            sx={{
                              fontSize: { xs: "8px", md: "12px" },
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

export default HotelDetails;

interface ImageGridProps {
  images: string[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  const maxImages = Math.min(images.length, 7);
  const displayImages = images.slice(0, maxImages);
  const hasMore = images.length > 7;
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 900px)");

  return (
    <Box
      sx={{
        display: { xs: "block", md: "grid" },
        gap: { xs: 0, md: 1 },
        width: "100%",
        height: "300px",
        gridTemplateColumns:
          displayImages.length > 5 ? "40% 20% 20% 20%" : "60% 20% 20%",
        gridTemplateRows: "auto",
        "& img": {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "8px",
        },
        position: "relative",
      }}
    >
      <Box
        onClick={() => setOpen(true)}
        sx={{
          gridColumn: { xs: "auto", md: "span 1" },
          gridRow: { xs: "auto", md: "span 2" },
          height: "300px",
          width: { xs: "100%", md: "auto" },
          display: { xs: "block", md: "grid" },
        }}
      >
        <img src={displayImages[0]} alt="Main" />
      </Box>

      {!isMobile &&
        displayImages.slice(1).map((src, index) => {
          if (index % 2 === 0) {
            return (
              <Box
                onClick={() => setOpen(true)}
                key={index}
                display="grid"
                sx={{
                  gridTemplateRows: "146px 146px",
                  height: "300px",
                  gap: "8px",
                }}
              >
                <img
                  src={src}
                  alt={`Image ${index + 2}`}
                  style={{ height: "100%", width: "100%", objectFit: "cover" }}
                />

                {displayImages[index + 2] && (
                  <img
                    src={displayImages[index + 2]}
                    alt={`Image ${index + 3}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Box>
            );
          }
          return null;
        })}

      {hasMore && (
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            right: 10,
            background: color.background,
            color: "white",
            borderRadius: "8px",
            p: 1,
            textAlign: "center",
            cursor: "pointer",
            boxShadow:
              "-4px -4px 10px rgba(32, 32, 32, 0.28) inset, 0px 0px 10px rgba(32, 32, 32, 0.28)",
          }}
        >
          <Typography variant="body2">
            + {isMobile ? images.length - 1 : images.length - 7} More
          </Typography>
        </Box>
      )}

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            bgcolor: "white",
            boxShadow: 24,
            p: 2,
            overflowY: "auto",
            borderRadius: "8px",
          }}
        >
          <Typography variant="h6" textAlign="center" mb={2}>
            All Images
          </Typography>

          <Close
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
            }}
          ></Close>
          <Box
            display="grid"
            gap={2}
            sx={{
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            }}
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Image ${index + 1}`}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ))}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

const RoomAmenities = ({
  room,
}: {
  room: { name: string; amenities: string[] };
}) => {
  const [showAll, setShowAll] = useState(false);
  const displayedAmenities = showAll
    ? room.amenities
    : room.amenities.slice(0, 6);
  const halfIndex = Math.ceil(displayedAmenities.length / 2);
  const firstColumn = displayedAmenities.slice(0, halfIndex);
  const secondColumn = displayedAmenities.slice(halfIndex);

  return (
    <>
      <Box sx={{ mt: { xs: 1, md: 0 } }}>
        <Grid container spacing={{ xs: 1, md: 0 }}>
          {[firstColumn, secondColumn].map((column, colIndex) => (
            <Grid item xs={6} md={12} key={colIndex}>
              <List disablePadding>
                {column.map((amenity, index) => {
                  const isLastItem =
                    colIndex === 1 &&
                    index === column.length - 1 &&
                    room.amenities.length > 6;

                  return (
                    <ListItem
                      key={index}
                      sx={{
                        py: 0.2,
                        px: { xs: 0, md: 2 },
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: "20px", mt: 0.5 }}>
                          <FiberManualRecord sx={{ fontSize: "8px" }} />
                        </ListItemIcon>
                        <ListItemText
                          style={{ margin: 0 }}
                          primary={amenity}
                          primaryTypographyProps={{
                            style: { fontSize: "12px" },
                          }}
                        />
                      </div>

                      {isLastItem && (
                        <>
                          <Button
                            onClick={() => setShowAll(!showAll)}
                            sx={{
                              textTransform: "none",
                              fontSize: "14px",
                              ml: "auto",
                              p: 0,
                              color: color.firstColor,
                              fontWeight: "bold",
                            }}
                          >
                            {showAll ? "Show Less" : "... Show All"}
                          </Button>
                          {showAll ? <ExpandLess /> : <ExpandMore />}
                        </>
                      )}
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

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
