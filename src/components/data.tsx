import AcUnitIcon from "@mui/icons-material/AcUnit";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CasinoIcon from "@mui/icons-material/Casino";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FireExtinguisherIcon from "@mui/icons-material/FireExtinguisher";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import KingBedIcon from "@mui/icons-material/KingBed";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import PetsIcon from "@mui/icons-material/Pets";
import PoolIcon from "@mui/icons-material/Pool";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import SpaIcon from "@mui/icons-material/Spa";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import TvIcon from "@mui/icons-material/Tv";
import WifiIcon from "@mui/icons-material/Wifi";

export const amenityIcons: { [key: string]: JSX.Element } = {
  "Swimming Pool": <PoolIcon fontSize="small" />,
  Gym: <FitnessCenterIcon fontSize="small" />,
  "Free WiFi": <WifiIcon fontSize="small" />,
  "Private Beach": <BeachAccessIcon fontSize="small" />,
  Breakfast: <FreeBreakfastIcon fontSize="small" />,
  Parking: <LocalParkingIcon fontSize="small" />,
  Spa: <SpaIcon fontSize="small" />,
  Restaurant: <LocalDiningIcon fontSize="small" />,
  "Airport Shuttle": <AirportShuttleIcon fontSize="small" />,
  "Business Center": <BusinessCenterIcon fontSize="small" />,
  "Pet Friendly": <PetsIcon fontSize="small" />,
  Bar: <LocalBarIcon fontSize="small" />,
  "Room Service": <RoomServiceIcon fontSize="small" />,
  TV: <TvIcon fontSize="small" />,
  "Air Conditioning": <AcUnitIcon fontSize="small" />,
  "Laundry Service": <LocalLaundryServiceIcon fontSize="small" />,
  "Child Care": <ChildCareIcon fontSize="small" />,
  "King Bed": <KingBedIcon fontSize="small" />,
  Casino: <CasinoIcon fontSize="small" />,
  "Car Rental": <DirectionsCarIcon fontSize="small" />,
  "Night Club": <NightlifeIcon fontSize="small" />,
  "Tennis Court": <SportsTennisIcon fontSize="small" />,
  "BBQ Facilities": <OutdoorGrillIcon fontSize="small" />,
  "Fire Safety": <FireExtinguisherIcon fontSize="small" />,
};


export const amenitiesOptions = [
  "Swimming Pool",
  "Gym",
  "Free WiFi",
  "Private Beach",
  "Breakfast",
  "Parking",
  "Spa",
  "Restaurant",
  "Airport Shuttle",
  "Business Center",
  "Pet Friendly",
  "Bar",
  "Room Service",
  "TV",
  "Air Conditioning",
  "Laundry Service",
  "Child Care",
  "King Bed",
  "Casino",
  "Car Rental",
  "Night Club",
  "Tennis Court",
  "BBQ Facilities",
  "Fire Safety",
];


export const roomTypes = [
  { value: "Single Room", label: "Single Room", details: "A basic room with a single bed, ideal for solo travelers." },
  { value: "Double Room", label: "Double Room", details: "Comes with a double bed or two single beds, suitable for two people." },
  { value: "Deluxe Room", label: "Deluxe Room", details: "A more spacious version of a standard room with better furnishings." },
  { value: "Executive Room", label: "Executive Room", details: "Designed for business travelers with a work desk and extra amenities." },
  { value: "Club Room", label: "Club Room", details: "Offers premium benefits like lounge access and complimentary breakfast." },
  { value: "Suite Room", label: "Suite Room", details: "A larger space with a separate living area, ideal for families or business executives." },
  { value: "Presidential Suite", label: "Presidential Suite", details: "A luxurious option with multiple rooms and high-end services." },
  { value: "Royal Suite", label: "Royal Suite", details: "Inspired by Indian royalty with grand interiors and luxury amenities." },
  { value: "Heritage Room", label: "Heritage Room", details: "Traditional decor and antique furnishings, found in heritage hotels." },
  { value: "Cottage/Villa", label: "Cottage/Villa", details: "Standalone accommodations, often found in resorts with private gardens or pools." },
  { value: "Treehouse Room", label: "Treehouse Room", details: "Unique elevated rooms, mostly available in nature retreats." },
  { value: "Houseboat Room", label: "Houseboat Room", details: "Found in Kerala and Kashmir, offering a floating hotel experience." },
  { value: "Studio Apartment", label: "Studio Apartment", details: "A self-contained unit with a kitchenette, preferred for long stays." },
  { value: "Serviced Apartment", label: "Serviced Apartment", details: "A fully furnished apartment with hotel-like services." },
];