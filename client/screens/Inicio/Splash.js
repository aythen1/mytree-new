import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import {
  FontSize,
  Color,
  FontFamily,
  Padding,
  Border
} from '../../GlobalStyles'
// import { GoogleSigninSingleton,GoogleSigninButton } from '@react-native-google-signin/google-signin'
const Splash = () => {
  const navigation = useNavigation()

  return (
    <ImageBackground
    resizeMode='stretch'
      style={{ flex: 1, justifyContent: 'flex-end',height:"100%",width:"100%",}}
      source={require('../../assets/splashfondo.png')}
    >

      {/* ====================== THIS ==================== */}

      <View style={styles.image6Parent}>
        <Image
          style={styles.image6Icon}
          contentFit="cover"
          source={require('../../assets/image-612.png')}
        />
        <View style={{gap:30}}>
          <Text style={styles.interactaConTus}>{`Interactúa con tus
generaciones`}</Text>
          <Text
            style={[styles.tuHistoriaComienza, styles.oTypo]}
          >{`Tu historia comienza aquí, dejando una huella en el corazón de tu familia
`}</Text>
        </View>

        <View style={{ marginTop: "5%" }}>
          <View
            style={[styles.iniciarSesion, styles.buttonSpaceBlock]}
            locations={[0, 1]}
            colors={['#dee274', '#7ec18c']}
          >
            <TouchableOpacity onPress={() => navigation.navigate('LOGIN')}>
              <Text style={styles.signTypo}>INICIAR SESIÓN</Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              marginTop: 20,
              borderRadius: Border.br_11xl,
              height: 20,
              width: 222,
              fontWeight: '600',
              lineHeight: 21,
              letterSpacing: 0,
              fontSize: FontSize.size_sm,
              textAlign: 'center',
              fontFamily: FontFamily.lato,
              color: '#000',
              alignSelf: 'center'
            }}
          >
            O
          </Text>
          <TouchableOpacity
           
            onPress={() => navigation.navigate('Register')}
          >
          <LinearGradient
            style={[styles.button1, styles.buttonLayout]}
            locations={[0, 1]}
            colors={['#dee274', '#7ec18c']}
          >
              <ImageBackground style={{width:"100%",height:"100%",alignItems:"center",justifyContent:"center"}} source={require('../../assets/ButtonF.png')}>
              <Text style={styles.signIn1}>REGISTRARSE</Text>
              </ImageBackground>
          </LinearGradient>
            </TouchableOpacity>
        </View>
      </View>
 </ImageBackground>
  )
}

const styles = StyleSheet.create({
  splashLayout: {
    height: Dimensions.get('screen').height,
    width: '100%',
    left: -9
  },
  splashChildLayout: {
    height: 347,
    width: 231,
    position: 'absolute'
  },
  oTypo: {
    fontSize: FontSize.size_sm,
    // marginTop: 20,
    textAlign: 'center',
    color: Color.negro,
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 20
  },
  frameChildLayout: {
    height: 40,
    width: 40
  },
  buttonBorder: {
    borderWidth: 1,
    borderStyle: 'solid'
  },
  devicongooglePosition: {
    zIndex: 1,
    position: 'absolute',
    overflow: 'hidden'
  },
  buttonSpaceBlock: {
    paddingBottom: Padding.p_5xs,
    paddingTop: Padding.p_6xs,
    paddingHorizontal: Padding.p_base,
    justifyContent: 'center',
    borderRadius: Border.br_11xl,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonLayout: {
    height: 52,
    width: 222
  },
  signTypo: {
    fontWeight: '600',
    lineHeight: 21,
    letterSpacing: 0,
    fontSize: FontSize.size_sm,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    color: Color.primario1
  },
  splashChild: {
    width: '100%',
    // position: 'absolute',
    height: '100%'
  },
  splashItem: {
    top: 529,
    left: -94,
    width: 387,
    height: 225,
    position: 'absolute'
  },
  splashInner: {
    opacity: 0
  },
  vectorIcon: {
    top: 635,
    position: 'absolute'
  },
  splashChild1: {
    top: 657,
    position: 'absolute'
  },
  splashChild2: {
    left: -65,
    top: -195,
    height: 347,
    width: 231,
    zIndex: 100
  },
  splashChild3: {
    left: -46,
    top: -195,
    height: 347,
    width: 231,
    zIndex: 100
  },
  splashChild4: {
    top: -207,
    left: -84,
    zIndex: 100
  },
  splashChild5: {
    top: -124,
    left: 64,
    width: 620,
    height: 626,
    position: 'absolute'
  },
  mytree: {
    marginLeft: -52,
    top: 152,
    left: '50%',
    fontSize: FontSize.size_13xl,
    color: Color.primary,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 20,
    position: 'absolute'
  },
  image6Icon: {
    width: 195,
    height: 123,
    marginBottom:40
  },
  interactaConTus: {
    fontSize: FontSize.size_5xl,
    lineHeight: 24,
    textAlign: 'center',
    color: Color.negro,
    fontFamily: FontFamily.lato,
    fontWeight: '500'
  },
  tuHistoriaComienza: {
    width: 315
    // marginTop: 120
  },

  frameChild: {
    borderRadius: Border.br_31xl,
    borderColor: Color.primario2,
    zIndex: 0,
    height: 40,
    width: 40
  },
  fontistofacebookIcon: {
    top: 12,
    left: 16,
    width: 8,
    height: 17
  },
  rectangleParent: {
    justifyContent: 'space-between'
  },
  devicongoogle: {
    top: 11,
    left: 11,
    width: 18,
    height: 18
  },
  frameParent: {
    width: 100,
    height: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 60
  },
  button: {
    borderColor: Color.primario1,
    height: 52,
    width: 222,
    borderWidth: 1,
    borderStyle: 'solid'
  },
  o: {
    marginTop: 20
  },
  signIn1: {
    color: Color.white,
    fontWeight: '600',
    lineHeight: 21,
    letterSpacing: 0,
    fontSize: FontSize.size_sm,
    textAlign: 'center',
    fontFamily: FontFamily.lato
  },
  pressable: {
    height: '100%',
    backgroundColor: Color.linearBoton,
    width: '100%',
    paddingBottom: Padding.p_5xs,
    paddingTop: Padding.p_6xs,
    paddingHorizontal: Padding.p_base,
    justifyContent: 'center',
    borderRadius: Border.br_11xl
  },
  button1: {
    marginTop: 20,
    borderRadius: Border.br_11xl
  },
  image6Parent: {
    // width: '100%',
    height:"100%",
    alignItems:"center",
    justifyContent:"center",
    width:"100%"
  },
  splash: {
    borderRadius: Border.br_21xl,
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: Color.white
  },
  iniciarSesion: {
    borderColor: Color.primario1,
    height: 52,
    width: 222,
    borderWidth: 1,
    borderStyle: 'solid'
  }
})

export default Splash
