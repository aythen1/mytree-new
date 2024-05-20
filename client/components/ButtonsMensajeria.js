import React from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { Color, FontFamily, FontSize, Border } from '../GlobalStyles'

const ButtonsMensajeria = () => {
  const navigation = useNavigation()

  const filterMessagesBy = (filter) => {
    console.log('Filtering messages by:', filter)
  }

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={{ width: '100%', flexDirection: 'row', marginTop: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            gap: 8
          }}
        >
          <Pressable onPress={() => filterMessagesBy('All')}>
            <LinearGradient
              style={{
                height: 48,
                width: 100,
                borderRadius: Border.br_11xl,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
              }}
              locations={[0, 1]}
              colors={['#dee274', '#7ec18c']}
            >
              <Text
                style={{
                  color: Color.white,
                  textAlign: 'center',
                  lineHeight: 21,
                  fontSize: FontSize.size_sm,
                  fontWeight: '700',
                  fontFamily: FontFamily.lato,
                  letterSpacing: 0
                }}
              >
                TODOS
              </Text>
            </LinearGradient>
          </Pressable>
          <Pressable onPress={() => filterMessagesBy('Family')}>
            <LinearGradient
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 48,
                width: 100,
                borderRadius: 25,
                zIndex: 0
              }}
              locations={[0, 1]}
              colors={['#7ec18c', '#dee274']}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 46,
                  width: 98,
                  borderRadius: 25,
                  backgroundColor: 'white'
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    lineHeight: 21,
                    color: '#7ec18c',
                    fontSize: FontSize.size_sm,
                    fontFamily: FontFamily.lato,
                    letterSpacing: 0
                  }}
                >
                  Familia
                </Text>
              </View>
            </LinearGradient>
          </Pressable>
          <Pressable onPress={() => filterMessagesBy('Friends')}>
            <LinearGradient
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 48,
                width: 100,
                borderRadius: 25,
                zIndex: 0
              }}
              locations={[0, 1]}
              colors={['#7ec18c', '#dee274']}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 46,
                  width: 98,
                  borderRadius: 25,
                  backgroundColor: 'white'
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    lineHeight: 21,
                    color: '#7ec18c',
                    fontSize: FontSize.size_sm,
                    fontFamily: FontFamily.lato,
                    letterSpacing: 0
                  }}
                >
                  Amigos
                </Text>
              </View>
            </LinearGradient>
          </Pressable>
          <Pressable onPress={() => filterMessagesBy('Groups')}>
            <LinearGradient
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 48,
                width: 100,
                borderRadius: 25,
                zIndex: 0
              }}
              locations={[0, 1]}
              colors={['#7ec18c', '#dee274']}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 46,
                  width: 98,
                  borderRadius: 25,
                  backgroundColor: 'white'
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    lineHeight: 21,
                    color: '#7ec18c',
                    fontSize: FontSize.size_sm,
                    fontFamily: FontFamily.lato,
                    letterSpacing: 0
                  }}
                >
                  Grupos
                </Text>
              </View>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}

export default ButtonsMensajeria
