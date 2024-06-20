import React, { useState } from 'react'
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput
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

const Eventos = () => {
  const navigation = useNavigation()

  const [selected, setSelected] = useState(null)
  const [selected2, setSelected2] = useState(null)


  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 130 }} style={styles.scrollView}>
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
        <View style={styles.viewContainer}>
          <Pressable
            onPress={() => setSelected(!selected)}
            style={styles.boxContainer}
          >
            <View style={styles.textContainer}>
              <Text style={styles.subTitle}>Evento 1</Text>
              <Text style={styles.name}>Barbacoa</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 18 }}>
              {selected ? <Image style={{ width: 20, height: 18 }} contentFit='scale-down' source={require('../../assets/arrow2.png')}></Image>
                :
                <Image style={{ width: 20, height: 18 }} contentFit='scale-down' source={require('../../assets/arrow1.png')}></Image>
              }
              <CalendarCheckSVG />
            </View>
          </Pressable>
          {selected && (
            <View style={styles.selected}>
              <View style={styles.optionContainer}>
                <Text style={styles.subTitle}>Descripción</Text>
                <TextInput
                  placeholder="Partido de fútbol"
                  style={styles.inputContainer}
                />
              </View>
              <View style={styles.optionContainer}>
                <Text style={styles.subTitle}>Tus invitados</Text>
                <View style={styles.inputContainer}>
                  <TextInput placeholder="Entra a la lista" />
                  <AñadirUsuarioSVG />
                </View>
              </View>
              <View style={styles.optionContainer}>
                <Text style={styles.subTitle}>Deseos</Text>
                <View style={styles.inputContainer}>
                  <TextInput placeholder="Comprueba la lista" />
                  <RegaloSVG />
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <LinearGradient
                  style={styles.button}
                  locations={[0, 1]}
                  colors={['#dee274', '#7ec18c']}
                >
                  <Pressable
                    onPress={() => navigation.navigate('MasDetallesEventos')}
                  >
                    <Text style={styles.save}>Más detalles</Text>
                  </Pressable>
                </LinearGradient>
                <LinearGradient
                  style={styles.button}
                  locations={[0, 1]}
                  colors={['#dee274', '#7ec18c']}
                >
                  <Text style={styles.save}>Añadir recuerdos</Text>
                </LinearGradient>
              </View>
            </View>
          )}
          {selected && (
            <View style={{ flexDirection: "row", paddingBottom: 50, gap: 2 }}>
              <Image source={require('../../assets/coverpicture.png')} style={{ width: "25%", height: 90 }}></Image>
              <Image source={require('../../assets/coverpicture.png')} style={{ width: "25%", height: 90 }}></Image>
              <Image source={require('../../assets/coverpicture.png')} style={{ width: "25%", height: 90 }}></Image>
              <Image source={require('../../assets/coverpicture.png')} style={{ width: "25%", height: 90 }}></Image>
              <View style={{ width: "100%", justifyContent: "center", position: "absolute", bottom: 20 }}>
                <LinearGradient
                  style={{ ...styles.button, alignSelf: "center" }}
                  locations={[0, 1]}
                  colors={['#dee274', '#7ec18c']}
                >
                  <Text style={styles.save}>Añadir recuerdos</Text>
                </LinearGradient>
              </View>
            </View>
          )}
        </View>

        <View style={styles.viewContainer}>
          <Pressable
            onPress={() => setSelected2(!selected2)}

            style={styles.boxContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.subTitle}>Fecha especial</Text>
              <Text style={styles.name}>Pachanga</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 18 }}>
              {selected2 ? <Image style={{ width: 20, height: 18 }} contentFit='scale-down' source={require('../../assets/arrow2.png')}></Image>
                :
                <Image style={{ width: 20, height: 18 }} contentFit='scale-down' source={require('../../assets/arrow1.png')}></Image>
              }
              <CalendarCheckSVG />
            </View>
          </Pressable>
          {selected2 && (
            <View style={styles.selected}>
              <View style={styles.optionContainer}>
                <Text style={styles.subTitle}>Descripción</Text>
                <TextInput
                  placeholder="Partido de fútbol"
                  style={styles.inputContainer}
                />
              </View>
              <View style={styles.optionContainer}>
                <Text style={styles.subTitle}>Tus invitados</Text>
                <View style={styles.inputContainer}>
                  <TextInput placeholder="Entra a la lista" />
                  <AñadirUsuarioSVG />
                </View>
              </View>
              <View style={styles.optionContainer}>
                <Text style={styles.subTitle}>Deseos</Text>
                <View style={styles.inputContainer}>
                  <TextInput placeholder="Comprueba la lista" />
                  <RegaloSVG />
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <LinearGradient
                  style={styles.button}
                  locations={[0, 1]}
                  colors={['#dee274', '#7ec18c']}
                >
                  <Pressable
                    onPress={() => navigation.navigate('MasDetallesEventos')}
                  >
                    <Text style={styles.save}>Más detalles</Text>
                  </Pressable>
                </LinearGradient>
                <LinearGradient
                  style={styles.button}
                  locations={[0, 1]}
                  colors={['#dee274', '#7ec18c']}
                >
                  <Text style={styles.save}>Añadir recuerdos</Text>
                </LinearGradient>
              </View>
            </View>
          )}
          {selected2 && (
            <View style={{ flexDirection: "row", paddingBottom: 50, gap: 2 }}>
              <Image source={require('../../assets/coverpicture.png')} style={{ width: "25%", height: 90 }}></Image>
              <Image source={require('../../assets/coverpicture.png')} style={{ width: "25%", height: 90 }}></Image>
              <Image source={require('../../assets/coverpicture.png')} style={{ width: "25%", height: 90 }}></Image>
              <Image source={require('../../assets/coverpicture.png')} style={{ width: "25%", height: 90 }}></Image>
              <View style={{ width: "100%", justifyContent: "center", position: "absolute", bottom: 20 }}>
                <LinearGradient
                  style={{ ...styles.button, alignSelf: "center" }}
                  locations={[0, 1]}
                  colors={['#dee274', '#7ec18c']}
                >
                  <Text style={styles.save}>Añadir recuerdos</Text>
                </LinearGradient>
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10
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
    flex: 1
  },
  viewContainer: {
    backgroundColor: Color.colorWhitesmoke_200,
    borderRadius: Border.br_base,
    marginTop: 10
  },
  boxContainer: {
    height: 100,
    borderRadius: Border.br_base,
    backgroundColor: Color.colorWhitesmoke_200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  selected: {
    // alignItems: 'center',
    padding: 20,
  },
  textContainer: {
    flexDirection: 'column',
    gap: 10
  },
  subTitle: {
    color: Color.primario1,
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
  optionContainer: {
    height: 100
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
    marginTop: 10
  },
  button: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Border.br_11xl,
    width: '47%'
  },
  save: {
    letterSpacing: 1,
    fontSize: FontSize.size_mini,
    textAlign: 'center',
    color: Color.white,
    fontFamily: FontFamily.lato,
    lineHeight: 24
  }
})
export default Eventos
