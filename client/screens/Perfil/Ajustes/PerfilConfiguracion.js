import React, { useState, useRef, useEffect, useContext } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import {
  FontFamily,
  Color,
  FontSize,
  Border,
  Padding
} from '../../../GlobalStyles'
import ENTRADACREADA from '../../../components/ENTRADACREADA'
import HeaderIcons from '../../../components/HeaderIcons'
import CalendarMuroSVG from '../../../components/svgs/CalendarMuroSVG'
import BookSVG from '../../../components/svgs/BookSVG'
import NotificationsMuroSVG from '../../../components/svgs/NotificationsMuroSVG'
import axios from 'axios'
import axiosInstance, { BACKURL } from '../../../apiBackend'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../../../redux/actions/user'
import { Context } from '../../../context/Context'
import { CameraView } from 'expo-camera'
import SimboloSVG from '../SimboloSVG'
import { Entypo } from '@expo/vector-icons'
import PopUpCalendario from '../../../components/PopUpCalendario'
import Maps from '../../../components/Maps'
import EtiquetarUno from '../../../components/EtiquetarUno'
import useFetchHook from '../../../utils/useFetchHook'
import TopBar from '../../../components/TopBar'
import EtiquetarFamiliar from '../../../components/EtiquetarFamiliar'
import reactotron from 'reactotron-react-native'

