import React, { useState, useCallback } from 'react'
import { Image } from 'expo-image'
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Modal,
  ScrollView
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import CreacinInfante from '../components/CreacinInfante'
import { FontSize, FontFamily, Color, Padding, Border } from '../GlobalStyles'
import PopUpCalendario from '../components/PopUpCalendario'

const AADIRAADIRINFANTE = () => {
  const navigation = useNavigation()
  const [
    iconlyLightOutlineCalendarVisible,
    setIconlyLightOutlineCalendarVisible
  ] = useState(false)
  const [buttonContainerVisible, setButtonContainerVisible] = useState(false)

  const openIconlyLightOutlineCalendar = useCallback(() => {
    setIconlyLightOutlineCalendarVisible(true)
  }, [])

  const closeIconlyLightOutlineCalendar = useCallback(() => {
    setIconlyLightOutlineCalendarVisible(false)
  }, [])

  const openButtonContainer = useCallback(() => {
    setButtonContainerVisible(true)
  }, [])

  const closeButtonContainer = useCallback(() => {
    setButtonContainerVisible(false)
  }, [])

  return (
    <>
      <ScrollView
        style={{ backgroundColor: Color.white }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.aadirAadirInfante}>
          <View style={[styles.image6Wrapper, styles.fieldFlexBox]}>
            <Image
              style={styles.image6Icon}
              contentFit="cover"
              source={require('../assets/image-6.png')}
            />
          </View>
          <View style={[styles.backParent, styles.pressableFlexBox]}>
            <Pressable
              style={styles.backLayout}
              onPress={() => navigation.navigate('PERFILCREARIDINFANTEANCE')}
            >
              <Image
                style={[styles.icon, styles.iconLayout]}
                contentFit="cover"
                source={require('../assets/back.png')}
              />
            </Pressable>
            <Text style={styles.aadirInfante}>Añadir Infante</Text>
          </View>
          <View style={styles.frameParent}>
            <View>
              <View>
                <View>
                  <View style={styles.titleBase}>
                    <Text style={[styles.title, styles.titleFlexBox]}>
                      Añadir progenitor
                    </Text>
                  </View>
                  <View style={[styles.field, styles.fieldFlexBox]}>
                    <View style={styles.placeholderInput}>
                      <Text style={[styles.search, styles.searchTypo]}>
                        Seleccionalo de tu lista de amigos
                      </Text>
                    </View>
                    <Image
                      style={[styles.iconlyboldfilter2, styles.backLayout]}
                      contentFit="cover"
                      source={require('../assets/iconlyboldfilter2.png')}
                    />
                  </View>
                </View>
                <View style={styles.fieldWithTitle1}>
                  <View style={styles.titleBase}>
                    <Text style={[styles.title, styles.titleFlexBox]}>
                      Último período natural
                    </Text>
                  </View>
                  <View style={[styles.field, styles.fieldFlexBox]}>
                    <View style={styles.placeholderInput}>
                      <Text style={[styles.search, styles.searchTypo]}>
                        15/04/2023
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.fieldWithTitle1}>
                <View style={styles.titleBase}>
                  <Text style={[styles.title, styles.titleFlexBox]}>
                    Fecha y hora de nacimiento
                  </Text>
                </View>
                <View style={[styles.field, styles.fieldFlexBox]}>
                  <View style={styles.placeholderInput}>
                    <Text style={[styles.search, styles.searchTypo]}>
                      12/01/2024
                    </Text>
                  </View>
                  <Pressable
                    style={[styles.iconlyboldfilter2, styles.backLayout]}
                    onPress={openIconlyLightOutlineCalendar}
                  >
                    <Image
                      style={styles.iconLayout}
                      contentFit="cover"
                      source={require('../assets/iconlylightoutlinecalendar.png')}
                    />
                  </Pressable>
                </View>
              </View>
              <View style={styles.fieldWithTitle1}>
                <View style={styles.titleBase}>
                  <Text style={[styles.title, styles.titleFlexBox]}>
                    Lugar de nacimiento
                  </Text>
                </View>
                <View style={[styles.field, styles.fieldFlexBox]}>
                  <View style={styles.placeholderInput}>
                    <Text style={[styles.search, styles.searchTypo]}>
                      Albacete
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <LinearGradient
              style={styles.button}
              locations={[0, 1]}
              colors={['#dee274', '#7ec18c']}
            >
              <Pressable
                style={[styles.pressable, styles.pressableFlexBox]}
                onPress={openButtonContainer}
              >
                <Text style={[styles.signIn, styles.searchTypo]}>Añadir</Text>
              </Pressable>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent
        visible={iconlyLightOutlineCalendarVisible}
      >
        <View style={styles.iconlyLightOutlineCalendarOverlay}>
          <Pressable
            style={styles.iconlyLightOutlineCalendarBg}
            onPress={closeIconlyLightOutlineCalendar}
          />
          <PopUpCalendario
            onClose={closeIconlyLightOutlineCalendar}
            not={true}
          />
        </View>
      </Modal>

      <Modal animationType="fade" transparent visible={buttonContainerVisible}>
        <View style={styles.buttonContainerOverlay}>
          <Pressable
            style={styles.buttonContainerBg}
            onPress={closeButtonContainer}
          />
          <CreacinInfante onClose={closeButtonContainer} />
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  fieldFlexBox: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  pressableFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  iconLayout: {
    height: '100%',
    width: '100%'
  },

  titleFlexBox: {
    letterSpacing: 0,
    textAlign: 'left'
  },
  searchTypo: {
    lineHeight: 24,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato
  },
  backLayout: {
    height: 24,
    width: 24
  },
  image6Icon: {
    top: 15,
    width: 87,
    height: 55
  },
  image6Wrapper: {
    top: 3,
    left: 20
    // position: 'absolute'
  },
  icon: {
    overflow: 'hidden'
  },
  aadirInfante: {
    fontSize: FontSize.size_5xl,
    fontWeight: '700',
    color: Color.negro,
    width: '100%',
    marginLeft: 20,
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  backParent: {
    top: 20,
    left: 20
    // position: 'absolute'
  },
  navigationIcon: {
    top: 821,
    left: 0,
    // width: 428,
    height: 105
    // position: 'absolute'
  },
  title: {
    lineHeight: 19,
    fontWeight: '500',
    color: Color.textTextPrimary,
    fontSize: FontSize.size_base,
    letterSpacing: 0,
    fontFamily: FontFamily.lato
  },
  titleBase: {
    paddingBottom: Padding.p_7xs,
    // width: 388,
    flexDirection: 'row'
  },
  search: {
    color: Color.textPlaceholder,
    letterSpacing: 0,
    textAlign: 'left'
  },
  placeholderInput: {
    flexDirection: 'row',
    flex: 1
  },
  iconlyboldfilter2: {
    marginLeft: 24
  },
  field: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_smi
  },
  fieldWithTitle1: {
    marginTop: 20
  },
  iconlyLightOutlineCalendarOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  iconlyLightOutlineCalendarBg: {
    // position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  buttonContainerOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)'
  },
  buttonContainerBg: {
    // position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  signIn: {
    letterSpacing: 1,
    color: Color.white,
    textAlign: 'center',
    flex: 1
  },
  pressable: {
    borderRadius: Border.br_11xl,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton,
    width: '100%'
  },
  button: {
    marginTop: 10,
    height: 60,
    borderRadius: 60
    // width: 388
  },
  frameParent: {
    top: 30,
    backgroundColor: 'white',
    height: '100%'
  },
  aadirAadirInfante: {
    backgroundColor: Color.white,
    width: '100%',
    minHeight: '100%',
    padding: 10,
    paddingBottom: 70
  }
})

export default AADIRAADIRINFANTE
