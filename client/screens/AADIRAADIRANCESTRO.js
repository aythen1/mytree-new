import React, { useState, useCallback } from 'react'
import { Image } from 'expo-image'
import { StyleSheet, View, Text, Pressable, Modal } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { FontFamily, FontSize, Color, Padding, Border } from '../GlobalStyles'
import PopUpCalendario from '../components/PopUpCalendario'

const AADIRAADIRANCESTRO = () => {
  const [calendario, setCalendario] = useState(false)

  const [
    iconlyLightOutlineCalendarVisible,
    setIconlyLightOutlineCalendarVisible
  ] = useState(false)
  const navigation = useNavigation()

  const openCalendario = () => {
    setCalendario(true)
  }

  const closeCalendario = () => {
    setCalendario(false)
  }

  const closeIconlyLightOutlineCalendar = useCallback(() => {
    setIconlyLightOutlineCalendarVisible(false)
  }, [])

  return (
    <>
      <View style={styles.aadirAadirAncestro}>
        <View style={styles.pressableFlexBox1}>
          <Pressable
            style={styles.backLayout}
            onPress={() => navigation.navigate('PERFILCREARIDINFANTEANCE')}
          >
            <Image
              style={styles.iconLayout}
              contentFit="cover"
              source={require('../assets/back.png')}
            />
          </Pressable>
          <Text style={[styles.aadirAncestro, styles.titleTypo]}>
            Añadir Ancestro
          </Text>
        </View>

        <View style={{ top: 30, paddingHorizontal: 15 }}>
          <View style={styles.titleBase}>
            <Text style={[styles.title, styles.titleTypo]}>
              Compartir gestión
            </Text>
          </View>
          <View style={[styles.field, styles.fieldFlexBox]}>
            <View style={styles.placeholderInput}>
              <Text style={[styles.search, styles.searchTypo]}>
                Seleccionalo de tu lista de amigos
              </Text>
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../assets/iconlyboldfilter2.png')}
              />
            </View>
          </View>

          <View style={styles.titleBase}>
            <Text style={[styles.title, styles.titleTypo]}>
              Fecha de defunción
            </Text>
          </View>
          <View style={[styles.field, styles.fieldFlexBox]}>
            <Pressable style={styles.placeholderInput} onPress={openCalendario}>
              <Text style={[styles.search, styles.searchTypo]}>12/3/2008</Text>
              <Image
                style={{ width: 24, height: 24 }}
                source={require('../assets/iconlylightoutlinecalendar.png')}
              />
            </Pressable>
          </View>

          <View style={styles.titleBase}>
            <Text style={[styles.title, styles.titleTypo]}>
              Lugar de defunción
            </Text>
          </View>
          <View style={[styles.field, styles.fieldFlexBox]}>
            <View style={styles.placeholderInput}>
              <Text style={[styles.search, styles.searchTypo]}>12/01/2024</Text>
            </View>
          </View>

          <View style={styles.fieldWithTitle1}>
            <View style={styles.titleBase}>
              <Text style={[styles.title, styles.titleTypo]}>
                Motivo de defunción
              </Text>
            </View>
            <View style={[styles.field, styles.fieldFlexBox]}>
              <View style={styles.placeholderInput}>
                <Text style={[styles.search, styles.searchTypo]}>
                  Muerte natural
                </Text>
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
              onPress={() => navigation.navigate('PERFILIDANCESTRO')}
            >
              <Text style={[styles.signIn, styles.searchTypo]}>Añadir</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>

      <Modal animationType="slide" transparent visible={calendario}>
        <View style={styles.iconlyLightOutlineCalendarOverlay}>
          <Pressable
            style={styles.iconlyLightOutlineCalendarBg}
            onPress={closeCalendario}
          />
          <PopUpCalendario
            setButtonContainer2Visible={() => {}}
            setCalendario={setCalendario}
          />
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  fieldFlexBox: {
    // alignItems: 'center',
    // flexDirection: 'row',
    // borderWidth: 1,
    borderRadius: 50,
    height: 60
    // borderColor: 'green'
  },
  titleTypo: {
    fontFamily: FontFamily.lato,
    textAlign: 'left'
  },
  searchTypo: {
    lineHeight: 24,
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base
  },
  backLayout: {
    height: 24,
    width: 24
  },
  pressableFlexBox: {
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 60
    // marginTop: 30
  },
  pressableFlexBox1: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    marginTop: 30
  },
  iconLayout: {
    height: 35,
    width: 35
  },
  image6Icon: {
    width: 87,
    height: 55
  },
  image6Wrapper: {
    top: 3,
    left: 20
    // position: 'absolute'
  },
  title: {
    lineHeight: 19,
    fontWeight: '500',
    color: Color.textTextPrimary,
    textAlign: 'left',
    letterSpacing: 0,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.lato
  },
  titleBase: {
    paddingBottom: Padding.p_7xs,
    marginTop: 15,
    // width: 388,
    flexDirection: 'row'
  },
  search: {
    color: Color.textPlaceholder,
    textAlign: 'left',
    letterSpacing: 0,
    width: '100%',
    borderRadius: 15
    // padding: 8
  },
  placeholderInput: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
    // overflow: 'hidden'
    // paddingHorizontal: 10
    // flex: 1,
  },

  field: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.fAFAFA,
    paddingHorizontal: Padding.p_xl,
    paddingVertical: Padding.p_smi,
    width: '100%'
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
    width: '100%',
    height: '100%',
    left: 0,
    top: 0
  },
  fieldWithTitleParent: {
    top: 127
  },
  signIn: {
    letterSpacing: 1,
    color: Color.white,
    textAlign: 'center',
    flex: 1
  },
  pressable: {
    borderRadius: Border.br_11xl,
    // paddingHorizontal: Padding.p_5xl,
    // paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton,
    width: '100%'
  },
  button: {
    // top: 744,
    width: '100%',
    borderRadius: 15,
    marginTop: 80,
    alignItems: 'center'
  },

  aadirAncestro: {
    fontSize: FontSize.size_5xl,
    fontWeight: '700',
    color: Color.negro,
    marginLeft: 20,
    textAlign: 'left'
  },
  navigationIcon: {
    top: 821,
    left: 0,
    width: 428,
    height: 105
    // position: 'absolute'
  },
  aadirAadirAncestro: {
    backgroundColor: Color.white,

    // height: 926,
    overflow: 'hidden',
    width: '100%',
    flex: 1
  }
})

export default AADIRAADIRANCESTRO
