import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Button
} from 'react-native'
import { Image } from 'expo-image'
import {
  Border,
  Padding,
  FontFamily,
  FontSize,
  Color
} from '../../GlobalStyles'
import Post from '../../components/Post'
import Stories from '../../components/Stories'
import RetosModal from '../Retos/RetosModal'
import VotacionDeRetos from '../VotacionDeRetos'
import MenuPrincipal from '../../components/MenuPrincipal'
import HeaderIcons from '../../components/HeaderIcons'
import LupaSVG from '../../components/svgs/LupaSVG'
import MessageSVG from '../../components/svgs/MessageSVG'
import NotificationsMuroSVG from '../../components/svgs/NotificationsMuroSVG'
import CalendarMuroSVG from '../../components/svgs/CalendarMuroSVG'
import SettingMuroSVG from '../../components/svgs/SettingMuroSVG'
import { useNavigation, useRoute } from '@react-navigation/native'
import { setPanel } from '../../redux/slices/panel.slices'
import StoriesVideosDiarios from '../../components/StoriesVideosDiarios'
import { LinearGradient } from 'expo-linear-gradient'
import { Context } from '../../context/Context'
import Compartir from '../../components/Compartir'
import Etiquetados from '../../components/Etiquetados'
import { getUsers } from '../../redux/slices/user.slices'
import { getAllUsers, getUserData } from '../../redux/actions/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAllNotifications } from '../../redux/actions/notifications'
import { getAllEvents } from '../../redux/actions/events'
import axiosInstance from '../../apiBackend'
import CommentsModal from '../../components/modals/CommentsModal'
import { updateSelectedPostComments } from '../../redux/slices/comments.slices'

