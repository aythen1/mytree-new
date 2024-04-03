import React from 'react'
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import { Color, FontFamily, FontSize } from '../GlobalStyles'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../redux/slices/chats.slices'

const Messages = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { messages } = useSelector((state) => state.chats)

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: 400, paddingBottom: 100 }}
      >
        {messages.map((message) => (
          <Pressable
            key={message.id}
            style={styles.frameLayout}
            onPress={() => {
              navigation.navigate('Chat')
              dispatch(setMessage(message))
            }}
          >
            <View style={styles.unsplashilip77sbmoeParent}>
              <Image
                style={[styles.unsplashilip77sbmoeIcon, styles.iconLayout1]}
                contentFit="cover"
                source={require('../assets/unsplashilip77sbmoe.png')}
              />
              <Image
                style={[styles.vectorIcon, styles.vectorIconPosition]}
                contentFit="cover"
                source={require('../assets/vector15.png')}
              />
            </View>
            <View style={styles.brunoPhamParent}>
              <Text style={[styles.brunoPham, styles.brunoPhamTypo]}>
                {message.name}
              </Text>
              <Text style={[styles.vendrnLuegoA, styles.searchTypo]}>
                {message.message}
              </Text>
            </View>
            <View style={[styles.hace2HorasWrapper, styles.hace2FlexBox]}>
              <Text style={[styles.hace2Minutos, styles.searchClr]}>
                {message.sendAgo}
              </Text>
              <View style={styles.ellipseParent}>
                <Image
                  style={styles.frameItem}
                  contentFit="cover"
                  source={require('../assets/ellipse-7159.png')}
                />
                <Text style={[styles.text, styles.textPosition]}>
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

const styles = StyleSheet.create({
  vectorIconPosition: {
    left: '50%',
    position: 'absolute'
  },
  iconLayout1: {
    height: 44,
    width: 44
  },
  brunoPhamTypo: {
    textAlign: 'justify',
    color: Color.primario1,
    fontFamily: FontFamily.lato,
    lineHeight: 19,
    fontSize: FontSize.size_base,
    fontWeight: '700',
    letterSpacing: 0
  },
  searchTypo: {
    textAlign: 'left',
    lineHeight: 21,
    fontSize: FontSize.size_sm
  },
  searchClr: {
    color: Color.textPlaceholder,
    letterSpacing: 0
  },
  textPosition: {
    top: 3,
    position: 'absolute'
  },
  frameLayout: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: Color.colorWhitesmoke_200,
    flexDirection: 'row'
  },
  hace2FlexBox: {
    alignItems: 'flex-end',
    height: 44
  },
  unsplashilip77sbmoeIcon: {
    zIndex: 0
  },
  vectorIcon: {
    marginTop: -20,
    marginLeft: -10,
    top: '50%',
    height: 15,
    width: 20,
    zIndex: 1
  },
  unsplashilip77sbmoeParent: {
    flexDirection: 'row'
  },
  brunoPham: {
    alignSelf: 'stretch'
  },
  vendrnLuegoA: {
    marginTop: 4,
    color: Color.textTextSecondary,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    letterSpacing: 0,
    alignSelf: 'stretch'
  },
  brunoPhamParent: {
    marginLeft: 16,
    width: '50%'
  },
  hace2Minutos: {
    fontWeight: '300',
    lineHeight: 18,
    fontSize: FontSize.size_xs,
    textAlign: 'justify',
    fontFamily: FontFamily.lato
  },
  frameItem: {
    width: 23,
    height: 23,
    zIndex: 0
  },
  text: {
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
    zIndex: 1
  },
  ellipseParent: {
    marginTop: 4,
    flexDirection: 'row'
  },
  hace2HorasWrapper: {
    width: '30%'
  }
})

export default Messages
