// constants/Fonts.ts

export default {
    // Define common font sizes
    size: {
      xs: 10,
      sm: 12,
      default: 14, // Default body text size
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      title: 28,
    },
    // Define common font weights (maps to system font weights)
    weight: {
      light: '300' as const, // Use 'as const' for strict typing
      regular: '400' as const,
      medium: '500' as const,
      semibold: '600' as const,
      bold: '700' as const,
      black: '900' as const,
    },
    // No fontFamily needed here - will use system default (SF Pro on iOS)
  };