import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import {
  FormControlLabel,
  IconButton,
  Radio,
  RadioProps,
  styled,
  TextField,
  useMediaQuery,
  useTheme
} from "@mui/material";
import color from "./color";

export const BoxStyle = {
  p: 2,
  px: 4,
  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.18)",
  borderRadius: "12px",
  my: 4,
};

export function BpRadio(props: RadioProps) {
  return (
    <Radio
      style={{ padding: "6px" }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

export const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 18,
  height: 18,
  boxShadow:
    "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: "#f5f8fa",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(41, 91, 122, 0.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: "#ebf1f5",
    ...theme.applyStyles("dark", {
      backgroundColor: "#30404d",
    }),
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: "rgba(206,217,224,.5)",
    ...theme.applyStyles("dark", {
      background: "rgba(57,75,89,.5)",
    }),
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 0 1px rgb(16 22 26 / 40%)",
    backgroundColor: "#394b59",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))",
  }),
}));

export const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: color.secondColor,
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&::before": {
    display: "block",
    width: 18,
    height: 18,
    backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
    content: '""',
  },
  "input:hover ~ &": {
    backgroundColor: color.secondColor,
  },
});

export const StyledLabel = styled(FormControlLabel)(
  ({ theme, checked }: { theme?: any; checked?: boolean }) => ({
    color: checked ? color.thirdColor : color.firstColor,
    background: checked
      ? "linear-gradient(90deg, #614385, #516395)"
      : "transparent",
    borderRadius: " 2px 8px 8px 2px",
    display: "flex",
    alignItems: "center",
    transition: "0.3s",
    paddingLeft: checked ? "30px" : "auto",
    marginLeft: checked ? "-40px" : "-10px",
    paddingRight: "10px",
    fontSize: checked ? "1rem" : "0.95rem",
  })
);

export const CustomRadio = styled(Radio)({
  color: color.firstColor,
  "&.Mui-checked": {
    color: color.thirdColor,
  },
});

export const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        left: "0px",
        top: "50%",
        transform: "translateY(-50%)",
        background: color.background,
        color: "white",
        zIndex: 2,
        "&:hover": { background: color.firstColor },
      }}
    >
      <ArrowBackIos />
    </IconButton>
  );
};

export const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        right: "0px",
        top: "50%",
        transform: "translateY(-50%)",
        background: color.background,
        color: "white",
        zIndex: 2,
        "&:hover": { background: color.firstColor },
      }}
    >
      <ArrowForwardIos />
    </IconButton>
  );
};

export const CustomTextField = styled(TextField)({
  marginBottom: "10px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
      borderRadius: "52px",
      boxShadow: "4px 4px 10px rgba(104, 39, 184, 0.17)",
      color: color.firstColor,
    },
    "&:hover fieldset": {
      border: "solid 1px",
    },
    "&.Mui-focused fieldset": {
      border: "solid 1px",
    },
  },
  "& .MuiInputBase-input": {
    color: color.firstColor,
  },
  "& .MuiInputLabel-root": {
    color: color.firstColor,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: color.firstColor,
  },
});

export const useScreenSize = () => {
  const theme = useTheme();
  const isBelow400px = useMediaQuery(theme.breakpoints.down(400));
  return { isBelow400px };
};

export const inputSx = {
  border: "none",
  borderRadius: "52px",
  boxShadow: "4px 4px 10px rgba(104, 39, 184, 0.17)",
  color: color.firstColor,
  padding: "0px",
  marginTop: "0px",
  width: "100%",
  boxSizing: "border-box",
  "& .MuiOutlinedInput-root": {
    padding: "0px",
    borderBottom: "4px solid",
    borderColor: color.firstColor,
    "& fieldset": {
      border: "none",
    },
    "&:hover fieldset": {
      border: "none",
    },
    "&.Mui-focused fieldset": {
      border: "none",
    },
    "& .MuiInputLabel-root": {
      color: color.firstColor,
    },
  },
};
