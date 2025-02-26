import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

interface ScanModalProps {
  visible: boolean;
  onClose: () => void;
  backgroundColor: string;
  textColor: string;
  mutedColor: string;
  borderColor: string;
  primaryColor: string;
  secondaryColor: string;
}

const ScanModal: React.FC<ScanModalProps> = ({
  visible,
  onClose,
  backgroundColor,
  textColor,
  mutedColor,
  borderColor,
  primaryColor,
  secondaryColor,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
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
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
  buttonDisabled: {
    opacity: 0.5,
  },
});

export default ScanModal;
