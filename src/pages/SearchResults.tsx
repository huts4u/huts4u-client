import {
  AddCircleOutline,
  Cancel,
  FilterAlt,
  Whatshot,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Drawer,
  FormControlLabel,
  Grid,
  RadioGroup,
  Slider,
  styled,
  ToggleButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import color from "../components/color";
import CustomButton from "../components/CustomButton";
import { amenityIcons } from "../components/data";
import { BoxStyle, BpRadio } from "../components/style";
import SearchSection from "./Home Section/SearchSection";

const hotels = [
  {
    id: 1,
    name: "Hotel Metropol by Maier Private hotels",
    location: "Mancheswar, Bhubaneswar",
    rating: 4.7,
    reviews: 354,
    price: 1340.0,
    originalPrice: 3240.0,
    taxnfees: 827,
    amenities: [
      "Gym",
      "Swimming Pool",
      "Free WiFi",
      "Private Beach",
      "Breakfast",
      "Breakfast",
    ],
    image: "https://s3.ap-south-1.amazonaws.com/huts4u.shop/hotel+1.jpg",
  },
  {
    id: 2,
    name: "Hotel Metropol by Maier Private hotels",
    location: "Mancheswar, Bhubaneswar",
    rating: 4.7,
    reviews: 354,
    price: 1340.0,
    taxnfees: 827,
    originalPrice: 3240.0,
    amenities: [
      "Gym",
      "Swimming Pool",
      "Free WiFi",
      "Private Beach",
      "Breakfast",
    ],
    image: "https://s3.ap-south-1.amazonaws.com/huts4u.shop/hotel+2.jpg",
  },
  {
    id: 3,
    name: "Hotel Metropol by Maier Private hotels",
    location: "Mancheswar, Bhubaneswar",
    rating: 4.7,
    reviews: 354,
    price: 1340.0,
    taxnfees: 827,
    originalPrice: 3240.0,
    amenities: [
      "Gym",
      "Swimming Pool",
      "Free WiFi",
      "Private Beach",
      "Breakfast",
    ],
    image: "https://s3.ap-south-1.amazonaws.com/huts4u.shop/room-image+2.jpg",
  },
];

const SearchResults = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const searchData = {
    bookingType: queryParams.get("bookingType"),
    location: queryParams.get("location"),
    checkinDate: queryParams.get("checkinDate"),
    time: queryParams.get("time"),
    roomType: queryParams.get("roomType"),
  };

  const [budget, setBudget] = useState<number[]>([0, 2000000]);
  const [selected, setSelected] = useState<string | null>("3");

  const handleChange = (value: string) => {
    setSelected(value);
  };

  const sidebar = (
    <>
      <Box
        sx={{
          ...BoxStyle,
          mt: 3,
        }}
      >
        <Typography
          sx={{
            ...style,
            mb: 5,
          }}
        >
          Budget
        </Typography>
        <Slider
          value={budget}
          onChange={(e, newValue) => setBudget(newValue as number[])}
          step={500}
          min={1000}
          max={20000}
          sx={{
            color: color.secondColor,
            "& .MuiSlider-thumb": {
              backgroundColor: "white",
            },
            "& .MuiSlider-valueLabel": {
              backgroundColor: color.secondColor,
              color: "white",
              fontSize: "12px",
              borderRadius: "5px",
            },
          }}
          valueLabelFormat={(value) => `₹${value}`}
          valueLabelDisplay="on"
        />

        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            mt: 1,
            ml: -1,
          }}
        >
          ₹{budget[0]} - ₹{budget[1]}
        </Typography>
      </Box>

      {searchData.bookingType === "hourly" && (
        <Box
          sx={{
            ...BoxStyle,
          }}
        >
          <Typography
            sx={{
              ...style,
            }}
          >
            Book For
          </Typography>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-around",
              gap: "6px",
            }}
          >
            <StyledToggleButton
              value="3"
              selected={selected === "3"}
              onClick={() => handleChange("3")}
            >
              3 Hours
            </StyledToggleButton>
            <StyledToggleButton
              value="6"
              selected={selected === "6"}
              onClick={() => handleChange("6")}
            >
              6 Hours
            </StyledToggleButton>

            <StyledToggleButton
              value="9"
              selected={selected === "9"}
              onClick={() => handleChange("9")}
              style={{ marginTop: "6px" }}
            >
              9 Hours
            </StyledToggleButton>
          </div>
        </Box>
      )}

      <Box
        sx={{
          ...BoxStyle,
        }}
      >
        <Typography
          sx={{
            ...style,
          }}
        >
          Sort By
        </Typography>
        <RadioGroup sx={{ mt: -1 }}>
          <StyledFormControlLabel
            value="lowToHigh"
            control={<BpRadio />}
            label="Price Low To High"
          />
          <StyledFormControlLabel
            value="highToLow"
            control={<BpRadio />}
            label="Price High To Low"
          />
          <StyledFormControlLabel
            value="popularity"
            control={<BpRadio />}
            label="Popularity"
          />
          <StyledFormControlLabel
            value="rating"
            control={<BpRadio />}
            label="Customer Rating"
          />
        </RadioGroup>
      </Box>

      <Box
        sx={{
          ...BoxStyle,
        }}
      >
        <Typography
          sx={{
            ...style,
          }}
        >
          Payment
        </Typography>
        <RadioGroup sx={{ mt: -1 }}>
          <StyledFormControlLabel
            value="prePayOnline"
            control={<BpRadio />}
            label="Prepay Online"
          />
          <StyledFormControlLabel
            value="payAtHotel"
            control={<BpRadio />}
            label="Pay At Hotel"
          />
        </RadioGroup>
      </Box>
    </>
  );

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        background: color.thirdColor,
        p: { xs: 2, md: 4 },
      }}
    >
      <SearchSection></SearchSection>

      <Grid container spacing={2}>
        <>
          {isMobile ? (
            <>
              <Drawer
                anchor="left"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ "& .MuiDrawer-paper": { width: "100%" } }}
              >
                <Box p={2}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h5">Filter</Typography>
                    <Cancel onClick={() => setOpen(false)}></Cancel>
                  </div>
                  {sidebar}
                </Box>
              </Drawer>
            </>
          ) : (
            <Grid item xs={3} sx={{ px: 2 }}>
              {sidebar}
            </Grid>
          )}
        </>

        <Grid item xs={12} md={9}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                mb: 2,
                fontWeight: 600,
                fontSize: { xs: "16px", md: "20px" },
              }}
            >
              310 properties found
            </Typography>
            {isMobile && (
              <CustomButton
                customStyles={{
                  padding: "6px",
                  fontSize: "16px",
                }}
                onClick={() => setOpen(true)}
                variant="contained"
              >
                <FilterAlt /> Filter
              </CustomButton>
            )}
          </div>
          {hotels.map((hotel) => {
            const maxAmenities = isMobile ? 2 : 5;
            const visibleAmenities = hotel.amenities.slice(0, maxAmenities);
            const remainingAmenities = hotel.amenities.length - maxAmenities;
            return (
              <Card
                onClick={() => {
                  navigate(`/hotel/${hotel.id}`);
                }}
                key={hotel.id}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  pb: { xs: 2, md: 0 },
                  mb: 2,
                  background: color.thirdColor,
                  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.12)",
                  borderRadius: "12px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  border: "solid 1px transparent",
                  height: { xs: "fit-content", md: 200 },
                  "&:hover": {
                    transform: "scale(1.02)",
                    borderColor: color.firstColor,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: { xs: "100%", md: 280 }, height: "100%" }}
                  image={hotel.image}
                  alt={hotel.name}
                />
                <CardContent
                  style={{
                    padding: "0px 10px",
                    position: "relative",
                    width: "100%",
                    minHeight: "185px",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: { xs: 10, md: 10 },
                      right: { xs: 30, md: 10 },
                      display: "flex",
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
                      sx={{
                        fontSize: { xs: "12px", md: "14px" },
                      }}
                    >
                      Excellent <br />{" "}
                      <span style={{ fontSize: "10px" }}>
                        ({hotel.reviews} reviews)
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
                        fontSize: { xs: "14px", md: "18px" },
                      }}
                    >
                      {hotel.rating}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: color.thirdColor,
                      width: "fit-content",
                      px: 1,
                      py: 0.2,
                      borderRadius: "4px",
                      fontSize: "8px",
                      my: 1,
                      mt: { xs: 2, md: 1.5 },
                      background: color.background,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Whatshot
                      style={{ fontSize: "10px", marginRight: "2px" }}
                    />{" "}
                    HUTS4U PREMIUM
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: color.firstColor,
                      mt: { xs: 1.5, md: 1 },
                      display: "-webkit-box",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {hotel.name}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{
                      fontFamily: "CustomFontSB",
                      fontSize: { xs: "12px", md: "14px" },
                      display: "-webkit-box",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {hotel.location}
                  </Typography>

                  <Box
                    sx={{ display: { xs: "none", md: "flex" }, gap: 2, mt: 2 }}
                  >
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontFamily: "CustomFontSB",
                        fontSize: "12px",
                        border: "solid 1px",
                        width: "fit-content",
                        px: 1,
                        borderRadius: "4px",
                      }}
                    >
                      Couple Friendly
                    </Typography>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontFamily: "CustomFontSB",
                        fontSize: "12px",
                        border: "solid 1px",
                        width: "fit-content",
                        px: 1,
                        borderRadius: "4px",
                      }}
                    >
                      Pet Friendly
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 0.5,
                      flexWrap: "wrap",
                      mt: 2,
                      maxWidth: { xs: "50%", md: "60%" },
                    }}
                  >
                    {visibleAmenities.map((amenity, index) => (
                      <Chip
                        key={index}
                        label={amenity}
                        icon={amenityIcons[amenity] || <AddCircleOutline />}
                        size="small"
                        sx={{ bgcolor: "transparent", fontSize: "10px" }}
                      />
                    ))}
                    {remainingAmenities > 0 && (
                      <Chip
                        label={`+${remainingAmenities} more`}
                        size="small"
                        sx={{ bgcolor: "#eee", fontSize: "10px" }}
                      />
                    )}
                  </Box>

                  <Box
                    sx={{
                      position: { xs: "absolute", md: "absolute" },
                      maxWidth: "200px",
                      minWidth: "120px",
                      mr: { xs: 3, md: 0 },

                      // pr: 2,
                      // ml:'auto',
                      // mt:4,
                      // mx: -1,

                      bottom: { xs: -16, md: 0 },
                      right: { xs: -8, md: 0 },
                      borderRadius: "12px 0px 12px 0px",
                      p: 1,
                      background: color.background,
                      color: color.thirdColor,
                      textAlign: "end",
                      border: "solid 1px",
                      borderColor: color.firstColor,
                      pt: 4,
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        borderRadius: "12px 0px 12px 0px",
                        p: 1,
                        background: color.thirdColor,
                        color: color.firstColor,
                        fontSize: "8px",
                        fontWeight: 600,
                      }}
                    >
                      Limited Time Offer
                    </Box>

                    <Typography
                      sx={{
                        textDecoration: "line-through",
                        fontSize: { xs: "10px", md: "12px" },
                      }}
                    >
                      ₹{hotel.originalPrice}.00
                    </Typography>
                    <Typography sx={{ fontSize: "18px" }}>
                      ₹{hotel.price}.00
                    </Typography>
                    <Typography
                      sx={{ fontSize: { xs: "10px", md: "12px" } }}
                      variant="body2"
                    >
                      + ₹{hotel.taxnfees} taxes & fees
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchResults;

const style = {
  background: "#f3eee1",
  width: "fit-content",
  borderRadius: "6px",
  p: 1,
  m: -2,
  mx: -4,
  mb: 2,
  fontWeight: 600,
  color: color.paperColor,
  fontSize: "18px",
};

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: "4px",
  textTransform: "none",
  fontSize: "12px",
  padding: "0px 10px",
  fontWeight: 600,
  border: "1px solid rgba(61, 61, 61, 0.4)",
  "&.Mui-selected": {
    backgroundColor: "#4c5a85",
    color: "white",
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)({
  "& .MuiFormControlLabel-label": {
    fontSize: "13px",
    fontWeight: 600,
  },
});
