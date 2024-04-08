import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
// import ENTRADACREADA8 from "./ENTRADACREADA8";
import { Color, FontSize, FontFamily, Border, Padding } from '../GlobalStyles'

const VistaPrevia = ({ onClose, setCalendario }) => {
  const navigation = useNavigation()
  const [buttonContainer2Visible, setButtonContainer2Visible] = useState(false)

  const openButtonContainer2 = useCallback(() => {
    setButtonContainer2Visible(true)
  }, [])

  const closeButtonContainer2 = useCallback(() => {
    setButtonContainer2Visible(false)
  }, [])

  return (
    <>
      <View style={styles.vistaPrevia}>
        <View>
          <Text style={styles.tarjetaDigital}>Tarjeta digital</Text>
          <View style={styles.frameChild} />
          <View style={styles.frameGroup}>
            <View style={styles.felizCumpleaosParent}>
              <Text style={styles.felizCumpleaosTypo}>¡Feliz cumpleaños!</Text>
              <Text style={[styles.loremIpsumDolor, styles.felizCumpleaosTypo]}>
                Lorem ipsum dolor sit amet consectetur. Sociis enim nec enim
                facilisi pellentesque a.
              </Text>
            </View>
            <View style={styles.frameContainer}>
              <View style={styles.component7033Wrapper}>
                <View style={[styles.component7033, styles.componentLayout]}>
                  <View
                    style={[
                      styles.component7033Child,
                      styles.component7033Position
                    ]}
                  />
                  <Text
                    style={[styles.portraitPhotography, styles.portraitTypo]}
                  >
                    FOTO 1
                  </Text>
                </View>
              </View>
              <View style={[styles.component70331, styles.componentLayout]}>
                <View
                  style={[
                    styles.component7033Item,
                    styles.component7033Position
                  ]}
                />
                <Text
                  style={[styles.portraitPhotography1, styles.portraitTypo]}
                >
                  FOTO 2
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.frameGroup}>
            <View>
              <Text style={[styles.title, styles.titleTypo]}>Para</Text>
              <View style={[styles.frameParent1, styles.frameParentSpaceBlock]}>
                <Image
                  style={styles.frameItem}
                  contentFit="cover"
                  source={require('../assets/frame-1547754875.png')}
                />
                <Text style={[styles.brunoPham, styles.titleTypo]}>
                  Bruno Pham
                </Text>
              </View>
            </View>
            <View style={styles.frameGroup}>
              <Text style={[styles.title, styles.titleTypo]}>Firmas</Text>
              <View style={styles.frameParentSpaceBlock}>
                <View style={styles.frameParent3}>
                  <Image
                    style={styles.frameItem}
                    contentFit="cover"
                    source={require('../assets/frame-1547754875.png')}
                  />
                  <Text style={[styles.brunoPham, styles.titleTypo]}>
                    Bruno Pham
                  </Text>
                </View>
                <View style={styles.frameParent4}>
                  <Image
                    style={styles.frameItem}
                    contentFit="cover"
                    source={require('../assets/frame-1547754875.png')}
                  />
                  <Text style={[styles.brunoPham, styles.titleTypo]}>
                    Bruno Pham
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.buttonBar, styles.buttonFlexBox]}>
            <Pressable
              style={[styles.button, styles.buttonSpaceBlock]}
              onPress={() => navigation.navigate('MENSAJERA')}
            >
              <Text style={styles.signTypo}>Cancelar</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                onClose()
                setCalendario(true)
              }}
            >
              <LinearGradient
                style={[styles.button1, styles.button1FlexBox]}
                locations={[0, 1]}
                colors={['#dee274', '#7ec18c']}
              >
                <Text style={[styles.signIn1, styles.signTypo]}>
                  Programar envío
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
          <LinearGradient
            style={styles.button2}
            locations={[0, 1]}
            colors={['#dee274', '#7ec18c']}
          >
            <Pressable
              style={[styles.pressable, styles.button1FlexBox]}
              onPress={openButtonContainer2}
            >
              <Text style={styles.signIn2}>Enviar</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  felizCumpleaosTypo: {
    color: Color.gris,
    lineHeight: 22,
    fontSize: FontSize.size_lg,
    fontWeight: '500',
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  componentLayout: {
    height: 158,
    borderRadius: Border.br_3xs,
    overflow: 'hidden'
  },
  component7033Position: {
    backgroundColor: Color.secundario,
    left: 0,
    top: 0,
    // position: 'absolute',
    height: 158
  },
  portraitTypo: {
    textAlign: 'center',
    lineHeight: 17,
    fontSize: FontSize.size_sm,
    left: '50%',
    top: 68,
    color: Color.white,
    position: 'absolute',
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  titleTypo: {
    lineHeight: 19,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  frameParentSpaceBlock: {
    marginTop: 10,
    flexDirection: 'row'
  },
  buttonFlexBox: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Color.white
  },
  buttonSpaceBlock: {
    paddingBottom: Padding.p_5xs,
    paddingTop: Padding.p_6xs,
    paddingHorizontal: Padding.p_base,
    height: 52
    // flex: 1
  },
  button1FlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Border.br_11xl
  },
  signTypo: {
    lineHeight: 21,
    textAlign: 'center',
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  tarjetaDigital: {
    fontSize: FontSize.size_xl,
    color: Color.primario1,
    width: '100%',
    fontFamily: FontFamily.lato,
    lineHeight: 24,
    letterSpacing: 0,
    fontWeight: '700'
  },
  frameChild: {
    borderColor: Color.secundario,
    borderTopWidth: 1,
    width: '100%',
    height: 1,
    marginTop: 20,
    borderStyle: 'solid'
  },
  loremIpsumDolor: {
    marginTop: 15,
    width: '100%'
  },
  felizCumpleaosParent: {
    width: '100%',
    justifyContent: 'center'
  },
  component7033Child: {
    width: '100%'
  },
  portraitPhotography: {
    marginLeft: -25
  },
  component7033: {
    width: 192
  },
  component7033Wrapper: {
    width: 191
  },
  component7033Item: {
    width: '100%'
  },
  portraitPhotography1: {
    marginLeft: -24.5
  },
  component70331: {
    marginLeft: 6,
    width: 191
  },
  frameContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  frameGroup: {
    marginTop: 20
  },
  title: {
    color: Color.textTextPrimary,
    fontWeight: '500',
    lineHeight: 19,
    fontSize: FontSize.size_base,
    textAlign: 'left'
  },
  frameItem: {
    width: 30,
    height: 30
  },
  brunoPham: {
    color: Color.grisDiscord,
    textAlign: 'justify',
    marginLeft: 13,
    lineHeight: 19,
    fontSize: FontSize.size_base,
    fontWeight: '700'
  },
  frameParent1: {
    alignItems: 'center'
  },
  frameParent3: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  frameParent4: {
    marginLeft: 20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  button: {
    borderColor: Color.colorKhaki_100,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Color.white,
    borderStyle: 'solid',
    borderRadius: Border.br_11xl,
    paddingBottom: Padding.p_5xs,
    paddingTop: Padding.p_6xs,
    paddingHorizontal: Padding.p_base,
    height: 52,
    width: 200
  },
  signIn1: {
    color: Color.white,
    lineHeight: 21
  },
  button1: {
    paddingBottom: Padding.p_5xs,
    paddingTop: Padding.p_6xs,
    paddingHorizontal: Padding.p_base,
    height: 52,
    width: 200,
    // flex: 1,
    marginLeft: 20
  },
  buttonBar: {
    // width: '100%',
    // paddingHorizontal: 100,
    paddingVertical: Padding.p_3xs
    // marginTop: 15
  },
  buttonContainer2Overlay: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  buttonContainer2Bg: {
    // position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  signIn2: {
    letterSpacing: 1,
    // flex: 1,
    fontSize: FontSize.size_base,
    textAlign: 'center',
    color: Color.white,
    fontFamily: FontFamily.lato,
    lineHeight: 24
  },
  pressable: {
    width: '100%',
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm
  },
  button2: {
    marginTop: 15,
    width: '100%',
    borderRadius: Border.br_11xl
  },

  vistaPrevia: {
    paddingVertical: Padding.p_xl,
    paddingHorizontal: Padding.p_xl,
    width: '100%',
    // minHeight: '100%',
    // flexDirection: 'row',
    // overflow: 'hidden',
    backgroundColor: Color.white,
    borderTopLeftRadius: Border.br_11xl,
    borderTopRightRadius: Border.br_11xl,
    position: 'absolute',
    bottom: 0
  }
})

export default VistaPrevia
