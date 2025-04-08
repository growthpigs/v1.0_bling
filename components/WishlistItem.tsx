import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated, // Needed for Swipeable actions interpolation
  Alert, // For placeholder actions
} from 'react-native';
import { Image } from 'expo-image';
import { Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'; // For swipe action icons

// Props for the list item based on wireframe V3
export interface WishlistItemProps {
  id: string;
  imageUrl?: string;
  title: string; // e.g., "Appartement - Rue de Rivoli, Paris 1er"
  subtitle: string; // e.g., "€1,150,000 | 85m² | 3 pièces"
  sharedUsers?: { avatarUrl: string }[]; // Expecting avatar URLs now
}

const placeholderImage = require('../assets/images/placeholder-property.jpg');

// Component for rendering swipe actions
const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => {
  const trans = dragX.interpolate({
    inputRange: [-180, 0], // Adjust based on total width of actions
    outputRange: [0, 180], // How far actions slide out
    extrapolate: 'clamp',
  });

  // Example actions - match wireframe (Note, Share, Remove)
  const pressNote = () => Alert.alert('Note Pressed');
  const pressShare = () => Alert.alert('Share Pressed');
  const pressRemove = () => Alert.alert('Remove Pressed');

  return (
    <View style={styles.swipeActionsContainer}>
      <TouchableOpacity style={[styles.swipeButton, styles.swipeButtonNote]} onPress={pressNote}>
        <Ionicons name="pencil-outline" size={20} color="white" />
        {/* <Text style={styles.swipeButtonText}>Note</Text> */}
      </TouchableOpacity>
      <TouchableOpacity style={[styles.swipeButton, styles.swipeButtonShare]} onPress={pressShare}>
        <Ionicons name="share-social-outline" size={20} color="white" />
        {/* <Text style={styles.swipeButtonText}>Share</Text> */}
      </TouchableOpacity>
      <TouchableOpacity style={[styles.swipeButton, styles.swipeButtonRemove]} onPress={pressRemove}>
         <Ionicons name="trash-outline" size={20} color="white" />
         {/* <Text style={styles.swipeButtonText}>Remove</Text> */}
      </TouchableOpacity>
    </View>
  );
};


const WishlistItem: React.FC<WishlistItemProps> = ({
  imageUrl,
  title,
  subtitle,
  sharedUsers = [], // Default to empty array
}) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.itemContainer}>
        <Image
          style={styles.propertyImage}
          source={{ uri: imageUrl }}
          placeholder={placeholderImage}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
          {sharedUsers.length > 0 && (
            <View style={styles.sharedUsersIndicator}>
              {sharedUsers.map((user, index) => (
                <Image
                  key={index}
                  style={styles.sharedAvatar}
                  source={{ uri: user.avatarUrl }}
                  contentFit="cover"
                />
              ))}
            </View>
          )}
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  itemContainer: { 
    flexDirection: 'row',
    alignItems: 'flex-start', 
    paddingVertical: 5, // Further reduced internal vertical padding (was 8)
    backgroundColor: 'white', 
    marginBottom: 7, // Added spacing between items (was 0)
  },
  propertyImage: { // Renamed from image
    width: 64, 
    height: 64, 
    borderRadius: 6, 
    marginRight: 12, 
    backgroundColor: '#F3F4F6', 
    flexShrink: 0, 
  },
  details: {
    flex: 1,
    minWidth: 0, 
  },
  title: {
    fontSize: 15, // Increased font size (was 14)
    fontWeight: '600', 
    color: '#1F2937', 
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13, // Increased font size (was 12)
    color: '#6B7280', 
    marginBottom: 4,
  },
  sharedUsersIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1, // Moved avatars up (was 6)
  },
  sharedAvatar: {
    // Increase size slightly
    width: 24, // Increased from 16
    height: 24, // Increased from 16
    borderRadius: 12, // Keep rounded
    borderWidth: 1.5, // Thicker border like FB
    borderColor: '#FFFFFF', // White border for overlap
    marginLeft: -6, // Adjust overlap for larger size
    backgroundColor: '#E5E7EB', // Placeholder bg for loading state
    // First avatar should have no negative margin, handle with pseudo-class/logic if needed
  },
  // Styles for Swipe Actions
  swipeActionsContainer: {
    flexDirection: 'row',
  },
  swipeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18, // px-3 equivalent approx
    height: '100%',
  },
//   swipeButtonText: { // If using text labels instead of icons
//     color: 'white',
//     fontSize: 12, // text-xs
//     fontWeight: '500', // font-medium
//   },
  swipeButtonNote: {
    backgroundColor: '#10B981', // green-500
  },
  swipeButtonShare: {
    backgroundColor: '#3B82F6', // blue-500
  },
  swipeButtonRemove: {
    backgroundColor: '#EF4444', // red-500
    // Make last button slightly rounded on the right? Requires nested Views or platform specifics
    // borderTopRightRadius: 8,
    // borderBottomRightRadius: 8,
  },
});

export default WishlistItem; 