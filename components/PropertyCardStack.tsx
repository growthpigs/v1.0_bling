import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

// Import the PropertyCard component
import PropertyCard from './PropertyCard';

// Mock data for demonstration
const mockProperties = [
  {
    id: 'prop-1',
    addressLine1: 'Champs-Élysées',
    addressLine2: 'Paris 8th',
    price: '2,500,000',
    area: 150,
    rooms: 4,
    imageUrl: 'https://via.placeholder.com/400/FFA07A/808080?text=Property+1',
  },
  {
    id: 'prop-2',
    addressLine1: 'Rue de Rivoli',
    addressLine2: 'Paris 1st',
    price: '1,800,000',
    area: 110,
    rooms: 3,
    imageUrl: 'https://via.placeholder.com/400/ADD8E6/808080?text=Property+2',
  },
  {
    id: 'prop-3',
    addressLine1: 'Boulevard Saint-Germain',
    addressLine2: 'Paris 6th',
    price: '3,100,000',
    area: 200,
    rooms: 5,
    imageUrl: 'https://via.placeholder.com/400/90EE90/808080?text=Property+3',
  },
  {
    id: 'prop-4',
    addressLine1: 'Place des Vosges',
    addressLine2: 'Paris 4th',
    price: '2,900,000',
    area: 180,
    rooms: 4,
    imageUrl: 'https://via.placeholder.com/400/FFB6C1/808080?text=Property+4',
  },
];

// Extract PropertyCardProps if needed, assuming PropertyCard takes these
type PropertyData = typeof mockProperties[0];

// Define props if needed later, for now it takes none
interface PropertyCardStackProps {}

// Calculate card width based on screen width and padding
const { width: screenWidth } = Dimensions.get('window');
const STACK_HORIZONTAL_PADDING = 16;
// Change cardWidth calculation to 85% of screen width
const cardWidth = screenWidth * 0.85;
const cardHeight = cardWidth;

const degreesToRadians = (degrees: number) => {
  'worklet';
  return degrees * (Math.PI / 180);
};

const PropertyCardStack: React.FC<PropertyCardStackProps> = (props) => {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = screenWidth * 0.85;
  const cardHeight = cardWidth;

  const activeIndex = useSharedValue(0);

  return (
    <View style={[styles.stackContainer, { alignSelf: 'center', height: cardHeight * 1.15 }]}>
      {/* Map over the properties data */}
      {mockProperties.map((property: PropertyData, index: number) => {
        // Remove positionIndex defined with useSharedValue here
        // const positionIndex = useSharedValue(index - activeIndex.value);
        
        const animatedStyle = useAnimatedStyle(() => {
          // Calculate positionIndex directly inside the hook
          const positionIndex = index - activeIndex.value;

          // Use the directly calculated positionIndex
          if (positionIndex < 0 || positionIndex > 4) { 
            return { opacity: 0, zIndex: -1 };
          }

          const scale = interpolate(
            positionIndex, // Use direct value
            [0, 1, 2, 3, 4],
            [1, 0.99, 0.98, 0.97, 0.96],
            Extrapolate.CLAMP
          );
          const rotateZ = interpolate(
            positionIndex, // Use direct value
            [0, 1, 2, 3, 4],
            [0, degreesToRadians(-1), degreesToRadians(-2), degreesToRadians(-3), degreesToRadians(-4)],
            Extrapolate.CLAMP
          );
          const translateY = interpolate(
            positionIndex, // Use direct value
            [0, 1, 2, 3, 4],
            [0, 5, 10, 15, 20],
            Extrapolate.CLAMP
          );

          const calculatedStyle = { 
            opacity: 1,
            transform: [
              { scale },
              { rotateZ: `${rotateZ}rad` },
              { translateY },
            ],
          };

          // ---- REMOVE LOGGING ----
          /*
          if (positionIndex >= 0 && positionIndex <= 4) {
             console.log(
               `[Card ${index} PIDx ${positionIndex}] => Style:`, 
               JSON.stringify(calculatedStyle, null, 2)
             );
          }
          */
          // ---- END LOGGING ----

          return calculatedStyle;
        });

        // Calculate directly for conditional rendering too
        const currentPositionIndex = index - activeIndex.value;

        return (
          <Animated.View
            key={property.id}
            style={[
              styles.cardBase,
              { width: cardWidth, height: cardHeight },
              animatedStyle,
              { zIndex: mockProperties.length - index }
            ]}
          >
            {/* Conditional Rendering based on direct calculation */} 
            {currentPositionIndex === 0 ? (
              <PropertyCard {...property} />
            ) : (
              <View style={styles.cardOutline} />
            )}
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  stackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    paddingHorizontal: STACK_HORIZONTAL_PADDING,
  },
  cardBase: {
    position: 'absolute',
  },
  cardOutline: {
    width: '100%',
    height: '100%',
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 0, 0, 0.15)',
    backgroundColor: '#FFFFFF',
  },
});

export default PropertyCardStack; 