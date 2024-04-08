import * as React from 'react'
import { Text, StyleSheet, View, Pressable, ScrollView } from 'react-native'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import { FontSize, Padding, Border, FontFamily, Color } from '../GlobalStyles'

const BIO2Infante = () => {
  const navigation = useNavigation()

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.bio2Infante}>
        <View style={[styles.nacALas1430HsParent, styles.iconPosition]}>
          <Text style={styles.containerFlexBox}>
            <Text style={styles.nacALas}>Nací a las</Text>
            <Text style={styles.hs}>14:30 hs</Text>
          </Text>
          <Text style={[styles.pesoAlNacerContainer, styles.containerFlexBox]}>
            <Text style={styles.nacALas}>Peso al nacer</Text>
            <Text style={styles.hs}>2.202 kg</Text>
          </Text>
          <Text style={[styles.pesoAlNacerContainer, styles.containerFlexBox]}>
            <Text style={styles.nacALas}>Duermo...</Text>
            <Text style={styles.hs}>
              Bien, pero nunc mattis. Mauris feugiat non interdum enim nullam
              ullamcorper. At enim egestas nisl pellentesque mattis turpis eu.
            </Text>
          </Text>
          <Text style={[styles.pesoAlNacerContainer, styles.containerFlexBox]}>
            <Text style={styles.nacALas}>Como...</Text>
            <Text style={styles.hs}>
              rcu nunc mattis. Mauris feugiat non interdum enim nullam
              ullamcorper.
            </Text>
          </Text>
          <Text style={[styles.pesoAlNacerContainer, styles.containerFlexBox]}>
            <Text style={styles.nacALas}>Mi comida favorita es...</Text>
            <Text style={styles.hs}>
              rcu nunc mattis. Mauris feugiat non interdum enim nullam
              ullamcorper.
            </Text>
          </Text>
          <Text style={[styles.pesoAlNacerContainer, styles.containerFlexBox]}>
            <Text style={styles.nacALas}>{`Palabras favoritas
`}</Text>
            <Text style={styles.hs}>
              rcu nunc mattis. Mauris feugiat non interdum enim nullam
              ullamcorper.
            </Text>
          </Text>
          <Text style={[styles.pesoAlNacerContainer, styles.containerFlexBox]}>
            <Text style={styles.nacALas}>{`Canciones favoritas
`}</Text>
            <Text style={styles.hs}>
              rcu nunc mattis. Mauris feugiat non interdum enim nullam
              ullamcorper.
            </Text>
          </Text>
        </View>
        <View style={styles.rectangleParent}>
          <View style={styles.frameChild} />
          <Image
            style={[styles.image6Icon, styles.iconPosition]}
            contentFit="cover"
            source={require('../assets/image-6.png')}
          />
          <View style={styles.vectorParent}>
            <Image
              style={styles.iconlyLayout}
              contentFit="cover"
              source={require('../assets/vector7.png')}
            />
            <View style={[styles.iconly, styles.iconlyLayout]}>
              <Image
                style={styles.notificationIcon}
                contentFit="cover"
                source={require('../assets/notification4.png')}
              />
              <View style={styles.ellipseParent}>
                <Image
                  style={styles.groupChild}
                  contentFit="cover"
                  source={require('../assets/ellipse-2263.png')}
                />
                <Text style={styles.text}>1</Text>
              </View>
            </View>
            <Pressable
              style={[styles.iconly, styles.iconlyLayout]}
              onPress={() => navigation.navigate('PERFILINFANTEAJUSTES')}
            >
              <Image
                style={styles.icon}
                contentFit="cover"
                source={require('../assets/iconlylightoutlinesetting.png')}
              />
            </Pressable>
          </View>
          <Image
            style={[styles.ionmenuIcon, styles.iconPosition]}
            contentFit="cover"
            source={require('../assets/ionmenu.png')}
          />
          <View style={[styles.tabsBar, styles.tabsBarPosition]}>
            <Pressable
              style={[styles.miBiografaWrapper, styles.tabsFlexBox]}
              onPress={() => navigation.navigate('PERFILIDINFANTE')}
            >
              <Text style={[styles.miBiografa, styles.miInfoTypo]}>
                Mi Biografía
              </Text>
            </Pressable>
            <View style={[styles.tabs, styles.tabsFlexBox]}>
              <Text style={[styles.miInfo, styles.miInfoTypo]}>Mi info</Text>
            </View>
            <View style={styles.tabsBarChild} />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  iconPosition: {
    left: 20,
    position: 'absolute'
  },
  containerFlexBox: {
    textAlign: 'left',
    lineHeight: 27,
    letterSpacing: 0,
    fontSize: FontSize.size_lg,
    alignSelf: 'stretch'
  },
  tabsBarPosition: {
    width: '100%',
    // left: '50%',
    // marginLeft: -214,
    position: 'absolute'
  },
  iconlyLayout: {
    height: 24,
    width: 24
  },
  tabsFlexBox: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_9xs,
    width: 214,
    borderRadius: Border.br_7xs,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute'
  },
  miInfoTypo: {
    textAlign: 'center',
    lineHeight: 19,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  nacALas: {
    color: Color.primario2,
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  hs: {
    color: Color.negro,
    fontFamily: FontFamily.lato
  },
  pesoAlNacerContainer: {
    marginTop: 20
  },
  nacALas1430HsParent: {
    top: 207,
    width: 388,
    height: 599
  },

  frameChild: {
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 25,
    elevation: 25,
    shadowOpacity: 1,
    zIndex: 0,
    height: 186,
    width: '100%',
    backgroundColor: Color.white
  },
  image6Icon: {
    top: 2,
    width: 87,
    height: 55,
    zIndex: 1
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
    color: Color.white,
    top: 1,
    position: 'absolute'
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
  vectorParent: {
    top: 20,
    left: 296,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute'
  },
  ionmenuIcon: {
    top: 86,
    width: 26,
    height: 20,
    zIndex: 3,
    overflow: 'hidden'
  },
  miBiografa: {
    color: Color.grisGeneral
  },
  miBiografaWrapper: {
    left: 0,
    overflow: 'hidden'
  },
  miInfo: {
    color: Color.white,
    fontWeight: '700'
  },
  tabs: {
    left: 214,
    backgroundColor: Color.secundario
  },
  tabsBarChild: {
    top: 39,
    borderStyle: 'solid',
    borderColor: Color.backgroundPrimaryBackground,
    borderTopWidth: 1,
    width: 429,
    height: 1,
    left: 0,
    position: 'absolute'
  },
  tabsBar: {
    top: 126,
    height: 40,
    zIndex: 4,
    backgroundColor: Color.white
  },
  rectangleParent: {
    flexDirection: 'row',
    height: 186,
    left: 0,
    top: 1,
    position: 'absolute'
  },
  bio2Infante: {
    borderRadius: Border.br_31xl,
    // flex: 1,
    height: 926,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: Color.white
  }
})

export default BIO2Infante
