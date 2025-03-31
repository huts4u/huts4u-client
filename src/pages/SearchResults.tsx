import {
  AddCircleOutline,
  Cancel,
  FilterAlt,
  StarRounded,
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
  Skeleton
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import color from "../components/color";
import CustomButton from "../components/CustomButton";
import { amenityIcons } from "../components/data";
import {
  BoxStyle,
  BpRadio,
  getRatingColor,
  getRatingText,
} from "../components/style";
import {
  getAllHotels,
  getMyAllHotelswithBelongsTo,
} from "../services/services";
import SearchSection from "./Home Section/SearchSection";

const HotelCardSkeleton = ({ isMobile }: { isMobile: boolean }) => (
  <Card sx={{ mb: 2, height: { xs: 'auto', md: 200 } }}>
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <Skeleton
        variant="rectangular"
        width={isMobile ? '100%' : 280}
        height={isMobile ? 200 : '100%'}
      />
      <Box sx={{ p: 2, flex: 1, position: 'relative' }}>
        <Skeleton width="40%" height={24} />
        <Skeleton width="60%" height={20} sx={{ mt: 1 }} />
        <Skeleton width="80%" height={20} sx={{ mt: 1 }} />
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} width={80} height={24} />
          ))}
        </Box>
        <Box sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          width: 120,
          height: 80
        }}>
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </Box>
      </Box>
    </Box>
  </Card>
);

