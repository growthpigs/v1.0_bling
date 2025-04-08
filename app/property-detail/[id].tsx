import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router'; // Import Stack for header options, useLocalSearchParams for ID

const PropertyDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>(); // Get property ID from route

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Configure Header */}
      <Stack.Screen options={{
          headerShown: true, // Show header with back button
          headerBackTitle: '', // Correct way to hide back button text
          title: `Property Detail`, // Static title for now
       }} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.infoText}>Displaying details for Property ID: {id || 'N/A'}</Text>

        {/* Image Gallery Placeholder */}
        <View style={[styles.section, styles.imageGalleryPlaceholder]}>
          <Text style={styles.placeholderText}>[Image Gallery/Carousel]</Text>
        </View>

        {/* Header Info Placeholder */}
        <View style={[styles.section, styles.headerInfo]}>
          <Text style={styles.addressTitle}>Address Line 1 Placeholder</Text>
          <Text style={styles.addressSubtitle}>Address Line 2 Placeholder</Text>
          <Text style={styles.priceInfo}>Price / Size / Rooms Placeholder</Text>
        </View>

        {/* Key Features Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <Text style={styles.placeholderText}>[Tags Placeholder]</Text>
        </View>

        {/* Agent Info Placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Agent Info</Text>
          <Text style={styles.placeholderText}>[Agent Details Placeholder]</Text>
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
  infoText: { paddingHorizontal: 16, paddingBottom: 8, color: '#6B7280'},
  section: { marginBottom: 24, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  placeholderText: { fontSize: 14, color: '#9CA3AF', fontStyle: 'italic' },
  imageGalleryPlaceholder: { height: 250, backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center', marginBottom: 16, marginHorizontal: 0 /* Reset padding */ },
  headerInfo: { paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  addressTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  addressSubtitle: { fontSize: 16, color: '#6B7280', marginBottom: 8 },
  priceInfo: { fontSize: 16, fontWeight: '500' },
});

export default PropertyDetailScreen; 