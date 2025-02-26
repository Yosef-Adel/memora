import React from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

interface TextModalProps {
  visible: boolean;
  onClose: () => void;
  highlight: string;
  setHighlight: (text: string) => void;
  source: string;
  setSource: (text: string) => void;
  author: string;
  setAuthor: (text: string) => void;
  backgroundColor: string;
  textColor: string;
  mutedColor: string;
  borderColor: string;
  cardColor: string;
  primaryColor: string;
}

const TextModal: React.FC<TextModalProps> = ({
  visible,
  onClose,
  highlight,
  setHighlight,
  source,
  setSource,
  author,
  setAuthor,
  backgroundColor,
  textColor,
  mutedColor,
  borderColor,
  cardColor,
  primaryColor,
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
                onPress={onClose}
              >
                <Text style={styles.saveButtonText}>Save Highlight</Text>
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
});

export default TextModal;
