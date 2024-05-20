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
import ChatCard from './ChatCard'
import { useSelector } from 'react-redux'

const MENSAJERA = () => {
  const navigation = useNavigation()
  const [search, setSearch] = useState('')
  const { allUsers } = useSelector((state) => state.users)
  const { usersWithMessages, userData, getUsersMessages } = useContext(Context)

  useEffect(() => {
    console.log('usersWithMessages changed:', usersWithMessages)
  }, [usersWithMessages])

  useEffect(() => {
    if (userData) {
      getUsersMessages()
    }
  }, [])

  // console.log('allUsers: ', allUsers)

  const sortUsers = (userA, userB) => {
    const isInMessagesB =
      usersWithMessages?.filter((user) => user.id === userA.id).length > 0
    const isInMessagesA =
      usersWithMessages?.filter((user) => user.id === userB.id).length > 0

    if (isInMessagesA && !isInMessagesB) {
      return -1 // userA has messages, should come before userB
    } else if (!isInMessagesA && isInMessagesB) {
      return 1 // userB has messages, should come before userA
    } else {
      return 0 // maintain current order if both have messages or neither have messages
    }
  }

  const filteredUsers = allUsers
    ?.filter((user) => {
      if (user.username.toLowerCase()?.includes(search?.toLowerCase())) {
        return true
      }
      if (user.apellido.toLowerCase()?.includes(search?.toLowerCase())) {
        return true
      }
      return false
    })
    .sort(sortUsers)
    .reverse()

  console.log('usersWithMessages:', usersWithMessages)

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
        <BarraBusqueda
          search={search}
          setSearch={setSearch}
          navigate={navigation.navigate}
          route="CrearGrupo"
        />
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
        {search !== '' && filteredUsers.length > 0
          ? filteredUsers?.map((user) => (
              <ChatCard
                key={user.id}
                name={user.username + ' ' + user.apellido}
                selectedUserId={user.id}
              />
            ))
          : search !== '' &&
            filteredUsers.length === 0 && (
              <View
                style={{ width: '100%', alignItems: 'center', paddingTop: 50 }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: 500, color: '#202020' }}
                >
                  No se han encontrado resultados!
                </Text>
              </View>
            )}
        {search === '' &&
          usersWithMessages?.map((user) => (
            <ChatCard
              key={user.id}
              name={user.username + ' ' + user.apellido}
              selectedUserId={user.id}
            />
          ))}
      </ScrollView>
    </LinearGradient>
  )
}

export default MENSAJERA
