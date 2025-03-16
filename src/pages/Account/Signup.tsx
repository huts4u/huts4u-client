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
import * as Yup from "yup";
import CustomButton from "../../components/CustomButton";
import { LoginTextField } from "../../components/style";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
        password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
        .required("Password is required"),
      
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .required("Confirm Password is required"),
      
    }),
    onSubmit: (values) => {
      console.log("Signup Data:", values);
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
          maxWidth: 450,
          width: "100%",
          textAlign: "center",
          zIndex: 2,
          position: "relative",
          my:4,
          p:2
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={1} color="white">
          CREATE ACCOUNT
        </Typography>
        <Typography fontSize={"14px"} mb={4} color="white">
          Join us today! Sign up to get started
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <LoginTextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />

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

          <LoginTextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    style={{ color: "white" }}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            Sign Up
          </CustomButton>

          <Button
            fullWidth
            sx={{ textTransform: "none", mt: 2, color: "white" }}
            onClick={() => console.log("Already have an account Clicked")}
          >
            Already have an account?
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
