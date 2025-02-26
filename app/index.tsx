import { View, ActivityIndicator } from "react-native";
import { useAuth } from "@/contexts/AuthContext";

// This file serves as a loading screen and redirector
export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#4A3780" />
    </View>
  );
}
