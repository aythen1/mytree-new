import React, { useState, useCallback, useEffect, useContext } from 'react'
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Modal,
  ScrollView
} from 'react-native'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import ETIQUETADO from '../../components/ETIQUETADO'
import {
  Color,
  FontFamily,
  FontSize,
  Padding,
  Border
} from '../../GlobalStyles'
import HeaderIcons from '../../components/HeaderIcons'
import CalendarMuroSVG from '../../components/svgs/CalendarMuroSVG'
import BookSVG from '../../components/svgs/BookSVG'
import SettingMuroSVG from '../../components/svgs/SettingMuroSVG'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNotificationById, getAllNotifications } from '../../redux/actions/notifications'
import { Context } from '../../context/Context'
import { getAllUsers, updateUser } from '../../redux/actions/user'

const PERFILNOTIFICACIONES = () => {
  const {formatDate} = useContext(Context)
  const { allUsers,userData } = useSelector(state=>state.users)
  const {allNotifications} = useSelector(state=>state.notifications)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [showInvitationModal,setShowInvitationModal] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState()

  useEffect(()=>{
    dispatch(getAllNotifications())
  },[])

  const handleAcceptFamilyRequest = (requestUserId) => {
    const actualUserFamilyIds = userData.familyIds || []
    const newUserFamilyArray = [...actualUserFamilyIds,requestUserId]
    const actualRequestUserFamilyArray = allUsers.filter(user=>user.id===requestUserId)[0].familyIds || []
    const newRuquestUserFamilyArray = actualRequestUserFamilyArray.includes(userData.id) ? actualRequestUserFamilyArray : [...actualRequestUserFamilyArray,userData.id]
  }

const userNotifications = allNotifications.filter(notification=>notification.receiverId === userData.id.toString())

const handleAcceptFamilyOrFriendRequest = (notificationId,senderId,receiverId, requestType) => {
  console.log('notificationId,senderId,receiverId, requestType: ',notificationId,senderId,receiverId, requestType)
  const actualUserFamilyIds = userData.familyIds || []
  const actualUserFriendsIds = userData.friendsId || []
  const newUserFamilyArray = actualUserFamilyIds.includes(senderId.toString()) ? actualUserFamilyIds :[...actualUserFamilyIds,senderId.toString()]
  const newUserFriendsArray =actualUserFriendsIds.includes(senderId.toString()) ? actualUserFriendsIds : [...actualUserFriendsIds,senderId.toString()]
  const actualRequestUserFamilyArray = allUsers.filter(user=>user.id.toString()===senderId.toString())[0].familyIds || []
  const actualRequestUserFriendsArray = allUsers.filter(user=>user.id.toString()===senderId.toString())[0].friendsId || []
  const newRequestUserFamilyArray = actualRequestUserFamilyArray.includes(userData.id.toString()) ? actualRequestUserFamilyArray : [...actualRequestUserFamilyArray,userData.id.toString()]
  const newRequestUserFriendsArray = actualRequestUserFriendsArray.includes(userData.id.toString()) ? actualRequestUserFriendsArray : [...actualRequestUserFriendsArray,userData.id.toString()]
  
  if(requestType === 'family request') {
    dispatch(updateUser({userId: senderId.toString(), userData:{familyIds:newRequestUserFamilyArray}}))
    dispatch(updateUser({userId: receiverId.toString(), userData:{familyIds:newUserFamilyArray}}))
    dispatch(deleteNotificationById(notificationId))
  }
  if(requestType === 'friend request') {
    dispatch(updateUser({userId: senderId.toString(), userData:{friendsIds:newRequestUserFriendsArray}}))
    dispatch(updateUser({userId: receiverId.toString(), userData:{friendsIds:newUserFriendsArray}}))
    dispatch(deleteNotificationById(notificationId))
  }
  dispatch(getAllNotifications())
  dispatch(getAllUsers())
}

  return (
    <>
      <View style={styles.perfilNotificaciones}>
        <View>
          <View style={styles.frameViewFlexBox}>
            <View
              style={{
                width: '100%',
                marginTop: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Image
                style={styles.image6Icon}
                contentFit="cover"
                source={require('../../assets/image-6.png')}
              />

              <HeaderIcons
                icons={[
                  <CalendarMuroSVG />,
                  <BookSVG />,
                  <SettingMuroSVG isNavigation={'PerfilAjustes'} />
                ]}
              />
            </View>
          </View>
          <View style={[styles.notificacionesWrapper, styles.frameViewFlexBox]}>
            <Text style={styles.notificaciones}>Notificaciones</Text>
          </View>
        </View>
        <View style={styles.frameContainer}>

          { /* =============== NOTIFICATIONS RENDERED =============== */ }
          { userNotifications.length > 0 ? <ScrollView showsVerticalScrollIndicator={false}>
          {userNotifications.map((notification,index)=><Pressable onPress={async()=>{
              await setSelectedNotification(notification)
              setShowInvitationModal(true)
            }} key={index}>
            <View style={[styles.frameView, styles.frameViewFlexBox]}>
              <Image
                style={styles.frameChild}
                contentFit="cover"
                source={require('../../assets/frame-1547754875.png')}
              />
              <Text style={styles.hasRecibidoUnaLayout}>
                <Text style={styles.brunoTeHaContainer1}>
                  <Text style={styles.bruno}>{`${notification.message.split(' ').slice(0,2).join(' ')} `}</Text>
                  <Text style={styles.teHaInvitadoTypo}>
                    {`${notification.message.split(' ').slice(2).join(' ')}.`}
                  </Text>
                </Text>
              </Text>
              <Text style={styles.minAgo}>{formatDate(notification.createdAt)}</Text>
            </View>
            <Image
              style={styles.frameItem}
              contentFit="cover"
              source={require('../../assets/line-78.png')}
            />
          </Pressable>) 
          }
          
          </ScrollView> : <Text style={{color:"#000",marginTop:40, fontSize:16,alignSelf:'center', fontWeight:400}}>No tienes ninguna notificación!</Text>}
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={showInvitationModal}
      >
        <View style={styles.frameContainer15Overlay}>
          <Pressable
            style={styles.frameContainer15Bg}
            onPress={()=>setShowInvitationModal(false)}
          />
          <ETIQUETADO message={selectedNotification?.message || ''} acceptHandler={()=>handleAcceptFamilyOrFriendRequest(selectedNotification.id,selectedNotification.senderId,selectedNotification.receiverId, selectedNotification.type)} cancelHandler={()=>handleDeclineRequest()} onClose={()=>setShowInvitationModal(false)} />
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  navigationIconLayout: {
    width: '100%'
  },
  frameParentPosition: {
    left: 0,
    top: 0
  },
  frameGroupShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 5
    },
    backgroundColor: Color.white
  },
  documentIconLayout: {
    marginLeft: 30,
    height: 24,
    width: 24
  },
  frameViewFlexBox: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  teHaInvitadoTypo: {
    fontWeight: '300',
    fontFamily: FontFamily.lato
  },
  perfilNotificacionesChild: {
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowRadius: 25,
    elevation: 25,
    height: 113,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 5
    },
    backgroundColor: Color.white,
    left: 0,
    top: 0
  },
  image6Icon: {
    width: 87,
    height: 55
  },
  iconlylightOutlinecalendar: {
    height: 24,
    width: 24
  },
  documentIcon: {
    overflow: 'hidden'
  },
  icon: {
    height: '100%',
    width: '100%'
  },

  notificaciones: {
    fontSize: FontSize.size_5xl,
    color: Color.negro,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  notificacionesWrapper: {
    justifyContent: 'center',
    marginTop: 6
  },
  frameGroup: {
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowRadius: 4,
    elevation: 4,
    paddingBottom: Padding.p_xl,
    paddingHorizontal: Padding.p_xl
  },
  frameContainer5Overlay: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  frameContainer5Bg: {
    // position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  frameChild: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  bruno: {
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  brunoTeHaContainer1: {
    width: '100%'
  },
  hasRecibidoUnaLayout: {
    width: 273,
    display: 'flex',
    color: Color.black1,
    lineHeight: 19,
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    textAlign: 'left',
    alignItems: 'center'
  },
  minAgo: {
    fontSize: FontSize.size_xs,
    lineHeight: 18,
    color: Color.gris,
    textAlign: 'justify',
    letterSpacing: 0,
    fontFamily: FontFamily.lato,
    right: 30,
    top: 30
  },
  frameView: {
    justifyContent: 'space-between',
    width: '100%'
  },
  frameItem: {
    maxHeight: '100%',
    marginTop: 20,
    width: '100%'
  },
  frameParent1: {
    marginTop: 20
  },
  frameContainer11Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  frameContainer11Bg: {
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  hasRecibidoUna: {
    width: 273,
    display: 'flex',
    color: Color.black1,
    lineHeight: 19,
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    textAlign: 'left',
    alignItems: 'center'
  },
  frameContainer15Overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  frameContainer15Bg: {
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  frameChild17: {
    height: 0,
    marginTop: 20,
    width: '100%'
  },
  frameContainer: {
    height: 604,
    paddingVertical: 0,
    marginTop: 23,
    paddingHorizontal: Padding.p_xl
  },
  frameParent: {
    top: 0
  },
  perfilNotificaciones: {
    flex: 1,
    backgroundColor: Color.white
  }
})

export default PERFILNOTIFICACIONES
