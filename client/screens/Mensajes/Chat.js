import React from 'react'
import { Image } from 'expo-image'
import { StyleSheet, Pressable, View, Text, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import {
  FontFamily,
  Padding,
  Color,
  Border,
  FontSize
} from '../../GlobalStyles'
import MessagesFromContact from '../../components/MessagesFromContact'

const Chat = () => {
  const navigation = useNavigation()

  return (
    <View style={[styles.chat, styles.chatLayout]}>
      <Pressable
        style={styles.back}
        onPress={() => navigation.navigate('MENSAJERA')}
      >
        <Image
          style={[styles.icon, styles.chatLayout]}
          contentFit="cover"
          source={require('../../assets/back4.png')}
        />
      </Pressable>
      <View style={styles.frameParent}>
        <View style={styles.unsplashilip77sbmoeParent}>
          <Image
            style={styles.unsplashilip77sbmoeIcon}
            contentFit="cover"
            source={require('../../assets/unsplashilip77sbmoe.png')}
          />
          <Image
            style={[styles.vectorIcon, styles.vectorPosition]}
            contentFit="cover"
            source={require('../../assets/vector15.png')}
          />
        </View>
        <View style={styles.frameGroup}>
          <View style={styles.frameWrapperFlexBox}>
            <View>
              <Text style={[styles.brunoPham, styles.brunoPhamTypo]}>
                Bruno Pham
              </Text>
              <Text style={[styles.hace2Minutos, styles.brunoPhamTypo]}>
                hace 2 minutos
              </Text>
            </View>
          </View>
          <View style={styles.callParent}>
            <Image
              style={[styles.callIcon, styles.iconLayout]}
              contentFit="cover"
              source={require('../../assets/call.png')}
            />
            <Image
              style={[styles.videoIcon, styles.iconLayout]}
              contentFit="cover"
              source={require('../../assets/video1.png')}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: Color.secundario,
          marginVertical: 15
        }}
      />

      <View style={[styles.rectangleParent, styles.parentFlexBox]}>
        <TextInput style={styles.frameChild} />
        <LinearGradient
          style={[styles.button, styles.parentFlexBox]}
          locations={[0, 1]}
          colors={['#dee274', '#7ec18c']}
        >
          <Image
            style={styles.sendIcon}
            contentFit="cover"
            source={require('../../assets/send.png')}
          />
        </LinearGradient>
      </View>

      <Text style={[styles.hoy]}>Hoy</Text>

      <MessagesFromContact />
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
    borderRadius: Border.br_3xs,
    width: 318,
    height: 52,
    backgroundColor: Color.fAFAFA
  },
  sendIcon: {
    width: 22,
    height: 22,
    overflow: 'hidden'
  },
  button: {
    borderRadius: 32,
    width: 50,
    justifyContent: 'space-between',
    padding: Padding.p_base,
    backgroundColor: Color.linearBoton,
    height: 52,
    marginLeft: 20
  },
  rectangleParent: {
    // top: 600,
    // left: 20,
    position: 'absolute',
    bottom: 20
  },
  holaPrimaCmoContainer: {
    color: Color.negro,
    textAlign: 'left',
    lineHeight: 21,
    fontSize: FontSize.size_sm
  },
  holaPrimaCmoEstsSiiWrapper: {
    top: 123
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
    top: 10,
    zIndex: 1,
    position: 'absolute',
    left: 20
  },
  rectangleGroup: {
    top: 41,
    left: 91,
    position: 'absolute'
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
    // marginLeft: -13,
    // top: 0,
    marginTop: 15,
    color: Color.primario2,
    lineHeight: 21,
    fontSize: 20,
    width: '100%',
    textAlign: 'center'
    // left: '50%',
    // position: 'absolute'
  },
  frameContainer: {
    top: 104,
    width: 388,
    height: 377,
    left: 20,
    position: 'absolute'
  },
  navigationIcon: {
    top: 821,
    width: 428,
    height: 105
  },
  chat: {
    // borderRadius: Border.br_31xl,
    backgroundColor: Color.white,
    flex: 1,
    height: 926,
    overflow: 'hidden'
  }
})

export default Chat
