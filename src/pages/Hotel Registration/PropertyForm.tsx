import {
  Add,
  CheckBox,
  CheckBoxOutlineBlank,
  Delete,
} from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { FieldArray, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import color from "../../components/color";
import CustomButton from "../../components/CustomButton";
import { amenitiesOptions, amenityIcons } from "../../components/data";
import ImageUploader from "../../components/ImageUploader";
import { BpRadio, CustomTextField, inputSx } from "../../components/style";

const validationSchema = Yup.object().shape({
  propertyName: Yup.string().required("Required"),
  propertyType: Yup.string().required("Required"),
  propertyDescription: Yup.string().required("Required"),
  ownerMobile: Yup.string().required("Required"),
  ownerEmail: Yup.string().email("Invalid email").required("Required"),
  receptionMobile: Yup.string().required("Required"),
  receptionEmail: Yup.string().email("Invalid email").required("Required"),
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  pincode: Yup.string().required("Required"),
  landmark: Yup.string().required("Required"),
  googleBusinessPage: Yup.string().url("Invalid URL"),
  gstNo: Yup.string().required("Required"),
  panNo: Yup.string().required("Required"),
  gstCertificate: Yup.mixed(),
  panCard: Yup.mixed(),
  propertyImages: Yup.array(),
  stayType: Yup.string().required("Required"),
  rooms: Yup.array().of(
    Yup.object().shape({
      roomCategory: Yup.string().required("Required"),
      roomSize: Yup.string().required("Required"),
      rateFor1Night: Yup.string().when("$stayType", {
        is: "overnight",
        then: (schema) => schema.required("Required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      rateFor3Hour: Yup.string().when("$stayType", {
        is: "hourly",
        then: (schema) => schema.required("Required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      rateFor6Hour: Yup.string().when("$stayType", {
        is: "hourly",
        then: (schema) => schema.required("Required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      rateFor9Hour: Yup.string().when("$stayType", {
        is: "hourly",
        then: (schema) => schema.required("Required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      rateFor12Hour: Yup.string().when("$stayType", {
        is: "hourly",
        then: (schema) => schema.required("Required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      rateFor24Hour: Yup.string().when("$stayType", {
        is: "hourly",
        then: (schema) => schema.required("Required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    })
  ),
});

const PropertyForm = () => {
  const formik = useFormik({
    initialValues: {
      propertyName: "",
      propertyType: "",
      propertyDescription: "",
      ownerMobile: "",
      ownerEmail: "",
      receptionMobile: "",
      receptionEmail: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      landmark: "",
      googleBusinessPage: "",
      gstNo: "",
      panNo: "",
      gstCertificate: null,
      panCard: null,
      propertyImages: [],
      stayType: "overnight",
      rooms: [
        {
          roomCategory: "",
          roomSize: "",
          rateFor1Night: "",
          rateFor3Hour: "",
          rateFor6Hour: "",
          rateFor9Hour: "",
          rateFor12Hour: "",
          rateFor24Hour: "",
          additionalGuestRate: "",
          additionalChildRate: "",
          standardRoomOccupancy: "",
          maxRoomOccupancy: "",
          numberOfFreeChildren: "",
          amenities: [] as string[],
        },
      ],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box
      sx={{
        margin: "auto",
        minHeight: "100vh",
        p: 4,
        background: "url('/assets/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          //   maxWidth: 600,
          margin: "auto",
          padding: 3,
          background: "#f6f6f6",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.11) inset",
          borderRadius: 2,
          minHeight: "100vh",
          zIndex: 2,
          position: "relative",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Property registration Form
        </Typography>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
  <CustomTextField
    fullWidth
    label="Property Name"
    {...formik.getFieldProps("propertyName")}
    error={formik.touched.propertyName && Boolean(formik.errors.propertyName)}
    helperText={formik.touched.propertyName && formik.errors.propertyName}
  />
</Grid>
<Grid item xs={12} md={4}>
  <CustomTextField
    fullWidth
    select
    label="Property Type"
    {...formik.getFieldProps("propertyType")}
    error={formik.touched.propertyType && Boolean(formik.errors.propertyType)}
    helperText={formik.touched.propertyType && formik.errors.propertyType}
  >
    <MenuItem value="Hotel">Hotel</MenuItem>
    <MenuItem value="Resort">Resort</MenuItem>
  </CustomTextField>
</Grid>
<Grid item xs={12} md={4}>
  <CustomTextField
    sx={{
      "& .MuiInputBase-input": { resize: "vertical" },
      "& textarea": { resize: "vertical" },
    }}
    fullWidth
    label="Property Description"
    {...formik.getFieldProps("propertyDescription")}
    multiline
    rows={1}
    error={
      formik.touched.propertyDescription &&
      Boolean(formik.errors.propertyDescription)
    }
    helperText={
      formik.touched.propertyDescription && formik.errors.propertyDescription
    }
  />
</Grid>
<Grid item xs={12} md={4}>
  <CustomTextField
    fullWidth
    label="Owner Mobile"
    {...formik.getFieldProps("ownerMobile")}
    error={formik.touched.ownerMobile && Boolean(formik.errors.ownerMobile)}
    helperText={formik.touched.ownerMobile && formik.errors.ownerMobile}
  />
</Grid>
<Grid item xs={12} md={4}>
  <CustomTextField
    fullWidth
    label="Owner Email"
    {...formik.getFieldProps("ownerEmail")}
    error={formik.touched.ownerEmail && Boolean(formik.errors.ownerEmail)}
    helperText={formik.touched.ownerEmail && formik.errors.ownerEmail}
  />
</Grid>
<Grid item xs={12} md={4}>
  <CustomTextField
    fullWidth
    label="Reception Mobile"
    {...formik.getFieldProps("receptionMobile")}
    error={
      formik.touched.receptionMobile && Boolean(formik.errors.receptionMobile)
    }
    helperText={formik.touched.receptionMobile && formik.errors.receptionMobile}
  />
</Grid>
<Grid item xs={12} md={4}>
  <CustomTextField
    fullWidth
    label="Reception Email"
    {...formik.getFieldProps("receptionEmail")}
    error={
      formik.touched.receptionEmail && Boolean(formik.errors.receptionEmail)
    }
    helperText={formik.touched.receptionEmail && formik.errors.receptionEmail}
  />
</Grid>
<Grid item xs={12} md={4}>
  <CustomTextField
    fullWidth
    label="Address"
    {...formik.getFieldProps("address")}
    error={formik.touched.address && Boolean(formik.errors.address)}
    helperText={formik.touched.address && formik.errors.address}
  />
</Grid>
<Grid item xs={12} md={4}>
  <CustomTextField
    fullWidth
    label="City"
    {...formik.getFieldProps("city")}
    error={formik.touched.city && Boolean(formik.errors.city)}
    helperText={formik.touched.city && formik.errors.city}
  />
</Grid>
<Grid item xs={12} md={4}>
  <CustomTextField
    fullWidth
    label="State"
    {...formik.getFieldProps("state")}
    error={formik.touched.state && Boolean(formik.errors.state)}
    helperText={formik.touched.state && formik.errors.state}
  />
</Grid>
<Grid item xs={12} md={4}>
  <CustomTextField
    fullWidth
    label="Pincode"
    {...formik.getFieldProps("pincode")}
    error={formik.touched.pincode && Boolean(formik.errors.pincode)}
    helperText={formik.touched.pincode && formik.errors.pincode}
  />
</Grid>
<Grid item xs={12} md={4}>
  <CustomTextField
    fullWidth
    label="Landmark"
    {...formik.getFieldProps("landmark")}
    error={formik.touched.landmark && Boolean(formik.errors.landmark)}
    helperText={formik.touched.landmark && formik.errors.landmark}
  />
</Grid>
<Grid item xs={12} md={4}>
  <CustomTextField
    fullWidth
    label="Google Business Page"
    {...formik.getFieldProps("googleBusinessPage")}
    error={
      formik.touched.googleBusinessPage &&
      Boolean(formik.errors.googleBusinessPage)
    }
    helperText={
      formik.touched.googleBusinessPage && formik.errors.googleBusinessPage
    }
  />
</Grid>
<Grid item xs={12} md={4}>
  <CustomTextField
    fullWidth
    label="GST No"
    {...formik.getFieldProps("gstNo")}
    error={formik.touched.gstNo && Boolean(formik.errors.gstNo)}
    helperText={formik.touched.gstNo && formik.errors.gstNo}
  />
</Grid>
<Grid item xs={12} md={4}>
  <CustomTextField
    fullWidth
    label="PAN No"
    {...formik.getFieldProps("panNo")}
    error={formik.touched.panNo && Boolean(formik.errors.panNo)}
    helperText={formik.touched.panNo && formik.errors.panNo}
  />
</Grid>
<Grid item xs={12} md={6}>
  <ImageUploader
    label="GST Certificate"
    onFileSelect={(file) => formik.setFieldValue("gstCertificate", file)}
    // error={
    //   formik.touched.gstCertificate && Boolean(formik.errors.gstCertificate)
    // }
    // helperText={formik.touched.gstCertificate && formik.errors.gstCertificate}
  />
</Grid>
<Grid item xs={12} md={6}>
  <ImageUploader
    label="PAN Card"
    onFileSelect={(file) => formik.setFieldValue("panCard", file)}
    // error={formik.touched.panCard && Boolean(formik.errors.panCard)}
    // helperText={formik.touched.panCard && formik.errors.panCard}
  />
</Grid>
<Grid item xs={12} md={12}>
  <ImageUploader
    label="Property Images"
    multiple
    maxFiles={3}
    onFileSelect={(files) => formik.setFieldValue("propertyImages", files)}
    // error={
    //   formik.touched.propertyImages && Boolean(formik.errors.propertyImages)
    // }
    // helperText={formik.touched.propertyImages && formik.errors.propertyImages}
  />
</Grid>


              <Grid
                item
                xs={12}
                my={1}
                mb={3}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Typography variant="h5" fontWeight={"bold"} mb={2}>
                  Stay Type
                </Typography>
                <RadioGroup row {...formik.getFieldProps("stayType")}>
                  <FormControlLabel
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "18px",
                      },
                      mr: 4,
                    }}
                    value="overnight"
                    control={<BpRadio />}
                    label="Overnight"
                  />
                  <FormControlLabel
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "18px",
                      },
                    }}
                    value="hourly"
                    control={<BpRadio />}
                    label="Hourly"
                  />
                </RadioGroup>
              </Grid>
              <FieldArray
                name="rooms"
                render={(arrayHelpers) => (
                  <>
                    {formik.values.rooms.map((room, index) => (
                      <Grid
                        container
                        spacing={2}
                        key={index}
                        alignItems="center"
                        mb={2}
                      >
                        <Grid
                          style={{ paddingLeft: "30px" }}
                          item
                          xs={12}
                          md={12}
                          display={"flex"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          width={"100%"}
                          fontSize={"18px"}
                          fontWeight={"bold"}
                          mb={-1}
                          //   mt={1}
                        >
                          {formik.values.rooms.length > 1 && (
                            <>Room {index + 1}</>
                          )}

                          {formik.values.rooms.length > 1 && (
                            <IconButton
                              sx={{ color: color.firstColor }}
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <Delete />
                            </IconButton>
                          )}
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <CustomTextField
                            fullWidth
                            label="Room Category"
                            {...formik.getFieldProps(
                              `rooms.${index}.roomCategory`
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <CustomTextField
                            fullWidth
                            label="Room Size (in sqft)"
                            {...formik.getFieldProps(
                              `rooms.${index}.roomSize`
                            )}
                          />
                        </Grid>
                        {formik.values.stayType === "overnight" ? (
                          <Grid item xs={12} md={3}>
                            <CustomTextField
                              fullWidth
                              label="Rate for 1 Night"
                              {...formik.getFieldProps(
                                `rooms.${index}.rateFor1Night`
                              )}
                            />
                          </Grid>
                        ) : (
                          <>
                            <Grid item xs={12} md={3}>
                              <CustomTextField
                                fullWidth
                                label="Rate for 3 Hour Slot"
                                {...formik.getFieldProps(
                                  `rooms.${index}.rateFor3Hour`
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <CustomTextField
                                fullWidth
                                label="Rate for 6 Hour Slot"
                                {...formik.getFieldProps(
                                  `rooms.${index}.rateFor6Hour`
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <CustomTextField
                                fullWidth
                                label="Rate for 9 Hour Slot"
                                {...formik.getFieldProps(
                                  `rooms.${index}.rateFor9Hour`
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <CustomTextField
                                fullWidth
                                label="Rate for 12 Hour Slot"
                                {...formik.getFieldProps(
                                  `rooms.${index}.rateFor12Hour`
                                )}
                              />
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <CustomTextField
                                fullWidth
                                label="Rate for 24 Hour Slot"
                                {...formik.getFieldProps(
                                  `rooms.${index}.rateFor24Hour`
                                )}
                              />
                            </Grid>
                          </>
                        )}

                        <Grid item xs={12} md={3}>
                          <CustomTextField
                            fullWidth
                            label="Additional Guest Rate"
                            {...formik.getFieldProps(
                              `rooms.${index}.additionalGuestRate`
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <CustomTextField
                            fullWidth
                            label="Additional Child Rate"
                            {...formik.getFieldProps(
                              `rooms.${index}.additionalChildRate`
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <CustomTextField
                            fullWidth
                            label="Standard Room Occupancy"
                            {...formik.getFieldProps(
                              `rooms.${index}.standardRoomOccupancy`
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <CustomTextField
                            fullWidth
                            label="Max Room Occupancy"
                            {...formik.getFieldProps(
                              `rooms.${index}.maxRoomOccupancy`
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <CustomTextField
                            fullWidth
                            label="Number of Free Children"
                            {...formik.getFieldProps(
                              `rooms.${index}.numberOfFreeChildren`
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <FormControl fullWidth sx={{ ...inputSx, mb: 1 }}>
                            <InputLabel sx={{ color: color.firstColor }}>
                              Amenities
                            </InputLabel>
                            <Select
                              style={{ border: "none" }}
                              multiple
                              {...formik.getFieldProps(
                                `rooms.${index}.amenities`
                              )}
                              renderValue={(selected: string[]) =>
                                selected.join(", ")
                              }
                            >
                              {amenitiesOptions.map((amenity) => (
                                <MenuItem
                                  style={{ color: color.secondColor }}
                                  key={amenity}
                                  value={amenity}
                                >
                                  <Checkbox
                                    checkedIcon={
                                      <CheckBox
                                        style={{ color: color.secondColor }}
                                      />
                                    }
                                    icon={
                                      <CheckBoxOutlineBlank
                                        style={{ color: color.secondColor }}
                                      />
                                    }
                                    checked={formik.values.rooms[
                                      index
                                    ].amenities.includes(amenity)}
                                  />
                                  {amenityIcons[amenity] && (
                                    <ListItemIcon
                                      style={{ color: color.secondColor }}
                                    >
                                      {amenityIcons[amenity]}
                                    </ListItemIcon>
                                  )}
                                  <ListItemText primary={amenity} />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    ))}
                    <CustomButton
                      customStyles={{
                        fontSize: "14px",
                        marginLeft: "auto",
                        marginTop: "10px",
                      }}
                      variant="contained"
                      startIcon={<Add />}
                      onClick={() =>
                        arrayHelpers.push({
                          roomCategory: "",
                          rateFor3Hour: "",
                          rateFor6Hour: "",
                          rateFor9Hour: "",
                          rateFor12Hour: "",
                          rateFor24Hour: "",
                          additionalGuestRate: "",
                          additionalChildRate: "",
                          standardRoomOccupancy: "",
                          maxRoomOccupancy: "",
                          numberOfFreeChildren: "",
                          amenities: [],
                        })
                      }
                    >
                      Add Room
                    </CustomButton>
                  </>
                )}
              />
              <Grid item xs={12}>
                <CustomButton
                  customStyles={{ margin: "auto", display: "block" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit Application
                </CustomButton>
              </Grid>
            </Grid>
          </form>
        </FormikProvider>
      </Box>
    </Box>
  );
};

export default PropertyForm;
