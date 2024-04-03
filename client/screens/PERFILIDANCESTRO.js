import React, { useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Modal
} from 'react-native'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import { FontFamily, Padding, Border, FontSize, Color } from '../GlobalStyles'
import BIO2Ancestro from './BIO2Ancestro'
import HeaderIcons from '../components/HeaderIcons'
import TreeSVG from '../components/svgs/TreeSVG'
import NotificationsMuroSVG from '../components/svgs/NotificationsMuroSVG'
import SettingMuroSVG from '../components/svgs/SettingMuroSVG'
import BookSVG from '../components/svgs/BookSVG'

const PERFILIDANCESTRO = () => {
  const navigation = useNavigation()
  const [moreInfo, setMoreInfo] = useState(false)

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.perfilIdAncestro}>
        <View
          style={{
            height: !moreInfo ? 460 : 150,
            width: '100%',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15
            }}
          >
            <View>
              <Image
                style={styles.image6Icon}
                contentFit="cover"
                source={require('../assets/image-6.png')}
              />
              <Image
                style={styles.ionmenuIcon}
                contentFit="cover"
                source={require('../assets/ionmenu.png')}
              />
            </View>
            <View style={[styles.vectorParent, styles.faritaFlexBox]}>
              <HeaderIcons
                icons={[
                  <TreeSVG />,
                  <NotificationsMuroSVG />,
                  <SettingMuroSVG isNavigation={'PERFILANCESTROAJUSTES1'} />,
                  <BookSVG isNavigation={'PERFILANCESTROAJUSTES'} />
                ]}
              />
            </View>
          </View>

          {!moreInfo && (
            <View style={styles.maskGroupLayout}>
              <Image
                style={[styles.maskGroupIcon, styles.maskGroupLayout]}
                contentFit="cover"
                source={require('../assets/mask-group17.png')}
              />
              <Image
                style={styles.vectorIcon5}
                contentFit="cover"
                source={require('../assets/vector23.png')}
              />
            </View>
          )}

          <View style={[styles.tabsBar, styles.tabsBarPosition]}>
            <View
              style={[
                !moreInfo
                  ? styles.miBiografaWrapper
                  : styles.miBiografaWrapper2,
                styles.tabsFlexBox
              ]}
            >
              <Pressable onPress={() => setMoreInfo(false)}>
                <Text
                  style={!moreInfo ? styles.miBiografa : styles.miBiografaNot}
                >
                  Mi Biografía
                </Text>
              </Pressable>
            </View>
            <Pressable
              style={[styles.tabs, styles.tabsFlexBox]}
              onPress={() => setMoreInfo(true)}
            >
              <Text
                style={[
                  moreInfo ? styles.miInfoOk : styles.miInfo,
                  styles.miInfoTypo
                ]}
              >
                Mi info
              </Text>
            </Pressable>
          </View>
        </View>
        {moreInfo && <BIO2Ancestro />}

        {!moreInfo && (
          <View style={{ paddingHorizontal: 15 }}>
            <Text
              style={styles.holaSoyFrancisco}
            >{`Hola, soy Francisco, nací en Paterna del Río (Almería) el 21 de mayo de 1936.
Fallecí el pasado 1 de mayo de 2008 en Badalona.`}</Text>

            <Text style={[styles.personasVinculadasA, styles.miInfanciaTypo]}>
              Personas vinculadas a este ID
            </Text>
            <View style={[styles.farita, styles.faritaFlexBox]}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <Image
                  style={styles.aatarIconLayout}
                  contentFit="cover"
                  source={require('../assets/aatar6.png')}
                />
                <Image
                  style={[styles.aatarIcon1, styles.aatarIconLayout]}
                  contentFit="cover"
                  source={require('../assets/aatar6.png')}
                />
                <Image
                  style={[styles.aatarIcon1, styles.aatarIconLayout]}
                  contentFit="cover"
                  source={require('../assets/aatar6.png')}
                />
                <Image
                  style={styles.vectorIcon}
                  contentFit="cover"
                  source={require('../assets/vector21.png')}
                />
              </ScrollView>
            </View>

            <Text style={[styles.miInfancia, styles.miInfanciaTypo]}>
              Mi infancia
            </Text>

            <View style={styles.faritaParent}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <Image
                  style={styles.iconLayout}
                  contentFit="cover"
                  source={require('../assets/farita1.png')}
                />
                <Image
                  style={[styles.marieIcon, styles.iconLayout]}
                  contentFit="cover"
                  source={require('../assets/farita1.png')}
                />
                <Image
                  style={[styles.marieIcon, styles.iconLayout]}
                  contentFit="cover"
                  source={require('../assets/farita2.png')}
                />
                <Image
                  style={[styles.marieIcon, styles.iconLayout]}
                  contentFit="cover"
                  source={require('../assets/farita2.png')}
                />
                <Image
                  style={styles.vectorIcon1}
                  contentFit="cover"
                  source={require('../assets/vector22.png')}
                />
              </ScrollView>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: Color.grisClaro,
                marginVertical: 15
              }}
            />

            <Text style={[styles.miInfancia, styles.miInfanciaTypo]}>
              Mi matrimonio
            </Text>

            <View style={styles.faritaGroup}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <Image
                  style={styles.iconLayout}
                  contentFit="cover"
                  source={require('../assets/farita1.png')}
                />
                <Image
                  style={[styles.marieIcon, styles.iconLayout]}
                  contentFit="cover"
                  source={require('../assets/farita1.png')}
                />
                <Image
                  style={[styles.marieIcon, styles.iconLayout]}
                  contentFit="cover"
                  source={require('../assets/farita1.png')}
                />
                <Image
                  style={[styles.marieIcon, styles.iconLayout]}
                  contentFit="cover"
                  source={require('../assets/farita2.png')}
                />
                <Image
                  style={[styles.marieIcon, styles.iconLayout]}
                  contentFit="cover"
                  source={require('../assets/farita2.png')}
                />
                <Image
                  style={styles.vectorIcon1}
                  contentFit="cover"
                  source={require('../assets/vector22.png')}
                />
              </ScrollView>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: Color.grisClaro,
                marginVertical: 15
              }}
            />

            <Text style={[styles.miInfancia, styles.miInfanciaTypo]}>
              Mi familia
            </Text>

            <View style={styles.faritaParent}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <Image
                  style={styles.iconLayout}
                  contentFit="cover"
                  source={require('../assets/farita1.png')}
                />
                <Image
                  style={[styles.marieIcon, styles.iconLayout]}
                  contentFit="cover"
                  source={require('../assets/farita1.png')}
                />
                <Image
                  style={[styles.marieIcon, styles.iconLayout]}
                  contentFit="cover"
                  source={require('../assets/farita2.png')}
                />
                <Image
                  style={[styles.marieIcon, styles.iconLayout]}
                  contentFit="cover"
                  source={require('../assets/farita2.png')}
                />
                <Image
                  style={styles.vectorIcon1}
                  contentFit="cover"
                  source={require('../assets/vector22.png')}
                />
              </ScrollView>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  parentPosition: {
    left: 20,
    position: 'absolute'
  },
  miInfanciaTypo: {
    fontWeight: '500',
    marginTop: 20,
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  faritaFlexBox: {
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  aatarIconLayout: {
    height: 60,
    width: 60
  },
  frameLayout: {
    width: 388,
    marginTop: 20
  },
  iconLayout: {
    height: 70,
    width: 70
  },
  textPosition: {
    top: 1,
    position: 'absolute'
  },
  iconlyLayout: {
    height: 24,
    width: 24
  },
  maskGroupLayout: {
    height: 233,
    width: '100%',
    marginTop: 20
  },
  tabsBarPosition: {
    width: '100%'
  },
  tabsFlexBox: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_9xs,
    width: 214,
    borderRadius: Border.br_7xs,
    top: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute'
  },
  miInfoTypo: {
    textAlign: 'center',
    lineHeight: 19,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  holaSoyFrancisco: {
    lineHeight: 27,
    color: Color.negro,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
    fontSize: FontSize.size_lg,
    width: 391
  },
  personasVinculadasA: {
    lineHeight: 22,
    marginTop: 20,
    fontSize: FontSize.size_lg,
    fontWeight: '500'
  },
  aatarIcon1: {
    marginLeft: 10
  },
  vectorIcon: {
    width: 20,
    height: 20,
    marginLeft: 10
  },
  farita: {
    padding: 5,
    marginTop: 20
  },
  miInfancia: {
    fontSize: FontSize.size_xl,
    lineHeight: 24,
    marginTop: 20
  },
  frameChild: {
    maxHeight: '100%'
  },
  marieIcon: {
    marginLeft: 20
  },
  vectorIcon1: {
    width: 30,
    height: 30,
    marginLeft: 20
  },
  faritaParent: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    width: 391
  },
  faritaGroup: {
    width: 406,
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center'
  },
  frameInner: {
    height: 0
  },
  frameView: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    width: 391,
    backgroundColor: Color.white
  },
  holaSoyFranciscoNacEnPParent: {
    top: 480,
    height: 410,
    width: 391
  },
  rectangleView: {
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 25,
    elevation: 25,
    shadowOpacity: 1,
    height: 459,
    zIndex: 0,
    width: 428,
    backgroundColor: Color.white
  },
  image6Icon: {
    top: 20,
    width: 87,
    height: 55
    // zIndex: 1,
    // left: 20,
    // position: 'absolute'
  },
  notificationIcon: {
    height: '83.33%',
    width: '70.83%',
    top: '8.33%',
    right: '14.58%',
    bottom: '8.33%',
    left: '14.58%',
    maxWidth: '100%',
    maxHeight: '100%',
    position: 'absolute',
    overflow: 'hidden'
  },
  groupChild: {
    top: 0,
    height: 16,
    width: 16,
    left: 0,
    position: 'absolute'
  },
  text: {
    left: 5,
    fontSize: FontSize.size_3xs,
    letterSpacing: 0.2,
    fontWeight: '800',
    fontFamily: FontFamily.nunitoSans,
    textAlign: 'right',
    color: Color.white
  },
  ellipseParent: {
    top: -6,
    left: 13,
    height: 16,
    width: 16,
    position: 'absolute'
  },
  iconly: {
    marginLeft: 20
  },
  icon: {
    height: '100%',
    width: '100%'
  },
  iconlycurveddocument: {
    width: 19,
    height: 22,
    marginLeft: 20
  },
  vectorParent: {
    // top: 20,
    // left: 257,
    width: 151,
    zIndex: 2
    // position: 'absolute'
  },
  ionmenuIcon: {
    // top: 86,
    marginTop: 20,
    width: 26,
    zIndex: 3,
    height: 20,
    overflow: 'hidden'
  },
  maskGroupIcon: {
    zIndex: 0
  },
  vectorIcon5: {
    marginTop: -29.5,
    marginLeft: -37.5,
    top: '50%',
    width: 75,
    left: '50%',
    zIndex: 1,
    height: 60,
    position: 'absolute'
  },

  miBiografa: {
    fontWeight: '700',
    color: Color.white,
    textAlign: 'center',
    lineHeight: 19,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  miBiografaNot: {
    fontWeight: '700',
    color: Color.gris,
    textAlign: 'center',
    lineHeight: 19,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  miBiografaWrapper: {
    backgroundColor: Color.secundario,
    left: 0,
    overflow: 'hidden'
  },

  miBiografaWrapper2: {
    backgroundColor: Color.white,
    left: 0,
    overflow: 'hidden'
  },

  miInfoOk: {
    backgroundColor: Color.secundario,
    width: '100%',
    height: 40,
    top: -10,
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_9xs,
    width: 214,
    borderRadius: Border.br_7xs,
    color: Color.white,
    fontWeight: '700'
  },
  miInfo: {
    color: Color.gris
  },
  tabs: {
    left: 214
  },
  tabsBarChild: {
    top: 39,
    left: 131,
    borderStyle: 'solid',
    borderColor: Color.backgroundPrimaryBackground,
    borderTopWidth: 1,
    width: 298,
    height: 1,
    position: 'absolute'
  },
  tabsBar: {
    marginTop: 35,
    height: 40,
    zIndex: 5,
    backgroundColor: Color.white
  },

  navigationIcon: {
    top: 821,
    height: 105
  },
  perfilIdAncestro: {
    width: '100%',
    backgroundColor: Color.white,
    paddingBottom: 30
  }
})

export default PERFILIDANCESTRO
