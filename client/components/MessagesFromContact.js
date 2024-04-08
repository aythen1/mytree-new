import React from 'react'
import { Image } from 'expo-image'
import { StyleSheet, Pressable, View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { FontFamily, Padding, Color, Border, FontSize } from '../GlobalStyles'

const MessagesFromContact = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.frameContainer}>
      <View style={[styles.holaPrimaCmoEstsSiiWrapper, styles.wrapperPosition]}>
        <Text style={[styles.holaPrimaCmoContainer, styles.holaContainerTypo]}>
          Hola prima!!! Cómo estás?Sii, pero llegaremos un poco más tarde
        </Text>
      </View>
      <View style={[styles.wrapper, styles.wrapperPosition]}>
        <Text style={[styles.text, styles.holaContainerTypo]}>👍</Text>
      </View>
      <View style={styles.rectangleGroup}>
        <View style={[styles.frameItem, styles.framePosition]} />
        <View style={[styles.vectorParent, styles.frameWrapperFlexBox]}>
          <Image
            style={styles.vectorIcon1}
            contentFit="cover"
            source={require('../assets/vector16.png')}
          />
          <Text
            style={[styles.holaPrimoCmoContainer, styles.holaContainerTypo]}
          >
            Hola primo!!! Cómo estás?Van a la casa de la abuela esta noche?
          </Text>
        </View>
      </View>
      <View style={[styles.rectangleContainer, styles.frameInnerLayout]}>
        <View style={[styles.frameInner, styles.frameInnerLayout]} />
        <View style={[styles.vectorParent, styles.frameWrapperFlexBox]}>
          <Image
            style={styles.vectorIcon1}
            contentFit="cover"
            source={require('../assets/vector16.png')}
          />
          <Text
            style={[styles.holaPrimoCmoContainer, styles.holaContainerTypo]}
          >
            Perfecto, nos vemos!
          </Text>
        </View>
      </View>
      <View style={styles.frameView}>
        <View style={[styles.rectangleView, styles.framePosition]} />
        <View style={[styles.vectorParent, styles.frameWrapperFlexBox]}>
          <Image
            style={styles.vectorIcon1}
            contentFit="cover"
            source={require('../assets/vector16.png')}
          />
          <Text
            style={[styles.holaPrimoCmoContainer, styles.holaContainerTypo]}
          >
            No olviden llevar bebida!!
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  chatLayout: {
    width: '100%',
    overflow: 'hidden'
  },
  parentFlexBox: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  vectorPosition: {
    zIndex: 1,
    position: 'absolute'
  },
  brunoPhamTypo: {
    textAlign: 'justify',
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  iconLayout: {
    height: 20,
    overflow: 'hidden'
  },
  chatChildPosition: {
    left: 0,
    position: 'absolute'
  },
  wrapperPosition: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_xl,
    backgroundColor: Color.secundario,
    borderBottomRightRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    overflow: 'hidden'
  },
  holaContainerTypo: {
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  framePosition: {
    borderBottomLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA,
    zIndex: 0
  },
  frameWrapperFlexBox: {
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  frameInnerLayout: {
    width: 196,
    height: 41
  },
  icon: {
    height: '100%',
    overflow: 'hidden'
  },
  back: {
    width: 24,
    height: 24
  },
  unsplashilip77sbmoeIcon: {
    width: 44,
    height: 44,
    zIndex: 0
  },
  vectorIcon: {
    marginTop: -8,
    marginLeft: -10,
    top: '50%',
    height: 15,
    width: 20,
    left: '50%'
  },
  unsplashilip77sbmoeParent: {
    flexDirection: 'row'
  },
  brunoPham: {
    fontSize: FontSize.size_base,
    lineHeight: 19,
    fontWeight: '700',
    color: Color.primario1
  },
  hace2Minutos: {
    fontSize: FontSize.size_xs,
    lineHeight: 18,
    fontWeight: '300',
    color: Color.textPlaceholder,
    marginTop: 4
  },
  callIcon: {
    width: 20
  },
  videoIcon: {
    width: 30,
    marginLeft: 20
  },
  callParent: {
    marginLeft: 122,
    flexDirection: 'row'
  },
  frameGroup: {
    justifyContent: 'center',
    marginLeft: 20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  frameParent: {
    marginTop: 30,
    marginLeft: 20,
    flexDirection: 'row'
  },
  backParent: {
    top: 30
    // left: 20,
    // position: 'absolute'
  },
  chatChild: {
    top: 84,
    borderStyle: 'solid',
    borderColor: Color.secundario,
    borderTopWidth: 1,
    width: 429,
    height: 1
  },
  frameChild: {
    // borderRadius: Border.br_3xs,
    width: '100%',
    height: 52,
    backgroundColor: Color.fAFAFA
  },
  sendIcon: {
    width: 22,
    height: 22,
    overflow: 'hidden'
  },
  button: {
    // borderRadius: 32,
    width: 50,
    justifyContent: 'space-between',
    padding: Padding.p_base,
    backgroundColor: Color.linearBoton,
    height: 52,
    marginLeft: 20
  },
  rectangleParent: {
    top: 749,
    left: 20,
    position: 'absolute'
  },
  holaPrimaCmoContainer: {
    color: Color.negro,
    textAlign: 'left',
    lineHeight: 21,
    fontSize: FontSize.size_sm
  },
  holaPrimaCmoEstsSiiWrapper: {
    top: 80
  },
  text: {
    fontSize: FontSize.size_xl,
    lineHeight: 30,
    color: Color.negro,
    textAlign: 'left'
  },
  wrapper: {
    top: 327
  },
  frameItem: {
    width: 297,
    height: 62
  },
  vectorIcon1: {
    width: 19,
    height: 11
  },
  holaPrimoCmoContainer: {
    marginLeft: 11,
    color: Color.negro,
    textAlign: 'left',
    lineHeight: 21,
    fontSize: FontSize.size_sm
  },
  vectorParent: {
    zIndex: 1,
    position: 'absolute',
    left: 20
  },
  rectangleGroup: {
    paddingHorizontal: 8
    // top: 41
    // left: 91,
    // position: 'absolute'
  },
  frameInner: {
    height: 41,
    borderBottomLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA,
    zIndex: 0
  },
  rectangleContainer: {
    top: 205,
    left: 192,
    height: 41,
    position: 'absolute'
  },
  rectangleView: {
    width: 223,
    height: 41
  },
  frameView: {
    top: 266,
    left: 165,
    height: 41,
    position: 'absolute'
  },
  hoy: {
    marginTop: 15,
    color: Color.primario2,
    lineHeight: 21,
    fontSize: 20,
    width: '100%',
    textAlign: 'center'
  },
  frameContainer: {
    paddingHorizontal: 10,
    marginTop: 30,
    width: '100%',
    height: '100%'
  }
})

export default MessagesFromContact
