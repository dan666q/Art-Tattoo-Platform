import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF7F22",
    },
    secondary: {
      main: "#D5D5D5",
    },
    mode: "dark",
  },

  typography: {
    fontFamily: [
      "Libre Caslon Text",
      "Libre Franklin",
      "Viaoda Libre",
      "sans-serif",
    ].join(","),
    h1: { color: "#FFFFFF" },
    h2: { color: "#FFFFFF" },
    h3: { color: "#FFFFFF" },
    h4: { color: "#FF7F22" },
    h5: { color: "#FF7F22" },
    h6: { color: "#FFFFFF" },
    subtitle1: { color: "#FFFFFF" },
    subtitle2: { color: "#FFFFFF" },
    body1: { color: "#FFFFFF" },
    body2: { color: "#FFFFFF" },
    button: { color: "#FF7F22" },
  },
});

export default theme;
