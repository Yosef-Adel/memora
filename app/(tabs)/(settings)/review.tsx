import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";

export default function ReviewSettingsScreen() {
  const [highlightsPerDay, setHighlightsPerDay] = useState(20);
  const [highlightRecency, setHighlightRecency] = useState(50);
  const [receiveBonus, setReceiveBonus] = useState(false);
  const [monthlyGoal, setMonthlyGoal] = useState(200);

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
    { light: Colors.light.primary, dark: Colors.dark.primary },
    "primary"
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: borderColor }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={20} color={textColor} />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>
          Review Settings
        </ThemedText>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Review Settings
          </ThemedText>

          {/* Highlights per Day */}
          <View style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
            <ThemedText type="default" style={styles.inputLabel}>
              Highlights per Day: {highlightsPerDay}
            </ThemedText>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={100}
              step={1}
              value={highlightsPerDay}
              onValueChange={setHighlightsPerDay}
              minimumTrackTintColor={primaryColor}
              maximumTrackTintColor={mutedColor}
            />
          </View>

          {/* Highlight Recency */}
          <View style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
            <ThemedText type="default" style={styles.inputLabel}>
              Highlight Recency: {highlightRecency}
            </ThemedText>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={highlightRecency}
              onValueChange={setHighlightRecency}
              minimumTrackTintColor={primaryColor}
              maximumTrackTintColor={mutedColor}
            />
            <View style={styles.sliderLabels}>
              <ThemedText type="default" style={styles.sliderLabel}>
                Old
              </ThemedText>
              <ThemedText type="default" style={styles.sliderLabel}>
                New
              </ThemedText>
            </View>
          </View>

          {/* Receive Bonus Highlights */}
          <View style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
            <ThemedText type="default" style={styles.inputLabel}>
              Receive Bonus Highlights
            </ThemedText>
            <Switch
              value={receiveBonus}
              onValueChange={setReceiveBonus}
              thumbColor={receiveBonus ? primaryColor : mutedColor}
              trackColor={{ false: mutedColor, true: primaryColor }}
            />
          </View>

          {/* Monthly Highlights Goal */}
          <View style={[styles.card, { backgroundColor: cardColor, borderColor }]}>
            <ThemedText type="default" style={styles.inputLabel}>
              Monthly Highlights Goal: {monthlyGoal}
            </ThemedText>
            <Slider
              style={styles.slider}
              minimumValue={50}
              maximumValue={500}
              step={10}
              value={monthlyGoal}
              onValueChange={setMonthlyGoal}
              minimumTrackTintColor={primaryColor}
              maximumTrackTintColor={mutedColor}
            />
          </View>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sliderLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});

