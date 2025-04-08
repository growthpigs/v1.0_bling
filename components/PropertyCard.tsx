import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PropertyCardProps {
  imageUrl?: string; // Or use ImageSourcePropType if importing local images
  price?: string;
  location?: string;
  details?: string;
}

// Placeholder image if imageUrl is not provided
const placeholderImage = require('../assets/images/placeholder-property.jpg'); // Updated path

const PropertyCard: React.FC<PropertyCardProps> = ({
  imageUrl,
  price = '€1,234,567', // Default placeholder values
  location = 'Paris, 11th Arr.',
  details = '130m² • 3 Pieces',
}) => {
  const imageSource: ImageSourcePropType = imageUrl
    ? { uri: imageUrl }
    : placeholderImage;

  return (
    <View style={styles.cardContainer}>
      <Image source={imageSource} style={styles.image} resizeMode="cover" />
      <LinearGradient
        // Gradient from transparent top to semi-opaque black bottom
        colors={['transparent', 'rgba(0,0,0,0.6)']}
        style={styles.overlay}
        start={{ x: 0.5, y: 0 }} // Start from top center
        end={{ x: 0.5, y: 1 }}   // End at bottom center
      >
        <Text style={styles.priceText}>{price}</Text>
        <Text style={styles.locationText}>{location}</Text>
        <Text style={styles.detailsText}>{details}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    aspectRatio: 1, // Square aspect ratio
    borderRadius: 11, // Defined border radius
    backgroundColor: '#E0E0E0', // Placeholder background if image fails
    overflow: 'hidden', // Clip image and gradient to rounded corners
    position: 'relative', // Needed for absolute positioning of overlay
    width: '100%', // Default to full width, adjust in parent component
    // Add shadow for depth (optional, platform-specific)
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute', // Ensure image is behind the overlay
    top: 0,
    left: 0,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingTop: 20, // Space above text
    paddingBottom: 12, // Space below text
  },
  priceText: {
    color: '#FFF',
    fontFamily: 'SF-Pro-Bold',
    fontSize: 20, // Example size, adjust as needed
    marginBottom: 4, // Space below price
  },
  locationText: {
    color: '#FFF',
    fontFamily: 'SF-Pro-Regular',
    fontSize: 14, // Example size
    marginBottom: 4, // Space below location
  },
  detailsText: {
    color: '#FFF',
    fontFamily: 'SF-Pro-Regular',
    fontSize: 12, // Example size
  },
});

export default PropertyCard; 