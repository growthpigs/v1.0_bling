import { Tabs } from 'expo-router';
import React from 'react';

// Drawer Imports
import { createDrawerNavigator } from '@react-navigation/drawer';
// Gesture Handler - likely already in root layout, but needed for drawer interaction
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Removed Ionicons import as it's no longer used for tab icons here
// import { Ionicons } from '@expo/vector-icons';

// Import ALL custom icon components using relative paths
import TabBarPlusIcon from '../../components/ui/TabBarPlusIcon';
import TabBarWishlistIcon from '../../components/ui/TabBarWishlistIcon';
import TabBarCentralButton from '../../components/ui/TabBarCentralButton';
import TabBarMesBiensIcon from '../../components/ui/TabBarMesBiensIcon';
import TabBarProfilIcon from '../../components/ui/TabBarProfilIcon';
import BlurTabBarBackground from '../../components/ui/TabBarBackground';

// Imports needed for the custom central button and layout
import { TouchableOpacity, View, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

// Define type for tabBarIcon props for TypeScript (optional but good practice)
interface TabBarIconProps {
  color: string;
  size: number;
  focused: boolean;
}

// Create Drawer Navigator instance
const Drawer = createDrawerNavigator();

// Placeholder Drawer Content Component
function CustomDrawerContent(props: any) {
  // Use SafeAreaView to respect notches/islands inside the drawer
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Text style={{ padding: 16, fontSize: 18, fontWeight: 'bold' }}>History Nav (Drawer)</Text>
        <Text style={{ padding: 16 }}>[User Info / Sign Up CTA Here]</Text>
        <Text style={{ padding: 16 }}>[Recent Searches List Here]</Text>
        <Text style={{ padding: 16 }}>[Account Settings Link Here]</Text>
        <Text style={{ padding: 16, fontSize: 10 }}>[App Version Here]</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// Original Tabs Layout defined as an internal component
function BottomTabsLayout() {
  return (
    <Tabs 
        // initialRouteName="index" // Setting initial route name here might conflict with drawer state; manage focus via drawer navigation if needed.
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#CCCCCC',
          tabBarLabelStyle: {
            fontFamily: 'SF-Pro-Regular',
            fontSize: 10,
          },
        }}
    >
      {/* plus screen */}
      <Tabs.Screen
        name="plus"
        options={{
          title: 'Plus',
          tabBarIcon: ({ color, size }) => {
            const largerSize = size + 2;
            return <TabBarPlusIcon color={color} size={largerSize} />;
          },
          tabBarLabel: ({ children, color }) => (
            <Text style={{ color: color, fontSize: 12, fontFamily: 'SF-Pro-Regular' }}>
              {children}
            </Text>
          ),
        }}
      />

      {/* wishlist screen */}
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, size }) => {
            const largerSize = size + 2;
            return (
              <View style={{ transform: [{ translateX: -12 }] }}>
                <TabBarWishlistIcon color={color} size={largerSize} />
              </View>
            );
          },
          tabBarLabel: ({ children, color }) => (
            <View style={{ transform: [{ translateX: -12 }] }}>
              <Text style={{ color: color, fontSize: 12, fontFamily: 'SF-Pro-Regular' }}>
                {children}
              </Text>
            </View>
          ),
        }}
      />

      {/* index screen - USES CUSTOM CENTRAL BUTTON */}
      <Tabs.Screen
        name="index" // This is still the central tab, mapping to ChatScreen likely
        options={{
          title: 'Chat', // Title for the screen itself (if header shown), or accessibility
          tabBarButton: (props: BottomTabBarButtonProps) => (
            <TouchableOpacity
              style={styles.centralButtonWrapper}
              onPress={props.onPress} // Navigate to the screen defined by `name="index"`
            >
              <TabBarCentralButton />
            </TouchableOpacity>
          ),
          // No tabBarIcon or tabBarLabel needed when using tabBarButton
        }}
      />

      {/* mesbiens screen */}
      <Tabs.Screen
        name="mesbiens"
        options={{
          title: 'Mes Biens',
          tabBarIcon: ({ color, size }) => {
            return (
              <View style={{ transform: [{ translateX: 12 }] }}>
                <TabBarMesBiensIcon color={color} size={size} />
              </View>
            );
          },
          tabBarLabel: ({ children, color }) => (
            <View style={{ transform: [{ translateX: 12 }] }}>
              <Text style={{ color: color, fontSize: 12, fontFamily: 'SF-Pro-Regular' }}>
                {children}
              </Text>
            </View>
          ),
        }}
      />

      {/* profil screen */}
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => {
            const largerSize = size + 2;
            return <TabBarProfilIcon color={color} size={largerSize} />;
          },
          tabBarLabel: ({ children, color }) => (
            <Text style={{ color: color, fontSize: 12, fontFamily: 'SF-Pro-Regular' }}>
              {children}
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}

// Main Export is now the Drawer Navigator
export default function TabLayout() {
  return (
    // GestureHandlerRootView should ideally be in the ROOT _layout (app/_layout.tsx)
    // If drawer gestures don't work, uncommenting this might be necessary, 
    // but avoid nesting GestureHandlerRootViews if possible.
    // <GestureHandlerRootView style={{ flex: 1 }}> 
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false, // Hide default drawer header
          drawerStyle: {
            width: '90%', // FSD Width requirement
          },
          swipeEnabled: true, // Allow swipe to open/close
        }}
      >
        {/* The component for this screen IS the entire bottom tab navigator */}
        <Drawer.Screen name="AppTabs" component={BottomTabsLayout} />
      </Drawer.Navigator>
    // </GestureHandlerRootView>
  );
}

// Styles for the central button wrapper
const styles = StyleSheet.create({
  centralButtonWrapper: {
    top: -10, // Lowered the button (was -20)
    justifyContent: 'center',
    alignItems: 'center',
  },
});