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
  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mapboxToken = "pk.eyJ1IjoiYW1pdGF2MTgzMCIsImEiOiJjbHc2bGM0cW8xcXp2MnFsODNyemQ0Y3VvIn0.0LkDbvkAgh-6PuWSVzOYLQ"; // Replace with your Mapbox token

  useEffect(() => {
    if (!value) {
      getCurrentLocation().then(async (loc: any) => {
        if (loc.latitude && loc.longitude) {
          try {
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${loc.longitude},${loc.latitude}.json?access_token=${mapboxToken}`
            );
            const data = await response.json();
            if (data.features && data.features.length > 0) {
              const currentLocation = data.features[0].place_name;
              setInput(currentLocation);
              setValue(currentLocation);
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

    if (value.length > 1) { // Start suggesting after 2 characters
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (query: string) => {
    try {
      // Bhubaneswar bounding box (approximate coordinates)
      const bbox = "85.74,20.21,85.9,20.32"; // min Long, min Lat, max Long, max Lat

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${mapboxToken}&autocomplete=true&bbox=${bbox}&limit=5&proximity=85.8245,20.2961` // Bhubaneswar coordinates
      );
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (place: any) => {
    setInput(place.place_name);
    setSuggestions([]);
    onSelect(place);
    setValue(place.place_name);
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
        }}
      >
        <TextField
          variant="standard"
          InputProps={{ disableUnderline: true }}
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Search in Bhubaneswar..."
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
            {suggestions.map((place, index) => (
              <ListItem
                component="li"
                key={index}
                onClick={() => handleSuggestionClick(place)}
              >
                <ListItemText
                  primary={place.place_name}
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: '14px',
                      fontFamily: 'CustomFontM',
                    }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popper>
    </Box>
  );
};

export default LocationPicker;