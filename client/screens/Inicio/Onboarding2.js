import React, { useEffect, useState } from 'react'
import { Image, ImageBackground } from 'expo-image'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { FontFamily, Border, FontSize, Color } from '../../GlobalStyles'
import { useNavigation } from '@react-navigation/native'
import ImageVectorSVG from '../../components/svgs/ImageVectorSVG'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { getAllUsers, getUserData } from '../../redux/actions/user'
import BtnProgres from '../../components/svgs/BtnProgres'

const Onboarding2 = () => {
  const navigation = useNavigation()
  const [step, setStep] = useState(1)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
    verificarUsuarioLogueado()
  }, [])

  const verificarUsuarioLogueado = async () => {
    try {
      // Verifica si el usuario está logueado
      const usuarioLogueado = await AsyncStorage.getItem('user')

      // Navega a la pantalla adecuada
      if (usuarioLogueado) {
        console.log(JSON.parse(usuarioLogueado).id, 'logeadoooo')
        // Usuario logueado, navega a la pantalla de inicio
        if (usuarioLogueado?.newUser) {
          dispatch(getUserData(JSON.parse(usuarioLogueado).id)).then((e) =>
            navigation.navigate('Perfil')

        )
        }
        dispatch(getUserData(JSON.parse(usuarioLogueado).id)).then((e) =>
          navigation.replace('Muro')
        )
      }
    } catch (error) {
      console.log('Error al verificar usuario logueado: ', error)
    }
  }

  const handleNext = () => {
    if (step == 3) {
      navigation.navigate('Splash')
    } else {
      setStep((e) => e + 1)
    }
  }

  const Step1 = () => (
    <View style={styles.secondContainer}>
      <Text style={[styles.dejaTuHuella, styles.huellaTypo]}>
        Junta la historia de tu familia y deja un legado para tus descendientes
      </Text>
      <View style={styles.frameWrapper}>
        <View style={styles.rectangleParent}>
          <View style={styles.frameChild} />
          <View style={[styles.frameItem, styles.frameLayout]} />
          <View style={[styles.frameInner, styles.frameLayout]} />
        </View>
      </View>
    </View>
  )

  const Step2 = () => (
    <View style={styles.secondContainer}>
      <Text style={[styles.dejaTuHuella, styles.huellaTypo]}>
        Un tesoro de recuerdos para compartir con futuras generaciones
      </Text>
      <View style={styles.frameWrapper}>
        <View style={styles.rectangleParent}>
          <View style={styles.frameItem} />
          <View style={styles.frameChild} />
          <View style={[styles.frameInner, styles.frameLayout]} />
        </View>
      </View>
    </View>
  )

  const Step3 = () => (
    <View style={styles.secondContainer}>
      <Text style={[styles.dejaTuHuella, styles.huellaTypo]}>
        Deja tu huella en el mundo mientras construyes tu legado
      </Text>
      <View style={styles.frameWrapper}>
        <View style={styles.rectangleParent}>
          <View style={[styles.frameItem, styles.frameLayout]} />
          <View style={[styles.frameInner, styles.frameLayout]} />
          <View style={styles.frameChild} />
        </View>
      </View>
    </View>
  )

  return (
    <ImageBackground
      style={styles.onboarding1Icon}
      contentFit="fill"
      source={require('../../assets/onbord.png')}
    >
      <Text style={[styles.huella, styles.huellaTypo]}>Legado</Text>
      <View style={{ position: 'absolute', top: '40%' }}>
        <ImageVectorSVG />
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 20,
          alignItems: 'center',
          width: '100%'
        }}
      >
        {(step == 1 && <Step1></Step1>) ||
          (step == 2 && <Step2></Step2>) ||
          (step == 3 && <Step3></Step3>)}
        <Pressable
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15
          }}
          onPress={handleNext}
        >
          <BtnProgres progress={step}></BtnProgres>
          <View style={[styles.buttonfullcircle, styles.huellaParentFlexBox]}>
            <Image
              style={styles.arrowRight}
              contentFit="cover"
              source={require('../../assets/arrow--right.png')}
            />
          </View>
        </Pressable>
        {/* <Pressable
          style={styles.progressButton}
          onPress={handleNext}
        > */}
        {/* {step == 2 && (
            <>
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
                source={require('../../assets/progres2.png')}
              />
            </>
          )}
          {step == 1 && (
            <>
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
            </>
          )}
          {step == 3 && (
            <>
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
                source={require('../../assets/progres4.png')}
              />
            </>
          )} */}
        {/* </Pressable> */}
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  huellaParentFlexBox: {
    position: 'absolute',
    alignItems: 'center'
  },
  huellaTypo: {
    fontFamily: FontFamily.lato,
    lineHeight: 35
  },
  frameLayout: {
    marginHorizontal: 3,
    height: 6
  },
  progressPosition: {
    right: '0%',
    top: '0%',
    position: 'absolute',
    overflow: 'hidden'
  },
  onboarding1Icon: {
    width: '100%',
    height: '100%',
    paddingVertical: 50,
    alignItems: 'center'
  },
  huella: {
    fontSize: FontSize.size_13xl,
    letterSpacing: 1.3,
    fontWeight: '700',
    color: Color.white,
    textAlign: 'center'
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
    marginHorizontal: 4,
    backgroundColor: Color.white
  },
  frameItem: {
    width: 8,
    backgroundColor: Color.colorGray_400,
    borderRadius: 9
  },
  frameInner: {
    backgroundColor: Color.colorGray_400,
    width: 8,
    borderRadius: 9
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
    overflow: 'hidden',
    position: 'absolute',
    left: '30%'
  },
  buttonfullcircle: {
    height: 60,
    width: 60,

    borderRadius: Border.br_31xl,
    backgroundColor: Color.negro,
    flexDirection: 'row',
    zIndex: 10
  },
  progressButtonChild: {
    bottom: '0%',
    left: '0%',
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
    marginTop: 30,
    alignSelf: 'center'
  },
  dejaTuHuellaEnElMundoMieParent: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center'
  },
  huellaParent: {
    width: '100%',
    height: '90%',
    justifyContent: 'space-around',
    flexDirection: 'column',
    zIndex: 1
  },
  onboarding3: {
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },
  secondContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageVector: {}
})

export default Onboarding2
