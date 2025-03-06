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

const HotelCardCarousel = ({ hotels }: any) => {

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

  return (
    <Slider {...settings}>
      {hotels.map((hotel: any, index: number) => (
        <Box p={2} key={hotel.id} display={"flex"} alignItems={"center"}>
          <Card
            sx={{
              width:isBelow400px?'300px': "320px",
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
              image={hotel.image}
              alt={hotel.title}
            />
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <Rating value={hotel.rating} precision={0.1} readOnly />
                <Typography
                  sx={{
                    fontSize: "16px",

                    color: color.secondColor,
                    ml: 1,
                  }}
                >
                  {hotel.rating}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: "CustomFontB",
                  mb: 0.5,
                }}
                variant="h6"
              >
                {hotel.title}
              </Typography>
              <Typography variant="h6">{hotel.price}</Typography>

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
                  Bhubaneswar
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
                  {/* {hotel.rating} */}
                  <Person
                    style={{ fontSize: "18px", paddingRight: "4px" }}
                  />{" "}
                  12
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
