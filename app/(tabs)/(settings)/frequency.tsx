import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Image } from "react-native";
import Slider from "@react-native-community/slider";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";

export default function FrequencyTuningScreen() {
  // Use a tab state: "books" or "articles"
  const [activeTab, setActiveTab] = useState("books");
  // Store each item's slider frequency (0=Never, 1=Less, 2=Normally, 3=More)
  const [itemFrequencies, setItemFrequencies] = useState({});

  const frequencyLabels = ["Never", "Less", "Normally", "More"];

  // Dummy data arrays
  const dummyBooks = [
    { id: "b1", title: "Book One", image: "https://via.placeholder.com/100" },
    { id: "b2", title: "Book Two", image: "https://via.placeholder.com/100" },
    { id: "b3", title: "Book Three", image: "https://via.placeholder.com/100" },
  ];
  const dummyArticles = [
    { id: "a1", title: "Article One", image: "https://via.placeholder.com/100" },
    { id: "a2", title: "Article Two", image: "https://via.placeholder.com/100" },
    { id: "a3", title: "Article Three", image: "https://via.placeholder.com/100" },
  ];

  // Choose the items based on activeTab
  const items = activeTab === "books" ? dummyBooks : dummyArticles;

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

  // When activeTab changes, initialize frequencies for items if not already set.
  useEffect(() => {
    items.forEach(item => {
      setItemFrequencies(prev => {
        if (prev[item.id] === undefined) {
          return { ...prev, [item.id]: 2 };
        }
        return prev;
      });
    });
  }, [activeTab]);

  const updateFrequency = (id, value) => {
    setItemFrequencies(prev => ({ ...prev, [id]: value }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: borderColor }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={20} color={textColor} />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>
          Frequency Tuning
        </ThemedText>
      </View>

      {/* Tabs */}
      <View style={[styles.tabs, { backgroundColor: `${mutedColor}20` }]}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "books" && { backgroundColor: cardColor },
          ]}
          onPress={() => setActiveTab("books")}
        >
          <ThemedText
            type="default"
            style={[
              styles.tabText,
              { color: activeTab === "books" ? textColor : mutedColor },
            ]}
          >
            Books
          </ThemedText>
        </TouchableOpacity>
        {/* vertical line */}
        <View
          style={{
            width: 0.5,
            backgroundColor: mutedColor,
            height: "60%",
            alignSelf: "center",
          }}
        />
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "articles" && { backgroundColor: cardColor },
          ]}
          onPress={() => setActiveTab("articles")}
        >
          <ThemedText
            type="default"
            style={[
              styles.tabText,
              { color: activeTab === "articles" ? textColor : mutedColor },
            ]}
          >
            Articles
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {items.map(item => (
          <View
            key={item.id}
            style={[styles.itemCard, { backgroundColor: cardColor, borderColor }]}
          >
            <View style={styles.itemImageContainer}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
            </View>
            <View style={styles.itemContent}>
              <ThemedText type="defaultSemiBold" style={styles.itemTitle}>
                {item.title}
              </ThemedText>
              <ThemedText type="default" style={styles.inputLabel}>
                Frequency: {frequencyLabels[itemFrequencies[item.id] ?? 2]}
              </ThemedText>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={3}
                step={1}
                value={itemFrequencies[item.id] ?? 2}
                onValueChange={value => updateFrequency(item.id, value)}
                minimumTrackTintColor={primaryColor}
                maximumTrackTintColor={mutedColor}
              />
              <View style={styles.sliderLabels}>
                {frequencyLabels.map((label, index) => (
                  <ThemedText key={index} type="default" style={styles.sliderLabel}>
                    {label}
                  </ThemedText>
                ))}
              </View>
            </View>
          </View>
        ))}
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
  tabs: {
    flexDirection: "row",
    padding: 8,
    margin: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-around",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    flex: 1,
  },
  itemCard: {
    flexDirection: "row",
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  itemImageContainer: {
    marginRight: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemContent: {
    flex: 1,
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
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

