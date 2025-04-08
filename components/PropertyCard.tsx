import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageSourcePropType,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

// Updated Props Interface
interface PropertyCardProps {
  imageUrl?: string;
  price?: string;
  addressLine1?: string;
  addressLine2?: string;
  area?: string | number;
  rooms?: string | number;
}

// Placeholder image if imageUrl is not provided
const placeholderImage = require('../assets/images/placeholder-property.jpg');

const PropertyCard: React.FC<PropertyCardProps> = ({
  imageUrl,
  price = '1,234,567',
  addressLine1 = 'Avenue Victor Hugo',
  addressLine2 = 'La Garenne-Colombes',
  area = 130,
  rooms = 3,
}) => {
  const detailsString = `€${price} • ${area}m² • ${rooms} Piece${Number(rooms) !== 1 ? 's' : ''}`;

  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.image}
        source={{ uri: imageUrl }}
        placeholder={placeholderImage}
        contentFit="cover"
        transition={300}
      />

      {/* Top Banner */}
      <View style={styles.bannerContainer}>
        <Text style={styles.bannerText}>01 RECHERCHE :: 8 AVRIL | 10:45</Text>
      </View>

      {/* Side Action Buttons - Reverted to 4 buttons with original icons */}
      <View style={styles.sideButtonsContainer}>
        {/* Button 1 (Info) */}
        <TouchableOpacity style={styles.sideButton} onPress={() => console.log('Info pressed')}>
          <BlurView intensity={90} tint="light" style={StyleSheet.absoluteFillObject} />
          <Ionicons name="information-circle-outline" size={26} color="#FFF" />
        </TouchableOpacity>
        {/* Button 2 (Call) */}
        <TouchableOpacity style={styles.sideButton} onPress={() => console.log('Call pressed')}>
          <BlurView intensity={90} tint="light" style={StyleSheet.absoluteFillObject} />
          <Ionicons name="call-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        {/* Button 3 (Share) */}
        <TouchableOpacity style={styles.sideButton} onPress={() => console.log('Share pressed')}>
          <BlurView intensity={90} tint="light" style={StyleSheet.absoluteFillObject} />
          <Ionicons name="share-outline" size={24} color="#FFF" />
        </TouchableOpacity>
        {/* Button 4 (Web/Link) - Re-added */}
        <TouchableOpacity style={styles.sideButton} onPress={() => console.log('Web pressed')}>
          <BlurView intensity={90} tint="light" style={StyleSheet.absoluteFillObject} />
          <Ionicons name="link-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Bottom Text Overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.6)']}
        style={styles.overlay}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <Text style={styles.addressText}>{addressLine1} • {addressLine2}</Text>
        <Text style={styles.detailsText}>{detailsString}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    aspectRatio: 1,
    borderRadius: 11,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bannerContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 2,
  },
  bannerText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'SF-Pro-Bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 12,
    zIndex: 2,
  },
  sideButtonsContainer: {
    position: 'absolute',
    right: 12,
    top: 12,
    flexDirection: 'column',
    gap: 10,
    zIndex: 1,
  },
  sideButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.00,
    elevation: 2,
  },
  addressText: {
    color: '#FFF',
    fontFamily: 'SF-Pro-Heavy',
    fontSize: 24,
    lineHeight: 26,
    marginBottom: 2,
  },
  detailsText: {
    color: '#FFF',
    fontFamily: 'SF-Pro-Bold',
    fontSize: 15,
  },
});

export default PropertyCard; 