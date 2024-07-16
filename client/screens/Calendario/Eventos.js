import React, { useState } from 'react'
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback
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
import { useSelector } from 'react-redux'

const Eventos = ({ route }) => {
  const navigation = useNavigation()
  const { allUsers } = useSelector((state) => state.users)

  console.log(allUsers, 'asdasfasfasfas')
  const [selected, setSelected] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const event_name = route?.params?.title
  const event_desc = route?.params?.description


  const [selectedUsers, setSelectedUsers] = useState([]);

  const toggleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };


  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 130 }}
      style={styles.scrollView}
    >
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
              <Text style={styles.subTitle}>{event_name}</Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 18 }}
            >
              {selected ? (
                <Image
                  style={{ width: 20, height: 18 }}
                  contentFit="scale-down"
                  source={require('../../assets/arrow2.png')}
                ></Image>
              ) : (
                <Image
                  style={{ width: 20, height: 18 }}
                  contentFit="scale-down"
                  source={require('../../assets/arrow1.png')}
                ></Image>
              )}
              <CalendarCheckSVG />
            </View>
          </Pressable>
          {selected && (
            <View style={styles.selected}>
              <View style={styles.optionContainer}>
                <Text style={styles.subTitle}>Descripción</Text>
                <TextInput
                  placeholder={event_desc}
                  style={styles.inputContainer}
                />
              </View>
              <View style={styles.optionContainer}>
                <Text style={styles.subTitle}>Tus invitados</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    onFocus={() => setModalVisible(true)}
                    placeholder="Entra a la lista"
                  />
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
            <View style={{ flexDirection: 'row', paddingBottom: 50, gap: 2 }}>
              <Image
                source={require('../../assets/coverpicture.png')}
                style={{ width: '25%', height: 90 }}
              ></Image>
              <Image
                source={require('../../assets/coverpicture.png')}
                style={{ width: '25%', height: 90 }}
              ></Image>
              <Image
                source={require('../../assets/coverpicture.png')}
                style={{ width: '25%', height: 90 }}
              ></Image>
              <Image
                source={require('../../assets/coverpicture.png')}
                style={{ width: '25%', height: 90 }}
              ></Image>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  position: 'absolute',
                  bottom: 20
                }}
              >
                <LinearGradient
                  style={{ ...styles.button, alignSelf: 'center' }}
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
      <Modal
        visible={modalVisible}
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <ScrollView
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 15,
              gap: 15
            }}
            style={{
              height: 300,
              width: '100%',
              backgroundColor: 'white',
              bottom: 0,
              position: 'absolute'
            }}
          >
            {allUsers &&
        allUsers.map((e) => {
          const isSelected = selectedUsers.includes(e.id); // assuming `e.id` is the unique identifier for the user
          return (
            <TouchableOpacity
              key={e.id} // make sure each child in a list has a unique "key" prop
              style={{
                borderBottomWidth: 1,
                borderColor: 'gray',
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
                paddingBottom: 10,
                justifyContent: 'space-between'
              }}
              onPress={() => toggleUserSelection(e.id)}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <Image
                  style={{ width: 40, height: 40, borderRadius: 100 }}
                  source={
                    e.profilePicture
                      ? { uri: e.profilePicture }
                      : require('../../assets/aatar6.png')
                  }
                />
                <Text>{e.username}</Text>
              </View>
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  backgroundColor: isSelected ? 'green' : 'white',
                  borderWidth: 1,
                  borderColor: 'gray'
                }}
              />
            </TouchableOpacity>
          );
        })}
          </ScrollView>
        </TouchableWithoutFeedback>
      </Modal>
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
    padding: 20
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
