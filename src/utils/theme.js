import { createTheme } from "@shopify/restyle";
import { fontScale, Height, Width } from "./dimensions";

const palette = {
  greenLight: "#88DE9C",
  greenPrimary: "#49945A",
  greenDark: "#0C4128",
  greenLighter:"#D4F3DB",

  danger: "#ED3232",
  warning: "#F2C523",
  warningDark: "#8F5E14",

  black: "#0B0B0B",
  white: "#FFF",
  textLight: "#5B6871",
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    headerColor: palette.greenPrimary,
    textColor: palette.black,
    textLight: palette.textLight,
   lighterGreen: palette.greenLighter,
   lightGreen: palette.greenLight,
   darkGreen: palette.greenDark,
   greenText: palette.greenPrimary,
    buttonBackground: palette.greenPrimary,
    buttonText: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadius: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    h1: {
      fontSize: fontScale(25),
      fontFamily: "Inter-Black",
      color: "headerColor",
    },
    h2: {
      fontSize: fontScale(20),
      fontFamily: "Inter-Black",
      color: "headerColor",
    },
    p: {
      fontSize: fontScale(16),
      lineHeight: 20,
      fontFamily: "Inter-Medium",
      color: "textColor",
    },
  },
  buttonVariants: {},
});

export default theme;
