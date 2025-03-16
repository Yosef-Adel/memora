import { View, ActivityIndicator, StyleSheet } from "react-native";

// This file serves as a loading screen
export default function Index() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4A3780" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
