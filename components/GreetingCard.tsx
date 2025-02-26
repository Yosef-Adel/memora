import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/ThemedText"; // adjust path as needed
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

export default function GreetingCard() {
  // Use the current theme's background color for the gradient's end color.
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  return (
    <View style={styles.greetingContainer}>
      <LinearGradient
        colors={[
          "rgba(0, 122, 255, 0.1)",
          "rgba(255, 45, 85, 0.1)",
          backgroundColor
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <ThemedText type="title" style={styles.title}>
            Good morning, Reader
          </ThemedText>
          <ThemedText type="default" style={styles.subtitle}>
            Your daily dose of wisdom awaits.
          </ThemedText>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  greetingContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
  },
  content: {
    padding: 24,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    // ThemedText will set the proper color based on the theme.
    fontSize: 16,
    marginTop: 4,
  },
});

