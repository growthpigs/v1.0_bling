// app/(tabs)/mesbiens.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Link } from 'expo-router';

// Removed PropertyListItem import as we are defining the structure here now
// import PropertyListItem, { PropertyListItemProps } from '../../components/PropertyListItem';

const Tab = createMaterialTopTabNavigator();

// Define the interface for the richer property data
interface AimesProperty {
  id: string;
  type: 'Apt.' | 'Maison'; // Use abbreviations
  name: string;
  details: string; // e.g., Price, Size, Rooms
  imageUrl: string;
}

// Updated mock data for the "Aimés" list
const mockAimesProperties: AimesProperty[] = [
  {
    id: 'aime-1',
    type: 'Apt.',
    name: 'Av. Victor Hugo', // Shortened name
    details: '€1,250,000 · 120 m² · 5 pièces',
    imageUrl: 'https://placehold.co/100x100/E0E0E0/grey?text=Bien+1', // Placeholder image
  },
  {
    id: 'aime-2',
    type: 'Maison',
    name: 'Rue de Rivoli',
    details: '€2,800,000 · 250 m² · 8 pièces',
    imageUrl: 'https://placehold.co/100x100/E0E0E0/grey?text=Bien+2', // Placeholder image
  },
  {
    id: 'aime-3',
    type: 'Apt.',
    name: 'Bd Saint-Germain',
    details: '€980,000 · 85 m² · 3 pièces',
    imageUrl: 'https://placehold.co/100x100/E0E0E0/grey?text=Bien+3', // Placeholder image
  },
];

// Add mock data for the "Nouveautés" list
const mockNouveautesProperties: AimesProperty[] = [
  {
    id: 'new-1',
    type: 'Maison',
    name: 'Villa Montmorency',
    details: '€5,500,000 · 400 m² · 10 pièces',
    imageUrl: 'https://placehold.co/100x100/E8E8E8/grey?text=Nouveau+1', 
  },
  {
    id: 'new-2',
    type: 'Apt.',
    name: 'Place des Vosges',
    details: '€3,100,000 · 150 m² · 4 pièces',
    imageUrl: 'https://placehold.co/100x100/E8E8E8/grey?text=Nouveau+2', 
  },
];

// --- Shared Render Function --- 
// Define the renderItem function once, outside the screen components
const renderListItem = ({ item }: { item: AimesProperty }) => (
  <Link href={`/property-detail/${item.id}`} asChild>
    <TouchableOpacity style={styles.listItem}>
      <Image
        style={styles.propertyImage}
        source={{ uri: item.imageUrl }}
        placeholder={'https://placehold.co/66x66/E0E0E0/grey?text=...'}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.textContainer}>
        <Text style={styles.lineOneText}>{item.type} {item.name}</Text>
        <Text style={styles.lineTwoText}>{item.details}</Text>
      </View>
    </TouchableOpacity>
  </Link>
);

// --- Screen Components --- 

const AimesScreen = () => {
  // Restore the FlatList
  return (
    // <View style={styles.screenContainer}>
    //   <Text style={styles.placeholderText}>Aimés Screen Test Content</Text>
    // </View>
    <FlatList
      data={mockAimesProperties}
      renderItem={renderListItem} // Use the shared function
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContentContainer}
      style={styles.screenContainer}
    />
  );
};

const PasseScreen = () => (
  <View style={styles.screenContainer}><Text style={styles.placeholderText}>No properties viewed recently.</Text></View>
);

const NouveautesScreen = () => {
  return (
    <FlatList
      data={mockNouveautesProperties} 
      renderItem={renderListItem} // Use the shared function
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContentContainer}
      style={styles.screenContainer}
      ListEmptyComponent={<Text style={styles.placeholderText}>No new properties found.</Text>}
    />
  );
};

// Define constants for font sizes (can be shared if moved to a common file)
const LARGE_SCREEN_LABEL_SIZE = 14; // Increased from 12
const SMALL_SCREEN_LABEL_SIZE = 11; // Increased from 9
const SMALL_SCREEN_WIDTH_THRESHOLD = 390; 

export default function MesBiensTabContainer() {
  // Get screen dimensions
  const { width } = useWindowDimensions();
  // Determine font size based on width
  const labelFontSize = width < SMALL_SCREEN_WIDTH_THRESHOLD ? SMALL_SCREEN_LABEL_SIZE : LARGE_SCREEN_LABEL_SIZE;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator
        initialRouteName="Aimés"
        screenOptions={{
          tabBarLabelStyle: { 
            fontSize: labelFontSize, // Apply responsive font size
            fontFamily: 'SF-Pro-Regular', // Keep existing font family
            textTransform: 'capitalize', // Prevent default uppercase on Android if needed
          },
          // Add other existing screenOptions here if any
          // For example, setting indicator style, colors, etc.
          tabBarIndicatorStyle: {
            backgroundColor: '#000', // Example: Black indicator
            height: 2,
          },
          tabBarActiveTintColor: '#000', // Example: Black active text
          tabBarInactiveTintColor: 'gray', // Example: Gray inactive text
        }}
      >
        <Tab.Screen name="Aimés" component={AimesScreen} options={{ title: 'Aimés' }} />
        <Tab.Screen name="Passés" component={PasseScreen} options={{ title: 'Passé' }}/>
        <Tab.Screen name="Nouveautés" component={NouveautesScreen} options={{ title: 'Nouveautés' }}/>
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContentContainer: {
      paddingHorizontal: 16,
      paddingBottom: 16,
      paddingTop: 16,
  },
  listItem: {
    flexDirection: 'row', // Arrange image and text horizontally
    alignItems: 'center', // Center items vertically
    paddingVertical: 12, // Adjusted padding
    paddingHorizontal: 0, // Padding handled by list container
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#fff', // Changed background to white
    marginBottom: 10, // Spacing between items
    // Removed borderRadius and horizontal padding from here
  },
  propertyImage: {
    width: 66, // Increased size
    height: 66, // Increased size
    borderRadius: 4, 
    marginRight: 12, 
    backgroundColor: '#f0f0f0',
  },
  textContainer: {
    flex: 1, // Allow text to take remaining space
    justifyContent: 'center',
  },
  lineOneText: {
    fontSize: 15, // Keep original size or adjust slightly
    fontFamily: 'SF-Pro-Regular', // Use your desired font
    marginBottom: 4, // Space between lines
    color: '#333', // Darker text color
  },
  lineTwoText: {
    fontSize: 13, // Smaller font size as requested
    fontFamily: 'SF-Pro-Bold', // Use Bold font if available and configured, otherwise fontWeight
    fontWeight: 'bold', // Fallback if SF-Pro-Bold isn't registered
    color: '#555', // Slightly lighter bold text
  },
  placeholderText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
});
