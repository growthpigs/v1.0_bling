import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

// Import the PropertyCard component
import PropertyCard from './PropertyCard';

// Define props if needed later, for now it takes none
interface PropertyCardStackProps {}

// Calculate card width based on screen width and padding
const { width: screenWidth } = Dimensions.get('window');
const STACK_HORIZONTAL_PADDING = 16;
// Change cardWidth calculation to 85% of screen width
const cardWidth = screenWidth * 0.85;

const PropertyCardStack: React.FC<PropertyCardStackProps> = (props) => {
  return (
    <View style={styles.stackContainer}>
      {/* Instruction Card Removed */}
      {/* <View style={styles.instructionCard}> ... </View> */}

      {/* Container for the absolutely positioned cards */}
      {/* Height is determined by the aspect ratio of the cards */}
      <View style={styles.cardsWrapper}>
        {/* Card 3 (Bottom) */}
        <View style={[styles.cardBase, styles.card3]}>
          <PropertyCard />
        </View>
        {/* Card 2 (Middle) */}
        <View style={[styles.cardBase, styles.card2]}>
          <PropertyCard />
        </View>
        {/* Card 1 (Top) */}
        <View style={[styles.cardBase, styles.card1]}>
          <PropertyCard />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stackContainer: {
    marginVertical: 16,
    paddingHorizontal: STACK_HORIZONTAL_PADDING, // Keep padding if needed, or remove if cardWidth handles centering
    alignItems: 'center', // Ensure wrapper is centered
  },
  cardsWrapper: {
    width: cardWidth, // Uses the new 85% width
    aspectRatio: 1,   // Maintain square aspect ratio for the container
    position: 'relative', // Needed for absolute positioning of cards inside
    // backgroundColor: 'lightblue', // For debugging layout
  },
  cardBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // PropertyCard inside will handle its own styling (border radius, etc.)
  },
  card1: { // Top card
    zIndex: 3,
    transform: [{ rotate: '0deg' }, { scale: 1 }],
    // No transform needed, but defining for clarity
  },
  card2: { // Middle card
    zIndex: 2,
    // Slight vertical offset to enhance stacking illusion
    top: 3,
    transform: [{ rotate: '-1.5deg' }, { scale: 0.95 }],
  },
  card3: { // Bottom card
    zIndex: 1,
    // Slightly more vertical offset
    top: 6,
    transform: [{ rotate: '-3deg' }, { scale: 0.90 }],
  },
});

export default PropertyCardStack; 