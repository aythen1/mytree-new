import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  Pressable,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from 'react-native'
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
import { isLoading } from 'expo-font'

const MENSAJERA = () => {
  const navigation = useNavigation()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const { allMessages } = useSelector((state) => state.chats)
  const { allUsers } = useSelector((state) => state.users)
  const { usersWithMessages, userData, getUsersMessages } = useContext(Context)
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [filteredUsersWithMessages, setFilteredUsersWithMessages] = useState(
    usersWithMessages || []
  )

  const sortUsers = (userA, userB) => {
    const isInMessagesA = filteredUsersWithMessages?.some(
      (user) => user.id === userA.id
    )
    const isInMessagesB = filteredUsersWithMessages?.some(
      (user) => user.id === userB.id
    )

    if (isInMessagesA && !isInMessagesB) {
      return -1
    } else if (!isInMessagesA && isInMessagesB) {
      return 1
    } else {
      return 0
    }
  }

  const filteredUsers = allUsers
    ?.filter(
      (user) =>
        user?.username?.toLowerCase()?.includes(search?.toLowerCase()) ||
        user?.apellido?.toLowerCase()?.includes(search?.toLowerCase())
    )
    .sort(sortUsers)

  useEffect(() => {
    console.log('USERSWITHMESSAGES', usersWithMessages.length)
  }, [usersWithMessages])

  useEffect(() => {
    getUsersMessages()
  }, [allMessages])

  useEffect(() => {
    if (selectedFilter.length > 0) {
      const userFamily =
        allUsers.filter((user) => user.id === userData.id)[0]?.familyIds || []
      const userFriends =
        allUsers.filter((user) => user.id === userData.id)[0]?.friendsIds || []
      if (selectedFilter === 'All') {
        setFilteredUsersWithMessages([...usersWithMessages])
      } else if (selectedFilter === 'Friends') {
        setFilteredUsersWithMessages(
          [...usersWithMessages].filter((user) => userFriends.includes(user.id))
        )
      } else if (selectedFilter === 'Family') {
        setFilteredUsersWithMessages(
          [...usersWithMessages].filter((user) => userFamily.includes(user.id))
        )
      } else if (selectedFilter === 'Groups') {
        setFilteredUsersWithMessages([])
      }
    }
  }, [selectedFilter])

  useEffect(() => {
    setTimeout(() => setLoading(false), 700)
  }, [])

  // console.log('allUsers: ', allUsers)

  useEffect(() => {
    console.log('usersWithMessages:', usersWithMessages)
  }, [usersWithMessages])

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

        <ButtonsMensajeria
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      </View>
      {/* ========================== MENSAJES ======================= */}
      {loading ? (
        <ActivityIndicator
          style={{
            backgroundColor: 'transparent',
            alignSelf: 'center',
            marginTop: '20%'
          }}
          animating={true}
          size="xlarge"
          color={'#B7E4C0'}
        />
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 10
          }}
        >
          {search !== '' && filteredUsers.length > 0
            ? filteredUsers?.map((user) => (
                <ChatCard
                  value={search}
                  key={user.id}
                  name={user.username + ' ' + user.apellido}
                  selectedUserId={user.id}
                />
              ))
            : search !== '' &&
              filteredUsers.length === 0 && (
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    paddingTop: 50
                  }}
                >
                  <Text
                    style={{ fontSize: 14, fontWeight: 500, color: '#202020' }}
                  >
                    No se han encontrado resultados!
                  </Text>
                </View>
              )}
          {search === '' && filteredUsersWithMessages.length > 0
            ? filteredUsersWithMessages?.map((user) => (
                <ChatCard
                  value={search}
                  key={user.id}
                  name={user.username + ' ' + user.apellido}
                  selectedUserId={user.id}
                />
              ))
            : search === '' && (
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    paddingTop: 50
                  }}
                >
                  <Text
                    style={{ fontSize: 14, fontWeight: 500, color: '#202020' }}
                  >
                    Aun no tienes chats, inicia una conversacion!
                  </Text>
                </View>
              )}
        </ScrollView>
      )}
    </LinearGradient>
  )
}

export default MENSAJERA
