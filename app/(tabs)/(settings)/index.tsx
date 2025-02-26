import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { AntDesign, Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { useAuth } from "@/contexts/AuthContext";

type SettingCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
};

export default function SettingsScreen() {
  const { logout } = useAuth();
  // Theme colors
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );
  const textColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );
  const mutedColor = useThemeColor(
    { light: Colors.light.muted, dark: Colors.dark.muted },
    "muted"
  );
  const borderColor = useThemeColor(
    { light: Colors.light.border, dark: Colors.dark.border },
    "border"
  );
  const cardColor = useThemeColor(
    { light: Colors.light.card, dark: Colors.dark.card },
    "card"
  );
  const primaryColor = useThemeColor(
    { light: Colors.light.primary, dark: Colors.light.primary },
    "primary"
  );
  const iconColor = useThemeColor(
    { light: Colors.light.icon, dark: Colors.dark.icon },
    "icon"
  );

  const SettingCard = ({ title, description, icon, href }: SettingCardProps) => (
    <Link href={href as any} asChild>
      <TouchableOpacity
        style={[styles.card, { backgroundColor: cardColor, borderColor }]}
      >
        <View style={styles.cardContent}>
          <View
            style={[styles.iconContainer, { backgroundColor: `${primaryColor}15` }]}
          >
            {icon}
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.cardTitle, { color: textColor }]}>{title}</Text>
            <Text style={[styles.cardDescription, { color: mutedColor }]}>
              {description}
            </Text>
          </View>
          <Entypo name="chevron-right" size={20} color={iconColor} />
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: textColor }]}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.settingsList}>
          <SettingCard
            title="Account Settings"
            description="Manage your profile, password, and account"
            icon={<AntDesign name="user" size={20} color={primaryColor} />
            }
            href="/(settings)/account"
          />
          <SettingCard
            title="Email Preferences"
            description="Update email and notification settings"
            icon={<AntDesign name="mail" size={20} color={primaryColor} />}
            href="/(settings)/email"
          />
          <SettingCard
            title="Review Settings"
            description="Customize your highlight and review experience"
            icon={<AntDesign name="staro" size={24} color={primaryColor} />}
            href="/(settings)/review"
          />
          <SettingCard
            title="Frequency Tuning"
            description="Adjust content frequency for books and articles"
            icon={<FontAwesome name="sliders" size={24} color={primaryColor} />}
            href="/(settings)/frequency"
          />
          <SettingCard
            title="Appearance"
            description="Customize your app theme"
            icon={<MaterialCommunityIcons name="theme-light-dark" size={24} color={primaryColor} />}
            href="/(settings)/appearance"
          />

        </View>

        <TouchableOpacity
          style={[styles.logoutButton, { borderColor }]}
          onPress={() => {
            Alert.alert("Logout", "Are you sure you want to logout?", [
              { text: "Cancel", style: "cancel" },
              { text: "Logout", onPress: () => logout(), style: "destructive" },
            ]);
          }}
        >
          <AntDesign name="logout" size={20} color="#FF6B6B" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={[styles.versionText, { color: mutedColor }]}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
  },
  content: {
    flex: 1,
  },
  settingsList: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
  },
  cardContent: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FF6B6B20",
    backgroundColor: "#FF6B6B10",
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B6B",
  },
  footer: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 24,
  },
  versionText: {
    fontSize: 14,
  },
});
