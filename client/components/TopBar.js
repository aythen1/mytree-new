import { useNavigation } from '@react-navigation/native'
import React from 'react'
import LupaSVG from './svgs/LupaSVG'
import HeaderIcons from './HeaderIcons'
import { Pressable, View } from 'react-native'
import NotificationsMuroSVG from './svgs/NotificationsMuroSVG'
import MessageSVG from './svgs/MessageSVG'
import CalendarMuroSVG from './svgs/CalendarMuroSVG'
import SettingMuroSVG from './svgs/SettingMuroSVG'
import { Image } from 'expo-image'

const TopBar = ({screen}) => {
    const navigation = useNavigation()
  return (
    <View
          style={{
            width: '100%',
            paddingTop: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal:10
          }}
        >
          <Pressable onPress={() => navigation.openDrawer()}>
            <Image
              style={[
                {
                  width:94,
                  height: 72,
                }
              ]}
              contentFit="cover"
              source={require('../assets/image-6.png')}
            />
          </Pressable>
          <View style={{alignItems:"center",paddingBottom:10}}>
            <HeaderIcons
              icons={
                screen !== "user"
                  ? [
                      <Pressable
                        key={1000}
                        onPress={() => {
                          navigation.navigate('Busqueda')
                        }}
                      >
                        <LupaSVG />
                      </Pressable>,
                      <MessageSVG key={2000} />,
                      <NotificationsMuroSVG
                        key={3000}
                        isNavigation={'PERFILNOTIFICACIONES'}
                        
                      />,
                      screen == "perfil" && (
                      <SettingMuroSVG key={5000} />

                      )
                    ]
                  : [
                      <MessageSVG key={3000} />,
                      <CalendarMuroSVG key={4000} />,
                    ]
              }
            />
          </View>
        </View>
  )
}

export default TopBar