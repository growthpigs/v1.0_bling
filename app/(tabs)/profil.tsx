// app/(tabs)/profil.tsx
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native'; // Added ScrollView
import Colors from '../../constants/Colors'; // Import colors
import Fonts from '../../constants/Fonts';   // Import fonts

export default function ProfilScreen() {
  return (
    // Settings screens are often scrollable
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profil / Settings Screen</Text>
      <Text style={styles.subtitle}>(Conditional Card, Settings List Goes Here)</Text>
       {/* We will replace this with the components from the outline later */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
   scrollView: {
    flex: 1,
    // Use a slightly different background for grouped list effect? e.g., light gray
    backgroundColor: '#f2f2f7', // Example iOS settings background color
  },
  container: {
     flexGrow: 1,
    // Align items to top for settings, not center
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20, // Vertical padding only
    // No horizontal padding on container, groups will handle it
  },
  title: {
    fontSize: Fonts.size.xl,
    fontWeight: Fonts.weight.bold,
    marginBottom: 8,
     color: Colors.light.text,
  },
   subtitle: {
     fontSize: Fonts.size.default,
     color: Colors.light.grey,
  },
});
