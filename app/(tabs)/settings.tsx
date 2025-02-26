import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  useColorScheme,
  Appearance,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const { user, logout } = useAuth();

  const cardColor = useThemeColor(
    { light: Colors.light.card, dark: Colors.dark.card },
    "card"
  );
  const borderColor = useThemeColor(
    { light: Colors.light.border, dark: Colors.dark.border },
    "border"
  );

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => logout(), style: "destructive" },
    ]);
  };
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );
  const textColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );

  const toggleTheme = () => {
    // This will change the system theme preference
    Appearance.setColorScheme(isDarkMode ? "light" : "dark");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ThemedText type="title" style={styles.headerTitle}>
        Settings
      </ThemedText>

      {/* User info section */}
      <View
        style={[
          styles.profileCard,
          { backgroundColor: cardColor, borderColor },
        ]}
      >
        <ThemedText type="defaultSemiBold">{user?.name || "User"}</ThemedText>
        <ThemedText style={styles.emailText}>
          {user?.email || "user@example.com"}
        </ThemedText>
      </View>

      {/* Settings options */}
      <View style={styles.settingRow}>
        <ThemedText
          type="default"
          style={[styles.settingLabel, { color: textColor }]}
        >
          Dark Mode
        </ThemedText>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          thumbColor={isDarkMode ? Colors.dark.primary : Colors.light.primary}
          trackColor={{ false: Colors.light.muted, true: Colors.dark.muted }}
        />
      </View>
      {/* Logout button */}
      <TouchableOpacity
        style={[styles.logoutButton, { borderColor }]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
        <ThemedText style={styles.logoutText}>Logout</ThemedText>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  profileCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1,
  },
  emailText: {
    marginTop: 4,
    opacity: 0.7,
  },
  settingsSection: {
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
  chevron: {
    opacity: 0.7,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    marginTop: "auto",
  },
  logoutText: {
    marginLeft: 16,
    fontSize: 16,
    color: "#FF3B30",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  settingLabel: {
    fontSize: 18,
  },
});
