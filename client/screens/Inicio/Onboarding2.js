import React, { useEffect } from 'react'
import { Image } from 'expo-image'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { FontFamily, Border, FontSize, Color } from '../../GlobalStyles'
import { useNavigation } from '@react-navigation/native'
import ImageVectorSVG from '../../components/svgs/ImageVectorSVG'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Onboarding2 = () => {
  const navigation = useNavigation()

  useEffect(() => {
    verificarUsuarioLogueado()
  }, [])

  const verificarUsuarioLogueado = async () => {
    try {
      // Verifica si el usuario está logueado
      const usuarioLogueado = await AsyncStorage.getItem('user')

      // Navega a la pantalla adecuada
      if (usuarioLogueado) {
        console.log(usuarioLogueado?.newUser, 'logeadoooo')
        // Usuario logueado, navega a la pantalla de inicio
        if (usuarioLogueado) {
          navigation.navigate('Perfil')
        }
        navigation.replace('Muro')
      } else {
        // Usuario no logueado, navega a la pantalla de registro
      }
    } catch (error) {
      console.log('Error al verificar usuario logueado: ', error)
    }
  }

  return (
    <View style={styles.onboarding3}>
      <Image
        style={styles.onboarding1Icon}
        contentFit="cover"
        source={require('../../assets/onboarding-1.png')}
      />
      <View style={[styles.huellaParent, styles.huellaParentFlexBox]}>
        <View style={styles.dejaTuHuellaEnElMundoMieParent}>
          <Text style={[styles.huella, styles.huellaTypo]}>Legado</Text>
          <View style={styles.imageVector}>
            <ImageVectorSVG />
          </View>
          <View style={styles.secondContainer}>
            <Text style={[styles.dejaTuHuella, styles.huellaTypo]}>
              Junta la historia de tu familia y deja un legado para tus
              descendientes
            </Text>
            <View style={styles.frameWrapper}>
              <View style={styles.rectangleParent}>
                <View style={styles.frameChild} />
                <View style={[styles.frameItem, styles.frameLayout]} />
                <View style={[styles.frameInner, styles.frameLayout]} />
              </View>
            </View>
            <Pressable
              style={styles.progressButton}
              onPress={() => navigation.navigate('Onboarding1')}
            >
              <View
                style={[styles.buttonfullcircle, styles.huellaParentFlexBox]}
              >
                <Image
                  style={styles.arrowRight}
                  contentFit="cover"
                  source={require('../../assets/arrow--right.png')}
                />
              </View>
              <Image
                style={[styles.progressButtonChild, styles.progressPosition]}
                contentFit="cover"
                source={require('../../assets/ellipse-190.png')}
              />
              <Image
                style={[styles.progressButtonItem, styles.progressPosition]}
                contentFit="cover"
                source={require('../../assets/ellipse-192.png')}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  huellaParentFlexBox: {
    justifyContent: 'center',
    position: 'absolute',
    alignItems: 'center'
  },
  huellaTypo: {
    fontFamily: FontFamily.lato,
    lineHeight: 35
  },
  frameLayout: {
    marginLeft: 7,
    height: 6
  },
  progressPosition: {
    right: '0%',
    top: '0%',
    position: 'absolute',
    overflow: 'hidden'
  },
  onboarding1Icon: {
    width: 428,
    zIndex: 0,
    overflow: 'hidden'
  },
  huella: {
    fontSize: FontSize.size_13xl,
    letterSpacing: 1.3,
    fontWeight: '700',
    color: Color.white,
    textAlign: 'left'
  },
  dejaTuHuella: {
    fontSize: FontSize.size_7xl,
    fontWeight: '500',
    color: Color.white,
    textAlign: 'center',
    width: 311
  },
  frameChild: {
    height: 6,
    borderRadius: Border.br_3xs,
    width: 34,
    backgroundColor: Color.white
  },
  frameItem: {
    width: 8,
    backgroundColor: Color.colorGray_400,
    marginLeft: 7
  },
  frameInner: {
    backgroundColor: Color.colorGray_400,
    width: 8
  },
  rectangleParent: {
    flexDirection: 'row'
  },
  frameWrapper: {
    marginTop: 30,
    flexDirection: 'row'
  },
  arrowRight: {
    width: 24,
    height: 24,
    overflow: 'hidden'
  },
  buttonfullcircle: {
    height: '65.96%',
    width: '65.96%',
    top: '17.02%',
    left: '17.02%',
    borderRadius: Border.br_31xl,
    backgroundColor: Color.negro,
    flexDirection: 'row',
    zIndex: 10
  },
  progressButtonChild: {
    bottom: '0%',
    left: '0%',
    opacity: 0.38,
    width: '100%'
  },
  progressButtonItem: {
    height: '50%',
    width: '50%',
    bottom: '50%',
    left: '50%'
  },
  progressButton: {
    width: 94,
    height: 94,
    marginTop: 30
  },
  dejaTuHuellaEnElMundoMieParent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  huellaParent: {
    marginLeft: -194,
    paddingVertical: 50,
    top: 20,
    bottom: 20,
    width: 388,
    backgroundColor: Color.linearBoton,
    zIndex: 1,
    left: '50%',
    borderRadius: Border.br_31xl
  },
  onboarding3: {
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },
  secondContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: '10%'
  },
  imageVector: {
    marginTop: '10%'
  }
})

export default Onboarding2
