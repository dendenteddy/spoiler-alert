import { Stack } from "expo-router";
import { useState } from "react";
import WelcomeScreen from "./components/welcomeScreen";

export default function RootLayout() {
  const [hasEnteredApp, setHasEnteredApp] = useState(false);

  if (!hasEnteredApp) {
    return <WelcomeScreen onSkip={() => setHasEnteredApp(true)} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
