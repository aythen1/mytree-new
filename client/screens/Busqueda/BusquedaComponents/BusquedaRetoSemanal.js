import * as React from 'react'
import { StyleSheet, View, Pressable, Text } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { FontSize, Color, FontFamily, Border } from '../../../GlobalStyles'

const BusquedaRetoSemanal = () => {
  const navigation = useNavigation()

  return (
    <View style={[styles.busquedaRetoSemanal, styles.iconLayout]}>
      <View
        style={[styles.busquedaRetoSemanalChild, styles.navigationIconPosition]}
      />
      <Image
        style={[styles.image6Icon, styles.parentPosition]}
        contentFit="cover"
        source={require('../../../../assets/image-6.png')}
      />
      <View style={[styles.backParent, styles.backParentFlexBox]}>
        <Pressable
          style={styles.back}
          onPress={() => navigation.navigate('Busqueda')}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            contentFit="cover"
            source={require('../../../assets/back.png')}
          />
        </Pressable>
        <Text style={styles.retoSemanal}>Reto semanal</Text>
      </View>
      <View style={[styles.frameParent, styles.parentPosition]}>
        <View style={styles.rectangleParent}>
          <LinearGradient
            style={styles.frameChild}
            locations={[0, 1]}
            colors={['#7ec18c', '#dee274']}
          />
          <View style={[styles.retoActualSemanalParent, styles.parentPosition]}>
            <Text style={styles.retoActualSemanal}>Reto actual semanal</Text>
            <Text style={styles.enLugarDe}>
              En lugar de disfrazarse de manera tradicional, elijan temas
              inusuales y creativos, como "villanos amigables" o "personajes de
              cuentos de hadas modernos".
            </Text>
          </View>
        </View>
        <View style={[styles.frameGroup, styles.backParentFlexBox]}>
          <View style={styles.invitarAMsFamiliaresAEstWrapper}>
            <Text style={[styles.invitarAMs, styles.quTalTeTypo]}>
              Invitar a más familiares a este reto
            </Text>
          </View>
          <Image
            style={styles.arrowDown2Icon}
            contentFit="cover"
            source={require('../../../assets/arrowdown23.png')}
          />
        </View>
        <View style={styles.quTalTePareceEsteRetoParent}>
          <Text style={[styles.quTalTe, styles.quTalTeTypo]}>
            ¿Qué tal te parece este reto?
          </Text>
          <View style={styles.starsParent}>
            <Image
              style={styles.starsIconLayout}
              contentFit="cover"
              source={require('../../../assets/stars3.png')}
            />
            <Image
              style={[styles.starsIcon1, styles.starsIconLayout]}
              contentFit="cover"
              source={require('../../../assets/stars3.png')}
            />
            <Image
              style={[styles.starsIcon1, styles.starsIconLayout]}
              contentFit="cover"
              source={require('../../../assets/stars3.png')}
            />
            <Image
              style={[styles.starsIcon1, styles.starsIconLayout]}
              contentFit="cover"
              source={require('../../../assets/stars4.png')}
            />
            <Image
              style={[styles.starsIcon1, styles.starsIconLayout]}
              contentFit="cover"
              source={require('../../../assets/stars5.png')}
            />
          </View>
        </View>
      </View>
      <Image
        style={[styles.navigationIcon, styles.navigationIconPosition]}
        contentFit="cover"
        source={require('../../../assets/navigation10.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  iconLayout: {
    overflow: 'hidden',
    width: '100%'
  },
  navigationIconPosition: {
    width: 428,
    left: 0,
    position: 'absolute'
  },
  parentPosition: {
    left: 20,
    position: 'absolute'
  },
  backParentFlexBox: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  quTalTeTypo: {
    letterSpacing: 0,
    fontSize: FontSize.size_lg,
    textAlign: 'left',
    color: Color.negro,
    fontFamily: FontFamily.lato
  },
  starsIconLayout: {
    height: 31,
    width: 33,
    overflow: 'hidden'
  },
  busquedaRetoSemanalChild: {
    top: 0,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 25,
    elevation: 25,
    shadowOpacity: 1,
    height: 126,
    backgroundColor: Color.white
  },
  image6Icon: {
    top: 3,
    width: 87,
    height: 55
  },
  icon: {
    height: '100%'
  },
  back: {
    width: 24,
    height: 24
  },
  retoSemanal: {
    fontSize: FontSize.size_5xl,
    marginLeft: 20,
    textAlign: 'left',
    color: Color.negro,
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  backParent: {
    top: 78,
    justifyContent: 'center',
    left: 20,
    position: 'absolute'
  },
  frameChild: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.linearBoton,
    zIndex: 0,
    width: 388,
    height: 194
  },
  retoActualSemanal: {
    fontSize: FontSize.size_xl,
    lineHeight: 24,
    textAlign: 'right',
    color: Color.white,
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  enLugarDe: {
    width: 348,
    marginTop: 20,
    lineHeight: 22,
    fontSize: FontSize.size_lg,
    color: Color.white,
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  retoActualSemanalParent: {
    top: 20,
    zIndex: 1
  },
  rectangleParent: {
    height: 194
  },
  invitarAMs: {
    fontWeight: '500',
    lineHeight: 22
  },
  invitarAMsFamiliaresAEstWrapper: {
    width: 359
  },
  arrowDown2Icon: {
    width: 9,
    height: 16,
    marginLeft: 20
  },
  frameGroup: {
    justifyContent: 'flex-end',
    marginTop: 20,
    width: 388
  },
  quTalTe: {
    lineHeight: 27
  },
  starsIcon1: {
    marginLeft: 20
  },
  starsParent: {
    marginTop: 20,
    flexDirection: 'row'
  },
  quTalTePareceEsteRetoParent: {
    marginTop: 20
  },
  frameParent: {
    top: 146
  },
  navigationIcon: {
    top: 821,
    height: 105
  },
  busquedaRetoSemanal: {
    borderRadius: Border.br_31xl,
    flex: 1,
    height: 926,
    backgroundColor: Color.white
  }
})

export default BusquedaRetoSemanal
