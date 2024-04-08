import React, { useState } from 'react'
import { Image } from 'expo-image'
import { StyleSheet, Pressable, View, Text, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
// import { useNavigation } from '@react-navigation/native'
import {
  Padding,
  FontSize,
  Color,
  FontFamily,
  Border
} from '../../GlobalStyles'
import Checkbox from 'expo-checkbox'

const RetosModal = ({ setShowModalRetos, setShowRetos }) => {
  const [isCheck, setIsCheck] = useState(false)
  // const navigation = useNavigation()

  return (
    <ScrollView
      style={styles.retosBienvenida}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.frameParent}>
        <View style={styles.frameGroup}></View>
        <View style={styles.parentSpaceBlock}>
          <LinearGradient
            style={[styles.frameChild, styles.pressableBg]}
            locations={[0, 0.26, 0.57, 0.82]}
            colors={['#7ec18c', '#d0dd78', '#dce175', '#fff']}
          >
            <View style={styles.frameContainer}>
              <View style={styles.frameView}>
                <View style={styles.bienvenidALosRetosFamiliaWrapper}>
                  <Text style={[styles.bienvenidALos, styles.popularTypo]}>
                    Bienvenid@ a los Retos Familiares
                  </Text>
                </View>
                <Text
                  style={[styles.aquEncontrarsLos, styles.signInLayout]}
                >{`Aquí encontrarás los retos familiares que puedes proponer a tu familia, para poder seguir estando en contacto con ell@s.

A continuación verás los retos propuestos, tanto por nosotros como por otros usuarios para hacer en familia.

Los retos más votados, se lanzarán la próxima semana a todos los usuarios de MyTree.

Desliza hacia la derecha el que más te guste o hacia la izquierda si no te convence
`}</Text>
                <View style={[styles.checkParent, styles.parentSpaceBlock]}>
                  <View style={styles.check}>
                    {/* <View style={styles.checkChild} /> */}
                    {/* <Image
                      style={styles.vectorIcon}
                      contentFit="cover"
                      source={require('../assets/vector.png')}
                    /> */}
                    <Checkbox value={isCheck} onValueChange={setIsCheck} />
                  </View>
                  <View style={styles.noVolverAMostrarWrapper}>
                    <Text style={styles.noVolverA}>No volver a mostrar</Text>
                  </View>
                </View>
              </View>
              <LinearGradient
                style={styles.button}
                locations={[0, 1]}
                colors={['#dee274', '#7ec18c']}
              >
                <Pressable
                  style={[styles.pressable, styles.pressableBg]}
                  onPress={() => {
                    setShowModalRetos(false)
                    setShowRetos(true)
                  }}
                >
                  <Text style={[styles.signIn, styles.signInLayout]}>
                    CONTINUAR
                  </Text>
                </Pressable>
              </LinearGradient>
            </View>
          </LinearGradient>
        </View>
      </View>
      <Image
        style={[styles.navigationIcon, styles.frameParentPosition]}
        contentFit="cover"
        source={require('../../assets/navigation34.png')}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  frameParentPosition: {
    // left: 0
    // width: 428,
    // position: 'absolute'
  },
  messageLayout: {
    height: 24,
    width: 24
  },
  tabsFlexBox: {
    paddingVertical: Padding.p_3xs,
    // paddingHorizontal: Padding.p_9xs,
    width: 194,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  popularLayout: {
    width: 110,
    textAlign: 'center',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  popularTypo: {
    color: Color.white,
    fontWeight: '700',
    fontFamily: FontFamily.lato
  },
  pressableBg: {
    // backgroundColor: Color.linearBoton,
    borderRadius: Border.br_11xl
  },
  signInLayout: {
    lineHeight: 24,
    color: Color.white,
    fontFamily: FontFamily.lato
  },
  parentSpaceBlock: {
    width: '100%',
    marginTop: 0,
    flexDirection: 'row'
  },
  icon: {
    height: '100%',
    width: '100%'
  },
  iconlylightOutlinecalendar: {
    marginLeft: 20
  },
  pressableFlexBox: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  trending: {
    fontWeight: '300',
    color: Color.textPlaceholder,
    fontFamily: FontFamily.lato
  },
  tabs: {
    backgroundColor: Color.fAFAFA
  },
  popular: {
    width: 110,
    textAlign: 'center',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  popularWrapper: {
    borderTopRightRadius: Border.br_7xs,
    borderBottomRightRadius: Border.br_7xs,
    backgroundColor: Color.secundario,
    overflow: 'hidden'
  },
  frameGroup: {
    alignItems: 'flex-end'
  },
  frameChild: {
    height: 803,
    zIndex: 0,
    width: '100%'
  },
  bienvenidALos: {
    fontSize: FontSize.size_5xl,
    textAlign: 'left'
  },
  bienvenidALosRetosFamiliaWrapper: {
    alignItems: 'center'
  },
  aquEncontrarsLos: {
    fontSize: FontSize.size_xl,
    fontWeight: '500',
    width: 383,
    height: 378,
    textAlign: 'left',
    lineHeight: 24,
    letterSpacing: 0,
    marginTop: 20
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
    maxWidth: '100%',
    maxHeight: '100%',
    position: 'absolute',
    overflow: 'hidden'
  },
  check: {
    width: 20,
    height: 20
  },
  noVolverA: {
    color: Color.gris,
    textAlign: 'justify',
    fontFamily: FontFamily.lato,
    lineHeight: 19,
    fontSize: FontSize.size_base,
    letterSpacing: 0
  },
  noVolverAMostrarWrapper: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkParent: {
    alignItems: 'center'
  },
  frameView: {
    height: 465,
    width: 388
  },
  signIn: {
    letterSpacing: 1,
    textAlign: 'center',
    lineHeight: 24,
    fontSize: FontSize.size_base,
    flex: 1
  },
  pressable: {
    paddingVertical: Padding.p_sm,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  button: {
    marginTop: 100,
    width: '100%',
    borderRadius: 50
    // alignSelf: 'center'
    // left: -10
  },
  frameContainer: {
    paddingHorizontal: 10,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // left: 20,
    zIndex: 1
    // position: 'absolute'
  },
  frameParent: {
    top: 0,
    alignItems: 'center'
  },
  navigationIcon: {
    top: 821,
    height: 105,
    width: 428
  },
  retosBienvenida: {
    borderRadius: Border.br_31xl,
    // height: 926,
    // overflow: 'hidden',
    width: '100%',
    flex: 1
  }
})

export default RetosModal
