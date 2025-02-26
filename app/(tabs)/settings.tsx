import { SafeAreaView } from "react-native-safe-area-context"
import { View, StyleSheet, Switch, useColorScheme, Appearance } from "react-native"
import { ThemedText } from "@/components/ThemedText"
import { Colors } from "@/constants/Colors"
import { useThemeColor } from "@/hooks/useThemeColor"

export default function SettingsScreen() {
  const colorScheme = useColorScheme()
  const isDarkMode = colorScheme === "dark"

  const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, "background")
  const textColor = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, "text")

  const toggleTheme = () => {
    // This will change the system theme preference
    Appearance.setColorScheme(isDarkMode ? "light" : "dark")
  }

  return (
    <SafeAreaView style={[{ backgroundColor }, styles.container]}>
      <ThemedText type="title" style={styles.header}>
        Settings
      </ThemedText>
      <View style={styles.settingRow}>
        <ThemedText type="default" style={[styles.settingLabel, { color: textColor }]}>
          Dark Mode
        </ThemedText>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          thumbColor={isDarkMode ? Colors.dark.primary : Colors.light.primary}
          trackColor={{ false: Colors.light.muted, true: Colors.dark.muted }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
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
})


