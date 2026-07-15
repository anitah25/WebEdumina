// Shared tokens (JS) for runtime use (Tailwind and CSS)
exports.colors = {
  primary: {
    dark: "#1D2A62",
    light: "#87ADEC",
  },
  accent: {
    lightGreen: "#ADD061",
    darkGreen: "#437118",
    cream: "#F5F3D8",
  },
  neutral: {
    black: "#000000",
    white: "#FFFFFF",
    gray: {
      50: "#F9F9F9",
      100: "#F3F3F3",
      200: "#E7E7E7",
      300: "#D1D1D1",
      400: "#BDBDBD",
      500: "#A0A0A0",
      600: "#737373",
      700: "#595959",
      800: "#404040",
      900: "#262626",
    },
  },
  semantic: {
    success: "#10AA2B",
    danger: "#C0000F",
    warning: "#F97316",
    info: "#1D2A62",
  },
  button: {
    success: "#10AA2B",
    danger: "#C0000F",
    primary: "#1D2A62",
    secondary: "#87ADEC",
  },
  text: {
    primary: "#000000",
    secondary: "#595959",
    light: "#FFFFFF",
    accent: "#437118",
  },
  background: {
    light: "#FFFFFF",
    cream: "#F5F3D8",
    dark: "#1D2A62",
  },
};

exports.typography = {
  fontFamily: {
    primary: "Poppins, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

exports.spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
  },
};

exports.shadows = {
  sm: "0 1px 2px rgba(0,0,0,0.05)",
  md: "0 4px 6px rgba(0,0,0,0.1)",
  lg: "0 10px 15px rgba(0,0,0,0.1)",
};
