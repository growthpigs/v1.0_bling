import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

interface GradientProps {
  colors: string[];
  locations: number[];
}

interface SmartTagProps {
  text: string;
  gradient: GradientProps;
  onRemove: (event: GestureResponderEvent) => void;
}

const SmartTag: React.FC<SmartTagProps> = ({ text, gradient, onRemove }) => {
  // Close Icon SVG Component
  const CloseIcon = () => (
    <Svg width="11" height="10" viewBox="0 0 11 10" fill="none">
      <Path
        d="M10.5 0.94002L9.4425 0L5.25 3.72668L1.0575 0L0 0.94002L4.1925 4.66668L0 8.39334L1.0575 9.33336L5.25 5.60668L9.4425 9.33336L10.5 8.39334L6.3075 4.66668L10.5 0.94002Z"
        fill="white"
      />
    </Svg>
  );

  return (
    <LinearGradient
      colors={gradient.colors}
      locations={gradient.locations}
      start={{ x: 0, y: 0.5 }} // Horizontal gradient
      end={{ x: 1, y: 0.5 }}   // Horizontal gradient
      style={styles.gradientContainer}
    >
      <Text style={styles.textStyle}>{text}</Text>
      <TouchableOpacity onPress={onRemove} style={styles.closeButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <CloseIcon />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    height: 24,
    borderRadius: 12, // Pill shape (half of height)
    flexDirection: 'row', // Align text and icon horizontally
    alignItems: 'center', // Center items vertically
    paddingHorizontal: 12, // Padding inside the tag
    // justifyContent: 'space-between', // Using marginRight on text instead
    alignSelf: 'flex-start', // Ensure container width fits content
    overflow: 'hidden', // Necessary for border-radius to work with gradient on some platforms
  },
  textStyle: {
    color: '#FFF',
    fontSize: 12,
    fontFamily: 'SF-Pro-Bold', // Use bold font family
    marginRight: 8, // Space between text and close icon
  },
  closeButton: {
    // Style for the touchable area if needed
    // marginLeft: 'auto', // Not needed if text has marginRight
  },
});

export default SmartTag;