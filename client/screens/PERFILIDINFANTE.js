import React from 'react'
import { Text, StyleSheet, Pressable, View, ScrollView } from 'react-native'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import { FontFamily, Padding, Border, FontSize, Color } from '../GlobalStyles'
import { useSelector } from 'react-redux'
import HeaderIcons from '../components/HeaderIcons'
import TreeSVG from '../components/svgs/TreeSVG'
import NotificationsMuroSVG from '../components/svgs/NotificationsMuroSVG'
import SettingMuroSVG from '../components/svgs/SettingMuroSVG'

const PERFILIDINFANTE = () => {
  const { infant } = useSelector((state) => state.infants)
  const navigation = useNavigation()

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.perfilIdInfante}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 15
          }}
        >
          <Image
            style={styles.image6Icon}
            contentFit="cover"
            source={require('../assets/image-6.png')}
          />
          <HeaderIcons
            icons={[
              <TreeSVG />,
              <NotificationsMuroSVG />,
              <SettingMuroSVG isNavigation={'PERFILINFANTEAJUSTES'} />
            ]}
          />
        </View>
        <View style={{ marginBottom: 130 }}>
          <Image
            style={styles.ionmenuIcon}
            contentFit="cover"
            source={require('../assets/ionmenu.png')}
          />
          <View style={[styles.maskGroupParent, styles.maskGroupLayout]}>
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
            <View style={[styles.tabsBar, styles.tabsBarPosition]}>
              <View style={[styles.miBiografaWrapper, styles.tabsFlexBox]}>
                <Text style={[styles.miBiografa, styles.miInfoTypo]}>
                  Mi Biografía
                </Text>
              </View>
              <Pressable
                // style={[styles.tabs, styles.tabsFlexBox]}
                onPress={() => navigation.navigate('BIO2Infante')}
              >
                <View style={styles.tabsFlexBox}>
                  <Text style={[styles.miInfo, styles.miInfoTypo]}>
                    Mi info
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <Text
            style={[styles.holaSoyLucas, styles.verMs1Typo]}
          >{`Hola, soy ${infant.name}, nací el ${infant.birthdate} de mi mamá ${infant.mother} y de mi papá ${infant.father}.
Actualmente tengo 35 añoss y dos meses.`}</Text>
          <Pressable
            style={styles.verMs}
            onPress={() => navigation.navigate('BIO2Infante')}
          >
            <Text style={[styles.verMs1, styles.verMs1Typo]}>Ver más...</Text>
          </Pressable>

          <Text style={[styles.embarazo, styles.verMs1Typo]}>Embarazo</Text>
          <View
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: Color.secundario,
              top: 15
            }}
          />

          <View style={styles.faritaParent}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Image
                style={[styles.faritaIcon, styles.iconLayout]}
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
                style={styles.vectorIcon}
                contentFit="cover"
                source={require('../assets/vector22.png')}
              />
            </ScrollView>
          </View>

          <Text style={[styles.embarazo, styles.verMs1Typo]}>
            Recién nacido y mis primeras semanas
          </Text>

          <View
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: Color.secundario,
              top: 15
            }}
          />

          <View style={styles.faritaParent}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Image
                style={[styles.faritaIcon, styles.iconLayout]}
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
                style={styles.vectorIcon}
                contentFit="cover"
                source={require('../assets/vector22.png')}
              />
            </ScrollView>
          </View>

          <Text style={[styles.embarazo, styles.verMs1Typo]}>
            Sonrisas Inolvidables
          </Text>

          <View
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: Color.secundario,
              top: 15
            }}
          />

          <View style={styles.faritaParent}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Image
                style={[styles.faritaIcon, styles.iconLayout]}
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
                style={styles.vectorIcon}
                contentFit="cover"
                source={require('../assets/vector22.png')}
              />
            </ScrollView>
          </View>

          <Text style={[styles.embarazo, styles.verMs1Typo]}>
            Momentos con mamá y papá
          </Text>

          <View
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: Color.secundario,
              top: 15
            }}
          />

          <View style={styles.faritaParent}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Image
                style={[styles.faritaIcon, styles.iconLayout]}
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
                style={styles.vectorIcon}
                contentFit="cover"
                source={require('../assets/vector22.png')}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  verMs1Typo: {
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  frameLayout: {
    width: 388,
    marginTop: 20
  },
  iconLayout: {
    width: 70,
    height: 70
  },

  iconlyLayout: {
    height: 24,
    width: 24
  },
  maskGroupLayout: {
    height: 233,
    width: '100%'
  },
  tabsBarPosition: {
    top: 20,
    // marginLeft: -214,
    // left: '50%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
    // position: 'absolute'
  },
  tabsFlexBox: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_9xs,
    width: 214,
    borderRadius: Border.br_7xs
    // top: 0,
    // justifyContent: 'center',
    // flexDirection: 'row',
    // alignItems: 'center',
    // position: 'absolute'
  },
  miInfoTypo: {
    textAlign: 'center',
    lineHeight: 19,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  holaSoyLucas: {
    color: Color.negro,
    display: 'flex',
    alignItems: 'center',
    lineHeight: 27,
    letterSpacing: 0,
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.lato,
    width: '100%'
  },
  verMs1: {
    color: Color.primario2,
    fontWeight: '700',
    lineHeight: 27,
    letterSpacing: 0,
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.lato
  },
  verMs: {
    marginTop: 20
  },
  embarazo: {
    fontSize: FontSize.size_xl,
    lineHeight: 24,
    fontWeight: '500',
    marginTop: 20,
    color: Color.secundario
  },
  frameChild: {
    maxHeight: '100%'
  },
  faritaIcon: {
    height: 70
  },
  marieIcon: {
    marginLeft: 20,
    height: 70
  },
  vectorIcon: {
    width: 30,
    height: 30,
    marginLeft: 20
  },
  faritaParent: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center'
    // width: 391
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
  frameIcon: {
    height: 70,
    marginTop: 20,
    width: 391
  },
  holaSoyLucasNacEl23DeParent: {
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
    width: '100%',
    justifyContent: 'center'
  },
  image6Icon: {
    width: 87,
    height: 55,
    zIndex: 1
  },

  groupChild: {
    top: 0,
    height: 16,
    width: 16,
    left: 0
    // position: 'absolute'
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
    width: 16
    // position: 'absolute'
  },
  iconly: {
    marginLeft: 20
  },
  icon: {
    height: '100%',
    width: '100%'
  },
  vectorParent: {
    zIndex: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  ionmenuIcon: {
    // top: 86,
    width: 26,
    height: 20,
    zIndex: 3,
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
    height: 60,
    left: '50%',
    zIndex: 1,
    position: 'absolute'
  },
  maskGroupParent: {
    top: 40,
    zIndex: 4
    // left: 20,
    // position: 'absolute'
  },
  miBiografa: {
    color: Color.white,
    fontWeight: '700'
  },
  miBiografaWrapper: {
    backgroundColor: Color.secundario
    // left: 0,
    // overflow: 'hidden'
  },
  miInfo: {
    color: Color.gris
  },
  tabs: {
    left: 214
  },
  tabsBar: {
    // top: 399,
    height: 40,
    zIndex: 5,
    backgroundColor: Color.white
  },

  perfilIdInfante: {
    height: '100%',
    top: 20,
    marginBottom: 80,
    // paddingHorizontal: 15,
    width: '100%',
    backgroundColor: Color.white
  }
})

export default PERFILIDINFANTE
