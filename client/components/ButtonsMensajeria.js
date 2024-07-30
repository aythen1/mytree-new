import React from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { Color, FontFamily, FontSize, Border } from '../GlobalStyles'

const ButtonsMensajeria = ({ selectedFilter, setSelectedFilter }) => {
  const navigation = useNavigation()

  const filterMessagesBy = (filter) => {
    setSelectedFilter(filter)
  }

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingRight:15}}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginTop: 20,
          paddingLeft: Dimensions.get('screen').width * 0.04
        }}
      >
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
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 46,
                  width: 98,
                  borderRadius: 25,
                  backgroundColor:
                    selectedFilter === 'All' ? 'transparent' : 'white'
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    lineHeight: 21,
                    color: selectedFilter === 'All' ? '#fff' : '#7ec18c',
                    fontSize: FontSize.size_sm,
                    fontFamily: FontFamily.lato,
                    letterSpacing: 0
                  }}
                >
                  TODOS
                </Text>
              </View>
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
              colors={['#dee274', '#7ec18c']}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 46,
                  width: 98,
                  borderRadius: 25,
                  backgroundColor:
                    selectedFilter === 'Family' ? 'transparent' : 'white'
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    lineHeight: 21,
                    color: selectedFilter === 'Family' ? '#fff' : '#7ec18c',
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
              colors={['#dee274', '#7ec18c']}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 46,
                  width: 98,
                  borderRadius: 25,
                  backgroundColor:
                    selectedFilter === 'Friends' ? 'transparent' : 'white'
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    lineHeight: 21,
                    color: selectedFilter === 'Friends' ? '#fff' : '#7ec18c',
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
              colors={['#dee274', '#7ec18c']}
            >
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 46,
                  width: 98,
                  borderRadius: 25,
                  backgroundColor:
                    selectedFilter === 'Groups' ? 'transparent' : 'white'
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    lineHeight: 21,
                    color: selectedFilter === 'Groups' ? '#fff' : '#7ec18c',
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
