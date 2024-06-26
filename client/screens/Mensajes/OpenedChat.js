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
import { emptyAllMessages, getChatHistory } from '../../redux/actions/chat'
import { setAllConversationMessagesToRead } from '../../redux/slices/chats.slices'
import axiosInstance from '../../apiBackend'

const OpenedChat = () => {
  const scrollViewRef = useRef()
  const route = useRoute()
  const dispatch = useDispatch()
  const { allUsers } = useSelector((state) => state.users)
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
    userData,
    sendMessage,
    getTimeFromDate
  } = useContext(Context)

  const handleSendMessage = () => {
    sendMessage(message, userData?.id, route.params.receiverId)
    setMessage('')
  }

  useEffect(() => {
    setSelectedUserDetails(
      allUsers.filter((user) => user?.id === route.params.receiverId)[0]
    )
    console.log(
      'userData',
      allUsers.filter((user) => user?.id === route.params.receiverId)[0]
    )
  }, [])

  useEffect(() => {
    console.log('allMessages changed =====', allMessages)
  }, [allMessages])
  useEffect(() => {
    joinRoom(userData?.id, route.params.receiverId)
    dispatch(
      getChatHistory({
        sender: userData?.id,
        receiver: route.params.receiverId
      })
    )
    return () => {
      dispatch(emptyAllMessages())
      leaveRoom(userData?.id, route.params.receiverId)
    }
  }, [])

  useEffect(() => {
    console.log('allMessages', allMessages)
    if (allMessages && allMessages.length > 0) {
      console.log('allMessages', allMessages)
      const messagesToSetReaded = allMessages?.filter(
        (message) =>
          message.senderId.toString() !== userData?.id.toString() &&
          message.isReaded === false
      )
      // console.log('messagesToSetReaded: ', messagesToSetReaded)
      messagesToSetReaded.forEach((message) => {
        axiosInstance.put(`chat/readed/${message?.id}`)
        dispatch(setAllConversationMessagesToRead())
      })
    }
  }, [allMessages])

  return (
    <LinearGradient
      style={{
        flex: 1,
        overflow: 'hidden',
        paddingTop: 10,
        width: '100%',
        paddingBottom: 15
      }}
      colors={['#fff', '#f1f1f1']}
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
          paddingBottom: 25,
          borderColor: 'green',
          borderBottomColor: Color.primario1,
          borderBottomWidth: 0.5,
          marginBottom: 2
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
                fontSize: 15,
                color: Color.primario1
              }}
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
                Soon
              </Text>
            </View>
            <Image
              style={{
                width: 25,
                height: 25
              }}
              contentFit="cover"
              source={require('../../assets/graySword.png')}
            />
          </View>
          <Pressable onPress={() => navigation.navigate('CALENDARIO')}>
            <Image
              style={{
                width: 25,
                height: 25
              }}
              contentFit="cover"
              source={require('../../assets/greenCalendar.png')}
            />
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Perfil')}>
            <Image
              style={{
                width: 25,
                height: 25
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
              style={{ width: 20, height: 20, borderWidth: 2 }}
              contentFit="cover"
              source={require('../../assets/whiteSend.png')}
            />
          </LinearGradient>
        </Pressable>
      </View>
    </LinearGradient>
  )
}

export default OpenedChat
