import { Tabs } from 'expo-router';
import React from 'react';
// Import an icon library (Ionicons is commonly available in Expo)
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import TabBarCentralButton from '@/components/ui/TabBarCentralButton';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';

// Import other components later if needed for custom icons/tab bar

// Define type for tabBarIcon props
interface TabBarIconProps {
  color: string;
  size: number;
  focused: boolean;
}

// Define type for tabBarLabel props
interface TabBarLabelProps {
  color: string;
  focused: boolean; // Although not used in the Text style, it's part of the props
}

export default function TabLayout() {
  // const colorScheme = useColorScheme(); // Can add this later if needed for colors

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint, // Add styling later
        headerShown: false, // We'll handle headers in individual screens or stack
        tabBarStyle: { height: 60 }, // Example: Adjust tab bar style if needed
      }}>

      {/* 1. Plus */}
      <Tabs.Screen
        name="plus" // Corresponds to app/(tabs)/plus.tsx
        options={{
          title: 'Plus', // Keep title for accessibility, but hide label visually later if needed
          tabBarIcon: ({ color, size, focused }: TabBarIconProps) => (
            <Ionicons name={focused ? "sparkles" : "sparkles-outline"} size={size} color={color} />
          ),
          tabBarLabel: ({ color }: TabBarLabelProps) => (
            <Text style={{ color: color }}>Plus</Text>
          ),
        }}
      />

      {/* 2. Wishlist */}
      <Tabs.Screen
        name="wishlist" // Corresponds to app/(tabs)/wishlist.tsx
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, size, focused }: TabBarIconProps) => (
            <Ionicons name={focused ? "heart" : "heart-outline"} size={size} color={color} />
          ),
          tabBarLabel: ({ color }: TabBarLabelProps) => (
            <Text style={{ color: color }}>Wishlist</Text>
          ),
        }}
      />

      {/* 3. Index (Chat / Central Button) */}
      <Tabs.Screen
        name="index" // Corresponds to app/(tabs)/index.tsx
        options={{
          // title: 'Chat', // Removed title
          // We will customize this one significantly later
          tabBarButton: (props: BottomTabBarButtonProps) => (
            <TouchableOpacity
              style={styles.centralButtonWrapper} // Add style for positioning
              onPress={props.onPress}
              accessibilityState={props.accessibilityState}
            >
               <TabBarCentralButton /> {/* Render the SVG component inside */}
            </TouchableOpacity>
          ),
          // No tabBarLabel needed for the central button
        }}
      />

      {/* 4. Mes Biens */}
       <Tabs.Screen
        name="mesbiens" // Corresponds to app/(tabs)/mesbiens.tsx
        options={{
          title: 'Mes Biens',
           tabBarIcon: ({ color, size, focused }: TabBarIconProps) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          ),
          tabBarLabel: ({ color }: TabBarLabelProps) => (
            <Text style={{ color: color }}>Mes Biens</Text>
          ),
        }}
      />

      {/* 5. Profil */}
       <Tabs.Screen
        name="profil" // Corresponds to app/(tabs)/profil.tsx
        options={{
          title: 'Profil',
           tabBarIcon: ({ color, size, focused }: TabBarIconProps) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
          ),
          tabBarLabel: ({ color }: TabBarLabelProps) => (
            <Text style={{ color: color }}>Profil</Text>
          ),
        }}
      />

    </Tabs>
  );
}

// Add StyleSheet for the wrapper
const styles = StyleSheet.create({
  centralButtonWrapper: {
    // Style to lift the button up
    top: -18,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // Ensure touch area covers the button
    width: 70,
    height: 70,
  },
});