const Muro = () => {
  const {
    showShareModal,
    setShowShareModal,
    showTaggedsModal,
    setShowTaggedsModal,
    showCommentsModal,
    setShowCommentsModal
  } = useContext(Context)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const queryParams = route.params
  const { showPanel } = useSelector((state) => state.panel)
  const [user, setUser] = useState()
  const [showModalRetos, setShowModalRetos] = useState(false)
  const [colorClick, setColorClick] = useState(true)
  const [showRetos, setShowRetos] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)

  const handleMenu = () => {
    dispatch(setPanel(false))
  }
  const getUser = async () => {
    const usuario = await AsyncStorage.getItem('user')
    const user = JSON.parse(usuario)
    setUser(user)
  }
  useEffect(() => {
    if (queryParams?.invite && queryParams?.memberId) {
      console.log(user, 'user')
      setShowInviteModal(true)
    }
  }, [queryParams])

  useEffect(() => {
    getUser()
  }, [])
  useEffect(() => {
    if (user) {
      dispatch(getAllNotifications())
      dispatch(getUserData(user.id))
      dispatch(getAllUsers())
      dispatch(getAllEvents())
    }
  }, [user])

  const handleAceptInvitation = async () => {
    try {
      const res = await axiosInstance.patch(`/user/${user.id}`, {
        [queryParams.property]: queryParams.memberId
      })
      console.log(res.data, 'datasss')
      setShowInviteModal(false)
    } catch (error) {
      console.log(error, 'error')
    }
  }

  const openDrawer = () => {
    navigation.openDrawer()
  }

  return (
    <LinearGradient
      colors={['#fff', '#f1f1f1']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            paddingTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15,
            alignItems: 'flex-end'
          }}
        >
          <Pressable
            style={{
              width: 26,
              height: 20
            }}
            //onPress={() => dispatch(setPanel(!menuVisible))}
            onPress={openDrawer}
          >
            <Image
              style={{
                overflow: 'hidden',
                height: '100%',
                width: '100%'
              }}
              contentFit="cover"
              source={require('../../assets/ionmenu1.png')}
            />
          </Pressable>
          <View>
            <HeaderIcons
              icons={
                !showRetos
                  ? [
                      <Pressable
                        key={1000}
                        onPress={async () => {
                          await dispatch(getAllUsers())
                          navigation.navigate('Busqueda')
                        }}
                      >
                        <LupaSVG />
                      </Pressable>,
                      <MessageSVG key={2000} />,
                      <NotificationsMuroSVG
                        key={3000}
                        isNavigation={'PERFILNOTIFICACIONES'}
                      />
                    ]
                  : [
                      <MessageSVG key={3000} />,
                      <CalendarMuroSVG key={4000} />,
                      <SettingMuroSVG key={5000} />
                    ]
              }
            />
          </View>
        </View>

        <View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              width: '95%',
              alignSelf: 'center',
              justifyContent: 'center'
            }}
          >
            <View
              style={{
                backgroundColor: !colorClick
                  ? Color.backgroundPrimaryBackground
                  : Color.secundario,
                borderBottomLeftRadius: 5,
                borderTopLeftRadius: 5,
                width: '50%'
              }}
            >
              <Pressable
                style={{
                  paddingVertical: Padding.p_3xs,
                  paddingHorizontal: Padding.p_9xs,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderTopRightRadius: Border.br_3xs,
                  borderBottomRightRadius: Border.br_3xs
                }}
                onPress={() => {
                  setColorClick(true)
                  setShowRetos(false)
                }}
              >
                <Text
                  style={{
                    fontWeight: colorClick ? '700' : '300',
                    textAlign: 'center',
                    fontFamily: FontFamily.lato,
                    fontSize: FontSize.size_base,
                    color: colorClick ? '#fff' : Color.textPlaceholder
                  }}
                >
                  Familia
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                backgroundColor: colorClick
                  ? Color.backgroundPrimaryBackground
                  : Color.secundario,
                borderBottomRightRadius: 5,
                borderTopRightRadius: 5,
                width: '50%'
              }}
            >
              <Pressable
                style={{
                  paddingVertical: Padding.p_3xs,
                  paddingHorizontal: Padding.p_9xs,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderTopRightRadius: Border.br_3xs,
                  borderBottomRightRadius: Border.br_3xs
                }}
              >
                <Text
                  style={{
                    fontWeight: '300',
                    width: 70,
                    textAlign: 'center',
                    fontFamily: FontFamily.lato,
                    lineHeight: 19,
                    letterSpacing: 0,
                    fontSize: FontSize.size_base,
                    color: !colorClick ? '#fff' : Color.textPlaceholder
                  }}
                >
                  Retos
                </Text>
                <Text
                  style={{
                    borderRadius: Border.br_3xs,
                    backgroundColor: Color.grisClaro,
                    color: Color.white,
                    fontWeight: '300',
                    fontSize: FontSize.size_3xs,
                    width: 30,
                    height: 20,
                    lineHeight: 18,
                    textAlign: 'center'
                  }}
                >
                  Soon
                </Text>
              </Pressable>
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={showModalRetos}
          >
            <View
              style={{
                top: 100,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <RetosModal
                setShowRetos={setShowRetos}
                setShowModalRetos={setShowModalRetos}
              />
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={showInviteModal}
          >
            <Pressable
              style={{
                top: 300,
                height: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFFF',
                gap: 20
              }}
            >
              <Text>{queryParams?.name} te invito a su grupo familiar</Text>
              <View style={{ flexDirection: 'row', gap: 20 }}>
                <Button
                  onPress={() => handleAceptInvitation()}
                  title="Aceptar"
                ></Button>
                <Button
                  onPress={() => setShowInviteModal(false)}
                  title="Cancelar"
                ></Button>
              </View>
            </Pressable>
          </Modal>
          <StoriesVideosDiarios />
          {/* <Stories /> */}

          {showRetos ? <VotacionDeRetos /> : <Post padding={true} />}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showPanel}
          onRequestClose={() => dispatch(setPanel(false))}
          propagateSwipe={true}
        >
          <View style={{ flex: 1 }}>
            <Pressable onPress={handleMenu}>
              <MenuPrincipal setMenuVisible={setMenuVisible} />
            </Pressable>
          </View>
        </Modal>
        <Modal animationType="slide" transparent visible={showShareModal}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Pressable
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0
              }}
              onPress={() => setShowShareModal(false)}
            />
            <Compartir onClose={() => setShowShareModal(false)} />
          </View>
        </Modal>

        <Modal animationType="slide" transparent visible={showTaggedsModal}>
          <TouchableWithoutFeedback onPress={() => setShowTaggedsModal(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.3)'
              }}
            >
              <Etiquetados onClose={() => setShowTaggedsModal(false)} />
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal animationType="slide" transparent visible={showCommentsModal}>
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
              onPress={() => {
                setShowCommentsModal(false)
                dispatch(updateSelectedPostComments([]))
              }}
            />
            <CommentsModal
              onClose={() => {
                setShowCommentsModal(false)
                dispatch(updateSelectedPostComments([]))
              }}
            />
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  )
}

export default Muro
