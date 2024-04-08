import React, { useState } from 'react'
import { StyleSheet, View, Pressable, Text } from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import {
  Color,
  FontFamily,
  FontSize,
  Border,
  Padding
} from '../../GlobalStyles'

const RetosFamiliaresSinCumplir = () => {
  const navigation = useNavigation()

  const [challengeComplete, setChallengeComplete] = useState(false)

  return (
    <View
      style={
        ([styles.retosFamiliaresSinCumplir, styles.iconLayout], { top: 30 })
      }
    >
      {/* <View
        style={[
          styles.retosFamiliaresSinCumplirChild,
          styles.navigationIconPosition
        ]}
      /> */}
      <View style={{ backgroundColor: 'white' }}>
        <Image
          style={styles.image6Icon}
          contentFit="cover"
          source={require('../../assets/image-6.png')}
        />
        <View style={[styles.backParent, styles.pressableFlexBox]}>
          <Pressable style={styles.back} onPress={() => navigation.goBack()}>
            <Image
              style={[styles.icon, styles.iconLayout]}
              contentFit="cover"
              source={require('../../assets/back.png')}
            />
          </Pressable>
          <Text style={styles.retosFamiliares}>Retos Familiares</Text>
        </View>
      </View>
      <View style={[styles.frameParent, styles.parentPosition]}>
        <View style={styles.rectangleParent}>
          <LinearGradient
            style={styles.frameChild}
            locations={[0, 1]}
            colors={['#7ec18c', '#dee274']}
          >
            <View
              style={[styles.retoActualSemanalParent, styles.parentPosition]}
            >
              <Text style={[styles.retoActualSemanal, styles.signInLayout]}>
                Reto actual semanal
              </Text>
              <Text style={[styles.enLugarDe, styles.enLugarDeTypo]}>
                En lugar de disfrazarse de manera tradicional, elijan temas
                inusuales y creativos, como &quot;villanos amigables&quot; o
                &quot;personajes de cuentos de hadas modernos&quot;.
              </Text>
            </View>
          </LinearGradient>
        </View>
        <View style={[styles.frameGroup, styles.parentFlexBox]}>
          <View style={styles.teQuedan2DasParaRealizarParent}>
            <Text style={[styles.teQuedan2, styles.enLugarDeTypo]}>
              {challengeComplete
                ? '¡RETO CUMPLIDO!'
                : '¡Te quedan 2 días para realizar el reto semanal!'}
            </Text>
            <View style={[styles.vectorParent, styles.parentFlexBox]}>
              <Image
                style={{
                  width: 260,
                  height: 20,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10
                }}
                contentFit="cover"
                source={require('../../assets/line-94.png')}
              />
              <Image
                style={{
                  width: 80,
                  height: 20,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10
                }}
                contentFit="cover"
                source={require('../../assets/line-93.png')}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            paddingHorizontal: 15
          }}
        >
          <Text style={[styles.da1, styles.da1Typo]}>Día 1</Text>
          <Text style={[styles.da5, styles.da1Typo]}>Día 5</Text>
        </View>
        <LinearGradient
          style={[styles.button]}
          locations={[0, 1]}
          colors={
            !challengeComplete ? ['#dee274', '#7ec18c'] : ['white', 'grey']
          }
        >
          <Pressable
            style={[styles.pressable, styles.pressableFlexBox]}
            onPress={() => setChallengeComplete(true)}
          >
            <Text style={[styles.signIn, styles.signInLayout]}>
              {challengeComplete
                ? 'Ya has cumplido este reto, Genial!'
                : 'Cumplir reto'}
            </Text>
          </Pressable>
        </LinearGradient>
        <View style={styles.quTalTePareceEsteRetoParent}>
          <Text style={styles.quTalTe}>¿Qué tal te parece este reto?</Text>
          <View style={[styles.starsParent, styles.parentFlexBox]}>
            <Image
              style={styles.starsIconLayout}
              contentFit="cover"
              source={require('../../assets/stars3.png')}
            />
            <Image
              style={[styles.starsIcon1, styles.starsIconLayout]}
              contentFit="cover"
              source={require('../../assets/stars3.png')}
            />
            <Image
              style={[styles.starsIcon1, styles.starsIconLayout]}
              contentFit="cover"
              source={require('../../assets/stars3.png')}
            />
            <Image
              style={[styles.starsIcon1, styles.starsIconLayout]}
              contentFit="cover"
              source={require('../../assets/stars4.png')}
            />
            <Image
              style={[styles.starsIcon1, styles.starsIconLayout]}
              contentFit="cover"
              source={require('../../assets/stars5.png')}
            />
          </View>
        </View>
      </View>
      <Image
        style={[styles.navigationIcon, styles.navigationIconPosition]}
        contentFit="cover"
        source={require('../../assets/navigation9.png')}
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
    left: 0
    // position: 'absolute'
  },
  pressableFlexBox: {
    padding: 15,
    // top: -10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  signInLayout: {
    lineHeight: 24,
    color: Color.white,
    fontFamily: FontFamily.lato
  },
  enLugarDeTypo: {
    lineHeight: 22,
    fontSize: FontSize.size_lg,
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  parentFlexBox: {
    flexDirection: 'row',
    marginTop: 20
  },
  framePosition: {
    maxHeight: '100%',
    left: 0,
    top: 0
    // position: 'absolute'
  },
  da1Typo: {
    // marginLeft: 244,
    width: 60,
    fontFamily: FontFamily.nunito,
    lineHeight: 22,
    fontSize: FontSize.size_lg,
    textAlign: 'left'
  },
  starsIconLayout: {
    height: 31,
    width: 33,
    overflow: 'hidden'
  },
  retosFamiliaresSinCumplirChild: {
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 25,
    elevation: 25,
    shadowOpacity: 1,
    height: 126,
    top: 0,
    left: 0,
    // position: 'absolute',
    backgroundColor: Color.white
  },
  image6Icon: {
    top: 3,
    width: 87,
    height: 55
  },
  icon: {
    height: '100%'
    // marginLeft: 20
  },
  back: {
    width: 24,
    height: 24
  },
  retosFamiliares: {
    fontSize: FontSize.size_5xl,
    marginLeft: 20,
    // textAlign: 'left',
    width: '100%',
    fontFamily: FontFamily.lato,
    color: Color.negro,
    fontWeight: '700'
  },
  backParent: {
    // top: 78,
    left: 20,
    backgroundColor: Color.white
    // position: 'absolute'
  },
  frameChild: {
    padding: 15,
    borderRadius: Border.br_3xs,
    zIndex: 0,
    backgroundColor: Color.linearBoton,
    width: 388,
    height: 194
  },
  retoActualSemanal: {
    fontSize: FontSize.size_xl,
    // textAlign: 'right',
    color: Color.white,
    fontWeight: '700',
    lineHeight: 24
  },
  enLugarDe: {
    width: 348,
    marginTop: 20,
    color: Color.white
  },
  retoActualSemanalParent: {
    // top: 20,
    zIndex: 1
  },
  rectangleParent: {
    height: 194
  },
  teQuedan2: {
    fontWeight: '500',
    width: 388,
    color: Color.negro,
    lineHeight: 22
  },
  frameItem: {
    width: 372,
    zIndex: 0
  },
  frameInner: {
    width: 303,
    zIndex: 1
  },
  vectorParent: {
    width: 378,
    padding: Padding.p_3xs,
    marginTop: 20
  },
  teQuedan2DasParaRealizarParent: {
    alignItems: 'center'
  },
  da1: {
    color: Color.grisClaro
  },
  da5: {
    color: Color.primario1,
    fontWeight: '500',
    right: 70
  },
  frameGroup: {
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    marginTop: 20,
    width: 388
  },
  signIn: {
    fontSize: FontSize.size_base,
    letterSpacing: 1,
    textAlign: 'center',
    color: Color.white,
    flex: 1
  },
  pressable: {
    borderRadius: Border.br_11xl,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton,
    width: '100%',
    justifyContent: 'center'
  },
  button: {
    marginTop: 20,

    borderRadius: 30
  },
  quTalTe: {
    letterSpacing: 0,
    lineHeight: 27,
    color: Color.primary,
    fontSize: FontSize.size_lg,
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  starsIcon1: {
    marginLeft: 20
  },
  starsParent: {
    marginTop: 20
  },
  quTalTePareceEsteRetoParent: {
    marginTop: 20
  },
  frameParent: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: Color.grisClaro
  },

  retosFamiliaresSinCumplir: {
    borderRadius: Border.br_31xl,
    // height: 926,
    flex: 1,
    backgroundColor: Color.white,
    overflow: 'hidden'
  }
})

export default RetosFamiliaresSinCumplir
