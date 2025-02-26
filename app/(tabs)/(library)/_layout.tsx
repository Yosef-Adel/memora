import { Stack } from "expo-router";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function LibraryLayout() {
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
            title: "Library",
            gestureEnabled: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="books"
          options={{
            title: "Books",
            gestureEnabled: true,
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="articles"
          options={{
            title: "Articles",
            gestureEnabled: true,
            animation: "slide_from_left",
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
