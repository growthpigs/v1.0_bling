import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
// import Colors from '@/constants/Colors'; // Use later for theme colors
// import Fonts from '@/constants/Fonts'; // Use later for theme fonts

interface SectionHeaderProps {
  title: string;
  style?: StyleProp<ViewStyle>; // Allow custom container styles
  textStyle?: StyleProp<TextStyle>; // Allow custom text styles
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.titleText, textStyle]}>{title}</Text>
    </View>
  );
};

// Placeholder styles - Adjust font sizes/weights based on your design system
const styles = StyleSheet.create({
  container: {
    paddingVertical: 12, // Add vertical spacing around the header
    paddingHorizontal: 16, // Align with typical content padding (adjust if needed)
    // backgroundColor: 'white', // Assuming it sits within a white block
    borderBottomWidth: 1, // Optional: Add a subtle separator line below
    borderBottomColor: '#EEEEEE', // Optional: Light gray separator color
    marginBottom: 8, // Space below the header before the section content starts
  },
  titleText: {
    fontSize: 18, // Slightly larger font size for header
    fontWeight: '600', // Semi-bold weight
    // color: Colors.text, // Use theme color later
    color: '#1C1C1E', // Dark text color (iOS system-like)
    // fontFamily: Fonts.bold, // Use theme font later
  },
});

export default SectionHeader;