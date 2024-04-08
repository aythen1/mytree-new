import React, { useState } from 'react'
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  Modal
} from 'react-native'
import { Image } from 'expo-image'
import {
  Color,
  FontFamily,
  FontSize,
  Border,
  Padding
} from '../../GlobalStyles'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import BarraBusqueda from '../../components/BarraBusqueda'
import CalendarCheckSVG from '../../components/svgs/CalendarCheckSVG'
import RegaloSVG from '../../components/svgs/RegaloSVG'
import AñadirUsuarioSVG from '../../components/svgs/AñadirUsuarioSVG'
import CalendarSVG from '../../components/svgs/CalendarSVG'
import UbicacionSVG from '../../components/svgs/UbicacionSVG'
import PopUpCalendario from '../../components/PopUpCalendario'

const MasDetallesEventos = () => {
  const navigation = useNavigation()

  const [calendar, setCalendar] = useState(null)

  const openCalendar = () => {
    setCalendar(!calendar)
  }

  return (
    <ScrollView style={styles.scrollView}>
      <Image
        style={styles.image6Icon}
        contentFit="cover"
        source={require('../../assets/image-6.png')}
      />
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require('../../assets/back.png')}
          />
        </Pressable>
        <Text style={styles.eventos}>Eventos</Text>
      </View>
      <BarraBusqueda />

      <View style={styles.bottomContainer}>
        <View style={styles.boxContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.subTitle}>Evento 1</Text>
            <Text style={styles.name}>Barbacoa</Text>
          </View>
          <CalendarCheckSVG />
        </View>

        <LinearGradient
          style={styles.gradient}
          start={{ x: 0.8, y: 0.4 }}
          end={{ x: 0, y: 0.5 }}
          colors={['#e2e57a', '#7fc08b']}
        >
          <View style={styles.optionContainer}>
            <TextInput
              placeholder="Evento1"
              style={styles.inputContainer}
              placeholderTextColor={Color.primario1}
            />
          </View>

          <TextInput
            placeholder="Barbacoa"
            multiline={true}
            style={styles.inputContainer2}
            placeholderTextColor={Color.primario1}
          />

          <View style={styles.optionContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.placeholder}>21/02/2023</Text>
              <Pressable onPress={openCalendar}>
                <CalendarSVG />
              </Pressable>
            </View>
          </View>

          <View style={styles.optionContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.placeholder}>Ubicacion</Text>
              <UbicacionSVG />
            </View>
          </View>

          <View style={styles.optionContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Invitados"
                placeholderTextColor={Color.primario1}
              />
              <AñadirUsuarioSVG />
            </View>
          </View>

          <View style={styles.optionContainer}>
            <Text style={styles.subTitle}>Lista de deseos</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Comprueba la lista"
                placeholderTextColor={Color.primario1}
              />
              <RegaloSVG />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <LinearGradient
              style={styles.button}
              locations={[0, 1]}
              colors={['#dee274', '#7ec18c']}
            >
              <Text style={styles.save}>Aceptar</Text>
            </LinearGradient>
            <LinearGradient
              style={styles.button}
              locations={[0, 1]}
              colors={['#dee274', '#7ec18c']}
            >
              <Text style={styles.save}>Cancelar</Text>
            </LinearGradient>
          </View>
        </LinearGradient>
      </View>

      <Modal animationType="slide" transparent visible={calendar}>
        <View style={styles.iconlyLightOutlineCalendarOverlay}>
          <Pressable
            style={styles.iconlyLightOutlineCalendarBg}
            onPress={openCalendar}
          />
          <PopUpCalendario
            setButtonContainer2Visible={() => {}}
            setCalendario={setCalendar}
          />
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Color.white
  },
  image6Icon: {
    width: 87,
    height: 55
  },
  container: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginTop: 5,
    paddingHorizontal: 15
  },
  icon: {
    height: 20,
    width: 20
  },
  eventos: {
    fontSize: FontSize.size_5xl,
    color: Color.negro,
    textAlign: 'left',
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  bottomContainer: {
    marginTop: '20%'
  },
  viewContainer: {
    backgroundColor: Color.colorWhitesmoke_200,
    borderRadius: Border.br_base,
    marginTop: '10%',
    padding: 20
  },
  boxContainer: {
    height: 100,
    borderRadius: Border.br_base,
    borderWidth: 2,
    borderColor: Color.primario1,
    backgroundColor: Color.colorWhitesmoke_200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: '10%'
  },

  textContainer: {
    flexDirection: 'column',
    gap: 10
  },
  subTitle: {
    color: Color.negro,
    fontWeight: '600',
    fontSize: 15
  },
  name: {
    color: Color.gris
  },
  inputContainer: {
    paddingVertical: Padding.p_smi,
    backgroundColor: Color.fAFAFA,
    borderRadius: Border.br_3xs,
    paddingHorizontal: Padding.p_xl,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'space-between'
  },
  inputContainer2: {
    backgroundColor: Color.fAFAFA,
    borderRadius: Border.br_3xs,
    paddingHorizontal: Padding.p_xl,
    height: 100,
    marginBottom: 15
  },
  gradient: {
    borderTopRightRadius: Border.br_3xs,
    width: '100%',
    backgroundColor: Color.linearBoton,
    height: '100%',
    padding: 10
  },
  optionContainer: {
    height: 100,
    marginTop: '5%'
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 10
  },
  button: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Border.br_31xl / 2,
    borderWidth: 1,
    borderColor: 'white',
    width: '60%'
  },
  save: {
    letterSpacing: 1,
    fontSize: FontSize.size_mini,
    textAlign: 'center',
    color: Color.white,
    fontFamily: FontFamily.lato,
    lineHeight: 24
  },
  placeholder: {
    color: Color.primario1,
    fontFamily: FontFamily.lato
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
  }
})
export default MasDetallesEventos
