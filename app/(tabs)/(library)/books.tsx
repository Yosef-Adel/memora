import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/Feather";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

type SortOption = "recent" | "highlights" | "title";

type BookCardProps = {
  index: number;
};

export default function BooksScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("recent");

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

  const BookCard = ({ index }: BookCardProps) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: cardColor, borderColor }]}
      onPress={() => { }}
    >
      <View style={styles.cardContent}>
        <View
          style={[styles.bookImage, { backgroundColor: `${primaryColor}10` }]}
        >
          <Icon name="book" size={32} color={primaryColor} />
        </View>
        <View style={styles.bookDetails}>
          <View>
            <Text style={[styles.bookTitle, { color: textColor }]}>
              Book Title {index}
            </Text>
            <Text style={[styles.bookAuthor, { color: mutedColor }]}>
              Author Name
            </Text>
            <Text style={[styles.bookDate, { color: mutedColor }]}>
              Added on Jan {index}, 2024
            </Text>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={[styles.statNumber, { color: textColor }]}>12</Text>
              <Text style={[styles.statLabel, { color: mutedColor }]}>
                Highlights
              </Text>
            </View>
            <View style={styles.stat}>
              <Text style={[styles.statNumber, { color: textColor }]}>4</Text>
              <Text style={[styles.statLabel, { color: mutedColor }]}>
                Reviews
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: borderColor }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Icon name="arrow-left" size={20} color={textColor} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: textColor }]}>Books</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Icon
              name="search"
              size={16}
              color={mutedColor}
              style={styles.searchIcon}
            />
            <TextInput
              style={[
                styles.searchInput,
                { color: textColor, backgroundColor: cardColor },
              ]}
              placeholder="Search books..."
              placeholderTextColor={mutedColor}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.sortButton,
              { backgroundColor: cardColor, borderColor },
            ]}
            onPress={() => {
              // Show sort options modal or picker
            }}
          >
            <Text style={[styles.sortButtonText, { color: textColor }]}>
              {sortBy === "recent"
                ? "Most Recent"
                : sortBy === "highlights"
                  ? "Most Highlights"
                  : "Title A-Z"}
            </Text>
            <Icon name="chevron-down" size={16} color={textColor} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Book List */}
      <ScrollView style={styles.content}>
        <View style={styles.bookList}>
          {[1, 2, 3, 4, 5].map((index) => (
            <BookCard key={index} index={index} />
          ))}
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
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    gap: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: 12,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 36,
    borderRadius: 8,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  sortButtonText: {
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  bookList: {
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
    gap: 16,
  },
  bookImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  bookDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
  },
  bookDate: {
    fontSize: 14,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  stat: {
    alignItems: "flex-start",
  },
  statNumber: {
    fontSize: 14,
    fontWeight: "500",
  },
  statLabel: {
    fontSize: 14,
  },
});
