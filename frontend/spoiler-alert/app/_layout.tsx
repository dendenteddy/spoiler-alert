import { Stack } from "expo-router";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import WelcomeScreen from "./components/welcomeScreen";

export default function RootLayout() {
  const [hasEnteredApp, setHasEnteredApp] = useState(false);

  if (!hasEnteredApp) {
    return (
      <SafeAreaProvider>
        <WelcomeScreen onSkip={() => setHasEnteredApp(true)} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="expired-food-guide" options={{ presentation: "modal" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
