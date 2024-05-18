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
import CalendarSVG from '../../components/svgs/CalendarSVG'
import UbicacionSVG from '../../components/svgs/UbicacionSVG'
import AñadirUsuarioSVG from '../../components/svgs/AñadirUsuarioSVG'
import RegaloSVG from '../../components/svgs/RegaloSVG'
import Etiquetar from '../../components/Etiquetar'
import CreateWishListModal from '../../components/CreateWishListModal'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createEvent } from './../../redux/actions/events'

const CrearFechaEspecial = () => {
  const [user, setUser] = useState()
  const navigation = useNavigation()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [location, setLocation] = useState('')
  const [invitedUsers, setInvitedUsers] = useState([])
  const [wishList, setWishList] = useState([])

  const [modalCreate, setModalCreate] = useState(false)
  const [programar, setProgramar] = useState(false)
  const [calendario, setCalendario] = useState(false)
  const [showTagUsers, setShowTagUsers] = useState(false)
  const [showWishList, setShowWishList] = useState(false)

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
      title.length > 0 &&
      location.length > 0 &&
      selectedDate &&
      invitedUsers.length > 0 &&
      wishList.length > 0
    ) {
      const event = {
        type: 'normal event',
        creatorId: user?.id.toString(),
        description,
        title,
        location,
        shared: false,
        wishList,
        date: new Date(selectedDate),
        invitedUsers
      }
      console.log('creating event with values: ', event)
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
              Crear evento
            </Text>
          </View>
        </View>

        <View>
          <View style={styles.titleBase}>
            <Text style={[styles.title, styles.titleTypo]}>
              Titulo del evento
            </Text>
          </View>
          <TextInput
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={{
              paddingVertical: Padding.p_smi,
              backgroundColor: Color.fAFAFA,
              borderRadius: Border.br_3xs,
              paddingHorizontal: Padding.p_xl,
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              gap: 20
            }}
            placeholder="Nombre del evento"
          />
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
            placeholder="Descripción del evento"
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

        <View>
          <View style={styles.titleBase}>
            <Text style={[styles.title, styles.titleTypo]}>
              Lista de deseos
            </Text>
          </View>
          <Pressable
            onPress={() => setShowWishList(true)}
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
            <Text style={{ color: wishList.length > 0 ? '#000' : '#606060' }}>
              {wishList.length === 0
                ? 'Crea tu lista de deseos'
                : 'Ver lista de deseos'}
            </Text>
            <Image
              contentFit="cover"
              style={{ width: 22, height: 22, marginRight: 13 }}
              source={require('../../assets/gift.png')}
            />
          </Pressable>
        </View>

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
      <Modal animationType="slide" transparent visible={showWishList}>
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
            onPress={() => setShowWishList(false)}
          />
          <CreateWishListModal
            wishList={wishList}
            setWishList={setWishList}
            onClose={() => setShowWishList(false)}
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
    color: Color.textTextPrimary,
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
    padding: Padding.p_xl,
    gap: 10
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
