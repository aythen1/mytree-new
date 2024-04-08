import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'

const NavMedia = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/cam-media.png')}
        style={{
          width: 30,
          height: 30,
          marginRight: 23
        }}
      />
      <Pressable onPress={() => navigation.navigate('MIDIARIOENTRADAVIDEO')}>
        <Image
          source={require('../assets/Camera.png')}
          style={{
            width: 32,
            height: 31,
            marginRight: 23
          }}
        />
      </Pressable>
      <Image
        source={require('../assets/voice-media.png')}
        style={{
          width: 23,
          height: 32,
          marginRight: 23
        }}
      />
      <View
        style={{
          width: 8,
          marginRight: 5
        }}
      >
        <Image
          source={require('../assets/lines-media.png')}
          style={{
            width: 34,
            height: 22,
            marginBottom: 2
          }}
        />
      </View>
      <View
        style={{
          width: 15,
          marginRight: 23
        }}
      ></View>
      <Image
        source={require('../assets/emogi-media.png')}
        style={{
          width: 28,
          height: 28,
          marginRight: 23
        }}
      />
      <Image
        source={require('../assets/text-media.png')}
        style={{ width: 28, height: 28, marginRight: 23 }}
      />
      <Image
        source={require('../assets/star-media.png')}
        style={{
          width: 40,
          height: 30
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B6E4C0',
    paddingVertical: 20,
    marginBottom: 50,
    width: '100%'
  }
})

export default NavMedia
