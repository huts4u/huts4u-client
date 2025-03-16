import { Edit } from "@mui/icons-material";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import PhoneInput, { CountryData } from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import color from "../../components/color";
import { sendOTP, verifyOTP } from "../../services/services";
import "./Login.css";

import { toast } from "react-toastify";
import {
  setCurrentAccessToken,
  setCurrentUser,
} from "../../services/axiosClient";

const LoginOtpModal = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("in");
  const [sessionId, setSessionId] = useState("");
  const navigate = useNavigate();

  const [otp, setOtp] = useState(Array(4).fill(""));
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const otpRefs = Array.from({ length: 4 }, () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useRef<HTMLInputElement>(null)
  );

  const location = useLocation();

  const isModalOpen =
    new URLSearchParams(location.search).get("login") === "true";

  const handleClose = () => {
    navigate(location.pathname, { replace: true });
  };

  const phoneFormik = useFormik({
    initialValues: { phone: "" },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required("Phone number is required")
        .matches(/^\d+$/, "Only numbers allowed"),
    }),
    onSubmit: (values) => {
      setPhoneNumber(values.phone);
      sendOtp(values.phone);
    },
  });

  const sendOtp = async (phoneNumber: any) => {
    console.log(phoneNumber.slice(2));
    const payLoad = {
      phone: phoneNumber.slice(2),
    };

    sendOTP(payLoad)
      .then((res) => {
        console.log(res);
        toast(res?.data?.msg);
        setSessionId(res?.data?.data);
        setStep(2);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpSubmit = () => {
    if (otp.join("").length === 4) {
      const payLoad = {
        otp: otp.join(""),
        sessionId: sessionId,
        phone: phoneNumber.slice(2),
      };
      verifyOTP(payLoad)
        .then((res) => {
          setCurrentAccessToken(res?.data?.data?.token);
          setCurrentUser(res?.data?.data?.user);
          toast(res?.data?.msg);
          navigate(`/booking-summary/${phoneNumber}`, {
            replace: true,
            state: { phoneNumber },
          });
        })
        .catch((err) => {
          toast(err);
        });
    } else {
      alert("Enter complete OTP");
    }
  };

  return (
    <Modal open={isModalOpen} onClose={handleClose}>
      <Box sx={modalStyle}>
        {step === 1 ? (
          <form
            onSubmit={phoneFormik.handleSubmit}
            style={{ height: "100%", borderRadius: "12px" }}
          >
            <div
              className="subscribe"
              style={{
                background: color.background,
                color: "white",
                position: "relative",
                boxShadow: "-4px -4px 10px rgba(255, 255, 255, 0.36) inset",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  background: "url('/assets/footer.webp')",
                  backgroundSize: { xs: "70%", md: "70%" },
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom left",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              ></Box>

              <Typography variant="h6">Enter Phone Number</Typography>
              <Typography
                mb={4}
                variant="body2"
                sx={{ fontSize: "12px", textAlign: "left", maxWidth: "80%" }}
              >
                Login to create a booking!
              </Typography>
              <PhoneInput
                country={"in"}
                value={phoneFormik.values.phone}
                onChange={(value, country) => {
                  const countryData = country as CountryData;
                  setCountryCode(countryData.countryCode);
                  phoneFormik.setFieldValue(
                    "phone",
                    value.replace(/[^0-9]/g, "")
                  );
                }}
                inputStyle={{
                  width: "100%",
                  fontFamily: "CustomFontM",
                  color: "black",
                  background: color.thirdColor,
                }}
                containerStyle={{ position: "relative" }}
              />
              {phoneFormik.touched.phone && phoneFormik.errors.phone && (
                <Typography sx={{ color: "white", fontSize: "14px" }}>
                  *{phoneFormik.errors.phone}
                </Typography>
              )}

              <Button
                type="submit"
                sx={{
                  background: color.thirdColor,

                  color: color.firstColor,
                  fontSize: "14px",
                  fontWeight: "bold",
                  textTransform: "none",
                  m: "auto",
                  mt: 4,
                  width: "100%",
                  display: "block",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  borderRadius: 0,
                  py: 2,
                  boxShadow: "0px -6px 50px rgba(7, 7, 7, 0.11)",
                }}
              >
                {" "}
                Send OTP
              </Button>

              {/* <div className="submit-btn">SUBMIT</div> */}
            </div>
          </form>
        ) : (
          <>
            <div
              className="subscribe"
              style={{
                background: color.background,
                color: "white",
                position: "relative",
                boxShadow: "-4px -4px 10px rgba(255, 255, 255, 0.36) inset",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  background: "url('/assets/footer.webp')",
                  backgroundSize: { xs: "70%", md: "70%" },
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom left",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              ></Box>
              <Typography variant="h6">Enter OTP</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Sent to: +{phoneNumber}{" "}
                <Button
                  size="small"
                  onClick={() => setStep(1)}
                  sx={{
                    color: color.firstColor,
                    background: color.thirdColor,
                    p: 0,
                    px: 1,
                    minWidth: 0,
                    ml: 1,
                    textTransform: "none",
                  }}
                >
                  <Edit sx={{ fontSize: "14px" }}></Edit> Edit
                </Button>
              </Typography>
              <Grid container spacing={1} justifyContent="center" mt={3}>
                {otp.map((_, index) => (
                  <Grid item key={index}>
                    <TextField
                      inputRef={otpRefs[index]}
                      value={otp[index]}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      inputProps={{
                        maxLength: 1,
                        style: {
                          textAlign: "center",
                          fontSize: 18,
                          borderColor: "transparent",
                        },
                      }}
                      // sx={{ width: 40 }}

                      sx={{
                        width: 40,
                        bgcolor: color.thirdColor,
                        borderRadius: 2,
                        // minWidth: "200px",
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
                          fontSize: "20px",
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              <Button
                onClick={handleOtpSubmit}
                type="submit"
                sx={{
                  background: color.thirdColor,
                  color: color.firstColor,
                  fontSize: "14px",
                  fontWeight: "bold",
                  textTransform: "none",
                  m: "auto",
                  mt: 4,
                  width: "100%",
                  display: "block",
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  borderRadius: 0,
                  py: 2,
                  boxShadow: "0px -6px 50px rgba(7, 7, 7, 0.11)",
                }}
              >
                Verify OTP
              </Button>
            </div>
          </>
        )}
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  width: "90%",
  height: 240,
  background: color.thirdColor,
  borderRadius: "12px",
  //   p: 4,
};

export default LoginOtpModal;
