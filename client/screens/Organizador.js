import React, { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'expo-image'
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  TextInput,
  ScrollView
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Etiquetar from '../components/Etiquetar'
import Lugar3 from '../components/Lugar3'
import { FontSize, FontFamily, Color, Border, Padding } from '../GlobalStyles'
import Checkbox from 'expo-checkbox'
import ENTRADACREADA from '../components/ENTRADACREADA'
import { setPanel } from '../redux/slices/panel.slices'
import Album from './Album'
import PopUpCalendario from '../components/PopUpCalendario'

const Organizador = () => {
  const dispatch = useDispatch()

  const { showPanel } = useSelector((state) => state.panel)

  const [legado, setLegado] = useState(false)
  const [album, setAlbum] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState(false)
  const [añadirAUnAlbum, setAñadirAUnAlbum] = useState(false)
  const [calendario, setCalendario] = useState(false)
  const [lugar, setLugar] = useState(false)
  const [frameContainer2Visible, setFrameContainer2Visible] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [showEtapas, setShowEtapas] = useState(false)
  // const [uploadRecuerdo, setUploadRecuerdo] = useState(false)
  // const [cancion, setCancion] = useState(false)
  // const [ischecked, setIschecked] = useState(false)
  // const [buttonContainer1Visible, setButtonContainer1Visible] = useState(false)
  // const [frameContainer5Visible, setFrameContainer5Visible] = useState(false)
  // const [showPrivacidad, setShowPrivacidad] = useState(false)

  const closeSubmit = () => {
    setSubmit(false)
  }

  const openSelectedAlbum = useCallback(() => {
    setSelectedAlbum(true)
  }, [])

  const closeSelectedAlbum = useCallback(() => {
    setSelectedAlbum(false)
  }, [])

  // const openAlbum = useCallback(() => {
  //   setAñadirAUnAlbum(true)
  // }, [])

  // const closeAlbum = useCallback(() => {
  //   setAñadirAUnAlbum(false)
  // }, [])

  const openLugar = useCallback(() => {
    setLugar(true)
  }, [])

  const closeLugar = useCallback(() => {
    setLugar(false)
  }, [])

  const openCalendario = useCallback(() => {
    setCalendario(true)
  }, [])

  const closeCalendario = useCallback(() => {
    setCalendario(false)
  }, [])

  // const openCancion = useCallback(() => {
  //   setCancion(true)
  // }, [])

  // const closeCancion = useCallback(() => {
  //   setCancion(false)
  // }, [])

  // const openUploadRecuerdo = useCallback(() => {
  //   setUploadRecuerdo(true)
  // }, [])

  // const closeUploadRecuerdo = useCallback(() => {
  //   setUploadRecuerdo(false)
  // }, [])

  const openEtapas = useCallback(() => {
    setShowEtapas(true)
  }, [])

  const closeEtapas = useCallback(() => {
    setShowEtapas(false)
  }, [])

  // const openPrivacidad = useCallback(() => {
  //   setShowPrivacidad(true)
  // }, [])

  // const closePrivacidad = useCallback(() => {
  //   setShowPrivacidad(false)
  // }, [])

  // const openButtonContainer1 = useCallback(() => {
  //   setButtonContainer1Visible(true)
  // }, [])

  // const closeButtonContainer1 = useCallback(() => {
  //   setButtonContainer1Visible(false)
  // }, [])

  const openFrameContainer2 = useCallback(() => {
    setFrameContainer2Visible(true)
  }, [])

  const closeFrameContainer2 = useCallback(() => {
    setFrameContainer2Visible(false)
  }, [])

  // const openFrameContainer5 = useCallback(() => {
  //   setFrameContainer5Visible(true)
  // }, [])

  // const closeFrameContainer5 = useCallback(() => {
  //   setFrameContainer5Visible(false)
  // }, [])

  return (
    <>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.organizador}>
          <View style={[styles.image6Parent, styles.parentPosition]}>
            <Image
              style={styles.image6Icon}
              contentFit="cover"
              source={require('../assets/image-6.png')}
            />
            <View style={styles.frameParent}>
              <View style={{ width: '100%' }}>
                <View style={styles.ionmenuParent}>
                  <Pressable onPress={() => dispatch(setPanel(!showPanel))}>
                    <Image
                      style={styles.ionmenuIcon}
                      contentFit="cover"
                      source={require('../assets/ionmenu2.png')}
                    />
                  </Pressable>
                  <Text style={styles.subirRecuerdo}>Subir recuerdo</Text>
                  <Text style={styles.subir}>Subir</Text>
                </View>
                <View style={styles.fieldParent}>
                  <View style={styles.field}>
                    <TextInput
                      style={[styles.describeLoQue, styles.eventoTypo]}
                      placeholder=" Describe lo que sientes..."
                    />
                    <View style={{ top: -20 }}>
                      <Text style={[styles.evento, styles.eventoTypo]}>
                        Evento:
                      </Text>
                      <View style={[styles.button, styles.buttonPosition]}>
                        <Text style={styles.aadirTypo}>
                          #Mi primera bicicleta
                        </Text>
                      </View>
                      <Pressable
                        style={[styles.button1, styles.buttonPosition]}
                        // onPress={openButtonContainer1}
                      >
                        <Text style={[styles.aadir, styles.aadirPosition]}>
                          Añadir #
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                  <View style={styles.fieldParent}>
                    {/* <Image
                      style={styles.frameChild}
                      contentFit="cover"
                      source={require('../assets/line-802.png')}
                    />
                    <Pressable
                      style={[
                        styles.iconlybolddocumentParent,
                        styles.parentFlexBox
                      ]}
                      onPress={openUploadRecuerdo}
                    >
                      <Image
                        style={styles.iconlybolddocument}
                        contentFit="cover"
                        source={require('../assets/iconlybolddocument.png')}
                      />
                      <Text style={[styles.anexoArchivo, styles.etiquetarTypo]}>
                        Anexo archivo
                      </Text>
                    </Pressable> */}

                    <Pressable
                      style={[
                        styles.iconlybolddocumentParent,
                        styles.parentFlexBox
                      ]}
                      onPress={openFrameContainer2}
                    >
                      <Image
                        style={styles.iconlyboldaddUser}
                        contentFit="cover"
                        source={require('../assets/iconlyboldadduser.png')}
                      />
                      <Text style={[styles.etiquetar, styles.etiquetarTypo]}>
                        Etiquetar
                      </Text>
                    </Pressable>
                    {/* <Image
                      style={styles.frameItem}
                      contentFit="cover"
                      source={require('../assets/line-802.png')}
                    />
                    <Pressable
                      style={[
                        styles.iconlybolddocumentParent,
                        styles.parentFlexBox
                      ]}
                      onPress={openCancion}
                    >
                      <Image
                        style={styles.groupIcon}
                        contentFit="cover"
                        source={require('../assets/group.png')}
                      />
                      <Text style={[styles.aadirAudio, styles.etiquetarTypo]}>
                        Añadir audio
                      </Text>
                    </Pressable> */}
                    <Image
                      style={styles.frameItem}
                      contentFit="cover"
                      source={require('../assets/line-802.png')}
                    />
                    <Pressable
                      style={[
                        styles.iconlybolddocumentParent,
                        styles.parentFlexBox
                      ]}
                      onPress={openCalendario}
                    >
                      <Image
                        style={styles.iconlybolddocument}
                        contentFit="cover"
                        source={require('../assets/vector14.png')}
                      />
                      <Text style={[styles.anexoArchivo, styles.etiquetarTypo]}>
                        Fecha
                      </Text>
                    </Pressable>
                    <Image
                      style={styles.frameItem}
                      contentFit="cover"
                      source={require('../assets/line-802.png')}
                    />
                    <Pressable
                      style={[
                        styles.iconlybolddocumentParent,
                        styles.parentFlexBox
                      ]}
                      onPress={openLugar}
                    >
                      <Image
                        style={styles.iconlybulklocation}
                        contentFit="cover"
                        source={require('../assets/iconlybulklocation.png')}
                      />
                      <Text style={[styles.aadirAudio, styles.etiquetarTypo]}>
                        Lugar
                      </Text>
                    </Pressable>
                    <Image
                      style={styles.frameItem}
                      contentFit="cover"
                      source={require('../assets/line-802.png')}
                    />
                    <View style={[styles.frameContainer, styles.frameLayout]}>
                      <Pressable
                        style={[styles.imageParent, styles.parentFlexBox]}
                        onPress={() => {
                          setAñadirAUnAlbum(!añadirAUnAlbum)
                        }}
                      >
                        <Image
                          style={styles.imageIcon}
                          contentFit="cover"
                          source={require('../assets/image3.png')}
                        />
                        <Text style={[styles.aadirAudio, styles.etiquetarTypo]}>
                          Añadir a un álbum
                        </Text>
                      </Pressable>

                      <Image
                        style={[styles.arrowDown2Icon, styles.aadirPosition]}
                        contentFit="cover"
                        source={require('../assets/arrowdown22.png')}
                      />
                      {añadirAUnAlbum && (
                        <View style={{ top: 20 }}>
                          <Pressable
                            style={{ flexDirection: 'row', marginTop: 15 }}
                          >
                            <Checkbox
                              value={legado}
                              onValueChange={setLegado}
                            />
                            <View
                              style={{
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'space-between'
                              }}
                            >
                              <Text style={styles.aadirTypoText}>
                                Añadir a mi legado
                              </Text>
                              <Pressable onPress={openEtapas}>
                                <Text style={styles.optionsAlbum}>
                                  Añadir etapa
                                </Text>
                              </Pressable>
                            </View>
                          </Pressable>
                          <Pressable
                            style={{
                              flexDirection: 'row',
                              marginTop: 15
                            }}
                          >
                            <Checkbox value={album} onValueChange={setAlbum} />
                            <View
                              style={{
                                flexDirection: 'row',
                                width: '100%',
                                justifyContent: 'space-between'
                              }}
                            >
                              <Text style={styles.aadirTypoText}>
                                Añadir a mis albunes
                              </Text>
                              <Pressable onPress={openSelectedAlbum}>
                                <Text style={styles.optionsAlbum}>
                                  Elegir album
                                </Text>
                              </Pressable>
                            </View>
                          </Pressable>
                        </View>
                      )}
                    </View>
                    <Image
                      style={styles.frameItem}
                      contentFit="cover"
                      source={require('../assets/line-802.png')}
                    />
                    {/* {!añadirAUnAlbum && (
                      <View style={[styles.frameWrapper, styles.frameLayout]}>
                        <View
                          style={[styles.checkParent, styles.button2FlexBox]}
                        >
                          <View style={styles.check}>
                            <View style={styles.checkChild} />
                            {/* <Image
                            style={styles.vectorIcon1}
                            contentFit="cover"
                            source={require('../assets/vector.png')}
                          /> 
                            <Checkbox
                              value={ischecked}
                              onValueChange={setIschecked}
                            />
                          </View>
                          <Text
                            style={[styles.aadirAudio, styles.etiquetarTypo]}
                          >
                            Cumplir reto
                          </Text>
                        </View>
                      </View>
                    )} */}
                    {/* {!añadirAUnAlbum && (
                      <View style={[styles.frameView, styles.parentFlexBox]}>
                        <Pressable
                          style={styles.opcionesDePrivacidadWrapper}
                          onPress={openPrivacidad}
                        >
                          <Text
                            style={[
                              styles.opcionesDePrivacidad,
                              styles.etiquetarTypo
                            ]}
                          >
                            Opciones de Privacidad
                          </Text>
                        </Pressable>
                        <Image
                          style={styles.arrowDown2Icon1}
                          contentFit="cover"
                          source={require('../assets/arrowdown23.png')}
                        />
                      </View>
                    )} */}
                  </View>
                </View>
              </View>
              <LinearGradient
                style={[styles.button2, styles.button2FlexBox]}
                locations={[0, 1]}
                colors={['#dee274', '#7ec18c']}
              >
                <Text onPress={() => setSubmit(true)} style={styles.signIn}>
                  Subir
                </Text>
              </LinearGradient>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* <Modal animationType="slide" transparent visible={showEtapas}>
        <View style={styles.buttonContainer1Overlay}>
          <Pressable style={styles.buttonContainer1Bg} onPress={closeEtapas}>
            <Etapas onClose={closeEtapas} />
          </Pressable>
        </View>
      </Modal> */}

      <Modal animationType="slide" transparent visible={selectedAlbum}>
        <View style={styles.buttonContainer1Overlay}>
          <Pressable
            style={styles.buttonContainer1Bg}
            onPress={closeSelectedAlbum}
          >
            <Album onClose={closeSelectedAlbum} />
          </Pressable>
        </View>
      </Modal>

      {/* <Modal animationType="fade" transparent visible={showPrivacidad}>
        <View style={styles.buttonContainer1Overlay}>
          <Pressable
            style={styles.buttonContainer1Bg}
            onPress={closePrivacidad}
          >
            <Privacidad onClose={closePrivacidad} />
          </Pressable>
        </View>
      </Modal> */}

      <Modal animationType="slide" transparent visible={frameContainer2Visible}>
        <View style={styles.frameContainer2Overlay}>
          <Pressable
            style={styles.frameContainer2Bg}
            onPress={closeFrameContainer2}
          />
          <Etiquetar onClose={closeFrameContainer2} />
        </View>
      </Modal>

      <Modal animationType="slide" transparent visible={calendario}>
        <View style={styles.frameContainer2Overlay}>
          <Pressable
            style={styles.frameContainer2Bg}
            onPress={closeCalendario}
          />
          <PopUpCalendario
            setButtonContainer2Visible={() => {}}
            setCalendario={setCalendario}
          />
        </View>
      </Modal>

      {/* ---------------------------------------------------------- */}

      <Modal animationType="slide" transparent visible={lugar}>
        <View style={styles.frameContainer5Overlay}>
          <Pressable style={styles.frameContainer5Bg} onPress={closeLugar} />
          <Lugar3 onClose={closeLugar} />
        </View>
      </Modal>

      <Modal animationType="slide" transparent visible={submit}>
        <View style={styles.buttonContainer2Overlay}>
          <Pressable style={styles.buttonContainer2Bg} onPress={closeSubmit} />
          <ENTRADACREADA
            onClose={closeSubmit}
            isNavigate={'Muro'}
            message={'Creado con exito'}
          />
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  parentPosition: {
    top: 0,
    left: 0
  },
  optionsAlbum: {
    marginRight: 15,
    height: 30,
    padding: 5,
    backgroundColor: Color.secundario,
    borderRadius: Border.br_11xl,
    textAlign: 'center',
    color: Color.primario1,
    lineHeight: 18,
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.lato
  },
  aadirTypoText: {
    textAlign: 'left',
    color: Color.gris,
    fontFamily: FontFamily.lato,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    fontSize: FontSize.size_base,
    marginLeft: 10
  },
  buttonContainer2Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  buttonContainer2Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  modalOverlay: {
    // flex: 1,
    // top: -100,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center'
    // alignItems: 'center'
  },
  eventoTypo: {
    // left: 20,
    fontWeight: '500',
    fontSize: FontSize.size_lg,
    textAlign: 'left',
    fontFamily: FontFamily.lato
    // position: 'absolute'
  },
  buttonPosition: {
    backgroundColor: Color.secundario,
    top: 58,
    borderRadius: Border.br_11xl,
    height: 29,
    position: 'absolute'
  },
  aadirTypo: {
    lineHeight: 14,
    fontSize: FontSize.size_xs,
    top: 7,
    color: Color.primario1,
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  aadirPosition: {
    left: '50%',
    position: 'absolute'
  },
  parentFlexBox: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  etiquetarTypo: {
    color: Color.gris,
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  frameLayout: {
    height: 23,
    marginTop: 15
  },
  button2FlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  // navigationIcon: {
  //   top: 821,
  //   width: 428,
  //   height: 105
  // },
  image6Icon: {
    width: 87,
    height: 55
  },
  ionmenuIcon: {
    top: 5,
    width: 26,
    height: 20,
    overflow: 'hidden'
  },
  subirRecuerdo: {
    // left: 109,
    fontSize: FontSize.size_5xl,
    fontWeight: '700',
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    color: Color.negro,
    top: 0
    // position: 'absolute'
  },
  subir: {
    color: Color.primario1,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 22,
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.lato
  },
  ionmenuParent: {
    height: 29,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  describeLoQue: {
    top: 20,
    color: Color.grisClaro
  },
  evento: {
    top: 62,
    color: Color.negro
    // left: 20
  },

  button: {
    left: 86
    // width: 134
  },
  buttonContainer1Overlay: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)',
    height: '100%'
  },
  buttonContainer1Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  aadir: {
    marginLeft: -22.5,
    lineHeight: 14,
    fontSize: FontSize.size_xs,
    top: 7,
    color: Color.primario1,
    fontWeight: '500',
    letterSpacing: 0,
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  button1: {
    left: 226,
    width: 75
  },
  field: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA,
    height: 97
    // width: 388
  },
  frameChild: {
    maxHeight: '100%'
    // width: 388
  },
  iconlybolddocument: {
    width: 22,
    height: 22
  },
  anexoArchivo: {
    marginLeft: 13,
    lineHeight: 19,
    color: Color.gris,
    fontSize: FontSize.size_base
  },
  iconlybolddocumentParent: {
    marginTop: 15
  },
  frameItem: {
    marginTop: 15,
    maxHeight: '100%'
    // width: 388
  },
  frameContainer2Overlay: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)',
    height: '100%'
  },
  frameContainer2Bg: {
    // position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  iconlyboldaddUser: {
    width: 18,
    height: 16
  },
  etiquetar: {
    marginLeft: 12,
    lineHeight: 19,
    color: Color.gris,
    fontSize: FontSize.size_base
  },
  groupIcon: {
    width: 16,
    height: 16
  },
  aadirAudio: {
    marginLeft: 16,
    lineHeight: 19,
    color: Color.gris,
    fontSize: FontSize.size_base
  },
  frameContainer5Overlay: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)',
    height: '100%'
  },
  frameContainer5Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  iconlybulklocation: {
    width: 16,
    height: 22
  },
  imageIcon: {
    width: 23,
    height: 24
  },
  imageParent: {
    top: 0,
    left: 0,
    position: 'absolute'
  },
  arrowDown2Icon: {
    height: '67.39%',
    marginLeft: 184.7,
    top: '16.52%',
    bottom: '16.09%',
    width: 9,
    maxHeight: '100%'
  },
  frameContainer: {
    // width: 388
  },
  checkChild: {
    height: '105%',
    width: '100%',
    top: '-2.5%',
    right: '-2.5%',
    bottom: '-2.5%',
    left: '-2.5%',
    borderRadius: 3,
    borderStyle: 'solid',
    borderColor: Color.colorGainsboro_100,
    borderWidth: 1,
    position: 'absolute',
    backgroundColor: Color.white
  },
  vectorIcon1: {
    height: '34.5%',
    width: '45%',
    top: '35%',
    right: '30%',
    bottom: '30.5%',
    left: '25%',
    maxWidth: '100%',
    maxHeight: '100%',
    position: 'absolute',
    overflow: 'hidden'
  },
  check: {
    width: 20,
    height: 20
  },
  checkParent: {
    top: 0,
    left: 0,
    position: 'absolute'
  },
  frameWrapper: {
    width: 165
  },
  opcionesDePrivacidad: {
    color: Color.gris,
    lineHeight: 22,
    fontSize: FontSize.size_lg
  },
  opcionesDePrivacidadWrapper: {
    width: '100%'
  },
  arrowDown2Icon1: {
    marginLeft: 20,
    width: 9,
    height: 16
  },
  frameView: {
    // justifyContent: 'flex-end',
    marginTop: 15
    // width: 388
  },
  fieldParent: {
    marginTop: 20
  },
  signIn: {
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.white,
    textAlign: 'center',
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato
    // flex: 1
  },
  button2: {
    // paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton,
    marginTop: 80,
    borderRadius: Border.br_11xl,
    justifyContent: 'center',
    width: '100%'
  },
  frameParent: {
    height: 862,
    width: '100%'
    // marginTop: 6
  },
  image6Parent: {
    height: 926
  },
  organizador: {
    width: '100%',
    overflow: 'hidden',
    height: 926,
    // flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: 15
    // top: 100
  }
})

export default Organizador
