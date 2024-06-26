import React from 'react'
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native'

import { Color, FontFamily, FontSize, Border } from '../GlobalStyles'

const CheckRegister = () => {
  return (
    <View style={styles.frameParent1}>
      <Text style={[styles.labelled, styles.labelledTypo]}>
        ¡Enhorabuena, ya formas parte de la comunidad! Recibirás un email para
        confirmar tu registro.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  labelledTypo: {
    textAlign: 'center',
    fontFamily: FontFamily.lato
  },
  labelled: {
    color: Color.negro,
    textAlign: 'left',
    lineHeight: 41,
    fontWeight: '500',
    fontSize: FontSize.size_xl
  },
  frameParent1: {
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center'
  }
})

export default CheckRegister