const PerfilConfiguracion = () => {
  const { userData: usuario, allUsers } = useSelector((state) => state.users)
  const [showImageOptions, setShowImageOptions] = useState(false)
  const [facing, setFacing] = useState('back')
  const { pickImage, provisoryProfileImage, profileImage } = useContext(Context)
  const dispatch = useDispatch()
  const [showCamera, setShowCamera] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [calendario, setCalendario] = useState(false)
  const [showLocation, setShowLocation] = useState(false)
  const navigation = useNavigation()
  const nombreInputRef = useRef(null)
  const [modalCreate, setModalCreate] = useState(false)
  const [inputsBros, setInputsBros] = useState([{ input: '' }])
  const [editable, setEditable] = useState(false)
  const [location, setLocation] = useState('')
  const [showTagUsers, setShowTagUsers] = useState(false)
  const [showTagUsersPadre, setShowTagUsersPadre] = useState(false)
  const [showTagBrother, setShowTagBrother] = useState(false)
  const [inputSelected, setInputSelected] = useState(0)

  const { data, loading, error } = useFetchHook({
    url: `/user/${usuario?.id}/friendsAndFamily`
  })

  const [invitedUsers, setInvitedUsers] = useState([])

  const [dataToSend, setDataToSend] = useState({
    username: usuario.username,
    birthDate: usuario.birthDate,
    address: usuario.address,
    momId: usuario.momId,
    dadId: usuario.dadId,
    brotherIds: usuario.brotherIds || [],
    maritalStatus: usuario.maritalStatus
  })

  const cameraReff = useRef(null)
  useEffect(() => {
    console.log('esrto daaa10', dataToSend)
  }, [dataToSend.brotherIds])

  const takePicture = async () => {
    if (cameraReff) {
      const photo = await cameraReff.current.takePictureAsync()
      // setSelectedImage(photo)
      pickImage('profile', photo.uri)
      setShowCamera(false)
    }
  }
  useEffect(() => {
    if (profileImage) {
      console.log('llego')
      axiosInstance.patch(`/user/${usuario?.id}`, {
        profilePicture: profileImage
      })
    }
    dispatch(getUserData(usuario?.id))
  }, [profileImage])

  const handleBrotherInputChange = (index, text) => {
    setInputsBros((prev) => {
      const newInputs = [...prev]
      newInputs[index].input = text
      console.log(newInputs, 'esrto daaa')

      return newInputs
    })

    setDataToSend((prev) => {
      const newData = { ...prev }

      const array = []

      for (let index = 0; index < inputsBros.length; index++) {
        const element = inputsBros[index]
        if (element.input !== '') {
          array.push(element.input)
        }
      }
      newData.brotherIds = [...array,...usuario.brotherIds]

      return newData
    })
  }

  const handleAddBrotherInput = () => {
    setInputsBros((prev) => [...prev, { input: '' }])
  }

  useEffect(() => {
    const brothersArray = inputsBros
      ?.map((input) => input?.input)
      ?.filter((input) => input?.trim() !== '')

    if (inputsBros[0].input !== '') {
      setDataToSend((prevData) => ({
        ...prevData,
        brotherIds: [...usuario.brotherIds, ...brothersArray]
      }))
    }
  }, [inputsBros])

  const changePictureMode = async () => {
    setFacing((prev) => (prev == 'back' ? 'front' : 'back'))
  }

  const onCloseModalCreate = () => {
    setModalCreate(false)
    navigation.goBack()
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.patch(`${BACKURL}/user/${usuario.id}`, dataToSend)
      if (res.data) {
        setModalCreate(true)
        dispatch(getUserData(usuario.id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const closeCalendario = () => {
    setCalendario(false)
  }

  if (!showCamera) {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.viewContainer}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 130 }}
          style={styles.frameParent}
          showsVerticalScrollIndicator={false}
        >
          <TopBar screen={'perfil'}></TopBar>
          <View>
            <View style={[styles.backParent, styles.parentFlexBox]}>
              <Pressable
                style={styles.iconlylightOutlinecalendar}
                onPress={() => navigation.navigate('PerfilAjustes')}
              >
                <Image
                  style={[styles.icon, styles.iconLayout1]}
                  contentFit="cover"
                  source={require('../../../assets/back.png')}
                />
              </Pressable>
              <Text style={styles.ajustes}>Configuración</Text>
            </View>
          </View>

          <View style={styles.centralContainer}>
            <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
              <View style={{ width: '100%' }}>
                <View
                  style={{
                    width: '100%',
                    height: 200,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Pressable
                    onPress={() => setShowImageOptions(!showImageOptions)}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flex: 1,
                      flexDirection: 'row',
                      position: 'relative'
                    }}
                  >
                    <Pressable
                      onPress={() => setShowCamera(true)}
                      style={{
                        width: 30,
                        height: 30,
                        backgroundColor: Color.secundario,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: 30,
                        right: 0,
                        zIndex: 999
                      }}
                    >
                      <Image
                        style={{ width: 16, height: 16 }}
                        contentFit="cover"
                        source={require('../../../assets/cameraIcon.png')}
                      />
                    </Pressable>
                    {!provisoryProfileImage && !usuario?.profilePicture ? (
                      <Image
                        style={{ ...styles.perfilItem, borderRadius: 100 }}
                        contentFit="cover"
                        source={require('../../../assets/logoo.png')}
                      />
                    ) : (
                      <Image
                        style={{ ...styles.perfilItem, borderRadius: 100 }}
                        contentFit="cover"
                        source={{
                          uri:
                            profileImage ||
                            provisoryProfileImage ||
                            usuario.profilePicture
                        }}
                      />
                    )}
                  </Pressable>

                  <TouchableOpacity
                    onPress={() => pickImage('profile')}
                    style={{
                      width: 120,
                      height: 30,
                      backgroundColor: Color.secundario,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Text style={{ color: 'white' }}>Subir imagen</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
              <View style={styles.nombreCompletoParent}>
                <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                  Nombre/s
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  <TextInput
                    editable={editable}
                    style={[
                      styles.brunoPham,
                      styles.brunoPhamTypo,
                      { width: '100%' }
                    ]}
                    maxLength={38}
                    ref={nombreInputRef}
                    placeholder={usuario.username || 'Nombre/s'}
                    onChangeText={(text) =>
                      setDataToSend({ ...dataToSend, ['username']: text })
                    }
                    value={dataToSend.username}
                  />
                  <TouchableOpacity onPress={() => setEditable(!editable)}>
                    <Image
                      style={[styles.vectorIcon1, styles.vectorIconLayout]}
                      contentFit="cover"
                      source={
                        editable
                          ? require('../../../assets/vector47.png')
                          : require('../../../assets/lapizgris.png')
                      }
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
              <View style={styles.nombreCompletoParent}>
                <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                  Apellido/s
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  <TextInput
                    editable={editable}
                    style={[
                      styles.brunoPham,
                      styles.brunoPhamTypo,
                      { width: '100%' }
                    ]}
                    maxLength={38}
                    placeholder={usuario.apellido || 'Apellido/s'}
                    onChangeText={(text) =>
                      setDataToSend({ ...dataToSend, ['apellido']: text })
                    }
                    value={dataToSend.apellido}
                  />
                </View>
              </View>
            </View>
            <Modal animationType="fade" transparent visible={calendario}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Pressable
                  style={{ width: '100%', height: '100%', left: 0, top: 0 }}
                  onPress={closeCalendario}
                />
                <PopUpCalendario
                  selectedDate={dataToSend.birthDate}
                  setSelectedDate={(v) =>
                    setDataToSend({ ...dataToSend, ['birthDate']: v })
                  }
                  setButtonContainer2Visible={() => {}}
                  setCalendario={setCalendario}
                />
              </View>
            </Modal>
            <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
              <View style={styles.nombreCompletoParent}>
                <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                  Fecha de nacimiento
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  <Pressable
                    onPress={() => (editable ? setCalendario(true) : null)}
                    style={[
                      styles.brunoPham,
                      styles.brunoPhamTypo,
                      { width: '100%' }
                    ]}
                  >
                    <Text
                      style={{
                        color: 'gray'
                      }}
                    >
                      {usuario.birthDate ||
                        dataToSend.birthDate ||
                        'Fecha de nacimiento'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

            <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
              <View style={styles.nombreCompletoParent}>
                <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                  Ubicación
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  <Pressable
                    onPress={() => (editable ? setShowLocation(true) : null)}
                    style={[
                      styles.brunoPham,
                      styles.brunoPhamTypo,
                      { width: '100%' }
                    ]}
                  >
                    <Text
                      style={{
                        color: 'gray'
                      }}
                    >
                      {usuario.address || dataToSend.address || 'Ubicación'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <Modal animationType="fade" transparent visible={showLocation}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(113, 113, 113, 0.3)'
                }}
              >
                <Pressable
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    left: 0,
                    top: 0
                  }}
                  onPress={() => {
                    setShowLocation(false)
                  }}
                />
                <Maps
                  onClose={() => setShowLocation(false)}
                  setLocation={(e) =>
                    setDataToSend({ ...dataToSend, ['address']: e })
                  }
                />
              </View>
            </Modal>
            <Modal animationType="fade" transparent visible={showTagUsers}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%'
                }}
              >
                <Pressable
                  style={{ width: '100%', height: '100%', left: 0, top: 0 }}
                  onPress={() => setShowTagUsers(false)}
                />
                {/* <EtiquetarUno
                  data={data}
                  taggedUsers={invitedUsers}
                  setTaggedUsers={(e) =>
                    setDataToSend({ ...dataToSend, ['momId']: e })
                  }
                  onClose={() => setShowTagUsers(false)}
                /> */}
                <EtiquetarFamiliar
                  taggedUsers={invitedUsers}
                  setTaggedUsers={(e) =>
                    setDataToSend({ ...dataToSend, ['momId']: e })
                  }
                  onClose={() => setShowTagUsers(false)}
                ></EtiquetarFamiliar>
              </View>
            </Modal>
            <Modal animationType="fade" transparent visible={showTagUsersPadre}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%'
                }}
              >
                <Pressable
                  style={{ width: '100%', height: '100%', left: 0, top: 0 }}
                  onPress={() => setShowTagUsersPadre(false)}
                />
                {/* <EtiquetarUno
                  data={data}
                  taggedUsers={dataToSend}
                  setTaggedUsers={(e) =>
                    setDataToSend({ ...dataToSend, ['dadId']: e })
                  }
                  onClose={() => setShowTagUsersPadre(false)}
                /> */}
                <EtiquetarFamiliar
                  taggedUsers={invitedUsers}
                  setTaggedUsers={(e) =>
                    setDataToSend({ ...dataToSend, ['dadId']: e })
                  }
                  onClose={() => setShowTagUsersPadre(false)}
                ></EtiquetarFamiliar>
              </View>
            </Modal>
            <Modal animationType="fade" transparent visible={showTagBrother}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%'
                }}
              >
                <Pressable
                  style={{ width: '100%', height: '100%', left: 0, top: 0 }}
                  onPress={() => setShowTagBrother(false)}
                />
                {/* <EtiquetarUno
                  data={data}
                  taggedUsers={dataToSend}
                  setTaggedUsers={(text) =>
                    handleBrotherInputChange(inputSelected + 1, text)
                  }
                  onClose={() => setShowTagBrother(false)}
                /> */}
                <EtiquetarFamiliar
                  taggedUsers={invitedUsers}
                  setTaggedUsers={(text) =>
                    handleBrotherInputChange(inputSelected + 1, text)
                  }
                  onClose={() => setShowTagBrother(false)}
                ></EtiquetarFamiliar>
              </View>
            </Modal>
            <Image
              style={styles.frameChild}
              contentFit="cover"
              source={require('../../../assets/line-811.png')}
            />
            <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
              <View style={styles.nombreCompletoParent}>
                <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                  Madre
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  {/* <TextInput
                    editable={editable}
                    style={[styles.brunoPham, styles.brunoPhamTypo]}
                    ref={nombreInputRef}
                    placeholder="Agregar madre"
                  /> */}
                  <Pressable
                    onPress={() => (editable ? setShowTagUsers(true) : null)}
                    style={[
                      styles.brunoPham,
                      styles.brunoPhamTypo,
                      { width: '100%', flexDirection: 'row', gap: 3 }
                    ]}
                  >
                    <Text
                      style={{
                        color: 'gray'
                      }}
                    >
                      {usuario.momId || dataToSend.momId
                        ? allUsers.filter(
                            (user) => user.id.toString() === dataToSend.momId
                          )[0]?.username || dataToSend.momId
                        : 'Agregar madre'}
                    </Text>
                    <Text
                      style={{
                        color: 'gray'
                      }}
                    >
                      {usuario.momId || dataToSend.momId
                        ? allUsers.filter(
                            (user) => user.id.toString() === dataToSend?.momId
                          )[0]?.apellido || ''
                        : ''}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
            <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
              <View style={styles.nombreCompletoParent}>
                <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                  Padre
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  <Pressable
                    onPress={() =>
                      editable ? setShowTagUsersPadre(true) : null
                    }
                    style={[
                      styles.brunoPham,
                      styles.brunoPhamTypo,
                      { width: '100%' }
                    ]}
                  >
                    <Text
                      style={{
                        color: 'gray'
                      }}
                    >
                      {usuario.dadId || dataToSend.dadId
                        ? allUsers.filter(
                            (user) => user.id.toString() === dataToSend.dadId
                          )[0]?.username || dataToSend.dadId
                        : 'Agregar padre'}
                    </Text>
                    <Text>
                      {usuario.dadId || dataToSend.dadId
                        ? allUsers.filter(
                            (user) => user.id.toString() === dataToSend.dadId
                          )[0]?.apellido || ''
                        : ''}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

            <Image
              style={styles.frameChild}
              contentFit="cover"
              source={require('../../../assets/line-811.png')}
            />

            <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
              <View style={styles.nombreCompletoParent}>
                <Text
                  style={[
                    styles.cambiarFotoDe,
                    styles.brunoPhamTypo,
                    { marginBottom: 6 }
                  ]}
                >
                  Hermanos
                </Text>

                {usuario.brotherIds &&
                  usuario.brotherIds.map((e) => {
                    console.log(e, 'eeeeeeeeeeeee')
                    return (
                      <Text style={{ color: 'gray', marginBottom: 6 }}>
                        {`${allUsers.find((us) => us.id == e)?.username || e} ${allUsers.find((us) => us.id == e)?.apellido || ''}`}
                      </Text>
                    )
                  })}
              </View>
              <View style={{ alignItems: 'center', width: '20%' }}>
                <Pressable onPress={handleAddBrotherInput}>
                  <Text style={{ textAlign: 'center', fontSize: 22 }}>+</Text>
                </Pressable>
              </View>
            </View>
            {inputsBros &&
              inputsBros.slice(1).map((e, i) => (
                <View key={i} style={styles.nombreCompletoParent}>
                  <TouchableOpacity
                    style={{ marginBottom: 6 }}
                    onPress={() => {
                      if (editable) {
                        setInputSelected(i)
                        setShowTagBrother(true)
                      }
                    }}
                  >
                    <Text style={{ color: 'gray' }}>
                      {(e.input &&
                        `${allUsers.find((us) => us.id == e?.input)?.username || e?.input} ${allUsers.find((us) => us.id == e?.input)?.apellido || ''}`) ||
                        'Agregar hermano'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            <Image
              style={styles.frameChild}
              contentFit="cover"
              source={require('../../../assets/line-811.png')}
            />
            <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
              <View style={styles.nombreCompletoParent}>
                <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                  Estado Civíl
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  <TextInput
                    editable={editable}
                    onChangeText={(text) =>
                      setDataToSend({ ...dataToSend, ['maritalStatus']: text })
                    }
                    style={[styles.brunoPham, styles.brunoPhamTypo]}
                    ref={nombreInputRef}
                    value={dataToSend.maritalStatus}
                    placeholder={dataToSend.maritalStatus || 'Estado Civíl'}
                  />
                </View>
              </View>
            </View>
            <Image
              style={styles.frameChild}
              contentFit="cover"
              source={require('../../../assets/line-811.png')}
            />
          </View>
          <LinearGradient
            style={styles.button}
            locations={[0, 1]}
            colors={['#dee274', '#7ec18c']}
          >
            <TouchableOpacity
              style={[styles.pressable, styles.pressableFlexBox]}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.signIn}>Guardar</Text>
            </TouchableOpacity>
          </LinearGradient>

          {modalCreate && (
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalCreate}
            >
              <TouchableWithoutFeedback onPress={() => setModalCreate(false)}>
                <View style={styles.modalOverlay}>
                  <View style={{ width: '100%', height: '100%' }}>
                    <ENTRADACREADA
                      onClose={onCloseModalCreate}
                      message={'Guardado!'}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    )
  } else {
    return (
      <View style={{ zIndex: 9999, height: '100%' }}>
        <CameraView
          ref={cameraReff}
          facing={facing}
          style={{ flex: 1 }}
          mode="picture"
          FocusMode="on"
          onCameraReady={(e) => console.log(e, 'esto es e')}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row'
            }}
          >
            <TouchableOpacity
              style={{ position: 'absolute', top: 49, left: 20 }}
              onPress={() => setShowCamera(false)}
            >
              <Image
                style={{
                  height: 16,
                  width: 16
                }}
                contentFit="cover"
                source={require('../../../assets/group-565.png')}
              />
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
                onPress={takePicture}
                style={{
                  width: 60,
                  height: 60,
                  bottom: 100,
                  borderRadius: 100,
                  backgroundColor: '#cecece',

                  color: 'white'
                }}
              ></TouchableOpacity>
              <TouchableOpacity
                onPress={changePictureMode}
                style={{
                  position: 'absolute',
                  right: 20,
                  bottom: 100,
                  color: 'white',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Entypo name="cycle" color={'#fff'} size={25} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  frameParent: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: 10
  },
  viewContainer: {
    backgroundColor: Color.white,
    flex: 1
  },
  perfilItem: {
    height: 130,
    width: 130
  },
  parentFlexBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  brunoPhamTypo: {
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    width: '100%'
  },
  vectorIconLayout: {
    height: 21,
    width: 21
  },
  frameContainerFlexBox: {
    flexDirection: 'row'
  },
  pressableFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  cambiarFotoDe: {
    color: Color.negro,
    textAlign: 'left',
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 19,
    fontSize: FontSize.size_base
  },
  brunoPham: {
    color: Color.grisGeneral,
    marginTop: 10,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 19,
    fontSize: FontSize.size_base
  },
  nombreCompletoParent: {
    width: '80%'
  },
  vectorIcon1: {
    marginLeft: 20
  },
  frameContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  frameChild: {
    height: '0.5%',
    width: 388,
    marginTop: 20
  },
  deleteIcon: {
    width: 18,
    height: 20,
    overflow: 'hidden'
  },
  eliminarDatos: {
    fontSize: FontSize.size_lg,
    lineHeight: 22,
    marginLeft: 15,
    color: Color.negro,
    textAlign: 'left',
    fontWeight: '500',
    letterSpacing: 0
  },
  deleteParent: {
    marginTop: 38,
    alignItems: 'center'
  },
  signIn: {
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.white,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base,
    flex: 1
  },
  pressable: {
    borderRadius: Border.br_11xl,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton
  },
  button: {
    marginTop: 38,
    borderRadius: Border.br_11xl
  },
  icon: {
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  image6Icon: {
    top: 3,
    width: 87,
    height: 55
  },
  documentIcon: {
    overflow: 'hidden'
  },
  parentIcons: {
    alignItems: 'center',
    flexDirection: 'row',
    top: '5%'
  },
  iconlylightOutlinecalendarParent: {
    width: '100%',
    left: '45%',
    flexDirection: 'row'
  },
  iconlylightOutlinecalendar: {
    height: 24,
    width: 24
  },
  documentIconLayout: {
    marginLeft: 30,
    height: 24,
    width: 24
  },
  backParent: {},
  icon: {
    height: '100%',
    overflow: 'hidden'
  },
  iconLayout1: {
    width: '100%',
    overflow: 'hidden'
  },
  ajustes: {
    fontSize: FontSize.size_5xl,
    marginLeft: 20,
    textAlign: 'left',
    color: Color.negro,
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  centralContainer: {
    left: '3%'
  },
  modalOverlay: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default PerfilConfiguracion
