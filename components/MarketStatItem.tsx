import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
// import Colors from '@/constants/Colors'; // Use later for theme colors
// import Fonts from '@/constants/Fonts'; // Use later for theme fonts

interface MarketStatItemProps {
  label: string;
  value: string | number;
  style?: StyleProp<ViewStyle>; // Allow custom container styles
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
}

const MarketStatItem: React.FC<MarketStatItemProps> = ({
  label,
  value,
  style,
  labelStyle,
  valueStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.labelText, labelStyle]}>{label}: </Text>
      <Text style={[styles.valueText, valueStyle]}>{value}</Text>
    </View>
  );
};

// Placeholder styles - Adjust as needed
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Arrange label and value side-by-side
    alignItems: 'center', // Align items vertically
    // Add padding/margin as needed when placed on the screen
    // e.g., marginBottom: 8, if stacking vertically
    paddingVertical: 4, // Small vertical padding
  },
  labelText: {
    fontSize: 14,
    // color: Colors.textMuted, // Use theme color later (e.g., slightly muted)
    color: '#555555',
    marginRight: 4, // Space between label and value
    // fontFamily: Fonts.regular, // Use theme font later
  },
  valueText: {
    fontSize: 14,
    fontWeight: '600', // Make value slightly bolder
    // color: Colors.text, // Use theme color later
    color: '#1C1C1E',
    flexShrink: 1, // Allow value text to shrink if needed, prevent overflow
    // fontFamily: Fonts.semiBold, // Use theme font later
  },
});

export default MarketStatItem;