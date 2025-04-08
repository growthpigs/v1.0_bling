import { Stack, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'SF-Pro-Regular': require('../assets/fonts/SF-Pro-Text-Regular.otf'),
    'SF-Pro-Bold': require('../assets/fonts/SF-Pro-Text-Bold.otf'),
    // Add new font weights
    'SF-Pro-Heavy': require('../assets/fonts/SF-Pro-Text-Heavy.otf'),
    'SF-Pro-Semibold': require('../assets/fonts/SF-Pro-Text-Semibold.otf'),
    'SF-Pro-Light': require('../assets/fonts/SF-Pro-Text-Light.otf'),
    'SF-Pro-Thin': require('../assets/fonts/SF-Pro-Text-Thin.otf'),
    // Keep SpaceMono if it was intended to be loaded
    // 'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error; // Handle font loading errors
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync(); // Hide splash screen once fonts are loaded
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Return null or a loading indicator while fonts are loading
  }

  // Render the navigator once fonts are loaded
  return <Stack screenOptions={{ headerShown: false }} />;
}