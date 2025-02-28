import {
  CalendarMonthRounded,
  HighlightOff,
  LocationOn,
  Schedule,
  Search
} from "@mui/icons-material";
import { Box, Typography, useMediaQuery } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import color from "../../components/color";
import CustomButton from "../../components/CustomButton";
import CustomDatePicker from "../../components/CustomDatePicker";
import CustomSingleSelect from "../../components/CustomSingleSelect";
import CustomTimePicker from "../../components/CustomTimePicker";
import RoomGuestSelect from "../../components/RoomGuestSelect";

// const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
//   padding: "0px 10px",
//   textTransform: "none",
//   borderRadius: "6px",
//   fontFamily: "CustomFontB",
//   "&.Mui-selected": {
//     background: color.background,
//     color: "white",
//     "&:hover": {
//       background: color.background,
//     },
//   },
// }));

// const ToggleBookingType = ({ bookingType, handleBookingType }: any) => (
//   <ToggleButtonGroup
//     value={bookingType}
//     exclusive
//     onChange={handleBookingType}
//     sx={{
//       mb: 2,
//       background: color.thirdColor,
//       p: 2,
//       py: 1,
//       borderRadius: "8px",
//     }}
//   >
//     <StyledToggleButton value="hourly">Hourly</StyledToggleButton>
//     <StyledToggleButton value="fullDay">Full Day</StyledToggleButton>
//   </ToggleButtonGroup>
// );

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

// interface Location {
//   display_name: string;
//   lat: number;
//   lon: number;
// }

const SearchSection = () => {
  // const [bookingType, setBookingType] = useState("hourly");
  // const handleBookingType = (event: any, newType: any) => {
  //   if (newType !== null) setBookingType(newType);
  // };

  // const [locations, setLocations] = useState<{
  //   pickup: [number, number];
  //   dropoff: [number, number];
  // } | null>(null);
  // const [pickupLocation, setPickupLocation] = useState<Location | any>(null);

  // const handlePickupSelect = (place: Location) => {
  //   setPickupLocation({
  //     display_name: place.display_name,
  //     lat: place.lat,
  //     lon: place.lon,
  //   });
  // };
  const isMobile = useMediaQuery("(max-width: 900px)");

  const [location, setLocation] = useState<string | null>(null);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [time, setTime] = useState<Dayjs | null>(dayjs());
  const [roomDetails, setRoomDetails] = useState({
    rooms: 1,
    adults: 2,
    children: 0,
  });

  const handleRoomDetailsChange = (
    key: keyof typeof roomDetails,
    value: number
  ) => {
    setRoomDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    const searchData = {
      //  bookingType,
      location,
      date,
      time,
      ...roomDetails,
    };
    console.log("Search Data:", searchData);
    setShowDetails(false);
  };

  const PageLocation = useLocation();
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <Box
        sx={{
          p: 1,
          pt: 3.5,
          background: color.background,
          borderRadius: 3,
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* <div
        style={{
          position: "absolute",
          top: -25,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <ToggleBookingType
          bookingType={bookingType}
          handleBookingType={handleBookingType}
        />
      </div> */}

        {!showDetails && (
          <Box
            onClick={() => setShowDetails(true)}
            sx={{
              display: { md: "none", xs: "flex" },
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-around",
              mb: 0.5,
              mt: -2,
            }}
          >
            <Typography sx={{ ...typoStyle, width: "100%" }}>
              {" "}
              <LocationOn /> {location}
            </Typography>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: "100%",
              }}
            >
              <Typography sx={typoStyle}>
                {" "}
                <CalendarMonthRounded /> {date ? date.format("YYYY-MM-DD") : ""}
              </Typography>

              <Typography sx={typoStyle}>
                {" "}
                <Schedule /> {time ? time.format("HH:mm") : ""}
              </Typography>
            </div>

            {/* <Typography sx={typoStyle}>
            <LocationOn />
            {`Rooms: ${roomDetails.rooms}, Adults: ${roomDetails.adults}, Children: ${roomDetails.children}`}
          </Typography> */}
          </Box>
        )}

        {(showDetails || !isMobile) && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-around",
                mb: 2,
                px: 2,
                gap: 1,
              }}
            >
              <CustomSingleSelect
                options={options}
                value={location ?? options[0]}
                setValue={setLocation}
                label="Select Location"
              />

              {/* <LocationPicker
            label="Pickup Location"
            onSelect={handlePickupSelect}
            value={pickupLocation?.display_name}
          /> */}

              <CustomDatePicker
                date={date}
                setDate={setDate}
                label="Checkin Date"
              ></CustomDatePicker>
              <CustomTimePicker
                time={time}
                setTime={setTime}
                label="Checkin Time"
              />
              <RoomGuestSelect
                label="Room & Guests"
                rooms={roomDetails.rooms}
                adults={roomDetails.adults}
                children={roomDetails.children}
                setRooms={(value) => handleRoomDetailsChange("rooms", value)}
                setAdults={(value) => handleRoomDetailsChange("adults", value)}
                setChildren={(value) =>
                  handleRoomDetailsChange("children", value)
                }
              />

              {PageLocation.pathname !== "/" && (
                <CustomButton
                  customStyles={{
                    background: color.thirdColor,
                    padding: "10px",
                  }}
                  onClick={handleSearch}
                  variant="contained"
                >
                  <Search sx={{ color: color.firstColor, fontSize: "28px" }} />
                </CustomButton>
              )}
            </Box>

            <HighlightOff
              onClick={() => setShowDetails(false)}
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                color: "white",
                display: { md: "none", xs: "flex", fontWeight: "bold" },
              }}
            ></HighlightOff>
          </>
        )}
      </Box>

      {PageLocation.pathname === "/" && (
        <div style={{ width: "100%", display: "flex", marginTop: "20px" }}>
          <CustomButton
            customStyles={{ margin: "auto" }}
            onClick={() => {
              navigate("/search");
            }}
            startIcon={<Search />}
            variant="contained"
          >
            Search Huts4u
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default SearchSection;

const typoStyle = {
  borderRadius: "52px",
  boxShadow: "4px 4px 10px rgba(104, 39, 184, 0.17)",
  color: color.firstColor,
  background: color.thirdColor,
  //   fontWeight: "bold",
  fontSize: { xs: "12px", md: "14px" },
  width: "100%",
  display: "flex",
  alignItems: "center",
  // justifyContent:'center',
  gap: "6px",
  p: 1,
  px: 2,
  m: 1,
};
