import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/Feather";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

type QuickAccessCardProps = {
  title: string;
  count: number;
  icon: keyof typeof Icon.glyphMap;
  color: string;
  href: string;
};

type ContentCardProps = {
  type: "books" | "articles";
  index: number;
};

export default function LibraryScreen() {
  const [activeTab, setActiveTab] = useState<"books" | "articles">("books");
  const [searchQuery, setSearchQuery] = useState("");

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
  const secondaryColor = useThemeColor(
    { light: Colors.light.secondary, dark: Colors.dark.secondary },
    "secondary"
  );

  const QuickAccessCard = ({
    title,
    count,
    icon,
    color,
    href,
  }: QuickAccessCardProps) => (
    <Link href={href as any} asChild>
      <TouchableOpacity
        style={[styles.card, { backgroundColor: cardColor, borderColor }]}
      >
        <View style={styles.cardContent}>
          <View
            style={[styles.iconContainer, { backgroundColor: `${color}20` }]}
          >
            <Icon name={icon} size={24} color={color} />
          </View>
          <Text style={[styles.cardTitle, { color: textColor }]}>{title}</Text>
          <Text style={[styles.cardSubtitle, { color: mutedColor }]}>
            {count} highlights
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  const ContentCard = ({ type, index }: ContentCardProps) => {
    const isBook = type === "books";
    const iconColor = isBook ? primaryColor : secondaryColor;
    const iconBg = `${isBook ? primaryColor : secondaryColor}20`;

    return (
      <TouchableOpacity
        style={[
          styles.contentCard,
          { backgroundColor: cardColor, borderColor },
        ]}
        onPress={() => {}}
      >
        <View style={styles.contentCardInner}>
          <View
            style={[
              styles.contentCardImage,
              { backgroundColor: iconBg },
              isBook && styles.bookImage,
            ]}
          >
            <Icon
              name={isBook ? "book" : "book-open"}
              size={32}
              color={iconColor}
            />
          </View>
          <View style={styles.contentCardDetails}>
            <View>
              <Text style={[styles.contentCardTitle, { color: textColor }]}>
                {isBook ? `Book Title ${index}` : `Article Title ${index}`}
              </Text>
              <Text style={[styles.contentCardSubtitle, { color: mutedColor }]}>
                {isBook ? "Author Name" : "website.com"}
              </Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={[styles.statNumber, { color: textColor }]}>
                  {isBook ? "12" : "8"}
                </Text>
                <Text style={[styles.statLabel, { color: mutedColor }]}>
                  Highlights
                </Text>
              </View>
              <View style={styles.stat}>
                <Text style={[styles.statNumber, { color: textColor }]}>
                  {isBook ? "4" : "2"}
                </Text>
                <Text style={[styles.statLabel, { color: mutedColor }]}>
                  Reviews
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {/* Search Header */}
      <View style={[styles.searchHeader, { borderBottomColor: borderColor }]}>
        <View style={styles.searchContainer}>
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
            placeholder="Search your library..."
            placeholderTextColor={mutedColor}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Quick Access */}
        <View style={styles.quickAccess}>
          <QuickAccessCard
            title="Books"
            count={142}
            icon="book"
            color={primaryColor}
            href="/(library)/books"
          />
          <QuickAccessCard
            title="Articles"
            count={85}
            icon="book-open"
            color={secondaryColor}
            href="/(library)/articles"
          />
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
            <Text
              style={[
                styles.tabText,
                { color: activeTab === "books" ? textColor : mutedColor },
              ]}
            >
              Recent Books
            </Text>
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
            <Text
              style={[
                styles.tabText,
                { color: activeTab === "articles" ? textColor : mutedColor },
              ]}
            >
              Recent Articles
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.contentList}>
          {[1, 2, 3].map((index) => (
            <ContentCard key={index} type={activeTab} index={index} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeader: {
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchContainer: {
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
  content: {
    flex: 1,
  },
  quickAccess: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    padding: 16,
    paddingHorizontal: 40,
  },
  card: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  cardContent: {
    padding: 16,
    alignItems: "center",
  },
  iconContainer: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
  },
  tabs: {
    flexDirection: "row",
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  contentList: {
    paddingHorizontal: 16,
    gap: 16,
    paddingBottom: 20,
  },
  contentCard: {
    borderRadius: 12,
    borderWidth: 1,
  },
  contentCardInner: {
    flexDirection: "row",
    padding: 16,
    gap: 16,
  },
  contentCardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  bookImage: {
    height: 120,
  },
  contentCardDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  contentCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  contentCardSubtitle: {
    fontSize: 14,
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
