import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  View,
  Text,
  Pressable,
  Modal,
  ScrollView
} from 'react-native'
import { Image } from 'expo-image'
import {
  Border,
  Padding,
  FontFamily,
  FontSize,
  Color
} from '../../GlobalStyles'
import Post from '../../components/Post'
import Stories from '../../components/Stories'
import RetosModal from '../Retos/RetosModal'
import VotacionDeRetos from '../VotacionDeRetos'
import MenuPrincipal from '../../components/MenuPrincipal'
import HeaderIcons from '../../components/HeaderIcons'
import LupaSVG from '../../components/svgs/LupaSVG'
import MessageSVG from '../../components/svgs/MessageSVG'
import NotificationsMuroSVG from '../../components/svgs/NotificationsMuroSVG'
import CalendarMuroSVG from '../../components/svgs/CalendarMuroSVG'
import SettingMuroSVG from '../../components/svgs/SettingMuroSVG'
import { useNavigation } from '@react-navigation/native'
import { setPanel } from '../../redux/slices/panel.slices'
import StoriesVideosDiarios from '../../components/StoriesVideosDiarios'
import { LinearGradient } from 'expo-linear-gradient'

const Muro = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { showPanel } = useSelector((state) => state.panel)

  const [showModalRetos, setShowModalRetos] = useState(false)
  const [colorClick, setColorClick] = useState(true)
  const [showRetos, setShowRetos] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)

  const handleMenu = () => {
    dispatch(setPanel(false))
  }

  return (
    <LinearGradient  colors={['#fff', '#f1f1f1']}
    style={{ flex: 1,paddingBottom:70}}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',paddingTop:5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 15
          }}
        >
          <Pressable
            style={{
              width: 26,
              height: 20,
            }}
            onPress={() => dispatch(setPanel(!menuVisible))}
          >
            <Image
              style={{
                overflow: 'hidden',
                height: '100%',
                width: '100%'
              }}
              contentFit="cover"
              source={require('../../assets/ionmenu1.png')}
            />
          </Pressable>
          <View>
            <HeaderIcons
              icons={
                !showRetos
                  ? [
                      <Pressable
                        onPress={() => navigation.navigate('Busqueda')}
                      >
                        <LupaSVG />
                      </Pressable>,
                      <MessageSVG />,
                      <NotificationsMuroSVG
                        isNavigation={'PERFILNOTIFICACIONES'}
                      />
                    ]
                  : [<MessageSVG />, <CalendarMuroSVG />, <SettingMuroSVG />]
              }
            />
          </View>
        </View>

        <View>
          <View style={{ marginTop: 20, flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
            <View
              style={{
                backgroundColor: !colorClick
                  ? Color.backgroundPrimaryBackground
                  : Color.secundario,
                  borderBottomLeftRadius:5,borderTopLeftRadius:5
              }}
            >
              <Pressable
                style={{
                  paddingVertical: Padding.p_3xs,
                  paddingHorizontal: Padding.p_9xs,
                  width: 194,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderTopRightRadius: Border.br_3xs,
                  borderBottomRightRadius: Border.br_3xs
                }}
                onPress={() => {
                  setColorClick(true)
                  setShowRetos(false)
                }}
              >
                <Text
                  style={{
                    fontWeight: colorClick ? '700' : '300',
                    width: 110,
                    textAlign: 'center',
                    fontFamily: FontFamily.lato,
                    lineHeight: 19,
                    letterSpacing: 0,
                    fontSize: FontSize.size_base,
                    color: colorClick ? '#fff' : Color.textPlaceholder
                  }}
                >
                  Familia
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                backgroundColor: colorClick
                  ? Color.backgroundPrimaryBackground
                  : Color.secundario,borderBottomRightRadius:5,borderTopRightRadius:5
              }}
            >
              <Pressable
                style={{
                  paddingVertical: Padding.p_3xs,
                  paddingHorizontal: Padding.p_9xs,
                  width: 194,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderTopRightRadius: Border.br_3xs,
                  borderBottomRightRadius: Border.br_3xs
                }}
              >
                <Text
                  style={{
                    fontWeight: '300',
                    width: 70,
                    textAlign: 'center',
                    fontFamily: FontFamily.lato,
                    lineHeight: 19,
                    letterSpacing: 0,
                    fontSize: FontSize.size_base,
                    color: !colorClick ? '#fff' : Color.textPlaceholder
                  }}
                >
                  Retos
                </Text>
                <Text
                  style={{
                    borderRadius: Border.br_3xs,
                    backgroundColor: Color.grisClaro,
                    color: Color.white,
                    fontWeight: '300',
                    fontSize: FontSize.size_3xs,
                    width: 30,
                    height: 20,
                    lineHeight: 18,
                    textAlign: 'center'
                  }}
                >
                  Soon
                </Text>
              </Pressable>
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={showModalRetos}
          >
            <View
              style={{
                top: 100,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <RetosModal
                setShowRetos={setShowRetos}
                setShowModalRetos={setShowModalRetos}
              />
            </View>
          </Modal>
          <StoriesVideosDiarios/>
          {/* <Stories /> */}

          {showRetos ? <VotacionDeRetos /> : <Post />}
        </View>

        

        <Modal
          animationType="slide"
          transparent={true}
          visible={showPanel}
          onRequestClose={() => dispatch(setPanel(false))}
          propagateSwipe={true}
        >
          <View style={{ flex:1}}>
            <Pressable onPress={handleMenu}>
              <MenuPrincipal setMenuVisible={setMenuVisible} />
            </Pressable>
          </View>
        </Modal>
      </ScrollView>
    </LinearGradient>
  )
}

export default Muro
