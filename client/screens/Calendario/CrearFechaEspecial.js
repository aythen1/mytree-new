import React, { useEffect, useState } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  Modal,
  ScrollView,
  TextInput
} from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import {
  FontFamily,
  Padding,
  FontSize,
  Color,
  Border
} from '../../GlobalStyles'
import ENTRADACREADA from '../../components/ENTRADACREADA'
import PopUpCalendario from '../../components/PopUpCalendario'
import UbicacionSVG from '../../components/svgs/UbicacionSVG'
import AñadirUsuarioSVG from '../../components/svgs/AñadirUsuarioSVG'
import Etiquetar from '../../components/Etiquetar'
import OpcionesCaategora from '../../components/OpcionesCaategora'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { createEvent } from '../../redux/actions/events'
import Privacidad from '../Privacidad'
import ImagePickerModal from '../Modals/ImagePickerModal'

const CrearFechaEspecial = () => {
  const [user, setUser] = useState()
  const navigation = useNavigation()
  const [description, setDescription] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [location, setLocation] = useState()
  const [invitedUsers, setInvitedUsers] = useState([])
  const [selectedCategory, setSelectedCategory] = useState()

  const [modalCreate, setModalCreate] = useState(false)
  const [programar, setProgramar] = useState(false)
  const [calendario, setCalendario] = useState(false)
  const [showTagUsers, setShowTagUsers] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showPrivacidad, setShowPrivacidad] = useState(false)
  const [privacy, setPrivacy] = useState('Todos')
  const [showPickImage, setShowPickImage] = useState(false)
  const [pickedImage, setPickedImage] = useState([])

  const getUser = async () => {
    const usuario = await AsyncStorage.getItem('user')
    const user = JSON.parse(usuario)
    setUser(user)
  }

  useEffect(() => {
    getUser()
  }, [])

  const onCloseModalCreate = () => {
    setModalCreate(false)
  }

  const openCalendario = () => {
    setCalendario(true)
  }

  const closeCalendario = () => {
    setCalendario(false)
  }
  const dispatch = useDispatch()
  const handleCreateEvent = async () => {
    if (
      description.length > 0 &&
      selectedCategory &&
      location.length > 0 &&
      selectedDate &&
      invitedUsers.length > 0
    ) {
      const event = {
        type: 'special',
        creatorId: user?.id.toString(),
        description,
        title: selectedCategory,
        location,
        shared: false,
        images: [],
        privacyMode: privacy,
        wishList: [],
        date: new Date(selectedDate),
        invitedUsers
      }
      const cloudinaryUrls = []

      for (const image of pickedImage) {
        const formData = new FormData()
        formData.append('file', {
          uri: image.uri,
          type: 'image/jpeg',
          name: image.filename
        })
        formData.append('upload_preset', 'cfbb_profile_pictures')
        formData.append('cloud_name', 'dnewfuuv0')

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dnewfuuv0/image/upload',
          {
            method: 'POST',
            body: formData
          }
        )

        const data = await response.json()
        if (response.ok) {
          cloudinaryUrls.push(data.secure_url)
        } else {
          console.error('Error uploading image:', data)
        }
      }

      event.coverImage = cloudinaryUrls[0]
      console.log('creating special date with values: ', event)
      dispatch(createEvent(event))
    }
  }

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={[styles.crearEvento]}>
        <View>
          <View style={styles.image6Wrapper}>
            <Image
              style={styles.image6Icon}
              contentFit="cover"
              source={require('../../assets/image-6.png')}
            />
          </View>
          <View style={[styles.backParent, styles.buttonBarFlexBox]}>
            <Pressable
              style={styles.backLayout}
              onPress={() => navigation.goBack()}
            >
              <Image
                style={styles.iconLayout}
                contentFit="cover"
                source={require('../../assets/back.png')}
              />
            </Pressable>
            <Text style={[styles.crearEventoText, styles.titleTypo]}>
              Crear fecha especial
            </Text>
          </View>
        </View>

        <View>
          <View style={styles.titleBase}>
            <Text style={[styles.title, styles.titleTypo]}>Categoría</Text>
          </View>
          <Pressable
            onPress={() => setShowCategoryModal(true)}
            style={{
              paddingVertical: 13,
              backgroundColor: Color.fAFAFA,
              borderRadius: Border.br_3xs,
              paddingHorizontal: Padding.p_xl,
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{ color: selectedCategory ? '#000' : '#606060' }}>
              {selectedCategory || 'Selecione la categoría'}
            </Text>

            <Image
              contentFit="cover"
              style={{ width: 20, height: 20, marginRight: 10 }}
              source={require('../../assets/downArrow.png')}
            />
          </Pressable>
        </View>

        <View>
          <View style={styles.titleBase}>
            <Text style={[styles.title, styles.titleTypo]}>Descripción</Text>
          </View>
          <TextInput
            multiline={true}
            numberOfLines={4}
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={{
              textAlignVertical: 'top',
              paddingVertical: Padding.p_smi,
              backgroundColor: Color.fAFAFA,
              borderRadius: Border.br_3xs,
              paddingHorizontal: Padding.p_xl,
              flexDirection: 'row',
              width: '100%'
            }}
            placeholder="Descripción de la fecha especial"
          />
        </View>

        <View>
          <View style={styles.titleBase}>
            <Text style={[styles.title, styles.titleTypo]}>Fecha</Text>
          </View>

          <Pressable
            onPress={openCalendario}
            style={{
              paddingVertical: 13,
              backgroundColor: Color.fAFAFA,
              borderRadius: Border.br_3xs,
              paddingHorizontal: Padding.p_xl,
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between'
            }}
          >
            <Text style={{ color: selectedDate ? '#000' : '#606060' }}>
              {selectedDate || 'Selecciona una fecha'}
            </Text>

            <Image
              contentFit="cover"
              style={{ width: 22, height: 22, marginRight: 13 }}
              source={require('../../assets/vector14.png')}
            />
          </Pressable>
        </View>
        <View>
          <View style={styles.titleBase}>
            <Text style={[styles.title, styles.titleTypo]}>
              Selecciona una foto de portada
            </Text>
          </View>

          <Pressable
            onPress={() => setShowPickImage(true)}
            style={{
              paddingVertical: 13,
              backgroundColor: Color.fAFAFA,
              borderRadius: Border.br_3xs,
              paddingHorizontal: Padding.p_xl,
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between'
            }}
          >
            <Text
              style={{ color: invitedUsers.length > 0 ? '#000' : '#606060' }}
            >
              {pickedImage ? 'Cambiar foto' : 'Seleccionar foto'}
            </Text>
            <Image
              style={{ width: 23, height: 24, marginRight: 13 }}
              contentFit="cover"
              source={require('../../assets/image3.png')}
            />
          </Pressable>
        </View>

        <View>
          <View style={styles.titleBase}>
            <Text style={[styles.title, styles.titleTypo]}>Ubicación</Text>
          </View>

          <View style={styles.fieldSpaceBlock2}>
            <TextInput
              value={location}
              onChangeText={(text) => setLocation(text)}
              placeholder="Ubicacion"
            />
            <Pressable>
              <UbicacionSVG />
            </Pressable>
          </View>
        </View>

        <View>
          <View style={styles.titleBase}>
            <Text style={[styles.title, styles.titleTypo]}>
              Etiqueta a tus invitados
            </Text>
          </View>

          <Pressable
            onPress={() => setShowTagUsers(true)}
            style={{
              paddingVertical: 13,
              backgroundColor: Color.fAFAFA,
              borderRadius: Border.br_3xs,
              paddingHorizontal: Padding.p_xl,
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between'
            }}
          >
            <Text
              style={{ color: invitedUsers.length > 0 ? '#000' : '#606060' }}
            >
              {invitedUsers.length === 0 ? 'Agrega invitados' : 'Ver invitados'}
            </Text>
            <AñadirUsuarioSVG />
          </Pressable>
        </View>

        <Pressable
          onPress={() => setShowPrivacidad(true)}
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <View style={styles.titleBase}>
            <Text style={[styles.title, styles.titleTypo]}>
              Opciones de Privacidad
            </Text>
          </View>
          <Image
            contentFit="cover"
            style={{ width: 20, height: 20, marginRight: 10 }}
            source={require('../../assets/grayRightArrow.png')}
          />
        </Pressable>

        <View style={styles.button2}>
          <Pressable
            style={[styles.button, styles.buttonSpaceBlock]}
            onPress={() => navigation.navigate('CALENDARIO')}
          >
            <Text style={[styles.signIn, styles.signTypo]}>Cancelar</Text>
          </Pressable>
        </View>
        <LinearGradient
          style={styles.button2}
          locations={[0, 1]}
          colors={['#dee274', '#7ec18c']}
        >
          <Pressable
            style={[styles.pressable1, styles.pressableFlexBox]}
            onPress={() => {
              handleCreateEvent()
              setModalCreate(true)
            }}
          >
            <Text style={[styles.signIn2, styles.signTypo]}>Enviar</Text>
          </Pressable>
        </LinearGradient>

        <View style={styles.frameChild} />
      </View>

      <Modal animationType="slide" transparent visible={modalCreate}>
        <View style={styles.buttonContainer2Overlay}>
          <Pressable
            style={styles.buttonContainer2Bg}
            onPress={() => setModalCreate(false)}
          />
          <ENTRADACREADA
            onClose={onCloseModalCreate}
            message={'Enviado!'}
            isNavigate={'CALENDARIO'}
          />
        </View>
      </Modal>

      <Modal animationType="slide" transparent visible={programar}>
        <View style={styles.buttonContainer2Overlay}>
          <Pressable
            style={styles.buttonContainer2Bg}
            onPress={() => setProgramar(false)}
          />
          <PopUpCalendario
            setButtonContainer2Visible={() => {}}
            setCalendario={setProgramar}
          />
        </View>
      </Modal>

      <Modal animationType="slide" transparent visible={calendario}>
        <View style={styles.iconlyLightOutlineCalendarOverlay}>
          <Pressable
            style={styles.iconlyLightOutlineCalendarBg}
            onPress={closeCalendario}
          />
          <PopUpCalendario
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setButtonContainer2Visible={() => {}}
            setCalendario={setCalendario}
          />
        </View>
      </Modal>
      <Modal animationType="slide" transparent visible={showTagUsers}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(113, 113, 113, 0.3)',
            height: '100%'
          }}
        >
          <Pressable
            style={{ width: '100%', height: '100%', left: 0, top: 0 }}
            onPress={() => setShowTagUsers(false)}
          />
          <Etiquetar
            taggedUsers={invitedUsers}
            setTaggedUsers={setInvitedUsers}
            onClose={() => setShowTagUsers(false)}
          />
        </View>
      </Modal>
      <Modal animationType="slide" transparent visible={showCategoryModal}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(113, 113, 113, 0.3)',
            height: '100%'
          }}
        >
          <Pressable
            style={{ width: '100%', height: '100%', left: 0, top: 0 }}
            onPress={() => setShowCategoryModal(false)}
          />
          <OpcionesCaategora
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onClose={() => setShowCategoryModal(false)}
          />
        </View>
      </Modal>
      <Modal animationType="fade" transparent visible={showPrivacidad}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(113, 113, 113, 0.3)',
            height: '100%'
          }}
        >
          <Pressable
            style={{ width: '100%', height: '100%', left: 0, top: 0 }}
            onPress={() => setShowPrivacidad(false)}
          />
          <Privacidad
            privacy={privacy}
            setPrivacy={setPrivacy}
            onClose={() => setShowPrivacidad(false)}
          />
        </View>
      </Modal>
      <Modal animationType="slide" transparent visible={showPickImage}>
        <View
          style={{
            backgroundColor: 'rgba(113, 113, 113, 0.7)',
            height: '100%'
          }}
        >
          <Pressable
            style={{ width: '100%', height: '100%', left: 0, top: 0 }}
            onPress={() => setShowPickImage(false)}
          />
          <ImagePickerModal
            fromEvent={true}
            pickedImages={pickedImage}
            setPickedImages={setPickedImage}
            onClose={() => setShowPickImage(false)}
          />
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  titleTypo: {
    textAlign: 'left',
    letterSpacing: 0,
    fontFamily: FontFamily.lato
  },
  buttonSpaceBlock: {
    paddingBottom: Padding.p_5xs,
    paddingTop: Padding.p_6xs,
    flex: 1
  },
  signTypo: {
    textAlign: 'center',
    fontFamily: FontFamily.lato
  },
  pressableFlexBox: {
    backgroundColor: Color.linearBoton,
    borderRadius: Border.br_11xl,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    color: '#242424',
    fontWeight: '500',
    lineHeight: 19,
    fontSize: FontSize.size_base,
    textAlign: 'left',
    letterSpacing: 0
  },
  fieldSpaceBlock: {
    paddingVertical: Padding.p_smi,
    backgroundColor: Color.fAFAFA,
    borderRadius: Border.br_3xs,
    paddingHorizontal: Padding.p_xl,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 20
  },
  fieldSpaceBlock2: {
    paddingVertical: 10,
    backgroundColor: Color.fAFAFA,
    borderRadius: Border.br_3xs,
    paddingHorizontal: Padding.p_xl,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  descriptionField: {
    paddingVertical: Padding.p_smi,
    backgroundColor: Color.fAFAFA,
    borderRadius: Border.br_3xs,
    paddingHorizontal: Padding.p_xl,
    flexDirection: 'row',
    width: '100%',
    height: 100
  },
  signIn: {
    lineHeight: 21,
    fontSize: FontSize.size_sm,
    textAlign: 'center',
    letterSpacing: 0,
    color: '#dee274'
  },
  button: {
    borderStyle: 'solid',
    borderColor: Color.colorKhaki_100,
    borderWidth: 1,
    height: 52,
    borderRadius: Border.br_11xl,
    paddingBottom: Padding.p_5xs,
    paddingTop: Padding.p_6xs,
    paddingHorizontal: Padding.p_base,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.white
  },
  signIn2: {
    letterSpacing: 1,
    color: Color.white,
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
    marginTop: '5%',
    borderRadius: Border.br_11xl
  },
  frameChild: {
    padding: Padding.p_3xs,
    height: 105,
    marginTop: 8,
    backgroundColor: Color.white
  },
  back: {
    height: 24,
    width: 24
  },
  backParent: {
    marginBottom: 15
  },
  crearEvento: {
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: Padding.p_xl,
    gap: 10,
    marginBottom: -10
  },
  titleBase: {
    paddingBottom: Padding.p_7xs,
    flexDirection: 'row'
  },
  image6Icon: {
    width: 87,
    height: 55
  },
  image6Wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3
  },
  buttonBarFlexBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backLayout: {
    height: 24,
    width: 24
  },
  crearEventoText: {
    fontSize: FontSize.size_5xl,
    fontWeight: '700',
    color: Color.negro,
    marginLeft: 20
  },
  iconLayout: {
    height: '100%',
    width: '100%'
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
  iconlyLightOutlineCalendarOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  iconlyLightOutlineCalendarBg: {
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  }
})

export default CrearFechaEspecial
