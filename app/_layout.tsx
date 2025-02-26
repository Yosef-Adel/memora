import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { View, ActivityIndicator } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// This component is responsible for the authentication flow
// It will only be rendered AFTER the AuthProvider is fully mounted
function AuthRoute() {
  const { user, loading } = useAuth();
  console.log("🚀 ~ AuthRoute ~ loading:", loading);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    console.log("🚀 ~ useEffect ~ user:", user);
    if (!user) {
      // If no user and not already on auth screen, redirect to login
      router.replace("/auth/login");
    } else {
      // If user is authenticated and on an auth screen, redirect to home
      router.replace("/(tabs)");
    }
    console.log("🚀 ~ useEffect ~ loading:", loading);
  }, [user, loading, segments]);

  return null;
}

function RootLayoutNavigator() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* Include the auth route component INSIDE the navigation structure */}
      <AuthRoute />

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  console.log("🚀 ~ RootLayout ~ loaded:", loaded);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <Slot />; // Render a Slot even when fonts aren't loaded
  }

  // Place the AuthProvider at the root level
  return (
    <AuthProvider>
      <RootLayoutNavigator />
    </AuthProvider>
  );
}
