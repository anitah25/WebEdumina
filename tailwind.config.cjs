/* eslint-disable @typescript-eslint/no-require-imports */
const tokens = require('./config/theme/tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.primary,
        accent: {
          lightGreen: tokens.colors.accent.lightGreen,
          darkGreen: tokens.colors.accent.darkGreen,
          cream: tokens.colors.accent.cream,
        },
        semantic: tokens.colors.semantic,
        button: tokens.colors.button,
        text: tokens.colors.text,
        background: tokens.colors.background,
      },
      fontFamily: {
        sans: [tokens.typography.fontFamily.primary, 'system-ui'],
      },
      boxShadow: {
        sm: tokens.shadows.sm,
        md: tokens.shadows.md,
        lg: tokens.shadows.lg,
      },
      borderRadius: {
        sm: tokens.spacing.radius.sm,
        md: tokens.spacing.radius.md,
        lg: tokens.spacing.radius.lg,
      },
    },
  },
  plugins: [],
};
