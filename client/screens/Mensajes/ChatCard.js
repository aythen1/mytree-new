import { View, Text, Image, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Color, FontFamily, FontSize } from '../../GlobalStyles'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import axiosInstance from '../../apiBackend'
import { Context } from '../../context/Context'

const ChatCard = ({ name, selectedUserId }) => {
  const navigation = useNavigation()
  const { userData, getTimeFromDate } = useContext(Context)
  const [notReadedMessages, setNotReadedMessages] = useState()
  const [convMessages, setConvMessages] = useState([])
  const [lastMessage, setLastMessage] = useState()
  const { user, allUsers } = useSelector((state) => state.users)

  const getChatMessages = async () => {
    const { data } = await axiosInstance.get(
      `chat/room?limit=${99999999999}&senderId=${userData.id}&receiverId=${selectedUserId}`
    )
    setConvMessages(data)
  }

  // console.log('name:',name,'sportmanId: ', sportmanId)

  useEffect(() => {
    getChatMessages()
  }, [])

  const getLastMessage = (messages) => {
    const received = messages[0].senderId.toString() === userData.id.toString()
    setLastMessage({ message: messages[0], received })
  }

  const getOtherUserMessages = (messages) => {
    console.log('userdata.id', userData.id)
    const filteredMessages = messages.filter((message) => {
      if (message.senderId.toString() !== userData.id.toString()) {
        if (message.isReaded === false) {
          return true
        }
        return false
      }
      return false
    })
    console.log('filteredMessages:', filteredMessages)
    if (filteredMessages.length > 0) {
      const notReaded = filteredMessages.length
      setNotReadedMessages(notReaded)
    }
  }

  useEffect(() => {
    if (convMessages?.length) {
      getLastMessage(convMessages)
      getOtherUserMessages(convMessages)
    }
  }, [convMessages])
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
        {lastMessage && notReadedMessages && (
          <View style={{ marginTop: 4, flexDirection: 'row' }}>
            <Image
              style={{ width: 23, height: 23, zIndex: 0 }}
              contentFit="cover"
              source={require('../../assets/ellipse-7159.png')}
            />
            <Text
              style={{
                left: 8,
                color: Color.grisHome,
                display: 'flex',
                width: 7,
                height: 17,
                alignItems: 'center',
                lineHeight: 18,
                fontSize: FontSize.size_xs,
                textAlign: 'justify',
                fontFamily: FontFamily.lato,
                fontWeight: '700',
                letterSpacing: 0,
                top: 3,
                position: 'absolute',
                zIndex: 1
              }}
            >
              {notReadedMessages}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  )
}

export default ChatCard
