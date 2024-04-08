import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Color, FontFamily, FontSize, Border, Padding } from '../GlobalStyles'
import PropTypes from 'prop-types'

const SexoInfante = ({ onClose, setSex }) => {
  return (
    <View style={styles.sexoInfante}>
      <View style={styles.varnParent}>
        <Text
          onPress={() => {
            onClose()
            setSex('Varon')
          }}
          style={styles.varnTypo}
        >
          Varón
        </Text>

        <View
          style={{
            borderWidth: 1,
            borderColor: Color.grisClaro,
            marginVertical: 15
          }}
        />

        <Text
          onPress={() => {
            onClose()
            setSex('Mujer')
          }}
          style={styles.varnTypo}
        >
          Mujer
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: Color.grisClaro,
            marginVertical: 15
          }}
        />

        <Text
          onPress={() => {
            onClose()
            setSex('No binario')
          }}
          style={styles.varnTypo}
        >
          No binario
        </Text>
      </View>
    </View>
  )
}

SexoInfante.propTypes = {
  onClose: PropTypes.func,
  setSex: PropTypes.func
}

const styles = StyleSheet.create({
  varnTypo: {
    // textAlign: 'left',
    color: Color.gris,
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  mujerFlexBox: {
    marginTop: 20,
    // flex: 1,
    alignSelf: 'stretch'
  },
  varn: {
    flex: 1,
    textAlign: 'left',
    color: Color.gris,
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
    alignSelf: 'stretch'
  },
  frameChild: {
    overflow: 'hidden',
    width: '100%',
    maxHeight: '100%',
    maxWidth: '100%'
  },
  mujer: {
    textAlign: 'left',
    color: Color.gris,
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  varnParent: {
    // height: 137,
    // alignSelf: 'stretch'
  },
  sexoInfante: {
    borderTopLeftRadius: Border.br_11xl,
    borderTopRightRadius: Border.br_11xl,
    backgroundColor: Color.white,
    width: 428,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_xl,
    position: 'absolute',
    bottom: 0
    // paddingBottom: Padding.p_237xl
  }
})

export default SexoInfante
