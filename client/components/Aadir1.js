import * as React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import { FontSize, FontFamily, Color, Border } from '../GlobalStyles'
import { useDispatch, useSelector } from 'react-redux'
import { setPanelAddFooter } from '../redux/slices/panel.slices'
import { LinearGradient } from 'expo-linear-gradient'
import MessageSVG from './svgs/MessageSVG'
import DiarioSVG from './svgs/DiarioSVG'
import { setScreen } from '../redux/slices/user.slices'

const Aadir1 = ({ setShowSelectEventTypeModal }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
const {screen} = useSelector((state)=> state.users)


  return (
    <LinearGradient
      style={styles.aadir}
      locations={[0, 1]}
      colors={['#dee274', '#7ec18c']}
    >
      <View style={styles.frameParent}>
        <TouchableOpacity
    
          style={[styles.frameWrapperFlexBox,{backgroundColor: screen == 'Añadir recuerdo' ? 'rgba(0, 0, 0, 0.1)' : "transparent"}]}
          onPress={() => {
            dispatch(setPanelAddFooter(false))
            dispatch(setScreen("Añadir recuerdo"))
            navigation.navigate('UploadMemory')
          }}
        >
          <View style={[styles.groupParent, styles.groupParentFlexBox]}>
            <View style={{width:40}}>
            <Image
              style={{ ...styles.iconLayout, marginLeft: -2 }}
              contentFit="cover"
              source={require('../assets/group-11712766891.png')}
            />
            </View>
            <Text style={styles.aadirRecuerdo}>Añadir recuerdo</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.frameWrapperFlexBox,{backgroundColor: screen == 'Añadir familiar' ? 'rgba(0, 0, 0, 0.1)' : "transparent"}]}
          onPress={() => {
            dispatch(setPanelAddFooter(false))
            dispatch(setScreen("Añadir familiar"))

            navigation.navigate('BOTONInvitarAmigos1')
          }}
        >
          <View style={[styles.groupParent, styles.groupParentFlexBox]}>
          <View style={{width:40}}>

              <Image
                style={styles.iconlylightOutline3User}
                contentFit="cover"
                source={require('../assets/iconlylightoutline3user2.png')}
              />
            </View>
            <Text style={styles.aadirRecuerdo}>Añadir familiar</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.frameWrapperFlexBox,{backgroundColor: screen == 'MiDiario' ? 'rgba(0, 0, 0, 0.1)' : "transparent"}]}
          onPress={() => {
            dispatch(setPanelAddFooter(false))
            dispatch(setScreen("MiDiario"))

            navigation.navigate('MIDIARIOPANTALLAPERSONAL')
          }}
        >
          <View style={[styles.groupParent, styles.groupParentFlexBox]}>
          <View style={{width:40}}>

            <DiarioSVG />
            </View>
            <Text style={styles.aadirRecuerdo}>Crear entrada al Diario</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.frameWrapperFlexBox,{backgroundColor: screen == 'Crear evento' ? 'rgba(0, 0, 0, 0.1)' : "transparent"}]}
          onPress={() => {
            dispatch(setPanelAddFooter(false))
            dispatch(setScreen("Crear evento"))

            setShowSelectEventTypeModal(true)
          }}
        >
          <View style={[styles.groupParent, styles.groupParentFlexBox]}>
          <View style={{width:40}}>

              <Image
                contentFit="contain"
                style={{ width: 25, height: 30, marginRight: 11 }}
                source={require('../assets/whiteCalendar.png')}
              />
            </View>
            <Text style={styles.aadirRecuerdo}>Crear evento</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.frameWrapperFlexBox,{backgroundColor: screen == 'Mensajería' ? 'rgba(0, 0, 0, 0.1)' : "transparent"}]}
          onPress={() => {
            dispatch(setPanelAddFooter(false))
            dispatch(setScreen("Mensajería"))

            navigation.navigate('MENSAJERA')
          }}
        >
          <View style={[styles.groupParent, styles.groupParentFlexBox]}>
          <View style={{width:40}}>

              <MessageSVG isMenu={true} color={Color.white} />
            </View>
            <Text style={styles.aadirRecuerdo}>Mensajería</Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  frameWrapperFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  groupParentFlexBox: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  frameFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  vectorIconPosition: {
    left: 0,
    position: 'absolute'
  },
  iconLayout: {
    height: 30,
    width: 30
  },
  aadirRecuerdo: {
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    lineHeight: 19,
    fontWeight: '900',
    fontFamily: FontFamily.lato,
    color: Color.white,
    textAlign: 'justify',
    flex: 1
  },
  aadirRecuerdo2: {
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    lineHeight: 19,
    fontWeight: '900',
    fontFamily: FontFamily.lato,
    color: Color.white,
    textAlign: 'justify',
    marginLeft: 10,
    flex: 1
  },
  groupParent: {
    width: '100%'
  },
  frameWrapper: {
    zIndex: 0
  },
  iconlylightOutline3User: {
    height: 27,
    width: 30
  },
  iconlylightOutline3UserParent: {
    width: 153
  },
  frameContainer: {
    zIndex: 1
  },
  vectorIcon: {
    top: 0,
    height: 30,
    width: 30,
    zIndex: 0
  },
  vectorWrapper: {
    width: 30,
    flexDirection: 'row'
  },
  frameGroup: {
    // width: 234
  },
  frameView: {
    zIndex: 2
  },
  documentIcon: {
    overflow: 'hidden'
  },
  framePressable: {
    right: 2
  },

  frameWrapper1: {
    zIndex: 4
  },
  notificationIcon: {
    height: 35,
    width: 30
  },

  frameWrapper2: {
    top: 247,
    zIndex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  frameParent: {
    // alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap:4
  },
  aadir: {
    borderTopLeftRadius: Border.br_11xl,
    borderTopRightRadius: Border.br_11xl,
    width: '100%',
    // height: 321,
    paddingVertical: 20,
    paddingHorizontal: 10,
    maxWidth: '100%',
    maxHeight: '100%',
    position: 'absolute',
    bottom: 0
  }
})

export default Aadir1
