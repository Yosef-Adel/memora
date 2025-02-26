import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: string;
  lastSync?: string;
  disabled?: boolean;
  textColor: string;
  mutedColor: string;
  borderColor: string;
  cardColor: string;
  primaryColor: string;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  title,
  description,
  icon,
  lastSync,
  disabled = false,
  textColor,
  mutedColor,
  borderColor,
  cardColor,
  primaryColor,
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

const styles = StyleSheet.create({
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
});

export default IntegrationCard;
