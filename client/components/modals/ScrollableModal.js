import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

const ScrollableModal = ({
  closeModal,
  onSelectItem,
  options,
  parentTop,
  visible,
  scrollHeight,
  style,
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
      animationType="fade"
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={[
              {
                position: "absolute",
                backgroundColor: "#fff",
                maxHeight: 190,
                width: "100%",
                justifyContent: "center",
                alignSelf: "center",
                alignItems: "center",
                paddingHorizontal: 5,
                borderRadius: 10,
                elevation: 5,
              },
              style,
            ]}
          >
            <ScrollView
              keyboardShouldPersistTaps={"always"}
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.modalContent}>
                {options &&
                  options.map((item, index) => (
                    <Pressable
                      key={index}
                      style={{
                        paddingVertical: 8,
                        width: "100%",
                        alignItems: "center",
                        borderBottomWidth: index !== options.length - 1 ? 1 : 0,
                        borderBottomColor: "#B7E4C0",
                      }}
                      onPress={() => {
                        onSelectItem(item);
                        closeModal();
                      }}
                    >
                      <Text style={styles.optionText}>{item}</Text>
                    </Pressable>
                  ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    width: Dimensions.get("screen").width - 50,
  },
  modalContent: {
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  optionButton: {
    paddingVertical: 8,
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#B7E4C0",
  },
  optionText: {
    fontSize: 16,
    color: "#787878",
  },
});

export default ScrollableModal;
