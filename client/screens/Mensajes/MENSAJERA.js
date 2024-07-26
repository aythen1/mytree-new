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
import axiosInstance from '../../apiBackend'
import TopBar from '../../components/TopBar'

const MENSAJERA = () => {
  const navigation = useNavigation()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const { allMessages } = useSelector((state) => state.chats)
  const { allUsers , userData:usuario } = useSelector((state) => state.users)
  const { usersWithMessages, userData, getUsersMessages } = useContext(Context)
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [filteredUsersWithMessages, setFilteredUsersWithMessages] = useState(
    usersWithMessages || []
  )
  const [userGoups ,setUserGroups]=useState([])

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

  useEffect(()=>{
    const obtenerGrupos =async ()=> {
      const res = await axiosInstance.get(`/chat/grupsUser/${usuario?.id}`)
      console.log(res.data,"dataaaaaaaaaaaaaa")
      setUserGroups(res.data)
    }
   if(selectedFilter == 'All' || selectedFilter == 'Groups'){
  obtenerGrupos()

  }
  },[selectedFilter])

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
    getUsersMessages().then(()=> {
      setLoading(false)
    })
  }, [allMessages])

  useEffect(() => {
    if (selectedFilter.length > 0) {
      const userFamily =
        allUsers.filter((user) => user.id === userData.id)[0]?.familyIds || []
      const userFriends =
        allUsers.filter((user) => user.id === userData.id)[0]?.friendsIds || []

      if (selectedFilter === 'All') {
        const da1 = usersWithMessages.filter((e) => e.username && e); 
        // Primer filtrado para asegurarte de que `username` exista
        const da = [...da1,...userGoups]
        const uniqueUsers = [];
        const seenUsernames = new Set();
        
        for (const user of da) {
          if (!seenUsernames.has(user.id)) {
            seenUsernames.add(user.id);
            uniqueUsers.push(user);
          }
        }
        console.log(uniqueUsers,"mennnnnnnnnn")
        setFilteredUsersWithMessages(uniqueUsers)
      } else if (selectedFilter === 'Friends') {
        const da =   [...usersWithMessages].filter((user) => userFriends.includes(user.id))
        const uniqueUsers = [];
        const seenUsernames = new Set();
        
        for (const user of da) {
          if (!seenUsernames.has(user.id)) {
            seenUsernames.add(user.id);
            uniqueUsers.push(user);
          }
        }
        setFilteredUsersWithMessages(
          uniqueUsers
        )
      } else if (selectedFilter === 'Family') {
       const da = [...usersWithMessages].filter((user) => userFamily.includes(user.id))
       const uniqueUsers = [];
       const seenUsernames = new Set();
       
       for (const user of da) {
         if (!seenUsernames.has(user.id)) {
           seenUsernames.add(user.id);
           uniqueUsers.push(user);
         }
       }
       setFilteredUsersWithMessages(
        uniqueUsers
        )
      } else if (selectedFilter === 'Groups' ) {
        const da = userGoups
        console.log(userGoups,"men2")
        const uniqueUsers = [];
        const seenUsernames = new Set();
        
        for (const user of da) {
          if (!seenUsernames.has(user.room)) {
            seenUsernames.add(user.room);
            uniqueUsers.push(user);
          }
        }
        setFilteredUsersWithMessages(uniqueUsers)
      }
    }
  }, [selectedFilter])

  


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

        <TopBar screen={"mensajes"}></TopBar>
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
            alignItems: 'center',
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
            ? filteredUsersWithMessages?.map((user,i) => (
                <ChatCard
                  value={search}
                  key={i}
                  name={ !user.groupName ? `${user?.username} ${user?.apellido}`: user?.groupName}
                  selectedUserId={user.id}
                  isGroup={selectedFilter !== 'Groups' ? false : true }
                  userInfo={user}
                />
              ))
            : (search === '' &&  filteredUsersWithMessages.length < 1) && (
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
                    ¡Aún no tienes chats, inicia una conversación!
                  </Text>
                </View>
              )}
        </ScrollView>
      )}
    </LinearGradient>
  )
}

export default MENSAJERA
