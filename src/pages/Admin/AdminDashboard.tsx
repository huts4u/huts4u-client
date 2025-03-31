import {
    CalendarMonth,
    CurrencyRupeeRounded,
    StarRateRounded,
    TrendingDown,
    TrendingUp
} from "@mui/icons-material";
import {
    Box,
    Card,
    CardContent,
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import color from "../../components/color";



const AdminDashboard = () => {
    const data = [
        { name: "Dec 27", revenue: 100000 },
        { name: "Jan 28", revenue: 250000 },
        { name: "Feb 28", revenue: 215060 },
    ];



    return (
        <Box p={3} sx={{ background: color.thirdColor }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Grid container spacing={2.5}>
                        {[
                            {
                                title: "New Bookings",
                                value: 840,
                                icon: <CalendarMonth />,
                                change: "8.70%",
                                color: "#A3E4D7",
                            },
                            {
                                title: "Guest ratings",
                                value: '4.7/5',
                                icon: <StarRateRounded />,
                                change: "-3.56%",
                                color: "#D4EFDF",
                            },
                            {
                                title: "Total Revenue",
                                value: "₹123,980",
                                icon: <CurrencyRupeeRounded />,
                                change: "5.70%",
                                color: "#D5F5E3",
                            },
                        ].map((item, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card
                                    sx={{
                                        background: color.thirdColor,
                                        boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.14)",
                                        borderRadius: "12px",
                                        // border:'solid 1px',
                                        // borderColor:color.firstColor
                                    }}
                                >
                                    <CardContent>
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Typography color="#7c7c7c" fontSize={"14px"}>
                                                {item.title}
                                            </Typography>
                                            <IconButton
                                                style={{
                                                    background: color.firstColor,
                                                    color: "white",
                                                    borderRadius: "8px",
                                                }}
                                            >
                                                {item.icon}
                                            </IconButton>
                                        </Box>
                                        <Typography variant="h5" fontWeight={600}>
                                            {item.value}
                                        </Typography>
                                        <Typography
                                            mt={2}
                                            display={"flex"}
                                            alignItems={"center"}
                                            gap={1}
                                            sx={{
                                                color: item.change.includes("-") ? "red" : "green",
                                                width: "fit-content",
                                                px: 2,
                                                borderRadius: "4px",
                                                border: "solid 1px",
                                                fontSize: "14px",
                                            }}
                                        >
                                            {item.change.includes("-") ? (
                                                <TrendingDown></TrendingDown>
                                            ) : (
                                                <TrendingUp></TrendingUp>
                                            )}{" "}
                                            {item.change} from last week
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            background: color.firstColor,
                            color: "white",
                            borderRadius: "10px",
                            padding: "20px",
                            height: "250px",
                        }}
                    >
                        <CardContent sx={{ p: 0, pb: "0 !important" }}>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={2}
                            >
                                <Typography fontWeight={"bold"} variant="h6">
                                    Booking Overview
                                </Typography>
                                <FormControl
                                    sx={{
                                        width: "fit-content",
                                        color: "white",
                                        "& .MuiOutlinedInput-root": {
                                            fontSize: "8px",
                                            padding: "0px",
                                            borderRadius: "8px",
                                            color: "white",
                                            border: "1px solid",
                                            borderColor: "white",
                                        },
                                        "& .MuiSelect-icon": {
                                            color: "white",
                                        },
                                    }}
                                >
                                    <Select size="small" value="Last 6 Months">
                                        <MenuItem value="Last 6 Months">Last 6 Months</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ height: 200, marginTop: 2, ml: "-10px" }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={data}
                                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="white" />
                                        <XAxis
                                            style={{ fontSize: "10px" }}
                                            dataKey="name"
                                            stroke="white"
                                        />
                                        <YAxis style={{ fontSize: "10px" }} stroke="white" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: color.firstColor,
                                                border: "solid 1.5px white",
                                                borderRadius: "4px",
                                                color: "white",
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="white"
                                            strokeWidth={3}
                                            dot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            background: color.firstColor,
                            color: "white",
                            borderRadius: "10px",
                            padding: "20px",
                            height: "250px",
                        }}
                    >
                        <CardContent sx={{ p: 0, pb: "0 !important" }}>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={2}
                            >
                                <Typography fontWeight={"bold"} variant="h6">
                                    Revenue
                                </Typography>
                                <FormControl
                                    sx={{
                                        width: "fit-content",
                                        color: "white",
                                        "& .MuiOutlinedInput-root": {
                                            fontSize: "8px",
                                            padding: "0px",
                                            borderRadius: "8px",
                                            color: "white",
                                            border: "1px solid",
                                            borderColor: "white",
                                        },
                                        "& .MuiSelect-icon": {
                                            color: "white",
                                        },
                                    }}
                                >
                                    <Select size="small" value="Last 6 Months">
                                        <MenuItem value="Last 6 Months">Last 6 Months</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ height: 200, marginTop: 2, ml: "-10px" }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={data}
                                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="white" />
                                        <XAxis
                                            style={{ fontSize: "10px" }}
                                            dataKey="name"
                                            stroke="white"
                                        />
                                        <YAxis style={{ fontSize: "10px" }} stroke="white" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: color.firstColor,
                                                border: "solid 1.5px white",
                                                borderRadius: "4px",
                                                color: "white",
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="white"
                                            strokeWidth={3}
                                            dot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>


        </Box>
    );
};

export default AdminDashboard;
