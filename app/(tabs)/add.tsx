import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Feather";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";

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

  const ActionButton = ({
    icon,
    title,
    color,
    onPress,
    variant = "primary",
  }) => (
    <TouchableOpacity
      style={[styles.actionButton, { borderColor, backgroundColor: cardColor }]}
      onPress={onPress}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
        <Icon name={icon} size={24} color={color} />
      </View>
      <Text style={[styles.actionButtonText, { color: textColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const IntegrationCard = ({
    title,
    description,
    icon,
    lastSync,
    disabled,
  }) => (
    <View
      style={[
        styles.card,
        { borderColor, backgroundColor: cardColor },
        disabled && styles.cardDisabled,
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <View
            style={[styles.cardIcon, { backgroundColor: `${primaryColor}20` }]}
          >
            <Icon name={icon} size={20} color={primaryColor} />
          </View>
          <Text style={[styles.cardTitle, { color: textColor }]}>{title}</Text>
        </View>
        <Text style={[styles.cardDescription, { color: mutedColor }]}>
          {description}
        </Text>
      </View>
      <View style={[styles.cardContent, { borderTopColor: borderColor }]}>
        {lastSync ? (
          <>
            <Text style={[styles.lastSync, { color: mutedColor }]}>
              Last synced: {lastSync}
            </Text>
            <TouchableOpacity
              style={[styles.syncButton, { backgroundColor: cardColor }]}
              disabled={disabled}
            >
              <Text style={[styles.syncButtonText, { color: textColor }]}>
                Sync Now
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={[
              styles.syncButton,
              { backgroundColor: cardColor },
              disabled && styles.buttonDisabled,
            ]}
            disabled={disabled}
          >
            <Text style={[styles.syncButtonText, { color: textColor }]}>
              Coming Soon
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
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
            />
            <ActionButton
              icon="camera"
              title="Scan Text"
              color={secondaryColor}
              onPress={() => setScanModalVisible(true)}
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
          />
          <IntegrationCard
            title="More Apps Coming Soon"
            description="We're working on integrating with more reading apps"
            icon="smartphone"
            disabled={true}
            lastSync={undefined}
          />
        </View>

        {/* Add Text Modal */}
        <Modal
          visible={textModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setTextModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor }]}>
              <Text style={[styles.modalTitle, { color: textColor }]}>
                Add Text Highlight
              </Text>
              <Text style={[styles.modalDescription, { color: mutedColor }]}>
                Enter your highlight text and source information
              </Text>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: textColor }]}>
                  Highlight
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    styles.textArea,
                    {
                      borderColor,
                      backgroundColor: cardColor,
                      color: textColor,
                    },
                  ]}
                  multiline
                  numberOfLines={4}
                  placeholder="Enter your highlight text..."
                  placeholderTextColor={mutedColor}
                  value={highlight}
                  onChangeText={setHighlight}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: textColor }]}>Source</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor,
                      backgroundColor: cardColor,
                      color: textColor,
                    },
                  ]}
                  placeholder="Book or article title"
                  placeholderTextColor={mutedColor}
                  value={source}
                  onChangeText={setSource}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={[styles.label, { color: textColor }]}>Author</Text>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor,
                      backgroundColor: cardColor,
                      color: textColor,
                    },
                  ]}
                  placeholder="Author name"
                  placeholderTextColor={mutedColor}
                  value={author}
                  onChangeText={setAuthor}
                />
              </View>

              <TouchableOpacity
                style={[styles.saveButton, { backgroundColor: primaryColor }]}
                onPress={() => setTextModalVisible(false)}
              >
                <Text style={styles.saveButtonText}>Save Highlight</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Scan Text Modal */}
        <Modal
          visible={scanModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setScanModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor }]}>
              <Text style={[styles.modalTitle, { color: textColor }]}>
                Scan Text
              </Text>
              <Text style={[styles.modalDescription, { color: mutedColor }]}>
                Take a photo of the text you want to highlight
              </Text>

              <View
                style={[
                  styles.cameraPlaceholder,
                  { borderColor, backgroundColor: `${secondaryColor}10` },
                ]}
              >
                <View
                  style={[
                    styles.cameraIcon,
                    { backgroundColor: `${secondaryColor}20` },
                  ]}
                >
                  <Icon name="camera" size={32} color={secondaryColor} />
                </View>
                <Text style={[styles.cameraText, { color: mutedColor }]}>
                  Click to take a photo or drop an image here
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.saveButton,
                  styles.buttonDisabled,
                  { backgroundColor: primaryColor },
                ]}
                disabled={true}
              >
                <Text style={styles.saveButtonText}>Coming Soon</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  actionButton: {
    flex: 1,
    height: 96,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  actionButtonText: {
    fontSize: 14,
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
  card: {
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 16,
  },
  cardDisabled: {
    opacity: 0.5,
  },
  cardHeader: {
    padding: 16,
  },
  cardTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  cardIcon: {
    padding: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  cardDescription: {
    fontSize: 14,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
  },
  lastSync: {
    fontSize: 14,
  },
  syncButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  syncButtonText: {
    fontSize: 14,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
    maxHeight: Dimensions.get("window").height * 0.9,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  cameraPlaceholder: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 32,
    alignItems: "center",
    marginBottom: 24,
  },
  cameraIcon: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  cameraText: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default AddHighlightScreen;
