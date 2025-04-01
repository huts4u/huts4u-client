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
  FormHelperText,
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
import { FieldArray, FormikErrors, FormikProvider, useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import color from "../../components/color";
import CustomButton from "../../components/CustomButton";
import {
  amenitiesOptions,
  amenityIcons,
  roomTypes,
} from "../../components/data";
import ImageUploader from "../../components/ImageUploader";
import { BpRadio, CustomTextField, inputSx } from "../../components/style";
import { getUserId } from "../../services/axiosClient";
import { docsUpload, editHotel, editRoom, getMyAllHotelswithBelongsTo, hotelPost, roomPost } from "../../services/services";

const validationSchema = Yup.object().shape({
  propertyName: Yup.string()
    .trim()
    .min(3, "Property name must be at least 3 characters long")
    .max(100, "Property name cannot exceed 100 characters")
    .required("Property name is required"),

  propertyType: Yup.string().trim().required("Property type is required"),

  propertyDescription: Yup.string()
    .trim()
    .min(10, "Description must be at least 10 characters long")
    .max(1000, "Description cannot exceed 1000 characters")
    .required("Property description is required"),

  ownerMobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
    .required("Owner's mobile number is required"),

  ownerEmail: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Owner's email is required"),

  receptionMobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Invalid mobile number")
    .required("Reception mobile number is required"),

  receptionEmail: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Reception email is required"),

  address: Yup.string()
    .trim()
    .min(5, "Address must be at least 5 characters long")
    .max(255, "Address cannot exceed 255 characters")
    .required("Address is required"),

  city: Yup.string().trim().required("City is required"),

  state: Yup.string().trim().required("State is required"),

  pincode: Yup.string()
    .matches(/^\d{6}$/, "Invalid pincode")
    .required("Pincode is required"),

  landmark: Yup.string()
    .trim()
    .max(255, "Landmark cannot exceed 255 characters"),

  googleBusinessPage: Yup.string().trim().url("Invalid URL"),

  gstNo: Yup.string()
    .matches(
      /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[Z]{1}[A-Z\d]{1}$/,
      "Invalid GST number"
    )
    .required("GST number is required"),

  panNo: Yup.string()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number")
    .required("PAN number is required"),

  gstCertificate: Yup.mixed().required("GST Certificate is required"),

  panCard: Yup.mixed().required("PAN Card is required"),

  propertyImages: Yup.array()
    .of(Yup.mixed().required("Each image is required"))
    .min(7, "At least seven property images are required")
    .required("Property images are required"),

  bankaccountNo: Yup.string()
    .matches(/^\d{9,18}$/, "Bank account number must be 9 to 18 digits")
    .required("Bank account number is required"),

  bankname: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "Bank name should only contain letters and spaces"
    )
    .required("Bank name is required"),

  // ifsccode: Yup.string()
  //   .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code format')
  //   .required('IFSC code is required'),

  propertyPolicies: Yup.string()
    .trim()
    .min(10, "Policy must be at least 10 characters long")
    .max(1000, "Policy cannot exceed 1000 characters")
    .required("Property policy is required"),

  stayType: Yup.string().required("Required"),
  rooms: Yup.array().of(
    Yup.object().shape({
      // roomCategory: Yup.string().required("Room category is required"),
      roomSize: Yup.string().required("Room size is required"),
      rateFor1Night: Yup.number()
        .typeError("Rate for 1 night must be a valid number")
        .when("$stayType", {
          is: "overnight",
          then: (schema) =>
            schema
              .required("Rate for 1 night is required")
              .min(100, "Minimum Rate is ₹100"),
          otherwise: (schema) => schema.notRequired(),
        }),
      rateFor3Hour: Yup.number()
        .typeError("Rate for 3 hours must be a valid number")
        .when("$stayType", {
          is: "hourly",
          then: (schema) =>
            schema
              .required("Rate for 3 hours is required")
              .min(100, "Minimum Rate is ₹100 "),
          otherwise: (schema) => schema.notRequired(),
        }),
      rateFor6Hour: Yup.number()
        .typeError("Rate for 6 hours must be a valid number")
        .when("$stayType", {
          is: "hourly",
          then: (schema) =>
            schema
              .required("Rate for 6 hours is required")
              .min(100, "Minimum Rate is ₹100 "),
          otherwise: (schema) => schema.notRequired(),
        }),

      rateFor12Hour: Yup.number()
        .typeError("Rate for 12 hours must be a valid number")
        .when("$stayType", {
          is: "hourly",
          then: (schema) =>
            schema
              .required("Rate for 12 hours is required")
              .min(100, "Minimum Rate is ₹100 "),
          otherwise: (schema) => schema.notRequired(),
        }),

      additionalGuestRate: Yup.number()
        .typeError("Additional guest rate must be a valid number")
        .required("Additional guest rate is required")
        .min(0, "Rate cannot be negative"),
      additionalChildRate: Yup.number()
        .typeError("Additional child rate must be a valid number")
        .required("Additional child rate is required")
        .min(0, "Rate cannot be negative"),
      standardRoomOccupancy: Yup.number()
        .typeError("Standard room occupancy must be a number")
        .required("Standard room occupancy is required")
        .min(1, "Must be at least 1"),
      maxRoomOccupancy: Yup.number()
        .typeError("Max room occupancy must be a number")
        .required("Max room occupancy is required")
        .min(
          Yup.ref("standardRoomOccupancy"),
          "Max occupancy must be greater than or equal to standard occupancy"
        ),
      numberOfFreeChildren: Yup.number()
        .typeError("Number of free children must be a number")
        .required("Number of free children is required")
        .min(0, "Cannot be negative"),
      numberOfRoomsAvailable: Yup.number()
        .typeError("No. of Available Rooms must be a number")
        .required("No. of available rooms are required")
        .min(0, "Cannot be negative"),
      tax: Yup.number()
        .typeError("Tax must be a number")
        .required("Tax of room is required")
        .min(0, "Cannot be negative"),
      extraFees: Yup.number()
        .typeError("Extra fees must be a number")
        .required("Extra fees is required")
        .min(0, "Cannot be negative"),
      amenities: Yup.array()
        .of(Yup.string().required("Amenity cannot be empty"))
        .min(1, "At least one amenity is required"),
      // roomImage: Yup.mixed().required("Room image is required"),
    })
  ),
});
interface Room {
  id: string;
  roomCategory: string;
  roomSize: string;
  numberOfRoomsAvailable: string;
  rateFor1Night?: string;
  rateFor3Hour?: string;
  rateFor6Hour?: string;
  rateFor9Hour?: string;
  rateFor12Hour?: string;
  rateFor24Hour?: string;
  additionalGuestRate: string;
  additionalChildRate: string;
  standardRoomOccupancy: string;
  maxRoomOccupancy: string;
  numberOfFreeChildren: string;
  tax: string;
  extraFees: string;
  amenities: string[];
  roomImage: string | null;
}
const PropertyForm = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null); // To hold a single image
  const [uploading, setUploading] = useState(false);
  const handleFileChange = async (
    file: File,
    setFieldValue: (value: string) => void
  ) => {
    if (file) {
      const formData = new FormData();
      formData.append("files", file);

      setUploading(true);
      try {
        const res = await docsUpload(formData);
        const uploadedUrl = res?.data?.data?.doc0;

        if (uploadedUrl) {
          setPreviewImage(uploadedUrl);
          setFieldValue(uploadedUrl);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleFileChange1 = async (
    files: File[],
    setFieldValue: (value: string[]) => void
  ) => {
    if (files.length) {
      const uploadedUrls: string[] = [];

      setUploading(true);
      try {
        for (const file of files) {
          const formData = new FormData();
          formData.append("files", file);

          const res = await docsUpload(formData);
          const uploadedUrl = res?.data?.data?.doc0;

          if (uploadedUrl) {
            uploadedUrls.push(uploadedUrl);
          }
        }

        if (uploadedUrls.length) {
          setFieldValue(uploadedUrls); // ✅ Set array of uploaded URLs
        }
      } catch (error) {
        console.error("Error uploading files:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const navigate = useNavigate();
  const sanitizeValue = (value: any) => (value === "" ? null : value);

  const location = useLocation();
  const id = location.state;


  // console.log(id)
  const [hotelData, setHotelData] = useState<any>({})
  useEffect(() => {
    if (id) {
      getMyAllHotelswithBelongsTo({
        id: id,
        secondTable: "Room",
      }).then((res) => {
        const data = res?.data?.data?.[0];
        // console.log(data)
        setHotelData(data);
      }
      );
    }
  }, [id])
  const isEditMode = !!hotelData?.id;


  const initialValues = useMemo(() => ({
    propertyName: hotelData?.propertyName || "",
    propertyType: hotelData?.propertyType || "",
    propertyDescription: hotelData?.propertyDesc || "",
    ownerMobile: hotelData?.ownerMobile || "",
    ownerEmail: hotelData?.ownerEmail || "",
    receptionMobile: hotelData?.receptionMobile || "",
    receptionEmail: hotelData?.receptionEmail || "",
    address: hotelData?.address || "",
    city: hotelData?.city || "",
    state: hotelData?.state || "",
    pincode: hotelData?.pincode || "",
    landmark: hotelData?.landmark || "",
    bankaccountNo: hotelData?.bankAccountNumber || "",
    bankname: hotelData?.bankName || "",
    ifsccode: hotelData?.bankIfsc || "",
    bankpassbook: hotelData?.bankPassbook || "",
    googleBusinessPage: hotelData?.googleBusinessPage || "",
    gstNo: hotelData?.gstNo || "",
    panNo: hotelData?.panNo || "",
    gstCertificate: hotelData?.gstCertificateImage || null,
    panCard: hotelData?.panCardImage || null,
    propertyImages: hotelData?.propertyImages || [],
    propertyServices: hotelData?.extraService || "",
    propertyPolicies: hotelData?.propertyPolicy || "",
    stayType: hotelData?.romms?.[0]?.stayType || "overnight",
    coupleFriendly: hotelData?.coupleFriendly || "yes",
    businessFriendly: hotelData?.businessFriendly || "yes",
    familyFriendly: hotelData?.familyFriendly || "yes",
    petFriendly: hotelData?.petFriendly || "yes",
    // rooms: [
    //   {
    //     roomCategory: "",
    //     roomSize: "",
    //     rateFor1Night: "",
    //     rateFor3Hour: "",
    //     rateFor6Hour: "",
    //     rateFor9Hour: "",
    //     rateFor12Hour: "",
    //     rateFor24Hour: "",
    //     additionalGuestRate: "",
    //     additionalChildRate: "",
    //     standardRoomOccupancy: "",
    //     maxRoomOccupancy: "",
    //     numberOfFreeChildren: "",
    //     numberOfRoomsAvailable: "",
    //     extraFees: "",
    //     tax: "",
    //     amenities: [] as string[],
    //     roomImage: null,
    //   },
    // ],
    rooms: hotelData?.rooms?.length
      ? hotelData?.rooms?.map((room: any) => ({
        id: room?.id || "",
        roomCategory: room?.roomCategory || "",
        roomSize: room?.roomSize || "",
        rateFor1Night: room?.rateFor1Night || "",
        rateFor3Hour: room?.rateFor3Hour || "",
        rateFor6Hour: room?.rateFor6Hour || "",
        rateFor9Hour: room?.rateFor9Hour || "",
        rateFor12Hour: room?.rateFor12Hour || "",
        rateFor24Hour: room?.rateFor24Hour || "",
        additionalGuestRate: room?.additionalGuestRate || "",
        additionalChildRate: room?.additionalChildRate || "",
        standardRoomOccupancy: room?.standardRoomOccupancy || "",
        maxRoomOccupancy: room?.maxRoomOccupancy || "",
        numberOfFreeChildren: room?.numberOfFreeChildren || "",
        numberOfRoomsAvailable: room?.availableRooms || "",
        extraFees: room?.extrafees || "",
        tax: room?.taxRate || "",
        amenities: room?.amenities || [],
        roomImage: room?.roomImage || null,
      }))
      : [
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
          numberOfRoomsAvailable: "",
          extraFees: "",
          tax: "",
          amenities: [],
          roomImage: null,
        },
      ],
  }), [hotelData]); // React will reinitialize Formik when hotelData changes




  const formik = useFormik({

    // initialValues: {
    //   propertyName: hotelData.propertyName || "",
    //   propertyType: "",
    //   propertyDescription: "",
    //   ownerMobile: "",
    //   ownerEmail: "",
    //   receptionMobile: "",
    //   receptionEmail: "",
    //   address: "",
    //   city: "",
    //   state: "",
    //   pincode: "",
    //   landmark: "",
    //   bankaccountNo: "",
    //   bankname: "",
    //   ifsccode: "",
    //   bankpassbook: "",
    //   googleBusinessPage: "",
    //   gstNo: "",
    //   panNo: "",
    //   gstCertificate: null,
    //   panCard: null,
    //   propertyImages: [],
    //   propertyServices: "",
    //   propertyPolicies: "",
    //   stayType: "overnight",
    //   coupleFriendly: "yes", //new
    //   businessFriendly: "yes", //new
    //   familyFriendly: "yes", //new
    //   petFriendly: "yes", //new
    //   rooms: [
    //     {
    //       roomCategory: "",
    //       roomSize: "",
    //       rateFor1Night: "",
    //       rateFor3Hour: "",
    //       rateFor6Hour: "",
    //       rateFor9Hour: "",
    //       rateFor12Hour: "",
    //       rateFor24Hour: "",
    //       additionalGuestRate: "",
    //       additionalChildRate: "",
    //       standardRoomOccupancy: "",
    //       maxRoomOccupancy: "",
    //       numberOfFreeChildren: "",
    //       numberOfRoomsAvailable: "",
    //       extraFees: "", //new
    //       tax: "", //new
    //       amenities: [] as string[],
    //       roomImage: null,
    //     },
    //   ],
    // },
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      const payLoad = {
        userId: getUserId(),
        propertyName: values.propertyName,
        propertyType: values.propertyType,
        propertyDesc: values.propertyDescription,
        ownerMobile: values.ownerMobile,
        ownerEmail: values.ownerEmail,
        receptionMobile: values.receptionMobile,
        receptionEmail: values.receptionEmail,
        address: values.address,
        city: values.city,
        state: values.state,
        pincode: values.pincode,
        landmark: values.landmark,
        googleBusinessPage: values.googleBusinessPage,
        gstNo: values.gstNo,
        panNo: values.panNo,
        gstCertificateImage: values.gstCertificate,
        panCardImage: values.panCard,
        extraService: values.propertyServices,
        bankName: values.bankname,
        bankAccountNumber: values.bankaccountNo,
        bankIfsc: values.ifsccode,
        propertyImages: values.propertyImages,
        bankPassbook: values.bankpassbook,
        propertyPolicy: values.propertyPolicies,
        coupleFriendly: values.coupleFriendly,
        petFriendly: values.petFriendly,
        familyFriendly: values.familyFriendly,
        businessFriendly: values.businessFriendly,
        status: "Pending",

      };

      const editpayLoad = {
        userId: getUserId(),
        propertyName: values.propertyName,
        propertyType: values.propertyType,
        propertyDesc: values.propertyDescription,
        ownerMobile: values.ownerMobile,
        ownerEmail: values.ownerEmail,
        receptionMobile: values.receptionMobile,
        receptionEmail: values.receptionEmail,
        address: values.address,
        city: values.city,
        state: values.state,
        pincode: values.pincode,
        landmark: values.landmark,
        googleBusinessPage: values.googleBusinessPage,
        gstNo: values.gstNo,
        panNo: values.panNo,
        gstCertificateImage: values.gstCertificate,
        panCardImage: values.panCard,
        extraService: values.propertyServices,
        bankName: values.bankname,
        bankAccountNumber: values.bankaccountNo,
        bankIfsc: values.ifsccode,
        propertyImages: values.propertyImages,
        bankPassbook: values.bankpassbook,
        propertyPolicy: values.propertyPolicies,
        coupleFriendly: values.coupleFriendly,
        petFriendly: values.petFriendly,
        familyFriendly: values.familyFriendly,
        businessFriendly: values.businessFriendly,

      };
      console.log(editpayLoad)
      if (isEditMode) {


        editHotel(hotelData?.id, editpayLoad).then(async (res) => {
          if (res?.data?.status_code) {
            const roomUpdates = values.rooms.map(async (room: any) => {
              const roomPayload = {
                hotelId: hotelData?.id,
                stayType: values.stayType,
                roomCategory: room.roomCategory,
                roomSize: room.roomSize,
                availableRooms: room.numberOfRoomsAvailable,
                rateFor1Night: sanitizeValue(room.rateFor1Night),
                rateFor3Hour: sanitizeValue(room.rateFor3Hour),
                rateFor6Hour: sanitizeValue(room.rateFor6Hour),
                rateFor9Hour: sanitizeValue(room.rateFor9Hour),
                rateFor12Hour: sanitizeValue(room.rateFor12Hour),
                rateFor24Hour: sanitizeValue(room.rateFor24Hour),
                additionalGuestRate: sanitizeValue(room.additionalGuestRate),
                additionalChildRate: sanitizeValue(room.additionalChildRate),
                standardRoomOccupancy: room.standardRoomOccupancy,
                maxRoomOccupancy: room.maxRoomOccupancy,
                numberOfFreeChildren: room.numberOfFreeChildren,
                taxRate: room.tax,
                extrafees: room.extraFees,
                amenities: room.amenities,
                roomImages: room.roomImage,
              };

              console.log(room.id)
              // Check if room exists (has ID) or is new
              if (room.id) {
                return editRoom(room.id, roomPayload);
              }
            });

            const roomResponse = await Promise.all(roomUpdates);
            console.log(roomResponse)
            if (roomResponse) {
              toast.success("Hotel and rooms updated successfully!");
            }

          }

        })
      } else {

        hotelPost(payLoad)
          .then((res) => {
            if (res?.data?.data?.id) {
              const roomPayload = values.rooms.map((room: any) => ({
                hotelId: res?.data?.data?.id,
                stayType: values.stayType,
                roomCategory: room.roomCategory,
                roomSize: room.roomSize,
                availableRooms: room.numberOfRoomsAvailable,
                rateFor1Night: sanitizeValue(room.rateFor1Night),
                rateFor3Hour: sanitizeValue(room.rateFor3Hour),
                rateFor6Hour: sanitizeValue(room.rateFor6Hour),
                rateFor12Hour: sanitizeValue(room.rateFor12Hour),
                additionalGuestRate: sanitizeValue(room.additionalGuestRate),
                additionalChildRate: sanitizeValue(room.additionalChildRate),
                standardRoomOccupancy: room.standardRoomOccupancy,
                maxRoomOccupancy: room.maxRoomOccupancy,
                numberOfFreeChildren: room.numberOfFreeChildren,
                taxRate: room.tax,
                extrafees: room.extraFees,
                amenities: room.amenities,
                roomImages: room.roomImage,
              }));
              console.log(roomPayload);
              roomPost(roomPayload)
                .then((res) => {
                  toast(res?.data?.msg);
                  navigate("/hotel-applications");
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });

  const hotelFeatures = [
    { label: "Couple Friendly", name: "coupleFriendly" },
    { label: "Pet Friendly", name: "petFriendly" },
    { label: "Family Friendly", name: "familyFriendly" },
    { label: "Business Friendly", name: "businessFriendly" },
  ];

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
          margin: "auto",
          padding: 3,
          pb: 6,
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
                  error={
                    formik.touched.propertyName &&
                    Boolean(formik.errors.propertyName)
                  }
                  helperText={
                    formik.touched.propertyName && typeof formik.errors.propertyName === "string"
                      ? formik.errors.propertyName
                      : undefined
                  }

                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  fullWidth
                  select
                  label="Property Type"
                  {...formik.getFieldProps("propertyType")}
                  error={
                    formik.touched.propertyType &&
                    Boolean(formik.errors.propertyType)
                  }
                  helperText={
                    formik.touched.propertyType && typeof formik.errors.propertyType === "string"
                      ? formik.errors.propertyType
                      : undefined
                  }
                >
                  <MenuItem value="Hotel">Hotel</MenuItem>
                  <MenuItem value="Villa">Villa</MenuItem>
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
                    formik.touched.propertyDescription &&
                      typeof formik.errors.propertyDescription === "string"
                      ? formik.errors.propertyDescription
                      : undefined
                  }
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <CustomTextField
                  fullWidth
                  label="Owner Mobile"
                  {...formik.getFieldProps("ownerMobile")}
                  error={
                    formik.touched.ownerMobile &&
                    Boolean(formik.errors.ownerMobile)
                  }
                  helperText={
                    formik.touched.ownerMobile && typeof formik.errors.ownerMobile === "string"
                      ? formik.errors.ownerMobile
                      : undefined
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  fullWidth
                  label="Owner Email"
                  {...formik.getFieldProps("ownerEmail")}
                  error={
                    formik.touched.ownerEmail &&
                    Boolean(formik.errors.ownerEmail)
                  }
                  helperText={
                    formik.touched.ownerEmail && typeof formik.errors.ownerEmail === "string"
                      ? formik.errors.ownerEmail
                      : undefined
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  fullWidth
                  label="Reception Mobile"
                  {...formik.getFieldProps("receptionMobile")}
                  error={
                    formik.touched.receptionMobile &&
                    Boolean(formik.errors.receptionMobile)
                  }
                  helperText={
                    formik.touched.receptionMobile && typeof formik.errors.receptionMobile === "string"
                      ? formik.errors.receptionMobile
                      : undefined
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  fullWidth
                  label="Reception Email"
                  {...formik.getFieldProps("receptionEmail")}
                  error={
                    formik.touched.receptionEmail &&
                    Boolean(formik.errors.receptionEmail)
                  }
                  helperText={
                    formik.touched.receptionEmail && typeof formik.errors.receptionEmail === "string"
                      ? formik.errors.receptionEmail
                      : undefined
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  placeholder="Enter the complete property address to enable accurate user searches"
                  fullWidth
                  label="Address"
                  {...formik.getFieldProps("address")}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={
                    formik.touched.address && typeof formik.errors.address === "string"
                      ? formik.errors.address
                      : undefined
                  }
                  sx={{
                    "& .MuiInputBase-input": { resize: "vertical" },
                    "& textarea": { resize: "vertical" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                  }}
                  multiline
                  rows={1}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,\s*/g, ", ");
                    formik.setFieldValue("address", value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  fullWidth
                  label="City"
                  {...formik.getFieldProps("city")}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={
                    formik.touched.city && typeof formik.errors.city === "string"
                      ? formik.errors.city
                      : undefined
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  fullWidth
                  label="State"
                  {...formik.getFieldProps("state")}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={
                    formik.touched.state && typeof formik.errors.state === "string"
                      ? formik.errors.state
                      : undefined
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  fullWidth
                  label="Pincode"
                  {...formik.getFieldProps("pincode")}
                  error={
                    formik.touched.pincode && Boolean(formik.errors.pincode)
                  }
                  helperText={
                    formik.touched.pincode && typeof formik.errors.pincode === "string"
                      ? formik.errors.pincode
                      : undefined
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  fullWidth
                  label="Landmark"
                  {...formik.getFieldProps("landmark")}
                  error={
                    formik.touched.landmark && Boolean(formik.errors.landmark)
                  }
                  helperText={
                    formik.touched.landmark && typeof formik.errors.landmark === "string"
                      ? formik.errors.landmark
                      : undefined
                  }
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
                    formik.touched.googleBusinessPage && typeof formik.errors.googleBusinessPage === "string"
                      ? formik.errors.googleBusinessPage
                      : undefined
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  fullWidth
                  label="GST No"
                  {...formik.getFieldProps("gstNo")}
                  error={formik.touched.gstNo && Boolean(formik.errors.gstNo)}
                  helperText={
                    formik.touched.gstNo && typeof formik.errors.gstNo === "string"
                      ? formik.errors.gstNo
                      : undefined
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  fullWidth
                  label="PAN No"
                  {...formik.getFieldProps("panNo")}
                  error={formik.touched.panNo && Boolean(formik.errors.panNo)}
                  helperText={
                    formik.touched.panNo && typeof formik.errors.panNo === "string"
                      ? formik.errors.panNo
                      : undefined
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  fullWidth
                  label="Bank Name"
                  {...formik.getFieldProps("bankname")}
                  error={
                    formik.touched.bankname && Boolean(formik.errors.bankname)
                  }
                  helperText={
                    formik.touched.bankname && typeof formik.errors.bankname === "string"
                      ? formik.errors.bankname
                      : undefined
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  fullWidth
                  label="Bank Acc No."
                  {...formik.getFieldProps("bankaccountNo")}
                  error={
                    formik.touched.bankaccountNo &&
                    Boolean(formik.errors.bankaccountNo)
                  }
                  helperText={
                    formik.touched.bankaccountNo && typeof formik.errors.bankaccountNo === "string"
                      ? formik.errors.bankaccountNo
                      : undefined
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <CustomTextField
                  fullWidth
                  label="IFSC Code"
                  {...formik.getFieldProps("ifsccode")}
                  error={
                    formik.touched.ifsccode && Boolean(formik.errors.ifsccode)
                  }
                  helperText={
                    formik.touched.ifsccode && typeof formik.errors.ifsccode === "string"
                      ? formik.errors.ifsccode
                      : undefined
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ImageUploader
                  label="GST Certificate"
                  onFileSelect={(file) =>
                    handleFileChange(file as any, (value) =>
                      formik.setFieldValue("gstCertificate", value)
                    )
                  }
                />
                {formik.touched.gstCertificate &&
                  formik.errors.gstCertificate && (
                    <Typography color="error" variant="caption">
                      {typeof formik.errors.gstCertificate === "string"
                        ? formik.errors.gstCertificate
                        : "Invalid GST Certificate"}
                    </Typography>
                  )}
              </Grid>

              <Grid item xs={12} md={6}>
                <ImageUploader
                  label="PAN Card"
                  onFileSelect={(file) =>
                    handleFileChange(file as any, (value) =>
                      formik.setFieldValue("panCard", value)
                    )
                  }
                />
                {formik.touched.panCard && formik.errors.panCard && (
                  <Typography color="error" variant="caption">
                    {typeof formik.errors.panCard === "string"
                      ? formik.errors.panCard
                      : "Invalid PAN Card"}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} md={12}>
                <ImageUploader
                  label="Bank Passbook"
                  onFileSelect={(file) =>
                    handleFileChange(file as any, (value) =>
                      formik.setFieldValue("bankpassbook", value)
                    )
                  }
                />
                {formik.touched.bankpassbook && formik.errors.bankpassbook && (
                  <Typography color="error" variant="caption">
                    {typeof formik.errors.bankpassbook === "string"
                      ? formik.errors.bankpassbook
                      : "Invalid bank passbook"}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} md={6} mt={2}>
                <CustomTextField
                  sx={{
                    "& .MuiInputBase-input": { resize: "vertical" },
                    "& textarea": { resize: "vertical" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                        borderRadius: "12px",
                      },
                    },
                  }}
                  fullWidth
                  label="Extra Services"
                  {...formik.getFieldProps("propertyServices")}
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} md={6} mt={2}>
                <CustomTextField
                  sx={{
                    "& .MuiInputBase-input": { resize: "vertical" },
                    "& textarea": { resize: "vertical" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                        borderRadius: "12px",
                      },
                    },
                  }}
                  fullWidth
                  label="Property Policies"
                  {...formik.getFieldProps("propertyPolicies")}
                  multiline
                  rows={4}
                  error={
                    formik.touched.propertyPolicies &&
                    Boolean(formik.errors.propertyPolicies)
                  }
                  helperText={
                    formik.touched.propertyPolicies &&
                      typeof formik.errors.propertyPolicies === "string"
                      ? formik.errors.propertyPolicies
                      : undefined
                  }
                />
              </Grid>

              <Grid container spacing={2}>
                {hotelFeatures.map((feature) => (
                  <Grid
                    item
                    xs={12}
                    md={3}
                    my={3}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    key={feature.name}
                  >
                    <Typography variant="h6" fontWeight="bold" mb={1}>
                      {feature.label}
                    </Typography>
                    <RadioGroup row {...formik.getFieldProps(feature.name)}>
                      {["yes", "no"].map((option) => (
                        <FormControlLabel
                          key={option}
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                            },
                            ...(option === "yes" && { mr: 4 }),
                          }}
                          value={option}
                          control={<BpRadio />}
                          label={
                            option.charAt(0).toUpperCase() + option.slice(1)
                          }
                        />
                      ))}
                    </RadioGroup>
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={12} md={12}>
                <ImageUploader
                  label="Property Images"
                  multiple
                  maxFiles={20}
                  onFileSelect={(file) =>
                    handleFileChange1(file as any, (value) =>
                      formik.setFieldValue("propertyImages", value)
                    )
                  }
                />
                {formik.touched.propertyImages &&
                  formik.errors.propertyImages && (
                    <Typography color="error" variant="caption">
                      {typeof formik.errors.propertyImages === "string"
                        ? formik.errors.propertyImages
                        : "Invalid property images"}
                    </Typography>
                  )}
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
                    {/* {formik.values.rooms.map((room:any, index: number) => (
                      <Grid
                        container
                        spacing={2}
                        key={index}
                        alignItems="center"
                        mb={2}
                        px={2}
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
>
  {formik.values.rooms.length > 1 && <>Room {index + 1}</>}

  {formik.values.rooms.length > 1 && (
    <IconButton sx={{ color: color.firstColor }} onClick={() => arrayHelpers.remove(index)}>
      <Delete />
    </IconButton>
  )}
</Grid>

<Grid item xs={12} md={3}>
  <CustomTextField
    fullWidth
    select
    label="Room Category"
    {...formik.getFieldProps(`rooms.${index}.roomCategory`)}
    error={
      formik.touched.rooms?.[index]?.roomCategory &&
      Boolean(formik.errors.rooms?.[index]?.roomCategory)
    }
    helperText={
      formik.touched.rooms?.[index]?.roomCategory &&
      formik.errors.rooms?.[index]?.roomCategory
    }
    SelectProps={{
      renderValue: (selected) => {
        const selectedRoom = roomTypes.find((room) => room.value === selected);
        return selectedRoom ? selectedRoom.label : "";
      },
    }}
  >
    {roomTypes.map((room) => (
      <MenuItem key={room.value} value={room.value}>
        <div>
          <Typography variant="body1" fontWeight="bold">
            {room.label}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {room.details}
          </Typography>
        </div>
      </MenuItem>
    ))}
  </CustomTextField>
</Grid>

<Grid item xs={12} md={3}>
  <CustomTextField
    fullWidth
    label="Room Size (in sqft)"
    {...formik.getFieldProps(`rooms.${index}.roomSize`)}
    error={
      Array.isArray(formik.touched.rooms) &&
      formik.touched.rooms[index] &&
      Boolean(formik.errors.rooms?.[index]?.roomSize)
    }
    helperText={
      Array.isArray(formik.touched.rooms) &&
      formik.touched.rooms[index] &&
      formik.errors.rooms?.[index]?.roomSize
    }
  />
</Grid>

<Grid item xs={12} md={3}>
  <CustomTextField
    fullWidth
    label="Available Rooms"
    {...formik.getFieldProps(`rooms.${index}.numberOfRoomsAvailable`)}
    error={
      Array.isArray(formik.touched.rooms) &&
      formik.touched.rooms[index] &&
      Boolean(formik.errors.rooms?.[index]?.numberOfRoomsAvailable)
    }
    helperText={
      Array.isArray(formik.touched.rooms) &&
      formik.touched.rooms[index] &&
      formik.errors.rooms?.[index]?.numberOfRoomsAvailable
    }
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
                              error={
                                formik.touched.rooms?.[index]?.rateFor1Night &&
                                Array.isArray(formik.errors.rooms) &&
                                Boolean(
                                  (
                                    formik.errors.rooms as FormikErrors<
                                      typeof formik.values.rooms
                                    >
                                  )[index]?.rateFor1Night
                                )
                              }
                              helperText={
                                formik.touched.rooms?.[index]?.rateFor1Night &&
                                Array.isArray(formik.errors.rooms) &&
                                (
                                  formik.errors.rooms as FormikErrors<
                                    typeof formik.values.rooms
                                  >
                                )[index]?.rateFor1Night
                              }
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
                                error={
                                  formik.touched.rooms?.[index]?.rateFor3Hour &&
                                  Array.isArray(formik.errors.rooms) &&
                                  Boolean(
                                    (
                                      formik.errors.rooms as FormikErrors<
                                        typeof formik.values.rooms
                                      >
                                    )[index]?.rateFor3Hour
                                  )
                                }
                                helperText={
                                  formik.touched.rooms?.[index]?.rateFor3Hour &&
                                  Array.isArray(formik.errors.rooms) &&
                                  (
                                    formik.errors.rooms as FormikErrors<
                                      typeof formik.values.rooms
                                    >
                                  )[index]?.rateFor3Hour
                                }
                              />
                            </Grid>

                            <Grid item xs={12} md={3}>
                              <CustomTextField
                                fullWidth
                                label="Rate for 6 Hour Slot"
                                {...formik.getFieldProps(
                                  `rooms.${index}.rateFor6Hour`
                                )}
                                error={
                                  formik.touched.rooms?.[index]?.rateFor6Hour &&
                                  Array.isArray(formik.errors.rooms) &&
                                  Boolean(
                                    (
                                      formik.errors.rooms as FormikErrors<
                                        typeof formik.values.rooms
                                      >
                                    )[index]?.rateFor6Hour
                                  )
                                }
                                helperText={
                                  formik.touched.rooms?.[index]?.rateFor6Hour &&
                                  Array.isArray(formik.errors.rooms) &&
                                  (
                                    formik.errors.rooms as FormikErrors<
                                      typeof formik.values.rooms
                                    >
                                  )[index]?.rateFor6Hour
                                }
                              />
                            </Grid>

                            <Grid item xs={12} md={3}>
                              <CustomTextField
                                fullWidth
                                label="Rate for 9 Hour Slot"
                                {...formik.getFieldProps(
                                  `rooms.${index}.rateFor9Hour`
                                )}
                                error={
                                  formik.touched.rooms?.[index]?.rateFor9Hour &&
                                  Array.isArray(formik.errors.rooms) &&
                                  Boolean(
                                    (
                                      formik.errors.rooms as FormikErrors<
                                        typeof formik.values.rooms
                                      >
                                    )[index]?.rateFor9Hour
                                  )
                                }
                                helperText={
                                  formik.touched.rooms?.[index]?.rateFor9Hour &&
                                  Array.isArray(formik.errors.rooms) &&
                                  (
                                    formik.errors.rooms as FormikErrors<
                                      typeof formik.values.rooms
                                    >
                                  )[index]?.rateFor9Hour
                                }
                              />
                            </Grid>

                            <Grid item xs={12} md={3}>
                              <CustomTextField
                                fullWidth
                                label="Rate for 12 Hour Slot"
                                {...formik.getFieldProps(
                                  `rooms.${index}.rateFor12Hour`
                                )}
                                error={
                                  formik.touched.rooms?.[index]
                                    ?.rateFor12Hour &&
                                  Array.isArray(formik.errors.rooms) &&
                                  Boolean(
                                    (
                                      formik.errors.rooms as FormikErrors<
                                        typeof formik.values.rooms
                                      >
                                    )[index]?.rateFor12Hour
                                  )
                                }
                                helperText={
                                  formik.touched.rooms?.[index]
                                    ?.rateFor12Hour &&
                                  Array.isArray(formik.errors.rooms) &&
                                  (
                                    formik.errors.rooms as FormikErrors<
                                      typeof formik.values.rooms
                                    >
                                  )[index]?.rateFor12Hour
                                }
                              />
                            </Grid>

                            <Grid item xs={12} md={3}>
                              <CustomTextField
                                fullWidth
                                label="Rate for 24 Hour Slot"
                                {...formik.getFieldProps(
                                  `rooms.${index}.rateFor24Hour`
                                )}
                                error={
                                  formik.touched.rooms?.[index]
                                    ?.rateFor24Hour &&
                                  Array.isArray(formik.errors.rooms) &&
                                  Boolean(
                                    (
                                      formik.errors.rooms as FormikErrors<
                                        typeof formik.values.rooms
                                      >
                                    )[index]?.rateFor24Hour
                                  )
                                }
                                helperText={
                                  formik.touched.rooms?.[index]
                                    ?.rateFor24Hour &&
                                  Array.isArray(formik.errors.rooms) &&
                                  (
                                    formik.errors.rooms as FormikErrors<
                                      typeof formik.values.rooms
                                    >
                                  )[index]?.rateFor24Hour
                                }
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
                            error={
                              formik.touched.rooms?.[index]
                                ?.additionalGuestRate &&
                              Array.isArray(formik.errors.rooms) &&
                              Boolean(
                                (
                                  formik.errors.rooms as FormikErrors<
                                    typeof formik.values.rooms
                                  >
                                )[index]?.additionalGuestRate
                              )
                            }
                            helperText={
                              formik.touched.rooms?.[index]
                                ?.additionalGuestRate &&
                              Array.isArray(formik.errors.rooms) &&
                              (
                                formik.errors.rooms as FormikErrors<
                                  typeof formik.values.rooms
                                >
                              )[index]?.additionalGuestRate
                            }
                          />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <CustomTextField
                            fullWidth
                            label="Additional Child Rate"
                            {...formik.getFieldProps(
                              `rooms.${index}.additionalChildRate`
                            )}
                            error={
                              formik.touched.rooms?.[index]
                                ?.additionalChildRate &&
                              Array.isArray(formik.errors.rooms) &&
                              Boolean(
                                (
                                  formik.errors.rooms as FormikErrors<
                                    typeof formik.values.rooms
                                  >
                                )[index]?.additionalChildRate
                              )
                            }
                            helperText={
                              formik.touched.rooms?.[index]
                                ?.additionalChildRate &&
                              Array.isArray(formik.errors.rooms) &&
                              (
                                formik.errors.rooms as FormikErrors<
                                  typeof formik.values.rooms
                                >
                              )[index]?.additionalChildRate
                            }
                          />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <CustomTextField
                            fullWidth
                            label="Standard Room Occupancy"
                            {...formik.getFieldProps(
                              `rooms.${index}.standardRoomOccupancy`
                            )}
                            error={
                              formik.touched.rooms?.[index]
                                ?.standardRoomOccupancy &&
                              Array.isArray(formik.errors.rooms) &&
                              Boolean(
                                (
                                  formik.errors.rooms as FormikErrors<
                                    typeof formik.values.rooms
                                  >
                                )[index]?.standardRoomOccupancy
                              )
                            }
                            helperText={
                              formik.touched.rooms?.[index]
                                ?.standardRoomOccupancy &&
                              Array.isArray(formik.errors.rooms) &&
                              (
                                formik.errors.rooms as FormikErrors<
                                  typeof formik.values.rooms
                                >
                              )[index]?.standardRoomOccupancy
                            }
                          />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <CustomTextField
                            fullWidth
                            label="Max Room Occupancy"
                            {...formik.getFieldProps(
                              `rooms.${index}.maxRoomOccupancy`
                            )}
                            error={
                              formik.touched.rooms?.[index]?.maxRoomOccupancy &&
                              Array.isArray(formik.errors.rooms) &&
                              Boolean(
                                (
                                  formik.errors.rooms as FormikErrors<
                                    typeof formik.values.rooms
                                  >
                                )[index]?.maxRoomOccupancy
                              )
                            }
                            helperText={
                              formik.touched.rooms?.[index]?.maxRoomOccupancy &&
                              Array.isArray(formik.errors.rooms) &&
                              (
                                formik.errors.rooms as FormikErrors<
                                  typeof formik.values.rooms
                                >
                              )[index]?.maxRoomOccupancy
                            }
                          />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <CustomTextField
                            fullWidth
                            label="Number of Free Children"
                            {...formik.getFieldProps(
                              `rooms.${index}.numberOfFreeChildren`
                            )}
                            error={
                              formik.touched.rooms?.[index]
                                ?.numberOfFreeChildren &&
                              Array.isArray(formik.errors.rooms) &&
                              Boolean(
                                (
                                  formik.errors.rooms as FormikErrors<
                                    typeof formik.values.rooms
                                  >
                                )[index]?.numberOfFreeChildren
                              )
                            }
                            helperText={
                              formik.touched.rooms?.[index]
                                ?.numberOfFreeChildren &&
                              Array.isArray(formik.errors.rooms) &&
                              (
                                formik.errors.rooms as FormikErrors<
                                  typeof formik.values.rooms
                                >
                              )[index]?.numberOfFreeChildren
                            }
                          />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <CustomTextField
                            fullWidth
                            label="Tax Rate"
                            {...formik.getFieldProps(`rooms.${index}.tax`)}
                            error={
                              formik.touched.rooms?.[index]?.tax &&
                              Array.isArray(formik.errors.rooms) &&
                              Boolean(
                                (
                                  formik.errors.rooms as FormikErrors<
                                    typeof formik.values.rooms
                                  >
                                )[index]?.tax
                              )
                            }
                            helperText={
                              formik.touched.rooms?.[index]?.tax &&
                              Array.isArray(formik.errors.rooms) &&
                              (
                                formik.errors.rooms as FormikErrors<
                                  typeof formik.values.rooms
                                >
                              )[index]?.tax
                            }
                          />
                        </Grid>

                        <Grid item xs={12} md={3}>
                          <CustomTextField
                            fullWidth
                            label="Extra Fees"
                            {...formik.getFieldProps(
                              `rooms.${index}.extraFees`
                            )}
                            error={
                              formik.touched.rooms?.[index]?.extraFees &&
                              Array.isArray(formik.errors.rooms) &&
                              Boolean(
                                (
                                  formik.errors.rooms as FormikErrors<
                                    typeof formik.values.rooms
                                  >
                                )[index]?.extraFees
                              )
                            }
                            helperText={
                              formik.touched.rooms?.[index]?.extraFees &&
                              Array.isArray(formik.errors.rooms) &&
                              (
                                formik.errors.rooms as FormikErrors<
                                  typeof formik.values.rooms
                                >
                              )[index]?.extraFees
                            }
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
                          {formik.touched.rooms?.[index]?.amenities &&
                            formik.touched.rooms?.[index]?.amenities &&
                            Array.isArray(formik.errors.rooms) &&
                            (
                              formik.errors.rooms as FormikErrors<
                                typeof formik.values.rooms
                              >
                            )[index]?.amenities && (
                              <FormHelperText
                                sx={{ color: "#d32f2f", pl: 2, mt: -1 }}
                              >
                                {formik.touched.rooms?.[index]?.amenities &&
                                  Array.isArray(formik.errors.rooms) &&
                                  (
                                    formik.errors.rooms as FormikErrors<
                                      typeof formik.values.rooms
                                    >
                                  )[index]?.amenities}
                              </FormHelperText>
                            )}
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <ImageUploader
                            label="Room Image"
                            onFileSelect={(file) =>
                              handleFileChange(file as File, (value) =>
                                formik.setFieldValue(
                                  `rooms.${index}.roomImage`,
                                  value
                                )
                              )
                            }
                          />
                          {formik.touched.rooms?.[index]?.roomImage &&
                            formik.touched.rooms?.[index]?.roomImage &&
                            Array.isArray(formik.errors.rooms) &&
                            (
                              formik.errors.rooms as FormikErrors<
                                typeof formik.values.rooms
                              >
                            )[index]?.roomImage && (
                              <FormHelperText
                                sx={{ color: "#d32f2f", pl: 2, mt: -1 }}
                              >
                                {formik.touched.rooms?.[index]?.roomImage &&
                                  Array.isArray(formik.errors.rooms) &&
                                  (
                                    formik.errors.rooms as FormikErrors<
                                      typeof formik.values.rooms
                                    >
                                  )[index]?.roomImage}
                              </FormHelperText>
                            )}
                        </Grid>
                      </Grid>
                    ))} */}

                    {formik.values.rooms.map((room: any, index: number) => {
                      // Type-safe error helper
                      const getFieldProps = <T extends keyof Room>(field: T) => {
                        const touched = Array.isArray(formik.touched.rooms) ? formik.touched.rooms[index]?.[field] : false;
                        const error = Array.isArray(formik.errors.rooms) ? (formik.errors.rooms[index] as Record<string, string>)?.[field] : undefined;

                        return {
                          touched,
                          error,
                          fieldProps: formik.getFieldProps(`rooms.${index}.${field}`),
                        };
                      };

                      return (
                        <Grid container spacing={2} key={index} alignItems="center" mb={2} px={2}>
                          {/* Room header */}
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
                          >
                            {formik.values.rooms.length > 1 && <>Room {index + 1}</>}
                            {formik.values.rooms.length > 1 && (
                              <IconButton sx={{ color: color.firstColor }} onClick={() => arrayHelpers.remove(index)}>
                                <Delete />
                              </IconButton>
                            )}
                          </Grid>

                          {/* Room Category */}
                          <Grid item xs={12} md={3}>
                            <CustomTextField
                              fullWidth
                              select
                              label="Room Category"
                              {...getFieldProps('roomCategory').fieldProps}
                              error={Boolean(getFieldProps('roomCategory').touched && getFieldProps('roomCategory').error)}
                              helperText={getFieldProps('roomCategory').touched && getFieldProps('roomCategory').error}
                              SelectProps={{
                                renderValue: (selected) => {
                                  const selectedRoom = roomTypes.find((room) => room.value === selected);
                                  return selectedRoom ? selectedRoom.label : "";
                                },
                              }}
                            >
                              {roomTypes.map((room) => (
                                <MenuItem key={room.value} value={room.value}>
                                  <div>
                                    <Typography variant="body1" fontWeight="bold">
                                      {room.label}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                      {room.details}
                                    </Typography>
                                  </div>
                                </MenuItem>
                              ))}
                            </CustomTextField>
                          </Grid>

                          {/* Room Size */}
                          <Grid item xs={12} md={3}>
                            <CustomTextField
                              fullWidth
                              label="Room Size (in sqft)"
                              {...getFieldProps('roomSize').fieldProps}
                              error={Boolean(getFieldProps('roomSize').touched && getFieldProps('roomSize').error)}
                              helperText={getFieldProps('roomSize').touched && getFieldProps('roomSize').error}
                            />
                          </Grid>

                          {/* Available Rooms */}
                          <Grid item xs={12} md={3}>
                            <CustomTextField
                              fullWidth
                              label="Available Rooms"
                              {...getFieldProps('numberOfRoomsAvailable').fieldProps}
                              error={Boolean(getFieldProps('numberOfRoomsAvailable').touched && getFieldProps('numberOfRoomsAvailable').error)}
                              helperText={getFieldProps('numberOfRoomsAvailable').touched && getFieldProps('numberOfRoomsAvailable').error}
                            />
                          </Grid>

                          {/* Conditional Rate Fields */}
                          {formik.values.stayType === "overnight" ? (
                            <Grid item xs={12} md={3}>
                              <CustomTextField
                                fullWidth
                                label="Rate for 1 Night"
                                {...getFieldProps('rateFor1Night').fieldProps}
                                error={Boolean(getFieldProps('rateFor1Night').touched && getFieldProps('rateFor1Night').error)}
                                helperText={getFieldProps('rateFor1Night').touched && getFieldProps('rateFor1Night').error}
                              />
                            </Grid>
                          ) : (
                            <>
                              <Grid item xs={12} md={3}>
                                <CustomTextField
                                  fullWidth
                                  label="Rate for 3 Hour Slot"
                                  {...getFieldProps('rateFor3Hour').fieldProps}
                                  error={Boolean(getFieldProps('rateFor3Hour').touched && getFieldProps('rateFor3Hour').error)}
                                  helperText={getFieldProps('rateFor3Hour').touched && getFieldProps('rateFor3Hour').error}
                                />
                              </Grid>

                              {/* Repeat for other hourly rates (6, 9, 12, 24) */}
                              <Grid item xs={12} md={3}>
                                <CustomTextField
                                  fullWidth
                                  label="Rate for 6 Hour Slot"
                                  {...getFieldProps('rateFor6Hour').fieldProps}
                                  error={Boolean(getFieldProps('rateFor6Hour').touched && getFieldProps('rateFor6Hour').error)}
                                  helperText={getFieldProps('rateFor6Hour').touched && getFieldProps('rateFor6Hour').error}
                                />
                              </Grid>
                              <Grid item xs={12} md={3}>
                                <CustomTextField
                                  fullWidth
                                  label="Rate for 12 Hour Slot"
                                  {...getFieldProps('rateFor12Hour').fieldProps}
                                  error={Boolean(getFieldProps('rateFor12Hour').touched && getFieldProps('rateFor12Hour').error)}
                                  helperText={getFieldProps('rateFor12Hour').touched && getFieldProps('rateFor12Hour').error}
                                />
                              </Grid>

                              {/* Continue with 9, 12, 24 hour slots... */}
                            </>
                          )}

                          {/* Additional Rates */}
                          <Grid item xs={12} md={3}>
                            <CustomTextField
                              fullWidth
                              label="Additional Guest Rate"
                              {...getFieldProps('additionalGuestRate').fieldProps}
                              error={Boolean(getFieldProps('additionalGuestRate').touched && getFieldProps('additionalGuestRate').error)}
                              helperText={getFieldProps('additionalGuestRate').touched && getFieldProps('additionalGuestRate').error}
                            />
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <CustomTextField
                              fullWidth
                              label="Additional Child Rate"
                              {...getFieldProps('additionalChildRate').fieldProps}
                              error={Boolean(getFieldProps('additionalChildRate').touched && getFieldProps('additionalChildRate').error)}
                              helperText={getFieldProps('additionalChildRate').touched && getFieldProps('additionalChildRate').error}
                            />
                          </Grid>

                          {/* Occupancy Fields */}
                          <Grid item xs={12} md={3}>
                            <CustomTextField
                              fullWidth
                              label="Standard Room Occupancy"
                              {...getFieldProps('standardRoomOccupancy').fieldProps}
                              error={Boolean(getFieldProps('standardRoomOccupancy').touched && getFieldProps('standardRoomOccupancy').error)}
                              helperText={getFieldProps('standardRoomOccupancy').touched && getFieldProps('standardRoomOccupancy').error}
                            />
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <CustomTextField
                              fullWidth
                              label="Max Room Occupancy"
                              {...getFieldProps('maxRoomOccupancy').fieldProps}
                              error={Boolean(getFieldProps('maxRoomOccupancy').touched && getFieldProps('maxRoomOccupancy').error)}
                              helperText={getFieldProps('maxRoomOccupancy').touched && getFieldProps('maxRoomOccupancy').error}
                            />
                          </Grid>

                          {/* Other Fields */}
                          <Grid item xs={12} md={3}>
                            <CustomTextField
                              fullWidth
                              label="Number of Free Children"
                              {...getFieldProps('numberOfFreeChildren').fieldProps}
                              error={Boolean(getFieldProps('numberOfFreeChildren').touched && getFieldProps('numberOfFreeChildren').error)}
                              helperText={getFieldProps('numberOfFreeChildren').touched && getFieldProps('numberOfFreeChildren').error}
                            />
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <CustomTextField
                              fullWidth
                              label="Tax Rate"
                              {...getFieldProps('tax').fieldProps}
                              error={Boolean(getFieldProps('tax').touched && getFieldProps('tax').error)}
                              helperText={getFieldProps('tax').touched && getFieldProps('tax').error}
                            />
                          </Grid>

                          <Grid item xs={12} md={3}>
                            <CustomTextField
                              fullWidth
                              label="Extra Fees"
                              {...getFieldProps('extraFees').fieldProps}
                              error={Boolean(getFieldProps('extraFees').touched && getFieldProps('extraFees').error)}
                              helperText={getFieldProps('extraFees').touched && getFieldProps('extraFees').error}
                            />
                          </Grid>

                          {/* Amenities */}
                          <Grid item xs={12} md={3}>
                            <FormControl fullWidth sx={{ ...inputSx, mb: 1 }}>
                              <InputLabel sx={{ color: color.firstColor }}>Amenities</InputLabel>
                              <Select
                                style={{ border: "none" }}
                                multiple
                                {...formik.getFieldProps(`rooms.${index}.amenities`)}
                                renderValue={(selected: string[]) => selected.join(", ")}
                              >
                                {amenitiesOptions.map((amenity) => (
                                  <MenuItem key={amenity} value={amenity}>
                                    <Checkbox
                                      checked={formik.values.rooms[index].amenities.includes(amenity)}
                                    />
                                    {amenityIcons[amenity] && (
                                      <ListItemIcon>{amenityIcons[amenity]}</ListItemIcon>
                                    )}
                                    <ListItemText primary={amenity} />
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>

                          {/* Room Image Upload */}
                          <Grid item xs={12} md={12}>
                            <ImageUploader
                              label="Room Image"
                              onFileSelect={(file) =>
                                handleFileChange(file as File, (value) =>
                                  formik.setFieldValue(`rooms.${index}.roomImage`, value)
                                )
                              }
                            />
                          </Grid>
                        </Grid>
                      );
                    })}

                    <Grid
                      item
                      xs={12}
                      md={12}
                      mb={2}
                      display={"flex"}
                      alignItems={"flex-end"}
                      justifyContent={"flex-end"}
                    >
                      <CustomButton
                        customStyles={{
                          fontSize: "14px",
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
                    </Grid>
                  </>
                )}
              />

              <Grid item xs={12}>
                <CustomButton
                  customStyles={{ margin: "auto", display: "block" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // Force validation
                    formik.validateForm().then(errors => {
                      console.log("Form errors:", errors);
                      if (Object.keys(errors).length === 0) {
                        formik.submitForm();
                      } else {
                        toast.error("Please fix the form errors");
                      }
                    });
                  }}
                >
                  {isEditMode ? "Save Changes" : "Submit Application"}
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
