import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function SettingsLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme].background;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor },
          animation: "fade",
          animationDuration: 100,
          presentation: "transparentModal",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Settings",
            gestureEnabled: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="account"
          options={{
            title: "Account Settings",
            gestureEnabled: true,
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="email"
          options={{
            title: "Email Preferences",
            gestureEnabled: true,
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="review"
          options={{
            title: "Review Settings",
            gestureEnabled: true,
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="frequency"
          options={{
            title: "Frequency Tuning",
            gestureEnabled: true,
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="appearance"
          options={{
            title: "Appearance",
            gestureEnabled: true,
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
