import { Box, Typography } from "@mui/material";
import {
    LocalizationProvider,
    MobileTimePicker
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import color from "./color";

interface TimePickerProps {
  time: Dayjs | null;
  setTime: (value: Dayjs | null) => void;
  label: string;
}

const CustomTimePicker: React.FC<TimePickerProps> = ({
  time,
  setTime,
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
        <Typography sx={{ px: "10px", fontFamily: "CustomFontM" }}>
          {label}
        </Typography>
        <MobileTimePicker
          value={time}
          onChange={setTime}
          slotProps={{
            textField: {
              sx: {
                bgcolor: color.thirdColor,
                borderRadius: 2,
                maxWidth: "200px",
                border: "none",
                outline: "none",
                boxShadow: "none",
                "& fieldset": {
                  border: "none",
                },
                "&:hover": {
                  bgcolor: "#f5f5f5",
                },
                "& .MuiInputBase-input": {
                  padding: "0px 10px",
                  color: color.firstColor,
                  fontFamily: "CustomFontB",
                  fontSize: "20px",
                },
              },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default CustomTimePicker;
