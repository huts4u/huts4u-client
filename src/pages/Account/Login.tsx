import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CustomButton from "../../components/CustomButton";
import { LoginTextField } from "../../components/style";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Login Data:", values);
    },
  });

  return (
    <Box
      sx={{
        margin: "auto",
        minHeight: "calc(100vh - 64px)",
        background: "url('/assets/login.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          background: "rgba(0, 0, 0, 0.15)",
          borderRadius: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          height: "100%",
          width: "100%",
        }}
      ></Box>

      <Box
        sx={{
          //   background:
          //     "radial-gradient(86.82% 86.82% at 50% 0.91%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(50% 50% at 50% 100%, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)",
          maxWidth: 450,
          width: "100%",
          textAlign: "center",
          zIndex: 2,
          position: "relative",
          p:2
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={1} color="white">
          LOGIN ACCOUNT
        </Typography>
        <Typography fontSize={"14px"} mb={4} color="white">
          Welcome back! Sign in to manage your property
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <LoginTextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <LoginTextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    style={{ color: "white" }}
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <CustomButton
            customStyles={{
              width: "100%",
              border: "solid 1px",
              color: "white",
              borderRadius: "12px",
              background: "transparent",
              marginTop: "10px",
            }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </CustomButton>

          <div style={{ display: "flex" }}>
            <Button
              fullWidth
              sx={{ textTransform: "none", mt: 2, color: "white" }}
              onClick={() => console.log("Forgot Password Clicked")}
            >
              Forgot Password
            </Button>

            <Button
              fullWidth
              sx={{ textTransform: "none", mt: 2, color: "white" }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              I don’t have an account
            </Button>
          </div>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
