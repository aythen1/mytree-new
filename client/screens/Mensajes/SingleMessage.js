import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { Color, FontFamily } from '../../GlobalStyles'

const SingleMessage = ({ text, isMy, read, hour }) => {
  console.log(text, isMy, read, hour)
  return (
    <View
      style={{
        backgroundColor: isMy ? Color.fAFAFA : Color.secundario,
        padding: 6,
        borderRadius: 10,
        alignSelf: isMy ? 'flex-end' : 'flex-start',
        maxWidth: '80%',
        minWidth: 100,
        flexDirection: 'column',
        marginTop: 5
      }}
    >
      <Text
        style={{ fontFamily: FontFamily.lato, fontSize: 14, color: '#292A2B' }}
      >
        {text}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          gap: 3,
          margin: 1,
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            color: '#999',
            fontSize: 10,
            fontFamily: FontFamily.lato,
            alignSelf: 'flex-end',
            justifyContent: 'flex-end'
          }}
        >
          {hour}
        </Text>
        {read ? (
          <Image
            style={{ width: 17, height: 17 }}
            source={require('../../assets/readed.png')}
          />
        ) : (
          <Image
            style={{ width: 17, height: 17 }}
            source={require('../../assets/notReaded.png')}
          />
        )}
      </View>
    </View>
  )
}

export default SingleMessage
