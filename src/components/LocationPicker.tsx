import { LocationOnSharp } from "@mui/icons-material";
import {
    Box,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    Paper,
    Popper,
    TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getCurrentLocation } from "../GeoLocations";

interface AutocompleteProps {
  label: string;
  onSelect: (place: any) => void;
  value: string;
}

const LocationPicker: React.FC<AutocompleteProps> = ({
  label,
  onSelect,
  value,
}) => {
  //   const [country, setCountry] = useState<string>("");
  //   const [state, setState] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getCurrentLocation().then((loc: any) => {
      //   getPlaceDetails(loc.latitude, loc.longitude).then((place: any) => {
      //     setCountry(place.country);
      //     setState(place.state);
      //   });
    });
  }, []);

  useEffect(() => {
    setInput(value);
  }, [value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInput(value);
    setAnchorEl(event.currentTarget); // Set the current text field as anchor element

    if (value) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (location: string) => {
    try {
      // const query = `${location}, ${state}, ${country}`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          location
        )}&format=json&limit=15`
        // `https://www.waze.com/live-map/api/autocomplete/?q=${encodeURIComponent(location)}&exp=8%2C10%2C12&geo-env=row&v=20.2700073%2C85.78288078%3B20.32217239%2C85.86613655&lang=en-GB`
      );
      const data: any[] = await response.json();
      setSuggestions(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSuggestionClick = (place: any) => {
    setInput(place.name);
    setSuggestions([]);
    onSelect(place);
  };

  return (
    <Box sx={{ marginTop: "10px" }}>
      <InputLabel sx={{ width: "100%", mb: 0.5, pl: 0.5 }}>{label}</InputLabel>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          p: 1,
        }}
      >
        <LocationOnSharp></LocationOnSharp>

        <TextField
          variant="standard"
          InputProps={{ disableUnderline: true }}
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Search for a location..."
          inputRef={inputRef}
          fullWidth
        />
      </Box>

      <Popper
        open={suggestions.length > 0}
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{ zIndex: 1, width: "600px" }}
        sx={{ translate: { xs: "0 0", md: "-40px 10px" } }}
      >
        <Paper sx={{ width: { xs: "100vw", md: "315px" } }}>
          <List>
            {suggestions.map((place, index: number) => (
              <ListItem
                // button
                key={index}
                onClick={() => handleSuggestionClick(place)}
              >
                <ListItemText primary={place.name} />
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
