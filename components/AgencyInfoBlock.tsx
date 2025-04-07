import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from 'react-native';
// import Colors from '@/constants/Colors'; // Use later for theme colors
// import Fonts from '@/constants/Fonts'; // Use later for theme fonts

interface AgencyInfoBlockProps {
  agencyName: string;
  agencyLogoUrl: ImageSourcePropType;
  certificationScore?: string; // e.g., "4/5"
  certificationText?: string; // e.g., "Great provider..."
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const AgencyInfoBlock: React.FC<AgencyInfoBlockProps> = ({
  agencyName,
  agencyLogoUrl,
  certificationScore,
  certificationText, // This text is less clear in mockups, making optional
  onPress,
  style,
}) => {
  const content = (
    <View style={[styles.container, style]}>
      {/* Left side: Text content */}
      <View style={styles.textContainer}>
        {certificationScore && (
          <Text style={styles.certificationScoreText}>
            Certification Score: {certificationScore}
          </Text>
        )}
        {certificationText && (
          <Text style={styles.certificationDescText}>{certificationText}</Text>
        )}
        <Text style={styles.agencyLabelText}>Agency</Text>
        <Text style={styles.agencyNameText}>{agencyName}</Text>
      </View>

      {/* Right side: Logo */}
      <Image source={agencyLogoUrl} style={styles.logo} resizeMode="contain" />
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

// Placeholder styles - Adjust based on design system
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Pushes text left, logo right
    alignItems: 'center', // Vertically align items
    paddingVertical: 12,
    paddingHorizontal: 16, // Standard padding, adjust if needed
    // backgroundColor: 'white', // Assuming it's part of a white block
    // borderTopWidth: 1, // Optional separator line
    // borderTopColor: '#EEEEEE',
    // borderBottomWidth: 1, // Optional separator line
    // borderBottomColor: '#EEEEEE',
    // marginBottom: 16, // Spacing below this block
  },
  textContainer: {
    flex: 1, // Allow text container to take available space
    marginRight: 16, // Space between text and logo
  },
  certificationScoreText: {
    fontSize: 14,
    fontWeight: '600', // Semi-bold for the score part
    // color: Colors.text, // Use theme
    color: '#1C1C1E',
    marginBottom: 2,
  },
  certificationDescText: {
    fontSize: 12,
    // color: Colors.textMuted, // Use theme
    color: '#555555',
    marginBottom: 8, // Space below certification text
  },
  agencyLabelText: {
    fontSize: 12,
    // color: Colors.textMuted, // Use theme
    color: '#888888', // Lighter color for the "Agency" label
    marginBottom: 2,
  },
  agencyNameText: {
    fontSize: 16,
    fontWeight: '500', // Medium weight for agency name
    // color: Colors.text, // Use theme
    color: '#1C1C1E',
  },
  logo: {
    width: 40, // Adjust size as needed
    height: 40, // Adjust size as needed
    borderRadius: 20, // Make logo circular if desired, or adjust
    // backgroundColor: '#E0E0E0', // Placeholder color
  },
});

export default AgencyInfoBlock;