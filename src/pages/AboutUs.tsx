import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import color from "../components/color";
import SectionHeader from "../components/SectionHeader";
import TestimonialsCarousel from "./Home Section/TestimonialsCarousel";

const AboutUs = () => {
  // Data for team members
  const teamMembers = [
    {
      name: "Alice Johnson",
      position: "General Manager",
      image: "https://picsum.photos/200/300?random=1",
    },
    {
      name: "Bob Smith",
      position: "Head Chef",
      image: "https://picsum.photos/200/300?random=2",
    },
    {
      name: "Charlie Davis",
      position: "Sous Chef",
      image: "https://picsum.photos/200/300?random=3",
    },
  ];

  const sections = [
    {
      title: "Our History",
      content:
        "Established in 1990, our hotel has been providing exceptional hospitality services for over three decades. Nestled in the heart of Bhubaneswar, we have evolved with the city, blending traditional charm with modern amenities to offer our guests a unique experience. Our rich legacy is a testament to our commitment to excellence and guest satisfaction.",
      image: "https://s3.ap-south-1.amazonaws.com/huts4u.shop/konark_hero_optimized.jpg",
    },
    {
      title: "Our Mission & Values",
      content:
        "We are committed to delivering unparalleled service, ensuring sustainability, and enriching our community. Our core values—integrity, excellence, and respect—guide every aspect of our operations, from our eco-friendly initiatives to our personalized guest services. We believe in creating memorable experiences while being responsible stewards of our environment.",
      image: "https://s3.ap-south-1.amazonaws.com/huts4u.shop/Our+Mission+%26+Values.jpg",
    },
    {
      title: "Community Engagement",
      content:
        "We actively participate in local events and support various community initiatives to give back to society. Our collaborations with local artisans and participation in cultural festivals reflect our dedication to promoting regional heritage and fostering community growth. We believe that a strong community is the foundation of our success.",
      image: "https://s3.ap-south-1.amazonaws.com/huts4u.shop/Community+Engagement.jpg",
    },
    {
      title: "Ready to Book Your Stay?",
      content:
        "Explore our rooms and make a reservation today to experience luxury and comfort like never before. Whether you’re here for business or leisure, our tailored services and state-of-the-art facilities ensure a memorable stay. Join us and discover why our guests return time and time again.",
      image: "https://s3.ap-south-1.amazonaws.com/huts4u.shop/feature+1.jpg",
    },
  ];

  return (
    <Container>
      <SectionHeader
        primaryText={" Welcome to Huts4U"}
        subText={
          "Located in the heart of the city, our hotel offers luxurious rooms and top-notch amenities to ensure a memorable stay."
        }
      ></SectionHeader>

      {sections.map((section, index) => (
        <AlternatingSection
          key={index}
          title={section.title}
          content={section.content}
          image={section.image}
          reverse={index % 2 !== 0}
        />
      ))}

      <SectionHeader
        primaryText={"Team Member"}
        subText={"Meet the team behind our success"}
      ></SectionHeader>
      <Grid container spacing={4}>
        {teamMembers.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                boxShadow: "none",
                background: color.thirdColor,
                borderRadius: "12px",
              }}
            >
              <CardContent>
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{ width: 100, height: 100, margin: "auto" }}
                />
                <Typography
                  variant="h6"
                  align="center"
                  fontWeight={"bold"}
                  sx={{ color: color.secondColor, mt: 1 }}
                >
                  {member.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  {member.position}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <SectionHeader
        primaryText={"What They Are Saying"}
        subText={"Our Genuine Customer Reviews"}
      ></SectionHeader>
      <TestimonialsCarousel></TestimonialsCarousel>
    </Container>
  );
};

export default AboutUs;

const AlternatingSection = ({
  title,
  content,
  image,
  reverse = false,
}: any) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: reverse ? "row-reverse" : "row" },
        alignItems: "center",
        textAlign: "left",
        my: 4,
        gap: 2,
        //   border:'solid 2px',
        borderColor: color.firstColor,
        p: 2,
        borderRadius: 2,
        boxShadow: "4px 4px 10px rgba(104, 39, 184, 0.17)",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: 200,
          width: { xs: '100%', md: 300 },
          minHeight: 200,
          minWidth: 300,
          borderRadius: 2,
        }}
        image={image}
        alt={title}
      />
      <Box mt={1}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight={"bold"}
          sx={{ color: color.firstColor }}
        >
          {title}
        </Typography>
        <Typography variant="body1" textAlign={"left"}>
          {content}
        </Typography>
      </Box>
    </Box>
  );
};
