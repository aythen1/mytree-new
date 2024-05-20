import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Pressable, Dimensions, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Color, FontFamily, FontSize } from '../../GlobalStyles'
import { Image } from 'expo-image'
import ButtonsMensajeria from '../../components/ButtonsMensajeria'
import BarraBusqueda from '../../components/BarraBusqueda'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Context } from '../../context/Context'

const MENSAJERA = () => {
  const navigation = useNavigation()
  const { usersWithMessages, userData } = useContext(Context)

  useEffect(() => {
    console.log('usersWithMessages changed:', usersWithMessages)
  }, [usersWithMessages])

  // useEffect(() => {
  //   if (userData) {
  //     getUsersMessages()
  //   }
  // }, [])

  return (
    <LinearGradient
      colors={['#fff', '#f1f1f1']}
      style={{ flex: 1, paddingBottom: 70 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View
        style={{
          paddingBottom: 20,
          backgroundColor: '#fff',
          shadowOpacity: 1,
          elevation: 5,
          shadowRadius: 15,
          shadowOffset: {
            width: 10,
            height: 10
          },
          shadowColor: 'black'
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
            alignItems: 'center',
            marginTop: 30,
            paddingHorizontal: Dimensions.get('screen').width * 0.05
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              style={{ height: 20, width: 20 }}
              contentFit="cover"
              source={require('../../assets/back.png')}
            />
          </Pressable>
          <Text
            style={{
              fontSize: FontSize.size_5xl,
              color: Color.negro,
              textAlign: 'left',
              fontFamily: FontFamily.lato,
              fontWeight: '700'
            }}
          >
            Mensajes / Grupos
          </Text>
        </View>
        <BarraBusqueda navigate={navigation.navigate} route="CrearGrupo" />
        <View
          style={{
            paddingHorizontal: 0,
            paddingLeft: Dimensions.get('screen').width * 0.05
          }}
        >
          <ButtonsMensajeria />
        </View>
      </View>
      {/* ========================== MENSAJES ======================= */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10
        }}
      >
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
              receiverId: 3,
              receiverName: 'Random User'
            })
            // dispatch(setMessage(message))
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
              {'User name'}
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
              {'random message'}
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
              {'hace 2 minutos'}
            </Text>
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
                {3}
              </Text>
            </View>
          </View>
        </Pressable>
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
              receiverId: 8,
              receiverName: 'Hardcoded user'
            })
            // dispatch(setMessage(message))
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
              {'Hardcoded user'}
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
              {'hardcoded message'}
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
              {'hace 5 minutos'}
            </Text>
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
                {2}
              </Text>
            </View>
          </View>
        </Pressable>
      </ScrollView>
      {/* <Messages /> */}

      {/* <View style={{ borderWidth: 2, width: '100%', flex: 1 }}>
        <View style={{}}></View>
      </View> */}
    </LinearGradient>
  )
}

export default MENSAJERA
