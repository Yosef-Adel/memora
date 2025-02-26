import { Colors } from "@/constants/Colors";
import { BlurView } from "expo-blur";
import { Platform, View } from "react-native";

type TabBarBackgroundProps = {
  colorScheme?: "light" | "dark";
};

export default function TabBarBackground({
  colorScheme = "light",
}: TabBarBackgroundProps) {
  if (Platform.OS === "ios") {
    // Use blur effect on iOS
    return (
      <BlurView
        tint={colorScheme === "dark" ? "dark" : "light"}
        intensity={90}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 50,
          borderTopWidth: 0.5,
          borderTopColor: Colors[colorScheme].border,
        }}
      />
    );
  } else {
    // Use solid background on Android
    return (
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 85,
          backgroundColor: Colors[colorScheme].background,
          borderTopWidth: 0.5,
          borderTopColor: Colors[colorScheme].border,
        }}
      />
    );
  }
}

export function useBottomTabOverflow() {
  return 0;
}
