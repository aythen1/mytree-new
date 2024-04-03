import React, { useState, useCallback } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  Modal,
  ScrollView
} from 'react-native'
import { Image } from 'expo-image'
import Padres from '../components/Padres'
import SexoInfante from '../components/SexoInfante'
import AadirPregunta from '../components/AadirPregunta'
import CONDOLENCIAS from '../components/CONDOLENCIAS'
import { useNavigation } from '@react-navigation/native'
import { FontFamily, FontSize, Color, Border } from '../GlobalStyles'
import PopUpCalendario from '../components/PopUpCalendario'

const PERFILINFANTEAJUSTES = () => {
  const [frameContainer3Visible, setFrameContainer3Visible] = useState(false)
  const [frameContainer5Visible, setFrameContainer5Visible] = useState(false)
  const [frameContainer9Visible, setFrameContainer9Visible] = useState(false)
  const [frameContainer11Visible, setFrameContainer11Visible] = useState(false)
  const [vectorIcon12Visible, setVectorIcon12Visible] = useState(false)
  const [frameContainer35Visible, setFrameContainer35Visible] = useState(false)
  const [parents, setParents] = useState('Escoge una opcion')
  const [sex, setSex] = useState('Escoge una opcion')
  const navigation = useNavigation()

  const openFrameContainer3 = useCallback(() => {
    setFrameContainer3Visible(true)
  }, [])

  const closeFrameContainer3 = useCallback(() => {
    setFrameContainer3Visible(false)
  }, [])

  const openFrameContainer5 = useCallback(() => {
    setFrameContainer5Visible(true)
  }, [])

  const closeFrameContainer5 = useCallback(() => {
    setFrameContainer5Visible(false)
  }, [])

  const openFrameContainer9 = useCallback(() => {
    setFrameContainer9Visible(true)
  }, [])

  const closeFrameContainer9 = useCallback(() => {
    setFrameContainer9Visible(false)
  }, [])

  const openFrameContainer11 = useCallback(() => {
    setFrameContainer11Visible(true)
  }, [])

  const closeFrameContainer11 = useCallback(() => {
    setFrameContainer11Visible(false)
  }, [])

  // const openVectorIcon12 = useCallback(() => {
  //   setVectorIcon12Visible(true)
  // }, [])

  const closeVectorIcon12 = useCallback(() => {
    setVectorIcon12Visible(false)
  }, [])

  // const openFrameContainer35 = useCallback(() => {
  //   setFrameContainer35Visible(true)
  // }, [])

  const closeFrameContainer35 = useCallback(() => {
    setFrameContainer35Visible(false)
  }, [])

  return (
    <>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.perfilInfanteAjustes}>
          <Image
            style={styles.image6Icon}
            contentFit="cover"
            source={require('../assets/image-6.png')}
          />
          <View style={{ flexDirection: 'row' }}>
            <Pressable
              // style={[styles.back, styles.backPosition]}
              onPress={() => navigation.navigate('PERFILIDINFANTE')}
            >
              <Image
                style={[styles.icon1, styles.iconLayout]}
                contentFit="cover"
                source={require('../assets/back5.png')}
              />
            </Pressable>
            <Text style={styles.ajustesDelInfante}>Ajustes del infante</Text>
          </View>

          <View style={styles.nacimientoParent}>
            <Text style={[styles.embarazoTypo, styles.section]}>
              Nacimiento
            </Text>
            <View style={styles.frameParent}>
              <Pressable
                style={styles.frameParentFlexBox}
                onPress={openFrameContainer3}
              >
                <View>
                  <Text
                    style={[styles.ltimoPerodoNatural, styles.embarazoTypo]}
                  >
                    Último período natural
                  </Text>
                  <Text style={styles.das}>280 días</Text>
                </View>
                <Image
                  style={styles.vectorIcon}
                  contentFit="cover"
                  source={require('../assets/vector47.png')}
                />
              </Pressable>
            </View>

            <Pressable
              style={[styles.frameParent, styles.frameParentFlexBox]}
              onPress={openFrameContainer3}
            >
              <View style={styles.ltimoPerodoNaturalParent}>
                <Text style={[styles.ltimoPerodoNatural, styles.embarazoTypo]}>
                  Fecha estimada
                </Text>
                <Text style={styles.das}>14 de enero de 2024</Text>
              </View>
              <Image
                style={styles.vectorIcon}
                contentFit="cover"
                source={require('../assets/vector47.png')}
              />
            </Pressable>
            <Pressable
              style={[styles.frameParent, styles.frameParentFlexBox]}
              onPress={openFrameContainer5}
            >
              <View style={styles.ltimoPerodoNaturalParent}>
                <Text style={[styles.ltimoPerodoNatural, styles.embarazoTypo]}>
                  Fecha y hora de nacimiento
                </Text>
                <Text style={styles.das}>14 de enero de 2024, 14:30hs</Text>
              </View>
              <Image
                style={styles.vectorIcon}
                contentFit="cover"
                source={require('../assets/vector47.png')}
              />
            </Pressable>
            <Pressable style={[styles.frameParent, styles.frameParentFlexBox]}>
              <View style={[styles.frameParent, styles.frameParentFlexBox]}>
                <View style={styles.ltimoPerodoNaturalParent}>
                  <Text
                    style={[styles.ltimoPerodoNatural, styles.embarazoTypo]}
                  >
                    Foto de perfil
                  </Text>
                </View>
                <Image
                  style={styles.vectorIcon}
                  contentFit="cover"
                  source={require('../assets/vector46.png')}
                />
              </View>
            </Pressable>

            <View
              style={{
                borderWidth: 1,
                borderColor: Color.grisClaro,
                marginVertical: 20
              }}
            />

            <Text style={[styles.embarazoTypo, styles.section]}>Embarazo</Text>

            <Pressable
              style={[styles.frameParent, styles.frameParentFlexBox]}
              onPress={openFrameContainer9}
            >
              <View style={styles.ltimoPerodoNaturalParent}>
                <Text style={[styles.ltimoPerodoNatural, styles.embarazoTypo]}>
                  Padres
                </Text>
                <Text style={styles.das}>{parents}</Text>
              </View>
              <Image
                style={styles.vectorIcon}
                contentFit="cover"
                source={require('../assets/vector47.png')}
              />
            </Pressable>
            <Pressable
              style={[styles.frameParent, styles.frameParentFlexBox]}
              onPress={openFrameContainer11}
            >
              <View style={styles.ltimoPerodoNaturalParent}>
                <Text style={[styles.ltimoPerodoNatural, styles.embarazoTypo]}>
                  Sexo
                </Text>
                <Text style={styles.das}>{sex}</Text>
              </View>
              <Image
                style={styles.vectorIcon}
                contentFit="cover"
                source={require('../assets/vector47.png')}
              />
            </Pressable>
            <Image
              style={[styles.frameItem, styles.frameLayout]}
              contentFit="cover"
              source={require('../assets/line-802.png')}
            />

            <View
              style={{
                borderWidth: 1,
                borderColor: Color.grisClaro,
                marginVertical: 20
              }}
            />

            <Text style={[styles.embarazoTypo, styles.section]}>
              Información
            </Text>
            <View style={[styles.frameParent, styles.frameParentFlexBox]}>
              <View style={styles.ltimoPerodoNaturalParent}>
                <Text style={[styles.bio, styles.bioTypo]}>Bio</Text>
                <Text style={[styles.holaSoyLucas, styles.hsTypo]}>
                  Hola, soy Lucas, naci el 23 de agosto de 2023 de...
                </Text>
              </View>
              <Image
                style={styles.vectorIcon}
                contentFit="cover"
                source={require('../assets/vector47.png')}
              />
            </View>
            <View style={[styles.frameParent, styles.frameParentFlexBox]}>
              <View style={styles.ltimoPerodoNaturalParent}>
                <Text style={[styles.bio, styles.bioTypo]}>
                  Actualmente tengo
                </Text>
                <Text style={[styles.holaSoyLucas, styles.hsTypo]}>
                  12 meses
                </Text>
              </View>
              <Image
                style={styles.vectorIcon}
                contentFit="cover"
                source={require('../assets/vector47.png')}
              />
            </View>
            <View style={[styles.frameParent4, styles.frameParentFlexBox]}>
              <View style={styles.ltimoPerodoNaturalParent}>
                <Text style={[styles.bio, styles.bioTypo]}>Nací a las</Text>
                <Text style={[styles.hs, styles.hsTypo]}>14:30 hs</Text>
              </View>
              <Image
                style={styles.vectorIcon}
                contentFit="cover"
                source={require('../assets/vector47.png')}
              />
            </View>
            <View style={[styles.frameParent4, styles.frameParentFlexBox]}>
              <View style={styles.ltimoPerodoNaturalParent}>
                <Text style={styles.bioTypo}>Duermo...</Text>
                <Text style={[styles.hs, styles.hsTypo]}>
                  Bien, pero nunc mattis. Mauris feugiat non ...
                </Text>
              </View>
              <Image
                style={styles.vectorIcon}
                contentFit="cover"
                source={require('../assets/vector47.png')}
              />
            </View>
            <View style={[styles.frameParent4, styles.frameParentFlexBox]}>
              <View style={styles.ltimoPerodoNaturalParent}>
                <Text style={styles.bioTypo}>Como...</Text>
                <Text style={[styles.hs, styles.hsTypo]}>
                  rcu nunc mattis. Mauris feugiat non interdum...
                </Text>
              </View>
              <Image
                style={styles.vectorIcon}
                contentFit="cover"
                source={require('../assets/vector47.png')}
              />
            </View>
            <View style={[styles.frameParent4, styles.frameParentFlexBox]}>
              <View style={styles.ltimoPerodoNaturalParent}>
                <Text style={styles.bioTypo}>Mi comida favorita es...</Text>
                <Text style={[styles.hs, styles.hsTypo]}>
                  rcu nunc mattis. Mauris feugiat non interdum...
                </Text>
              </View>
              <Image
                style={styles.vectorIcon}
                contentFit="cover"
                source={require('../assets/vector47.png')}
              />
            </View>
            <View style={[styles.frameParent4, styles.frameParentFlexBox]}>
              <View style={styles.ltimoPerodoNaturalParent}>
                <Text style={styles.bioTypo}>Palabras favoritas...</Text>
                <Text style={[styles.hs, styles.hsTypo]}>
                  rcu nunc mattis. Mauris feugiat non interdum...
                </Text>
              </View>
              <Image
                style={styles.vectorIcon}
                contentFit="cover"
                source={require('../assets/vector47.png')}
              />
            </View>
            <View style={[styles.frameParent4, styles.frameParentFlexBox]}>
              <View style={styles.ltimoPerodoNaturalParent}>
                <Text style={styles.bioTypo}>Canciones favoritas...</Text>
                <Text style={[styles.hs, styles.hsTypo]}>
                  rcu nunc mattis. Mauris feugiat non interdum...
                </Text>
              </View>
              <Image
                style={styles.vectorIcon}
                contentFit="cover"
                source={require('../assets/vector47.png')}
              />
            </View>
          </View>
          <View
            style={[
              styles.perfilInfanteAjustesChild,
              styles.nacimientoParentPosition
            ]}
          />
        </View>
      </ScrollView>

      <Modal animationType="slide" transparent visible={frameContainer3Visible}>
        <View style={styles.frameContainer3Overlay}>
          <Pressable
            style={styles.frameContainer3Bg}
            onPress={closeFrameContainer3}
          />
          <PopUpCalendario
            setCalendario={setFrameContainer3Visible}
            setButtonContainer2Visible={() => {}}
          />
        </View>
      </Modal>

      <Modal animationType="slide" transparent visible={frameContainer5Visible}>
        <View style={styles.frameContainer5Overlay}>
          <Pressable
            style={styles.frameContainer5Bg}
            onPress={closeFrameContainer5}
          />
          <PopUpCalendario
            setCalendario={setFrameContainer3Visible}
            setButtonContainer2Visible={() => {}}
          />
        </View>
      </Modal>

      <Modal animationType="slide" transparent visible={frameContainer9Visible}>
        <View style={styles.frameContainer9Overlay}>
          <Pressable
            style={styles.frameContainer9Bg}
            onPress={closeFrameContainer9}
          />
          <Padres
            setSex={setSex}
            setParents={setParents}
            onClose={closeFrameContainer9}
          />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent
        visible={frameContainer11Visible}
      >
        <View style={styles.frameContainer11Overlay}>
          <Pressable
            style={styles.frameContainer11Bg}
            onPress={closeFrameContainer11}
          />
          <SexoInfante setSex={setSex} onClose={closeFrameContainer11} />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={vectorIcon12Visible}>
        <View style={styles.vectorIcon12Overlay}>
          <Pressable
            style={styles.vectorIcon12Bg}
            onPress={closeVectorIcon12}
          />
          <AadirPregunta onClose={closeVectorIcon12} />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={frameContainer35Visible}>
        <View style={styles.frameContainer35Overlay}>
          <Pressable
            style={styles.frameContainer35Bg}
            onPress={closeFrameContainer35}
          />
          <CONDOLENCIAS onClose={closeFrameContainer35} />
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  frameItemLayout: {
    width: '100%',
    overflow: 'hidden'
  },
  backPosition: {
    left: 20,
    position: 'absolute'
  },
  embarazoTypo: {
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    fontSize: FontSize.size_base,
    letterSpacing: 0
  },
  section: {
    color: Color.secundario
  },
  frameParentFlexBox: {
    // justifyContent: 'flex-end',
    marginTop: 20,
    // paddingHorizontal: 30,
    width: '100%',
    justifyContent: 'space-between',
    // alignItems: 'center',
    flexDirection: 'row'
  },
  frameLayout: {
    maxHeight: '100%',
    marginTop: 20
  },
  bioTypo: {
    color: Color.primario2,
    lineHeight: 24,
    fontWeight: '700',
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  hsTypo: {
    color: Color.grisClaro,
    lineHeight: 24,
    marginTop: 10,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  iconLayout: {
    height: 35,
    width: 35
  },

  ltimoPerodoNatural: {
    color: Color.negro,
    alignSelf: 'stretch'
  },
  das: {
    color: Color.grisGeneral,
    marginTop: 10,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
    // alignSelf: 'stretch'
  },
  ltimoPerodoNaturalParent: {
    // width: '100%'
    // height: '100%'
  },
  vectorIcon: {
    width: 21,
    height: 21
    // marginLeft: 20
  },
  frameParent: {
    marginTop: 20
    // alignSelf: 'stretch'
  },
  frameContainer3Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  frameContainer3Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  frameContainer5Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  frameContainer5Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  frameChild: {
    width: 388
  },
  embarazo: {
    marginTop: 20,
    alignSelf: 'stretch'
  },
  frameContainer9Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  frameContainer9Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  frameContainer11Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  frameContainer11Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  frameItem: {
    maxWidth: '100%',
    alignSelf: 'stretch',
    overflow: 'hidden',
    width: '100%'
  },
  bio: {
    alignSelf: 'stretch'
  },
  holaSoyLucas: {
    alignSelf: 'stretch'
  },
  hs: {
    width: 347
  },
  frameParent4: {
    marginTop: 20
  },
  frameInner: {
    height: 0,
    marginTop: 20,
    width: 388
  },
  vectorIcon12Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  vectorIcon12Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  vector: {
    width: 20,
    height: 20,
    marginLeft: 289
  },
  formularioParent: {
    marginTop: 20,
    flexDirection: 'row',
    width: 388
  },
  frameContainer35Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  frameContainer35Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  vectorIcon17: {
    width: 22,
    height: 22
  },
  interrumpirEmbarazo: {
    fontSize: FontSize.size_lg,
    lineHeight: 22,
    color: Color.primario1,
    marginLeft: 20,
    letterSpacing: 0,
    fontWeight: '700'
  },
  vectorParent: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  nacimientoParent: {
    top: 30,
    marginBottom: 60,
    paddingHorizontal: 15,
    // height: 624,
    width: '100%'
  },
  perfilInfanteAjustesInner: {
    top: 132,
    height: 694,
    width: 388
  },
  perfilInfanteAjustesChild: {
    top: -1,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 25,
    elevation: 25,
    shadowOpacity: 1,
    width: 428,
    height: 113,
    backgroundColor: Color.white
  },
  icon1: {
    overflow: 'hidden'
  },
  back: {
    top: 66,
    width: 24,
    height: 24
  },
  ajustesDelInfante: {
    // top: 63,
    // left: 64,
    marginLeft: 15,
    fontSize: FontSize.size_5xl,
    color: Color.negro,
    fontWeight: '700',
    fontFamily: FontFamily.lato
    // position: 'absolute'
  },
  image6Icon: {
    top: 2,
    width: 87,
    height: 55
  },
  perfilInfanteAjustes: {
    borderRadius: Border.br_31xl,
    // flex: 1,
    // marginBottom: 80,
    // width: '100%',
    // height: 2500,
    // overflow: 'hidden',
    backgroundColor: Color.white
  }
})

export default PERFILINFANTEAJUSTES
