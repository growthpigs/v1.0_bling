import { Tabs } from 'expo-router';
import React from 'react';

// Removed Ionicons import as it's no longer used for tab icons here
// import { Ionicons } from '@expo/vector-icons';

// Import ALL custom icon components using relative paths
import TabBarPlusIcon from '../../components/ui/TabBarPlusIcon';
import TabBarWishlistIcon from '../../components/ui/TabBarWishlistIcon';
import TabBarCentralButton from '../../components/ui/TabBarCentralButton';
import TabBarMesBiensIcon from '../../components/ui/TabBarMesBiensIcon';
import TabBarProfilIcon from '../../components/ui/TabBarProfilIcon';

// Imports needed for the custom central button and layout
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

// Define type for tabBarIcon props for TypeScript (optional but good practice)
interface TabBarIconProps {
  color: string;
  size: number;
  focused: boolean;
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: { borderTopWidth: 0, elevation: 0 }
    }}>

      {/* plus screen */}
      <Tabs.Screen
        name="plus"
        options={{
          title: 'Plus',
          tabBarIcon: ({ color, size }) => <TabBarPlusIcon color={color} size={size} />,
        }}
      />

      {/* wishlist screen */}
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, size }) => <TabBarWishlistIcon color={color} size={size} />,
        }}
      />

      {/* index screen - USES CUSTOM CENTRAL BUTTON */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Chat',
          tabBarButton: (props: BottomTabBarButtonProps) => (
            <TouchableOpacity
              style={styles.centralButtonWrapper}
              onPress={props.onPress}
            >
              <TabBarCentralButton />
            </TouchableOpacity>
          ),
        }}
      />

      {/* mesbiens screen */}
      <Tabs.Screen
        name="mesbiens"
        options={{
          title: 'Mes Biens',
          tabBarIcon: ({ color, size }) => <TabBarMesBiensIcon color={color} size={size} />,
        }}
      />

      {/* profil screen */}
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => <TabBarProfilIcon color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

// Styles for the central button wrapper
const styles = StyleSheet.create({
  centralButtonWrapper: {
    top: -5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});