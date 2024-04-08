import React, { useState } from 'react'
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import Aadir1 from './Aadir1'
import { useDispatch, useSelector } from 'react-redux'
import { setPanelAddFooter } from '../redux/slices/panel.slices'
import { Color } from '../GlobalStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import CalendarSVG from './svgs/CalendarSVG'
import FooterBookSVG from './svgs/FooterBookSVG'
import UsuarioSVG from './svgs/UsuarioSVG'
import HomeSVG from './svgs/HomeSVG'

const FooterNavBar = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { panelAddFooter } = useSelector((state) => state.panel)

  const [selected, setSelected] = useState(null)

  const showModalAdd = () => {
    dispatch(setPanelAddFooter(!panelAddFooter))
  }

  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', marginLeft: 20 }}>
          <Pressable
            onPress={() => {
              navigation.navigate('Muro')
              setSelected('Muro')
            }}
          >
            <HomeSVG
              color={selected === 'Muro' ? Color.primario1 : Color.grisClaro}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('CALENDARIO')
              setSelected('Calendario')
            }}
            style={{ marginLeft: 30 }}
          >
            <CalendarSVG
              color={
                selected === 'Calendario' ? Color.primario1 : Color.grisClaro
              }
            />
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', marginRight: 20 }}>
          <Pressable
            onPress={() => {
              navigation.navigate('MIDIARIOPANTALLAPERSONAL')
              setSelected('MiDiario')
            }}
            style={{ marginRight: 20 }}
          >
            <FooterBookSVG
              color={
                selected === 'MiDiario'
                  ? Color.primario1
                  : Color.grisClaroisClaro
              }
            />
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('Perfil')
              setSelected('Perfil')
            }}
          >
            <UsuarioSVG
              color={selected === 'Perfil' ? Color.primario1 : Color.grisClaro}
            />
          </Pressable>
        </View>

        <Pressable style={styles.pressable} onPress={showModalAdd}>
          <LinearGradient
            style={styles.frameChild}
            locations={[0, 1]}
            colors={['#7ec18c', '#dee274']}
          >
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 100
              }}
            >
              <Text style={styles.masText}>+</Text>
            </View>
          </LinearGradient>
        </Pressable>
      </View>

      {panelAddFooter && (
        <Modal transparent={true} animationType="slide">
          <TouchableWithoutFeedback onPress={showModalAdd}>
            <View style={{ height: '100%' }}>
              <Aadir1 />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'white',
    zIndex: 100,
    position: 'absolute',
    bottom: 0
  },
  IconlyLightHome: {
    width: 24,
    height: 24
  },
  frameChild: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    zIndex: 0
  },

  IconlyLightHomeLeft: {
    width: 23,
    height: 23,
    marginLeft: 25
  },
  IconlyLightHomeRight: {
    width: 21,
    height: 24,
    marginRight: 25,
    overflow: 'hidden'
  },
  pressable: {
    width: 60,
    height: 60,
    backgroundColor: Color.backgroundGreyBackground,
    position: 'absolute',
    top: -30,
    left: '50%',
    marginLeft: -30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  masText: {
    fontSize: 35,
    color: Color.white,
    textAlign: 'center',
    justifyContent: 'center',
    bottom: 1
  }
})

export default FooterNavBar
