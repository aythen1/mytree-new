import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontFamily, FontSize, Color, Border, Padding } from '../GlobalStyles'

const OpcionesAmigo = () => {
  return (
    <View style={[styles.opcionesAmigo, styles.frameChildLayout]}>
      <View style={styles.amigosFlexBox}>
        <Text style={[styles.colegio, styles.aadirFlexBox]}>
          Amigos íntimos
        </Text>

        <Text style={[styles.colegio, styles.aadirFlexBox]}>Colegio</Text>

        <Text style={[styles.colegio, styles.aadirFlexBox]}>Trabajo</Text>

        <Text style={[styles.colegio, styles.aadirFlexBox]}>Universidad</Text>

        <Text style={[styles.colegio, styles.aadirFlexBox]}>Afición</Text>

        <Text style={[styles.aadir, styles.aadirFlexBox]}>+ Añadir</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  frameChildLayout: {
    maxHeight: '100%',
    maxWidth: '100%'
  },
  aadirTypo: {
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  aadirFlexBox: {
    marginTop: 20,
    height: 30
    // alignSelf: 'stretch'
  },
  amigosNtimos: {
    color: Color.gris,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
    flex: 1,
    alignSelf: 'stretch'
  },
  frameChild: {
    overflow: 'hidden',
    width: '100%',
    maxHeight: '100%',
    maxWidth: '100%'
  },
  colegio: {
    // textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    // lineHeight: 19,
    fontSize: FontSize.size_base,
    color: Color.gris,
    borderBottomWidth: 1,
    borderBottomColor: 'green'
  },
  aadir: {
    color: Color.primario2,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
    marginTop: 20
  },
  amigosFlexBox: {
    // flex: 1
    // alignSelf: 'stretch'
    marginTop: 10
  },
  opcionesAmigo: {
    flex: 1,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.white,
    width: '100%',
    height: 350,
    position: 'absolute',
    bottom: 0,
    left: 0,
    // height: '100%',
    paddingHorizontal: Padding.p_xl,
    paddingTop: Padding.p_xl,
    paddingBottom: 79,
    zIndex: 0
  }
})

export default OpcionesAmigo
