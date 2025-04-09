import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router'; // Import Stack for header options, useLocalSearchParams for ID

// --- Mock Data Definition ---

interface PropertyDetail {
  id: string;
  type: 'Apt.' | 'Maison';
  addressLine1: string;
  addressLine2: string; // e.g., City, Postal Code
  price: string; // Formatted price
  size: string; // e.g., "120 m²"
  rooms: string; // e.g., "5 pièces"
  bedrooms?: number;
  bathrooms?: number;
  description: string;
  imageUrls: string[]; // Array for gallery
  keyFeatures: string[];
  agent: {
    name: string;
    agency: string;
    imageUrl?: string;
  };
  // Add other fields as needed: DPE, yearBuilt, etc.
}

// Mock data keyed by the IDs used in mesbiens.tsx
const mockPropertyDetails: { [key: string]: PropertyDetail } = {
  'aime-1': {
    id: 'aime-1',
    type: 'Apt.',
    addressLine1: '123 Av. Victor Hugo',
    addressLine2: '75116 Paris',
    price: '€1,250,000',
    size: '120 m²',
    rooms: '5 pièces',
    bedrooms: 3,
    bathrooms: 2,
    description: 'Magnifique appartement haussmannien entièrement rénové avec vue dégagée. Parquet, moulures, cheminées. Proche commerces et transports.',
    imageUrls: [
      'https://placehold.co/600x400/cccccc/666666?text=Salon',
      'https://placehold.co/600x400/dddddd/777777?text=Chambre+1',
      'https://placehold.co/600x400/eeeeee/888888?text=Cuisine',
      'https://placehold.co/600x400/ffffff/999999?text=Balcon',
    ],
    keyFeatures: ['Balcon filant', 'Parquet Point de Hongrie', 'Cuisine équipée', 'Cave', 'Gardien'],
    agent: {
      name: 'Alice Dubois',
      agency: 'Prestige Immobilier',
      imageUrl: 'https://placehold.co/100x100/E0E0E0/777?text=Alice'
    }
  },
  'aime-2': {
    id: 'aime-2',
    type: 'Maison',
    addressLine1: '45 Rue de Rivoli',
    addressLine2: '75001 Paris',
    price: '€2,800,000',
    size: '250 m²',
    rooms: '8 pièces',
    bedrooms: 5,
    bathrooms: 3,
    description: 'Superbe maison de ville avec jardin privé et terrasse. Beaux volumes, matériaux de qualité. Emplacement exceptionnel au coeur de Paris.',
    imageUrls: [
      'https://placehold.co/600x400/cccccc/666666?text=Façade',
      'https://placehold.co/600x400/dddddd/777777?text=Jardin',
      'https://placehold.co/600x400/eeeeee/888888?text=Salon',
    ],
    keyFeatures: ['Jardin', 'Terrasse', 'Calme absolu', 'Climatisation', 'Garage'],
    agent: {
      name: 'Bernard Laporte',
      agency: 'Paris Centre Realty',
    }
  },
  'aime-3': {
    id: 'aime-3',
    type: 'Apt.',
    addressLine1: '78 Bd Saint-Germain',
    addressLine2: '75005 Paris',
    price: '€980,000',
    size: '85 m²',
    rooms: '3 pièces',
    bedrooms: 2,
    bathrooms: 1,
    description: 'Appartement de charme au dernier étage avec ascenseur. Très lumineux, vue sur les toits de Paris. Idéalement situé dans le quartier Latin.',
    imageUrls: [
      'https://placehold.co/600x400/cccccc/666666?text=Vue+Salon',
      'https://placehold.co/600x400/dddddd/777777?text=Chambre',
    ],
    keyFeatures: ['Dernier étage', 'Ascenseur', 'Lumineux', 'Proche Sorbonne'],
    agent: {
      name: 'Chloé Martin',
      agency: 'Rive Gauche Investissement',
      imageUrl: 'https://placehold.co/100x100/E0E0E0/777?text=Chlo%C3%A9'
    }
  },
};

// --- Component --- 

const PropertyDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Find the property data based on the ID
  const property = id ? mockPropertyDetails[id] : null;

  // Handle case where property is not found
  if (!property) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Stack.Screen options={{ title: 'Error' }} />
        <View style={styles.centered}><Text>Property not found.</Text></View>
      </SafeAreaView>
    );
  }

  // Combine details for display
  const priceDetails = `${property.price} · ${property.size} · ${property.rooms}`;
  const headerTitle = `${property.type} ${property.addressLine1}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Configure Header Dynamically */}
      <Stack.Screen options={{
          headerShown: true,
          headerBackTitle: '',
          title: headerTitle, // Use dynamic title
       }} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Image Gallery - Display first image for now */}
        <View style={styles.imageGalleryPlaceholder}>
          {property.imageUrls.length > 0 ? (
            <Image 
              source={{ uri: property.imageUrls[0] }}
              style={styles.mainImage}
              placeholder={'https://placehold.co/600x400/E0E0E0/grey?text=Loading...'}
              contentFit="cover"
              transition={300}
            />
          ) : (
            <Text style={styles.placeholderText}>[No Images Available]</Text>
          )}
          {/* TODO: Implement swipeable gallery or carousel */}
        </View>

        {/* Header Info */}
        <View style={[styles.section, styles.headerInfo]}>
          <Text style={styles.addressTitle}>{property.addressLine1}</Text>
          <Text style={styles.addressSubtitle}>{property.addressLine2}</Text>
          <Text style={styles.priceInfo}>{priceDetails}</Text>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{property.description}</Text>
        </View>

        {/* Key Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          {property.keyFeatures.map((feature, index) => (
            <Text key={index} style={styles.featureText}>• {feature}</Text>
          ))}
          {/* TODO: Display as tags/pills */}
        </View>

        {/* Agent Info */}
        <View style={[styles.section, styles.agentSection]}>
          <Text style={styles.sectionTitle}>Listed By</Text>
          <View style={styles.agentInfoContainer}>
            {property.agent.imageUrl ? (
               <Image 
                 source={{ uri: property.agent.imageUrl }}
                 style={styles.agentImage}
                 placeholder={'https://placehold.co/50x50/E0E0E0/grey?text=...'}
                 contentFit="cover"
                 transition={300}
               />
            ) : (
              <View style={[styles.agentImage, styles.agentImagePlaceholder]} />
            )}
            <View style={styles.agentTextContainer}>
              <Text style={styles.agentName}>{property.agent.name}</Text>
              <Text style={styles.agentAgency}>{property.agent.agency}</Text>
            </View>
          </View>
          {/* TODO: Add contact agent button */}
        </View>

        {/* Action Buttons Placeholder */}
        <View style={styles.section}>
           <Text style={styles.sectionTitle}>Actions</Text>
           <Text style={styles.placeholderText}>[Contact / Follow Buttons]</Text>
        </View>

        {/* Tabbed Section Placeholder */}
        <View style={styles.section}>
           <Text style={styles.sectionTitle}>More Details</Text>
           <Text style={styles.placeholderText}>[Tabs: Details, Map, Photos...]</Text>
        </View>

         {/* Similar Properties Placeholder */}
         <View style={styles.section}>
           <Text style={styles.sectionTitle}>Similar Properties</Text>
           <Text style={styles.placeholderText}>[List/Grid Placeholder]</Text>
         </View>

         {/* Collaboration Placeholder */}
         <View style={styles.section}>
           <Text style={styles.sectionTitle}>Collaboration</Text>
           <Text style={styles.placeholderText}>[Sharing / Comments Placeholder]</Text>
         </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContainer: { paddingBottom: 32 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }, // For error message
  infoText: { paddingHorizontal: 16, paddingBottom: 8, color: '#6B7280'},
  section: { marginBottom: 20, paddingHorizontal: 16 }, // Slightly reduced marginBottom
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 }, // Increased marginBottom
  placeholderText: { fontSize: 14, color: '#9CA3AF', fontStyle: 'italic' },
  imageGalleryPlaceholder: { 
    height: 250, 
    backgroundColor: '#E5E7EB', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 0, // Remove bottom margin, headerInfo provides separation 
    marginHorizontal: 0 /* Reset padding */ 
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  headerInfo: { 
    paddingTop: 16, // Added top padding
    paddingBottom: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: '#E5E7EB',
    marginBottom: 20, // Match section margin
   },
  addressTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 4, color: '#111827' }, // Darker color
  addressSubtitle: { fontSize: 16, color: '#6B7280', marginBottom: 8 },
  priceInfo: { fontSize: 16, fontWeight: '500', color: '#111827' }, // Darker color
  descriptionText: {
    fontSize: 15,
    lineHeight: 22, // Improved readability
    color: '#374151',
  },
  featureText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#374151',
    marginBottom: 4,
  },
  agentSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 16,
  },
  agentInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agentImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: '#E5E7EB',
  },
  agentImagePlaceholder: {
    // Inherits size/borderRadius from agentImage
    // Add specific styles if needed, e.g., icon inside
  },
  agentTextContainer: {
    flex: 1, // Takes remaining space
  },
  agentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  agentAgency: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default PropertyDetailScreen; 