import {
  CalendarMonthRounded,
  HighlightOff,
  LocationOn,
  Schedule,
  Search,
} from "@mui/icons-material";
import {
  Box,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import color from "../../components/color";
import CustomButton from "../../components/CustomButton";
import CustomDatePicker from "../../components/CustomDatePicker";
import CustomSingleSelect from "../../components/CustomSingleSelect";
import CustomTimePicker from "../../components/CustomTimePicker";
import RoomGuestSelect from "../../components/RoomGuestSelect";
import queryString from "query-string";
import LocationPicker from "../../components/LocationPicker";
const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  padding: "4px 10px",
  textTransform: "none",
  borderRadius: "6px",
  fontFamily: "CustomFontB",
  // border:'none',
  background: "rgba(163, 163, 163, 0.21)",
  boxShadow: "-4px -4px 10px rgba(0, 0, 0, 0.11) inset",
  fontSize: "inherit",
  "&.Mui-selected": {
    background: color.background,
    color: "white",
    "&:hover": {
      background: color.background,
    },
  },
}));

const ToggleBookingType = ({ bookingType, handleBookingType }: any) => (
  <ToggleButtonGroup
    value={bookingType}
    exclusive
    onChange={handleBookingType}
    sx={{
      mb: 2,
      background: color.thirdColor,
      p: 2,
      py: 1,
      borderRadius: "8px",
      border: "none",
      fontSize: { xs: "14px", md: "16px" },
    }}
  >
    <StyledToggleButton value="hourly">Hourly</StyledToggleButton>
    <StyledToggleButton value="fullDay">Full Day</StyledToggleButton>
    <StyledToggleButton value="villa">Villa</StyledToggleButton>
  </ToggleButtonGroup>
);

// const options = ["Patia", "Mancheswar", "Palasuni", "Rasulgarh"];

interface Location {
  display_name: string;
  lat: number;
  lon: number;
}

const SearchSection = () => {

  const [pickupLocation, setPickupLocation] = useState<Location | any>(null);

  const handlePickupSelect = (place: Location) => {
    setPickupLocation({
      display_name: place.display_name,
      lat: place.lat,
      lon: place.lon,
    });
  };
  const isMobile = useMediaQuery("(max-width: 900px)");

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = queryString.parse(location.search);

  const [bookingType, setBookingType] = useState<string>(
    (queryParams.bookingType as string) || "hourly"
  );
  const handleBookingType = (event: any, newType: any) => {
    if (newType !== null) setBookingType(newType);
  };
  const [locationValue, setLocationValue] = useState<string | null>(
    (queryParams.location as string) ?? null
  );
  // console.log(locationValue)
  const [checkinDate, setCheckinDate] = useState<Dayjs | null>(
    queryParams.checkinDate ? dayjs(queryParams.checkinDate as string) : dayjs()
  );
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(
    queryParams.checkOutDate
      ? dayjs(queryParams.checkOutDate as string)
      : dayjs()
  );
  const [time, setTime] = useState<Dayjs | null>(
    queryParams.time 
      ? dayjs(`2024-01-01T${queryParams.time as string}`)
      : dayjs()
  );
  
  
  const [roomDetails, setRoomDetails] = useState({
    rooms: Number(queryParams.rooms) || 1,
    adults: Number(queryParams.adults) || 2,
    children: Number(queryParams.children) || 0,
  });

  const handleRoomDetailsChange = (
    key: keyof typeof roomDetails,
    value: number
  ) => {
    setRoomDetails((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    const searchData = {
      bookingType,
      location: locationValue,
      time: time ? time.format("HH:mm") : undefined,
      checkinDate,
      checkOutDate,
      ...roomDetails,
    };
    const queryParams = new URLSearchParams();

    Object.entries(searchData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    window.location.href = `/search?${queryParams.toString()}`;
    setShowDetails(false);
  };

  const PageLocation = useLocation();
  const [showDetails, setShowDetails] = useState(false);
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
          mt: {xs:PageLocation.pathname !== "/" ? 3:1, md:1},
        }}
      >
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: { xs: -35, md: -35 },
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <ToggleBookingType
            bookingType={bookingType}
            handleBookingType={handleBookingType}
          />
        </Box>

        {!showDetails && PageLocation.pathname !== "/" && (
          <Box
            onClick={() => setShowDetails(true)}
            sx={{
              display: { md: "none", xs: "flex" },
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-around",
              mb: 0.5,
              mt: -1,
            }}
          >
            <Typography sx={{ ...typoStyle, width: "100%" }}>
              {" "}
              <LocationOn /> {locationValue}
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
                <CalendarMonthRounded />{" "}
                {checkinDate ? checkinDate.format("YYYY-MM-DD") : ""}
              </Typography>

              {bookingType === "hourly" ? (
                <Typography sx={typoStyle}>
                  {" "}
                  <Schedule /> {time ? time.format("hh:mm") : ""}
                </Typography>
              ) : (
                <Typography sx={typoStyle}>
                  {" "}
                  <CalendarMonthRounded />{" "}
                  {checkOutDate ? checkOutDate.format("YYYY-MM-DD") : ""}
                </Typography>
              )}
            </div>

            {/* <Typography sx={typoStyle}>
            <LocationOn />
            {`Rooms: ${roomDetails.rooms}, Adults: ${roomDetails.adults}, Children: ${roomDetails.children}`}
          </Typography> */}
          </Box>
        )}
        {(PageLocation.pathname === "/" || showDetails || !isMobile) && (
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
              {/* <CustomSingleSelect
                options={options}
                value={locationValue ?? options[0]}
                setValue={setLocationValue}
                label="Select Location"
              /> */}

              <LocationPicker
                label="Select Location"
                onSelect={handlePickupSelect}
                value={locationValue ?? pickupLocation?.display_name}
                setValue={setLocationValue}
              />

              <CustomDatePicker
                date={checkinDate}
                setDate={setCheckinDate}
                label="Checkin Date"
              ></CustomDatePicker>

              {bookingType === "hourly" ? (
                <CustomTimePicker
                  time={time}
                  setTime={setTime}
                  label="Checkin Time"
                />
              ) : (
                <CustomDatePicker
                  date={checkOutDate}
                  setDate={setCheckOutDate}
                  label="Checkout Date"
                ></CustomDatePicker>
              )}

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
                  <Search sx={{ color: color.firstColor, fontSize: "28px" ,}} />
                </CustomButton>
              )}
            </Box>

            {PageLocation.pathname !== "/" && (
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
            )}
          </>
        )}
      </Box>

      {PageLocation.pathname === "/" && (
        <div style={{ width: "100%", display: "flex", marginTop: "20px" }}>
          <CustomButton
            customStyles={{ margin: "auto" }}
            onClick={handleSearch}
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
