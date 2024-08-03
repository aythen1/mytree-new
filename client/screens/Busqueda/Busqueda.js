import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  ScrollView,
  TextInput
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  Padding,
  Border,
  FontSize,
  FontFamily,
  Color
} from '../../GlobalStyles'
import BusquedaContactos from './BusquedaComponents/BusquedaContactos'
import BusquedaPublicaciones from './BusquedaComponents/BusquedaPublicaciones'
import BusquedaDiarios from './BusquedaComponents/BusquedaDiarios'
import BusquedaHashtags from './BusquedaComponents/BusquedaHashtags'
import BusquedaEventos from './BusquedaComponents/BusquedaEventos'
import MasBusquedaSVG from '../../components/svgs/MasBusquedaSVG'
import BarraBusqueda from '../../components/BarraBusqueda'
import Post from '../../components/Post'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../../redux/actions/posts'
import TopBar from '../../components/TopBar'

const Busqueda = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const { allPosts } = useSelector((state) => state.posts)
  const { allEvents } = useSelector((state) => state.events)
  const [filteredPosts, setFilteredPosts] = useState(allPosts || [])
  const [filteredEvents, setFilteredEvents] = useState(allEvents || [])

  useEffect(() => {
    dispatch(getAllPosts())
  }, [])
  const { userData } = useSelector((state)=> state.users)

  const [selectedComponent, setSelectedComponent] =
    useState('BusquedaContactos')

  useEffect(() => {
    setSearch('')
  }, [selectedComponent])

  useEffect(() => {
    if (search?.length > 0) {
      if (selectedComponent === 'BusquedaPublicaciones') {
        const postFilteredBySearch = [...allPosts].filter((post) => {
          if (
            post.hashtags
              .map((hashtag) => hashtag.toLowerCase())
              .includes(search.toLowerCase())
          ) {
            return true
          }
          if (post.description.toLowerCase().includes(search.toLowerCase())) {
            return true
          }
          if (post.nameUser.toLowerCase().includes(search.toLowerCase())) {
            return true
          }
          return false
        })
        setFilteredPosts(postFilteredBySearch)
      }
      if (selectedComponent === 'BusquedaEventos') {

        const eventsFilteredBySearch = allEvents.filter((e)=> e.creatorId == userData.id)
        setFilteredEvents(eventsFilteredBySearch)
      }
      if (selectedComponent === 'BusquedaHashtags') {

        const postFilteredBySearch = [...allPosts].filter((post) => {
          if (post.hashtags && post?.hashtags?.length > 0) {
            const hashtagsLowerCase = post.hashtags.map((hashtag) =>
              hashtag.toLowerCase()
            )
            const includesSearch = hashtagsLowerCase.some((hashtag) =>
              hashtag.includes(search.toLowerCase())
            )
            return includesSearch
          } else {
            return false
          }
        })
        setFilteredPosts(postFilteredBySearch)
      }
    } else {
      if (selectedComponent === 'BusquedaPublicaciones') {
        setFilteredPosts(allPosts)
      }
      if (selectedComponent === 'BusquedaEventos') {
        setFilteredEvents()
      }
      if (selectedComponent === 'BusquedaHashtags') {
        setFilteredEvents([])
      }
      // if (selectedComponent === 'BusquedaContactos') {
      //   setFilteredContacts(allUsers)
      // }
      // if (selectedComponent === 'BusquedaDiarios') {
      //   setFilteredDiaries(allDiaries)
      // }
    }
  }, [search])

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'BusquedaContactos':
        return <BusquedaContactos searchOnContacts={search} />
      case 'BusquedaPublicaciones':
        return <Post posts={filteredPosts} padding={true} />
      case 'BusquedaDiarios':
        return <BusquedaDiarios search={search} setSearch={setSearch} />
      case 'BusquedaHashtags':
        return (
          <BusquedaHashtags
            search={search}
            setSearch={setSearch}
            filteredPosts={filteredPosts}
          />
        )
      case 'BusquedaEventos':
        return <BusquedaEventos events={filteredEvents} />
      default:
        return null
    }
  }

  return (
    <LinearGradient
      colors={['#fff', '#f6f6f6']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView
        style={{ width: '100%', flex: 1 }}
        contentContainerStyle={{
          paddingBottom: selectedComponent === 'BusquedaContactos' ? 110 : 100
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingBottom: 10,
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
          {/* <Pressable onPress={() => navigation.openDrawer()}>
            <Image
              style={[
                {
                  width: 87,
                  height: 55
                }
              ]}
              contentFit="cover"
              source={require('../../assets/image-6.png')}
            />
          </Pressable> */}
          <TopBar screen={"busqueda"}></TopBar>
          <View style={styles.backParent}>
            <Pressable
              style={styles.back}
              onPress={() => navigation.navigate('Muro')}
            >
              <Image
                style={styles.icon}
                contentFit="cover"
                source={require('../../assets/back.png')}
              />
            </Pressable>
            <Text style={[styles.bsqueda1, styles.bsqueda1Typo]}>Búsqueda</Text>
          </View>

          <BarraBusqueda
            search={search}
            setSearch={setSearch}
            fromSearch={true}
          />

          <ScrollView
            style={styles.tabsParent}
            horizontal={true}
            contentContainerStyle={{paddingRight:20}}
            showsHorizontalScrollIndicator={false}
          >
            <Pressable
              style={[
                selectedComponent === 'BusquedaContactos'
                  ? styles.tabs
                  : styles.contactosWrapper,
                styles.tabsFlexBox
              ]}
              onPress={() => setSelectedComponent('BusquedaContactos')}
            >
              <Text
                style={[
                  selectedComponent === 'BusquedaContactos'
                    ? styles.retos
                    : styles.contactos,
                  styles.retosTypo
                ]}
              >
                Contactos
              </Text>
            </Pressable>
            <Pressable
              style={[
                selectedComponent === 'BusquedaPublicaciones'
                  ? styles.tabs
                  : styles.contactosWrapper,
                styles.tabsFlexBox
              ]}
              onPress={() => setSelectedComponent('BusquedaPublicaciones')}
            >
              <Text
                style={[
                  selectedComponent === 'BusquedaPublicaciones'
                    ? styles.retos
                    : styles.contactos,
                  styles.retosTypo
                ]}
              >
                Publicaciones
              </Text>
            </Pressable>
            <Pressable
              style={[
                selectedComponent === 'BusquedaDiarios'
                  ? styles.tabs
                  : styles.contactosWrapper,
                styles.tabsFlexBox
              ]}
              onPress={() => setSelectedComponent('BusquedaDiarios')}
            >
              <Text
                style={[
                  selectedComponent === 'BusquedaDiarios'
                    ? styles.retos
                    : styles.contactos,
                  styles.retosTypo
                ]}
              >
                Diarios
              </Text>
            </Pressable>
            <Pressable
              style={[
                selectedComponent === 'BusquedaHashtags'
                  ? styles.tabs
                  : styles.contactosWrapper,
                styles.tabsFlexBox
              ]}
              onPress={() => setSelectedComponent('BusquedaHashtags')}
            >
              <Text
                style={[
                  selectedComponent === 'BusquedaHashtags'
                    ? styles.retos
                    : styles.contactos,
                  styles.retosTypo
                ]}
              >
                Hashtags
              </Text>
            </Pressable>
            <Pressable
              style={[
                selectedComponent === 'BusquedaEventos'
                  ? styles.tabs
                  : styles.contactosWrapper,
                styles.tabsFlexBox
              ]}
              onPress={() => setSelectedComponent('BusquedaEventos')}
            >
              <Text
                style={[
                  selectedComponent === 'BusquedaEventos'
                    ? styles.retos
                    : styles.contactos,
                  styles.retosTypo
                ]}
              >
                Eventos
              </Text>
            </Pressable>
          </ScrollView>
        </View>
        {renderSelectedComponent()}
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  bsqueda1Typo: {
    textAlign: 'left',
    fontWeight: '700'
  },
  tabsFlexBox: {
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: 4,
    borderRadius: Border.br_7xs,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 2
  },
  retosTypo: {
    textAlign: 'center',
    lineHeight: 19,
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    fontFamily: FontFamily.lato
  },
  retoSemanalClr: {
    color: Color.white,
    letterSpacing: 0,
    fontFamily: FontFamily.lato
  },
  navigationIcon: {
    top: 821,
    height: 105
  },
  bsquedaChild: {
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 25,
    elevation: 25,
    shadowOpacity: 1
  },
  image6Icon: {
    top: 3,
    width: 87,
    height: 55
  },
  icon: {
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  back: {
    width: 24,
    height: 24
  },
  bsqueda1: {
    fontSize: FontSize.size_5xl,
    color: Color.negro,
    marginLeft: 20,
    fontFamily: FontFamily.lato,
    textAlign: 'left'
  },
  backParent: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal:10
  },
  iconlylightsendCopyWrapper: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.backgroundGreyBackground,
    padding: Padding.p_7xs,
    marginLeft: 16,
    flexDirection: 'row'
  },
  retos: {
    color: Color.primario1,
    fontWeight: '700',
    textAlign: 'center'
  },
  tabs: {
    backgroundColor: Color.secundario,
    width: 114
  },
  contactosWrapper: {
    width: 114,
    overflow: 'hidden'
  },
  contactos: {
    color: Color.grisGeneral
  },
  tabsParent: {
    marginTop: 15,
    flexDirection: 'row',
    paddingHorizontal:10
  },
  bsqueda: {
    width: '100%',
    flex: 1
  },
  bsquedaContainer: {
    paddingBottom: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 15,
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowColor: 'black'
  }
})

export default Busqueda
