// app/(tabs)/wishlist.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image as RNImage, // Renamed to avoid conflict with expo-image
  Alert, // Import Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For header icons
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

// Import the new WishlistItem component
import WishlistItem, { WishlistItemProps } from '../../components/WishlistItem';

// Mock Data with avatarUrl
const mockWishlistData: WishlistItemProps[] = [
  {
    id: 'wish-1',
    imageUrl: 'https://placehold.co/100x100/E2E8F0/A0AEC0?text=Prop+A',
    title: 'Appartement - Rue de Rivoli, Paris 1er',
    subtitle: '€1,150,000 | 85m² | 3 pièces',
    sharedUsers: [
      { avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg' }, // Mock face 1
      { avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg' }, // Mock face 2
    ],
  },
  {
    id: 'wish-2',
    imageUrl: 'https://placehold.co/100x100/D1FAE5/34D399?text=Prop+B',
    title: 'Maison - Avenue Foch, Paris 16ème',
    subtitle: '€3,500,000 | 250m² | 6 pièces',
    sharedUsers: [
      { avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg' }, // Mock face 1
    ],
  },
  {
    id: 'wish-3',
    imageUrl: 'https://placehold.co/100x100/FEF3C7/FBBF24?text=Prop+C',
    title: 'Studio - Rue Mouffetard, Paris 5ème',
    subtitle: '€450,000 | 30m² | 1 pièce',
    sharedUsers: [],
  },
];

export default function WishlistScreen() {
  // Dummy action for header buttons
  const handleSelectWishlist = () => Alert.alert('Select Wishlist');
  const handleAddUser = () => Alert.alert('Add User');
  const handleCreateWishlist = () => Alert.alert('Create Wishlist');

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Wishlist Header */}
      <View style={styles.wishlistHeader}>
        <TouchableOpacity style={styles.wishlistSelectorButton} onPress={handleSelectWishlist}>
          <Text style={styles.wishlistSelectorText}>Personal</Text>
          <Ionicons name="chevron-down-outline" size={20} color="#6B7280" style={styles.wishlistSelectorIcon} />
        </TouchableOpacity>
        <View style={styles.sharingIndicator}>
          {/* Replace RNImage with Image if using expo-image for avatars */}
          <RNImage style={styles.avatar} source={{ uri: 'https://placehold.co/24x24/A0AEC0/FFFFFF?text=T' }} />
          <RNImage style={styles.avatar} source={{ uri: 'https://placehold.co/24x24/718096/FFFFFF?text=V' }} />
          <TouchableOpacity style={styles.addUserButton} onPress={handleAddUser}>
            <Text style={styles.addUserButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Use FlatList directly - item styles are now in WishlistItem */}
      <FlatList
        data={mockWishlistData}
        keyExtractor={(item) => item.id}
        // Render WishlistItem directly, no wrapper needed here
        renderItem={({ item }) => <WishlistItem {...item} />}
        contentContainerStyle={styles.listContentContainer}
        style={styles.listContainer} // Ensure list container has white background
      />

      {/* Footer Action - Positioned Absolutely */}
      <View style={styles.footerAction}>
        <TouchableOpacity style={styles.createButton} onPress={handleCreateWishlist}>
          {/* Wrap Text with LinearGradient */}
          <LinearGradient
            colors={['#4A90E2', '#007AFF']} // Example gradient - adjust if needed
            style={styles.gradientStyle} // Apply padding/radius to gradient
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
          >
            <Text style={styles.createButtonText}>+ Create a new wishlist</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background for safe area
  },
  wishlistHeader: {
    paddingHorizontal: 16, // px-4
    paddingTop: 16, // pt-4
    paddingBottom: 12, // pb-3
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB', // border-gray-200
    backgroundColor: '#FFFFFF', // Header has white background
    flexShrink: 0,
  },
  wishlistSelectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wishlistSelectorText: {
    fontSize: 18, // text-lg
    fontWeight: '700', // font-bold
    color: '#1F2937', // text-gray-800
  },
  wishlistSelectorIcon: {
    marginLeft: 4, // ml-1
    // color: '#6B7280', // text-gray-500 (set inline)
  },
  sharingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    // space-x-1 handled by negative margin on avatar
  },
  avatar: { 
    width: 24, // w-6
    height: 24, // h-6
    borderRadius: 12, // rounded-full
    backgroundColor: '#CBD5E1', // bg-gray-300 placeholder
    borderWidth: 2,
    borderColor: 'white',
    marginLeft: -8, // -ml-2 equivalent for overlap
    // first:ml-0 handled by the first element not having margin
  },
  addUserButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#DBEAFE', // bg-blue-100
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8,
  },
   addUserButtonText: {
     color: '#2563EB', // text-blue-600
     fontSize: 12, // text-xs
     fontWeight: '700',
     lineHeight: 14, // Adjust line height to center '+'
   },
  listContainer: {
    flex: 1, 
    backgroundColor: '#FFFFFF', // Ensure list background is white
  },
  listContentContainer: {
    paddingHorizontal: 16, 
    paddingVertical: 16, 
    paddingBottom: 95, // Increased padding to avoid overlap (was 80)
  },
  footerAction: {
    position: 'absolute',
    bottom: 40, // Moved up further (was 25)
    left: 16,   
    right: 16,  
    flexShrink: 0,
  },
  createButton: {
    borderRadius: 8, // Keep radius for TouchableOpacity ripple/feedback if any
    overflow: 'hidden', // Clip the gradient content to the border radius
  },
  // New style for the gradient wrapper
  gradientStyle: {
    paddingVertical: 12, // Adjusted padding for better visual
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center', // Center text inside gradient
  },
  createButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
