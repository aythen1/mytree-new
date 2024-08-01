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
    fontFamily: FontFamily.lato,
    paddingBottom:10
  },
  labelled: {
    color: Color.negro,
    textAlign: 'left',
    lineHeight: 24,
    fontWeight: '500',
    fontSize: 16
  },
  frameParent1: {
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center'
  }
})

export default CheckRegister
