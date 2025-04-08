import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform, // Added for potential platform-specific styles
} from 'react-native';
import { Image } from 'expo-image'; // Using expo-image

// Revert Props to match original Property Card data structure
export interface PropertyListItemProps {
  id: string;
  imageUrl?: string;
  addressLine1?: string;
  addressLine2?: string;
  price?: string;
  area?: string | number;
  rooms?: string | number;
  // Add any other relevant fields from original property data
}

// Placeholder image
const placeholderImage = require('../assets/images/placeholder-property.jpg');

const PropertyListItem: React.FC<PropertyListItemProps> = ({
  imageUrl,
  addressLine1 = 'Address Line 1',
  addressLine2 = 'Address Line 2',
  price = 'Price',
  area = 'Area',
  rooms = 'Rooms',
}) => {
  // Format details string
  const detailsString = `€${price} • ${area}m² • ${rooms} Piece${Number(rooms) !== 1 ? 's' : ''}`;

  return (
    <View style={styles.itemContainer}>
      {/* Image Column */}
      <Image
        style={styles.image}
        source={{ uri: imageUrl }}
        placeholder={placeholderImage}
        contentFit="cover"
        transition={300}
      />
      {/* Text Details Column */}
      <View style={styles.textContainer}>
        <Text style={styles.address1Text} numberOfLines={1}>{addressLine1}</Text>
        <Text style={styles.address2Text} numberOfLines={1}>{addressLine2}</Text>
        <Text style={styles.detailsText} numberOfLines={1}>{detailsString}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 0,
    marginBottom: 6,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 6,
    marginRight: 16,
    backgroundColor: '#F3F4F6',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  address1Text: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  address2Text: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  detailsText: {
    fontSize: 13,
    color: '#6B7280',
  },
});

export default PropertyListItem;