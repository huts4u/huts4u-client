import { Box, Typography } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import color from "./color";

interface DatePickerProps {
  date: Dayjs | null;
  setDate: (value: Dayjs | null) => void;
  label: string;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  date,
  setDate,
  label,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: color.thirdColor,
          borderRadius: 2,
          p: 1,
          textAlign: "left",
          color: color.firstColor,
        }}
      >
        <Typography
          sx={{
            px: "10px",
            fontSize: { xs: "14px", md: "16px" },
            fontFamily: "CustomFontM",
          }}
        >
          {label}
        </Typography>
        <MobileDatePicker
          value={date}
          onChange={setDate}
          slotProps={{
            textField: {
              sx: {
                bgcolor: color.thirdColor,
                borderRadius: 2,
                maxWidth: "200px",
                border: "none", // Remove border
                outline: "none", // Remove focus outline
                boxShadow: "none",
                "& fieldset": {
                  border: "none",
                },
                "&:hover": {
                  bgcolor: "#f5f5f5", // Change background on hover if needed
                },
                "& .MuiInputBase-input": {
                  padding: "0px 10px", // Adjust text padding
                  color: color.firstColor, // Change text color
                  fontFamily: "CustomFontB",
                  fontSize: { xs: "18px", md: "20px" },
                },
              },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
