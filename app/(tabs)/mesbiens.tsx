// app/(tabs)/mesbiens.tsx
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native'; // Added ScrollView
import Colors from '../../constants/Colors'; // Import colors
import Fonts from '../../constants/Fonts';   // Import fonts

export default function MesBiensScreen() {
  return (
    // Use ScrollView for the property list
     <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mes Biens Screen</Text>
      <Text style={styles.subtitle}>(Segmented Control, Property List Goes Here)</Text>
      {/* We will replace this with the components from the outline later */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
   scrollView: {
    flex: 1,
    backgroundColor: Colors.light.background, // Use theme background (maybe gray for settings?)
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
