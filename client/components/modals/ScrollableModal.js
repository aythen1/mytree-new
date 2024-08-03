import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native'

const ScrollableModal = ({
  closeModal,
  onSelectItem,
  options,
  parentTop,
  visible,
  scrollHeight
}) => {

  return (
    <Modal transparent={true} visible={visible} onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: parentTop + 57 - scrollHeight,
              backgroundColor: '#fff',
              maxHeight: 115,
              width: '92%',
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              paddingHorizontal: 5,
              borderRadius: 10,
              elevation: 5,
              alignItems: 'center'
            }}
          >
            <ScrollView
              keyboardShouldPersistTaps={'always'}
              contentContainerStyle={styles.scrollContainer}
            >
              <View style={styles.modalContent}>
                {options.map((item, index) => (
                  <Pressable
                    key={index}
                    style={{paddingVertical: 8,
                        width: '100%',
                        alignItems: 'center',
                        borderBottomWidth: index !== options.length -1 ? 1 : 0,
                        borderBottomColor: '#B7E4C0'}}
                    onPress={() => {
                      onSelectItem(item)
                      closeModal()
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
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,width:Dimensions.get('screen').width - 50
  },
  modalContent: {
    width:'100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionButton: {
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#B7E4C0'
  },
  optionText: {
    fontSize: 16,
    color: '#787878'
  }
})

export default ScrollableModal
