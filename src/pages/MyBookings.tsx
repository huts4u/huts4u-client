import { HourglassBottom } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Rating,
    Typography
} from "@mui/material";
import { useState } from "react";
import color from "../components/color";
import { CustomTextField } from "../components/style";

const initialData: any[] = [
  {
    id: 1,
    title: "Boat Tour of Waterland Villages",
    date: "28 Dec ‘16",
    time: "10:30 am",
    variant: "Variant Name",
    guests: "2 Adults, 1 Child",
    price: "$362",
    status: "checked out",
    rating: 3,
  },
  {
    id: 2,
    title: "Wicked Theatre Show",
    date: "24 Dec ‘16",
    time: "12:00 pm",
    variant: "Variant Name",
    guests: "2 Adults",
    price: "$180",
    status: "checked out",
    rating: 0,
  },
  {
    id: 3,
    title: "City Sightseeing Tour",
    date: "30 Dec ‘16",
    time: "9:00 am",
    variant: "Variant Name",
    guests: "1 Adult",
    price: "$150",
    status: "pending",
    rating: 0,
  },
];

const ReviewPopup = ({ open, handleClose, selectedCard, onSubmit }: any) => {
  const [rating, setRating] = useState<number>(selectedCard?.rating || 0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    onSubmit(selectedCard.id, rating);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Review - {selectedCard?.title}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography>Rate your experience:</Typography>
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue || 0)}
          />
          <CustomTextField
            sx={{
              "& .MuiInputBase-input": { resize: "vertical" },
              "& textarea": { resize: "vertical" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                  borderRadius: "12px",
                },
              },
            }}
            label="Write your review"
            multiline
            rows={4}
            fullWidth
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <Button
            sx={{
              background: "transparent",
              border: "solid 2px",
              color: color.firstColor,
              borderColor: color.firstColor,
              borderRadius: "44px",
              textTransform: "none",
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            Submit Review
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const MyBookings = () => {
  const [data, setData] = useState<any[]>(initialData);
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any | null>(null);

  const handleOpen = (card: any) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCard(null);
  };

  const handleSubmitReview = (id: number, rating: number) => {
    setData((prevData) =>
      prevData.map((card) => (card.id === id ? { ...card, rating } : card))
    );
  };

  return (
    <Box
      sx={{
        background: color.thirdColor,
        px: { xs: 2, md: 4 },
        py: 4,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          textAlign: "center",
          color: color.firstColor,
          mb: 2,
        }}
      >
        Your Bookings
      </Typography>

      <Grid container spacing={2}>
        {data.map((card, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              key={card.id}
              sx={{
                margin: "auto",
                mt: 2,
                padding: 3,
                boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.18)",
                borderRadius: "12px",
                border: "solid 1px",
                borderColor: color.firstColor,
                position: "relative",
              }}
            >
              <CardContent style={{ padding: 0 }}>
                <Box
                  sx={{
                    position: "absolute",
                    top: { xs: 5, md: 0 },
                    right: { xs: 25, md: 0 },
                    background:
                      card.status === "checked in" ||
                      card.status === "checked out"
                        ? "Green"
                        : card.status === "pending"
                        ? "#faaf00"
                        : "Red",
                    color: "white",
                    px: 1,
                    borderRadius: { xs: "4px", md: "0 6px 0 6px" },
                    py: 0.5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                  }}
                >
                  {card.status}{" "}
                </Box>

                <Typography variant="h6">{card.title}</Typography>
                <Typography color="textSecondary">
                  {card.date}, {card.time}, {card.variant}
                </Typography>
                <Typography>{card.guests}</Typography>
                <Typography variant="h6" sx={{ marginTop: 1 }}>
                  {card.price}
                </Typography>

                <Divider
                  sx={{
                    mt: 1,
                    borderStyle: "dashed",
                    borderColor: "grey",
                    borderWidth: "1px",
                  }}
                ></Divider>

                {card.status === "checked out" && (
                  <Box
                    display="flex"
                    // flexDirection="column"
                    alignItems="center"
                    gap={1}
                    mt={2}
                  >
                    <Button
                      sx={{
                        background: "transparent",
                        border: "solid 2px",
                        color: color.firstColor,
                        borderColor: color.firstColor,
                        borderRadius: "44px",
                        textTransform: "none",
                      }}
                      onClick={() => handleOpen(card)}
                    >
                      Add Review
                    </Button>
                    <Rating value={card.rating} readOnly />
                  </Box>
                )}

                {card.status === "pending" && (
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    mt={2}
                    color={"#faaf00"}
                  >
                    <HourglassBottom></HourglassBottom>
                    Upcoming
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedCard && (
        <ReviewPopup
          open={open}
          handleClose={handleClose}
          selectedCard={selectedCard}
          onSubmit={handleSubmitReview}
        />
      )}
    </Box>
  );
};

export default MyBookings;
