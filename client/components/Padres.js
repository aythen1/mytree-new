import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FontSize, FontFamily, Color, Border, Padding } from '../GlobalStyles'
import PropTypes from 'prop-types'

const Padres = ({ onClose, setParents }) => {
  return (
    <View style={styles.padres}>
      <View style={styles.quienesSonLosPadresParent}>
        <Text style={styles.quienesSonLos}>¿Quienes son los padres?</Text>
        <View style={styles.frameParent}>
          <View style={[styles.parent, styles.groupFlexBox]}>
            <Text
              onPress={() => {
                onClose()
                setParents('👫')
              }}
              style={styles.text}
            >
              👫
            </Text>
            <Text
              onPress={() => {
                onClose()
                setParents('👭🏻')
              }}
              style={[styles.text]}
            >
              👭🏻
            </Text>
            <Text
              onPress={() => {
                onClose()
                setParents('👬')
              }}
              style={[styles.text]}
            >
              👬
            </Text>
          </View>
          <View style={[styles.parent1, styles.groupFlexBox]}>
            <Text
              onPress={() => {
                onClose()
                setParents('🫄')
              }}
              style={styles.text}
            >
              🫄
            </Text>
            <Text
              onPress={() => {
                onClose()
                setParents('🫃')
              }}
              style={[styles.text]}
            >
              🫃
            </Text>
            <Text
              onPress={() => {
                onClose()
                setParents('🤰')
              }}
              style={[styles.text]}
            >
              🤰
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

Padres.propTypes = {
  onClose: PropTypes.func,
  setParents: PropTypes.func
}

const styles = StyleSheet.create({
  groupFlexBox: {
    flexDirection: 'row'
    // flexWrap: 'wrap',
    // flexDirection: 'row'
  },
  textTypo: {
    marginLeft: 50,
    textAlign: 'left',
    lineHeight: 48,
    fontSize: FontSize.size_21xl,
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    letterSpacing: 0
  },
  quienesSonLos: {
    fontSize: FontSize.size_lg,
    lineHeight: 22,
    textAlign: 'center',
    color: Color.negro,
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    letterSpacing: 0
  },
  text: {
    textAlign: 'left',
    lineHeight: 48,
    fontSize: FontSize.size_21xl,
    color: Color.negro,
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    letterSpacing: 0
  },
  text1: {
    color: Color.negro
  },
  parent: {
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 60
  },
  parent1: {
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    marginTop: 30
  },
  text4: {
    color: Color.white
  },
  group: {
    width: 231,
    marginTop: 10
  },
  frameParent: {
    width: '100%',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center'
  },
  quienesSonLosPadresParent: {
    alignItems: 'center'
  },
  padres: {
    borderTopLeftRadius: Border.br_11xl,
    borderTopRightRadius: Border.br_11xl,
    backgroundColor: Color.white,
    width: '100%',
    height: 300,
    bottom: 0,
    position: 'absolute',
    padding: Padding.p_xl,
    maxWidth: '100%',
    maxHeight: '100%',
    alignItems: 'center'
  }
})

export default Padres
