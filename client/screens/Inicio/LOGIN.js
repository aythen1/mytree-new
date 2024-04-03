import React, { useState } from 'react'
import { Image } from 'expo-image'
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  ScrollView
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import {
  Color,
  FontFamily,
  Border,
  FontSize,
  Padding
} from '../../GlobalStyles'
import Checkbox from 'expo-checkbox'

const LOGIN = () => {
  const navigation = useNavigation()

  const [checked, setChecked] = useState(false)

  return (
    <ScrollView
      style={styles.login}
      contentContainerStyle={{ height: '100%' }}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        style={[styles.loginInner, styles.buttonFlexBox]}
        locations={[0, 1]}
        colors={['#7ec18c', '#dee274']}
      >
        <View>
          <Pressable
            style={styles.backButtonWrapper}
            onPress={() => navigation.navigate('Splash')}
          >
            <Image
              style={styles.backButtonIcon}
              contentFit="cover"
              source={require('../../assets/back-button.png')}
            />
          </Pressable>
          <View style={styles.frameGroup}>
            <Text style={[styles.estsDeVuelta, styles.signInClr]}>
              ¡ESTÁS DE VUELTA!
            </Text>
            <Text style={[styles.teRecibimosCon, styles.signInClr]}>
              Te recibimos con gusto. Tu compromiso impulsa la creación de
              legados. Sigamos adelante, unidos en esta hermosa tarea.
            </Text>
          </View>
        </View>
      </LinearGradient>
      <View style={[styles.frameContainer, styles.checkChildBg]}>
        <View style={styles.botContainer}>
          <Text style={[styles.labelled, styles.signInLayout]}>
            Correo Electrónico
          </Text>
          <View style={styles.baseBackgroundParent}>
            <View style={[styles.baseBackground, styles.baseLayout]} />
            <View
              style={[
                styles.iconsEnvelopeSimpleParent,
                styles.frameChildPosition
              ]}
            >
              <Image
                style={styles.frameChildLayout}
                contentFit="cover"
                source={require('../../assets/icons--envelope-simple.png')}
              />
              <TextInput placeholder="|" style={styles.input} />
            </View>
          </View>
        </View>
        <View style={styles.botContainer}>
          <Text style={[styles.labelled, styles.signInLayout]}>Contraseña</Text>
          <View style={styles.baseBackgroundParent}>
            <View style={[styles.baseBackground, styles.baseLayout]} />
            <View
              style={[
                styles.iconsEnvelopeSimpleParent,
                styles.frameChildPosition
              ]}
            >
              <Image
                style={styles.frameChildLayout}
                contentFit="cover"
                source={require('../../assets/frame-1.png')}
              />
              <TextInput placeholder="••••••••" style={styles.input2} />
            </View>
          </View>
        </View>
        <View style={styles.frameView}>
          <View style={styles.checkParent}>
            <Checkbox value={checked} onValueChange={setChecked} />
            <Text style={[styles.labelled2, styles.labelled2Typo]}>
              Recordarme
            </Text>
          </View>
          <Text style={[styles.olvidasteTuContrasea, styles.labelled2Typo]}>
            ¿Olvidaste tu contraseña?
          </Text>
        </View>
        <LinearGradient
          style={[styles.button, styles.buttonFlexBox]}
          locations={[0, 1]}
          colors={['#dee274', '#7ec18c']}
        >
          <Pressable onPress={() => navigation.navigate('Muro')}>
            <Text style={[styles.signIn, styles.signInLayout]}>Ingresar</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  buttonFlexBox: {
    backgroundColor: Color.linearBoton,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  signInClr: {
    color: Color.white,
    textAlign: 'center'
  },
  checkChildBg: {
    backgroundColor: Color.white
  },
  signInLayout: {
    lineHeight: 24,
    fontFamily: FontFamily.lato
  },
  baseLayout: {
    height: 50,
    backgroundColor: Color.fAFAFA,
    borderRadius: Border.br_3xs,

    zIndex: 0
  },
  frameChildPosition: {
    zIndex: 1
  },
  frameChildLayout: {
    height: 24,
    width: 24
  },
  labelled2Typo: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.lato
  },
  backButtonIcon: {
    position: 'absolute',
    top: 5,
    left: 30,
    width: 18,
    height: 10
  },
  backButtonWrapper: {
    padding: Padding.p_xl,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  estsDeVuelta: {
    fontSize: FontSize.size_5xl,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    color: Color.white,
    fontWeight: '900',
    lineHeight: 24
  },
  teRecibimosCon: {
    lineHeight: 20,
    fontWeight: '700',
    display: 'flex',
    width: 286,
    marginTop: 30,
    fontSize: FontSize.size_sm,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    color: Color.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ingresar: {
    fontSize: FontSize.size_lg,
    textTransform: 'uppercase',
    marginTop: 98,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    color: Color.white,
    fontWeight: '900',
    lineHeight: 24
  },
  frameGroup: {
    paddingLeft: 47,
    paddingRight: 55,
    alignItems: 'center',
    width: '100%'
  },
  loginInner: {
    width: '100%',
    height: '40%',
    left: 0,
    top: 0,
    backgroundColor: Color.linearBoton
  },
  labelled: {
    color: Color.negro,
    width: '100%',
    textAlign: 'left',
    fontSize: FontSize.size_sm,
    fontWeight: '900'
  },
  baseBackground: {
    shadowColor: 'rgba(244, 105, 76, 0.15)',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 14,
    elevation: 14,
    shadowOpacity: 1
  },
  placeholderIcon: {
    height: 22,
    marginLeft: 16
  },
  iconsEnvelopeSimpleParent: {
    left: 16,
    flexDirection: 'row',
    bottom: 37
  },
  baseBackgroundParent: {
    marginTop: 11
  },
  frameChild: {
    left: 15,
    zIndex: 1
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
    borderWidth: 1
  },
  check: {
    width: 20,
    height: 20
  },
  labelled2: {
    lineHeight: 20,
    color: Color.neutralGray1,
    marginLeft: 20,
    textAlign: 'left'
  },
  checkParent: {
    flexDirection: 'row'
  },
  olvidasteTuContrasea: {
    lineHeight: 18,
    fontWeight: '500',
    color: Color.primario1,
    marginLeft: '25%',
    textAlign: 'center'
  },
  frameView: {
    marginTop: 33,
    alignItems: 'flex-end',
    flexDirection: 'row',
    width: '100%'
  },
  signIn: {
    fontSize: FontSize.size_base,
    letterSpacing: 1,
    textAlign: 'center',
    color: Color.white,
    flex: 1
  },
  button: {
    borderRadius: Border.br_11xl,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    width: '100%',
    top: 20,
    height: 52
  },
  frameContainer: {
    height: '100%',
    padding: Padding.p_xl,
    alignItems: 'center',
    width: '100%',
    left: 0
  },
  login: {
    // height: '150%',
    flex: 1
  },
  input: {
    left: 10,
    bottom: 3
  },
  input2: {
    left: 10
  },
  botContainer: {
    width: '100%'
  }
})

export default LOGIN
