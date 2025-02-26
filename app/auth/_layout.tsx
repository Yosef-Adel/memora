import { Stack } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme].background;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor },
          animation: "fade",
        }}
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
