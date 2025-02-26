import { Tabs, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Platform, useColorScheme as RNUseColorScheme } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";

export default function TabLayout() {
  // Use both hooks to ensure we get consistent color scheme detection
  const colorScheme = useColorScheme();
  const systemColorScheme = RNUseColorScheme();

  console.log("🚀 ~ TabLayout ~ colorScheme:", colorScheme);
  console.log("🚀 ~ TabLayout ~ systemColorScheme:", systemColorScheme);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    }
  }, [user, router]);

  // Get theme-specific colors
  const activeColor = Colors[colorScheme ?? "light"].tint;
  const inactiveColor = Colors[colorScheme ?? "light"].tabIconDefault;
  const bgColor = Colors[colorScheme ?? "light"].background;

  // The navigation container needs to be rendered unconditionally
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => <TabBarBackground colorScheme={colorScheme} />,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              position: "absolute",
              backgroundColor:
                colorScheme === "dark"
                  ? "rgba(18, 18, 18, 0.8)"
                  : "rgba(255, 255, 255, 0.8)",
              borderTopColor: Colors[colorScheme ?? "light"].border,
            },
            default: {
              backgroundColor: bgColor,
              borderTopColor: Colors[colorScheme ?? "light"].border,
            },
          }),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(library)"
        options={{
          title: "Library",
          tabBarIcon: ({ color }) => (
            <Feather name="book-open" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
