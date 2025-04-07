import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
// Assuming you might use theme constants later
// import Colors from '@/constants/Colors';
// import Fonts from '@/constants/Fonts';

interface PropertyListItemProps {
  imageUrl: ImageSourcePropType; // Use ImageSourcePropType for flexibility (require, uri)
  imageCount?: number; // Optional number for the circle overlay
  price: string; // e.g., "€ 1,150,000"
  size: string; // e.g., "85m²"
  roomInfo: string; // e.g., "3 pièces" or "2 bed"
  location: string; // e.g., "Avenue Victor Hugo - 16th"
  feature: string; // e.g., "Beautiful balcony, renovated"
  onPress: () => void; // Function to call when the item is tapped
  // Add props for swipe actions configuration later
}

const PropertyListItem: React.FC<PropertyListItemProps> = ({
  imageUrl,
  imageCount,
  price,
  size,
  roomInfo,
  location,
  feature,
  onPress,
}) => {
  // Basic structure, styling is minimal placeholder
  // We will wrap this whole component in a swipeable container later

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image source={imageUrl} style={styles.image} resizeMode="cover" />
        {imageCount !== undefined && imageCount > 0 && (
          <View style={styles.imageCountBadge}>
            <Text style={styles.imageCountText}>{imageCount}</Text>
          </View>
        )}
      </View>

      {/* Details Container */}
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          {/* Combine price, size, roomInfo - adjust layout as needed */}
          <Text style={styles.priceText} numberOfLines={1}>
            {price}
          </Text>
           <Text style={styles.detailsSeparator}> - </Text>
          <Text style={styles.sizeText} numberOfLines={1}>
            {size}
          </Text>
          <Text style={styles.detailsSeparator}> - </Text>
          <Text style={styles.roomInfoText} numberOfLines={1}>
             {roomInfo}
          </Text>
        </View>
         <Text style={styles.locationText} numberOfLines={1}>
          {location}
        </Text>
        <Text style={styles.featureText} numberOfLines={2}>
          {feature}
        </Text>
      </View>
    </TouchableOpacity>
    // Swipe actions (e.g., Note, Share, Remove) will render here
    // when revealed by the swipe gesture in the parent component
  );
};

// Basic Placeholder Styles - Refine with Theme constants later
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF', // Placeholder background
    borderRadius: 8, // Match mockup rounding
    marginBottom: 12, // Space between items
    overflow: 'hidden', // Ensures content stays within rounded borders
    // Add shadow/elevation if needed based on design system
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: 16, // Add some horizontal margin if list is not full-width
  },
  imageContainer: {
    width: 100, // Adjust width as needed
    height: 100, // Make it square or adjust height
    // backgroundColor: '#E0E0E0', // Placeholder if image fails to load
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageCountBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: 'rgba(0, 0, 255, 0.7)', // Blueish overlay like mockup
    borderRadius: 10, // Make it circular
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1, // Takes remaining space
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'space-between', // Distribute content vertically
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4, // Space below the top row
    flexWrap: 'nowrap', // Prevent wrapping in this row
  },
  priceText: {
    fontWeight: 'bold',
    fontSize: 14,
    // color: Colors.text, // Use Theme
    marginRight: 2, // Tiny space before separator
  },
   sizeText: {
    fontSize: 14,
    // color: Colors.text, // Use Theme
    marginHorizontal: 2,
  },
   roomInfoText: {
     fontSize: 14,
    // color: Colors.text, // Use Theme
    marginLeft: 2,
  },
   detailsSeparator: {
     fontSize: 14,
    color: '#888', // Lighter separator color
   },
   locationText: {
    fontSize: 12,
    color: '#555', // Slightly lighter color
    marginBottom: 4, // Space below location
  },
  featureText: {
    fontSize: 12,
    color: '#777', // Even lighter color
  },
});

export default PropertyListItem;