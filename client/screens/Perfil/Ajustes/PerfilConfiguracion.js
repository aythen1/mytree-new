import React, { useState, useRef, useEffect } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView
} from 'react-native'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import {
  FontFamily,
  Color,
  FontSize,
  Border,
  Padding
} from '../../../GlobalStyles'
import ENTRADACREADA from '../../../components/ENTRADACREADA'
import HeaderIcons from '../../../components/HeaderIcons'
import CalendarMuroSVG from '../../../components/svgs/CalendarMuroSVG'
import BookSVG from '../../../components/svgs/BookSVG'
import NotificationsMuroSVG from '../../../components/svgs/NotificationsMuroSVG'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BACKURL } from '../../../apiBackend'

const PerfilConfiguracion = () => {

  const [usuario, setUsuario] = useState('')

  useEffect(()=>{
    const getUser= async()=>{
    const usuario = await AsyncStorage.getItem('user');
    console.log(JSON.parse(usuario),"este es")
    setUsuario(JSON.parse(usuario));
    return JSON.parse(usuario);
    }
    getUser()
  },[])


  const navigation = useNavigation()
  const nombreInputRef = useRef(null)

  const [modalCreate, setModalCreate] = useState(false)

  
  const [input, setInput] = useState(null)
  const [dataToSend, setDataToSend] = useState({
    username:"",
    birthDate: "",
    address: "",
  })

  const handleInputFocus = () => {
    if (nombreInputRef.current) {
      nombreInputRef.current.focus()
    }
  }

  const onCloseModalCreate = () => {
    setModalCreate(false)
  }

  const handleSubmit = async ()=>{
  
 try {
  const res =  await axios.patch(`${BACKURL}/user/${usuario.id}`,dataToSend)
  if(res.data){
    setModalCreate(true)
  }
 } catch (error) {
  console.log(error)
 }
  }
  return (
      <KeyboardAvoidingView behavior='padding'  style={styles.viewContainer}>
    <ScrollView contentContainerStyle={{paddingBottom:130}} style={styles.frameParent} showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.parentIcons}>
            <Pressable onPress={() => navigation.navigate('Muro')}>
              <Image
                style={styles.image6Icon}
                contentFit="cover"
                source={require('../../../assets/image-6.png')}
              />
            </Pressable>
            <View style={styles.iconlylightOutlinecalendarParent}>
              <HeaderIcons
                icons={[
                  <CalendarMuroSVG />,
                  <BookSVG />,
                  <NotificationsMuroSVG />
                ]}
              />
            </View>
          </View>
          <View style={[styles.backParent, styles.parentFlexBox]}>
            <Pressable
              style={styles.iconlylightOutlinecalendar}
              onPress={() => navigation.navigate('PerfilAjustes')}
            >
              <Image
                style={[styles.icon, styles.iconLayout1]}
                contentFit="cover"
                source={require('../../../assets/back.png')}
              />
            </Pressable>
            <Text style={styles.ajustes}>Configuración</Text>
          </View>
        </View>

        <View style={styles.centralContainer}>
          <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={styles.nombreCompletoParent}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Cambiar foto de perfil
              </Text>
            </View>
            <Image
              style={[styles.vectorIcon1, styles.vectorIconLayout]}
              contentFit="cover"
              source={require('../../../assets/vector47.png')}
            />
          </View>
          <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={styles.nombreCompletoParent}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Nombre completo
              </Text>
              <TextInput
                style={[styles.brunoPham, styles.brunoPhamTypo]}
                ref={nombreInputRef}
                placeholder={usuario.username}
                onChangeText={(text)=> setDataToSend({...dataToSend,["username"]: text})}
                value={dataToSend.username}
              />
            </View>
            <Pressable
              onPress={() => {
                handleInputFocus()
                setInput('Nombre')
              }}
            >
              <Image
                style={[styles.vectorIcon1, styles.vectorIconLayout]}
                contentFit="cover"
                source={require('../../../assets/vector47.png')}
              />
            </Pressable>
          </View>
          <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={styles.nombreCompletoParent}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Fecha de nacimiento
              </Text>
              <TextInput
                style={[styles.brunoPham, styles.brunoPhamTypo]}
                ref={nombreInputRef}
                placeholder={usuario.birthDate}
                onChangeText={(text)=> setDataToSend({...dataToSend,["birthDate"]: text})}
                value={dataToSend.birthDate}
              />
            </View>
            <Pressable
              onPress={() => {
                handleInputFocus()
                setInput('Fecha')
              }}
            >
              <Image
                style={[styles.vectorIcon1, styles.vectorIconLayout]}
                contentFit="cover"
                source={require('../../../assets/vector47.png')}
              />
            </Pressable>
          </View>
          <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={styles.nombreCompletoParent}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Ubicación
              </Text>
              <TextInput
                style={[styles.brunoPham, styles.brunoPhamTypo]}
                ref={nombreInputRef}
                placeholder={usuario.address}
                onChangeText={(text)=> setDataToSend({...dataToSend,["address"]: text})}
                value={dataToSend.address}
              />
            </View>
            <Pressable
              onPress={() => {
                handleInputFocus()
                setInput('Ubicacion')
              }}
            >
              <Image
                style={[styles.vectorIcon1, styles.vectorIconLayout]}
                contentFit="cover"
                source={require('../../../assets/vector47.png')}
              />
            </Pressable>
          </View>
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require('../../../assets/line-811.png')}
          />
          <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={styles.nombreCompletoParent}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Madre
              </Text>
              <TextInput
                style={[styles.brunoPham, styles.brunoPhamTypo]}
                ref={nombreInputRef}
                placeholder="Mary Jane"
              />
            </View>
            <Pressable
              onPress={() => {
                handleInputFocus()
                setInput('Madre')
              }}
            >
              <Image
                style={[styles.vectorIcon1, styles.vectorIconLayout]}
                contentFit="cover"
                source={require('../../../assets/vector47.png')}
              />
            </Pressable>
          </View>
          <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={styles.nombreCompletoParent}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Padre
              </Text>
              <TextInput
                style={[styles.brunoPham, styles.brunoPhamTypo]}
                ref={nombreInputRef}
                placeholder="Peter Parker"
              />
            </View>
            <Pressable
              onPress={() => {
                handleInputFocus()
                setInput('Padre')
              }}
            >
              <Image
                style={[styles.vectorIcon1, styles.vectorIconLayout]}
                contentFit="cover"
                source={require('../../../assets/vector47.png')}
              />
            </Pressable>
          </View>

          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require('../../../assets/line-811.png')}
          />

          <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={styles.nombreCompletoParent}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Hermanos
              </Text>
              <TextInput
                style={[styles.brunoPham, styles.brunoPhamTypo]}
                ref={nombreInputRef}
                placeholder="Ninguno"
              />
            </View>
            <Pressable
              onPress={() => {
                handleInputFocus()
                setInput('Hermanos')
              }}
            >
              <Image
                style={[styles.vectorIcon1, styles.vectorIconLayout]}
                contentFit="cover"
                source={require('../../../assets/vector47.png')}
              />
            </Pressable>
          </View>
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require('../../../assets/line-811.png')}
          />
          <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={styles.nombreCompletoParent}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Estado Civíl
              </Text>
              <TextInput
                style={[styles.brunoPham, styles.brunoPhamTypo]}
                ref={nombreInputRef}
                placeholder="Casado con Pirita Garcia"
              />
            </View>
            <Pressable
              onPress={() => {
                handleInputFocus()
                setInput('EstadoCivil')
              }}
            >
              <Image
                style={[styles.vectorIcon1, styles.vectorIconLayout]}
                contentFit="cover"
                source={require('../../../assets/vector47.png')}
              />
            </Pressable>
          </View>
          <Image
            style={styles.frameChild}
            contentFit="cover"
            source={require('../../../assets/line-811.png')}
          />
          {/* <View style={[styles.frameContainer, styles.frameContainerFlexBox]}>
            <View style={styles.nombreCompletoParent}>
              <Text style={[styles.cambiarFotoDe, styles.brunoPhamTypo]}>
                Añadir al perfil la familia de la pareja
              </Text>
              <Text style={[styles.brunoPham, styles.brunoPhamTypo]}>
                Desactivado
              </Text>
            </View>
            <Image
              style={[styles.vectorIcon1, styles.vectorIconLayout]}
              contentFit="cover"
              source={require('../../../assets/vector47.png')}
            />
          </View> */}
          <View style={[styles.deleteParent, styles.parentFlexBox]}>
            <Image
              style={styles.deleteIcon}
              contentFit="cover"
              source={require('../../../assets/delete2.png')}
            />
            <Text style={[styles.eliminarDatos, styles.brunoPhamTypo]}>
              Eliminar datos
            </Text>
          </View>
        </View>
        <LinearGradient
          style={styles.button}
          locations={[0, 1]}
          colors={['#dee274', '#7ec18c']}
        >
          <Pressable
            style={[styles.pressable, styles.pressableFlexBox]}
            onPress={() => handleSubmit()}
          >
            <Text style={styles.signIn}>Guardar</Text>
          </Pressable>
        </LinearGradient>

        {modalCreate && (
          <Modal animationType="fade" transparent={true} visible={modalCreate}>
            <TouchableWithoutFeedback onPress={() => setModalCreate(false)}>
              <View style={styles.modalOverlay}>
                <View>
                  <ENTRADACREADA
                    onClose={onCloseModalCreate}
                    message={'Guardado!'}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        )}
    </ScrollView>
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  frameParent: {
   
    flex: 1,
    backgroundColor: Color.white,
    paddingHorizontal: Padding.p_xl,
  },
  viewContainer: {
    backgroundColor: Color.white
,
    flex:1,
  },
  parentFlexBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  brunoPhamTypo: {
    textAlign: 'left',
    fontFamily: FontFamily.lato
  },
  vectorIconLayout: {
    height: 21,
    width: 21
  },
  frameContainerFlexBox: {
    flexDirection: 'row'
  },
  pressableFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  cambiarFotoDe: {
    color: Color.negro,
    textAlign: 'left',
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 19,
    fontSize: FontSize.size_base
  },
  brunoPham: {
    color: Color.grisGeneral,
    marginTop: 10,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 19,
    fontSize: FontSize.size_base
  },
  nombreCompletoParent: {
    width: '80%'
  },
  vectorIcon1: {
    marginLeft: 20
  },
  frameContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  frameChild: {
    height: '0.5%',
    width: 388,
    marginTop: 20
  },
  deleteIcon: {
    width: 18,
    height: 20,
    overflow: 'hidden'
  },
  eliminarDatos: {
    fontSize: FontSize.size_lg,
    lineHeight: 22,
    marginLeft: 15,
    color: Color.negro,
    textAlign: 'left',
    fontWeight: '500',
    letterSpacing: 0
  },
  deleteParent: {
    marginTop: 38,
    alignItems: 'center'
  },
  signIn: {
    letterSpacing: 1,
    lineHeight: 24,
    color: Color.white,
    textAlign: 'center',
    fontFamily: FontFamily.lato,
    fontSize: FontSize.size_base,
    flex: 1
  },
  pressable: {
    borderRadius: Border.br_11xl,
    paddingHorizontal: Padding.p_5xl,
    paddingVertical: Padding.p_sm,
    backgroundColor: Color.linearBoton
  },
  button: {
    marginTop: 38,
    borderRadius: Border.br_11xl
  },
  icon: {
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  image6Icon: {
    top: 3,
    width: 87,
    height: 55
  },
  documentIcon: {
    overflow: 'hidden'
  },
  parentIcons: {
    alignItems: 'center',
    flexDirection: 'row',
    top: '5%'
  },
  iconlylightOutlinecalendarParent: {
    width: '100%',
    left: '45%',
    flexDirection: 'row'
  },
  iconlylightOutlinecalendar: {
    height: 24,
    width: 24
  },
  documentIconLayout: {
    marginLeft: 30,
    height: 24,
    width: 24
  },
  backParent: {
    marginTop: 30
  },
  icon: {
    height: '100%',
    overflow: 'hidden'
  },
  iconLayout1: {
    width: '100%',
    overflow: 'hidden'
  },
  ajustes: {
    fontSize: FontSize.size_5xl,
    marginLeft: 20,
    textAlign: 'left',
    color: Color.negro,
    fontFamily: FontFamily.lato,
    fontWeight: '700'
  },
  centralContainer: {
    left: '3%'
  },
  modalOverlay: {
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default PerfilConfiguracion
