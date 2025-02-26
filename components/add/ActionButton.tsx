import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

interface ActionButtonProps {
  icon: string;
  title: string;
  color: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  textColor: string;
  cardColor: string;
  borderColor: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  title,
  color,
  onPress,
  variant = "primary",
  textColor,
  cardColor,
  borderColor,
}) => (
  <TouchableOpacity
    style={[styles.actionButton, { borderColor, backgroundColor: cardColor }]}
    onPress={onPress}
  >
    <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
      <Icon name={icon} size={24} color={color} />
    </View>
    <Text style={[styles.actionButtonText, { color: textColor }]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
});

export default ActionButton;
