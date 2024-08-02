import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
  Button,
  RefreshControl,
  Platform
} from 'react-native'
import {
  Border,
  Padding,
  FontFamily,
  FontSize,
  Color
} from '../../GlobalStyles'
import Post from '../../components/Post'
import RetosModal from '../Retos/RetosModal'
import VotacionDeRetos from '../VotacionDeRetos'
import MenuPrincipal from '../../components/MenuPrincipal'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { setPanel } from '../../redux/slices/panel.slices'
import StoriesVideosDiarios from '../../components/StoriesVideosDiarios'
import { LinearGradient } from 'expo-linear-gradient'
import { Context } from '../../context/Context'
import Compartir from '../../components/Compartir'
import Etiquetados from '../../components/Etiquetados'
import { getAllUsers, getUserData } from '../../redux/actions/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAllNotifications } from '../../redux/actions/notifications'
import {
  getAllEvents,
  getAllUserEvents,
  getAllUserInvitations
} from '../../redux/actions/events'
import axiosInstance from '../../apiBackend'
import CommentsModal from '../../components/modals/CommentsModal'
import { updateSelectedPostComments } from '../../redux/slices/comments.slices'
import TopBar from '../../components/TopBar'
import { chatGroups } from '../../redux/actions/chat'
import { getAllPosts } from '../../redux/actions/posts'
import GestureRecognizer from 'react-native-swipe-gestures'
import { getAllUserAlbums } from '../../redux/actions/albums'

const Muro = () => {
  const {
    showShareModal,
    setShowShareModal,
    showTaggedsModal,
    setShowTaggedsModal,
    showCommentsModal,
    setShowCommentsModal,
    usersWithMessages,
    getUsersMessages
  } = useContext(Context)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute()
  const queryParams = route.params
  const { showPanel } = useSelector((state) => state.panel)
  const { userData } = useSelector((state) => state.users)
  // const [user, setUser] = useState()
  const [showModalRetos, setShowModalRetos] = useState(false)
  const [colorClick, setColorClick] = useState(true)
  const [showRetos, setShowRetos] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)

  const handleMenu = () => {
    dispatch(setPanel(false))
  }

  useEffect(() => {
    if (queryParams?.invite && queryParams?.memberId) {
      setShowInviteModal(true)
    }
  }, [queryParams])

  const dispatches = async (id) => {
    dispatch(getAllUsers()).finally(() => {
      getUsersMessages()
      dispatch(getAllNotifications())
      dispatch(getAllPosts())
      dispatch(chatGroups(id))
      dispatch(getAllUserAlbums(id))
      dispatch(getUserData(id))
      dispatch(getAllUserEvents(id))
      dispatch(getAllEvents())
      dispatch(getAllUserInvitations(id))
    })
  }

  useEffect(() => {
    if (userData.id !== undefined) {
      dispatches(userData.id)
    }
  }, [])

  const handleAceptInvitation = async () => {
    try {
      const res = await axiosInstance.patch(`/user/${userData.id}`, {
        [queryParams.property]: queryParams.memberId
      })
      if (res) {
        dispatch(getAllUsers())
      }
      setShowInviteModal(false)
    } catch (error) {
      console.log(error, 'error')
    }
  }

  const [refreshing, setRefreshing] = useState(false)
  const scrollViewRef = useRef(null)

  const onRefresh = () => {
    setRefreshing(true)
    if (userData.id !== undefined) {
      dispatches(userData.id).finally(() => {
        setRefreshing(false)
      })
    }

  }



  return (
    <LinearGradient
      colors={['#fff', '#f1f1f1']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 85 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
   
        <TopBar screen={'muro'}></TopBar>
        <View>
          <View
            style={{
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
                    width: 'auto',
                    textAlignVertical: 'center',
                    paddingHorizontal: 3,
                    height: 20,
                    textAlign: 'center'
                  }}
                >
                  Pronto
                </Text>
              </Pressable>
            </View>
          </View>

          <Modal
            animationType="fade"
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
            animationType="fade"
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
          animationType="fade"
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
        <Modal animationType="fade" transparent visible={showShareModal}>
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

        <Modal animationType="fade" transparent visible={showTaggedsModal}>
          <TouchableWithoutFeedback onPress={() => setShowTaggedsModal(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Etiquetados onClose={() => setShowTaggedsModal(false)} />
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <GestureRecognizer
          keyboardShouldPersistTaps="always"
          onSwipeDown={() => {
            setShowCommentsModal(false)
            dispatch(updateSelectedPostComments([]))
          }}
        >
          <Modal
            animationType="fade"
            transparent
            visible={showCommentsModal}
            sw
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
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
        </GestureRecognizer>
      </ScrollView>
    </LinearGradient>
  )
}

export default Muro
