import React from 'react'
import { View, Text, Pressable, ScrollView } from 'react-native'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import { Color, FontFamily, FontSize } from '../GlobalStyles'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../redux/slices/chats.slices'

const Messages = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { allMessages } = useSelector((state) => state.chats)

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: 400, paddingBottom: 100 }}
      >
        {allMessages.map((message) => (
          <Pressable
            key={message.id}
            style={{
              height: 90,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              borderRadius: 10,
              padding: 10,
              backgroundColor: Color.colorWhitesmoke_200,
              flexDirection: 'row'
            }}
            onPress={() => {
              navigation.navigate('Chat')
              dispatch(setMessage(message))
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={{ height: 44, width: 44, zIndex: 0 }}
                contentFit="cover"
                source={require('../assets/unsplashilip77sbmoe.png')}
              />
              <Image
                style={{
                  marginTop: -20,
                  marginLeft: -10,
                  top: '50%',
                  height: 15,
                  width: 20,
                  zIndex: 1,
                  position: 'absolute',
                  left: '50%'
                }}
                contentFit="cover"
                source={require('../assets/vector15.png')}
              />
            </View>
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
                {message.name}
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
                {message.message}
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
                {message.sendAgo}
              </Text>
              <View style={{ marginTop: 4, flexDirection: 'row' }}>
                <Image
                  style={{ width: 23, height: 23, zIndex: 0 }}
                  contentFit="cover"
                  source={require('../assets/ellipse-7159.png')}
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
                  {message.notRead}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </>
  )
}

export default Messages
