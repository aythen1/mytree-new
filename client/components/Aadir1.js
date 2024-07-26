import * as React from 'react'
import { View, StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
import { FontSize, FontFamily, Color, Border, Padding } from '../GlobalStyles'
import { useDispatch } from 'react-redux'
import { setPanelAddFooter } from '../redux/slices/panel.slices'
import { LinearGradient } from 'expo-linear-gradient'
import MessageSVG from './svgs/MessageSVG'
import CalendarSVG from './svgs/CalendarSVG'
import DiarioSVG from './svgs/DiarioSVG'

const Aadir1 = ({ setShowSelectEventTypeModal }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  return (
    <LinearGradient
      style={styles.aadir}
      locations={[0, 1]}
      colors={['#dee274', '#7ec18c']}
    >
      <View style={styles.frameParent}>
        <TouchableOpacity
          style={[styles.frameWrapper, styles.frameWrapperFlexBox]}
          onPress={() => {
            dispatch(setPanelAddFooter(false))
            navigation.navigate('UploadMemory')
          }}
        >
          <View style={[styles.groupParent, styles.groupParentFlexBox]}>
          <View style={{width:27}}>
        <Image
              style={{...styles.iconLayout,marginLeft:-2}}
              contentFit="cover"
              source={require('../assets/group-11712766891.png')}
            />
        </View>
            <Text style={styles.aadirRecuerdo}>Añadir recuerdo</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.frameContainer, styles.frameFlexBox]}
          onPress={() => {
            dispatch(setPanelAddFooter(false))
            navigation.navigate('BOTONInvitarAmigos1')
          }}
        >
          <View style={[styles.groupParent, styles.groupParentFlexBox]}>
          <View style={{width:27}}>
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
          style={[styles.framePressable, styles.frameFlexBox]}
          onPress={() => {
            dispatch(setPanelAddFooter(false))
            navigation.navigate('MIDIARIOPANTALLAPERSONAL')
          }}
        >
          <View style={styles.groupParentFlexBox}>
            <DiarioSVG />
            <Text style={styles.aadirRecuerdo}>Crear entrada al Diario</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.frameWrapper1, styles.frameFlexBox]}
          onPress={() => {
            dispatch(setPanelAddFooter(false))
            setShowSelectEventTypeModal(true)
          }}
        >
          <View style={styles.groupParentFlexBox}>
          <View style={{width:35}}>
           <Image
              contentFit="cover"
              style={{ width: 25, height: 25, marginRight: 11 }}
              source={require('../assets/whiteCalendar.png')}
            />
           </View>
            <Text style={styles.aadirRecuerdo2}>Crear evento</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.frameFlexBox]}
          onPress={() => {
            dispatch(setPanelAddFooter(false))
            navigation.navigate('MENSAJERA')
          }}
        >
          <View style={styles.groupParentFlexBox}>
         <View style={{width:35}}>
         <MessageSVG isMenu={true} color={Color.white} />
         </View>
            <Text style={styles.aadirRecuerdo2}>Mensajería</Text>
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
    flexDirection: 'row'
  },
  groupParentFlexBox: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  frameFlexBox: {
    marginTop: 20,
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
    marginLeft: 18,
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
    zIndex: 0,
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
    alignItems: 'flex-start'
  },
  aadir: {
    borderTopLeftRadius: Border.br_11xl,
    borderTopRightRadius: Border.br_11xl,
    width: '100%',
    // height: 321,
    padding: Padding.p_xl,
    maxWidth: '100%',
    maxHeight: '100%',
    position: 'absolute',
    bottom: 0
  }
})

export default Aadir1
