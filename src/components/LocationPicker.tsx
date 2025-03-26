import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getCurrentLocation } from "../GeoLocations";
import color from "./color";

interface AutocompleteProps {
  label: string;
  onSelect: (place: any) => void;
  value: string;
  setValue: (value: string | null) => void;
}

const LocationPicker: React.FC<AutocompleteProps> = ({
  label,
  onSelect,
  value,
  setValue,
}) => {
  //   const [country, setCountry] = useState<string>("");
  //   const [state, setState] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!value) {
      getCurrentLocation().then(async (loc: any) => {
        if (loc.latitude && loc.longitude) {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${loc.latitude}&lon=${loc.longitude}&format=json`
            );
            const data = await response.json();
            if (data.display_name) {
              setInput(data.display_name);
              setValue(data.display_name);
            }
          } catch (error) {
            console.error("Error fetching current location:", error);
          }
        }
      });
    }
  }, [setValue, value]);

  useEffect(() => {
    setInput(value);
  }, [value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
    setAnchorEl(event.currentTarget);

    if (value) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (location: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          location
        )}&format=json&limit=15`
      );
      const data: any[] = await response.json();
  
      const filteredData = data.filter((place) =>
        place.display_name.includes("Odisha")
      );
  
      setSuggestions(filteredData);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };
  

  const handleSuggestionClick = (place: any) => {
    setInput(place.name);
    setSuggestions([]);
    onSelect(place);
    setValue(place.display_name);
  };

  return (
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

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          color: color.firstColor,
          borderRadius: 2,
          // height:'100%'
        }}
      >
        <TextField
          variant="standard"
          InputProps={{ disableUnderline: true }}
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="location"
          inputRef={inputRef}
          fullWidth
          inputProps={{
            style: { padding: "0px 10px" },
          }}
          sx={{
            bgcolor: color.thirdColor,
            borderRadius: 2,
            width: "200px",
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
              color: color.firstColor,
              fontFamily: "CustomFontB",
              fontSize: { xs: "18px", md: "20px" },
            },
          }}
        />
      </Box>

      <Popper
        open={suggestions.length > 0}
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{ zIndex: 1000, width: "600px" }}
        sx={{ translate: { xs: "0 0", md: "-40px 10px" } }}
      >
        <Paper
          sx={{
            width: { xs: "100vw", md: "315px" },
            maxHeight: "300px",
            overflow: "auto",
          }}
        >
          <List>
            {suggestions.map((place, index: number) => (
              <ListItem
                // button
                key={index}
                onClick={() => handleSuggestionClick(place)}
              >
                <ListItemText primary={place.display_name} />
                {/* <ListItemText primary={place.lat} /> */}
                {/* <ListItemText primary={place.lon} /> */}
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popper>
    </Box>
  );
};

export default LocationPicker;
