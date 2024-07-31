import React, { useState, useCallback } from 'react'
import { Image } from 'expo-image'
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Modal,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import Para from '../components/Para'
import OpcionesModal from '../components/OpcionesModal'
import Lugar2 from '../components/Lugar2'
import PopUpCalendario from '../components/PopUpCalendario'
// import ENTRADACREADA10 from '../components/ENTRADACREADA10'
import { FontFamily, Padding, FontSize, Color, Border } from '../GlobalStyles'
import ENTRADACREADA from '../components/ENTRADACREADA'

const MUROALERTAS1 = () => {
  const [fieldContainerVisible, setFieldContainerVisible] = useState(false)
  const [arrowDown2Icon1Visible, setArrowDown2Icon1Visible] = useState(false)
  const [fieldContainer3Visible, setFieldContainer3Visible] = useState(false)
  const navigation = useNavigation()
  const [buttonContainer1Visible, setButtonContainer1Visible] = useState(false)
  const [buttonContainer2Visible, setButtonContainer2Visible] = useState(false)
  const [modalCreate, setModalCreate] = useState(false)
  const [opcionesModal, setOpcionesModal] = useState(false)

  const openOpcionesModal = () => {
    setOpcionesModal(true)
  }

  const closeOpcionesModal = () => {
    setOpcionesModal(false)
  }

  const openFieldContainer = useCallback(() => {
    setFieldContainerVisible(true)
  }, [])

  const closeFieldContainer = useCallback(() => {
    setFieldContainerVisible(false)
  }, [])

  const openArrowDown2Icon1 = useCallback(() => {
    setArrowDown2Icon1Visible(true)
  }, [])

  const closeArrowDown2Icon1 = useCallback(() => {
    setArrowDown2Icon1Visible(false)
  }, [])

  const openFieldContainer3 = useCallback(() => {
    setFieldContainer3Visible(true)
  }, [])

  const closeFieldContainer3 = useCallback(() => {
    setFieldContainer3Visible(false)
  }, [])

  const openButtonContainer1 = useCallback(() => {
    setButtonContainer1Visible(true)
  }, [])

  const closeButtonContainer1 = useCallback(() => {
    setButtonContainer1Visible(false)
  }, [])

  const openButtonContainer2 = useCallback(() => {
    setButtonContainer2Visible(true)
  }, [])

  const closeButtonContainer2 = useCallback(() => {
    setButtonContainer2Visible(false)
  }, [])

  const onCloseModalCreate = () => {
    setModalCreate(false)
  }

  return (
    <>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.muroAlertas}>
          <View style={styles.image6Wrapper}>
            <Image
              style={styles.image6Icon}
              contentFit="cover"
              source={require('../assets/image-6.png')}
            />
          </View>
          <View style={styles.frameParent}>
            <View style={styles.frameGroup}>
              <View style={styles.backParent}>
                <Pressable
                  style={styles.back}
                  onPress={() => navigation.navigate('MENSAJERA')}
                >
                  <Image
                    style={[styles.icon, styles.iconLayout]}
                    contentFit="cover"
                    source={require('../assets/back.png')}
                  />
                </Pressable>
                <Text style={styles.enviarAlertaFamiliar}>
                  Enviar Alerta Familiar
                </Text>
              </View>
              <View style={styles.fieldWithTitleParent}>
                <View>
                  <View style={styles.titleBase}>
                    <Text style={[styles.title, styles.titleTypo]}>Para</Text>
                  </View>
                  <Pressable
                    style={[styles.field, styles.fieldFlexBox]}
                    onPress={openFieldContainer}
                  >
                    <View style={styles.placeholderInput}>
                      <Text style={[styles.search, styles.searchLayout]}>
                        Seleccione destinatarios
                      </Text>
                    </View>
                    <Image
                      style={[
                        styles.iconlyboldfilter2,
                        styles.arrowDown2IconSpaceBlock
                      ]}
                      contentFit="cover"
                      source={require('../assets/iconlyboldfilter21.png')}
                    />
                  </Pressable>
                </View>
                <Pressable
                  style={styles.fieldWithTitle1}
                  onPress={openOpcionesModal}
                >
                  <View style={styles.titleBase}>
                    <Text style={[styles.title, styles.titleTypo]}>
                      Situación
                    </Text>
                  </View>
                  <View style={[styles.field, styles.fieldFlexBox]}>
                    <View style={styles.placeholderInput}>
                      <Text style={[styles.search, styles.searchLayout]}>
                        Buena o mala
                      </Text>
                    </View>
                    <Image
                      style={[
                        styles.arrowDown2Icon,
                        styles.arrowDown2IconSpaceBlock
                      ]}
                      contentFit="cover"
                      source={require('../assets/arrowdown24.png')}
                    />
                  </View>
                </Pressable>
                <View style={styles.fieldWithTitle1}>
                  <View style={styles.titleBase}>
                    <Text style={[styles.title, styles.titleTypo]}>
                      Tipo de alerta
                    </Text>
                  </View>
                  <View style={[styles.field, styles.fieldFlexBox]}>
                    <View style={styles.placeholderInput}>
                      <Text style={[styles.search, styles.searchLayout]}>
                        Plantillas de selección
                      </Text>
                    </View>
                    <Pressable
                      style={[
                        styles.arrowDown2Icon,
                        styles.arrowDown2IconSpaceBlock
                      ]}
                      onPress={openArrowDown2Icon1}
                    >
                      <Image
                        style={styles.icon1}
                        contentFit="cover"
                        source={require('../assets/arrowdown24.png')}
                      />
                    </Pressable>
                  </View>
                </View>
                <View style={styles.fieldWithTitle1}>
                  <View style={styles.titleBase}>
                    <Text style={[styles.title, styles.titleTypo]}>
                      Ubicación
                    </Text>
                  </View>
                  <Pressable
                    style={[styles.field, styles.fieldFlexBox]}
                    onPress={openFieldContainer3}
                  >
                    <View style={styles.placeholderInput}>
                      <Text style={[styles.search, styles.searchLayout]}>
                        Ubicación de la alerta
                      </Text>
                    </View>
                    <Image
                      style={[
                        styles.iconlybulklocation,
                        styles.iconlybolduploadLayout
                      ]}
                      contentFit="cover"
                      source={require('../assets/iconlybulklocation1.png')}
                    />
                  </Pressable>
                </View>
                <View style={styles.fieldWithTitle1}>
                  <View style={styles.titleBase}>
                    <Text style={[styles.title, styles.titleTypo]}>
                      Adjuntar foto
                    </Text>
                  </View>
                  <View style={[styles.field, styles.fieldFlexBox]}>
                    <View style={styles.placeholderInput}>
                      <Text style={[styles.search, styles.searchLayout]}>
                        Subir foto
                      </Text>
                    </View>
                    <Image
                      style={[
                        styles.iconlyboldupload,
                        styles.iconlybolduploadLayout
                      ]}
                      contentFit="cover"
                      source={require('../assets/iconlyboldupload.png')}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.buttonBarParent}>
              <View style={[styles.buttonBar, styles.fieldFlexBox]}>
                <Pressable
                  style={[styles.button, styles.buttonSpaceBlock]}
                  onPress={() => navigation.navigate('MENSAJERA')}
                >
                  <Text style={styles.signIn}>Cancelar</Text>
                </Pressable>
                <LinearGradient
                  style={styles.button1}
                  locations={[0, 1]}
                  colors={['#dee274', '#7ec18c']}
                >
                  <Pressable
                    style={[styles.pressable, styles.pressableFlexBox]}
                    onPress={openButtonContainer1}
                  >
                    <Text style={[styles.signIn1, styles.signTypo]}>
                      Programar Envío
                    </Text>
                  </Pressable>
                </LinearGradient>
              </View>
              <LinearGradient
                style={styles.button2}
                locations={[0, 1]}
                colors={['#dee274', '#7ec18c']}
              >
                <Pressable
                  style={[styles.pressable1, styles.pressableFlexBox]}
                  onPress={() => setModalCreate(true)}
                >
                  <Text style={[styles.signIn2, styles.signTypo]}>Enviar</Text>
                </Pressable>
              </LinearGradient>

              <Modal animationType="fade" transparent visible={modalCreate}>
                <View style={styles.buttonContainer2Overlay}>
                  <Pressable
                    style={styles.buttonContainer2Bg}
                    onPress={closeButtonContainer2}
                  />
                  <ENTRADACREADA
                    onClose={onCloseModalCreate}
                    message={'Guardado!'}
                    isNavigate={'MENSAJERA'}
                  />
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal animationType="fade" transparent visible={fieldContainerVisible}>
        <View style={styles.fieldContainerOverlay}>
          <Pressable
            style={styles.fieldContainerBg}
            onPress={closeFieldContainer}
          />
          <Para onClose={closeFieldContainer} />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={opcionesModal}>
        <View style={styles.fieldContainerOverlay}>
          <Pressable
            style={styles.fieldContainerBg}
            onPress={closeOpcionesModal}
          />
          <OpcionesModal
            onClose={closeOpcionesModal}
            opciones={[['Buena'], ['Mala']]}
          />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={arrowDown2Icon1Visible}>
        <View style={styles.arrowDown2Icon1Overlay}>
          <Pressable
            style={styles.arrowDown2Icon1Bg}
            onPress={closeArrowDown2Icon1}
          />
          <OpcionesModal
            onClose={closeArrowDown2Icon1}
            opciones={[
              ['Tuve un accidente!'],
              ['Aprobe el examen!'],
              ['El bebe esta por nacer!']
            ]}
            isAdd={true}
          />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={fieldContainer3Visible}>
        <View style={styles.fieldContainer3Overlay}>
          <Pressable
            style={styles.fieldContainer3Bg}
            onPress={closeFieldContainer3}
          />
          <Lugar2 onClose={closeFieldContainer3} />
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent
        visible={buttonContainer1Visible}
      >
        <View style={styles.buttonContainer1Overlay}>
          <Pressable
            style={styles.buttonContainer1Bg}
            onPress={closeButtonContainer1}
          />
          <PopUpCalendario
            setButtonContainer2Visible={() => {}}
            setCalendario={setButtonContainer1Visible}
          />
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  iconLayout: {
    overflow: 'hidden',
    width: '100%'
  },
  modalOverlay: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleTypo: {
    letterSpacing: 0,
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  fieldFlexBox: {
    // paddingHorizontal: Padding.p_xl,
    alignItems: 'center',
    flexDirection: 'row'
  },
  searchLayout: {
    lineHeight: 24,
    fontSize: FontSize.size_base
  },
  arrowDown2IconSpaceBlock: {
    marginLeft: 24,
    width: 24
  },
  iconlybolduploadLayout: {
    width: 21,
    marginLeft: 24
  },
  buttonSpaceBlock: {
    paddingBottom: Padding.p_5xs,
    paddingTop: Padding.p_6xs,
    // paddingHorizontal: Padding.p_base,
    flex: 1
  },
  pressableFlexBox: {
    backgroundColor: Color.linearBoton,
    borderRadius: Border.br_11xl,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  signTypo: {
    color: Color.white,
    textAlign: 'center',
    fontFamily: FontFamily.lato
  },
  image6Icon: {
    width: 87,
    height: 55
  },
  image6Wrapper: {
    top: 3,
    left: 20,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute'
  },
  icon: {
    height: '100%'
  },
  back: {
    height: 24,
    width: 24
  },
  enviarAlertaFamiliar: {
    fontSize: FontSize.size_5xl,
    fontWeight: '700',
    color: Color.negro,
    marginLeft: 20,
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  backParent: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    lineHeight: 19,
    fontWeight: '500',
    color: Color.textTextPrimary,
    fontSize: FontSize.size_base,
    letterSpacing: 0
  },
  titleBase: {
    paddingBottom: Padding.p_7xs,
    width: '100%',
    flexDirection: 'row'
  },
  fieldContainerOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  fieldContainerBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  search: {
    color: Color.textPlaceholder,
    letterSpacing: 0,
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  placeholderInput: {
    flexDirection: 'row',
    flex: 1
  },
  iconlyboldfilter2: {
    height: 24
  },
  field: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA,
    paddingVertical: Padding.p_smi,
    width: '100%'
  },
  arrowDown2Icon: {
    height: 12
  },
  fieldWithTitle1: {
    marginTop: 20
  },
  arrowDown2Icon1Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  arrowDown2Icon1Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  icon1: {
    height: '100%',
    width: '100%'
  },
  fieldContainer3Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  fieldContainer3Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  iconlybulklocation: {
    height: 30
  },
  iconlyboldupload: {
    height: 21
  },
  fieldWithTitleParent: {
    alignSelf: 'stretch',
    marginTop: 20,
    flex: 1
  },
  frameGroup: {
    height: 510
  },
  signIn: {
    textAlign: 'center',
    lineHeight: 21,
    fontSize: FontSize.size_sm,
    letterSpacing: 0,
    fontFamily: FontFamily.lato
  },
  button: {
    borderStyle: 'solid',
    borderColor: Color.colorKhaki_100,
    borderWidth: 1,
    height: 52,
    borderRadius: Border.br_11xl,
    paddingBottom: Padding.p_5xs,
    paddingTop: Padding.p_6xs,
    // paddingHorizontal: Padding.p_base,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Color.white
  },
  buttonContainer1Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  buttonContainer1Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  signIn1: {
    lineHeight: 21,
    fontSize: FontSize.size_sm,
    color: Color.white,
    letterSpacing: 0
  },
  pressable: {
    paddingBottom: Padding.p_5xs,
    paddingTop: Padding.p_6xs,
    paddingHorizontal: Padding.p_base,
    flex: 1,
    height: '100%'
  },
  button1: {
    height: 52,
    marginLeft: 20,
    borderRadius: Border.br_11xl
  },
  buttonBar: {
    paddingVertical: Padding.p_3xs,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Color.white
  },
  buttonContainer2Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer2Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  signIn2: {
    letterSpacing: 1,
    lineHeight: 24,
    fontSize: FontSize.size_base,
    flex: 1
  },
  pressable1: {
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    width: '100%'
  },
  button2: {
    marginTop: 10,
    width: '100%',
    borderRadius: Border.br_11xl
  },
  buttonBarParent: {
    marginTop: 40,
    alignItems: 'center'
  },
  frameParent: {
    top: 78
    // alignItems: 'center'
  },
  muroAlertas: {
    // borderRadius: Border.br_31xl,
    // height: 926,
    paddingHorizontal: 15,
    paddingBottom: 150,
    flex: 1,
    backgroundColor: Color.white
  }
})

export default MUROALERTAS1
