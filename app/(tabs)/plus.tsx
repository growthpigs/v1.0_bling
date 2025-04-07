// app/(tabs)/plus.tsx
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native'; // Added ScrollView
import Colors from '../../constants/Colors'; // Import colors
import Fonts from '../../constants/Fonts';   // Import fonts

export default function PlusScreen() {
  return (
    // Use ScrollView since the outline indicates potentially long content
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Plus Screen</Text>
      <Text style={styles.subtitle}>(Dashboard/Feed Content Goes Here)</Text>
      {/* We will replace this with the components from the wireframe later */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Colors.light.background, // Use theme background
  },
  container: {
    flexGrow: 1, // Allows content to grow and scroll
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Add some padding
  },
  title: {
    fontSize: Fonts.size.xl, // Use theme font size
    fontWeight: Fonts.weight.bold, // Use theme font weight
    marginBottom: 8,
    color: Colors.light.text, // Use theme text color
  },
  subtitle: {
     fontSize: Fonts.size.default,
     color: Colors.light.grey, // Use theme grey color
  },
});
