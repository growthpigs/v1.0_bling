import { Stack } from 'expo-router';

export default function RootLayout() {
  // This sets up the main navigator. We hide the header here.
  return <Stack screenOptions={{ headerShown: false }} />;
}