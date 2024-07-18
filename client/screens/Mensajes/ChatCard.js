import { View, Text, Image, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Color, FontFamily, FontSize } from '../../GlobalStyles'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../apiBackend'
import { Context } from '../../context/Context'
import { getUserData, updateUser } from '../../redux/actions/user'

const ChatCard = ({ name, selectedUserId, value }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { getTimeFromDate, notReadedMessages, usersWithMessages } =
    useContext(Context)
  const [convMessages, setConvMessages] = useState([])
  const [lastMessage, setLastMessage] = useState()
  const [loading, setLoading] = useState(true)
  const { user, allUsers, userData } = useSelector((state) => state.users)

  const getChatMessages = async () => {
    if (userData.id && selectedUserId) {
      // console.log('getting messages from', user.user.id, 'and', selectedUserId)
      const { data } = await axiosInstance.get(
        `chat/room?senderId=${userData.id}&receiverId=${selectedUserId}`
      )
      // console.log('====SETTING CONV MESSAGES TO', data)
      setConvMessages(data)
    }
  }

  useEffect(() => {
    getChatMessages()
  }, [usersWithMessages, value])

  useEffect(() => {
    setLoading(true)
    getChatMessages()
  }, [])

  const getLastMessage = (messages) => {
    const received = messages[0].senderId === userData.id
    setLastMessage({ message: messages[0], received })
    setLoading(false)
  }

  useEffect(() => {
    if (convMessages?.length > 0) {
      getLastMessage(
        convMessages.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      )
    } else {
      setLastMessage('')
      setLoading(false)
    }
  }, [convMessages])

  useEffect(() => {}, [lastMessage])

  return (
    <Pressable
      style={{
        height: 85,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10,
        borderRadius: 10,
        padding: 10,
        backgroundColor: Color.colorWhitesmoke_200,
        flexDirection: 'row'
      }}
      onPress={() => {
        navigation.navigate('OpenedChat', {
          receiverId: selectedUserId,
          receiverName: name
        })
      }}
    >
      <Pressable
        onPress={(e) => {
          e.stopPropagation()
          if (userData.fixedChat === selectedUserId) {
            dispatch(
              updateUser({ userId: userData.id, userData: { fixedChat: '' } })
            ).then((res) => dispatch(getUserData(userData.id)))
          } else {
            dispatch(
              updateUser({
                userId: userData.id,
                userData: { fixedChat: selectedUserId }
              })
            ).then((res) => dispatch(getUserData(userData.id)))
          }
        }}
        style={{ position: 'absolute', top: 30, right: 15 }}
      >
        <Image
          style={{ width: 23, height: 23, zIndex: 0 }}
          contentFit="cover"
          source={
            userData.fixedChat === selectedUserId
              ? require('../../assets/greenPin.png')
              : require('../../assets/greyPin.png')
          }
        />
      </Pressable>
      <View style={{ marginLeft: 16, width: '50%' }}>
        <Text
          style={{
            textAlign: 'justify',
            color: Color.primario1,
            fontFamily: FontFamily.lato,
            lineHeight: 19,
            fontSize: FontSize.size_base,
            fontWeight: '700',
            letterSpacing: 0,
            alignSelf: 'stretch'
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            marginTop: 4,
            color: Color.textTextSecondary,
            textAlign: 'left',
            fontFamily: FontFamily.lato,
            letterSpacing: 0,
            alignSelf: 'stretch',
            lineHeight: 21,
            fontSize: FontSize.size_sm
          }}
        >
          {lastMessage
            ? lastMessage?.message?.message?.length >= 20
              ? lastMessage?.message?.message.slice(0, 20).concat('...')
              : lastMessage?.message?.message
            : 'Inicia una conversacion!'}
        </Text>
      </View>
      <View
        style={{
          width: '30%',
          alignItems: 'flex-end',
          height: 44
        }}
      >
        <Text
          style={{
            fontWeight: '300',
            lineHeight: 18,
            fontSize: FontSize.size_xs,
            textAlign: 'justify',
            fontFamily: FontFamily.lato,
            color: Color.textPlaceholder,
            letterSpacing: 0
          }}
        >
          {lastMessage ? getTimeFromDate(lastMessage?.message?.createdAt) : ''}
        </Text>
        {notReadedMessages?.some(
          (message) => message.senderId === selectedUserId
        ) && (
          <View style={{ marginTop: 4, flexDirection: 'row' }}>
            <Image
              style={{ width: 23, height: 23, zIndex: 0 }}
              contentFit="cover"
              source={require('../../assets/ellipse-7159.png')}
            />
            <Text
              style={{
                left: 3,
                color: Color.grisHome,
                display: 'flex',
                width: 17,
                height: 17,
                alignItems: 'center',
                lineHeight: 18,
                fontSize: FontSize.size_xs,
                textAlign: 'center',
                fontFamily: FontFamily.lato,
                fontWeight: '700',
                letterSpacing: 0,
                top: 2,
                position: 'absolute',
                zIndex: 1
              }}
            >
              {
                notReadedMessages.filter(
                  (message) => message.senderId === selectedUserId
                ).length
              }
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  )
}

export default ChatCard
