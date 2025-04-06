import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlusScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Plus Screen</Text>
      {/* TODO: Implement Plus (Widget Dashboard) UI according to FSD */}
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