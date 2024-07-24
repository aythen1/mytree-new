import {
  View,
  Text,
  Image,
  StatusBar,
  Pressable,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions
} from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { Context } from '../../context/Context'
import { Color, FontFamily } from '../../GlobalStyles'
import { LinearGradient } from 'expo-linear-gradient'
import SingleMessage from './SingleMessage'
import { useDispatch, useSelector } from 'react-redux'
import { emptyAllMessages, getChatHistory, getChatHistoryGroup } from '../../redux/actions/chat'
import { setAllConversationMessagesToRead } from '../../redux/slices/chats.slices'
import axiosInstance from '../../apiBackend'

const OpenedChat = () => {
  const scrollViewRef = useRef()
  const route = useRoute()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const { allUsers, userData } = useSelector((state) => state.users)
  const { allMessages } = useSelector((state) => state.chats)
  const [selectedUserDetails, setSelectedUserDetails] = useState()
  const [message, setMessage] = useState('')
  const isFocused = useIsFocused()
  const navigation = useNavigation()
  const {
    joinRoom,
    getUsersMessages,
    roomId,
    leaveRoom,
    sendMessage,
    getTimeFromDate
  } = useContext(Context)

  const handleSendMessage = () => {
    sendMessage(message, userData?.id, route?.params?.receiverId)
    setMessage()
  }

  useEffect(() => {
    const userrr = allUsers.filter(
      (user) => user?.id === route?.params?.receiverId
    )[0]

    setSelectedUserDetails(userrr)
    console.log(userrr, 'Dettt')
  }, [])
  useEffect(() => {
    const isGroup = route?.params?.isGroup
    joinRoom(userData?.id, route?.params?.receiverId)
   if(!isGroup){
    dispatch(
      getChatHistory({
        sender: userData?.id,
        receiver: route?.params?.receiverId
      })
    )
   } else {
    dispatch(
      getChatHistoryGroup({
        receiver: route?.params?.receiverId
      })
    )
   }
    return () => {
      dispatch(emptyAllMessages())
      leaveRoom(userData?.id, route.params.receiverId)
    }
  }, [])

  // const setAllToRead = async () => {
  //   console.log('on setAllToRead')
  //   const messagesToSetReaded = allMessages?.filter(
  //     (message) =>
  //       message.senderId !== user?.user?.id && message?.isReaded === false
  //   )
  //   console.log('messagesToSetReaded', messagesToSetReaded)
  //   if (messagesToSetReaded.length > 0) {
  //     await messagesToSetReaded.forEach((message) => {
  //       axiosInstance.put(`chat/readed/${message?.id}`)
  //       dispatch(setAllConversationMessagesToRead())
  //     })
  //     getUsersMessages()
  //   }
  // }

  const setAllToRead = async () => {
    console.log('on setAllToRead')

    const messagesToSetReaded = allMessages?.filter(
      (message) =>
        message.senderId !== userData?.id && message?.isReaded === false
    )

    console.log('messagesToSetReaded', messagesToSetReaded)

    if (messagesToSetReaded.length > 0) {
      try {
        const promises = messagesToSetReaded.map((message) =>
          axiosInstance.put(`chat/readed/${message?.id}`)
        )
        await Promise.all(promises)
        dispatch(setAllConversationMessagesToRead())
        getUsersMessages()
      } catch (error) {
        console.error('Error setting messages to read', error)
      }
    }
  }

  useEffect(() => {
    if (allMessages && allMessages.length > 0) {
      setAllToRead()
    }
  }, [allMessages])

  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  }, [])

  const userFollowing = userData?.following || []

  const handleFollow = () => {
    setShowOptionsModal(false)
    let actualUser = _.cloneDeep(userData)
    const actualFollowers =
      allUsers.filter((user) => user?.id === selectedUserDetails?.id)[0]
        .followers || []
    const newFollowers = actualFollowers.includes(userData?.id)
      ? actualFollowers.filter((follower) => follower !== userData?.id)
      : [...actualFollowers, userData?.id]

    const newFollowingArray = userFollowing?.includes(selectedUserDetails?.id)
      ? userFollowing.filter((followed) => followed !== selectedUserDetails?.id)
      : [...userFollowing, selectedUserDetails?.id]
    actualUser.user.following = newFollowingArray

    dispatch(
      updateUserData({
        id: selectedUserDetails?.id,
        body: { followers: newFollowers }
      })
    )
      .then((data) => {
        dispatch(
          updateUserData({
            id: userData?.id,
            body: { following: newFollowingArray }
          })
        )
      })
      .then((response) => {
        if (newFollowers.includes(userData?.id)) {
          dispatch(
            sendNotification({
              title: 'Follow',
              message: `${user.user.nickname} ha comenzado a seguirte`,
              recipientId: selectedUserDetails?.id,
              date: new Date(),
              read: false,
              prop1: {
                userId: userData?.id,
                userData: {
                  ...userData
                }
              }
            })
          )
        }
        dispatch(getAllUsers())
        dispatch(updateUser(actualUser))
      })
    return
  }

  const handleRemoveChat = () => {
    setShowDeletePopUp(false)
    const body = {
      senderId: userData?.id.toString(),
      receiverId: route?.params?.receiverId?.toString(),
      room: roomId
    }
    axiosInstance.post('chat/marcarMensajesComoEliminados', body)
  }

  return (
    <LinearGradient
      style={{
        flex: 1,
        overflow: 'hidden',
        width: '100%',
        paddingBottom: 15
      }}
      colors={['#41bf63', '#f1f1f1']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <StatusBar
        hidden={false}
        barStyle={'dark-content'}
        backgroundColor="#fff"
      />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 25,
          paddingBottom: 10,
          paddingTop:10,
          borderColor: 'green',
          borderBottomColor: Color.primario1,
          borderBottomWidth: 0.5,
          marginBottom: 2,
          backgroundColor:"white"
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Pressable
            onPress={() => {
              console.log('triggered CA1')
              getUsersMessages()
              navigation.goBack()
            }}
          >
            <Image
              style={{
                width: 9,
                height: 18,
                marginRight: 25,
                marginTop: 2.5
              }}
              contentFit="cover"
              source={require('../../assets/greenBackArrow.png')}
            />
          </Pressable>

          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'left',
                fontFamily: FontFamily.lato,
                fontSize: 20,
                color: Color.primario1,
                width:Dimensions.get("screen").width / 3
                
                
              }}
              numberOfLines={1}
              
            >
              {route.params.receiverName}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', gap: 23 }}>
          <View
            style={{
              gap: 10,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row'
            }}
          >
            <View
              style={{
                borderRadius: 5,
                paddingHorizontal: 5,
                paddingVertical: 1,
                backgroundColor: '#d9d9d9',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text
                style={{
                  fontSize: 7,
                  fontFamily: FontFamily.lato,
                  color: Color.fAFAFA
                }}
              >
                Pronto
              </Text>
            </View>
            <Image
              style={{
                width: 20,
                height: 20
              }}
              contentFit="cover"
              source={require('../../assets/graySword.png')}
            />
          </View>
          <Pressable onPress={() => navigation.navigate('CrearEvento')}>
            <Image
              style={{
                width: 20,
                height: 20
              }}
              contentFit="cover"
              source={require('../../assets/greenCalendar.png')}
            />
          </Pressable>

          <Pressable
            onPress={() =>
              navigation.navigate(
                'OtherUserProfile',
                allUsers.filter(
                  (user) => user.id.toString() === route?.params?.receiverId
                )[0]
              )
            }
          >
            <Image
              style={{
                width: 20,
                height: 20
              }}
              contentFit="cover"
              source={require('../../assets/greenPerson.png')}
            />
          </Pressable>
        </View>

        {/* <TouchableOpacity
          style={{
            width: 50,
            alignItems: 'flex-end'
          }}
          onPress={() => setShowOptionsModal(true)}
        >
          <ThreePointsSVG />
        </TouchableOpacity> */}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-end'
        }}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        <View
          style={{
            flexDirection: 'column-reverse',
            paddingRight: 10,
            paddingLeft: 10
          }}
        >
          {allMessages?.map((chat) => (
            <SingleMessage
              hour={getTimeFromDate(chat.createdAt)}
              key={chat?.id}
              text={chat?.message}
              isMy={chat?.senderId.toString() === userData?.id.toString()}
              read={chat?.isReaded}
            />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          marginTop: 15,
          height: 50,
          paddingHorizontal: Dimensions.get('screen').width * 0.025,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Escribe tu mensaje..."
          placeholderTextColor="#999999"
          style={{
            flex: 1,
            paddingLeft: 13,
            height: '100%',
            maxWidth: '81%',
            fontSize: 16,
            borderRadius: 10,
            color: '#303030',
            backgroundColor: '#f9f9f9'
          }}
        />
        <Pressable
          disabled={message?.length === 0}
          onPress={handleSendMessage}
          style={{ width: 50, height: 50, borderRadius: 100 }}
        >
          <LinearGradient
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              zIndex: 0
            }}
            locations={[0, 1]}
            colors={['#7ec18c', '#dee274']}
          >
            <Image
              style={{ width: 26, height: 26, borderWidth: 2 }}
              contentFit="cover"
              source={require('../../assets/paperplanee.png')}
            />
          </LinearGradient>
        </Pressable>
      </View>
    </LinearGradient>
  )
}

export default OpenedChat
