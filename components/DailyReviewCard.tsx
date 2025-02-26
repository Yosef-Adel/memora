import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar } from "react-native-paper";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText"; // adjust path as needed
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

const DailyReviewCard = () => {
  const navigation = useNavigation();

  // Dynamic colors based on theme
  const cardBackground = useThemeColor(
    { light: Colors.light.card, dark: Colors.dark.card },
    "card"
  );
  const primaryColor = useThemeColor(
    { light: Colors.light.primary, dark: Colors.dark.primary },
    "text"
  );
  const textColor = useThemeColor(
    { light: Colors.light.text, dark: Colors.dark.text },
    "text"
  );
  const backgroundColor = useThemeColor(
    { light: Colors.light.background, dark: Colors.dark.background },
    "background"
  );

  return (
    <TouchableOpacity
      onPress={() => console.log("navigation")}
      style={[styles.card, { backgroundColor: cardBackground }]}
    >
      <View style={styles.cardContent}>
        <View style={styles.progressContainer}>
          <LinearGradient
            colors={[
              "rgba(0,122,255,0.1)",
              "rgba(255,45,85,0.1)",
              backgroundColor,
            ]}
            style={styles.progressBackground}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <View>
              <View style={styles.titleRow}>
                <Ionicons
                  name="sparkles-sharp"
                  size={20}
                  color={primaryColor}
                />
                <ThemedText type="defaultSemiBold" style={styles.title}>
                  Daily Review
                </ThemedText>
              </View>
              <ThemedText type="default" style={styles.subtitle}>
                8/20 highlights reviewed
              </ThemedText>
            </View>
            <TouchableOpacity style={styles.button}>
              <AntDesign name="arrowright" size={16} color={Colors.light.text} />
            </TouchableOpacity>
          </View>
          <ProgressBar
            progress={0.4}
            color={primaryColor}
            style={styles.progressBar}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF", // overridden by theme
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressContainer: {
    position: "relative",
    marginRight: 16,
  },
  progressBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 100,
    opacity: 0.2,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 6,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#EAEAEA",
    borderRadius: 20,
    padding: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 10,
    marginTop: 8,
  },
});

export default DailyReviewCard;

