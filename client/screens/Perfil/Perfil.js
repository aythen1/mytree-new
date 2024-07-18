import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Share
} from 'react-native'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import {
  Color,
  FontFamily,
  Padding,
  Border,
  FontSize
} from '../../GlobalStyles'
import { useDispatch, useSelector } from 'react-redux'
import MiLegado from './MiLegado'
import MisAlbumes from './MisAlbumes'
import PERFILMIINFO from './PERFILMIINFO'
import SOLOYO from './SOLOYO'
import HeaderIcons from '../../components/HeaderIcons'
import TreeSVG from '../../components/svgs/TreeSVG'
import SettingMuroSVG from '../../components/svgs/SettingMuroSVG'
import PlusSVG from '../../components/svgs/PlusSVG'
import NotificationsMuroSVG from '../../components/svgs/NotificationsMuroSVG'
import LupaSVG from '../../components/svgs/LupaSVG'
import BarraBusqueda from '../../components/BarraBusqueda'
import { Camera, CameraView, useCameraPermissions } from 'expo-camera'
import { getUserPosts } from '../../redux/actions/posts'
import { Context } from '../../context/Context'
import axiosInstance from '../../apiBackend'
import SimboloSVG from './SimboloSVG'
import { Entypo } from '@expo/vector-icons'
import EmojiPicker, { emojiFromUtf16 } from 'rn-emoji-picker'
import { emojis } from 'rn-emoji-picker/dist/data'
import { getAllUserEvents } from '../../redux/actions/events'
import { getAllUserDiaries } from '../../redux/actions/diaries'
import { getUserFriendsAndFamilyLength } from '../../redux/actions/user'

