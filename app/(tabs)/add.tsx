import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

// Import components
import ActionButton from "@/components/add/ActionButton";
import IntegrationCard from "@/components/add/IntegrationCard";
import TextModal from "@/components/add/TextModal";
import ScanModal from "@/components/add/ScanModal";

const AddHighlightScreen = () => {
  const [textModalVisible, setTextModalVisible] = useState(false);
  const [scanModalVisible, setScanModalVisible] = useState(false);
  const [highlight, setHighlight] = useState("");
  const [source, setSource] = useState("");
  const [author, setAuthor] = useState("");

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
  const iconColor = useThemeColor(
    { light: Colors.light.icon, dark: Colors.dark.icon },
    "icon"
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            Add Highlight
          </Text>
          <View style={styles.actionGrid}>
            <ActionButton
              icon="file-text"
              title="Add Text"
              color={primaryColor}
              onPress={() => setTextModalVisible(true)}
              textColor={textColor}
              cardColor={cardColor}
              borderColor={borderColor}
            />
            <ActionButton
              icon="camera"
              title="Scan Text"
              color={secondaryColor}
              onPress={() => setScanModalVisible(true)}
              textColor={textColor}
              cardColor={cardColor}
              borderColor={borderColor}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              Integrations
            </Text>
            <TouchableOpacity style={styles.syncAllButton}>
              <Icon name="refresh-cw" size={16} color={iconColor} />
              <Text style={[styles.syncAllText, { color: mutedColor }]}>
                Sync All
              </Text>
            </TouchableOpacity>
          </View>

          <IntegrationCard
            title="Kindle"
            description="Sync your Kindle highlights automatically"
            icon="book-open"
            lastSync="2 hours ago"
            disabled={false}
            textColor={textColor}
            mutedColor={mutedColor}
            borderColor={borderColor}
            cardColor={cardColor}
            primaryColor={primaryColor}
          />
          <IntegrationCard
            title="More Apps Coming Soon"
            description="We're working on integrating with more reading apps"
            icon="smartphone"
            disabled={true}
            textColor={textColor}
            mutedColor={mutedColor}
            borderColor={borderColor}
            cardColor={cardColor}
            primaryColor={primaryColor}
          />
        </View>

        {/* Modals */}
        <TextModal
          visible={textModalVisible}
          onClose={() => setTextModalVisible(false)}
          highlight={highlight}
          setHighlight={setHighlight}
          source={source}
          setSource={setSource}
          author={author}
          setAuthor={setAuthor}
          backgroundColor={backgroundColor}
          textColor={textColor}
          mutedColor={mutedColor}
          borderColor={borderColor}
          cardColor={cardColor}
          primaryColor={primaryColor}
        />

        <ScanModal
          visible={scanModalVisible}
          onClose={() => setScanModalVisible(false)}
          backgroundColor={backgroundColor}
          textColor={textColor}
          mutedColor={mutedColor}
          borderColor={borderColor}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  actionGrid: {
    flexDirection: "row",
    gap: 16,
  },
  syncAllButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  syncAllText: {
    marginLeft: 8,
    fontSize: 14,
  },
});

export default AddHighlightScreen;
