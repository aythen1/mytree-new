import * as React from 'react'
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

const RetosFamiliaresCumplido = () => {
  const navigation = useNavigation()

  return (
    <View style={[styles.retosFamiliaresCumplido, styles.iconLayout]}>
      <View
        style={[
          styles.retosFamiliaresCumplidoChild,
          styles.navigationIconPosition
        ]}
      />
      <Image
        style={[styles.image6Icon, styles.parentPosition]}
        contentFit="cover"
        source={require('../../assets/image-6.png')}
      />
      <View style={[styles.backParent, styles.buttonFlexBox]}>
        <Pressable
          style={styles.back}
          onPress={() => navigation.navigate('VotacionDeRetos')}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            contentFit="cover"
            source={require('../../assets/back.png')}
          />
        </Pressable>
        <Text style={styles.retosFamiliares}>Retos Familiares</Text>
      </View>
      <View style={[styles.frameParent, styles.parentPosition]}>
        <View style={styles.rectangleParent}>
          <LinearGradient
            style={styles.frameChild}
            locations={[0, 1]}
            colors={['#7ec18c', '#dee274']}
          />
          <View style={[styles.retoActualSemanalParent, styles.parentPosition]}>
            <Text style={[styles.retoActualSemanal, styles.signInLayout]}>
              Reto actual semanal
            </Text>
            <Text style={[styles.enLugarDe, styles.enLugarDeTypo]}>
              En lugar de disfrazarse de manera tradicional, elijan temas
              inusuales y creativos, como "villanos amigables" o "personajes de
              cuentos de hadas modernos".
            </Text>
          </View>
        </View>
        <View style={[styles.frameGroup, styles.parentFlexBox]}>
          <View style={styles.retoCumplidoParent}>
            <Text style={[styles.retoCumplido, styles.enLugarDeTypo]}>
              ¡RETO CUMPLIDO!
            </Text>
            <View style={[styles.vectorParent, styles.parentFlexBox]}>
              <Image
                style={[styles.frameItem, styles.framePosition]}
                contentFit="cover"
                source={require('../../assets/line-93.png')}
              />
              <Image
                style={[styles.frameInner, styles.framePosition]}
                contentFit="cover"
                source={require('../../assets/line-94.png')}
              />
            </View>
          </View>
          <Text style={[styles.da1, styles.da1Typo]}>Día 1</Text>
          <Text style={[styles.da5, styles.da1Typo]}>Día 5</Text>
        </View>
        <View style={[styles.button, styles.buttonFlexBox]}>
          <Text
            style={[styles.signIn, styles.signInLayout]}
          >{`Ya has cumplido este reto, ¡Genial! `}</Text>
        </View>
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
    left: 0,
    position: 'absolute'
  },
  parentPosition: {
    left: 20,
    position: 'absolute'
  },
  buttonFlexBox: {
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
    top: 0,
    position: 'absolute'
  },
  da1Typo: {
    marginLeft: 244,
    width: 44,
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
  retosFamiliaresCumplidoChild: {
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
    position: 'absolute',
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
  retosFamiliares: {
    fontSize: FontSize.size_5xl,
    marginLeft: 20,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    color: Color.negro,
    fontWeight: '700'
  },
  backParent: {
    top: 78,
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
    textAlign: 'right',
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
    top: 20,
    zIndex: 1
  },
  rectangleParent: {
    height: 194
  },
  retoCumplido: {
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
  retoCumplidoParent: {
    alignItems: 'center'
  },
  da1: {
    color: Color.grisClaro
  },
  da5: {
    color: Color.primario1,
    fontWeight: '500'
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
  button: {
    borderRadius: Border.br_11xl,
    backgroundColor: Color.secundario,
    borderStyle: 'solid',
    borderColor: Color.colorGainsboro_100,
    borderWidth: 1.5,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    marginTop: 20,
    width: 388
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
    top: 146
  },
  navigationIcon: {
    top: 821,
    height: 105,
    left: 0,
    position: 'absolute'
  },
  retosFamiliaresCumplido: {
    borderRadius: Border.br_31xl,
    height: 926,
    flex: 1,
    backgroundColor: Color.white,
    width: '100%'
  }
})

export default RetosFamiliaresCumplido
