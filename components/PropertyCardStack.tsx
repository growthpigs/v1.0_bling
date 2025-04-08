import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withSpring,
  withTiming,
  useAnimatedReaction,
  runOnJS,
  interpolateColor
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
  {
    id: 'prop-5',
    addressLine1: 'Avenue Montaigne',
    addressLine2: 'Paris 8th',
    price: '4,500,000',
    area: 220,
    rooms: 6,
    imageUrl: 'https://via.placeholder.com/400/DDA0DD/808080?text=Property+5',
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

  // 1. Define Swipe Threshold
  const SWIPE_THRESHOLD = screenWidth * 0.4;

  // 2. Restore useSharedValue for activeIndex
  const activeIndex = useSharedValue(0);
  
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotateZGesture = useSharedValue(0);

  // 6. Temporarily Comment Out useAnimatedReaction
  /*
  useAnimatedReaction(
    () => activeIndex.value, // Use direct activeIndex
    (currentValue, previousValue) => {
      if (currentValue !== null && previousValue !== null && currentValue !== previousValue) {
        translateX.value = 0;
        translateY.value = 0;
        rotateZGesture.value = 0;
      }
    },
    [activeIndex, translateX, translateY, rotateZGesture] // Use direct activeIndex
  );
  */

  // 2. Modify panGesture.onEnd
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      rotateZGesture.value = interpolate(
        event.translationX,
        [-screenWidth / 2, screenWidth / 2],
        [-10, 10],
        Extrapolate.CLAMP
      );
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > SWIPE_THRESHOLD) {
        const direction = Math.sign(event.translationX);
        const velocityX = event.velocityX;
        const velocityY = event.velocityY;
        
        // Use velocity in the spring configuration
        translateX.value = withSpring(screenWidth * direction * 1.1, { // Keep target off-screen
          velocity: velocityX,
          damping: 18, // Adjusted parameters
          stiffness: 100,
          mass: 0.9
        }); 
        translateY.value = withSpring(event.translationY * 0.5, { // Keep Y target influenced by drag end
          velocity: velocityY,
          damping: 18,
          stiffness: 100,
          mass: 0.9
        });
        // Let rotation spring smoothly based on its velocity at release
        rotateZGesture.value = withSpring(rotateZGesture.value * 0.8, { // Target a slightly reduced rotation
            velocity: event.velocityX * 0.01, // Scale velocity's impact on rotation spring
            damping: 18,
            stiffness: 100,
            mass: 0.9
        }); 

        // Update activeIndex directly after starting spring animations
        activeIndex.value = activeIndex.value + 1;

      } else {
        // Snap back with velocity factored in for a smoother return
        translateX.value = withSpring(0, { velocity: event.velocityX });
        translateY.value = withSpring(0, { velocity: event.velocityY });
        rotateZGesture.value = withSpring(0, { velocity: event.velocityX * 0.01}); // Scale velocity impact
      }
    });

  return (
    <View style={[styles.stackContainer, { alignSelf: 'center', height: cardHeight * 1.15 }]}>
      {mockProperties.map((property: PropertyData, index: number) => {
        const animatedStyle = useAnimatedStyle(() => {
          // 4. Modify useAnimatedStyle: Use activeIndex.value
          const positionIndex = index - activeIndex.value;

          if (positionIndex < 0 || positionIndex > 4) {
            // Ensure swiped-away cards are fully gone
            if(positionIndex < 0) return { opacity: 0, zIndex: -1 }; 
            // Keep distant future cards invisible but potentially ready
            return { opacity: 0, zIndex: -1 };
          }

          if (positionIndex === 0) {
            // Apply gesture transforms ONLY to the top card
            return {
              opacity: 1,
              transform: [
                { translateX: translateX.value }, 
                { translateY: translateY.value },
                { rotateZ: `${rotateZGesture.value}deg` }, // Use gesture rotation (degrees)
              ],
            };
          } else {
            // Apply fanning transforms to underlying cards
            const scale = interpolate(
              positionIndex,
              [0, 1, 2, 3, 4],
              [1, 0.99, 0.98, 0.97, 0.96],
              Extrapolate.CLAMP
            );
            const rotateZInterpolated = interpolate(
              positionIndex,
              [0, 1, 2, 3, 4],
              [0, degreesToRadians(-1), degreesToRadians(-2), degreesToRadians(-3), degreesToRadians(-4)],
              Extrapolate.CLAMP
            );
            const translateYInterpolated = interpolate(
              positionIndex,
              [0, 1, 2, 3, 4],
              [0, 5, 10, 15, 20],
              Extrapolate.CLAMP
            );
            return {
              opacity: 1,
              transform: [
                { scale },
                { rotateZ: `${rotateZInterpolated}rad` }, // Use interpolated rotation (radians)
                { translateY: translateYInterpolated },
              ],
            };
          }
        });

        // 5. Modify Conditional Rendering Logic: Use activeIndex.value
        const currentPositionIndex = index - activeIndex.value;

        // Avoid rendering cards that have been swiped away completely
        if (currentPositionIndex < 0) {
            return null; 
        }

        // Apply GestureDetector ONLY around the top card's content
        if (currentPositionIndex === 0) {
          return (
            <GestureDetector key={property.id} gesture={panGesture}>
              {/* Top card Animated.View goes INSIDE GestureDetector */}
              <Animated.View
                style={[
                  styles.cardBase,
                  { width: cardWidth, height: cardHeight },
                  animatedStyle, 
                  { zIndex: mockProperties.length - index }
                ]}
              >
                <PropertyCard {...property} />
              </Animated.View>
            </GestureDetector>
          );
        } else if (currentPositionIndex > 0 && currentPositionIndex <= 4) {
            // Only render outlines for cards 1 through 4 in the stack
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
                <View style={styles.cardOutline} />
                </Animated.View>
            );
        } else {
            // For cards beyond position 4, render nothing (or potentially a placeholder)
            return null;
        }
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