import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View, AppState } from "react-native";
import "react-native-reanimated";

import { AuthProvider } from "@/contexts/AuthContext";
import AuthNavigation from "@/components/navigation/AuthNavigation";

import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Initialize React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Retry failed requests twice
      gcTime: 1000 * 60 * 5, // Keep cache for 5 minutes (was cacheTime)
      staleTime: 1000 * 60, // Mark data as fresh for 1 minute
    },
  },
});

// Auto-refetch when app comes back online
focusManager.setEventListener((handleFocus) => {
  const subscription = AppState.addEventListener("change", (state) => {
    if (state === "active") {
      handleFocus();
    }
  });

  return () => subscription.remove(); // Cleanup function
});

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <View style={{ flex: 1 }} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="index" />
        </Stack>
        <AuthNavigation />
        <StatusBar style="auto" />
      </AuthProvider>
    </QueryClientProvider>
  );
}

