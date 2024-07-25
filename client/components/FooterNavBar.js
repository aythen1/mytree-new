import React, { useContext, useEffect, useState } from 'react'
import {
  Dimensions,
  Keyboard,
  Modal,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import CalendarSVG from './svgs/CalendarSVG'
import FooterBookSVG from './svgs/FooterBookSVG'
import UsuarioSVG from './svgs/UsuarioSVG'
import HomeSVG from './svgs/HomeSVG'
import Aadir1 from './Aadir1'
import { setPanelAddFooter } from '../redux/slices/panel.slices'
import { Color } from '../GlobalStyles'
import { Context } from '../context/Context'
import SelectEventTypeModal from './SelectEventTypeModal'
import FooterIcon from './FooterIcon'
import FooterBar from './svgs/FooterBarSVG'
import TreeSVG from './svgs/TreeSVG'
import FooterBarSVG from './svgs/FooterBarSVG'
import { Image } from 'expo-image'
import { getAllPosts } from '../redux/actions/posts'
import { getAllUsers } from '../redux/actions/user'
import { getAllAlbums, getAllUserAlbums } from '../redux/actions/albums'
import { getAllDiaries, getAllUserDiaries } from '../redux/actions/diaries'
import { getAllEvents } from '../redux/actions/events'

const FooterNavBar = () => {
  const {
    showCamera,
    getUsersMessages,
    showSelectEventTypeModal,
    setShowSelectEventTypeModal
  } = useContext(Context)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { panelAddFooter } = useSelector((state) => state.panel)
  const { userData } = useSelector((state) => state.users)

  const [selected, setSelected] = useState('Muro')

  useEffect(() => {
    getUsersMessages()
    dispatch(getAllUsers())
    dispatch(getAllPosts())
    dispatch(getAllEvents())
    dispatch(getAllAlbums())
    dispatch(getAllDiaries())
    dispatch(getAllUserAlbums(userData?.id))
  }, [userData])

  const showModalAdd = () => {
    dispatch(setPanelAddFooter(!panelAddFooter))
  }
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
  const screenWidth = Dimensions.get('screen').width
  if (!showCamera && !keyboardVisible)
    return (
      <View style={{ backgroundColor: '#f1f1f1' }}>
        <View
          style={{
            height: 65,
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTopStartRadius: 7,
            borderTopEndRadius: 7,
            position: 'absolute',
            bottom: 0,
            zIndex: 999999999
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              gap: Dimensions.get('window').width / 10,
              marginLeft: '10%',
              zIndex: 9999999
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Muro')
                setSelected('Muro')
              }}
            >
              {/* <HomeSVG picked={selected === 'Muro' && true} /> */}
              {selected === "Muro" ? <Image style={{width:24,height:24}} source={require("../assets/Home.png")}></Image> : <Image style={{width:24,height:24}} source={require("../assets/Home1.png")}></Image>}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CALENDARIO')
                setSelected('Calendario')
              }}
              style={{ zIndex: 9999999 }}
            >
              {/* <CalendarSVG picked={selected === 'Calendario' && true} /> */}
              {selected === "Calendario" ? <Image style={{width:24,height:24}} source={require("../assets/calendario.png")}></Image> : <Image style={{width:24,height:24}} source={require("../assets/calendario1.png")}></Image>}

            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              gap: Dimensions.get('window').width / 10,
              marginRight: '10%'
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MIDIARIOPANTALLAPERSONAL')
                dispatch(getAllUserDiaries(userData.id))
                setSelected('MiDiario')
              }}
              style={{}}
            >
              {/* <FooterBookSVG picked={selected === 'MiDiario' && true} /> */}
              {selected === "MiDiario" ? <Image style={{width:24,height:24}} source={require("../assets/diario.png")}></Image> : <Image style={{width:24,height:24}} source={require("../assets/diario1.png")}></Image>}

            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Perfil')
                setSelected('Perfil')
              }}
            >
              {/* <UsuarioSVG picked={selected === 'Perfil' && true} /> */}
              {selected === "Perfil" ? <Image style={{width:24,height:24}} source={require("../assets/profile.png")}></Image> : <Image style={{width:24,height:24}} source={require("../assets/Profile1.png")}></Image>}

            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              backgroundColor: Color.backgroundGreyBackground,
              position: 'absolute',
              top: -29,
              left: '50%',
              marginLeft: -30,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              shadowOpacity: 1,
              elevation: 4,
              shadowRadius: 4,
              shadowOffset: {
                width: 2,
                height: 2
              },
              shadowColor: 'black'
            }}
            onPress={showModalAdd}
          >
            <LinearGradient
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 60,
                zIndex: 0
              }}
              locations={[0, 1]}
              
              colors={['#7ec18c', '#dee274']}
            >
              <Image
                style={{ width: 25, height: 25 }}
                contentFit="cover"
                source={require('../assets/Plus.png')}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {/* <FooterBarSVG /> */}
        <Image
          style={{
            width: screenWidth,
            height: 80,
            position: 'absolute',
            bottom: 0,
            opacity:1
          }}
          contentFit="cover"
          source={require('../assets/nav.png')}
        />
        <Modal
          animationType="slide"
          transparent
          visible={showSelectEventTypeModal}
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
              onPress={() => setShowSelectEventTypeModal(false)}
            />
            <SelectEventTypeModal
              onClose={() => setShowSelectEventTypeModal(false)}
            />
          </View>
        </Modal>
        {panelAddFooter && (
          <Modal transparent={true} animationType="slide">
            <TouchableWithoutFeedback onPress={showModalAdd}>
              <View style={{ height: '100%' }}>
                <Aadir1
                  setShowSelectEventTypeModal={setShowSelectEventTypeModal}
                />
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
      </View>
      // <Image
      //   style={{ position: 'absolute', bottom: 0 }}
      //   source={require('../assets/surface2.png')}
      // />
    )
}

export default FooterNavBar
