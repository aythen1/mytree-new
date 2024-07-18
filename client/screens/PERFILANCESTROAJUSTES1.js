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
import AadirPregunta from '../components/AadirPregunta'
import { useNavigation } from '@react-navigation/native'
import { FontSize, Color, FontFamily, Border } from '../GlobalStyles'

const PERFILANCESTROAJUSTES1 = () => {
  const [frameContainer1Visible, setFrameContainer1Visible] = useState(false)
  const [vectorIcon3Visible, setVectorIcon3Visible] = useState(false)
  const navigation = useNavigation()

  const openFrameContainer1 = useCallback(() => {
    setFrameContainer1Visible(true)
  }, [])

  const closeFrameContainer1 = useCallback(() => {
    setFrameContainer1Visible(false)
  }, [])

  const openVectorIcon3 = useCallback(() => {
    setVectorIcon3Visible(true)
  }, [])

  const closeVectorIcon3 = useCallback(() => {
    setVectorIcon3Visible(false)
  }, [])

  return (
    <>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.perfilAncestroAjustes}>
          <View
            style={{
              flexDirection: 'row',
              // padding: 15,
              alignItems: 'center',
              marginVertical: 30
            }}
          >
            <Pressable
              // style={styles.back}
              onPress={() => navigation.goBack()}
            >
              <Image
                style={{ width: 24, height: 24 }}
                contentFit="cover"
                source={require('../assets/back.png')}
              />
            </Pressable>
            <Text style={[styles.ajustesDelAncestro]}>
              Ajustes del ancestro
            </Text>
          </View>

          <Text style={[styles.defuncin, styles.defuncinLayout]}>
            Defunción
          </Text>
          <Pressable
            // style={[styles.frameParent, styles.parentFlexBox]}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
            onPress={openFrameContainer1}
          >
            <View style={styles.fechaDeDefuncinParent}>
              <Text
                style={[styles.fechaDeDefuncin, styles.fechaDeDefuncinTypo]}
              >
                Fecha de defunción
              </Text>
              <Text style={[styles.text, styles.textSpaceBlock]}>
                1/05/2008
              </Text>
            </View>
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require('../assets/vector47.png')}
            />
          </Pressable>

          <Text style={[styles.fechaDeDefuncin, styles.fechaDeDefuncinTypo]}>
            Motivo de defunción
          </Text>
          <Pressable
            // style={[styles.frameParent, styles.parentFlexBox]}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
            onPress={openFrameContainer1}
          >
            <View style={styles.fechaDeDefuncinParent}>
              <Text style={[styles.text, styles.textSpaceBlock]}>
                Causa natural
              </Text>
            </View>
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require('../assets/vector47.png')}
            />
          </Pressable>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Text style={[styles.fechaDeDefuncin, styles.fechaDeDefuncinTypo]}>
              ¿Organizar despedida?
            </Text>
            <Text style={styles.si1}>Si</Text>
          </View>

          <Text style={[styles.fechaDeDefuncin, styles.fechaDeDefuncinTypo]}>
            Foto de perfil
          </Text>
          <Pressable
            // style={[styles.frameParent, styles.parentFlexBox]}
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            onPress={openFrameContainer1}
          >
            <View style={styles.fechaDeDefuncinParent}></View>
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require('../assets/vector47.png')}
            />
          </Pressable>

          <View
            style={{
              borderWidth: 1,
              borderColor: Color.grisClaro,
              marginVertical: 20
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Text
              style={
                ([styles.fechaDeDefuncin, styles.fechaDeDefuncinTypo],
                {
                  color: Color.mytreeClarito,
                  fontWeight: '500',
                  fontSize: FontSize.size_base
                })
              }
            >
              Formulario
            </Text>
            <Pressable style={styles.vector} onPress={openVectorIcon3}>
              <Image
                style={styles.iconLayout}
                contentFit="cover"
                source={require('../assets/vector21.png')}
              />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <View style={styles.fechaDeDefuncinParent}>
              <Text style={[styles.cmoEraMi, styles.cmoEraMiTypo]}>
                ¿Cómo era mi personalidad?
              </Text>
              <Text style={[styles.rcuNuncMattis, styles.cmoEraMiTypo]}>
                rcu nunc mattis. Mauris feugiat non interdum...
              </Text>
            </View>
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require('../assets/vector47.png')}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <View style={styles.fechaDeDefuncinParent}>
              <Text style={[styles.cmoEraMi, styles.cmoEraMiTypo]}>
                Vinculos familiares
              </Text>
              <Text style={[styles.rcuNuncMattis, styles.cmoEraMiTypo]}>
                rcu nunc mattis. Mauris feugiat non interdum...
              </Text>
            </View>
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require('../assets/vector47.png')}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <View style={styles.fechaDeDefuncinParent}>
              <Text style={[styles.cmoEraMi, styles.cmoEraMiTypo]}>
                Expresiones y gestos característicos
              </Text>
              <Text style={[styles.rcuNuncMattis, styles.cmoEraMiTypo]}>
                rcu nunc mattis. Mauris feugiat non interdum...
              </Text>
            </View>
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require('../assets/vector47.png')}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <View style={styles.fechaDeDefuncinParent}>
              <Text style={[styles.cmoEraMi, styles.cmoEraMiTypo]}>
                Pasatiempos y gustos
              </Text>
              <Text style={[styles.rcuNuncMattis, styles.cmoEraMiTypo]}>
                rcu nunc mattis. Mauris feugiat non interdum...
              </Text>
            </View>
            <Image
              style={styles.vectorIcon}
              contentFit="cover"
              source={require('../assets/vector47.png')}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <View style={styles.fechaDeDefuncinParent}>
              <Text style={[styles.cmoEraMi, styles.cmoEraMiTypo]}>
                Valores y saberes
              </Text>
              <Text style={[styles.rcuNuncMattis, styles.cmoEraMiTypo]}>
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

        {/* <Modal
          animationType="fade"
          transparent
          visible={frameContainer1Visible}
        >
          <View style={styles.frameContainer1Overlay}>
            <Pressable
              style={styles.frameContainer1Bg}
              onPress={closeFrameContainer1}
            />
            <Fecha1 onClose={closeFrameContainer1} />
          </View>
        </Modal> */}

        <Modal animationType="fade" transparent visible={vectorIcon3Visible}>
          <View style={styles.vectorIcon3Overlay}>
            <Pressable
              style={styles.vectorIcon3Bg}
              onPress={closeVectorIcon3}
            />
            <AadirPregunta onClose={closeVectorIcon3} />
          </View>
        </Modal>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  backParentPosition: {
    left: 20,
    position: 'absolute'
  },
  parentPosition: {
    left: 0,
    top: 0,
    position: 'absolute'
  },
  defuncinLayout: {
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  parentFlexBox: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  fechaDeDefuncinTypo: {
    color: Color.negro,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    marginTop: 30
  },
  textSpaceBlock: {
    marginTop: 10,
    fontWeight: '500'
  },
  cmoEraMiTypo: {
    lineHeight: 24,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  iconLayout: {
    height: '100%',
    width: '100%'
  },
  defuncin: {
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '500'
  },
  frameContainer1Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  frameContainer1Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  fechaDeDefuncin: {
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  text: {
    color: Color.grisGeneral,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base
  },
  fechaDeDefuncinParent: {
    // width: '100%',
    marginLeft: 15,
    marginTop: 8
  },
  vectorIcon: {
    width: 21,
    height: 21,
    marginLeft: 20
  },
  frameParent: {
    justifyContent: 'flex-end',
    marginTop: 20
  },
  si1: {
    color: Color.primario1,
    marginRight: 10,
    marginTop: 30
  },
  text1: {
    color: Color.white
  },
  si: {
    fontWeight: '700',
    fontFamily: FontFamily.lato
  },
  no: {
    color: Color.grisHome,
    fontFamily: FontFamily.lato,
    fontWeight: '500'
  },
  siNo: {
    fontSize: FontSize.size_lg,
    textAlign: 'left'
  },
  frameChild: {
    maxHeight: '100%',
    marginTop: 20,
    width: 388
  },
  vectorIcon3Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  vectorIcon3Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  vector: {
    width: 20,
    height: 20
    // marginLeft: 289
  },
  formularioParent: {
    marginTop: 20,
    flexDirection: 'row',
    width: 388
  },
  cmoEraMi: {
    color: Color.primario2,
    fontWeight: '700'
  },
  rcuNuncMattis: {
    color: Color.grisClaro,
    marginTop: 10,
    fontWeight: '500',
    width: 347
  },
  defuncinParent: {
    height: 624
  },
  perfilAncestroAjustesInner: {
    top: 133,
    height: 694,
    width: 388
  },
  navigationIcon: {
    marginLeft: -214,
    bottom: 0,
    left: '50%',
    height: 105,
    width: 428,
    position: 'absolute'
  },
  frameItem: {
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 25,
    elevation: 25,
    shadowOpacity: 1,
    height: 113,
    zIndex: 0,
    width: 428,
    backgroundColor: Color.white
  },

  back: {
    width: 24,
    height: 24
  },
  ajustesDelAncestro: {
    fontSize: FontSize.size_5xl,
    fontWeight: '700',
    marginLeft: 20,
    color: Color.negro,
    textAlign: 'left',
    fontFamily: FontFamily.lato

    // marginTop: 30
  },
  backParent: {
    zIndex: 1,
    left: 20
  },
  image6Icon: {
    top: 3,
    width: 87,
    height: 55,
    zIndex: 2
  },
  perfilAncestroAjustes: {
    paddingBottom: 50,
    width: '100%',
    backgroundColor: Color.white
  }
})

export default PERFILANCESTROAJUSTES1
