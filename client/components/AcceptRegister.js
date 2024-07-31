import React, { useState } from 'react'
// import { Image } from 'expo-image'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import Checkbox from 'expo-checkbox'

import { Color, FontFamily, FontSize, Border } from '../GlobalStyles'
import { useNavigation } from '@react-navigation/native'

const AcceptRegister = ({isChecked, setChecked}) => {
  const navigation = useNavigation()

  return (
    <View style={styles.frameParent1}>
      <View style={styles.frameContainer}>
        <Text style={[styles.labelled, styles.labelledTypo]}>
          Aceptación de Privacidad en MyTree
        </Text>
      </View>
      <View style={[styles.checkParent, styles.parentFlexBox]}>
        <Checkbox
          style={{ marginRight: 15 }}
          value={isChecked}
          onValueChange={setChecked}
        />
        <View
          style={[styles.aceptoLosTrminosYCondicioParent, styles.parentFlexBox]}
        >
          <Pressable
            onPress={() => navigation.navigate('REGISTROTRMINOSYCONDICIO')}
          >
            <Text style={[styles.text, styles.textLayout]}>
              <Text style={[styles.aceptoLos, styles.labelledClr]}>
                {'Acepto los '}
              </Text>
              <Text style={[styles.trminosYCondiciones, styles.continuarClr]}>
                términos y condiciones
              </Text>
              <Text style={[styles.aceptoLos, styles.labelledClr]}>{` de MyTree,
`}</Text>
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('REGISTROPOLTICASDEPRIVAC')}
          >
            <Text style={styles.textLayout}>
              <Text style={[styles.aceptoLos, styles.labelledClr]}>
                {'así como también el '}
              </Text>
              <Text style={[styles.trminosYCondiciones, styles.continuarClr]}>
                acuerdo de privacidad
              </Text>
              <Text style={[styles.aceptoLos, styles.labelledClr]}>.</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  continuarClr: {
    color: Color.primario1,
    fontFamily: FontFamily.lato
  },
  trminosYCondiciones: {
    fontWeight: '700',
    fontSize:16
  },
  labelledClr: {
    color: Color.negro,
    fontFamily: FontFamily.lato
  },
  aceptoLos: {
    fontWeight: '500'
  },
  text: {
    height: 24
  },
  textLayout: {
    width: 323,
    lineHeight: 27,
    fontSize: FontSize.size_base,
    textAlign: 'left'
  },
  parentFlexBox: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkParent: {
    flexDirection: 'row',
    marginTop: 20,
    left: 10
  },
  frameContainer: {
    alignItems: 'center'
  },
  labelledTypo: {
    textAlign: 'center',
    fontFamily: FontFamily.lato
  },
  labelled: {
    color: Color.negro,
    textAlign: 'left',
    lineHeight: 41,
    fontWeight: '900',
    fontSize: 18
  },
  frameParent1: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20
  }
})

export default AcceptRegister
