import React, { useState, useCallback, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from 'expo-image'
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Keyboard
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Etiquetar from '../components/Etiquetar'
import Lugar3 from '../components/Lugar3'
import { FontSize, FontFamily, Color, Border, Padding } from '../GlobalStyles'
import Checkbox from 'expo-checkbox'
import ENTRADACREADA from '../components/ENTRADACREADA'
import { setPanel } from '../redux/slices/panel.slices'
import Album from './Album'
import PopUpCalendario from '../components/PopUpCalendario'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { BACKURL } from '../apiBackend'
import Privacidad from './Privacidad'
import { Context } from '../context/Context'
import { StatusBar } from 'react-native'
import Cancion1 from '../components/Cancion1'
import MapView from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import { getAllPosts } from '../redux/actions/posts'
import { getUserPosts } from '../redux/slices/user.slices'
import Maps from '../components/Maps'

const Organizador = () => {
  const dispatch = useDispatch()
  const [taggedUsers, setTaggedUsers] = useState([])
  const { showPanel } = useSelector((state) => state.panel)
  const { userData, allUsers } = useSelector((state) => state.users)

  const {
    libraryImage,
    showHashtagsModal,
    setShowHashtagsModal,
    selectedHashtags,
    setSelectedHashtags
  } = useContext(Context)

  const [legado, setLegado] = useState(false)
  const [album, setAlbum] = useState(false)
  const [selectedAlbum, setSelectedAlbum] = useState(false)
  const [añadirAUnAlbum, setAñadirAUnAlbum] = useState(false)
  const [calendario, setCalendario] = useState(false)
  const [lugar, setLugar] = useState(false)
  const [frameContainer2Visible, setFrameContainer2Visible] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [showEtapas, setShowEtapas] = useState(false)
  const [usuario, setUsuario] = useState({})
  const [username, setUsername] = useState('')

  useEffect(() => {}, [taggedUsers])

  const [dataToSend, setDataToSend] = useState({
    nameUser: '',
    description: '',
    fecha: '',
    photos: [],
    tags: [],
    hashtags: [],
    userId: ''
  })
  useEffect(() => {
    const getUser = async () => {
      const usuario = await AsyncStorage.getItem('user')
      const par = JSON.parse(usuario)
      console.log(par, 'parrr')
      setDataToSend({ ...dataToSend, ['nameUser']: par.username })
      setDataToSend({ ...dataToSend, ['userId']: par.id })

      return JSON.parse(usuario)
    }
    getUser()
  }, [])

  const [uploadRecuerdo, setUploadRecuerdo] = useState(false)
  const [cancion, setCancion] = useState(false)
  const [ischecked, setIschecked] = useState(false)
  const [buttonContainer1Visible, setButtonContainer1Visible] = useState(false)
  const [frameContainer5Visible, setFrameContainer5Visible] = useState(false)
  const [showPrivacidad, setShowPrivacidad] = useState(false)
  const [privacy, setPrivacy] = useState()
  const [location, setLocation] = useState()
  const [selectedDate, setSelectedDate] = useState()

  const closeSubmit = () => {
    setSubmit(false)
  }

  const openSelectedAlbum = useCallback(() => {
    setSelectedAlbum(true)
  }, [])

  const closeSelectedAlbum = useCallback(() => {
    setSelectedAlbum(false)
  }, [])

  // const openAlbum = useCallback(() => {
  //   setAñadirAUnAlbum(true)
  // }, [])

  // const closeAlbum = useCallback(() => {
  //   setAñadirAUnAlbum(false)
  // }, [])

  const openLugar = useCallback(() => {
    setLugar(true)
  }, [])

  const closeLugar = useCallback(() => {
    setLugar(false)
  }, [])

  const openCalendario = useCallback(() => {
    setCalendario(true)
  }, [])

  const closeCalendario = useCallback(() => {
    setCalendario(false)
  }, [])

  const openEtapas = useCallback(() => {
    setShowEtapas(true)
  }, [])

  const closeEtapas = useCallback(() => {
    setShowEtapas(false)
  }, [])

  const openPrivacidad = useCallback(() => {
    setShowPrivacidad(true)
  }, [])

  const closePrivacidad = useCallback(() => {
    setShowPrivacidad(false)
  }, [])

  const openFrameContainer2 = useCallback(() => {
    setFrameContainer2Visible(true)
  }, [])

  const closeFrameContainer2 = useCallback(() => {
    setFrameContainer2Visible(false)
  }, [])

  const [keyboardVisible, setKeyboardVisible] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true)
      }
    )

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false)
      }
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const handleSubmit = async () => {
    try {
      const finalData = {}
      finalData.tags = taggedUsers
      finalData.hashtags = selectedHashtags
      finalData.userId = userData.id
      finalData.fecha = selectedDate ? selectedDate : new Date()
      finalData.nameUser = userData.username
      finalData.photos = [libraryImage]
      finalData.description = dataToSend.description
      console.log('sending post...', finalData)
      const res = await axios.post(`${BACKURL}/posts`, finalData)

      console.log('res:', res)

      if (res.data) {
        console.log('res.data: ', res.data)
        setSubmit(true)
        setSelectedHashtags([])
        setTaggedUsers([])
        dispatch(getUserPosts(userData.id))
      }
    } catch (error) {
      console.log(error)
      setSelectedHashtags([])
      setTaggedUsers([])
    }
  }

  const navigation = useNavigation()

  return (
    <LinearGradient
      colors={['#fff', '#f1f1f1']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0.6 }}
      end={{ x: 0, y: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width: '100%',
          flex: 1,
          padding: Padding.p_xl
        }}
      >
        <Image
          style={{
            width: 87,
            height: 55
          }}
          contentFit="cover"
          source={require('../assets/image-6.png')}
        />
        <View style={{ width: '100%' }}>
          <View
            style={{
              height: 29,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <Pressable onPress={() => navigation.openDrawer()}>
              <Image
                style={{
                  top: 5,
                  width: 26,
                  height: 20,
                  overflow: 'hidden'
                }}
                contentFit="cover"
                source={require('../assets/ionmenu2.png')}
              />
            </Pressable>
            <Text
              style={{
                fontSize: FontSize.size_5xl,
                fontWeight: '700',
                textAlign: 'left',
                fontFamily: FontFamily.lato,
                color: Color.negro,
                top: 0
              }}
            >
              Subir recuerdo
            </Text>
            <Pressable
              disabled={!libraryImage || dataToSend.description === ''}
              onPress={handleSubmit}
            >
              <Text
                style={{
                  color: Color.primario1,
                  fontWeight: '500',
                  letterSpacing: 0,
                  lineHeight: 22,
                  fontSize: FontSize.size_lg,
                  fontFamily: FontFamily.lato
                }}
              >
                Subir
              </Text>
            </Pressable>
          </View>
          <ScrollView
            style={{
              width: '100%',
              marginTop: 15,
              height: '73%'
            }}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: 40
            }}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <LinearGradient
                locations={[0, 1]}
                colors={['#7ec18c', '#dee274']}
                style={{ padding: 2, borderRadius: 12 }}
              >
                <TextInput
                  multiline={true}
                  numberOfLines={3}
                  style={{
                    color: '#202020',
                    fontWeight: '500',
                    fontSize: FontSize.size_lg,
                    textAlign: 'left',
                    textAlignVertical: 'top',
                    borderRadius: Border.br_3xs,
                    backgroundColor: Color.fAFAFA,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    fontFamily: FontFamily.lato
                  }}
                  placeholder=" Describe lo que sientes..."
                  onChangeText={(des) =>
                    setDataToSend({ ...dataToSend, ['description']: des })
                  }
                  value={dataToSend.description}
                  onFocus={() => setKeyboardVisible(true)}
                />
              </LinearGradient>
              <View style={{ marginTop: 15 }}>
                <Text
                  style={{
                    marginBottom: 6,
                    color: '#000',
                    fontSize: 16,
                    fontFamily: FontFamily.lato
                  }}
                >
                  Hashtags
                </Text>
                <View
                  style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    width: '100%',
                    gap: 3
                  }}
                >
                  {selectedHashtags.map((hashtag, index) => (
                    <View
                      key={index}
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        backgroundColor: Color.secundario,
                        justifyContent: 'center',
                        gap: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 100
                      }}
                    >
                      <Text
                        style={{
                          color: Color.primario1,
                          fontSize: FontSize.size_xs,
                          fontFamily: FontFamily.lato,
                          fontWeight: '500'
                        }}
                      >
                        {`#${hashtag}`}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedHashtags(
                            selectedHashtags.filter((tag) => tag !== hashtag)
                          )
                        }}
                      >
                        <Image
                          style={{ width: 10, height: 10 }}
                          source={require('../assets/group-68462.png')}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                  <TouchableOpacity
                    onPress={() => setShowHashtagsModal(true)}
                    style={{
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      backgroundColor: Color.secundario,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 100
                    }}
                  >
                    <Text
                      style={{
                        color: Color.primario1,
                        fontSize: FontSize.size_xs,
                        fontFamily: FontFamily.lato,
                        fontWeight: '500'
                      }}
                    >
                      {'Añadir #'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 5 }}>
              <Pressable
                style={{
                  marginTop: 15,
                  alignItems: 'center',
                  flexDirection: 'row'
                }}
                onPress={openFrameContainer2}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 10,
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                  }}
                >
                  <Image
                    style={{ width: 22, height: 22 }}
                    contentFit="cover"
                    source={require('../assets/iconlyboldadduser.png')}
                  />
                </View>
                {taggedUsers.length === 0 ? (
                  <Text
                    style={{
                      lineHeight: 19,
                      color: Color.gris,
                      fontSize: FontSize.size_base
                    }}
                  >
                    Etiquetar
                  </Text>
                ) : (
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      lineHeight: 19,
                      color: Color.gris,
                      fontSize: FontSize.size_base,
                      maxWidth: '85%'
                    }}
                  >
                    {allUsers
                      .filter((user) => taggedUsers.includes(user.id))
                      .map((user) => `${user.username} ${user.apellido}`)
                      .join(', ')}
                  </Text>
                )}
              </Pressable>
              <Pressable
                style={{
                  marginTop: 15,
                  alignItems: 'center',
                  flexDirection: 'row'
                }}
                onPress={openCalendario}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 10,
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                  }}
                >
                  <Image
                    style={{ width: 22, height: 22 }}
                    contentFit="cover"
                    source={require('../assets/vector14.png')}
                  />
                </View>
                {selectedDate ? (
                  <Text
                    style={{
                      lineHeight: 19,
                      color: Color.gris,
                      fontSize: FontSize.size_base
                    }}
                  >
                    {selectedDate.split('-').reverse().join('-')}
                  </Text>
                ) : (
                  <Text
                    style={{
                      lineHeight: 19,
                      color: Color.gris,
                      fontSize: FontSize.size_base
                    }}
                  >
                    Fecha
                  </Text>
                )}
              </Pressable>
              <Pressable
                style={{
                  marginTop: 15,
                  alignItems: 'center',
                  flexDirection: 'row'
                }}
                onPress={openLugar}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    marginRight: 10,
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                  }}
                >
                  <Image
                    style={{ width: 20, height: 29 }}
                    contentFit="cover"
                    source={require('../assets/iconlybulklocation.png')}
                  />
                </View>

                {location ? (
                  <Text
                    style={{
                      lineHeight: 19,
                      color: Color.gris,
                      fontSize: FontSize.size_base
                    }}
                  >
                    {location}
                  </Text>
                ) : (
                  <Text
                    style={{
                      lineHeight: 19,
                      color: Color.gris,
                      fontSize: FontSize.size_base
                    }}
                  >
                    Lugar
                  </Text>
                )}
              </Pressable>
              {/* =============== ADD TO ALBUM ================= */}
              <View
                style={{
                  marginTop: 15,
                  flexDirection: 'column',
                  width: '100%',
                  alignItems: 'center'
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Pressable
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row'
                    }}
                    onPress={() => {
                      setAñadirAUnAlbum(!añadirAUnAlbum)
                    }}
                  >
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        marginRight: 10,
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                      }}
                    >
                      <Image
                        style={{ width: 23, height: 24 }}
                        contentFit="cover"
                        source={require('../assets/image3.png')}
                      />
                    </View>
                    <Text
                      style={{
                        lineHeight: 19,
                        color: Color.gris,
                        fontSize: FontSize.size_base
                      }}
                    >
                      Añadir a un álbum
                    </Text>
                  </Pressable>
                  <Image
                    style={{
                      width: 9,
                      marginRight: 5,
                      height: 16,
                      transform: [{ rotate: añadirAUnAlbum ? '90deg' : '0deg' }]
                    }}
                    contentFit="cover"
                    source={require('../assets/arrowdown22.png')}
                  />
                </View>

                {añadirAUnAlbum && (
                  <View
                    style={{
                      marginTop: 5,
                      width: '100%',
                      gap: 10
                    }}
                  >
                    <Pressable
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%'
                        }}
                      >
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                          <TouchableOpacity onPress={() => setLegado(!legado)}>
                            {legado ? (
                              <Image
                                contentFit="cover"
                                style={{ width: 20, height: 20 }}
                                source={require('../assets/checked.png')}
                              />
                            ) : (
                              <Image
                                contentFit="cover"
                                style={{ width: 20, height: 20 }}
                                source={require('../assets/notchecked.png')}
                              />
                            )}
                          </TouchableOpacity>
                          <Text
                            style={{
                              textAlign: 'left',
                              color: Color.gris,
                              fontFamily: FontFamily.lato,
                              fontWeight: '500',
                              lineHeight: 19,
                              letterSpacing: 0,
                              fontSize: FontSize.size_base
                            }}
                          >
                            Añadir a mi legado
                          </Text>
                        </View>
                        <Pressable
                        // onPress={openEtapas}
                        >
                          <Text
                            style={{
                              height: 30,
                              padding: 5,
                              backgroundColor: Color.secundario,
                              borderRadius: Border.br_11xl,
                              textAlign: 'center',
                              color: Color.primario1,
                              lineHeight: 18,
                              fontSize: FontSize.size_xs,
                              fontFamily: FontFamily.lato
                            }}
                          >
                            Añadir etapa
                          </Text>
                        </Pressable>
                      </View>
                    </Pressable>
                    <Pressable
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%'
                        }}
                      >
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                          <TouchableOpacity onPress={() => setAlbum(!album)}>
                            {album ? (
                              <Image
                                contentFit="cover"
                                style={{ width: 20, height: 20 }}
                                source={require('../assets/checked.png')}
                              />
                            ) : (
                              <Image
                                contentFit="cover"
                                style={{ width: 20, height: 20 }}
                                source={require('../assets/notchecked.png')}
                              />
                            )}
                          </TouchableOpacity>
                          <Text
                            style={{
                              textAlign: 'left',
                              color: Color.gris,
                              fontFamily: FontFamily.lato,
                              fontWeight: '500',
                              lineHeight: 19,
                              letterSpacing: 0,
                              fontSize: FontSize.size_base
                            }}
                          >
                            Añadir a mis albunes
                          </Text>
                        </View>
                        <Pressable onPress={openSelectedAlbum}>
                          <Text
                            style={{
                              height: 30,
                              padding: 5,
                              backgroundColor: Color.secundario,
                              borderRadius: Border.br_11xl,
                              textAlign: 'center',
                              color: Color.primario1,
                              lineHeight: 18,
                              fontSize: FontSize.size_xs,
                              fontFamily: FontFamily.lato
                            }}
                          >
                            Elegir album
                          </Text>
                        </Pressable>
                      </View>
                    </Pressable>
                  </View>
                )}
              </View>
              {/* ============================================== */}
              <View
                style={{
                  marginTop: 15,
                  width: '100%',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Pressable
                  style={{ alignItems: 'center', flexDirection: 'row' }}
                  onPress={openPrivacidad}
                >
                  <Text
                    style={{
                      color: Color.gris,
                      lineHeight: 22,
                      fontSize: FontSize.size_lg
                    }}
                  >
                    Opciones de Privacidad
                  </Text>
                </Pressable>
                <Image
                  style={{
                    width: 9,
                    marginRight: 5,
                    height: 16,
                    transform: [{ rotate: showPrivacidad ? '90deg' : '0deg' }]
                  }}
                  contentFit="cover"
                  source={require('../assets/arrowdown23.png')}
                />
              </View>
            </View>
            <LinearGradient
              style={{
                marginTop: 30,
                paddingVertical: Padding.p_sm,
                backgroundColor: Color.linearBoton,
                borderRadius: Border.br_11xl,
                justifyContent: 'center',
                alignSelf: 'center',
                width: '95%',
                alignItems: 'center',
                flexDirection: 'row'
              }}
              locations={[0, 1]}
              colors={['#dee274', '#7ec18c']}
            >
              <Text
                disabled={!libraryImage || dataToSend.description === ''}
                onPress={handleSubmit}
                style={{
                  letterSpacing: 1,
                  lineHeight: 24,
                  color: Color.white,
                  textAlign: 'center',
                  fontSize: FontSize.size_base,
                  fontFamily: FontFamily.lato
                }}
              >
                Subir
              </Text>
            </LinearGradient>
          </ScrollView>
        </View>
        {/* {!keyboardVisible && (
          <LinearGradient
            style={{
              paddingVertical: Padding.p_sm,
              backgroundColor: Color.linearBoton,
              borderRadius: Border.br_11xl,
              justifyContent: 'center',
              alignSelf: 'center',
              width: '95%',
              alignItems: 'center',
              flexDirection: 'row'
            }}
            locations={[0, 1]}
            colors={['#dee274', '#7ec18c']}
          >
            <Text
              disabled={!libraryImage || dataToSend.description === ''}
              onPress={handleSubmit}
              style={{
                letterSpacing: 1,
                lineHeight: 24,
                color: Color.white,
                textAlign: 'center',
                fontSize: FontSize.size_base,
                fontFamily: FontFamily.lato
              }}
            >
              Subir
            </Text>
          </LinearGradient>
        )} */}
        <Modal animationType="slide" transparent visible={showEtapas}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(113, 113, 113, 0.3)',
              height: '100%'
            }}
          >
            <Pressable
              style={{ width: '100%', height: '100%', left: 0, top: 0 }}
              onPress={closeEtapas}
            />
            {/* <Etapas onClose={closeEtapas} /> */}
          </View>
        </Modal>
        <Modal animationType="slide" transparent visible={selectedAlbum}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(113, 113, 113, 0.3)',
              height: '100%'
            }}
          >
            <Pressable
              style={{ width: '100%', height: '100%', left: 0, top: 0 }}
              onPress={closeSelectedAlbum}
            />
            <Album onClose={closeSelectedAlbum} />
          </View>
        </Modal>
        <Modal animationType="fade" transparent visible={showPrivacidad}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(113, 113, 113, 0.3)',
              height: '100%'
            }}
          >
            <Pressable
              style={{ width: '100%', height: '100%', left: 0, top: 0 }}
              onPress={closePrivacidad}
            />
            <Privacidad
              privacy={privacy}
              setPrivacy={setPrivacy}
              onClose={closePrivacidad}
            />
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent
          visible={frameContainer2Visible}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(113, 113, 113, 0.3)',
              height: '100%'
            }}
          >
            <Pressable
              style={{ width: '100%', height: '100%', left: 0, top: 0 }}
              onPress={closeFrameContainer2}
            />
            <Etiquetar
              taggedUsers={taggedUsers}
              setTaggedUsers={setTaggedUsers}
              onClose={closeFrameContainer2}
            />
          </View>
        </Modal>
        <Modal animationType="slide" transparent visible={calendario}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(113, 113, 113, 0.3)',
              height: '100%'
            }}
          >
            <Pressable
              style={{ width: '100%', height: '100%', left: 0, top: 0 }}
              onPress={closeCalendario}
            />
            <PopUpCalendario
              setButtonContainer2Visible={() => {}}
              setCalendario={setCalendario}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </View>
        </Modal>

        {/* <Modal animationType="slide" transparent visible={lugar}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(113, 113, 113, 0.3)',
              height: '100%'
            }}
          >
            <Pressable
              style={{ width: '100%', height: '100%', left: 0, top: 0 }}
              onPress={closeLugar}
            />
            <Lugar3 onClose={closeLugar} />
          </View>
        </Modal> */}
        <Modal animationType="slide" transparent visible={showHashtagsModal}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(113, 113, 113, 0.3)',
              height: '100%'
            }}
          >
            <Pressable
              style={{ width: '100%', height: '100%', left: 0, top: 0 }}
              onPress={() => setShowHashtagsModal(false)}
            />
            <Cancion1 onClose={() => setShowHashtagsModal(false)} />
          </View>
        </Modal>
        <Modal animationType="slide" transparent visible={submit}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(113, 113, 113, 0.3)',
              height: '100%'
            }}
          >
            <Pressable
              style={{ width: '100%', height: '100%', left: 0, top: 0 }}
              onPress={closeSubmit}
            />
            <ENTRADACREADA
              onClose={closeSubmit}
              isNavigate={'Muro'}
              message={'Creado con exito'}
            />
          </View>
        </Modal>
      </ScrollView>
      <Modal animationType="fade" transparent visible={lugar}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(113, 113, 113, 0.3)'
          }}
        >
          <Pressable
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0
            }}
            onPress={() => {
              setLugar(false)
            }}
          />
          <Maps onClose={() => setLugar(false)} setLocation={setLocation} />
        </View>
      </Modal>
    </LinearGradient>
  )
}

export default Organizador
