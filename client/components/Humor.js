import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontSize, FontFamily, Color, Border, Padding } from '../GlobalStyles'

const Humor = ({ onClose }) => {
  return (
    <View style={styles.humor}>
      <Text style={styles.cmoEstTu}>¿Cómo está tu día?</Text>
      <View style={styles.parent}>
        <View style={styles.sections}>
          <Text onPress={() => onClose()} style={styles.textTypo}>
            😳
          </Text>
          <Text onPress={() => onClose()} style={styles.textTypo}>
            😊
          </Text>
          <Text onPress={() => onClose()} style={styles.textTypo}>
            😄
          </Text>
          <Text onPress={() => onClose()} style={styles.textTypo}>
            😍
          </Text>
          <Text onPress={() => onClose()} style={styles.textTypo}>
            😉
          </Text>
        </View>

        <View style={styles.sections}>
          <Text onPress={() => onClose()} style={styles.textTypo}>
            😞
          </Text>
          <Text onPress={() => onClose()} style={styles.textTypo}>
            😢
          </Text>
          <Text onPress={() => onClose()} style={styles.textTypo}>
            😠
          </Text>
          <Text onPress={() => onClose()} style={styles.textTypo}>
            😮
          </Text>
          <Text onPress={() => onClose()} style={styles.textTypo}>
            😑
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textTypo: {
    marginTop: 10,
    fontSize: 30,
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    letterSpacing: 20
  },
  sections: {
    flexDirection: 'row'
  },
  cmoEstTu: {
    fontSize: FontSize.size_xl,
    lineHeight: 24,
    textAlign: 'center',
    color: Color.negro,
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    letterSpacing: 0
  },
  parent: {
    marginTop: 20
  },
  humor: {
    borderTopRightRadius: Border.br_11xl,
    borderTopLeftRadius: Border.br_11xl,
    backgroundColor: Color.white,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: Padding.p_xl,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Humor