const HotelCard = ({
  hotel,
  queryParams,
  isMobile
}: {
  hotel: any,
  queryParams: URLSearchParams,
  isMobile: boolean
}) => {
  // console.log(hotel)
  const navigate = useNavigate();
  const maxAmenities = isMobile ? 2 : 5;
  const visibleAmenities = hotel?.rooms[0]?.amenities?.slice(0, maxAmenities) || [];
  const remainingAmenities = Math.max(0, (hotel?.rooms[0]?.amenities?.length || 0) - maxAmenities);
  const isAvailable = hotel?.roomAvailable === "Available";

  return (
    <Card
      onClick={() => {
        if (!isAvailable) return;
        const queryString = queryParams.toString();
        navigate(`/hotel/${hotel.id}${queryString ? `?${queryString}` : ''}`, {
          state: { hotelData: hotel },
        });
      }}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        pb: { xs: 2, md: 0 },
        mb: 2,
        background: isAvailable ? color.thirdColor : "#f5f5f5",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.12)",
        borderRadius: "12px",
        transition: "all 0.3s ease",
        cursor: isAvailable ? "pointer" : "not-allowed",
        border: `solid 1px ${isAvailable ? "transparent" : "#ddd"}`,
        height: { xs: "fit-content", md: 200 },
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: isAvailable ? "scale(1.02)" : "none",
          borderColor: isAvailable ? color.firstColor : "#ddd",
        },
        opacity: isAvailable ? 1 : 0.7,
      }}
    >
      {!isAvailable && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2,
            background: "rgba(255,255,255,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              background: "#ff4d4d",
              color: "white",
              px: 2,
              py: 1,
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "14px",
              transform: "rotate(-5deg)",
            }}
          >
            SOLD OUT
          </Typography>
        </Box>
      )}

      <CardMedia
        component="img"
        sx={{
          width: { xs: "100%", md: 280 },
          height: "100%",
          maxHeight: 250,
          filter: isAvailable ? "none" : "grayscale(80%)",
          opacity: isAvailable ? 1 : 0.8,
        }}
        image={hotel?.propertyImages?.[0]}
        alt={hotel?.propertyName}
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
            color={isAvailable ? color.firstColor : "#888"}
            lineHeight={1}
            sx={{
              fontSize: { xs: "12px", md: "14px" },
            }}
          >
            {getRatingText(hotel?.ratings?.rating)} <br />{" "}
            <span style={{ fontSize: "10px" }}>
              ({hotel?.reviews || 0} reviews)
            </span>
          </Typography>

          <Typography
            variant="body2"
            fontWeight={600}
            color="#fff"
            sx={{
              background: getRatingColor(hotel?.ratings?.rating),
              px: 1,
              borderRadius: "4px",
              fontSize: { xs: "14px", md: "16px" },
              boxShadow: "0px -10px 10px rgba(0, 0, 0, 0.12) inset",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {hotel?.ratings?.rating || "N/A"} <StarRounded fontSize="small" />
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
            background: isAvailable ? color.background : "#aaa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Whatshot style={{ fontSize: "10px", marginRight: "2px" }} />{" "}
          HUTS4U PREMIUM
        </Typography>

        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: isAvailable ? color.firstColor : "#666",
            mt: { xs: 1.5, md: 1 },
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {hotel?.propertyName}
        </Typography>

        <Typography
          sx={{
            fontFamily: "CustomFontSB",
            fontSize: { xs: "12px", md: "14px" },
            color: isAvailable ? "textSecondary" : "#888",
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          {hotel?.city}
        </Typography>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
            mt: 2,
          }}
        >
          {hotel?.coupleFriendly === 'yes' && (
            <Typography
              sx={{
                fontFamily: "CustomFontSB",
                fontSize: "12px",
                border: "solid 1px",
                borderColor: isAvailable ? "textSecondary" : "#ddd",
                color: isAvailable ? "textSecondary" : "#ddd",
                width: "fit-content",
                px: 1,
                borderRadius: "4px",
              }}
            >
              Couple Friendly
            </Typography>
          )}

          {hotel?.petFriendly === 'yes' && (
            <Typography
              sx={{
                fontFamily: "CustomFontSB",
                fontSize: "12px",
                border: "solid 1px",
                borderColor: isAvailable ? "textSecondary" : "#ddd",
                color: isAvailable ? "textSecondary" : "#ddd",
                width: "fit-content",
                px: 1,
                borderRadius: "4px",
              }}
            >
              Pet Friendly
            </Typography>
          )}

          {hotel?.familyFriendly === 'yes' && (
            <Typography
              sx={{
                fontFamily: "CustomFontSB",
                fontSize: "12px",
                border: "solid 1px",
                borderColor: isAvailable ? "textSecondary" : "#ddd",
                color: isAvailable ? "textSecondary" : "#ddd",
                width: "fit-content",
                px: 1,
                borderRadius: "4px",
              }}
            >
              Family Friendly
            </Typography>
          )}

          {hotel?.businessFriendly === 'yes' && (
            <Typography
              sx={{
                fontFamily: "CustomFontSB",
                fontSize: "12px",
                border: "solid 1px",
                borderColor: isAvailable ? "textSecondary" : "#ddd",
                color: isAvailable ? "textSecondary" : "#ddd",
                width: "fit-content",
                px: 1,
                borderRadius: "4px",
              }}
            >
              Business Friendly
            </Typography>
          )}
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
          {visibleAmenities.map((amenity: any, index: any) => (
            <Chip
              key={index}
              label={amenity}
              icon={amenityIcons[amenity] || <AddCircleOutline />}
              size="small"
              sx={{
                bgcolor: "transparent",
                fontSize: "10px",
                color: isAvailable ? "inherit" : "#aaa",
              }}
            />
          ))}
          {remainingAmenities > 0 && (
            <Chip
              label={`+${remainingAmenities} more`}
              size="small"
              sx={{
                bgcolor: isAvailable ? "#eee" : "#f5f5f5",
                fontSize: "10px",
                color: isAvailable ? "inherit" : "#aaa",
              }}
            />
          )}
        </Box>

        <Box
          sx={{
            position: { xs: "absolute", md: "absolute" },
            maxWidth: "200px",
            minWidth: "120px",
            mr: { xs: 3, md: 0 },
            bottom: { xs: -16, md: 0 },
            right: { xs: -8, md: 0 },
            borderRadius: "12px 0px 12px 0px",
            p: 1,
            background: isAvailable ? color.background : "#f0f0f0",
            color: isAvailable ? color.thirdColor : "#888",
            textAlign: "end",
            border: `solid 1px ${isAvailable ? color.firstColor : "#ddd"}`,
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
              background: isAvailable ? color.thirdColor : "#ddd",
              color: isAvailable ? color.firstColor : "#888",
              fontSize: "8px",
              fontWeight: 600,
            }}
          >
            {isAvailable ? "Limited Time Offer" : "Unavailable"}
          </Box>

          <Typography
            sx={{
              textDecoration: "line-through",
              fontSize: { xs: "10px", md: "12px" },
              color: isAvailable ? "inherit" : "#aaa",
            }}
          >
            ₹
            {isAvailable
              ? ((hotel?.rooms?.[0] &&
                [
                  hotel.rooms[0].rateFor3Hour,
                  hotel.rooms[0].rateFor6Hour,
                  hotel.rooms[0].rateFor12Hour,
                  hotel.rooms[0].rateFor1Night,
                ].find((rate) => rate > 0) * 1.1).toFixed(2))
              : "---"}
          </Typography>
          <Typography
            sx={{
              fontSize: "18px",
              color: isAvailable ? "inherit" : "#888",
            }}
          >
            {isAvailable
              ? `₹ ${hotel?.rooms?.[0] &&
              [
                hotel.rooms[0].rateFor3Hour,
                hotel.rooms[0].rateFor6Hour,
                hotel.rooms[0].rateFor12Hour,
                hotel.rooms[0].rateFor1Night,
              ].find((rate) => rate > 0)}`
              : "---"}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "10px", md: "12px" },
              color: isAvailable ? "inherit" : "#aaa",
            }}
            variant="body2"
          >
            {isAvailable
              ? `+ ₹${hotel.taxnfees || 0} taxes & fees`
              : "Not available"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const SearchResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mergedData, setMergedData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchHotelsWithRooms = async () => {
      try {
        setLoading(true);
        const hotelPayload = {
          data: { filter: "", status: "Approved" },
          page: 0,
          pageSize: 50,
          order: [["createdAt", "ASC"]],
        };
        const hotelRes = await getAllHotels(hotelPayload);
        const hotelData = hotelRes?.data?.data?.rows || [];
        const hotelIds = hotelData.map((hotel: any) => hotel.id);

        let mergedData = [];
        for (const hotelId of hotelIds) {
          const belongsToPayload = {
            id: hotelId,
            secondTable: "Room",
          };

          const hotelWithRoomsRes = await getMyAllHotelswithBelongsTo(
            belongsToPayload
          );
          const hotelWithRooms = hotelWithRoomsRes?.data || null;

          if (hotelWithRooms) {
            mergedData.push(hotelWithRooms?.data?.[0]);
          }
        }

        setMergedData(mergedData);
      } catch (error) {
        console.error("Error fetching hotels with rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelsWithRooms();
  }, []);

  useEffect(() => {
    const filterProperties = () => {
      const locationFilter = queryParams.get("location") || "";
      const bookingType = queryParams.get("bookingType");
      const bookingHours = queryParams.get("bookingHours");
      const sortByFilter = queryParams.get("sortBy");
      const maxBudget = Number(queryParams.get("maxBudget")) || 20000;
      const minBudget = Number(queryParams.get("minBudget")) || 100;

      let filteredHotels = mergedData.filter((hotel: any) => {
        if (bookingType === "hourly") {
          return (
            hotel.propertyType === "Hotel" &&
            hotel?.rooms[0]?.stayType === "Hourly" &&
            hotel?.rooms?.some((room: any) => {
              if (bookingHours === "3") return Number(room?.rateFor3Hour) !== 0;
              if (bookingHours === "6") return Number(room?.rateFor6Hour) !== 0;
              if (bookingHours === "12")
                return Number(room?.rateFor12Hour) !== 0;
              return false;
            })
          );
        }
        if (bookingType === "fullDay") {
          return (
            hotel.propertyType === "Hotel" &&
            hotel?.rooms[0]?.stayType === "Overnight"
          );
        }
        if (bookingType === "villa") {
          return hotel.propertyType === "Villa";
        }
        return false;
      });

      if (sortByFilter === "rating") {
        filteredHotels.sort(
          (a: any, b: any) =>
            (Number(b?.ratings?.rating) || 0) -
            (Number(a?.ratings?.rating) || 0)
        );
      }

      const getLowestRate = (hotel: any) => {
        return hotel?.rooms?.[0]
          ? [
            hotel.rooms[0].rateFor3Hour,
            hotel.rooms[0].rateFor6Hour,
            hotel.rooms[0].rateFor12Hour,
            hotel.rooms[0].rateFor1Night,
          ]
            .map(Number)
            .find((rate) => rate > 0) || Infinity
          : Infinity;
      };

      filteredHotels = filteredHotels.filter((hotel: any) => {
        const price = getLowestRate(hotel);
        return price >= minBudget && price <= maxBudget;
      });

      if (sortByFilter === "lowToHigh") {
        filteredHotels.sort(
          (a: any, b: any) => getLowestRate(a) - getLowestRate(b)
        );
      }

      if (sortByFilter === "highToLow") {
        filteredHotels.sort(
          (a: any, b: any) => getLowestRate(b) - getLowestRate(a)
        );
      }

      if (locationFilter.trim() !== "") {
        filteredHotels = filteredHotels.filter((hotel: any) => {
          if (!hotel.address) return false;

          const hotelAddressWords = hotel.address
            .toLowerCase()
            .split(/[,\s]+/)
            .map((word: string) => word.trim());

          const filterWords = locationFilter
            .toLowerCase()
            .split(/[,\s]+/)
            .map((word) => word.trim());

          return filterWords.some((word) => hotelAddressWords.includes(word));
        });
      }

      return filteredHotels;
    };

    if (!loading) {
      setFilteredData(filterProperties());
    }
  }, [loading, mergedData, queryParams]);

  const defaultBudget = [
    Number(queryParams.get("minBudget")) || 100,
    Number(queryParams.get("maxBudget")) || 20000,
  ];
  const defaultSelected = queryParams.get("bookingHours") || "3";
  const defaultSortBy = queryParams.get("sortBy") || "lowToHigh";

  const [budget, setBudget] = useState<number[]>(defaultBudget);
  const [selected, setSelected] = useState<string | null>(defaultSelected);
  const [sortBy, setSortBy] = useState<string>(defaultSortBy);

  const updateQueryParams = (
    key: string,
    value: string | number | number[]
  ) => {
    const newParams = new URLSearchParams(location.search);
    if (Array.isArray(value)) {
      newParams.set("minBudget", String(value[0]));
      newParams.set("maxBudget", String(value[1]));
    } else {
      newParams.set(key, String(value));
    }
    navigate({ search: newParams.toString() }, { replace: true });
  };

  useEffect(() => {
    const newParams = new URLSearchParams(location.search);
    let updated = false;

    if (!newParams.has("minBudget")) {
      newParams.set("minBudget", String(defaultBudget[0]));
      updated = true;
    }
    if (!newParams.has("maxBudget")) {
      newParams.set("maxBudget", String(defaultBudget[1]));
      updated = true;
    }
    if (!newParams.has("bookingHours")) {
      newParams.set("bookingHours", defaultSelected);
      updated = true;
    }
    if (!newParams.has("sortBy")) {
      newParams.set("sortBy", defaultSortBy);
      updated = true;
    }

    if (updated) {
      navigate({ search: newParams.toString() }, { replace: true });
    }
  }, []);

  const handleBudgetChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (Array.isArray(newValue)) {
      setBudget(newValue);
      updateQueryParams("budget", newValue);
    }
  };

  const handleBookingChange = (value: string) => {
    setSelected(value);
    updateQueryParams("bookingHours", value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    updateQueryParams("sortBy", value);
  };

  const sidebar = (
    <>
      <Box sx={{ ...BoxStyle, mt: 3 }}>
        <Typography sx={{ ...style, mb: 5 }}>Budget</Typography>
        <Slider
          value={budget}
          onChange={handleBudgetChange}
          step={100}
          min={100}
          max={20000}
          sx={{
            color: color.secondColor,
            "& .MuiSlider-thumb": { backgroundColor: "white" },
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
        <Typography sx={{ fontSize: "14px", fontWeight: 600, mt: 1, ml: -1 }}>
          ₹{budget[0]} - ₹{budget[1]}
        </Typography>
      </Box>

      {queryParams.get("bookingType") === "hourly" && (
        <Box sx={{ ...BoxStyle }}>
          <Typography sx={{ ...style }}>Book For</Typography>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-around", gap: "6px" }}>
            {["3", "6", "12"].map((hour) => (
              <StyledToggleButton
                key={hour}
                value={hour}
                selected={selected === hour}
                onClick={() => handleBookingChange(hour)}
              >
                {hour} Hours
              </StyledToggleButton>
            ))}
          </div>
        </Box>
      )}

      <Box sx={{ ...BoxStyle }}>
        <Typography sx={{ ...style }}>Sort By</Typography>
        <RadioGroup
          sx={{ mt: -1 }}
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
        >
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
    </>
  );

  return (
    <Box sx={{ background: color.thirdColor, p: { xs: 2, md: 4 } }}>
      <SearchSection />

      <Grid container spacing={2}>
        {isMobile ? (
          <Drawer
            anchor="left"
            open={open}
            onClose={() => setOpen(false)}
            sx={{ "& .MuiDrawer-paper": { width: "100%" } }}
          >
            <Box p={2}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h5">Filter</Typography>
                <Cancel onClick={() => setOpen(false)} />
              </div>
              {sidebar}
            </Box>
          </Drawer>
        ) : (
          <Grid item xs={3} sx={{ px: 2 }}>
            {sidebar}
          </Grid>
        )}

        <Grid item xs={12} md={9}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: '20px' }}>
            {loading ? (
              <Skeleton width={200} height={32} />
            ) : (
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: "16px", md: "20px" } }}>
                {filteredData.length} properties found
              </Typography>
            )}
            {isMobile && (
              <CustomButton
                customStyles={{ padding: "6px", fontSize: "16px" }}
                onClick={() => setOpen(true)}
                variant="contained"
              >
                <FilterAlt /> Filter
              </CustomButton>
            )}
          </div>

          {loading ? (
            [...Array(3)].map((_, index) => (
              <HotelCardSkeleton key={index} isMobile={isMobile} />
            ))
          ) : filteredData.length > 0 ? (
            filteredData.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                queryParams={queryParams}
                isMobile={isMobile}
              />
            ))
          ) : (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
                No properties matched your search criteria
              </Typography>
              <Typography variant="body1">
                Try exploring a different location or adjusting your filters
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

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
    backgroundColor: color.secondColor,
    color: "white",
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)({
  "& .MuiFormControlLabel-label": {
    fontSize: "13px",
    fontWeight: 600,
  },
});

export default SearchResults;