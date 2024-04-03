import * as React from 'react'
import { Image } from 'expo-image'
import { StyleSheet, Pressable, View, Text, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { Color, Padding, FontFamily, FontSize, Border } from '../GlobalStyles'

const VotacionDeRetos = () => {
  const navigation = useNavigation()

  return (
    <View style={[styles.votacionDeRetos, styles.imageSlideSpaceBlock]}>
      <View style={styles.frameParent}>
        <View style={styles.imageSlideParent}>
          <View style={[styles.imageSlide, styles.tabsFlexBox]}>
            <View style={styles.tabsFlexBox}>
              <ScrollView
                horizontal={true}
                contentContainerStyle={{
                  alignItems: 'center'
                }}
                showsHorizontalScrollIndicator={false}
              >
                <View style={[styles.image, styles.imageLayout]}>
                  <Image
                    style={styles.placeholderIcon}
                    contentFit="cover"
                    source={require('../assets/placeholder1.png')}
                  />
                </View>
                <View style={[styles.image1, styles.imageFlexBox]}>
                  <Image
                    style={styles.placeholderIcon1}
                    contentFit="cover"
                    source={require('../assets/placeholder2.png')}
                  />
                </View>
                <View style={[styles.image2, styles.imageFlexBox]}>
                  <Image
                    style={styles.placeholderIcon}
                    contentFit="cover"
                    source={require('../assets/placeholder1.png')}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
          <View style={styles.frameView}>
            <View style={styles.votacinDeRetosParent}>
              <Text style={[styles.votacinDeRetos, styles.votacinDeRetosClr]}>
                Votación de retos
              </Text>
              <Text style={[styles.deslizaHaciaLa, styles.votacinDeRetosClr]}>
                Desliza hacia la derecha el que más te guste o hacia la
                izquierda si no te convence
              </Text>
            </View>
            <View style={styles.frameParent1}>
              <View style={styles.buttonParent}>
                <Pressable
                  style={[styles.button, styles.buttonFlexBox]}
                  onPress={() => navigation.navigate('CrearReto')}
                >
                  <Text style={styles.signTypo}>Crear Reto</Text>
                </Pressable>
                <Pressable
                  style={[styles.button1, styles.buttonFlexBox]}
                  onPress={() => navigation.navigate('RETOSMSVOTADOS')}
                >
                  <Text style={styles.signTypo}>Ver más votados</Text>
                </Pressable>
              </View>
              <LinearGradient
                style={styles.button2}
                locations={[0, 1]}
                colors={['#dee274', '#7ec18c']}
              >
                <Pressable
                  style={[styles.pressable, styles.buttonFlexBox]}
                  onPress={() =>
                    navigation.navigate('RetosFamiliaresSinCumplir')
                  }
                >
                  <Text style={[styles.signIn2, styles.signTypo]}>
                    Cumplir Reto Familiar
                  </Text>
                </Pressable>
              </LinearGradient>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imageSlideSpaceBlock: {
    paddingHorizontal: 0,
    backgroundColor: Color.backgroundPrimaryBackground,
    marginBottom: 60
  },
  messageLayout: {
    height: 24,
    width: 24
  },
  tabsSpaceBlock: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_9xs,
    width: 194
  },
  popularTypo: {
    width: 110,
    fontFamily: FontFamily.lato,
    lineHeight: 19,
    fontSize: FontSize.size_base,
    textAlign: 'center',
    letterSpacing: 0
  },
  imageFlexBox1: {
    backgroundColor: Color.secundario,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  aatarIconPosition: {
    left: 0,
    position: 'absolute',
    width: 70
  },
  you1Typo: {
    color: Color.negro,
    fontWeight: '600',
    lineHeight: 22,
    fontSize: FontSize.footnote_size,
    top: -1,
    position: 'absolute',
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  youLayout: {
    height: 90,
    width: 70
  },
  tabsFlexBox: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.backgroundPrimaryBackground
  },
  imageLayout: {
    height: 290,
    width: 263,
    borderRadius: Border.br_base
  },
  imageFlexBox: {
    marginLeft: 16,
    backgroundColor: Color.secundario,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  votacinDeRetosClr: {
    color: Color.secundario,
    fontFamily: FontFamily.lato
  },
  buttonFlexBox: {
    paddingVertical: Padding.p_sm,
    paddingHorizontal: Padding.p_5xl,
    borderRadius: Border.br_11xl,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  signTypo: {
    lineHeight: 24,
    letterSpacing: 1,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base,
    flex: 1
  },
  icon: {
    height: '100%',
    width: '100%'
  },
  iconlylightOutlinecalendar: {
    marginLeft: 20
  },
  trending: {
    fontWeight: '300',
    color: Color.textPlaceholder
  },
  tabs: {
    backgroundColor: Color.fAFAFA,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  popular: {
    color: Color.white,
    fontWeight: '700'
  },
  popularWrapper: {
    borderTopRightRadius: Border.br_7xs,
    borderBottomRightRadius: Border.br_7xs,
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_9xs,
    width: 194,
    overflow: 'hidden'
  },
  tabsParent: {
    marginTop: 20,
    flexDirection: 'row'
  },
  frameContainer: {
    alignItems: 'flex-end'
  },
  aatarIcon: {
    top: 0,
    height: 70
  },
  you1: {
    left: 25
  },
  youWrapper: {
    top: 70,
    height: 20,
    overflow: 'hidden'
  },
  benjamin1: {
    left: 10
  },
  benjamin: {
    marginLeft: 20
  },
  farita1: {
    left: 20
  },
  marie1: {
    left: 19
  },
  stories: {
    width: 408,
    marginTop: 10,
    flexDirection: 'row'
  },
  frameParent: {
    alignItems: 'center'
  },
  placeholderIcon: {
    width: 60,
    height: 60,
    overflow: 'hidden'
  },
  image: {
    backgroundColor: Color.secundario,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  placeholderIcon1: {
    width: 120,
    height: 120,
    overflow: 'hidden'
  },
  image1: {
    borderRadius: Border.br_5xl,
    width: 271,
    height: 330
  },
  image2: {
    height: 290,
    width: 263,
    borderRadius: Border.br_base
  },
  imageSlide: {
    paddingVertical: Padding.p_5xl,
    width: 428,
    paddingHorizontal: 0,
    backgroundColor: Color.white,
    justifyContent: 'center'
  },
  votacinDeRetos: {
    fontSize: FontSize.size_5xl,
    textAlign: 'left',
    fontWeight: '700'
  },
  deslizaHaciaLa: {
    fontSize: FontSize.size_lg,
    lineHeight: 22,
    fontWeight: '500',
    width: 388,
    textAlign: 'center',
    letterSpacing: 0,
    color: Color.secundario,
    marginTop: 20
  },
  votacinDeRetosParent: {
    width: 388,
    alignItems: 'center'
  },
  button: {
    width: 160,
    borderWidth: 1.5,
    borderColor: Color.colorKhaki_100,
    borderStyle: 'solid',
    paddingVertical: Padding.p_sm,
    paddingHorizontal: Padding.p_5xl,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.white,
    height: 60
  },
  button1: {
    width: 204,
    borderWidth: 1.5,
    borderColor: Color.colorKhaki_100,
    borderStyle: 'solid',
    paddingVertical: Padding.p_sm,
    paddingHorizontal: Padding.p_5xl,
    borderRadius: Border.br_11xl,
    backgroundColor: Color.white,
    marginLeft: 20,
    height: 60
  },
  buttonParent: {
    flexDirection: 'row'
  },
  signIn2: {
    color: Color.white
  },
  pressable: {
    backgroundColor: Color.linearBoton,
    paddingVertical: Padding.p_sm,
    paddingHorizontal: Padding.p_5xl,
    borderRadius: Border.br_11xl,
    width: '100%'
  },
  button2: {
    marginTop: 15,
    borderRadius: 30,
    height: 60
    // width: 388
  },
  frameParent1: {
    marginTop: 15
  },
  frameView: {
    marginTop: -12
  },
  imageSlideParent: {
    // height: 613,
    marginTop: 14,
    alignItems: 'center'
    // backgroundColor: 'red'
  },
  navigationIcon: {
    height: 105,
    width: 428
  },
  votacionDeRetos: {
    borderRadius: Border.br_31xl,
    // height: 926,
    paddingVertical: Padding.p_xl,
    // overflow: 'hidden',
    width: '100%',
    height: '100%',
    // flex: 1,
    paddingHorizontal: 0,
    backgroundColor: Color.white,
    top: 15
  }
})

export default VotacionDeRetos
