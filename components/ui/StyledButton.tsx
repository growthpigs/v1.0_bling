// components/ui/StyledButton.tsx
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import Fonts from '../../constants/Fonts'; // Import Fonts constant

// Define what information the button needs (props)
interface StyledButtonProps {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;    // Optional styles for the outer TouchableOpacity (e.g., margins)
  textStyle?: StyleProp<TextStyle>; // Optional extra styles for the button text
  gradientColors?: string[];      // Optional override for gradient colors
}

// Define the default gradient colors from your design
// linear-gradient(114deg, #81DFDB 0%, #1F95FD 36.06%, #AD74E9 100%)
const defaultGradientColors = ['#81DFDB', '#1F95FD', '#AD74E9'];

// The actual button component
export default function StyledButton({
  title,
  onPress,
  style,
  textStyle,
  gradientColors = defaultGradientColors, // Use default or passed colors
}: StyledButtonProps) {
  return (
    // TouchableOpacity makes it pressable, apply positioning/margin styles here
    <TouchableOpacity
      style={style}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* LinearGradient provides the background */}
      <LinearGradient
        colors={gradientColors}
        // Approximate 114 degrees (adjust x/y values slightly if needed)
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        // Styling like padding and border radius goes on the gradient itself
        style={styles.gradientContainer}
      >
        {/* Text goes inside the gradient */}
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

// Define the styles
const styles = StyleSheet.create({
  // Styles for the gradient view itself (background, padding, shape)
  gradientContainer: {
    paddingVertical: 9,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Styles for the text remain the same
  text: {
    color: '#FCFCFC',
    fontSize: Fonts.size.md, // 16
    fontWeight: Fonts.weight.bold, // '700'
    textAlign: 'center',
  },
});