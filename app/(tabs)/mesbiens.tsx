// app/(tabs)/mesbiens.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import PropertyListItem, { PropertyListItemProps } from '../../components/PropertyListItem';

const Tab = createMaterialTopTabNavigator();

const mockAimesProperties: PropertyListItemProps[] = [
  {
    id: 'aime-1',
    imageUrl: 'https://via.placeholder.com/100/FFA07A/808080?text=Aime+1',
    addressLine1: 'Avenue Victor Hugo',
    addressLine2: 'La Garenne-Colombes',
    price: '1,234,567',
    area: 130,
    rooms: 3,
  },
  {
    id: 'aime-2',
    imageUrl: 'https://via.placeholder.com/100/ADD8E6/808080?text=Aime+2',
    addressLine1: 'Rue de Rivoli',
    addressLine2: 'Paris 1er',
    price: '980,000',
    area: 90,
    rooms: 2,
  },
   {
    id: 'aime-3',
    imageUrl: 'https://via.placeholder.com/100/90EE90/808080?text=Aime+3',
    addressLine1: 'Boulevard Saint-Germain',
    addressLine2: 'Paris 6ème',
    price: '2,100,000',
    area: 150,
    rooms: 4,
  },
   {
    id: 'aime-4',
    imageUrl: 'https://via.placeholder.com/100/FFB6C1/808080?text=Aime+4',
    addressLine1: 'Place des Vosges',
    addressLine2: 'Paris 4ème',
    price: '1,750,000',
    area: 110,
    rooms: 3,
  },
];

const AimesScreen = () => {
  return (
    <FlatList
      data={mockAimesProperties}
      renderItem={({ item }) => <PropertyListItem {...item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContentContainer}
      style={styles.screenContainer}
    />
  );
};

const PasseScreen = () => (
  <View style={styles.screenContainer}><Text>Passé Content</Text></View>
);

const NouveautesScreen = () => (
  <View style={styles.screenContainer}><Text>Nouveautés Content</Text></View>
);

export default function MesBiensScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator
        initialRouteName="Aimés"
        screenOptions={{
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
});
