// constants/Colors.ts

const tintColorLight = '#0a7ea4'; // Example tint color for light mode
const tintColorDark = '#fff'; // Example tint color for dark mode

export default {
  light: {
    text: '#11181C', // Example text color
    background: '#fff', // Example background
    tint: tintColorLight,
    icon: '#687076', // Example icon color
    tabIconDefault: '#687076', // Example default tab icon color
    tabIconSelected: tintColorLight, // Example selected tab icon color
    // Add other common colors
    primary: '#007AFF', // Example primary blue
    secondary: '#4CD964', // Example secondary green
    grey: '#8E8E93', // Example grey
    error: '#FF3B30', // Example error red
  },
  dark: {
    text: '#ECEDEE', // Example dark mode text
    background: '#151718', // Example dark mode background
    tint: tintColorDark,
    icon: '#9BA1A6', // Example dark mode icon
    tabIconDefault: '#9BA1A6', // Example dark mode default tab icon
    tabIconSelected: tintColorDark, // Example dark mode selected tab icon
    // Add other common colors
    primary: '#0A84FF', // Example dark mode primary blue
    secondary: '#30D158', // Example dark mode secondary green
    grey: '#8E8E93', // Example dark mode grey (might be same or different)
    error: '#FF453A', // Example dark mode error red
  },
  // You can add common colors outside light/dark if they never change
  // white: '#FFFFFF',
  // black: '#000000',
};