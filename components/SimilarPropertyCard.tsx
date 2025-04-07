import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  Dimensions, // To help with responsive width potentially
} from 'react-native';
// import Colors from '@/constants/Colors'; // Use later for theme colors
// import Fonts from '@/constants/Fonts'; // Use later for theme fonts

interface SimilarPropertyCardProps {
  imageUrl: ImageSourcePropType;
  price: string; // e.g., "€ 750,000"
  bedInfo: string; // e.g., "2 bed"
  sizeInfo: string; // e.g., "56m²" - Assuming separate from bedInfo based on mockup
  onPress: () => void;
}

// Calculate a potential width for the card, e.g., half the screen width minus margins
const cardWidth = Dimensions.get('window').width * 0.4;

const SimilarPropertyCard: React.FC<SimilarPropertyCardProps> = ({
  imageUrl,
  price,
  bedInfo,
  sizeInfo,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.8}>
      <View style={styles.card}>
        <Image source={imageUrl} style={styles.image} resizeMode="cover" />
        <View style={styles.infoContainer}>
          <Text style={styles.priceText} numberOfLines={1}>
            {price}
          </Text>
          <View style={styles.detailsRow}>
            <Text style={styles.detailText} numberOfLines={1}>
              {bedInfo}
            </Text>
            <Text style={styles.detailSeparator}>·</Text> 
            <Text style={styles.detailText} numberOfLines={1}>
              {sizeInfo}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Placeholder styles - Adjust based on design system and layout needs
const styles = StyleSheet.create({
  container: {
    marginRight: 12, // Spacing between cards in a horizontal list
    width: cardWidth, // Give the card a defined width
  },
  card: {
    backgroundColor: '#FFFFFF', // White block style
    borderRadius: 8,
    overflow: 'hidden', // Clip image to rounded corners
    // Add shadow/elevation matching PropertyListItem or design system
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: cardWidth * 0.6, // Adjust aspect ratio as needed (e.g., 60% of width)
    // backgroundColor: '#E0E0E0', // Placeholder color
  },
  infoContainer: {
    padding: 8, // Padding for the text info
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600', // Semi-bold price
    // color: Colors.text, // Use theme
    color: '#1C1C1E',
    marginBottom: 4, // Space below price
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    // color: Colors.textMuted, // Use theme
    color