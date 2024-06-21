import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import { Color, FontFamily, Padding, FontSize } from '../../GlobalStyles'
import NavBarDiario from '../../components/NavBarDiario'
import Humor from '../../components/Humor'
import ReflexionDiaria from '../../components/ReflexionDiaria'
import DescubriendoElMundo from '../../components/DescubriendoElMundo'
import CalebrandoLogros from '../../components/CelebrandoLogros'
import DesafiosSuperados from '../../components/DesafiosSuperados'
import RisaAnecdotas from '../../components/RisaAnecdotas'
import Personalizada from '../../components/Personalizada'
import NavMedia from '../../components/NavMedia'
import ENTRADACREADA from '../../components/ENTRADACREADA'
import LupaSVG from '../../components/svgs/LupaSVG'
import SettingMuroSVG from '../../components/svgs/SettingMuroSVG'
import HeaderIcons from '../../components/HeaderIcons'
import Editar2SVG from '../../components/svgs/Editar2SVG'
import { Context } from '../../context/Context'
import { Entypo } from '@expo/vector-icons'
import { Camera, CameraView } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import PopUpCalendario from '../../components/PopUpCalendario'
import MasBusquedaSVG from '../../components/svgs/MasBusquedaSVG'

const MIDIARIOENTRADATEXTOPL7 = () => {
  const { selectedSection, editingDiary, handleAddDiary } = useContext(Context)
  const navigation = useNavigation()
  const [showEdit, setShowEdit] = useState(false)
  const [isSection, setIsSection] = useState('')
  const [modalCreate, setModalCreate] = useState(false)
  const { pickImage, showCamera, setShowCamera } = useContext(Context)
  const [images, setImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [cameraType, setCameraType] = useState(Camera?.Constants?.Type?.back)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)

  const monthsInSpanish = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre'
  ]

  useEffect(() => {
    obtenerImagenesDeGaleria()
  }, [])

  useEffect(() => {
    console.log('selectedDate changed to', selectedDate)
    console.log('selectedSection changed to', selectedSection)
    // Aca cuando tenga la ruta desarrollo logica de get de diarios por categoria y selectedDate.
  }, [selectedDate, selectedSection])

  const obtenerImagenesDeGaleria = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    if (status !== 'granted') {
      console.error('Permiso denegado para acceder a la galería de imágenes.')
      return
    }

    const assets = await MediaLibrary.getAssetsAsync()
    const imagesArray = assets?.assets ?? []
    setImages(imagesArray)
  }

  const handleSeleccionarImagen = (imagen) => {
    console.log('imagen: ', imagen)
    setSelectedImage(imagen)
    pickImage('a', imagen.uri)
  }
  const [hasPermission, setHasPermission] = useState(null)
  const [cameraRef, setCameraRef] = useState(null)
  const cameraReff = useRef(null)
  const [facing, setFacing] = useState('back')

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const changePictureMode = () => {
    console.log(
      'setting camera mode to: ',
      facing === 'back' ? 'front' : 'back'
    )
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'))
  }

  useEffect(() => {
    // console.log('selectedImage changed', selectedImage)
  }, [selectedImage])

  const takePicture = async () => {
    if (cameraReff?.current) {
      const photo = await cameraReff.current.takePictureAsync()
      pickImage('a', photo.uri)
      setSelectedImage(photo)
      // pickImageFromCamera(selectedPicture, photo.uri);

      setShowCamera(false)
      // You can handle the taken photo here, such as displaying it or saving it.
    }
  }

  const [groupIcon1Visible, setGroupIcon1Visible] = useState(false)

  const openGroupIcon1 = useCallback(() => {
    setGroupIcon1Visible(true)
  }, [])

  const closeGroupIcon1 = useCallback(() => {
    setGroupIcon1Visible(false)
  }, [])

  function renderSection(isSection) {
    switch (isSection) {
      case 'mundo':
        return <DescubriendoElMundo showEdit={showEdit} />
      case 'nube':
        return (
          <ReflexionDiaria
            openGroupIcon1={openGroupIcon1}
            modalCreate={modalCreate}
            setModalCreate={setModalCreate}
            editing={showEdit}
          />
        )
      case 'logros':
        return <CalebrandoLogros editing={showEdit} />
      case 'desafios':
        return <DesafiosSuperados editing={showEdit} />
      case 'risas':
        return <RisaAnecdotas editing={showEdit} />
      case 'personalizada':
        return <Personalizada editing={showEdit} />
      default:
        return <DescubriendoElMundo editing={showEdit} />
    }
  }

  const onCloseModalCreate = () => {
    setModalCreate(false)
  }

  return (
    <View
      style={{
        backgroundColor: Color.white,
        width: '100%',
        justifyContent: 'space-between',
        flexGrow: 1,
        paddingBottom: showCamera ? 0 : 105
      }}
    >
      {showCamera ? (
        <CameraView
          ref={cameraReff}
          facing={facing}
          style={{ flex: 1 }}
          mode="picture"
          FocusMode="on"
          onCameraReady={(e) => console.log(e, 'esto es e')}

          // cameraType="back"
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row'
            }}
          >
            <TouchableOpacity
              style={{ position: 'absolute', top: 22, left: 18 }}
              onPress={() => setShowCamera(false)}
            >
              <Image
                style={{
                  height: 20,
                  width: 20
                }}
                contentFit="cover"
                source={require('../../assets/whiteCross.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={changePictureMode}
              style={{ position: 'absolute', top: 18, right: 18 }}
            >
              <Entypo name="cycle" color={'#fff'} size={29} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                width: '100%',
                marginBottom: 30,
                position: 'relative'
              }}
            >
              <TouchableOpacity
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 100,
                  backgroundColor: 'transparent',
                  borderWidth: 6,
                  borderColor: '#7EC18C',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onPress={takePicture}
              >
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 100,
                    backgroundColor: '#7EC18C',

                    color: 'white'
                  }}
                ></View>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View>
          <View>
            <View style={styles.topContainer}>
              <Pressable onPress={() => navigation.navigate('Muro')}>
                <Image
                  style={styles.image6Icon}
                  contentFit="cover"
                  source={require('../../assets/image-6.png')}
                />
              </Pressable>
              <HeaderIcons
                icons={[
                  <Pressable onPress={() => navigation.navigate('Busqueda')}>
                    <LupaSVG />
                  </Pressable>,
                  <SettingMuroSVG
                    isNavigation={() => navigation.navigate('PerfilAjustes')}
                  />
                ]}
              />
            </View>

            <NavBarDiario setIsSection={setIsSection} isSection={isSection} />

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 20
              }}
              style={{
                width: '100%',
                paddingTop: 15,
                paddingHorizontal: 15,
                height: Dimensions.get('screen').height * 0.5
              }}
            >
              {/* {!showEdit ? (
                <View style={styles.editContainer}>
                  <Pressable
                    onPress={() => setShowEdit(!showEdit)}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                    <Text style={[styles.text, styles.textTypo]}>07</Text>
                    <Text style={[styles.jul2023, styles.textTypo]}>
                      jul. 2023
                    </Text>
                    <Image
                      style={styles.iconlycurvedarrowDown2}
                      resizeMode="contain"
                      source={require('../../assets/iconlycurvedarrowdown2.png')}
                    />
                    <Editar2SVG style={{ marginLeft: '45%' }} />
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  style={styles.frameParent}
                  onPress={() => {
                    setShowEdit(!showEdit)
                    // navigation.navigate('MIDIARIOENTRADATEXTOPL1')
                  }}
                >
                  {showEdit && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 5,
                        alignItems: 'center'
                      }}
                    >
                      <Pressable
                        style={styles.wrapper}
                        onPress={() => setShowEdit(false)}
                      >
                        <Image
                          style={styles.icon}
                          contentFit="cover"
                          source={require('../../assets/group-68463.png')}
                        />
                      </Pressable>
                      <View style={styles.groupFlexBox}>
                        <Pressable
                          style={styles.wrapper}
                          onPress={openGroupIcon1}
                        >
                          <Image
                            style={styles.icon}
                            contentFit="cover"
                            source={require('../../assets/group2.png')}
                          />
                        </Pressable>
                        <LinearGradient
                          style={styles.container}
                          locations={[0, 1]}
                          colors={['#dee274', '#7ec18c']}
                        >
                          <Pressable
                            style={[styles.pressable]}
                            onPress={() => setModalCreate(true)}
                          >
                            <Text style={[styles.signIn, styles.ttTypo]}>
                              Guardar
                            </Text>
                          </Pressable>
                        </LinearGradient>
                      </View>
                    </View>
                  )}

                  <Modal
                    animationType="slide"
                    transparent
                    visible={modalCreate}
                  >
                    <View style={styles.arrowDown2Icon1Overlay}>
                      <Pressable
                        style={styles.arrowDown2Icon1Bg}
                        onPress={() => setModalCreate(false)}
                      />
                      <ENTRADACREADA
                        onClose={() => setModalCreate(false)}
                        message={'Entrada Creada'}
                        isNavigate={'MIDIARIOPANTALLAPERSONAL'}
                      />
                    </View>
                  </Modal>
                </Pressable>
              )} */}

              <View style={styles.editContainer}>
                <Pressable
                  onPress={() => setShowCalendar(true)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}
                >
                  <Text style={[styles.text, styles.textTypo]}>
                    {selectedDate.getDate()}
                  </Text>
                  <Text style={[styles.jul2023, styles.textTypo]}>
                    {`${monthsInSpanish[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}
                  </Text>
                  <Image
                    style={styles.iconlycurvedarrowDown2}
                    resizeMode="contain"
                    source={require('../../assets/iconlycurvedarrowdown2.png')}
                  />
                  {/* <Editar2SVG style={{ marginLeft: '45%' }} /> */}
                </Pressable>
                <Pressable
                  onPress={() => handleAddDiary(selectedSection, selectedDate)}
                >
                  <MasBusquedaSVG />
                </Pressable>
              </View>

              {/* renderizado de secciones */}
              {/* {renderSection(selectedSection)} */}
              <ReflexionDiaria
                openGroupIcon1={openGroupIcon1}
                modalCreate={modalCreate}
                setModalCreate={setModalCreate}
                editing={showEdit}
              />

              {/* -------------------- */}
            </ScrollView>
          </View>

          {editingDiary && <NavMedia />}
          <Modal animationType="slide" transparent visible={showCalendar}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(113, 113, 113, 0.3)'
              }}
            >
              <Pressable
                style={{ width: '100%', height: '100%', left: 0, top: 0 }}
                onPress={() => setShowCalendar(false)}
              />
              <PopUpCalendario
                fromDiary={true}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setButtonContainer2Visible={() => {}}
                setCalendario={setShowCalendar}
              />
            </View>
          </Modal>

          <Modal animationType="slide" transparent visible={groupIcon1Visible}>
            <View style={styles.arrowDown2Icon1Overlay}>
              <Pressable
                style={styles.arrowDown2Icon1Bg}
                onPress={closeGroupIcon1}
              />
              <Humor onClose={closeGroupIcon1} />
            </View>
          </Modal>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  arrowDown2Icon1Bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  arrowDown2Icon1Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  groupParent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center'
  },
  groupFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  pressable: {
    paddingHorizontal: Padding.p_base,
    paddingTop: Padding.p_6xs,
    paddingBottom: Padding.p_5xs,
    backgroundColor: Color.linearBoton
  },
  wrapper: {
    height: 24,
    width: 24
  },
  icon: {
    height: '100%',
    width: '100%'
  },
  container: {
    marginLeft: 20
  },
  signIn: {
    fontSize: FontSize.size_sm,
    lineHeight: 21,
    textAlign: 'center'
  },
  ttTypo: {
    color: Color.white,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  textTypo: {
    textAlign: 'center',
    color: Color.negro,
    fontFamily: FontFamily.lato,
    letterSpacing: 0
  },
  text: {
    fontWeight: '700',
    lineHeight: 36,
    fontSize: FontSize.size_5xl
  },
  jul2023: {
    fontSize: FontSize.size_xl,
    lineHeight: 30,
    marginLeft: 10
  },
  iconlycurvedarrowDown2: {
    width: 49 * 0.3,
    height: 27 * 0.3,
    marginLeft: 10,
    marginTop: 1
  },
  frameParent: {
    width: '100%'
  },
  image6Icon: {
    width: 87,
    height: 55
  },
  miDiarioEntradaTextoPl: {
    backgroundColor: Color.white,
    width: '100%',
    flex: 1
  },
  innerContainer: {
    flex: 1,
    marginTop: 20,
    width: '100%',
    padding: 15
  },
  topContainer: {
    top: 10,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  editContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})

export default MIDIARIOENTRADATEXTOPL7
