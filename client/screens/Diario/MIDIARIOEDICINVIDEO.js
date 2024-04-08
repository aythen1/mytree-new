import * as React from 'react'
import { Image } from 'expo-image'
import { StyleSheet, Pressable, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import {
  FontSize,
  FontFamily,
  Color,
  Border,
  Padding
} from '../../GlobalStyles'

const MIDIARIOEDICINVIDEO = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.miDiarioEdicinVideo}>
      <View style={[styles.frameParent, styles.parentFlexBox]}>
        <View style={styles.pressableFlexBox}>
          <Pressable
            style={styles.backLayout}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require('../../assets/back6.png')}
            />
          </Pressable>
          <Text style={[styles.editarVideo, styles.editarVideoTypo]}>
            Editar video
          </Text>
        </View>
        <Image
          style={[styles.backIcon, styles.backLayout]}
          contentFit="cover"
          source={require('../../assets/back7.png')}
        />
      </View>
      <Image
        style={[styles.clarityresizeUpLineIcon, styles.buttonPosition]}
        contentFit="cover"
        source={require('../../assets/clarityresizeupline.png')}
      />
      <View style={[styles.rectangleParent, styles.parentFlexBox]}>
        <View style={styles.frameChild} />
        <Image
          style={[styles.vectorIcon, styles.iconPosition]}
          contentFit="cover"
          source={require('../../assets/vector39.png')}
        />
      </View>
      <Text style={[styles.aadeUnaDescripcin, styles.editarVideoTypo]}>
        Añade una descripción...
      </Text>
      <Image
        style={[styles.navigationIcon, styles.iconPosition]}
        contentFit="cover"
        source={require('../../assets/navigation23.png')}
      />
      <LinearGradient
        style={[styles.button, styles.buttonPosition]}
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
    textAlign: 'left',
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.lato
  },
  backLayout: {
    height: 30,
    width: 30
  },
  buttonPosition: {
    position: 'absolute',
    left: 20
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
    top: 627,
    color: Color.grisGeneral,
    left: 20,
    position: 'absolute'
  },
  navigationIcon: {
    marginLeft: -214,
    top: 821,
    width: 428,
    height: 105
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
    top: 749,
    width: 388,
    left: 20
  },
  miDiarioEdicinVideo: {
    backgroundColor: Color.white,
    height: 926,
    overflow: 'hidden',
    width: '100%',
    flex: 1
  }
})

export default MIDIARIOEDICINVIDEO
