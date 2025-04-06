import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MesBiensScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mes Biens Screen</Text>
      {/* TODO: Implement Mes Biens UI according to FSD */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});