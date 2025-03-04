import { Close as CloseIcon } from "@mui/icons-material";
import { Box, IconButton, Modal, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "../CustomButton";
import { CustomTextField } from "../style";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 700,
  width: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
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

const ContactUsModal = ({ open, handleClose }: any) => {
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

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="contact-us-modal">
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
                     <Typography variant="h5" fontWeight="bold" mb={1}>
         
            Contact Us
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
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

              <CustomButton variant="contained" color="primary" type="submit">
                Submit
              </CustomButton>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ContactUsModal;
