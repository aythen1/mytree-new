import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Padding, Color, Border, FontSize, FontFamily } from '../GlobalStyles'
import PropTypes from 'prop-types'

const Cancion1 = ({ onClose }) => {
  return (
    <View style={styles.cancion}>
      <Text style={styles.aadirEvento}>Añadir evento</Text>
      <LinearGradient
        style={styles.button}
        locations={[0, 1]}
        colors={['#dee274', '#7ec18c']}
      >
        <Text onPress={onClose} style={styles.signIn}>
          Guardar
        </Text>
      </LinearGradient>
      <View style={styles.field}>
        <Text style={styles.text}>#</Text>
      </View>
      <View style={[styles.button1, styles.buttonFlexBox1]}>
        <Text style={[styles.miprimerabicicleta, styles.recomendadosTypo]}>
          #MiPrimeraBicicleta
        </Text>
      </View>
      <View style={[styles.button2, styles.buttonFlexBox1]}>
        <Text style={[styles.miprimerabicicleta, styles.recomendadosTypo]}>
          #Felicidad
        </Text>
      </View>
      <View style={[styles.button3, styles.buttonFlexBox1]}>
        <Text style={[styles.miprimerabicicleta, styles.recomendadosTypo]}>
          #Happy
        </Text>
      </View>
      <View style={[styles.button4, styles.buttonFlexBox]}>
        <Text style={[styles.miprimerabicicleta, styles.recomendadosTypo]}>
          #Emoción
        </Text>
      </View>
      <View style={[styles.button5, styles.buttonFlexBox]}>
        <Text style={[styles.miprimerabicicleta, styles.recomendadosTypo]}>
          #NosVamosDeViaje
        </Text>
      </View>
      <View style={[styles.button6, styles.buttonFlexBox]}>
        <Text style={[styles.miprimerabicicleta, styles.recomendadosTypo]}>
          #CumpleañosFeliz
        </Text>
      </View>
      <Text style={[styles.recomendados, styles.recomendadosTypo]}>
        Recomendados:
      </Text>
    </View>
  )
}

Cancion1.propTypes = {
  onClose: PropTypes.func
}

const styles = StyleSheet.create({
  buttonFlexBox1: {
    paddingVertical: Padding.p_6xs,
    paddingHorizontal: Padding.p_3xs,
    backgroundColor: Color.secundario,
    top: 133,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    borderRadius: Border.br_11xl
  },
  recomendadosTypo: {
    lineHeight: 14,
    fontSize: FontSize.size_xs,
    letterSpacing: 0,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500'
  },
  buttonFlexBox: {
    top: 166,
    paddingVertical: Padding.p_6xs,
    paddingHorizontal: Padding.p_3xs,
    backgroundColor: Color.secundario,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    borderRadius: Border.br_11xl
  },
  aadirEvento: {
    top: 20,
    fontSize: FontSize.size_xl,
    color: Color.negro,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    left: '50%',
    marginLeft: -194,
    position: 'absolute'
  },
  signIn: {
    flex: 1,
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.white,
    textAlign: 'center',
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato
  },
  button: {
    top: 280,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    borderRadius: Border.br_11xl
  },
  text: {
    marginTop: -9.5,
    top: '50%',
    lineHeight: 19,
    color: Color.gris,
    letterSpacing: 0,
    left: 20,
    fontSize: FontSize.size_base,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    position: 'absolute'
  },
  field: {
    top: 64,
    borderRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA,
    height: 49,
    left: 20,
    width: 388,
    position: 'absolute',
    overflow: 'hidden'
  },
  miprimerabicicleta: {
    color: Color.primario1
  },
  button1: {
    left: 113
  },
  button2: {
    left: 245
  },
  button3: {
    left: 325
  },
  button4: {
    left: 20
  },
  button5: {
    left: 102
  },
  button6: {
    left: 232
  },
  recomendados: {
    top: 140,
    color: Color.primary,
    left: 20,
    position: 'absolute',
    fontSize: FontSize.size_xs
  },
  cancion: {
    backgroundColor: Color.white,
    width: '100%',
    height: 400,
    overflow: 'hidden',
    borderTopLeftRadius: Border.br_11xl,
    borderTopRightRadius: Border.br_11xl,
    position: 'absolute',
    bottom: 0
  }
})

export default Cancion1
