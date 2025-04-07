import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
// import Colors from '@/constants/Colors'; // Use later for theme colors

interface InfoTagProps {
  label: string;
  onPress?: () => void; // Make tag tappable if needed
  style?: StyleProp<ViewStyle>; // Allow custom container styles
  textStyle?: StyleProp<TextStyle>; // Allow custom text styles
}

const InfoTag: React.FC<InfoTagProps> = ({
  label,
  onPress,
  style,
  textStyle,
}) => {
  const TagContent = (
    <View style={[styles.tagContainer, style]}>
      <Text style={[styles.tagText, textStyle]}>{label}</Text>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {TagContent}
      </TouchableOpacity>
    );
  }

  return TagContent;
};

// Placeholder styles based on V3 BARAK screenshot and general style guidance
const styles = StyleSheet.create({
  tagContainer: {
    backgroundColor: '#E8E8E8', // Light gray placeholder - adjust with theme
    borderRadius: 6, // Moderately rounded corners
    paddingVertical: 4, // Vertical padding
    paddingHorizontal: 10, // Horizontal padding
    marginRight: 8, // Space between tags if in a row
    marginBottom: 8, // Space below tags if they wrap
    alignSelf: 'flex-start', // Prevent tag from stretching full width if alone
  },
  tagText: {
    fontSize: 12, // Small font size for tags
    // color: Colors.text, // Use theme color later
    color: '#333333', // Dark gray text placeholder
    fontWeight: '500', // Medium weight
  },
});

export default InfoTag;