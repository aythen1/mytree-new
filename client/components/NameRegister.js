import React, { useState } from 'react'
import { Image } from 'expo-image'
import { StyleSheet, View, Text, TextInput } from 'react-native'

import { Color, FontFamily, FontSize, Border } from '../GlobalStyles'

const NameRegister = ({ name, setsetName, text, setText, mail, setMail, birthDate, setBIrthDate, handleChangeText, handleNombreChange ,handleMailChange}) => {


  return (
    <View>
      <View>
        <Text style={[styles.labelled, styles.labelledTypo]}>
          Nombre Completo
        </Text>
        <View style={styles.baseBackgroundParent}>
          <View style={styles.vectorParent}>
            <Image
              style={styles.vectorIconLayout}
              contentFit="cover"
              source={require('../assets/vector81.png')}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Nombre"
              onChangeText={handleNombreChange}
              value={name}
            />
          </View>
        </View>
      </View>
      <View>
        <Text style={[styles.labelled, styles.labelledTypo]}>
          Fecha de Nacimiento
        </Text>
        <View style={styles.baseBackgroundParent}>
          <View style={styles.vectorParent}>
            <Image
              style={styles.vectorIconLayout}
              contentFit="cover"
              source={require('../assets/vector79.png')}
            />
            <TextInput
              keyboardType="numeric"
              placeholder="20/12/1988"
              onChangeText={handleChangeText}
              value={text}
              maxLength={10}
              style={styles.placeholder}
            />
          </View>
        </View>
      </View>
      <View>
        <Text style={[styles.labelled, styles.labelledTypo]}>Teléfono</Text>
        <View style={styles.baseBackgroundParent}>
          <View style={styles.vectorParent}>
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require('../assets/group4.png')}
            />
            <TextInput
              keyboardType="numeric"
              placeholder=" ( 00 ) 1234 5678"
              style={styles.placeholder}
            />
          </View>
        </View>
      </View>
      <View>
        <Text style={[styles.labelled, styles.labelledTypo]}>Email</Text>
        <View style={styles.baseBackgroundParent}>
          <View style={styles.vectorParent}>
            <Image
              style={styles.vectorIcon2}
              contentFit="cover"
              source={require('../assets/vector83.png')}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Email"
              onChangeText={handleMailChange}
              value={mail}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  vectorIconLayout: {
    width: 24,
    height: 24
  },
  labelledTypo: {
    textAlign: 'center',
    fontFamily: FontFamily.lato
  },
  labelled: {
    color: Color.negro,
    textAlign: 'left',
    lineHeight: 41,
    fontWeight: '400',
    fontSize: FontSize.size_base
  },
  vectorIcon: {
    height: 26,
    width: 18
  },
  vectorIcon2: {
    width: 24,
    height: 18,
    top: 3
  },
  placeholder: {
    fontSize: FontSize.size_base,
    lineHeight: 24,
    display: 'flex',
    width: 211,
    marginLeft: 16,
    color: Color.negro,
    textAlign: 'left',
    height: 24,
    alignItems: 'center'
  },
  vectorParent: {
    flexDirection: 'row',
    padding: 10,
    borderStyle: 'solid',
    shadowColor: 'rgba(244, 105, 76, 0.3)',
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2
  },
  baseBackgroundParent: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA,
    marginTop: 5,
    marginBottom: 5
  }
})

export default NameRegister
