import * as React from 'react'
import { StyleSheet, Pressable, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { FontSize, FontFamily, Color, Border, Padding } from '../GlobalStyles'

const AñadeDescripcion = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.miDiarioEdicinVideo}>
      <Text style={[styles.aadeUnaDescripcin, styles.editarVideoTypo]}>
        Añade una descripción...
      </Text>
      <LinearGradient
        style={styles.button}
        locations={[0, 1]}
        colors={['#dee274', '#7ec18c']}
      >
        <Pressable
          style={[styles.pressable, styles.pressableFlexBox]}
          onPress={() => navigation.navigate('MIDIARIOENTRADATEXTOPL7')}
        >
          <Text style={styles.signIn}>Guardar</Text>
        </Pressable>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  parentFlexBox: {
    flexDirection: 'row',
    position: 'absolute'
  },
  editarVideoTypo: {
    // textAlign: 'left',
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.lato
  },
  backLayout: {
    height: 30,
    width: 30
  },

  iconPosition: {
    left: '50%',
    position: 'absolute'
  },
  pressableFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  icon: {
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  editarVideo: {
    fontWeight: '700',
    color: Color.negro,
    marginLeft: 20
  },
  backIcon: {
    marginLeft: 181,
    overflow: 'hidden'
  },
  frameParent: {
    top: 20,
    left: 20
  },
  clarityresizeUpLineIcon: {
    top: 556,
    width: 36,
    height: 36,
    left: 20,
    overflow: 'hidden'
  },
  frameChild: {
    backgroundColor: Color.secundario,
    width: 426,
    height: 537,
    zIndex: 0
  },
  vectorIcon: {
    marginTop: -28.5,
    marginLeft: -40,
    top: '50%',
    width: 78,
    height: 63,
    zIndex: 1
  },
  rectangleParent: {
    top: 70,
    left: 0
  },
  aadeUnaDescripcin: {
    // top: 627,
    color: Color.grisGeneral
    // left: 20,
    // position: 'absolute'
  },

  signIn: {
    fontSize: FontSize.size_base,
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.white,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    flex: 1
  },
  pressable: {
    borderRadius: Border.br_11xl,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton,
    width: '100%'
  },
  button: {
    // top: 749,
    width: '100%',
    borderRadius: 80,
    marginTop: 15
    // left: 20
  },
  miDiarioEdicinVideo: {
    // borderRadius: Border.br_31xl,
    backgroundColor: Color.white,
    height: '100%',
    overflow: 'hidden',
    width: '100%'
    // flex: 1
  }
})

export default AñadeDescripcion
