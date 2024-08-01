import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  Pressable,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Color, FontFamily, FontSize } from '../../GlobalStyles'
import { Image } from 'expo-image'
import ButtonsMensajeria from '../../components/ButtonsMensajeria'
import BarraBusqueda from '../../components/BarraBusqueda'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Context } from '../../context/Context'
import ChatCard from './ChatCard'
import { useDispatch, useSelector } from 'react-redux'
import { isLoading } from 'expo-font'
import axiosInstance from '../../apiBackend'
import TopBar from '../../components/TopBar'
import { setScreen } from '../../redux/slices/user.slices'

const MENSAJERA = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const { allMessages , groups ,allChats} = useSelector((state) => state.chats)
  const { allUsers, userData: usuario } = useSelector((state) => state.users)
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

  useFocusEffect(()=> {
    dispatch(setScreen("Mensajería"))

  })
 





    const filteredUsers = allUsers
    ?.filter(
      (user) =>
        user?.username?.toLowerCase()?.includes(search?.toLowerCase()) ||
        user?.apellido?.toLowerCase()?.includes(search?.toLowerCase())
    )
    .sort(sortUsers);

    const filterUsers = useCallback(() => {
      if (!selectedFilter || !allUsers || !userData || !usersWithMessages) {
        return;
      }
    
      setLoading(true);
    
      const user = allUsers.find((user) => user.id === userData.id);
      const userFamily = user?.familyIds || [];
      const userFriends = user?.friendsIds || [];
    
      const filterAndSetUsers = (filteredUsers) => {
        const uniqueUsers = [];
        const seenUsernames = new Set();
    
        for (const user of filteredUsers) {
          if (!seenUsernames.has(user.id)) {
            seenUsernames.add(user.id);
            uniqueUsers.push(user);
          }
        }
    
        setFilteredUsersWithMessages(uniqueUsers);
        setLoading(false);
      };
    
      let filteredUsers = [];
    
      switch (selectedFilter) {
        case 'All':
          filteredUsers = usersWithMessages.filter((e) => e.username);
          filteredUsers = [...filteredUsers, ...groups];
          break;
        case 'Friends':
          filteredUsers = usersWithMessages.filter((user) => userFriends.includes(user.id));
          break;
        case 'Family':
          filteredUsers = usersWithMessages.filter((user) => userFamily.includes(user.id));
          break;
        case 'Groups':
          filteredUsers = groups;
          break;
        default:
          break;
      }
    
      filterAndSetUsers(filteredUsers);
    }, [selectedFilter, allUsers, userData, usersWithMessages, groups]);
    
    useFocusEffect(filterUsers);
    
    useEffect(() => {
      getUsersMessages(userData)
      if (allUsers && userData && usersWithMessages) {
        filterUsers();
      }
    }, [allUsers, userData]);
    



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
        <TopBar screen={'mensajes'}></TopBar>
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
            ? filteredUsersWithMessages?.map((user, i) => (
                <ChatCard
                  value={search}
                  key={i}
                  name={
                    !user.groupName
                      ? `${user?.username} ${user?.apellido}`
                      : user?.groupName
                  }
                  selectedUserId={user.id}
                  isGroup={selectedFilter !== 'Groups' ? false : true}
                  userInfo={user}
                />
              ))
            : search === '' &&
              filteredUsersWithMessages.length < 1 && (
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
