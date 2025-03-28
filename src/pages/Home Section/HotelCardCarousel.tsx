import { LocationOn, Person } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import Slider from "react-slick";
import color from "../../components/color";
import { CustomNextArrow, useScreenSize } from "../../components/style";
import { useState, useEffect } from "react";
import {
  getAllHotels,
  getMyAllHotelswithBelongsTo,
} from "../../services/services";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const HotelCardCarousel = () => {
  const { isBelow400px } = useScreenSize();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [mergedData, setMergedData] = useState<any[]>([]);

  useEffect(() => {
    const fetchHotelsWithRooms = async () => {
      try {
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

        const sortedHotels = mergedData
          .sort((a, b) => b.ratings.rating - a.ratings.rating)
          .slice(0, 10);

        setMergedData(sortedHotels);
      } catch (error) {
        console.error("Error fetching hotels with rooms:", error);
      }
    };

    fetchHotelsWithRooms();
  }, []);

  const navigate = useNavigate();

  const handleClick = (hotel: any) => {
    const searchData = {
      bookingType: hotel.rooms[0].stayType.toLowerCase(),
      time: dayjs().format("HH:mm"),
      checkinDate: dayjs(),
      checkOutDate: dayjs(),
      rooms: 1,
      adults: 2,
      children: 0,
    };
    const queryParams = new URLSearchParams();

    Object.entries(searchData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    navigate(`/hotel/${hotel.id}?${queryParams.toString()}`, {
      state: { hotelData: hotel },
    });
  };

  return (
    <Slider {...settings}>
      {mergedData.map((hotel: any, index: number) => (
        <Box p={2} key={hotel.id} display={"flex"} alignItems={"center"}>
          <Card
            onClick={() => handleClick(hotel)}
            sx={{
              width: isBelow400px ? "300px" : "320px",
              // mx: "auto",
              boxShadow: "none",
              borderRadius: "12px",
              border: "solid 3px",
              borderColor: color.firstColor,
              position: "relative",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                px: 1.5,
                background: color.background,
                color: "white",
                borderRadius: "0px 0px 0px 12px",
                fontSize: "14px",

                pb: 0.3,
              }}
            >
              Featured
            </Typography>

            <CardMedia
              component="img"
              height="200"
              image={hotel.propertyImages[0]}
              alt={hotel.propertyName}
            />
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <Rating value={hotel.ratings.rating} precision={0.1} readOnly />
                <Typography
                  sx={{
                    fontSize: "16px",

                    color: color.secondColor,
                    ml: 1,
                  }}
                >
                  {hotel.ratings.rating}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: "CustomFontB",
                  mb: 0.5,
                }}
                variant="h6"
              >
                {hotel.propertyName}
              </Typography>
              <Typography variant="h6">
                ₹
                {(
                  (
                    hotel?.rooms?.[0] &&
                    [
                      {
                        rate: hotel.rooms[0].rateFor3Hour,
                        label: "per 3 hour",
                      },
                      {
                        rate: hotel.rooms[0].rateFor6Hour,
                        label: "per 6 hour",
                      },
                      {
                        rate: hotel.rooms[0].rateFor12Hour,
                        label: "per 12 hour",
                      },
                      {
                        rate: hotel.rooms[0].rateFor1Night,
                        label: "per night",
                      },
                    ].find((item) => item.rate > 0)
                  )?.rate * 1.1
                ).toFixed(2)}{" "}
                <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                  {
                    (
                      hotel?.rooms?.[0] &&
                      [
                        {
                          rate: hotel.rooms[0].rateFor3Hour,
                          label: "per 3 hour",
                        },
                        {
                          rate: hotel.rooms[0].rateFor6Hour,
                          label: "per 6 hour",
                        },
                        {
                          rate: hotel.rooms[0].rateFor12Hour,
                          label: "per 12 hour",
                        },
                        {
                          rate: hotel.rooms[0].rateFor1Night,
                          label: "per night",
                        },
                      ].find((item) => item.rate > 0)
                    )?.label
                  }
                </span>
              </Typography>

              <Box
                display={"flex"}
                justifyContent={"space-between"}
                sx={{
                  background: color.background,
                  mt: 1.5,
                  p: 1,
                  py: 1.5,
                  borderRadius: "12px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "white",
                    px: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* {hotel.rating} */}
                  <LocationOn
                    style={{ fontSize: "18px", paddingRight: "4px" }}
                  />{" "}
                  {hotel.city}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",

                    color: "white",
                    px: 2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Person style={{ fontSize: "18px", paddingRight: "4px" }} />{" "}
                  {hotel.rooms[0].standardRoomOccupancy}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Slider>
  );
};

export default HotelCardCarousel;
