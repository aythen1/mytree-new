import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { FontFamily, Color, FontSize, Border } from '../GlobalStyles'
import Checkbox from 'expo-checkbox'
import PropTypes from 'prop-types'

const CreacinInfante = ({ onClose }) => {
  const navigation = useNavigation()
  const [isChecked, setChecked] = useState(false)
  const [isChecked2, setChecked2] = useState(false)
  const [isChecked3, setChecked3] = useState(false)

  return (
    <View style={[styles.creacinInfante, styles.vectorIconLayout]}>
      <View style={[styles.hasCreadoUnNuevoIdDeInfaParent, styles.hasFlexBox]}>
        <Text style={[styles.hasCreadoUn, styles.crearTypo]}>
          Has creado un nuevo ID de Infante
        </Text>
        <View style={styles.opcionesDePrivacidadParent}>
          <Text style={styles.opcionesDePrivacidad}>
            Opciones de privacidad
          </Text>
          <View style={[styles.checkParent, styles.checkParentFlexBox]}>
            <View style={styles.check}>
              <View style={styles.checkChild} />
              <Checkbox value={isChecked} onValueChange={setChecked} />
            </View>
            <View
              style={[
                styles.permitirQueMisFamiliaresYWrapper,
                styles.checkParentFlexBox
              ]}
            >
              <Text style={[styles.permitirQueMis, styles.permitirTypo]}>
                Permitir que mis Familiares y Amigos etiqueten a mi Infante
              </Text>
            </View>
          </View>
          <View style={[styles.checkParent, styles.checkParentFlexBox]}>
            <View style={styles.check}>
              <Checkbox value={isChecked2} onValueChange={setChecked2} />
            </View>
            <View
              style={[
                styles.permitirQueMisFamiliaresYWrapper,
                styles.checkParentFlexBox
              ]}
            >
              <Text style={[styles.permitirQueMis, styles.permitirTypo]}>
                Permitir que mis Familiares y Amigos etiqueten a mi Infante,
                excepto...
              </Text>
            </View>
          </View>
          <View style={[styles.checkParent, styles.checkParentFlexBox]}>
            <View style={styles.check}>
              {/* <View style={styles.checkChild} /> */}
              <Checkbox value={isChecked3} onValueChange={setChecked3} />
            </View>
            <View
              style={[
                styles.permitirQueMisFamiliaresYWrapper,
                styles.checkParentFlexBox
              ]}
            >
              <Text style={[styles.permitirQueLas, styles.permitirTypo]}>
                Permitir que las fotos donde etiquetan al infante....
              </Text>
            </View>
          </View>
        </View>
      </View>
      <LinearGradient
        style={styles.button}
        locations={[0, 1]}
        colors={['#dee274', '#7ec18c']}
      >
        <Pressable
          style={styles.pressable}
          onPress={() => {
            onClose()
            navigation.navigate('PERFILIDINFANTE')
          }}
        >
          <Text style={styles.crear}>Crear</Text>
        </Pressable>
      </LinearGradient>
    </View>
  )
}

CreacinInfante.propTypes = {
  onClose: PropTypes.func
}

const styles = StyleSheet.create({
  vectorIconLayout: {
    maxHeight: '100%',
    maxWidth: '100%'
  },
  hasFlexBox: {
    alignItems: 'center',
    width: 388
  },
  crearTypo: {
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  checkParentFlexBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  permitirTypo: {
    color: Color.gris,
    textAlign: 'left',
    lineHeight: 19,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },

  hasCreadoUn: {
    fontSize: FontSize.title2Regular_size,
    lineHeight: 33,
    color: Color.primario2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 388
  },
  opcionesDePrivacidad: {
    fontWeight: '500',
    color: Color.negro,
    textAlign: 'left',
    lineHeight: 19,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  checkChild: {
    height: '105%',
    width: '105%',
    top: '-2.5%',
    right: '-2.5%',
    bottom: '-2.5%',
    left: '-2.5%',
    borderRadius: 3,
    borderStyle: 'solid',
    borderColor: Color.colorGainsboro_100,
    borderWidth: 1,
    position: 'absolute',
    backgroundColor: Color.white
  },
  vectorIcon: {
    height: '34.5%',
    width: '45%',
    top: '35%',
    right: '30%',
    bottom: '30.5%',
    left: '25%',
    overflow: 'hidden',
    position: 'absolute'
  },
  check: {
    width: 20,
    height: 20
  },
  permitirQueMis: {
    width: 314
  },
  permitirQueMisFamiliaresYWrapper: {
    marginLeft: 20
  },
  checkParent: {
    marginTop: 20
  },
  permitirQueLas: {
    width: 321
  },
  opcionesDePrivacidadParent: {
    marginTop: 20,
    width: 388
  },
  hasCreadoUnNuevoIdDeInfaParent: {
    top: 20,
    left: 20,
    position: 'absolute'
  },
  crear: {
    marginTop: -11,
    marginLeft: -17,
    top: '50%',
    fontSize: FontSize.size_sm,
    lineHeight: 21,
    color: Color.white,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  pressable: {
    // marginLeft: -194,
    width: '100%',
    height: '100%',
    backgroundColor: Color.linearBoton,
    borderRadius: Border.br_11xl
  },
  button: {
    top: 341,
    height: 52,
    width: '100%',
    borderRadius: 100
  },
  creacinInfante: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.white,
    borderRadius: Border.br_11xl
  }
})

export default CreacinInfante
