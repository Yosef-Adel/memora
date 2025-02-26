import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";

type FrequencyOption = "daily" | "weekly" | "monthly";
type TimeOption = "morning" | "afternoon" | "evening";

export default function EmailPreferencesScreen() {
  const [email, setEmail] = useState("john.doe@example.com");
  const [emailVerified, setEmailVerified] = useState(true);
  const [frequency, setFrequency] = useState<FrequencyOption>("weekly");
  const [sendTime, setSendTime] = useState<TimeOption>("morning");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [weeklyDigestEnabled, setWeeklyDigestEnabled] = useState(true);
  const [monthlyReportEnabled, setMonthlyReportEnabled] = useState(true);
  const [productUpdatesEnabled, setProductUpdatesEnabled] = useState(true);

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

  const handleSaveEmail = () => {
    // Save email logic
    Alert.alert("Success", "Email updated successfully");
    setEmailVerified(false);
  };

  const handleVerifyEmail = () => {
    // Send verification email logic
    Alert.alert("Verification Email Sent", "Please check your inbox");
  };

  const handleSavePreferences = () => {
    // Save preferences logic
    Alert.alert("Success", "Email preferences updated successfully");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: borderColor }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <AntDesign name="arrowleft" size={20} color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: textColor }]}>
          Email Preferences
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Email Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AntDesign name="mail" size={20} color={primaryColor} />
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              Email Address
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: mutedColor }]}>
                Email Address
              </Text>
              <TextInput
                style={[styles.input, { color: textColor, borderColor }]}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={mutedColor}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: primaryColor }]}
                onPress={handleSaveEmail}
              >
                <Text style={styles.buttonText}>Update Email</Text>
              </TouchableOpacity>

              {!emailVerified && (
                <TouchableOpacity
                  style={[styles.outlineButton, { borderColor: primaryColor }]}
                  onPress={handleVerifyEmail}
                >
                  <Text style={[styles.outlineButtonText, { color: primaryColor }]}>
                    Verify Email
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {!emailVerified && (
              <View style={[styles.verificationBanner, { backgroundColor: "#FFF3CD", borderColor: "#FFE69C" }]}>
                <AntDesign name="bells" size={16} color="#856404" />
                <Text style={styles.verificationText}>
                  Please verify your email address to receive notifications
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Frequency Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AntDesign name="clockcircleo" size={20} color={primaryColor} />
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              Email Frequency
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
            <Text style={[styles.cardLabel, { color: mutedColor }]}>
              How often would you like to receive emails?
            </Text>

            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  frequency === "daily" && { backgroundColor: `${primaryColor}20` },
                  { borderColor },
                ]}
                onPress={() => setFrequency("daily")}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: frequency === "daily" ? primaryColor : textColor },
                  ]}
                >
                  Daily
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.optionButton,
                  frequency === "weekly" && { backgroundColor: `${primaryColor}20` },
                  { borderColor },
                ]}
                onPress={() => setFrequency("weekly")}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: frequency === "weekly" ? primaryColor : textColor },
                  ]}
                >
                  Weekly
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.optionButton,
                  frequency === "monthly" && { backgroundColor: `${primaryColor}20` },
                  { borderColor },
                ]}
                onPress={() => setFrequency("monthly")}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: frequency === "monthly" ? primaryColor : textColor },
                  ]}
                >
                  Monthly
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Send Time Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AntDesign name="clockcircleo" size={20} color={primaryColor} />
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              Preferred Send Time
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
            <Text style={[styles.cardLabel, { color: mutedColor }]}>
              When would you like to receive emails?
            </Text>

            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  sendTime === "morning" && { backgroundColor: `${primaryColor}20` },
                  { borderColor },
                ]}
                onPress={() => setSendTime("morning")}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: sendTime === "morning" ? primaryColor : textColor },
                  ]}
                >
                  Morning
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.optionButton,
                  sendTime === "afternoon" && { backgroundColor: `${primaryColor}20` },
                  { borderColor },
                ]}
                onPress={() => setSendTime("afternoon")}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: sendTime === "afternoon" ? primaryColor : textColor },
                  ]}
                >
                  Afternoon
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.optionButton,
                  sendTime === "evening" && { backgroundColor: `${primaryColor}20` },
                  { borderColor },
                ]}
                onPress={() => setSendTime("evening")}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: sendTime === "evening" ? primaryColor : textColor },
                  ]}
                >
                  Evening
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Notification Types */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AntDesign name="bells" size={20} color={primaryColor} />
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              Notification Types
            </Text>
          </View>

          <View style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
            <View style={styles.switchRow}>
              <View>
                <Text style={[styles.switchLabel, { color: textColor }]}>
                  All Email Notifications
                </Text>
                <Text style={[styles.switchDescription, { color: mutedColor }]}>
                  Master toggle for all email notifications
                </Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: mutedColor, true: `${primaryColor}80` }}
                thumbColor={notificationsEnabled ? primaryColor : "#f4f3f4"}
              />
            </View>

            <View style={[styles.divider, { backgroundColor: borderColor }]} />

            <View style={styles.switchRow}>
              <View>
                <Text style={[styles.switchLabel, { color: textColor }]}>
                  Weekly Digest
                </Text>
                <Text style={[styles.switchDescription, { color: mutedColor }]}>
                  Summary of your weekly activity
                </Text>
              </View>
              <Switch
                value={weeklyDigestEnabled && notificationsEnabled}
                onValueChange={setWeeklyDigestEnabled}
                disabled={!notificationsEnabled}
                trackColor={{ false: mutedColor, true: `${primaryColor}80` }}
                thumbColor={weeklyDigestEnabled && notificationsEnabled ? primaryColor : "#f4f3f4"}
              />
            </View>

            <View style={[styles.divider, { backgroundColor: borderColor }]} />

            <View style={styles.switchRow}>
              <View>
                <Text style={[styles.switchLabel, { color: textColor }]}>
                  Monthly Report
                </Text>
                <Text style={[styles.switchDescription, { color: mutedColor }]}>
                  Monthly statistics and insights
                </Text>
              </View>
              <Switch
                value={monthlyReportEnabled && notificationsEnabled}
                onValueChange={setMonthlyReportEnabled}
                disabled={!notificationsEnabled}
                trackColor={{ false: mutedColor, true: `${primaryColor}80` }}
                thumbColor={monthlyReportEnabled && notificationsEnabled ? primaryColor : "#f4f3f4"}
              />
            </View>

            <View style={[styles.divider, { backgroundColor: borderColor }]} />

            <View style={styles.switchRow}>
              <View>
                <Text style={[styles.switchLabel, { color: textColor }]}>
                  Product Updates
                </Text>
                <Text style={[styles.switchDescription, { color: mutedColor }]}>
                  New features and improvements
                </Text>
              </View>
              <Switch
                value={productUpdatesEnabled && notificationsEnabled}
                onValueChange={setProductUpdatesEnabled}
                disabled={!notificationsEnabled}
                trackColor={{ false: mutedColor, true: `${primaryColor}80` }}
                thumbColor={productUpdatesEnabled && notificationsEnabled ? primaryColor : "#f4f3f4"}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: primaryColor, marginTop: 16 }]}
            onPress={handleSavePreferences}
          >
            <Text style={styles.buttonText}>Save Preferences</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  cardLabel: {
    fontSize: 14,
    marginBottom: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  outlineButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  verificationBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    borderWidth: 1,
  },
  verificationText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#856404",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  optionButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "500",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  switchDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
});
