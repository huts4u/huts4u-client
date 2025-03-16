import EmailIcon from "@mui/icons-material/Email";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import LanguageIcon from "@mui/icons-material/Language";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import color from "../components/color";
import CustomButton from "../components/CustomButton";
import { CustomTextField } from "../components/style";

const modalStyle = {
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 2,
  m: "auto",
  my: 4,
  boxShadow: "4px 4px 10px rgba(104, 39, 184, 0.17)",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
});

const ContactUs = ({ open, handleClose }: any) => {
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
    phone: "",
  };

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    console.log(values);
    setSubmitting(false);
    handleClose();
  };

  const contactDetails = [
    {
      icon: <LanguageIcon style={{ fontSize: 40 }} />,
      title: "Hotel Address",
      info: "25 North Street, Dubai",
    },
    {
      icon: <EmailIcon style={{ fontSize: 40 }} />,
      title: "Official Mail",
      info: "info@huts4u.com",
    },
    {
      icon: <HeadsetMicIcon style={{ fontSize: 40 }} />,
      title: "Official Phone",
      info: "+91 256-987-239",
    },
  ];

  return (
    <Box>
      {/* <div style={{ position: "relative" }}>
        <CardMedia
          component="img"
          sx={{
            height: "400px",
            width: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          image="/assets/bg.jpg"
        />
      </div> */}

      <Container
        style={{
          maxWidth: 1200,
          marginTop: "30px",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color={"white"}
          fontFamily={"CustomFontB"}
          textAlign={"center"}
          sx={{
            background: color.firstColor,
            width: "fit-content",
            px: 2,
            borderRadius: "4px",
            margin: "auto",
            mb: 4,
            // position: "absolute",
            // top: "50%",
            // left: "50%",
            // transform: "translate(-50%,-50%)",
          }}
        >
          Contact Us
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {contactDetails.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                elevation={3}
                style={{
                  textAlign: "center",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "4px 4px 10px rgba(104, 39, 184, 0.17)",
                }}
              >
                <CardContent>
                  <div
                    style={{ marginBottom: "10px", color: color.firstColor }}
                  >
                    {item.icon}
                  </div>
                  <Typography variant="subtitle1" color="textSecondary">
                    {item.title}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {item.info}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={modalStyle}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            textAlign={"center"}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              mb={1}
              width={"100%"}
              color={color.firstColor}
              fontFamily={"CustomFontB"}
            >
              Send a Message
            </Typography>
          </Box>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form
                style={{
                  marginTop: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <Box sx={{ display: "flex", gap: "6px" }}>
                  <CustomTextField
                    as={TextField}
                    label="Name"
                    name="name"
                    fullWidth
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <CustomTextField
                    as={TextField}
                    label="Phone Number"
                    name="phone"
                    fullWidth
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Box>

                <Box sx={{ display: "flex", gap: "6px" }}>
                  <CustomTextField
                    as={TextField}
                    label="Email"
                    name="email"
                    fullWidth
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <CustomTextField
                    as={TextField}
                    label="Subject"
                    name="subject"
                    fullWidth
                    error={touched.subject && Boolean(errors.subject)}
                    helperText={touched.subject && errors.subject}
                  />
                </Box>

                <CustomTextField
                  as={TextField}
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  fullWidth
                  error={touched.message && Boolean(errors.message)}
                  helperText={touched.message && errors.message}
                />

                <CustomButton customStyles={{margin:'auto'}} variant="contained" color="primary" type="submit">
                  Submit
                </CustomButton>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUs;
