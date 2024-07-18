import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import { Image } from 'expo-image'
import {
  Color,
  FontFamily,
  FontSize,
  Border,
  Padding
} from '../../GlobalStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import BarraBusqueda from '../../components/BarraBusqueda'
import CalendarCheckSVG from '../../components/svgs/CalendarCheckSVG'
import RegaloSVG from '../../components/svgs/RegaloSVG'
import AñadirUsuarioSVG from '../../components/svgs/AñadirUsuarioSVG'
import { useDispatch, useSelector } from 'react-redux'
import { Context } from '../../context/Context'
import { Camera, CameraView, useCameraPermissions } from 'expo-camera'
import ImagePickerModal from '../Modals/ImagePickerModal'
import imageMultiPickerModal from '../Modals/imageMultiPickerModal'
import ImageMultiPickerModal from '../Modals/imageMultiPickerModal'
import { getAllUserEvents, updateEvent } from '../../redux/actions/events'
import axiosInstance from '../../apiBackend'

const Eventos = ({ route }) => {
  const event_name = route?.params?.title
  const event_desc = route?.params?.description
  const event_invites = route?.params?.invites
  const event_wishList = route?.params?.wishListItems
  const event_id = route?.params?.id
  const event_images = route?.params?.images

  const navigation = useNavigation()
  const { allUsers, userData } = useSelector((state) => state.users)

  console.log(route?.params, 'asdasfasfasfas')
  const [selected, setSelected] = useState(null)
  const [description, setDescription] = useState(event_desc)

  const [modalVisible, setModalVisible] = useState(false)
  const [whisModalVisible, setWishModalVisible] = useState(false)
  const [pictureModalVisible, setPictureWishModalVisible] = useState(false)
  const [pickedImage, setPickedImage] = useState([])

  const [selectedImage, setSelectedImage] = useState(null)
  const { pickImage, provisoryProfileImage, profileImage } = useContext(Context)

  const [selectedUsers, setSelectedUsers] = useState([])

  const toggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  const cameraReff = useRef(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
    })()
  }, [])

  const takePicture = async () => {
    if (cameraReff) {
      const photo = await cameraReff.current.takePictureAsync()
      setSelectedImage(photo)
      pickImage('profile', photo?.uri)
      setShowCamera(false)
    }
  }

  const changePictureMode = async () => {
    setFacing((prev) => (prev == 'back' ? 'front' : 'back'))
  }

  function transformHttpToHttps(url) {
    if (url.startsWith('http://')) {
      return url.replace('http://', 'https://')
    } else {
      return url
    }
  }

  const pickImagen = async (imageUri) => {
    if (imageUri) {
      const profileImageData = {
        uri: imageUri,
        type: 'image/jpg',
        name: imageUri?.split('/')?.reverse()[0]?.split('.')[0]
      }

      const profileImageForm = new FormData()
      profileImageForm.append('file', profileImageData)
      profileImageForm.append('upload_preset', 'cfbb_profile_pictures')
      profileImageForm.append('cloud_name', 'dnewfuuv0')

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dnewfuuv0/image/upload',
        {
          method: 'post',
          body: profileImageForm
        }
      )
        .then((res) => res.json())
        .then((data) => {
          return data.url
        })
      console.log(res, 'fuynca')
      return transformHttpToHttps(res)
    }
  }
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(pickedImage, 'pickeddd')
  }, [pickedImage])

  const submit = async () => {
    const images = []

    for (let index = 0; index < pickedImage.length; index++) {
      const url = pickedImage[index].uri
      const uploadedUrl = await pickImagen(url)
      if (uploadedUrl) {
        images.push(uploadedUrl)
      }
    }

    console.log(images, 'uploaded images')

    let data
    if (description) {
      data = { description }
    }
    if (images.length > 0) {
      data = { images }
    }
    if (description && images.length > 0) {
      data = { images, description }
    }
    console.log(data, 'dataaa')
    axiosInstance
      .patch(`/events/${event_id}`, data)
      .then(() => dispatch(getAllUserEvents(userData.id)))
    navigation.goBack()
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 130 }}
      style={styles.scrollView}
    >
      <Image
        style={styles.image6Icon}
        contentFit="cover"
        source={require('../../assets/image-6.png')}
      />
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require('../../assets/back.png')}
          />
        </Pressable>
        <Text style={styles.eventos}>Eventos</Text>
      </View>
      <BarraBusqueda />

      <View style={styles.bottomContainer}>
        <View style={styles.viewContainer}>
          <Pressable
            onPress={() => setSelected(!selected)}
            style={styles.boxContainer}
          >
            <View style={styles.textContainer}>
              <Text style={styles.subTitle}>{event_name}</Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 18 }}
            >
              {selected ? (
                <Image
                  style={{ width: 20, height: 18 }}
                  contentFit="scale-down"
                  source={require('../../assets/arrow2.png')}
                ></Image>
              ) : (
                <Image
                  style={{ width: 20, height: 18 }}
                  contentFit="scale-down"
                  source={require('../../assets/arrow1.png')}
                ></Image>
              )}
              <CalendarCheckSVG />
            </View>
          </Pressable>
          {selected && (
            <View style={styles.selected}>
              <View style={styles.optionContainer}>
                <Text style={styles.subTitle}>Descripción</Text>
                <TextInput
                  value={description}
                  onChangeText={(e) => setDescription(e)}
                  placeholder={event_desc}
                  style={styles.inputContainer}
                />
              </View>
              <View style={styles.optionContainer}>
                <Text style={styles.subTitle}>Tus invitados</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={styles.inputContainer}
                >
                  <Text style={{ color: 'gray' }}>Entra a la lista</Text>
                  <AñadirUsuarioSVG />
                </TouchableOpacity>
              </View>
              <View style={styles.optionContainer}>
                <Text style={styles.subTitle}>Deseos</Text>
                <TouchableOpacity
                  onPress={() => setWishModalVisible(true)}
                  style={styles.inputContainer}
                >
                  <Text style={{ color: 'gray' }}>Comprueba la lista</Text>
                  <RegaloSVG />
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <LinearGradient
                  style={styles.button}
                  locations={[0, 1]}
                  colors={['#dee274', '#7ec18c']}
                >
                  <Pressable
                    onPress={() => navigation.navigate('MasDetallesEventos')}
                  >
                    <Text style={styles.save}>Más detalles</Text>
                  </Pressable>
                </LinearGradient>
                <TouchableOpacity
                  onPress={() => setPictureWishModalVisible(true)}
                  style={{
                    width: '100%',
                    justifyContent: 'center'
                  }}
                >
                  <LinearGradient
                    style={styles.button}
                    locations={[0, 1]}
                    colors={['#dee274', '#7ec18c']}
                  >
                    <Text style={styles.save}>Añadir recuerdos</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {selected && (
            <View style={{ flexDirection: 'row', paddingBottom: 100, gap: 2 }}>
              {event_images.length < 1 && pickedImage.length < 1 && (
                <View style={{width:"100%",height:90,flexDirection:"row",gap:2}}>
                  <Image
                    source={require('../../assets/coverpicture.png')}
                    style={{ width: '25%', height: 90 }}
                  ></Image>
                  <Image
                    source={require('../../assets/coverpicture.png')}
                    style={{ width: '25%', height: 90 }}
                  ></Image>
                  <Image
                    source={require('../../assets/coverpicture.png')}
                    style={{ width: '25%', height: 90 }}
                  ></Image>
                  <Image
                    source={require('../../assets/coverpicture.png')}
                    style={{ width: '25%', height: 90 }}
                  ></Image>
                </View>
              )}
              {event_images &&
                event_images.map((e) => {
                  return (
                    <Image
                      source={
                        e
                          ? { uri: e }
                          : require('../../assets/coverpicture.png')
                      }
                      style={{ width: '25%', height: 90 }}
                    ></Image>
                  )
                })}
              {pickedImage &&
                pickedImage.map((e) => {
                  return (
                    <Image
                      source={
                        e?.uri
                          ? { uri: e?.uri }
                          : require('../../assets/coverpicture.png')
                      }
                      style={{ width: '25%', height: 90 }}
                    ></Image>
                  )
                })}
              <TouchableOpacity
                onPress={() => submit()}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  position: 'absolute',
                  bottom: 10
                }}
              >
                <LinearGradient
                  style={{ ...styles.button, alignSelf: 'center' }}
                  locations={[0, 1]}
                  colors={['#dee274', '#7ec18c']}
                >
                  <Text style={styles.save}>Guardar</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <Modal
        visible={modalVisible}
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 15,
              gap: 15
            }}
            style={{
              height: 300,
              width: '100%',
              backgroundColor: 'white',
              bottom: 0,
              position: 'absolute'
            }}
          >
            {event_invites &&
              event_invites.map((inv) => {
                const e = allUsers.find((u) => u.id == inv.userId)
                if (e) {
                  return (
                    <TouchableOpacity
                      key={e.id} // make sure each child in a list has a unique "key" prop
                      style={{
                        borderBottomWidth: 1,
                        borderColor: 'gray',
                        width: '100%',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingBottom: 10,
                        justifyContent: 'space-between'
                      }}
                      onPress={() => toggleUserSelection(e.id)}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 8
                        }}
                      >
                        <Image
                          style={{ width: 40, height: 40, borderRadius: 100 }}
                          source={
                            e.profilePicture
                              ? { uri: e.profilePicture }
                              : require('../../assets/aatar6.png')
                          }
                        />
                        <Text>{e.username}</Text>
                      </View>
                      <View style={{}}>
                        <Text>{inv.status}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                }
              })}
          </ScrollView>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        visible={whisModalVisible}
        transparent
        onRequestClose={() => setWishModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setWishModalVisible(false)}>
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 15,
              gap: 15
            }}
            style={{
              height: 300,
              width: '100%',
              backgroundColor: 'white',
              bottom: 0,
              position: 'absolute'
            }}
          >
            {event_wishList &&
              event_wishList.map((e) => {
                // const e = allUsers.find((u) => u.id == inv.userId)
                // if(e){
                return (
                  <TouchableOpacity
                    key={e.id} // make sure each child in a list has a unique "key" prop
                    style={{
                      borderBottomWidth: 1,
                      borderColor: 'gray',
                      width: '100%',
                      alignItems: 'center',
                      flexDirection: 'row',
                      paddingBottom: 10,
                      justifyContent: 'space-between'
                    }}
                    onPress={() => toggleUserSelection(e.id)}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 8
                      }}
                    >
                      {/* <Image
                        style={{ width: 40, height: 40, borderRadius: 100 }}
                        source={
                          e.profilePicture
                            ? { uri: e.profilePicture }
                            : require('../../assets/aatar6.png')
                        }
                      /> */}
                      <Text>{e.description}</Text>
                    </View>
                    {e.takeBy && (
                      <View style={{}}>
                        <Text>{e.takeBy}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                )
              })}
          </ScrollView>
        </TouchableWithoutFeedback>
      </Modal>
      {/* <Modal
        visible={pictureModalVisible}
        transparent
        onRequestClose={() => setPictureWishModalVisible(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setPictureWishModalVisible(false)}
        >
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 15,
              gap: 15
            }}
            style={{
              height: 300,
              width: '100%',
              backgroundColor: 'white',
              bottom: 0,
              position: 'absolute'
            }}
          >
            <TouchableOpacity>
              <Text>Tomar foto</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pickImage('')}>
              <Text>Elegir de la galeria</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </Modal> */}
      <Modal animationType="slide" transparent visible={pictureModalVisible}>
        <View
          style={{
            backgroundColor: 'rgba(113, 113, 113, 0.7)',
            height: '100%'
          }}
        >
          <Pressable
            style={{ width: '100%', height: '100%', left: 0, top: 0 }}
            onPress={() => setPictureWishModalVisible(false)}
          />
          <ImageMultiPickerModal
            fromEvent={false}
            pickedImages={pickedImage}
            setPickedImages={setPickedImage}
            onClose={() => setPictureWishModalVisible(false)}
          />
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10
  },
  image6Icon: {
    width: 87,
    height: 55
  },
  container: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 15
  },
  icon: {
    height: 20,
    width: 20
  },
  eventos: {
    fontSize: FontSize.size_5xl,
    color: Color.negro,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  bottomContainer: {
    flex: 1
  },
  viewContainer: {
    backgroundColor: Color.colorWhitesmoke_200,
    borderRadius: Border.br_base,
    marginTop: 10
  },
  boxContainer: {
    height: 100,
    borderRadius: Border.br_base,
    backgroundColor: Color.colorWhitesmoke_200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  selected: {
    // alignItems: 'center',
    padding: 20
  },
  textContainer: {
    flexDirection: 'column',
    gap: 10
  },
  subTitle: {
    color: Color.primario1,
    fontWeight: '600',
    fontSize: 15
  },
  name: {
    color: Color.gris
  },
  inputContainer: {
    paddingVertical: Padding.p_smi,
    backgroundColor: Color.fAFAFA,
    borderRadius: Border.br_3xs,
    paddingHorizontal: Padding.p_xl,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'space-between'
  },
  optionContainer: {
    height: 100
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
    marginTop: 10
  },
  button: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Border.br_11xl,
    width: '47%'
  },
  save: {
    letterSpacing: 1,
    fontSize: FontSize.size_mini,
    textAlign: 'center',
    color: Color.white,
    fontFamily: FontFamily.lato,
    lineHeight: 24
  }
})
export default Eventos