const Perfil = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [facing, setFacing] = useState('back')
  const { pickImage, provisoryProfileImage, profileImage } = useContext(Context)
  const { userData } = useSelector((state) => state.users)
  const [hasPermission, setHasPermission] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [showCamera, setShowCamera] = useState(false)
  const [showEmojis, setShowEmojis] = useState(false)
  const [emoji, setEmoji] = useState(false)
  const [showImageOptions, setShowImageOptions] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState('MiLegado')
  const [search, setSearch] = useState(false)
  const cameraReff = useRef(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const takePicture = async () => {
    if (cameraReff) {
      const photo = await cameraReff.current.takePictureAsync()
      setSelectedImage(photo)
      pickImage('profile', photo.uri)
      setShowCamera(false)
    }
  }

  const changePictureMode = async () => {
    setFacing((prev) => (prev == 'back' ? 'front' : 'back'))
  }

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'MiLegado':
        return <MiLegado />
      case 'MisAlbumes':
        return <MisAlbumes />
      case 'PERFILMIINFO':
        return (
          <PERFILMIINFO
            usuario={userData}
            setSelectedComponent={setSelectedComponent}
          />
        )
      case 'SOLOYO':
        return <SOLOYO />
      default:
        return null
    }
  }

  const iniciar = () => {
    dispatch(getUserPosts(userData?.id)).then((res) => {})
    dispatch(getAllUserEvents(userData?.id)).then((res) => {})
    dispatch(getAllUserDiaries(userData?.id)).then((res) => {})
    dispatch(getUserFriendsAndFamilyLength(userData?.id)).then((res) => {
      console.log(res, 'asdasdas')
    })
  }

  useEffect(() => {
    if (userData?.newUser) {
      axiosInstance.patch(`/user/${userData?.id}`, { newUser: false })
    }
console.log("pasa por este ladoooooooooooooooooooooooooooooooooooooooooooooo")
    iniciar()
  }, [])

  useEffect(() => {
    if (profileImage) {
      console.log('llego')
      axiosInstance.patch(`/user/${userData?.id}`, {
        profilePicture: profileImage
      })
    }
  }, [profileImage])

  if (!showCamera) {
    return (
      <ScrollView
        style={{
          flex: 1,

          backgroundColor: Color.white
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 14
          }}
        >

          <Pressable onPress={() => navigation.openDrawer()}>
            <Image
              style={[{
                width: 87,
                height: 55
              }]}
              contentFit="cover"
              source={require('../../assets/image-6.png')}
            />
          </Pressable>

          <HeaderIcons
            icons={
              selectedComponent !== 'PERFILMIINFO'
                ? [
                    <Pressable onPress={() => setSearch(!search)}>
                      <LupaSVG />
                    </Pressable>,
                    <PlusSVG isNavigation={'CrearAlbum'} />,
                    <SettingMuroSVG isNavigation={'PerfilAjustes'} />
                  ]
                : [
                    <TreeSVG />,
                    <NotificationsMuroSVG
                      isNavigation={'PERFILNOTIFICACIONES'}
                    />,
                    <SettingMuroSVG isNavigation={'PerfilAjustes'} />
                  ]
            }
          />
        </View>

     

        {search && <BarraBusqueda />}

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Pressable
            onPress={() => setShowImageOptions(!showImageOptions)}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              flexDirection: 'row',
              position: 'relative'
            }}
          >
            <Pressable
              onPress={() => setShowCamera(true)}
              style={{
                width: 30,
                height: 30,
                backgroundColor: Color.secundario,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 999
              }}
            >
              <Image
                style={{ width: 16, height: 16 }}
                contentFit="cover"
                source={require('../../assets/cameraIcon.png')}
              />
            </Pressable>
            {!provisoryProfileImage && !userData?.profilePicture ? (
              <Image
                style={{ ...styles.perfilItem, borderRadius: 100 }}
                contentFit="cover"
                source={require('../../assets/group-1171276683.png')}
              />
            ) : (
              <Image
                style={{ ...styles.perfilItem, borderRadius: 100 }}
                contentFit="cover"
                source={{
                  uri:
                    profileImage ||
                    provisoryProfileImage ||
                    userData.profilePicture
                }}
              />
            )}

            {/* <Pressable
                onPress={() => pickImage('profile')}
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: Color.secundario,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <SimboloSVG color={'#fff'} />
              </Pressable> */}

            {/* <Pressable
              onPress={() => setShowEmojis(true)}
              style={{
                width: 30,
                height: 30,
                backgroundColor: Color.secundario,
                position: 'absolute',
                borderRadius: 100,
                bottom: 0,
                left: '35%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {emoji && <Text>{emoji}</Text>}
            </Pressable> */}
          </Pressable>
          <TouchableOpacity
            onPress={() => pickImage('profile')}
            style={{
              width: 120,
              height: 30,
              backgroundColor: Color.secundario,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20
            }}
          >
            <Text style={{ color: 'white' }}>Subir imagen</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.brunoPham}>
            {userData.username} {userData.apellido}
          </Text>
          <View style={styles.placeContainer}>
            <Text style={[styles.daNangVietnam, styles.miInfoTypo]}>
              {userData.adress && userData.adress + ','}
              {userData.city}
            </Text>
          </View>
        </View>

        <View style={styles.tabsBar}>
          <Pressable
            style={[
              styles.tabs,
              (selectedComponent === 'MiLegado' ||
                selectedComponent === 'SOLOYO') &&
                styles.miWrapper
            ]}
            onPress={() => setSelectedComponent('MiLegado')}
          >
            <Text
              style={
                (styles.miInfo,
                (selectedComponent === 'MiLegado' ||
                  selectedComponent === 'SOLOYO') &&
                  styles.selectedText)
              }
            >
              Mi Legado
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.tabs,
              selectedComponent === 'PERFILMIINFO' && styles.miWrapper
            ]}
            onPress={() => setSelectedComponent('PERFILMIINFO')}
          >
            <Text
              style={
                (styles.miInfo,
                selectedComponent === 'PERFILMIINFO' && styles.selectedText)
              }
            >
              Mi información
            </Text>
          </Pressable>
        </View>

        {renderSelectedComponent()}
        <Modal visible={showEmojis}>
          <View style={{ flex: 1 }}>
            <EmojiPicker
              emojis={emojis} // emojis data source see data/emojis
              autoFocus={true} // autofocus search input
              loading={false} // spinner for if your emoji data or recent store is async
              darkMode={true} // to be or not to be, that is the question
              perLine={7} // # of emoji's per line
              onSelect={(e) => {
                setEmoji(e.emoji)
                setShowEmojis(false)
              }} // callback when user selects emoji - returns emoji obj
            />
          </View>
        </Modal>
      </ScrollView>
    )
  } else {
    return (
      <View style={{ zIndex: 9999, height: '100%' }}>
        <CameraView
          ref={cameraReff}
          facing={facing}
          style={{ flex: 1 }}
          mode="picture"
          FocusMode="on"
          onCameraReady={(e) => console.log(e, 'esto es e')}

          // cameraType="back"
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row'
            }}
          >
            <TouchableOpacity
              style={{ position: 'absolute', top: 49, left: 20 }}
              onPress={() => setShowCamera(false)}
            >
              <Image
                style={{
                  height: 16,
                  width: 16
                }}
                contentFit="cover"
                source={require('../../assets/group-565.png')}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                width: '100%',
                marginBottom: 30,
                position: 'relative'
              }}
            >
              <TouchableOpacity
                onPress={takePicture}
                style={{
                  width: 60,
                  height: 60,
                  bottom: 100,
                  borderRadius: 100,
                  backgroundColor: '#cecece',

                  color: 'white'
                }}
              ></TouchableOpacity>
              <TouchableOpacity
                onPress={changePictureMode}
                style={{
                  position: 'absolute',
                  right: 20,
                  bottom: 100,
                  color: 'white',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Entypo name="cycle" color={'#fff'} size={25} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  iconPosition: {
    left: '1%',
    top: '2%'
  },
  ionmenuIcon: {
    width: 26,
    height: 20
  },
  ionmenu: {},
  menuPosition: {
    paddingLeft: 10,
    paddingTop: 10
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  buttonFlexBox: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center'
  },
  vectorIconLayout: {
    width: 24,
    height: 24
  },
  groupIconLayout: {
    height: 50,
    width: 50
  },
  miInfoTypo: {
    color: Color.gris,
    letterSpacing: 0,
    textAlign: 'center',
    fontFamily: FontFamily.lato
  },

  signInTypo: {
    color: Color.white,
    letterSpacing: 0,
    textAlign: 'center',
    fontFamily: FontFamily.lato
  },
  image6Icon: {
    width: 87,
    height: 55
  },
  vectorIcon: {
    height: 24
  },
  iconlylightOutlineplus: {
    marginLeft: 20,
    height: 24
  },
  icon: {
    height: '100%',
    width: '100%'
  },
  vectorParent: {
    top: '5%'
  },
  perfilItem: {
    height: 130,
    width: 130
  },
  nameContainer: {
    paddingVertical: 20
  },
  brunoPham: {
    textAlign: 'center',
    color: Color.negro,
    fontFamily: FontFamily.lato,
    fontWeight: '700',
    lineHeight: 24,
    fontSize: FontSize.size_xl
  },
  placeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  daNangVietnam: {
    fontWeight: '300',
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    lineHeight: 24
  },
  miLegado: {
    lineHeight: 19,
    fontSize: FontSize.size_base,
    fontWeight: '700',
    color: Color.white
  },
  miWrapper: {
    backgroundColor: Color.secundario,
    width: '37%',
    borderRadius: Border.br_7xs,
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_9xs,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabs: {
    width: '37%',
    borderRadius: Border.br_7xs,
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: Padding.p_9xs,
    justifyContent: 'center',
    alignItems: 'center'
  },
  misLbumes: {
    width: 120,
    color: Color.gris,
    letterSpacing: 0,
    textAlign: 'center',
    fontFamily: FontFamily.lato
  },
  miInfo: {
    color: Color.gris,
    letterSpacing: 0,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    lineHeight: 19,
    fontSize: FontSize.size_base
  },
  selectedText: {
    color: Color.white,
    fontWeight: '700',
    letterSpacing: 0,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    lineHeight: 19,
    fontSize: FontSize.size_base
  },
  tabsBar: {
    width: '100%',
    backgroundColor: Color.white,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  signIn: {
    fontSize: FontSize.size_xs,
    lineHeight: 18
  },
  button: {
    borderRadius: Border.br_11xl,
    width: 80,
    height: 28,
    paddingHorizontal: Padding.p_base,
    justifyContent: 'center',
    left: '100%',
    backgroundColor: Color.linearBoton
  },
  perfil: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: Color.white
  }
})

export default Perfil
