import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { FontSize, FontFamily, Color, Border } from '../GlobalStyles'

const Compartir = ({ onClose }) => {
  return (
    <View
      style={{
        borderTopLeftRadius: Border.br_11xl,
        borderTopRightRadius: Border.br_11xl,
        width: '100%',
        backgroundColor: Color.white,
        height: 170,
        position: 'absolute',
        bottom: 0
      }}
    >
      <Text
        style={{
          marginLeft: -70,
          top: 20,
          fontSize: FontSize.size_5xl,
          fontWeight: '500',
          fontFamily: FontFamily.lato,
          color: Color.negro,
          textAlign: 'left',
          left: '50%',
          position: 'absolute'
        }}
      >
        Compartir en
      </Text>
      <View
        style={{
          top: 79,
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 20,
          justifyContent: 'space-around',
          position: 'absolute'
        }}
      >
        <TouchableOpacity onPress={onClose}>
          <Image
            style={{
              overflow: 'hidden',
              width: 33,
              height: 33
            }}
            contentFit="cover"
            source={require('../assets/skilliconsinstagram1.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Image
            style={{
              height: 33,
              overflow: 'hidden',
              width: 33
            }}
            contentFit="cover"
            source={require('../assets/logoswhatsappicon.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Image
            style={{
              height: 33,
              overflow: 'hidden',
              width: 33
            }}
            contentFit="cover"
            source={require('../assets/skilliconslinkedin1.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Image
            style={{
              height: 38,
              overflow: 'hidden',
              width: 33
            }}
            contentFit="cover"
            source={require('../assets/logostiktokicon1.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Image
            style={{
              height: 33,
              overflow: 'hidden',
              width: 33
            }}
            contentFit="cover"
            source={require('../assets/deviconfacebook1.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Image
            style={{
              height: 33,
              overflow: 'hidden',
              width: 33
            }}
            contentFit="cover"
            source={require('../assets/fa6brandssquarextwitter.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Compartir
